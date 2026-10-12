/* Смена 2 · блоки заданий: лаборатория изображений, hex-просмотр, таблицы, код, спектрограмма. */
(function () {
  "use strict";
  const S2 = window.Shift2;
  const el = S2.el;

  S2.renderBlocks = function (mission, container) {
    (mission.blocks || []).forEach((block) => {
      const wrap = el("section", { class: `s2-block s2-${block.kind}` });
      if (block.kind === "image") renderImage(block, wrap);
      else if (block.kind === "hex") renderHex(block, wrap);
      else if (block.kind === "table") renderTable(block, wrap);
      else if (block.kind === "code") renderCode(block, wrap);
      else if (block.kind === "audio") renderAudio(block, wrap);
      else if (block.kind === "terminal") S2.renderTerminal(block, wrap, mission);
      else if (block.kind === "note") wrap.append(el("div", { class: "s2-note", text: block.text }));
      container.append(wrap);
    });
  };

  const caption = (text, tag) => el("div", { class: "s2-caption" }, [el("span", { class: "s2-tag", text: tag || "" }), el("span", { text })]);

  // ======================================================== код и таблицы
  function renderCode(block, wrap) {
    const head = caption(block.caption || "Фрагмент", (block.lang || "text").toUpperCase());
    const copy = el("button", { type: "button", class: "s2-mini", text: "Копировать" });
    copy.addEventListener("click", () => {
      const done = () => { copy.textContent = "Скопировано"; setTimeout(() => (copy.textContent = "Копировать"), 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(block.text).then(done, done);
      else done();
    });
    head.append(copy);
    const pre = el("pre", { class: "s2-code" });
    pre.append(el("code", { text: block.text }));
    wrap.append(head, pre);
  }

  function renderTable(block, wrap) {
    wrap.append(caption(block.caption || "Таблица", "LOG"));
    const marks = new Set(block.mark || []);
    const table = el("table", { class: "s2-table" });
    const thead = el("thead");
    const tr = el("tr");
    block.columns.forEach((c) => tr.append(el("th", { text: c })));
    thead.append(tr);
    const tbody = el("tbody");
    block.rows.forEach((row, i) => {
      const r = el("tr", { class: marks.has(i) ? "mark" : "" });
      row.forEach((cell) => r.append(el("td", { text: cell })));
      tbody.append(r);
    });
    table.append(thead, tbody);
    wrap.append(el("div", { class: "s2-table-wrap" }, [table]));
  }

  // ======================================================== hex
  function hexdump(bytes) {
    const esc = (c) => (c === 38 ? "&amp;" : c === 60 ? "&lt;" : c === 62 ? "&gt;" : c >= 32 && c < 127 ? String.fromCharCode(c) : ".");
    const lines = [];
    for (let off = 0; off < bytes.length; off += 16) {
      const chunk = bytes.slice(off, off + 16);
      const left = Array.from(chunk.slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join(" ");
      const right = Array.from(chunk.slice(8), (b) => b.toString(16).padStart(2, "0")).join(" ");
      const asc = Array.from(chunk, esc).join("");
      lines.push(`<span class="off">${off.toString(16).padStart(8, "0")}</span>  <span class="hx">${left.padEnd(23)}  ${right.padEnd(23)}</span>  <span class="asc">|${asc}|</span>`);
    }
    return lines.join("\n");
  }

  function printableRuns(bytes, min) {
    const out = [];
    let start = -1;
    for (let i = 0; i <= bytes.length; i++) {
      const printable = i < bytes.length && bytes[i] >= 32 && bytes[i] < 127;
      if (printable && start < 0) start = i;
      if (!printable && start >= 0) {
        if (i - start >= min) out.push([start, String.fromCharCode(...bytes.slice(start, i))]);
        start = -1;
      }
    }
    return out;
  }

  function renderHex(block, wrap) {
    const bytes = S2.b64ToBytes(block.b64);
    wrap.append(caption(block.caption || "Дамп файла", "HEX"));
    const pre = el("pre", { class: "s2-hex" });
    pre.innerHTML = hexdump(bytes);
    const strBtn = el("button", { type: "button", class: "s2-mini", text: "Показать строки (strings)" });
    const strOut = el("pre", { class: "s2-strings hidden" });
    strBtn.addEventListener("click", () => {
      const runs = printableRuns(bytes, 4);
      strOut.textContent = runs.map(([off, s]) => `${off.toString(16).padStart(8, "0")}  ${s}`).join("\n") || "(строк не найдено)";
      strOut.classList.toggle("hidden");
    });
    wrap.append(pre, el("div", { class: "s2-actions" }, [strBtn, el("span", { class: "s2-meta", text: `${bytes.length} байт` })]), strOut);
  }

  // ======================================================== аудио + спектрограмма
  function fft(re, im) {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) {
      let bit = n >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
    }
    for (let len = 2; len <= n; len <<= 1) {
      const ang = (-2 * Math.PI) / len;
      const wr = Math.cos(ang), wi = Math.sin(ang);
      for (let i = 0; i < n; i += len) {
        let cr = 1, ci = 0;
        for (let k = 0; k < len / 2; k++) {
          const a = i + k, b = i + k + len / 2;
          const tr = re[b] * cr - im[b] * ci;
          const ti = re[b] * ci + im[b] * cr;
          re[b] = re[a] - tr; im[b] = im[a] - ti;
          re[a] += tr; im[a] += ti;
          const ncr = cr * wr - ci * wi;
          ci = cr * wi + ci * wr;
          cr = ncr;
        }
      }
    }
  }

  function parseWav(bytes) {
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let pos = 12, rate = 8000, bits = 8, dataStart = 44, dataLen = bytes.length - 44;
    while (pos + 8 <= bytes.length) {
      const id = String.fromCharCode(...bytes.slice(pos, pos + 4));
      const size = dv.getUint32(pos + 4, true);
      if (id === "fmt ") { rate = dv.getUint32(pos + 12, true); bits = dv.getUint16(pos + 22, true); }
      if (id === "data") { dataStart = pos + 8; dataLen = Math.min(size, bytes.length - dataStart); break; }
      pos += 8 + size + (size % 2);
    }
    const samples = new Float32Array(bits === 16 ? dataLen / 2 : dataLen);
    for (let i = 0; i < samples.length; i++) {
      samples[i] = bits === 16 ? dv.getInt16(dataStart + i * 2, true) / 32768 : (bytes[dataStart + i] - 128) / 128;
    }
    return { rate, samples };
  }

  function colorMap(t) {
    const stops = [[0, [5, 3, 20]], [0.3, [60, 20, 130]], [0.6, [217, 70, 239]], [0.82, [34, 211, 238]], [1, [255, 255, 255]]];
    for (let i = 1; i < stops.length; i++) {
      if (t <= stops[i][0]) {
        const [t0, c0] = stops[i - 1], [t1, c1] = stops[i];
        const u = (t - t0) / (t1 - t0);
        return c0.map((v, k) => Math.round(v + (c1[k] - v) * u));
      }
    }
    return stops[stops.length - 1][1];
  }

  function renderAudio(block, wrap) {
    const bytes = S2.b64ToBytes(block.b64);
    const url = URL.createObjectURL(new Blob([bytes], { type: "audio/wav" }));
    wrap.append(caption(block.caption || "Аудио", "WAV"));
    wrap.append(el("audio", { controls: "controls", src: url, class: "s2-audio" }));
    const canvas = el("canvas", { class: "s2-spectro hidden" });
    const gainIn = el("input", { type: "range", min: "1", max: "30", value: "8" });
    const controls = el("div", { class: "s2-actions hidden" }, [el("label", { class: "s2-mini-label" }, [document.createTextNode("Яркость "), gainIn]),
      el("a", { class: "s2-mini", href: url, download: "echo.wav", text: "Скачать WAV" })]);
    const btn = el("button", { type: "button", class: "s2-mini primary", text: "Построить спектрограмму" });
    let mags = null, frames = 0, bins = 256, maxMag = 1;

    const paint = () => {
      const gain = Number(gainIn.value);
      const img = canvas.getContext("2d").createImageData(frames * 2, bins);
      for (let f = 0; f < frames; f++) {
        for (let b = 0; b < bins; b++) {
          const v = Math.min(1, Math.log1p((mags[f * bins + b] / maxMag) * gain * 12) / Math.log1p(gain * 12));
          const [r, g, bl] = colorMap(v);
          const y = bins - 1 - b;
          for (let dx = 0; dx < 2; dx++) {
            const o = (y * frames * 2 + f * 2 + dx) * 4;
            img.data[o] = r; img.data[o + 1] = g; img.data[o + 2] = bl; img.data[o + 3] = 255;
          }
        }
      }
      canvas.getContext("2d").putImageData(img, 0, 0);
    };

    btn.addEventListener("click", () => {
      btn.disabled = true;
      btn.textContent = "Считаю…";
      setTimeout(() => {
        const { samples } = parseWav(bytes);
        const N = 512, hop = 96;
        frames = Math.floor((samples.length - N) / hop);
        bins = N / 2;
        mags = new Float32Array(frames * bins);
        const win = Float32Array.from({ length: N }, (_, i) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (N - 1)));
        const re = new Float64Array(N), im = new Float64Array(N);
        maxMag = 1e-9;
        for (let f = 0; f < frames; f++) {
          for (let i = 0; i < N; i++) { re[i] = samples[f * hop + i] * win[i]; im[i] = 0; }
          fft(re, im);
          for (let b = 0; b < bins; b++) {
            const m = Math.hypot(re[b], im[b]);
            mags[f * bins + b] = m;
            if (m > maxMag) maxMag = m;
          }
        }
        canvas.width = frames * 2;
        canvas.height = bins;
        paint();
        canvas.classList.remove("hidden");
        controls.classList.remove("hidden");
        btn.textContent = "Спектрограмма готова";
      }, 30);
    });
    gainIn.addEventListener("input", () => mags && paint());
    const axis = el("div", { class: "s2-spectro-axis hidden" }, [el("span", { text: "4 кГц" }), el("span", { text: "2 кГц" }), el("span", { text: "0" })]);
    canvas.addEventListener("transitionend", () => {});
    btn.addEventListener("click", () => axis.classList.remove("hidden"));
    wrap.append(el("div", { class: "s2-actions" }, [btn, el("span", { class: "s2-meta", text: "время → , частота ↑" })]), el("div", { class: "s2-spectro-host" }, [axis, canvas]), controls);
  }

  // ======================================================== изображения и лаборатория
  function renderImage(block, wrap) {
    wrap.append(caption(block.caption || "Изображение", "IMG"));
    if (!block.lab) {
      const img = el("img", { class: "s2-plain", src: block.src, alt: block.caption || "" });
      wrap.append(img);
      return;
    }
    buildLab(block, wrap);
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("не удалось загрузить " + src));
      img.src = src;
    });
  }

  function readPixels(img) {
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, c.width, c.height);
  }

  function buildLab(block, wrap) {
    const pair = block.lab && block.lab.pair;
    const lab = el("div", { class: "lab" });
    const status = el("div", { class: "lab-status", text: "Загружаю изображение…" });
    lab.append(status);
    wrap.append(lab);

    Promise.all([loadImage(block.src), pair ? loadImage(pair) : Promise.resolve(null)])
      .then(([imgA, imgB]) => {
        let dataA, dataB = null;
        try {
          dataA = readPixels(imgA);
          if (imgB) dataB = readPixels(imgB);
        } catch (e) {
          status.className = "lab-status warn";
          status.innerHTML = "Лаборатория читает пиксели, а браузер запрещает это для файлов, открытых двойным кликом. Открой полигон через сайт (GitHub Pages) или локальный сервер. Пока можно посмотреть изображение и скачать его.";
          lab.append(el("img", { class: "s2-plain", src: block.src, alt: "" }), el("a", { class: "s2-mini", href: block.src, download: "", text: "Скачать изображение" }));
          return;
        }
        status.remove();
        mountLab(lab, block, imgA, dataA, dataB);
      })
      .catch((err) => {
        status.className = "lab-status warn";
        status.textContent = String(err.message || err);
      });
  }

  function mountLab(lab, block, imgA, dataA, dataB) {
    const w = dataA.width, h = dataA.height;
    const state = { channel: "rgb", bit: -1, black: 0, white: 255, invert: false, flipH: false, flipV: false, mode: "a", zoom: "fit" };

    const display = el("canvas", { class: "lab-canvas", width: w, height: h });
    const dctx = display.getContext("2d");
    const off = document.createElement("canvas");
    off.width = w; off.height = h;
    const octx = off.getContext("2d");
    const view = el("div", { class: "lab-view" }, [display]);
    const probe = el("div", { class: "lab-probe", text: "Наведи курсор на изображение, чтобы увидеть значения пикселя" });
    const picks = el("div", { class: "lab-picks" });
    const qrOut = el("span", { class: "lab-qr" });

    // ---------- обработка ----------
    function render() {
      const A = dataA.data, B = dataB && dataB.data;
      const out = new Uint8ClampedArray(w * h * 4);
      const bp = state.black;
      const wp = Math.max(state.white, bp + 1);
      const scale = 255 / (wp - bp);
      const bit = state.bit;
      const ch = state.channel;
      const mode = state.mode;
      for (let o = 0; o < out.length; o += 4) {
        let r = A[o], g = A[o + 1], b = A[o + 2], a = A[o + 3];
        if (B && mode === "b") { r = B[o]; g = B[o + 1]; b = B[o + 2]; a = B[o + 3]; }
        else if (B && mode === "xor") { r ^= B[o]; g ^= B[o + 1]; b ^= B[o + 2]; a = 255; }
        else if (B && mode === "diff") { r = Math.abs(r - B[o]); g = Math.abs(g - B[o + 1]); b = Math.abs(b - B[o + 2]); a = 255; }
        let vr = r, vg = g, vb = b;
        if (ch === "r") vr = vg = vb = r;
        else if (ch === "g") vr = vg = vb = g;
        else if (ch === "b") vr = vg = vb = b;
        else if (ch === "a") vr = vg = vb = a;
        if (bit >= 0) { vr = ((vr >> bit) & 1) * 255; vg = ((vg >> bit) & 1) * 255; vb = ((vb >> bit) & 1) * 255; }
        vr = (vr - bp) * scale; vg = (vg - bp) * scale; vb = (vb - bp) * scale;
        vr = vr < 0 ? 0 : vr > 255 ? 255 : vr; vg = vg < 0 ? 0 : vg > 255 ? 255 : vg; vb = vb < 0 ? 0 : vb > 255 ? 255 : vb;
        if (state.invert) { vr = 255 - vr; vg = 255 - vg; vb = 255 - vb; }
        out[o] = vr; out[o + 1] = vg; out[o + 2] = vb; out[o + 3] = 255;
      }
      octx.putImageData(new ImageData(out, w, h), 0, 0);
      dctx.save();
      dctx.setTransform(state.flipH ? -1 : 1, 0, 0, state.flipV ? -1 : 1, state.flipH ? w : 0, state.flipV ? h : 0);
      dctx.drawImage(off, 0, 0);
      dctx.restore();
    }
    let queued = false;
    const refresh = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; render(); });
    };

    function applyZoom() {
      const z = state.zoom;
      display.classList.toggle("pixelated", z !== "fit");
      if (z === "fit") { display.style.width = "100%"; display.style.maxWidth = Math.max(w, 900) + "px"; }
      else { display.style.width = w * Number(z) + "px"; display.style.maxWidth = "none"; }
    }

    // ---------- элементы управления ----------
    const seg = (label, value, group, isOn) => {
      const b = el("button", { type: "button", class: "seg" + (isOn ? " on" : ""), text: label });
      b.addEventListener("click", () => { group.querySelectorAll(".seg").forEach((x) => x.classList.remove("on")); b.classList.add("on"); state.channel = value; refresh(); });
      return b;
    };
    const chanGroup = el("div", { class: "seg-group" });
    [["RGB", "rgb"], ["R", "r"], ["G", "g"], ["B", "b"], ["A", "a"]].forEach(([l, v], i) => chanGroup.append(seg(l, v, chanGroup, i === 0)));

    const bitSel = el("select", {});
    bitSel.append(el("option", { value: "-1", text: "Все биты" }));
    for (let k = 7; k >= 0; k--) bitSel.append(el("option", { value: String(k), text: `Бит ${k}` + (k === 7 ? " (старший)" : k === 0 ? " (младший)" : "") }));
    bitSel.addEventListener("change", () => { state.bit = Number(bitSel.value); refresh(); });

    const mkRange = (key, labelText) => {
      const out = el("output", { text: String(state[key]) });
      const input = el("input", { type: "range", min: "0", max: "255", value: String(state[key]) });
      input.addEventListener("input", () => { state[key] = Number(input.value); out.textContent = input.value; refresh(); });
      const row = el("label", { class: "lab-range" }, [el("span", { text: labelText }), input, out]);
      row.sync = () => { input.value = state[key]; out.textContent = state[key]; };
      return row;
    };
    const blackRow = mkRange("black", "Чёрная точка");
    const whiteRow = mkRange("white", "Белая точка");

    const check = (label, key) => {
      const input = el("input", { type: "checkbox" });
      input.addEventListener("change", () => { state[key] = input.checked; refresh(); });
      return Object.assign(el("label", { class: "lab-check" }, [input, el("span", { text: label })]), { input });
    };
    const cInvert = check("Инверсия", "invert");
    const cFlipH = check("Отразить ↔", "flipH");
    const cFlipV = check("Отразить ↕", "flipV");

    const zoomSel = el("select", {});
    [["fit", "Вписать"], ["1", "×1"], ["2", "×2"], ["4", "×4"], ["8", "×8"]].forEach(([v, t]) => zoomSel.append(el("option", { value: v, text: t })));
    zoomSel.addEventListener("change", () => { state.zoom = zoomSel.value; applyZoom(); });

    let modeSel = null;
    if (dataB) {
      modeSel = el("select", {});
      [["a", "Только A"], ["b", "Только B"], ["xor", "A XOR B"], ["diff", "|A − B|"]].forEach(([v, t]) => modeSel.append(el("option", { value: v, text: t })));
      modeSel.addEventListener("change", () => { state.mode = modeSel.value; refresh(); });
    }

    const autoBtn = el("button", { type: "button", class: "s2-mini", text: "Авто-уровни" });
    autoBtn.addEventListener("click", () => {
      // растянуть диапазон по реальным значениям (без 0,05% выбросов)
      const hist = new Uint32Array(256);
      const A = dataA.data, B = dataB && dataB.data;
      let total = 0;
      for (let o = 0; o < A.length; o += 4) {
        let r = A[o], g = A[o + 1], b = A[o + 2], a = A[o + 3];
        if (B && state.mode === "b") { r = B[o]; g = B[o + 1]; b = B[o + 2]; a = B[o + 3]; }
        else if (B && state.mode === "xor") { r ^= B[o]; g ^= B[o + 1]; b ^= B[o + 2]; a = 255; }
        else if (B && state.mode === "diff") { r = Math.abs(r - B[o]); g = Math.abs(g - B[o + 1]); b = Math.abs(b - B[o + 2]); }
        let v = state.channel === "r" ? r : state.channel === "g" ? g : state.channel === "b" ? b : state.channel === "a" ? a : Math.round((r + g + b) / 3);
        if (state.bit >= 0) v = ((v >> state.bit) & 1) * 255;
        hist[v]++; total++;
      }
      const cut = Math.max(1, Math.floor(total * 0.0005));
      let lo = 0, acc = 0;
      while (lo < 255 && acc + hist[lo] <= cut) acc += hist[lo++];
      let hi = 255; acc = 0;
      while (hi > 0 && acc + hist[hi] <= cut) acc += hist[hi--];
      if (hi <= lo) hi = Math.min(255, lo + 1);
      state.black = lo; state.white = hi;
      blackRow.sync(); whiteRow.sync();
      refresh();
    });

    const resetBtn = el("button", { type: "button", class: "s2-mini", text: "Сброс" });
    resetBtn.addEventListener("click", () => {
      Object.assign(state, { channel: "rgb", bit: -1, black: 0, white: 255, invert: false, flipH: false, flipV: false, mode: "a" });
      chanGroup.querySelectorAll(".seg").forEach((x, i) => x.classList.toggle("on", i === 0));
      bitSel.value = "-1"; blackRow.sync(); whiteRow.sync();
      cInvert.input.checked = cFlipH.input.checked = cFlipV.input.checked = false;
      if (modeSel) modeSel.value = "a";
      qrOut.textContent = "";
      refresh();
    });

    const dl = el("a", { class: "s2-mini", href: block.src, download: "", text: "Скачать оригинал" });
    const buttons = [autoBtn, resetBtn, dl];
    if (window.BarcodeDetector) {
      const qrBtn = el("button", { type: "button", class: "s2-mini primary", text: "Распознать QR" });
      qrBtn.addEventListener("click", async () => {
        try {
          const det = new window.BarcodeDetector({ formats: ["qr_code"] });
          const found = await det.detect(display);
          qrOut.textContent = found.length ? "QR: " + found[0].rawValue : "QR не найден. Попробуй отразить и инвертировать изображение.";
        } catch (e) {
          qrOut.textContent = "Этот браузер не распознаёт QR. Наведи камеру телефона на экран.";
        }
      });
      buttons.push(qrBtn);
    }

    const field = (label, node) => el("div", { class: "lab-field" }, [el("span", { class: "lab-label", text: label }), node]);
    const controls = el("div", { class: "lab-controls" }, [
      field("Канал", chanGroup),
      field("Битовая плоскость", bitSel),
      el("div", { class: "lab-field wide" }, [el("span", { class: "lab-label", text: "Уровни" }), blackRow, whiteRow]),
      field("Преобразования", el("div", { class: "lab-checks" }, [cInvert, cFlipH, cFlipV])),
      field("Масштаб", zoomSel),
    ]);
    if (modeSel) controls.insertBefore(field("Сравнение A и B", modeSel), controls.children[1]);
    const actions = el("div", { class: "s2-actions" }, [...buttons, qrOut]);

    lab.append(view, probe, picks, controls, actions);
    applyZoom();
    render();

    // ---------- пипетка ----------
    const pixelAt = (e) => {
      const rect = display.getBoundingClientRect();
      let x = Math.floor(((e.clientX - rect.left) / rect.width) * w);
      let y = Math.floor(((e.clientY - rect.top) / rect.height) * h);
      x = Math.max(0, Math.min(w - 1, x)); y = Math.max(0, Math.min(h - 1, y));
      if (state.flipH) x = w - 1 - x;
      if (state.flipV) y = h - 1 - y;
      return { x, y };
    };
    const readout = ({ x, y }) => {
      const o = (y * w + x) * 4;
      const A = dataA.data;
      let text = `x=${x}, y=${y} · A: R=${A[o]} G=${A[o + 1]} B=${A[o + 2]} α=${A[o + 3]}  #${[A[o], A[o + 1], A[o + 2]].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
      if (dataB) { const B = dataB.data; text += ` · B: R=${B[o]} G=${B[o + 1]} B=${B[o + 2]}`; }
      return text;
    };
    display.addEventListener("mousemove", (e) => { probe.textContent = readout(pixelAt(e)); });
    display.addEventListener("mouseleave", () => { probe.textContent = "Наведи курсор на изображение, чтобы увидеть значения пикселя"; });
    display.addEventListener("click", (e) => {
      const p = pixelAt(e);
      const o = (p.y * w + p.x) * 4;
      const A = dataA.data;
      if (!picks.children.length) {
        const title = el("span", { class: "pick-title", text: "Метки (клик):" });
        const clear = el("button", { type: "button", class: "s2-mini", text: "Очистить" });
        clear.addEventListener("click", () => { picks.innerHTML = ""; });
        picks.append(title, clear);
      }
      const chip = el("span", { class: "pick", text: `${p.x},${p.y} → R${A[o]} G${A[o + 1]} B${A[o + 2]}` });
      picks.insertBefore(chip, picks.lastChild);
    });
  }
})();
