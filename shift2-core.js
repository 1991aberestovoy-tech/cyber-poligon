/* Смена 2 · ядро: хэши, проверка ответов, подсказки, осколки ключа.
   Ответы второй смены хранятся только в виде SHA-256 хэшей. */
(function () {
  "use strict";
  const S2 = (window.Shift2 = window.Shift2 || {});

  // ---------- вспомогательное ----------
  const utf8 = (str) => new TextEncoder().encode(str);
  const toHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const rotr = (x, n) => (x >>> n) | (x << (32 - n));
  const rotl = (x, n) => (x << n) | (x >>> (32 - n));

  function primes(count) {
    const out = [];
    for (let n = 2; out.length < count; n++) if (out.every((p) => n % p)) out.push(n);
    return out;
  }
  const P64 = primes(64);
  const K256 = P64.map((p) => Math.floor((Math.cbrt(p) % 1) * 4294967296) >>> 0);
  const H256 = P64.slice(0, 8).map((p) => Math.floor((Math.sqrt(p) % 1) * 4294967296) >>> 0);

  function padMessage(bytes, bigEndian) {
    const len = bytes.length;
    const total = (((len + 8) >> 6) + 1) << 6;
    const buf = new Uint8Array(total);
    buf.set(bytes);
    buf[len] = 0x80;
    const view = new DataView(buf.buffer);
    const bits = len * 8;
    if (bigEndian) {
      view.setUint32(total - 8, Math.floor(bits / 4294967296));
      view.setUint32(total - 4, bits >>> 0);
    } else {
      view.setUint32(total - 8, bits >>> 0, true);
      view.setUint32(total - 4, Math.floor(bits / 4294967296), true);
    }
    return view;
  }

  function sha256Bytes(bytes) {
    const view = padMessage(bytes, true);
    const h = H256.slice();
    const w = new Uint32Array(64);
    for (let off = 0; off < view.byteLength; off += 64) {
      for (let i = 0; i < 16; i++) w[i] = view.getUint32(off + i * 4);
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }
      let [a, b, c, d, e, f, g, hh] = h;
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (hh + S1 + ch + K256[i] + w[i]) >>> 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) >>> 0;
        hh = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      h[0] = (h[0] + a) >>> 0; h[1] = (h[1] + b) >>> 0; h[2] = (h[2] + c) >>> 0; h[3] = (h[3] + d) >>> 0;
      h[4] = (h[4] + e) >>> 0; h[5] = (h[5] + f) >>> 0; h[6] = (h[6] + g) >>> 0; h[7] = (h[7] + hh) >>> 0;
    }
    const out = new Uint8Array(32);
    const ov = new DataView(out.buffer);
    h.forEach((v, i) => ov.setUint32(i * 4, v));
    return out;
  }

  function sha1Bytes(bytes) {
    const view = padMessage(bytes, true);
    let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;
    const w = new Uint32Array(80);
    for (let off = 0; off < view.byteLength; off += 64) {
      for (let i = 0; i < 16; i++) w[i] = view.getUint32(off + i * 4);
      for (let i = 16; i < 80; i++) w[i] = rotl(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1) >>> 0;
      let a = h0, b = h1, c = h2, d = h3, e = h4;
      for (let i = 0; i < 80; i++) {
        let f, k;
        if (i < 20) { f = (b & c) | (~b & d); k = 0x5a827999; }
        else if (i < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
        else if (i < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
        else { f = b ^ c ^ d; k = 0xca62c1d6; }
        const t = (rotl(a, 5) + f + e + k + w[i]) >>> 0;
        e = d; d = c; c = rotl(b, 30) >>> 0; b = a; a = t;
      }
      h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0; h4 = (h4 + e) >>> 0;
    }
    const out = new Uint8Array(20);
    const ov = new DataView(out.buffer);
    [h0, h1, h2, h3, h4].forEach((v, i) => ov.setUint32(i * 4, v));
    return out;
  }

  const MD5_S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
  const MD5_K = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) >>> 0);
  function md5Bytes(bytes) {
    const view = padMessage(bytes, false);
    let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
    for (let off = 0; off < view.byteLength; off += 64) {
      const m = Array.from({ length: 16 }, (_, i) => view.getUint32(off + i * 4, true));
      let A = a0, B = b0, C = c0, D = d0;
      for (let i = 0; i < 64; i++) {
        let F, g;
        if (i < 16) { F = (B & C) | (~B & D); g = i; }
        else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
        else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
        else { F = C ^ (B | ~D); g = (7 * i) % 16; }
        F = (F + A + MD5_K[i] + m[g]) >>> 0;
        A = D; D = C; C = B;
        B = (B + rotl(F, MD5_S[(i >> 4) * 4 + (i % 4)])) >>> 0;
      }
      a0 = (a0 + A) >>> 0; b0 = (b0 + B) >>> 0; c0 = (c0 + C) >>> 0; d0 = (d0 + D) >>> 0;
    }
    const out = new Uint8Array(16);
    const ov = new DataView(out.buffer);
    [a0, b0, c0, d0].forEach((v, i) => ov.setUint32(i * 4, v, true));
    return out;
  }

  S2.sha256 = (s) => toHex(sha256Bytes(utf8(s)));
  S2.sha1 = (s) => toHex(sha1Bytes(utf8(s)));
  S2.md5 = (s) => toHex(md5Bytes(utf8(s)));
  S2.utf8 = utf8;
  S2.toHex = toHex;

  // ---------- проверка ответов ----------
  S2.norm = function (txt, squash) {
    let s = String(txt == null ? "" : txt).trim().toLowerCase();
    const m = s.match(/^ctf\{(.*)\}$/);
    if (m) s = m[1].trim();
    if (squash) s = s.replace(/[\s,;:|\/\-]+/g, "_");
    return s;
  };

  // каноническая запись ответа (то, что хэшируется)
  S2.canon = function (mission, answer) {
    if (answer === null || answer === undefined) return null;
    if (mission.type === "text") return S2.norm(answer, mission.squash);
    if (mission.type === "single" || mission.type === "case") return Number.isInteger(answer) ? String(answer) : null;
    if (mission.type === "multi") return Array.isArray(answer) ? [...answer].sort((a, b) => a - b).join(",") : null;
    if (mission.type === "sequence") {
      if (!Array.isArray(answer)) return null;
      const n = mission.n || answer.length;
      const used = answer.map((p, i) => ({ p, i })).filter((x) => x.p);
      const positions = used.map((x) => x.p);
      if (used.length !== n || new Set(positions).size !== n) return null;
      if (Math.max(...positions) !== n || Math.min(...positions) !== 1) return null;
      return used.sort((a, b) => a.p - b.p).map((x) => x.i).join(",");
    }
    return null;
  };

  S2.hash = (mission, canon) => S2.sha256(`dl2|${mission.id}|${canon}`);

  S2.verify = function (mission, answer) {
    const canon = S2.canon(mission, answer);
    if (canon === null || canon === "") return false;
    return mission.h.includes(S2.hash(mission, canon));
  };

  // осколок ключа: расшифровывается только по верному ответу
  S2.shardFor = function (mission, answer) {
    if (!mission.shardEnc) return null;
    const canon = S2.canon(mission, answer);
    if (canon === null) return null;
    const key = S2.sha256(canon + "|shard");
    const keyBytes = key.match(/../g).map((x) => parseInt(x, 16));
    const enc = mission.shardEnc.match(/../g).map((x) => parseInt(x, 16));
    return String.fromCharCode(...enc.map((b, i) => b ^ keyBytes[i % keyBytes.length]));
  };

  S2.successText = function (mission, answer) {
    if (!mission.success || !mission.success.includes("{{shard}}")) return mission.success;
    const shard = S2.shardFor(mission, answer);
    return mission.success.replace("{{shard}}", shard || "?");
  };

  // ---------- панель «Ключ смены» ----------
  S2.renderShardHud = function (host, pack, state) {
    host.innerHTML = "";
    if (!pack || !pack.missions.some((m) => m.shardEnc)) {
      host.classList.add("hidden");
      return;
    }
    host.classList.remove("hidden");
    const slots = pack.missions.map((m, i) => ({ m, i })).filter((x) => x.m.shardEnc);
    const letters = ["A", "B", "C", "D", "E"];
    const label = document.createElement("span");
    label.className = "shard-label";
    label.textContent = "Ключ смены";
    host.append(label);
    slots.forEach((slot, k) => {
      const done = state.completed[slot.i];
      const value = done ? S2.shardFor(slot.m, state.answers[slot.i]) : null;
      const el = document.createElement("span");
      el.className = "shard-slot" + (value ? " filled" : "");
      el.innerHTML = `<small>${letters[k] || k + 1}</small><b>${value ? value : "· · · ·"}</b>`;
      el.title = value ? `Осколок блока ${letters[k]}` : `Осколок блока ${letters[k]} выдаётся за задание ${slot.i + 1}`;
      host.append(el);
    });
  };

  // ---------- подсказки ----------
  S2.renderHint = function (mission, container, state, index, onUse) {
    if (!mission.hint) return;
    const wrap = document.createElement("div");
    wrap.className = "hint-box";
    const used = !!(state.hints && state.hints[index]);
    const render = (open) => {
      wrap.innerHTML = "";
      if (open) {
        const p = document.createElement("p");
        p.innerHTML = `<b>Подсказка</b> <em>(−20% баллов за это задание)</em><span></span>`;
        p.querySelector("span").textContent = " " + mission.hint;
        wrap.append(p);
      } else {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "hint-button";
        btn.textContent = "Показать подсказку (−20% баллов)";
        btn.addEventListener("click", () => {
          onUse();
          render(true);
        });
        wrap.append(btn);
      }
    };
    render(used);
    container.append(wrap);
  };

  S2.pointsFor = function (mission, state, index) {
    const penalty = state.hints && state.hints[index] && mission.hint ? 0.8 : 1;
    return Math.round(mission.points * penalty);
  };

  // ---------- мелкие утилиты, которыми пользуются остальные модули ----------
  S2.el = function (tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else if (v !== false && v !== null && v !== undefined) node.setAttribute(k, v);
    });
    (children || []).forEach((c) => c && node.append(c));
    return node;
  };

  S2.b64ToBytes = function (b64) {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  };

  S2.decodeScenario = function (enc) {
    const key = utf8("dl2-terminal-key");
    const raw = S2.b64ToBytes(enc);
    const bytes = raw.map((v, i) => v ^ key[i % key.length]);
    return JSON.parse(new TextDecoder().decode(bytes));
  };
})();
