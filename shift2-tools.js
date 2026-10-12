/* Смена 2 · «Инструменты аналитика»: кодировки, шифры, математика, хэши, песочница.
   Всё работает локально в браузере, без запросов в сеть. */
(function () {
  "use strict";
  const S2 = window.Shift2;
  const el = S2.el;
  let built = null;

  // ------------------------------------------------------------ преобразования
  const dec = new TextDecoder();
  const bytesToText = (bytes, enc) => new TextDecoder(enc || "utf-8").decode(bytes);
  const textToBytes = (t) => new TextEncoder().encode(t);

  function b32decode(s) {
    const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    for (const ch of s.toUpperCase().replace(/[\s=]/g, "")) {
      const v = A.indexOf(ch);
      if (v < 0) throw new Error("недопустимый символ Base32: " + ch);
      bits += v.toString(2).padStart(5, "0");
    }
    const out = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) out.push(parseInt(bits.slice(i, i + 8), 2));
    return Uint8Array.from(out);
  }

  const rot = (s, n) => s.replace(/[a-z]/gi, (ch) => {
    const b = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - b + n + 260) % 26) + b);
  });

  const vigenere = (text, key, dir) => {
    const k = key.toLowerCase().replace(/[^a-z]/g, "");
    if (!k) throw new Error("ключ пуст (нужны латинские буквы)");
    let i = 0;
    return text.replace(/[a-z]/gi, (ch) => {
      const b = ch <= "Z" ? 65 : 97;
      return String.fromCharCode(((ch.charCodeAt(0) - b + dir * (k.charCodeAt(i++ % k.length) - 97) + 26) % 26) + b);
    });
  };

  function railDecrypt(text, rails) {
    const n = text.length;
    const pattern = [];
    let r = 0, d = 1;
    for (let i = 0; i < n; i++) {
      pattern.push(r);
      if (rails === 1) continue;
      if (r === 0) d = 1; else if (r === rails - 1) d = -1;
      r += d;
    }
    const counts = Array(rails).fill(0);
    pattern.forEach((p) => counts[p]++);
    const rows = [];
    let pos = 0;
    for (let k = 0; k < rails; k++) { rows.push(text.slice(pos, pos + counts[k]).split("")); pos += counts[k]; }
    const idx = Array(rails).fill(0);
    return pattern.map((p) => rows[p][idx[p]++]).join("");
  }
  function railEncrypt(text, rails) {
    const rows = Array.from({ length: rails }, () => []);
    let r = 0, d = 1;
    for (const ch of text) {
      rows[r].push(ch);
      if (rails === 1) continue;
      if (r === 0) d = 1; else if (r === rails - 1) d = -1;
      r += d;
    }
    return rows.map((x) => x.join("")).join("");
  }

  const ops = {
    b64d: (t) => bytesToText(S2.b64ToBytes(t.replace(/\s+/g, ""))),
    b64e: (t) => btoa(String.fromCharCode(...textToBytes(t))),
    b64u16: (t) => bytesToText(S2.b64ToBytes(t.replace(/\s+/g, "")), "utf-16le"),
    hexd: (t) => {
      const h = t.replace(/0x|[\s:,-]/gi, "");
      if (/[^0-9a-f]/i.test(h) || h.length % 2) throw new Error("это не шестнадцатеричная строка");
      return bytesToText(Uint8Array.from(h.match(/../g) || [], (x) => parseInt(x, 16)));
    },
    hexe: (t) => Array.from(textToBytes(t), (b) => b.toString(16).padStart(2, "0")).join(""),
    b32d: (t) => bytesToText(b32decode(t)),
    rot13: (t) => rot(t, 13),
    rev: (t) => [...t].reverse().join(""),
    bind: (t) => { const g = t.replace(/[^01]/g, ""); if (g.length % 8) throw new Error("длина двоичной строки не кратна 8"); return String.fromCharCode(...(g.match(/.{8}/g) || []).map((x) => parseInt(x, 2))); },
    asciid: (t) => String.fromCharCode(...t.split(/[\s,;]+/).filter(Boolean).map(Number)),
    asciie: (t) => Array.from(textToBytes(t)).join(" "),
    urld: (t) => decodeURIComponent(t.replace(/\+/g, " ")),
    atbash: (t) => t.replace(/[a-z]/gi, (ch) => { const b = ch <= "Z" ? 65 : 97; return String.fromCharCode(b + 25 - (ch.charCodeAt(0) - b)); }),
  };

  // ------------------------------------------------------------ математика
  const big = (s) => { if (!/^-?\d+$/.test(String(s).trim())) throw new Error("нужно целое число"); return BigInt(String(s).trim()); };
  const gcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
  function modInv(a, m) {
    let [r0, r1, s0, s1] = [((a % m) + m) % m, m, 1n, 0n];
    while (r1) { const q = r0 / r1; [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; }
    if (r0 !== 1n) throw new Error("обратного элемента нет (числа не взаимно просты)");
    return ((s0 % m) + m) % m;
  }
  function modPow(b, e, m) { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = (r * b) % m; b = (b * b) % m; e >>= 1n; } return r; }
  function factor(n) {
    const out = [];
    let x = n;
    for (let p = 2n; p * p <= x; p += p === 2n ? 1n : 2n) {
      while (x % p === 0n) { out.push(p); x /= p; }
      if (out.length > 64) break;
    }
    if (x > 1n) out.push(x);
    return out;
  }

  // ------------------------------------------------------------ песочница (в Worker)
  const JS_WORKER = `
onmessage = (e) => {
  const logs = [];
  const fmt = (v) => { if (typeof v === 'string') return v; try { return JSON.stringify(v); } catch (_) { return String(v); } };
  const c = { log: (...a) => logs.push(a.map(fmt).join(' ')), error: (...a) => logs.push('[ошибка] ' + a.map(fmt).join(' ')), warn: (...a) => logs.push('[!] ' + a.map(fmt).join(' ')) };
  try {
    let result;
    let fn;
    try { fn = new Function('console', '"use strict"; return (' + e.data.code + '\\n);'); }
    catch (syn) { fn = new Function('console', e.data.code); }
    result = fn(c);
    if (result !== undefined) logs.push('→ ' + fmt(result));
  } catch (err) { logs.push('[ошибка] ' + err.message); }
  postMessage(logs.join('\\n') || '(программа ничего не напечатала)');
};`;
  const BF_WORKER = `
onmessage = (e) => {
  const code = e.data.code.replace(/[^+\\-<>\\[\\].,]/g, '');
  const tape = new Uint8Array(30000); let p = 0, out = '', steps = 0;
  const jump = {}, st = [];
  for (let i = 0; i < code.length; i++) { if (code[i] === '[') st.push(i); if (code[i] === ']') { if (!st.length) { postMessage('[ошибка] лишняя ]'); return; } const j = st.pop(); jump[i] = j; jump[j] = i; } }
  if (st.length) { postMessage('[ошибка] не закрыта ['); return; }
  for (let i = 0; i < code.length; i++) {
    if (++steps > 50000000) { postMessage(out + '\\n[остановлено: слишком долго]'); return; }
    const c = code[i];
    if (c === '>') p++; else if (c === '<') p--; else if (c === '+') tape[p]++; else if (c === '-') tape[p]--;
    else if (c === '.') out += String.fromCharCode(tape[p]);
    else if (c === '[' && !tape[p]) i = jump[i]; else if (c === ']' && tape[p]) i = jump[i];
  }
  postMessage(out || '(программа ничего не напечатала)');
};`;

  function runWorker(src, code, timeout) {
    return new Promise((resolve) => {
      let worker, url;
      try {
        url = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
        worker = new Worker(url);
      } catch (e) { resolve("[ошибка] песочница недоступна в этом браузере: " + e.message); return; }
      const timer = setTimeout(() => { worker.terminate(); URL.revokeObjectURL(url); resolve("[остановлено] выполнение заняло больше " + timeout / 1000 + " с"); }, timeout);
      worker.onmessage = (e) => { clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(url); resolve(String(e.data)); };
      worker.onerror = (e) => { clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(url); resolve("[ошибка] " + e.message); };
      worker.postMessage({ code });
    });
  }

  // ------------------------------------------------------------ интерфейс
  function build() {
    const overlay = el("div", { class: "toolkit hidden", role: "dialog", "aria-modal": "true", "aria-label": "Инструменты аналитика" });
    const panel = el("div", { class: "toolkit-panel" });
    const head = el("div", { class: "toolkit-head" }, [el("div", {}, [el("small", { text: "ИНСТРУМЕНТЫ АНАЛИТИКА" }), el("strong", { text: "Рабочий стол «Глубины»" })])]);
    const closeBtn = el("button", { type: "button", class: "toolkit-close", "aria-label": "Закрыть", text: "×" });
    head.append(closeBtn);
    const tabs = el("div", { class: "toolkit-tabs", role: "tablist" });
    const body = el("div", { class: "toolkit-body" });
    panel.append(head, tabs, body);
    overlay.append(panel);

    const panes = {};
    const addTab = (id, label, node) => {
      const b = el("button", { type: "button", class: "toolkit-tab", role: "tab", text: label });
      b.addEventListener("click", () => select(id));
      tabs.append(b);
      node.classList.add("toolkit-pane", "hidden");
      body.append(node);
      panes[id] = { b, node };
    };
    const select = (id) => Object.entries(panes).forEach(([k, p]) => { p.b.classList.toggle("on", k === id); p.node.classList.toggle("hidden", k !== id); });

    const ta = (rows, ph, ro) => el("textarea", { class: "tk-area", rows: String(rows), placeholder: ph || "", spellcheck: "false", readonly: ro ? "readonly" : false });
    const btn = (label, fn, cls) => { const b = el("button", { type: "button", class: "s2-mini " + (cls || ""), text: label }); b.addEventListener("click", fn); return b; };
    const field = (label, node) => el("label", { class: "tk-field" }, [el("span", { text: label }), node]);
    const num = (v, w) => el("input", { class: "tk-input", type: "text", value: String(v), style: w ? `width:${w}px` : false });

    // общий вход/выход для «Кодировок» и «Шифров»
    const IN = ta(5, "Вставь сюда текст…");
    const OUT = ta(5, "Результат…", true);
    const status = el("div", { class: "tk-status" });
    const show = (fn) => { try { OUT.value = fn(); status.textContent = ""; status.className = "tk-status"; } catch (e) { OUT.value = ""; status.textContent = "Ошибка: " + e.message; status.className = "tk-status bad"; } };
    const io = el("div", { class: "tk-io" }, [field("Вход", IN), field("Результат", OUT), status,
      el("div", { class: "tk-row" }, [btn("↑ Результат во вход", () => { IN.value = OUT.value; OUT.value = ""; }), btn("Очистить", () => { IN.value = ""; OUT.value = ""; status.textContent = ""; })])]);

    // --- кодировки
    const enc = el("div", { class: "tk-ops" });
    [
      ["Base64 → текст", "b64d"], ["Текст → Base64", "b64e"], ["Base64 → текст (UTF-16LE)", "b64u16"],
      ["Hex → текст", "hexd"], ["Текст → Hex", "hexe"], ["Base32 → текст", "b32d"],
      ["ROT13", "rot13"], ["Развернуть строку", "rev"], ["Двоичный → текст", "bind"],
      ["ASCII-коды → текст", "asciid"], ["Текст → ASCII-коды", "asciie"], ["URL-декодирование", "urld"], ["Атбаш", "atbash"],
    ].forEach(([l, k]) => enc.append(btn(l, () => show(() => ops[k](IN.value)))));
    const paneEnc = el("div", {}, [el("p", { class: "tk-hint", text: "Выбери операцию, она применится ко входу. Для цепочки слоёв жми «Результат во вход»." }), enc]);

    // --- шифры
    const cs = num(3, 56), vk = num("raven", 110), rl = num(3, 56);
    const caesarAll = () => { const lines = []; for (let n = 1; n < 26; n++) lines.push(String(n).padStart(2) + ": " + rot(IN.value, -n)); return lines.join("\n"); };
    const affineAll = () => {
      const inv = (a) => { for (let x = 1; x < 26; x++) if ((a * x) % 26 === 1) return x; return 0; };
      const rows = [];
      [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].forEach((a) => { const ai = inv(a); for (let b = 0; b < 26; b++) rows.push([a, b, IN.value.replace(/[a-z]/gi, (ch) => { const bs = ch <= "Z" ? 65 : 97; return String.fromCharCode(bs + ((ai * ((ch.charCodeAt(0) - bs - b + 26) % 26)) % 26)); })]); });
      rows.sort((x, y) => (/^ctf\{/i.test(y[2]) ? 1 : 0) - (/^ctf\{/i.test(x[2]) ? 1 : 0));
      return rows.map(([a, b, t]) => `${/^ctf\{/i.test(t) ? "★ " : "  "}a=${String(a).padStart(2)} b=${String(b).padStart(2)}: ${t}`).join("\n");
    };
    const xorBrute = () => {
      const h = IN.value.replace(/[\s:,-]|0x/gi, "");
      if (!h || /[^0-9a-f]/i.test(h) || h.length % 2) throw new Error("на вход нужна hex-строка");
      const data = Uint8Array.from(h.match(/../g), (x) => parseInt(x, 16));
      const lines = [];
      for (let k = 0; k < 256; k++) {
        const t = Array.from(data, (b) => b ^ k);
        if (t.every((c) => c === 10 || c === 13 || (c >= 32 && c < 127))) lines.push(`0x${k.toString(16).padStart(2, "0")} (${String(k).padStart(3)}): ` + String.fromCharCode(...t));
      }
      return lines.length ? lines.join("\n") : "Ни один однобайтовый ключ не дал печатный текст.";
    };
    const ciph = el("div", { class: "tk-ops" }, [
      el("div", { class: "tk-group" }, [el("b", { text: "Цезарь" }), field("сдвиг", cs), btn("Применить", () => show(() => rot(IN.value, -Number(cs.value)))), btn("Все 25 сдвигов", () => show(caesarAll))]),
      el("div", { class: "tk-group" }, [el("b", { text: "Виженер" }), field("ключ", vk), btn("Расшифровать", () => show(() => vigenere(IN.value, vk.value, -1))), btn("Зашифровать", () => show(() => vigenere(IN.value, vk.value, 1)))]),
      el("div", { class: "tk-group" }, [el("b", { text: "Рельсовая изгородь" }), field("рельсов", rl), btn("Расшифровать", () => show(() => railDecrypt(IN.value, Math.max(1, Number(rl.value))))), btn("Зашифровать", () => show(() => railEncrypt(IN.value, Math.max(1, Number(rl.value)))))]),
      el("div", { class: "tk-group" }, [el("b", { text: "Аффинный шифр" }), btn("Перебрать все (a, b)", () => show(affineAll))]),
      el("div", { class: "tk-group" }, [el("b", { text: "XOR" }), btn("Перебрать однобайтовый ключ (вход — hex)", () => show(xorBrute))]),
    ]);
    const paneCiph = el("div", {}, [el("p", { class: "tk-hint", text: "Шифры работают с общим полем «Вход» (оно общее с вкладкой «Кодировки»). Звёздочка ★ отмечает результат, который начинается на ctf{." }), ciph]);
    const paneIO = el("div", { class: "tk-split" }, [io, el("div", { class: "tk-side" }, [])]);
    paneIO.querySelector(".tk-side").append(paneEnc, paneCiph);
    // две вкладки используют один и тот же io: делаем общую панель с под-вкладками
    const sub = el("div", { class: "tk-sub" });
    const subBtns = [["Кодировки", paneEnc], ["Шифры", paneCiph]].map(([l, p], i) => { const b = btn(l, () => pick(i), "tk-subtab"); sub.append(b); return b; });
    const pick = (i) => { [paneEnc, paneCiph].forEach((p, k) => p.classList.toggle("hidden", k !== i)); subBtns.forEach((b, k) => b.classList.toggle("on", k === i)); };
    paneIO.querySelector(".tk-side").prepend(sub);
    pick(0);

    // --- математика
    const ma = num("", 190), mb = num("", 190), mn = num("", 190);
    const mout = el("pre", { class: "tk-out" });
    const mshow = (fn) => { try { mout.textContent = fn(); mout.classList.remove("bad"); } catch (e) { mout.textContent = "Ошибка: " + e.message; mout.classList.add("bad"); } };
    const baseIn = num("255", 150), baseFrom = num("10", 44), baseTo = num("16", 44);
    const paneMath = el("div", {}, [
      el("p", { class: "tk-hint", text: "Целые числа любого размера (BigInt). Поля a, b, n используются операциями ниже." }),
      el("div", { class: "tk-fields" }, [field("a", ma), field("b", mb), field("n (модуль)", mn)]),
      el("div", { class: "tk-row" }, [
        btn("НОД(a, b)", () => mshow(() => String(gcd(big(ma.value), big(mb.value))))),
        btn("a⁻¹ mod n", () => mshow(() => String(modInv(big(ma.value), big(mn.value))))),
        btn("a^b mod n", () => mshow(() => String(modPow(big(ma.value), big(mb.value), big(mn.value))))),
        btn("Разложить n на множители", () => mshow(() => { const n = big(mn.value); if (n < 2n) throw new Error("n должно быть ≥ 2"); const f = factor(n); return `${n} = ${f.join(" × ")}`; })),
      ]),
      el("div", { class: "tk-group" }, [el("b", { text: "Системы счисления" }), field("число", baseIn), field("из", baseFrom), field("в", baseTo),
        btn("Перевести", () => mshow(() => { const v = parseInt(baseIn.value, Number(baseFrom.value)); if (Number.isNaN(v)) throw new Error("не удалось прочитать число"); return v.toString(Number(baseTo.value)); }))]),
      mout,
    ]);

    // --- хэши
    const hin = ta(2, "Текст для хэширования…");
    const hout = el("pre", { class: "tk-out" });
    const words = ta(6, "Слова по одному в строке или через запятую…");
    const pre = num("", 110), suf = num("", 110), target = num("", 360);
    const algo = el("select", { class: "tk-input" }, [el("option", { value: "sha256", text: "SHA-256" }), el("option", { value: "sha1", text: "SHA-1" }), el("option", { value: "md5", text: "MD5" })]);
    const caseSel = el("select", { class: "tk-input" }, [el("option", { value: "as", text: "как есть" }), el("option", { value: "cap", text: "Первая заглавная" }), el("option", { value: "up", text: "ВСЕ ЗАГЛАВНЫЕ" }), el("option", { value: "low", text: "все строчные" })]);
    const dict = () => {
      const t = target.value.trim().toLowerCase();
      const list = words.value.split(/[\n,]+/).map((x) => x.trim()).filter(Boolean);
      const lines = list.map((w) => {
        const v = caseSel.value === "cap" ? w[0].toUpperCase() + w.slice(1).toLowerCase() : caseSel.value === "up" ? w.toUpperCase() : caseSel.value === "low" ? w.toLowerCase() : w;
        const cand = pre.value + v + suf.value;
        const h = S2[algo.value](cand);
        return { cand, h, hit: t && h === t };
      });
      lines.sort((a, b) => (b.hit ? 1 : 0) - (a.hit ? 1 : 0));
      hout.textContent = (lines.some((l) => l.hit) ? "СОВПАДЕНИЕ НАЙДЕНО\n\n" : t ? "Совпадений нет\n\n" : "") + lines.map((l) => `${l.hit ? "★" : " "} ${l.h}  ${l.cand}`).join("\n");
    };
    const paneHash = el("div", {}, [
      el("div", { class: "tk-group" }, [el("b", { text: "Хэш текста" }), hin, btn("Посчитать", () => { const t = hin.value; hout.textContent = `MD5     ${S2.md5(t)}\nSHA-1   ${S2.sha1(t)}\nSHA-256 ${S2.sha256(t)}`; })]),
      el("div", { class: "tk-group" }, [el("b", { text: "Подбор по словарю" }), words,
        el("div", { class: "tk-fields" }, [field("перед словом", pre), field("после слова", suf), field("регистр", caseSel), field("алгоритм", algo)]),
        field("искомый хэш", target), btn("Проверить все слова", dict, "primary")]),
      hout,
    ]);

    // --- песочница
    const mode = el("select", { class: "tk-input" }, [el("option", { value: "js", text: "JavaScript" }), el("option", { value: "bf", text: "Brainfuck" })]);
    const code = ta(10, "Код… Для JS: console.log(...) выводит результат.");
    code.value = "// пример\nconsole.log([1, 2, 3].map((x) => x * x));";
    const sout = el("pre", { class: "tk-out" });
    const runBtn = btn("▶ Выполнить", async () => {
      runBtn.disabled = true; sout.textContent = "Выполняю…";
      sout.textContent = await runWorker(mode.value === "js" ? JS_WORKER : BF_WORKER, code.value, 10000);
      runBtn.disabled = false;
    }, "primary");
    const paneSand = el("div", {}, [
      el("p", { class: "tk-hint", text: "Код выполняется в изолированном потоке браузера, с ограничением по времени (10 секунд). Циклы на миллионы итераций работают." }),
      el("div", { class: "tk-row" }, [field("язык", mode), runBtn]), code, sout,
    ]);

    addTab("io", "Кодировки и шифры", paneIO);
    addTab("math", "Математика", paneMath);
    addTab("hash", "Хэши", paneHash);
    addTab("sand", "Песочница", paneSand);
    select("io");

    const close = () => overlay.classList.add("hidden");
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("mousedown", (e) => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.classList.contains("hidden")) close(); });
    document.body.append(overlay);
    return { overlay, close };
  }

  S2.toggleToolkit = function (force) {
    if (!built) built = build();
    const open = force === undefined ? built.overlay.classList.contains("hidden") : force;
    built.overlay.classList.toggle("hidden", !open);
    if (open) { const first = built.overlay.querySelector("textarea"); if (first) setTimeout(() => first.focus(), 30); }
  };

  S2.__tools = { ops, vigenere, railDecrypt, railEncrypt, modInv, modPow, factor, gcd, b32decode };
})();
