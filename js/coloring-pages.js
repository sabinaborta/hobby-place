// Paginile tale de colorat: incarci o imagine alb-negru si o colorezi cu umplere sau carioca.
// Imaginile raman doar in acest browser, in IndexedDB.
(function () {
  const { route, mount, esc, toast, dialog, backIcon, onLeave, forget } = HP;

  window.MARKERS = ['#14172B', '#7C818F', '#E2543E', '#FF9F9F', '#F58A3C', '#F5B60A', '#FFF06A', '#BFE36B', '#2F8F4E', '#8FD3F5', '#1D4FC4', '#5B6CB2', '#7A2FD6', '#FFC6DD', '#A9714B', '#FFFFFF'];

  function db() {
    return new Promise((ok, fail) => {
      const q = indexedDB.open('hobbyplace-pages', 1);
      q.onupgradeneeded = () => q.result.createObjectStore('pages', { keyPath: 'id' });
      q.onsuccess = () => ok(q.result);
      q.onerror = () => fail(q.error);
    });
  }
  async function store(mode, fn) {
    const d = await db();
    return new Promise((ok, fail) => {
      const tx = d.transaction('pages', mode);
      const out = fn(tx.objectStore('pages'));
      tx.oncomplete = () => ok(out && out.result);
      tx.onerror = () => fail(tx.error);
    });
  }
  const allPages = () => store('readonly', (s) => s.getAll());
  const getPage = (id) => store('readonly', (s) => s.get(id));
  const putPage = (p) => store('readwrite', (s) => s.put(p));
  const delPage = (id) => store('readwrite', (s) => s.delete(id));

  const loadImage = (src) => new Promise((ok, fail) => {
    const i = new Image();
    i.onload = () => ok(i);
    i.onerror = fail;
    i.src = src;
  });

  // Decupeaza imaginea (intreaga sau un sfert) si o scaleaza la cel mult 1000 px latime.
  function crop(img, part) {
    const halfW = img.width / 2;
    const halfH = img.height / 2;
    const rect = part === 'all' ? [0, 0, img.width, img.height] : [part.includes('r') ? halfW : 0, part.includes('b') ? halfH : 0, halfW, halfH];
    const scale = Math.min(1, 1000 / rect[2]);
    const cv = document.createElement('canvas');
    cv.width = Math.round(rect[2] * scale);
    cv.height = Math.round(rect[3] * scale);
    const g = cv.getContext('2d');
    g.fillStyle = '#FFF';
    g.fillRect(0, 0, cv.width, cv.height);
    g.drawImage(img, rect[0], rect[1], rect[2], rect[3], 0, 0, cv.width, cv.height);
    return cv.toDataURL('image/png');
  }

  // Umplere de la un punct: se opreste la liniile inchise, apoi creste 2 px sub linii.
  function floodFill(mask, w, h, sx, sy) {
    const seen = new Uint8Array(w * h);
    const start = sy * w + sx;
    if (mask[start]) return null;
    const stack = [start];
    seen[start] = 1;
    while (stack.length) {
      const i = stack.pop();
      const x = i % w;
      const nb = [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i - w, i + w];
      for (const n of nb) {
        if (n >= 0 && n < w * h && !seen[n] && !mask[n]) {
          seen[n] = 1;
          stack.push(n);
        }
      }
    }
    for (let pass = 0; pass < 2; pass++) {
      const add = [];
      for (let i = 0; i < w * h; i++) {
        if (seen[i]) continue;
        const x = i % w;
        if ((x > 0 && seen[i - 1]) || (x < w - 1 && seen[i + 1]) || seen[i - w] || seen[i + w]) add.push(i);
      }
      add.forEach((i) => { seen[i] = 1; });
    }
    return seen;
  }

  function hexRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function addScript(src) {
    return new Promise((ok, fail) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = ok;
      s.onerror = () => fail(new Error('Nu pot încărca ' + src));
      document.head.appendChild(s);
    });
  }

  async function pdfLib() {
    if (!window.pdfjsLib) {
      await addScript('js/vendor/pdf.min.js');
      // Deschisa din folder, pagina nu poate porni un worker separat; pdf.js lucreaza atunci pe firul principal.
      await addScript('js/vendor/pdf.worker.min.js');
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/vendor/pdf.worker.min.js';
    }
    return window.pdfjsLib;
  }

  function thumbnail(canvas) {
    const t = document.createElement('canvas');
    const k = 320 / canvas.width;
    t.width = 320;
    t.height = Math.round(canvas.height * k);
    const g = t.getContext('2d');
    g.fillStyle = '#FFF';
    g.fillRect(0, 0, t.width, t.height);
    g.drawImage(canvas, 0, 0, t.width, t.height);
    return t.toDataURL('image/jpeg', 0.7);
  }

  // Fiecare pagina din PDF devine o pagina de colorat, salvata doar in acest browser.
  async function importPdf(file, box) {
    const status = box.querySelector('#crop-box');
    status.innerHTML = '<p class="end-note" id="pdf-status">Deschid PDF-ul…</p>';
    const say = (t) => { const el = status.querySelector('#pdf-status'); if (el) el.textContent = t; };
    const lib = await pdfLib();
    const doc = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
    const base = file.name.replace(/\.pdf$/i, '').slice(0, 28);
    const stamp = Date.now();
    for (let n = 1; n <= doc.numPages; n++) {
      say(`Pregătesc pagina ${n} din ${doc.numPages}…`);
      const page = await doc.getPage(n);
      const first = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: Math.min(2.5, 1000 / first.width) });
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const g = canvas.getContext('2d');
      g.fillStyle = '#FFF';
      g.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: g, viewport }).promise;
      await putPage({ id: `p${stamp}x${n}`, name: `${base} · ${n}`, order: stamp + n, line: canvas.toDataURL('image/png'), thumb: thumbnail(canvas), paint: null });
      page.cleanup();
    }
    await doc.destroy();
    toast(`Am adăugat ${doc.numPages} pagini.`);
  }

  // ---------- Pagina Colorat ----------
  route(/^\/hobby\/colorat\/(numere|liber)\/(\w+)$/, (mode, id) => {
    forget('color-' + mode + id);
    location.hash = '#/hobby/colorat';
  });

  route(/^\/hobby\/colorat$/, () => {
    const view = mount({ section: 'hobby', theme: 'hobby' });
    view.innerHTML = '<div><h1 class="h1">Colorat</h1><p class="lead">Paginile tale, colorate cu umplere sau cu carioca.</p></div><section id="my-pages"></section>';
    renderMyPages(view.querySelector('#my-pages'));
  });

  async function renderMyPages(box) {
    let pages = [];
    try { pages = await allPages(); } catch (e) { /* fara IndexedDB nu se pot salva pagini */ }
    pages.sort((a, b) => (a.order || 0) - (b.order || 0));
    box.innerHTML = `<div class="panel stack"><h2 style="font-size:18px;font-weight:800">Adaugă pagini</h2>
      <p style="font-weight:700;line-height:1.5">Alege un PDF cu pagini de colorat sau o imagine. Din PDF, fiecare pagină devine o foaie separată. Fișierul rămâne doar pe acest dispozitiv.</p>
      <div class="drop-row"><label class="btn" style="cursor:pointer">Alege PDF sau imagine<input type="file" id="page-file" accept="application/pdf,.pdf,image/*" class="sr"></label>
      ${pages.length ? '<button class="btn ghost" type="button" id="clear-all">Șterge toate paginile</button>' : ''}</div>
      <div id="crop-box"></div></div>
      ${pages.length ? `<div class="draw-grid">${pages.map((p) => `<article class="draw-card"><img src="${p.thumb || p.line}" alt="" loading="lazy" style="width:100%;border-radius:12px"><h2>${esc(p.name)}</h2><a class="btn" href="#/hobby/colorat/pagina/${p.id}">Colorează</a></article>`).join('')}</div>` : '<p class="empty">Încă nu ai pagini. Adaugă primul fișier.</p>'}`;
    const clearAll = box.querySelector('#clear-all');
    if (clearAll) clearAll.addEventListener('click', () => {
      dialog('Ștergi toate paginile?', 'Paginile și culorile lor dispar din aplicație.', [
        { label: 'Da, șterge', onClick: async () => { await store('readwrite', (s) => s.clear()); renderMyPages(box); } },
        { label: 'Nu', ghost: true },
      ]);
    });
    const file = box.querySelector('#page-file');
    file.addEventListener('change', async () => {
      const f = file.files[0];
      if (!f) return;
      if (f.type === 'application/pdf' || /\.pdf$/i.test(f.name)) {
        try {
          await importPdf(f, box);
          renderMyPages(box);
        } catch (e) {
          box.querySelector('#crop-box').innerHTML = '';
          toast('Nu am putut deschide PDF-ul.');
          console.error(e);
        }
        return;
      }
      const url = await new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(f); });
      let img;
      try { img = await loadImage(url); } catch (e) { toast('Nu pot deschide imaginea.'); return; }
      const parts = [['all', 'Toată imaginea'], ['tl', 'Sus stânga'], ['tr', 'Sus dreapta'], ['bl', 'Jos stânga'], ['br', 'Jos dreapta']];
      const cb = box.querySelector('#crop-box');
      cb.innerHTML = `<div class="panel stack"><img class="upload-preview" src="${url}" alt="Imaginea încărcată"><p style="font-weight:700">Dacă imaginea are 4 pagini pe ea, alege una.</p><div class="chips">${parts.map(([k, l]) => `<button type="button" class="tool" style="padding:0 14px" data-part="${k}">${l}</button>`).join('')}</div></div>`;
      cb.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-part]');
        if (!b) return;
        const id = 'p' + Date.now();
        await putPage({ id, name: f.name.replace(/\.[^.]+$/, '').slice(0, 40), line: crop(img, b.dataset.part), paint: null });
        location.hash = '#/hobby/colorat/pagina/' + id;
      }, { once: true });
    });
  }

  // ---------- Pagina de colorat ----------
  route(/^\/hobby\/colorat\/pagina\/(\w+)$/, async (id) => {
    const view = mount({ section: 'hobby', theme: 'hobby' });
    const page = await getPage(id).catch(() => null);
    if (document.getElementById('view') !== view) return;
    if (!page) { location.hash = '#/hobby/colorat'; return; }

    let color = window.MARKERS[2];
    let tool = 'fill';
    let size = 18;

    view.innerHTML = `<section class="headrow"><div style="display:flex;align-items:center;gap:14px"><a class="round" href="#/hobby/colorat" aria-label="Înapoi la desene">${backIcon}</a><h1 class="h1" style="overflow-wrap:anywhere">${esc(page.name)}</h1></div></section>
      <section class="game">
        <div class="game-main"><div class="page-stage"><canvas id="paint"></canvas><canvas id="lines"></canvas></div></div>
        <aside class="game-side"><div class="panel stack">
          <h2 style="font-size:17px;font-weight:800">Cariocile tale</h2>
          <div class="palette" id="palette"></div>
          <div class="tools" style="margin-top:0">
            <button class="tool on" type="button" id="t-fill">Umple zona</button>
            <button class="tool" type="button" id="t-marker">Carioca</button>
            <button class="tool" type="button" id="t-erase">Radieră</button>
            <button class="tool" type="button" id="undo">Anulează</button>
          </div>
          <label style="font-weight:800">Grosime<input id="size" type="range" min="4" max="60" value="${size}" style="width:100%;min-height:44px"></label>
          <button class="tool" type="button" id="download">Descarcă imaginea</button>
          <button class="tool" type="button" id="remove">Șterge pagina</button>
        </div></aside></section>`;

    const paint = view.querySelector('#paint');
    const lines = view.querySelector('#lines');
    const img = await loadImage(page.line);
    const w = img.width;
    const h = img.height;
    [paint, lines].forEach((cv) => { cv.width = w; cv.height = h; });
    const pg = paint.getContext('2d', { willReadFrequently: true });
    const lg = lines.getContext('2d', { willReadFrequently: true });
    lg.drawImage(img, 0, 0);
    const src = lg.getImageData(0, 0, w, h).data;
    const mask = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
      mask[i] = 0.299 * src[i * 4] + 0.587 * src[i * 4 + 1] + 0.114 * src[i * 4 + 2] < 160 ? 1 : 0;
    }
    pg.fillStyle = '#FFF';
    pg.fillRect(0, 0, w, h);
    if (page.paint) pg.drawImage(await loadImage(page.paint), 0, 0);

    const undoStack = [];
    const remember = () => {
      undoStack.push(pg.getImageData(0, 0, w, h));
      if (undoStack.length > 12) undoStack.shift();
    };
    let saveTimer = null;
    const persist = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        page.paint = paint.toDataURL('image/png');
        putPage(page).catch(() => toast('Nu am putut salva.'));
      }, 500);
    };
    onLeave(() => {
      if (saveTimer) {
        clearTimeout(saveTimer);
        page.paint = paint.toDataURL('image/png');
        putPage(page).catch(() => {});
      }
    });

    const palette = view.querySelector('#palette');
    function drawPalette() {
      palette.innerHTML = window.MARKERS.map((hex) => `<button type="button" class="swatch${hex === color ? ' on' : ''}" data-c="${hex}" style="background:${hex}" aria-label="Culoare ${hex}"></button>`).join('');
    }
    drawPalette();
    palette.addEventListener('click', (e) => {
      const b = e.target.closest('[data-c]');
      if (!b) return;
      color = b.dataset.c;
      if (tool === 'erase') setTool('marker');
      drawPalette();
    });

    function setTool(t) {
      tool = t;
      view.querySelector('#t-fill').classList.toggle('on', t === 'fill');
      view.querySelector('#t-marker').classList.toggle('on', t === 'marker');
      view.querySelector('#t-erase').classList.toggle('on', t === 'erase');
    }
    view.querySelector('#t-fill').addEventListener('click', () => setTool('fill'));
    view.querySelector('#t-marker').addEventListener('click', () => setTool('marker'));
    view.querySelector('#t-erase').addEventListener('click', () => setTool('erase'));
    view.querySelector('#size').addEventListener('input', (e) => { size = Number(e.target.value); });
    view.querySelector('#undo').addEventListener('click', () => {
      const last = undoStack.pop();
      if (last) { pg.putImageData(last, 0, 0); persist(); }
    });

    const pos = (ev) => {
      const b = paint.getBoundingClientRect();
      return [Math.min(w - 1, Math.max(0, Math.floor(((ev.clientX - b.left) / b.width) * w))), Math.min(h - 1, Math.max(0, Math.floor(((ev.clientY - b.top) / b.height) * h)))];
    };

    function doFill(x, y) {
      const region = floodFill(mask, w, h, x, y);
      if (!region) { toast('Apasă în interiorul unei zone, nu pe linie.'); return; }
      remember();
      const data = pg.getImageData(0, 0, w, h);
      const [cr, cg, cb] = hexRgb(color);
      for (let i = 0; i < w * h; i++) {
        if (region[i]) {
          data.data[i * 4] = cr;
          data.data[i * 4 + 1] = cg;
          data.data[i * 4 + 2] = cb;
          data.data[i * 4 + 3] = 255;
        }
      }
      pg.putImageData(data, 0, 0);
      persist();
    }

    let drawing = false;
    paint.addEventListener('pointerdown', (ev) => {
      ev.preventDefault();
      const [x, y] = pos(ev);
      if (tool === 'fill') { doFill(x, y); return; }
      remember();
      drawing = true;
      paint.setPointerCapture(ev.pointerId);
      pg.strokeStyle = tool === 'erase' ? '#FFF' : color;
      pg.fillStyle = pg.strokeStyle;
      pg.lineWidth = size;
      pg.lineCap = 'round';
      pg.lineJoin = 'round';
      pg.beginPath();
      pg.moveTo(x, y);
      pg.lineTo(x, y);
      pg.stroke();
    });
    paint.addEventListener('pointermove', (ev) => {
      if (!drawing) return;
      const [x, y] = pos(ev);
      pg.lineTo(x, y);
      pg.stroke();
    });
    const end = () => { if (drawing) { drawing = false; persist(); } };
    paint.addEventListener('pointerup', end);
    paint.addEventListener('pointercancel', end);

    view.querySelector('#download').addEventListener('click', () => {
      const out = document.createElement('canvas');
      out.width = w;
      out.height = h;
      const g = out.getContext('2d');
      g.drawImage(paint, 0, 0);
      g.globalCompositeOperation = 'multiply';
      g.drawImage(lines, 0, 0);
      const a = document.createElement('a');
      a.href = out.toDataURL('image/png');
      a.download = page.name + '-colorat.png';
      a.click();
    });
    view.querySelector('#remove').addEventListener('click', () => {
      dialog('Ștergi pagina?', 'Imaginea și culorile ei dispar din aplicație.', [
        { label: 'Da, șterge', onClick: async () => { clearTimeout(saveTimer); saveTimer = null; await delPage(id); location.hash = '#/hobby/colorat'; } },
        { label: 'Nu', ghost: true },
      ]);
    });
  });
})();
