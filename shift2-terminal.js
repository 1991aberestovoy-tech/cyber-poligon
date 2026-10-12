/* Смена 2 · учебный терминал: виртуальная файловая система, конвейеры, curl/git/sudo.
   Это эмуляция внутри страницы: никакие команды на компьютере не выполняются. */
(function () {
  "use strict";
  const S2 = window.Shift2;
  const el = S2.el;
  const sessions = new Map();

  S2.renderTerminal = function (block, wrap, mission) {
    const key = mission.id;
    if (!sessions.has(key)) {
      const scenario = block.enc ? S2.decodeScenario(block.enc) : block.scenario;
      sessions.set(key, createTerminal(scenario));
    }
    const term = sessions.get(key);
    wrap.append(
      el("div", { class: "s2-caption" }, [el("span", { class: "s2-tag", text: "SHELL" }), el("span", { text: "Учебная консоль. Команды выполняются в эмуляции, на твоём компьютере ничего не запускается." })]),
      term.root
    );
  };

  // ------------------------------------------------------------ разбор строки
  function tokenize(line) {
    const tokens = [];
    let cur = "", q = null, has = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (q) {
        if (c === q) q = null;
        else if (c === "\\" && q === '"' && i + 1 < line.length) cur += line[++i];
        else cur += c;
      } else if (c === "'" || c === '"') { q = c; has = true; }
      else if (c === "\\" && i + 1 < line.length) { cur += line[++i]; has = true; }
      else if (/\s/.test(c)) { if (cur || has) tokens.push(cur); cur = ""; has = false; }
      else cur += c;
    }
    if (cur || has) tokens.push(cur);
    return tokens;
  }

  function splitPipeline(line) {
    const parts = [];
    let cur = "", q = null;
    for (const c of line) {
      if (q) { if (c === q) q = null; cur += c; }
      else if (c === "'" || c === '"') { q = c; cur += c; }
      else if (c === "|") { parts.push(cur); cur = ""; }
      else cur += c;
    }
    parts.push(cur);
    return parts.map((p) => p.trim()).filter((p) => p.length);
  }

  const globToRe = (g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$");

  function createTerminal(scenario) {
    const fsRoot = scenario.fs || {};
    const user = scenario.user || "analyst";
    const host = scenario.host || "deep-node";
    const home = "/home/" + user;
    let cwd = scenario.cwd || home;
    const history = [];
    let hIndex = 0;
    const meta = scenario.meta || {};

    // ---------- файловая система ----------
    const parts = (p) => p.split("/").filter(Boolean);
    const isBin = (n) => n && typeof n === "object" && Array.isArray(n.bin);
    const isDir = (n) => n && typeof n === "object" && !Array.isArray(n.bin);
    const isFile = (n) => typeof n === "string" || isBin(n);

    function resolve(p, base) {
      if (p === "~") p = home;
      else if (p.startsWith("~/")) p = home + p.slice(1);
      const stack = p.startsWith("/") ? [] : parts(base || cwd);
      p.split("/").forEach((seg) => {
        if (!seg || seg === ".") return;
        if (seg === "..") stack.pop();
        else stack.push(seg);
      });
      return "/" + stack.join("/");
    }
    function node(abs) {
      let n = fsRoot;
      for (const seg of parts(abs)) {
        if (isDir(n) && Object.prototype.hasOwnProperty.call(n, seg)) n = n[seg];
        else return undefined;
      }
      return n;
    }
    const base = (abs) => parts(abs).pop() || "/";
    const rootOnly = (abs) => abs === "/root" || abs.startsWith("/root/");

    function modeOf(abs, n) {
      if (meta[abs] && meta[abs].mode) return meta[abs].mode;
      return isDir(n) ? "drwxr-xr-x" : "-rw-r--r--";
    }
    function ownerOf(abs) {
      if (meta[abs] && meta[abs].owner) return meta[abs].owner;
      return abs.startsWith(home) ? `${user} ${user}` : "root root";
    }
    const sizeOf = (abs, n) => (meta[abs] && meta[abs].size) || (isDir(n) ? 4096 : isBin(n) ? 18432 : new TextEncoder().encode(n).length);

    function longLine(abs, n, name) {
      const [o, g] = ownerOf(abs).split(" ");
      return `${modeOf(abs, n)} 1 ${o.padEnd(8)} ${(g || o).padEnd(8)} ${String(sizeOf(abs, n)).padStart(6)} Oct  9 21:14 ${name}`;
    }

    function walk(abs, cb) {
      const n = node(abs);
      if (n === undefined) return;
      cb(abs, n);
      if (isDir(n)) Object.keys(n).sort().forEach((k) => walk(abs === "/" ? "/" + k : abs + "/" + k, cb));
    }

    // ---------- команды ----------
    const ERR = (s) => ({ err: s });

    function readFiles(args, stdin, root) {
      // возвращает массив {name, text} либо {err}
      if (!args.length) return stdin === null ? ERR("не указан файл") : [{ name: null, text: stdin }];
      const out = [];
      for (const a of args) {
        const abs = resolve(a);
        const n = node(abs);
        if (n === undefined) return ERR(`${a}: No such file or directory`);
        if (isDir(n)) return ERR(`${a}: Is a directory`);
        if (rootOnly(abs) && !root) return ERR(`${a}: Permission denied`);
        out.push({ name: a, text: isBin(n) ? "(двоичный файл: ELF 64-bit; для строк используй strings)" : n });
      }
      return out;
    }

    const linesOf = (t) => (t === "" ? [] : String(t).split("\n"));

    const cmds = {
      help() {
        return [
          "Доступные команды:",
          "  ls [-a] [-l] [путь]        список файлов        cd, pwd   перейти / где я",
          "  cat <файл>                 показать файл        echo      напечатать текст",
          "  grep [-r -i -n -v -c] шаблон [путь]             поиск текста",
          "  find <путь> [-name маска] [-perm -4000]         поиск файлов",
          "  head, tail [-n N]   wc [-l]   sort [-n -r]   uniq [-c]   cut -d: -f1",
          "  awk '{print $1}'  (есть $NF и $(NF-1))          разбор колонок",
          "  base64 [-d]   strings <файл>   id   whoami   env   date   history",
          "  curl [-i] [-H 'Имя: значение'] [-X МЕТОД] <адрес>",
          "  git log | git show <хэш>      sudo -l | sudo <команда>",
          "  ps, netstat, docker и особые утилиты — если они есть на этом сервере",
          "Конвейеры работают: команда1 | команда2.  Стрелки вверх/вниз — история, Tab — дополнение.",
        ].join("\n");
      },
      pwd() { return cwd; },
      whoami() { return user; },
      hostname() { return host; },
      id() { return scenario.id || `uid=1001(${user}) gid=1001(${user}) groups=1001(${user})`; },
      date() { return "Sat Oct 10 03:12:44 MSK 2026"; },
      uname() { return "Linux " + host + " 6.1.0-deep #1 SMP x86_64 GNU/Linux"; },
      env() { return scenario.env || `USER=${user}\nHOME=${home}\nSHELL=/bin/bash\nLANG=ru_RU.UTF-8\nPWD=${cwd}\nHOSTNAME=${host}`; },
      history() { return history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n"); },
      exit() { return "Закрывать нечего: это учебная консоль. Просто введи ответ ниже."; },
      clear() { return { clear: true }; },
      echo(args) { return args.filter((a) => a !== "-n" && a !== "-e").join(" "); },
      cd(args) {
        const target = resolve(args[0] || "~");
        const n = node(target);
        if (n === undefined) return ERR(`cd: ${args[0]}: No such file or directory`);
        if (!isDir(n)) return ERR(`cd: ${args[0]}: Not a directory`);
        cwd = target;
        updatePrompt();
        return "";
      },
      ls(args, stdin, root) {
        const flags = args.filter((a) => a.startsWith("-")).join("");
        const paths = args.filter((a) => !a.startsWith("-"));
        const showAll = flags.includes("a"), long = flags.includes("l");
        const targets = paths.length ? paths : ["."];
        const out = [];
        for (const t of targets) {
          const abs = resolve(t);
          const n = node(abs);
          if (n === undefined) return ERR(`ls: cannot access '${t}': No such file or directory`);
          if (rootOnly(abs) && !root) return ERR(`ls: cannot open directory '${t}': Permission denied`);
          if (targets.length > 1) out.push(t + ":");
          if (isDir(n)) {
            let names = Object.keys(n).sort((a, b) => a.localeCompare(b, "en"));
            if (!showAll) names = names.filter((k) => !k.startsWith("."));
            if (long) {
              out.push(`total ${names.length * 4}`);
              if (showAll) { out.push(longLine(abs, n, ".")); out.push(longLine(resolve("..", abs), node(resolve("..", abs)), "..")); }
              names.forEach((k) => out.push(longLine(abs === "/" ? "/" + k : abs + "/" + k, n[k], k)));
            } else {
              out.push((showAll ? [".", "..", ...names] : names).join("  "));
            }
          } else out.push(long ? longLine(abs, n, t) : t);
          if (targets.length > 1) out.push("");
        }
        return out.join("\n").replace(/\n+$/, "");
      },
      cat(args, stdin, root) {
        const files = readFiles(args, stdin, root);
        if (files.err) return ERR("cat: " + files.err);
        return files.map((f) => f.text).join("\n");
      },
      head(args, stdin, root) { return headTail(args, stdin, root, true); },
      tail(args, stdin, root) { return headTail(args, stdin, root, false); },
      wc(args, stdin, root) {
        const flags = args.filter((a) => a.startsWith("-")).join("");
        const files = readFiles(args.filter((a) => !a.startsWith("-")), stdin, root);
        if (files.err) return ERR("wc: " + files.err);
        return files.map((f) => {
          const t = f.text, l = linesOf(t).length, w = t.split(/\s+/).filter(Boolean).length, c = new TextEncoder().encode(t).length + 1;
          const nums = flags.includes("l") ? [l] : flags.includes("w") ? [w] : flags.includes("c") ? [c] : [l, w, c];
          return nums.join(" ") + (f.name ? " " + f.name : "");
        }).join("\n");
      },
      sort(args, stdin, root) {
        const flags = args.filter((a) => a.startsWith("-")).join("");
        const files = readFiles(args.filter((a) => !a.startsWith("-")), stdin, root);
        if (files.err) return ERR("sort: " + files.err);
        let lines = files.flatMap((f) => linesOf(f.text));
        const num = (s) => { const m = s.match(/^\s*(-?\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0; };
        lines.sort(flags.includes("n") ? (a, b) => num(a) - num(b) || (a < b ? -1 : a > b ? 1 : 0) : (a, b) => (a < b ? -1 : a > b ? 1 : 0));
        if (flags.includes("r")) lines.reverse();
        if (flags.includes("u")) lines = lines.filter((l, i) => i === 0 || l !== lines[i - 1]);
        return lines.join("\n");
      },
      uniq(args, stdin, root) {
        const flags = args.filter((a) => a.startsWith("-")).join("");
        const files = readFiles(args.filter((a) => !a.startsWith("-")), stdin, root);
        if (files.err) return ERR("uniq: " + files.err);
        const out = [];
        files.flatMap((f) => linesOf(f.text)).forEach((l) => {
          const last = out[out.length - 1];
          if (last && last.l === l) last.c++;
          else out.push({ l, c: 1 });
        });
        return out.map((x) => (flags.includes("c") ? String(x.c).padStart(7) + " " + x.l : x.l)).join("\n");
      },
      cut(args, stdin, root) {
        let d = "\t", f = null;
        const rest = [];
        for (let i = 0; i < args.length; i++) {
          const a = args[i];
          if (a === "-d") d = args[++i];
          else if (a.startsWith("-d")) d = a.slice(2);
          else if (a === "-f") f = args[++i];
          else if (a.startsWith("-f")) f = a.slice(2);
          else rest.push(a);
        }
        if (!f) return ERR("cut: you must specify a list of fields (-f)");
        const idx = f.split(",").map((x) => parseInt(x, 10) - 1);
        const files = readFiles(rest, stdin, root);
        if (files.err) return ERR("cut: " + files.err);
        return files.flatMap((x) => linesOf(x.text)).map((l) => l.split(d).filter((_, i) => idx.includes(i)).join(d)).join("\n");
      },
      awk(args, stdin, root) {
        let sep = null, prog = null;
        const rest = [];
        for (let i = 0; i < args.length; i++) {
          const a = args[i];
          if (a === "-F") sep = args[++i];
          else if (a.startsWith("-F")) sep = a.slice(2);
          else if (prog === null) prog = a;
          else rest.push(a);
        }
        const m = prog && prog.match(/^\s*(?:\/(.*)\/)?\s*\{\s*print\s*(.*?)\s*;?\s*\}\s*$/);
        if (!m) return ERR("awk: поддерживается форма  awk '/шаблон/ {print $1, $3}'");
        const filter = m[1] ? new RegExp(m[1]) : null;
        const items = m[2] ? m[2].split(",").map((s) => s.trim()) : ["$0"];
        const files = readFiles(rest, stdin, root);
        if (files.err) return ERR("awk: " + files.err);
        const out = [];
        files.flatMap((f) => linesOf(f.text)).forEach((line) => {
          if (filter && !filter.test(line)) return;
          const fields = sep ? line.split(new RegExp(sep.length === 1 ? sep.replace(/[.|*+?^${}()[\]\\]/g, "\\$&") : sep)) : line.trim().split(/\s+/).filter((x) => x !== "");
          const val = (it) => {
            let mm;
            if (it === "$0") return line;
            if ((mm = it.match(/^\$(\d+)$/))) return fields[parseInt(mm[1], 10) - 1] || "";
            if (it === "$NF") return fields[fields.length - 1] || "";
            if ((mm = it.match(/^\$\(NF-(\d+)\)$/))) return fields[fields.length - 1 - parseInt(mm[1], 10)] || "";
            if ((mm = it.match(/^"(.*)"$/))) return mm[1];
            return it;
          };
          out.push(items.map(val).join(" "));
        });
        return out.join("\n");
      },
      grep(args, stdin, root) {
        const flags = { r: false, i: false, n: false, v: false, c: false, l: false, h: false, w: false };
        const pos = [];
        args.forEach((a) => {
          if (a.startsWith("-") && a.length > 1 && !a.startsWith("--")) for (const ch of a.slice(1)) { if (ch === "R") flags.r = true; else if (ch in flags) flags[ch] = true; }
          else if (a === "--recursive") flags.r = true;
          else pos.push(a);
        });
        if (!pos.length) return ERR("grep: не указан шаблон");
        const pattern = pos[0];
        let paths = pos.slice(1);
        let re;
        try { re = new RegExp(flags.w ? "\\b" + pattern + "\\b" : pattern, flags.i ? "i" : ""); } catch (e) { re = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags.i ? "i" : ""); }
        const targets = [];
        if (!paths.length && stdin !== null) targets.push({ name: null, text: stdin });
        else {
          if (!paths.length) paths = ["."];
          for (const p of paths) {
            const abs = resolve(p);
            const n = node(abs);
            if (n === undefined) return ERR(`grep: ${p}: No such file or directory`);
            if (rootOnly(abs) && !root) return ERR(`grep: ${p}: Permission denied`);
            if (isDir(n)) {
              if (!flags.r) return ERR(`grep: ${p}: Is a directory`);
              const prefix = p === "." ? "" : p.replace(/\/$/, "") + "/";
              walk(abs, (a, nn) => { if (typeof nn === "string") targets.push({ name: prefix + a.slice(abs.length).replace(/^\//, ""), text: nn }); });
            } else if (typeof n === "string") targets.push({ name: p, text: n });
          }
        }
        const showName = targets.length > 1 || flags.r;
        const out = [];
        targets.forEach((t) => {
          let count = 0;
          linesOf(t.text).forEach((line, i) => {
            if (re.test(line) !== flags.v) {
              count++;
              if (flags.l || flags.c) return;
              out.push((showName && t.name && !flags.h ? t.name + ":" : "") + (flags.n ? i + 1 + ":" : "") + line);
            }
          });
          if (flags.c) out.push((showName && t.name ? t.name + ":" : "") + count);
          else if (flags.l && count) out.push(t.name || "(стандартный ввод)");
        });
        return out.join("\n");
      },
      find(args) {
        const starts = [];
        let i = 0;
        while (i < args.length && !args[i].startsWith("-")) starts.push(args[i++]);
        if (!starts.length) starts.push(".");
        let name = null, type = null, perm = null, maxdepth = Infinity;
        for (; i < args.length; i++) {
          if (args[i] === "-name" || args[i] === "-iname") name = globToRe(args[++i]);
          else if (args[i] === "-type") type = args[++i];
          else if (args[i] === "-perm") perm = args[++i];
          else if (args[i] === "-maxdepth") maxdepth = parseInt(args[++i], 10);
        }
        const out = [];
        for (const s of starts) {
          const abs = resolve(s);
          if (node(abs) === undefined) return ERR(`find: '${s}': No such file or directory`);
          walk(abs, (a, n) => {
            if (a.slice(abs.length).split("/").filter(Boolean).length > maxdepth) return;
            if (rootOnly(a) && a !== "/root") return;
            if (name && !name.test(base(a))) return;
            if (type === "f" && !isFile(n)) return;
            if (type === "d" && !isDir(n)) return;
            if (perm === "-4000" || perm === "/4000") { const m = modeOf(a, n); if (!(m[3] === "s" || m[3] === "S")) return; }
            const shown = s === "." || s === "./" ? "." + a.slice(abs.length) : s.replace(/\/$/, "") + a.slice(abs.length);
            out.push(shown === "" ? "/" : shown);
          });
        }
        return out.join("\n");
      },
      base64(args, stdin, root) {
        const dec = args.includes("-d") || args.includes("--decode") || args.includes("-D");
        const files = readFiles(args.filter((a) => !a.startsWith("-")), stdin, root);
        if (files.err) return ERR("base64: " + files.err);
        const text = files.map((f) => f.text).join("\n").trim();
        try {
          if (dec) return new TextDecoder().decode(S2.b64ToBytes(text.replace(/\s+/g, "")));
          return btoa(String.fromCharCode(...new TextEncoder().encode(text)));
        } catch (e) { return ERR("base64: invalid input"); }
      },
      strings(args, stdin, root) {
        const abs = args[0] && resolve(args[0]);
        const n = abs && node(abs);
        if (!args[0]) return ERR("strings: не указан файл");
        if (n === undefined) return ERR(`strings: '${args[0]}': No such file`);
        if (rootOnly(abs) && !root) return ERR(`strings: ${args[0]}: Permission denied`);
        if (isBin(n)) return n.bin.join("\n");
        if (typeof n === "string") return linesOf(n).filter((l) => l.length >= 4).join("\n");
        return ERR(`strings: ${args[0]}: Is a directory`);
      },
      curl(args) {
        let method = null, includeHead = false, data = null;
        const headers = {};
        let url = null;
        for (let i = 0; i < args.length; i++) {
          const a = args[i];
          if (a === "-X" || a === "--request") method = args[++i].toUpperCase();
          else if (a === "-H" || a === "--header") { const h = args[++i] || ""; const k = h.indexOf(":"); if (k > 0) headers[h.slice(0, k).trim().toLowerCase()] = h.slice(k + 1).trim(); }
          else if (a === "-d" || a === "--data") { data = args[++i]; }
          else if (a === "-i" || a === "--include") includeHead = true;
          else if (a.startsWith("-")) continue;
          else url = a;
        }
        if (!url) return ERR("curl: try 'curl --help' or 'curl --manual' for more information");
        if (!scenario.routes) return ERR("curl: (6) Could not resolve host");
        let path;
        try { path = new URL(/^https?:\/\//.test(url) ? url : "http://" + url).pathname; } catch (e) { return ERR("curl: (3) URL rejected: Malformed input to a URL function"); }
        const m = (method || (data !== null ? "POST" : "GET")).toUpperCase();
        let hit = null;
        for (const r of scenario.routes) {
          if ((r.method || "GET") !== m || r.path !== path) continue;
          if (r.headers && !Object.entries(r.headers).every(([k, v]) => headers[k.toLowerCase()] === v)) continue;
          if (r.anyHeader && headers[r.anyHeader.toLowerCase()] === undefined) continue;
          hit = r; break;
        }
        if (!hit) hit = { status: 404, body: '{"error":"not found"}' };
        const reason = { 200: "OK", 401: "Unauthorized", 403: "Forbidden", 404: "Not Found" }[hit.status] || "";
        return includeHead ? `HTTP/1.1 ${hit.status} ${reason}\nContent-Type: application/json\nServer: deeplayer-gw\n\n${hit.body}` : hit.body;
      },
      git(args) {
        const g = scenario.git;
        if (!g) return ERR("fatal: not a git repository (or any of the parent directories): .git");
        const sub = args[0];
        if (sub === "log") {
          if (args.includes("-p")) return g.full;
          return args.includes("--oneline") ? g.oneline : g.log;
        }
        if (sub === "show") {
          const h = args[1];
          if (!h || h === "HEAD") return g.show[Object.keys(g.show)[0]];
          const key = Object.keys(g.show).find((k) => k.startsWith(h) || h.startsWith(k));
          return key ? g.show[key] : ERR(`fatal: ambiguous argument '${h}': unknown revision or path not in the working tree.`);
        }
        if (sub === "status") return g.status;
        if (sub === "branch") return "* main";
        if (sub === "diff") return "";
        return ERR("git: поддерживаются log, log --oneline, log -p, show <хэш>, status, branch");
      },
    };

    function headTail(args, stdin, root, head) {
      let n = 10;
      const rest = [];
      for (let i = 0; i < args.length; i++) {
        if (args[i] === "-n") n = parseInt(args[++i], 10);
        else if (/^-\d+$/.test(args[i])) n = parseInt(args[i].slice(1), 10);
        else if (/^-n\d+$/.test(args[i])) n = parseInt(args[i].slice(2), 10);
        else rest.push(args[i]);
      }
      const files = readFiles(rest, stdin, root);
      if (files.err) return ERR((head ? "head: " : "tail: ") + files.err);
      return files.map((f) => { const l = linesOf(f.text); return (head ? l.slice(0, n) : l.slice(-n)).join("\n"); }).join("\n");
    }

    // ---------- исполнение ----------
    function runStage(stage, stdin, root) {
      const tokens = tokenize(stage);
      if (!tokens.length) return "";
      // служебные перенаправления
      const clean = tokens.filter((t) => t !== "2>/dev/null" && t !== "2>&1" && t !== ">/dev/null");
      if (clean.some((t) => t === ">" || t === ">>" || /^>>?\S/.test(t))) return ERR("перенаправление в файлы недоступно в учебной консоли");
      const joined = clean.join(" ");
      // особые команды сценария
      for (const rule of scenario.commands || []) {
        if (new RegExp(rule.re).test(joined)) return rule.out;
      }
      const [name, ...args] = clean;
      if (name === "sudo") {
        if (args[0] === "-l") return scenario.sudoList || `Sorry, user ${user} may not run sudo on ${host}.`;
        const [cmd, ...cargs] = args;
        const ok = (scenario.sudoRules || []).some((r) => r.cmd === cmd && cargs[0] && cargs[0].startsWith(r.argPrefix));
        if (!ok) return ERR(`Sorry, user ${user} is not allowed to execute '${args.join(" ")}' as root on ${host}.`);
        return runStage(args.join(" "), stdin, true);
      }
      if (name === "ps" || name === "netstat" || name === "ss") return ERR(`${name}: команда не найдена`);
      if (Object.prototype.hasOwnProperty.call(cmds, name)) return cmds[name](args, stdin, root);
      return ERR(`bash: ${name}: command not found`);
    }

    function run(line) {
      const stages = splitPipeline(line);
      let data = null;
      for (const st of stages) {
        const res = runStage(st, data, false);
        if (res && typeof res === "object") return res;
        data = res;
      }
      return data === null ? "" : data;
    }

    // ---------- интерфейс ----------
    const out = el("div", { class: "term-out", tabindex: "-1" });
    const promptEl = el("span", { class: "term-prompt" });
    const input = el("input", { class: "term-input", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": "Команда" });
    const form = el("div", { class: "term-line" }, [promptEl, input]);
    const titleEl = el("span", { class: "term-title", text: `${user}@${host}` });
    const dots = el("span", { class: "term-dots" }, [el("i"), el("i"), el("i")]);
    const quick = el("div", { class: "term-quick" });
    const root = el("div", { class: "terminal" }, [el("div", { class: "term-bar" }, [dots, titleEl, quick]), out, form]);

    const shortCwd = () => (cwd === home ? "~" : cwd.startsWith(home + "/") ? "~" + cwd.slice(home.length) : cwd);
    function updatePrompt() { promptEl.textContent = `${user}@${host}:${shortCwd()}$ `; }
    updatePrompt();

    function print(text, cls) {
      const pre = el("pre", { class: "term-text" + (cls ? " " + cls : "") });
      pre.textContent = text;
      out.append(pre);
      out.scrollTop = out.scrollHeight;
    }
    (scenario.motd || []).forEach((l) => print(l, "motd"));

    function submit(line) {
      const echo = el("pre", { class: "term-text cmd" });
      const p = el("span", { class: "term-prompt", text: `${user}@${host}:${shortCwd()}$ ` });
      echo.append(p, document.createTextNode(line));
      out.append(echo);
      if (line.trim()) { history.push(line); hIndex = history.length; }
      let res;
      try { res = run(line); } catch (e) { res = { err: "внутренняя ошибка эмуляции: " + e.message }; }
      if (res && res.clear) { out.innerHTML = ""; }
      else if (res && res.err) print(res.err, "err");
      else if (res !== "") print(res);
      out.scrollTop = out.scrollHeight;
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { const v = input.value; input.value = ""; submit(v); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (hIndex > 0) input.value = history[--hIndex]; }
      else if (e.key === "ArrowDown") { e.preventDefault(); input.value = hIndex < history.length - 1 ? history[++hIndex] : ((hIndex = history.length), ""); }
      else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); out.innerHTML = ""; }
      else if (e.key === "Tab") { e.preventDefault(); complete(); }
    });

    function complete() {
      const v = input.value;
      const m = v.match(/^(.*?)([^\s|]*)$/);
      const before = m[1], word = m[2];
      let cands;
      if (!before.trim() || /\|\s*$/.test(before)) cands = Object.keys(cmds).concat(["curl", "sudo"]).filter((c) => c.startsWith(word));
      else {
        const slash = word.lastIndexOf("/");
        const dirPart = slash >= 0 ? word.slice(0, slash + 1) : "";
        const namePart = slash >= 0 ? word.slice(slash + 1) : word;
        const dn = node(resolve(dirPart || "."));
        cands = isDir(dn) ? Object.keys(dn).filter((k) => k.startsWith(namePart)).map((k) => dirPart + k + (isDir(dn[k]) ? "/" : "")) : [];
      }
      if (cands.length === 1) input.value = before + cands[0] + (cands[0].endsWith("/") ? "" : " ");
      else if (cands.length > 1) print(cands.join("  "));
    }

    const mkQuick = (label, cmd) => {
      const b = el("button", { type: "button", class: "term-chip", text: label });
      b.addEventListener("click", () => { if (cmd === "__clear") { out.innerHTML = ""; return; } submit(cmd); input.focus(); });
      return b;
    };
    quick.append(mkQuick("help", "help"), mkQuick("ls", "ls"), mkQuick("очистить", "__clear"));
    root.addEventListener("click", (e) => { if (!window.getSelection().toString() && e.target.tagName !== "BUTTON") input.focus(); });

    return { root, submit, run };
  }

  S2.__terminalForTests = createTerminal;
})();
