// Citit: raftul cu 100 de clasice si cititorul.
(function () {
  const { esc, route, mount, state, save, toast, addPoints, touch, backIcon, confetti } = HP;

  const covers = [['#5B6CB2', '#FFF'], ['#FF9F9F', '#14172B'], ['#DDF28B', '#14172B'], ['#EAD8FA', '#14172B'], ['#CBE6FD', '#14172B'], ['#FFC6DD', '#14172B'], ['#DCFBE8', '#14172B'], ['#14172B', '#FFF']];

  // Textele incarcate stau in IndexedDB: localStorage e prea mic pentru carti intregi.
  const memory = {};
  function db() {
    return new Promise((ok, fail) => {
      const r = indexedDB.open('hobbyplace-books', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('texts');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => fail(r.error);
    });
  }
  async function putText(id, text) {
    memory[id] = text;
    try {
      const d = await db();
      await new Promise((ok, fail) => {
        const t = d.transaction('texts', 'readwrite');
        t.objectStore('texts').put(text, id);
        t.oncomplete = ok;
        t.onerror = () => fail(t.error);
      });
    } catch (e) { toast('Textul rămâne doar până închizi pagina.'); }
  }
  async function getText(id) {
    if (memory[id]) return memory[id];
    try {
      const d = await db();
      return await new Promise((ok) => {
        const r = d.transaction('texts').objectStore('texts').get(id);
        r.onsuccess = () => ok(r.result || null);
        r.onerror = () => ok(null);
      });
    } catch (e) { return null; }
  }

  function info(id) {
    if (!state.books[id]) state.books[id] = { ch: 0, total: 0, done: false, notes: [], font: 18, pct: 0 };
    return state.books[id];
  }

  function sourceUrl(b) {
    return b.ro
      ? 'https://ro.wikisource.org/w/index.php?search=' + encodeURIComponent(b.title + ' ' + b.author)
      : 'https://www.gutenberg.org/ebooks/search/?query=' + encodeURIComponent(b.orig + ' ' + b.author.split(' ').pop());
  }

  const filters = [
    ['toate', 'Toate', () => true],
    ['curs', 'În curs', (b) => { const s = state.books[b.id]; return s && !s.done && s.pct > 0; }],
    ['citite', 'Citite', (b) => state.books[b.id] && state.books[b.id].done],
    ['nonfiction', 'Non-fiction', (b) => b.genre === 'Non-ficțiune'],
    ['roman', 'Romane', (b) => b.genre === 'Roman'],
    ['povestiri', 'Povestiri', (b) => b.genre === 'Povestiri'],
    ['teatru', 'Teatru', (b) => b.genre === 'Teatru'],
    ['poezie', 'Poezie', (b) => b.genre === 'Poezie'],
    ['epopee', 'Epopei', (b) => b.genre === 'Epopee'],
    ['ro', 'Autori români', (b) => b.ro],
    ['in-ro', 'În română', (b) => b.ro || hasRomanian(b.id)],
  ];

  function hasRomanian(id) {
    const src = window.BOOK_SOURCES && window.BOOK_SOURCES[id];
    return !!(src && src.ro);
  }

  function bookCard(b, i) {
    const [bg, fg] = covers[i % covers.length];
    const s = state.books[b.id];
    const tag = s && s.done ? 'Citită' : s && s.pct > 0 ? s.pct + '%' : !b.ro && hasRomanian(b.id) ? 'În română' : '';
    return `<a class="book" href="#/citit/${b.id}" style="background:${bg};color:${fg}">
      <span>${tag ? `<span class="tag">${tag}</span>` : ''}<span class="b-title" style="display:block">${esc(b.title)}</span></span>
      <span class="b-author">${esc(b.author)}</span></a>`;
  }

  let currentFilter = 'toate';

  route(/^\/citit$/, () => {
    const view = mount({ section: 'citit' });
    const done = Object.values(state.books).filter((b) => b.done).length;
    view.innerHTML = `<section class="headrow">
      <div><h1 class="h1">Biblioteca</h1><p class="lead">100 de clasice și ${window.BOOKS.length - 100} de cărți non-fiction.</p></div>
      <div class="panel" style="flex:1 1 280px;max-width:420px;padding:14px 18px;border-radius:20px">
        <div style="display:flex;justify-content:space-between;font-weight:800"><span>Raftul tău</span><span>${done}/${window.BOOKS.length}</span></div>
        <div style="height:8px;border-radius:8px;background:var(--blue-soft);margin-top:9px;overflow:hidden"><span style="display:block;width:${Math.round((done / window.BOOKS.length) * 100)}%;height:8px;background:var(--peri)"></span></div>
      </div></section>
      <div class="panel goal-panel">${window.Daily.goalHtml()}</div>
      <nav class="chips" aria-label="Filtre" id="filters"></nav>
      <section class="books" id="books" aria-label="Cărți"></section>`;

    function draw() {
      view.querySelector('#filters').innerHTML = filters.map(([id, label]) =>
        `<button type="button" class="tab${id === currentFilter ? ' on' : ''}" data-f="${id}" aria-pressed="${id === currentFilter}">${label}</button>`).join('');
      const test = filters.find((f) => f[0] === currentFilter)[2];
      const list = window.BOOKS.filter(test);
      view.querySelector('#books').innerHTML = list.length
        ? list.map((b) => bookCard(b, window.BOOKS.indexOf(b))).join('')
        : '<p class="empty" style="grid-column:1/-1">Nicio carte aici încă.</p>';
    }
    view.querySelector('#filters').addEventListener('click', (e) => {
      const b = e.target.closest('[data-f]');
      if (b) { currentFilter = b.dataset.f; draw(); }
    });
    draw();
  });

  // Cartile incluse sunt fisiere .js, singurul mod de a le citi cand pagina e deschisa direct din folder.
  const bundled = {};
  HP.bookLoaded = (id, text) => { bundled[id] = text; };
  function loadBundled(id) {
    if (bundled[id]) return Promise.resolve(bundled[id]);
    const base = id.replace(/-ro$/, '');
    if (!(window.BOOK_SOURCES && window.BOOK_SOURCES[base])) return Promise.resolve(null);
    return new Promise((ok) => {
      const s = document.createElement('script');
      s.src = `books/${id}.js`;
      s.onload = () => { s.remove(); ok(bundled[id] || null); };
      s.onerror = () => { s.remove(); ok(null); };
      document.head.appendChild(s);
    });
  }

  // Versurile si replicile isi pastreaza randurile; proza impachetata se uneste.
  // Textele de pe Wikisource au deja randurile corecte, deci versurile lungi raman intregi.
  function toParas(body, keepLines) {
    return body.split(/\n\s*\n/).map((p) => {
      const lines = p.split('\n').map((l) => l.trim()).filter(Boolean);
      if (!lines.length) return '';
      const short = lines.length > 1 && Math.max(...lines.map((l) => l.length)) < 56;
      return `<p>${keepLines || short ? lines.map(esc).join('<br>') : esc(lines.join(' '))}</p>`;
    }).join('');
  }

  function bookHeader(b, s, canSwitch, inRomanian) {
    return `<header style="display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px">
      <a class="round" href="#/citit" aria-label="Înapoi la raft">${backIcon}</a>
      <div style="flex:1 1 220px;min-width:0"><h1 class="serif" style="font-weight:900;font-size:22px;line-height:1.25">${esc(b.title)}</h1>
      <p style="font-weight:700;font-size:14px;margin-top:2px">${esc(b.author)} · ${esc(b.genre)}</p></div>
      <div class="chips">
        <button class="round" type="button" data-font="-1" aria-label="Micșorează textul">A−</button>
        <button class="round" type="button" data-font="1" aria-label="Mărește textul">A+</button>
        ${canSwitch ? `<button class="btn ghost" type="button" id="toggle-lang">${inRomanian ? 'Citește în engleză' : 'Citește în română'}</button>` : ''}
        <button class="btn ghost" type="button" id="toggle-done">${s.done ? 'Citită ✓' : 'Marchează citită'}</button>
      </div></header>`;
  }

  route(/^\/citit\/(b\d+)$/, async (id) => {
    const b = window.BOOKS.find((x) => x.id === id);
    if (!b) { location.hash = '#/citit'; return; }
    const view = mount({ noHeader: true, theme: 'reader' });
    const s = info(id);
    view.innerHTML = '<p class="empty">Deschid cartea…</p>';
    const stored = await getText(id);
    const source = window.BOOK_SOURCES && window.BOOK_SOURCES[id];
    const canSwitch = !stored && hasRomanian(id);
    const inRomanian = canSwitch && s.lang !== 'en';
    const text = stored || await loadBundled(inRomanian ? id + '-ro' : id);
    if (document.getElementById('view') !== view) return;

    function importer(label) {
      return `<div class="stack">
        <a class="btn" href="${sourceUrl(b)}" target="_blank" rel="noopener">Găsește textul gratuit (${b.ro ? 'Wikisource' : 'Project Gutenberg'})</a>
        <label class="btn ghost" style="cursor:pointer">${label}<input type="file" id="file" accept=".txt,text/plain" class="sr"></label>
      </div>`;
    }

    function bind() {
      view.querySelector('#toggle-done').addEventListener('click', () => {
        s.done = !s.done;
        if (s.done) { s.pct = 100; addPoints(50); confetti(); toast('Felicitări! +50 de puncte'); }
        else s.pct = s.total ? Math.round(((s.ch + 1) / s.total) * 100) : 0;
        save();
        draw();
      });
      view.querySelectorAll('[data-font]').forEach((btn) => btn.addEventListener('click', () => {
        s.font = Math.min(26, Math.max(14, (s.font || 18) + Number(btn.dataset.font) * 2));
        save();
        const p = view.querySelector('.prose');
        if (p) p.style.fontSize = s.font + 'px';
      }));
      const langBtn = view.querySelector('#toggle-lang');
      if (langBtn) langBtn.addEventListener('click', () => {
        s.lang = inRomanian ? 'en' : 'ro';
        s.ch = 0;
        s.opened = false;
        save();
        HP.render();
      });
      const file = view.querySelector('#file');
      if (file) file.addEventListener('change', async () => {
        const f = file.files[0];
        if (!f) return;
        const t = await f.text();
        if (!t.trim()) { toast('Fișierul e gol.'); return; }
        await putText(id, t);
        s.ch = 0;
        save();
        HP.render();
      });
    }

    // O pagina inseamna circa 1 500 de caractere; se numara cand ajungi cu citirea la ea.
    let scrollHandler = null;
    function trackChapter(ch) {
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
      if (!s.seen) s.seen = {};
      const key = (inRomanian ? 'ro' : 'en') + s.ch;
      const total = Math.max(1, Math.round(ch.body.length / 1500));
      scrollHandler = () => {
        const art = view.querySelector('.reader-main');
        if (!art) return;
        const box = art.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (window.innerHeight - box.top) / box.height));
        const read = Math.floor(ratio * total);
        const before = s.seen[key] || 0;
        if (read > before) {
          s.seen[key] = read;
          window.Daily.addPages(read - before);
          const goal = view.querySelector('#goal');
          if (goal) goal.innerHTML = window.Daily.goalHtml();
        }
      };
      window.addEventListener('scroll', scrollHandler, { passive: true });
      HP.onLeave(() => window.removeEventListener('scroll', scrollHandler));
    }

    function draw() {
      if (!text) {
        view.innerHTML = `${bookHeader(b, s, canSwitch, inRomanian)}
          <section class="panel stack" style="max-width:640px;padding:clamp(24px,4vw,40px)">
            <h2 class="serif" style="font-weight:900;font-size:24px">Cartea nu are încă text aici</h2>
            <p style="font-weight:700;line-height:1.6">Titlul original: ${esc(b.orig)}. Descarcă textul ca fișier .txt și încarcă-l aici. Rămâne pe calculatorul tău și ții minte capitolul la care ai ajuns.</p>
            ${importer('Încarcă fișierul .txt')}
          </section>`;
        bind();
        return;
      }
      const chapters = window.splitChapters(text);
      s.total = chapters.length;
      if (s.ch >= chapters.length) s.ch = 0;
      // La prima deschidere sarim peste pagina de titlu si cuprins.
      if (!s.opened) {
        s.opened = true;
        if (chapters.length > 1 && chapters[0].title.startsWith('Început') && !chapters[1].title.startsWith('Început')) s.ch = 1;
      }
      const ch = chapters[s.ch];
      if (!s.done) s.pct = Math.round(((s.ch + 1) / chapters.length) * 100);
      save();
      touch({ id, section: 'citit', title: b.title, sub: s.pct + '%', pct: s.pct, href: '#/citit/' + id });

      view.innerHTML = `${bookHeader(b, s, canSwitch, inRomanian)}
        <div class="panel goal-panel" id="goal">${window.Daily.goalHtml()}</div>
        <section class="reader-layout">
          <nav class="panel reader-side" aria-label="Capitole">
            <h2 style="font-size:16px;font-weight:800">Capitole</h2>
            <div class="ch-list">${chapters.map((c, i) => `<button type="button" class="ch${i === s.ch ? ' on' : ''}" data-ch="${i}"${i === s.ch ? ' aria-current="true"' : ''}>${esc(c.title)}</button>`).join('')}</div>
          </nav>
          <article class="panel reader-main">
            <p style="font-weight:800;font-size:14px;margin-bottom:12px">${esc(ch.title)}</p>
            <div class="prose" style="font-size:${s.font || 18}px">${toParas(ch.body, !stored && (inRomanian || (source && source.src.startsWith('Wikisource'))))}</div>
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:28px">
              <span style="font-weight:800;font-size:14px">${s.pct}%</span>
              <div style="flex:1 1 120px;height:8px;background:var(--lilac);border-radius:8px;overflow:hidden"><span style="display:block;width:${s.pct}%;height:8px;background:var(--violet)"></span></div>
              <button class="btn ghost" type="button" id="prev"${s.ch === 0 ? ' disabled' : ''}>Înapoi</button>
              <button class="btn" type="button" id="next"${s.ch >= chapters.length - 1 ? ' disabled' : ''}>Mai departe</button>
            </div>
          </article>
          <aside class="reader-side">
            <div class="panel stack">
              <h2 style="font-size:16px;font-weight:800">Pasaje salvate</h2>
              <button class="btn ghost" type="button" id="save-sel">Salvează textul selectat</button>
              ${(s.notes || []).map((n, i) => `<div class="note">${esc(n)} <button type="button" data-del="${i}" aria-label="Șterge pasajul" style="border:0;background:none;font-weight:800;min-width:24px;min-height:24px">×</button></div>`).join('')}
            </div>
            <div class="panel stack">
              <label for="nota" style="font-size:16px;font-weight:800">Notița mea</label>
              <textarea id="nota" rows="4" placeholder="Scrie ce ți-a plăcut…">${esc(s.memo || '')}</textarea>
            </div>
            <div class="panel stack">
              <h2 style="font-size:16px;font-weight:800">Despre text</h2>
              <p style="font-weight:700;font-size:15px;line-height:1.5">${stored ? 'Ediția încărcată de tine.' : inRomanian ? `Text în română. Sursă: <a href="${esc(source.ro.url)}" target="_blank" rel="noopener" style="text-decoration:underline">${esc(source.ro.src)}</a>.` : source ? `${source.lang === 'en' ? 'Text în engleză. ' : ''}Sursă: <a href="${esc(source.url)}" target="_blank" rel="noopener" style="text-decoration:underline">${esc(source.src)}</a>.` : ''}</p>
              <label class="btn ghost" style="cursor:pointer;padding:0 12px">${source && source.lang === 'en' && !inRomanian ? 'Încarcă o ediție în română (.txt)' : 'Încarcă altă ediție (.txt)'}<input type="file" id="file" accept=".txt,text/plain" class="sr"></label>
            </div>
          </aside>
        </section>`;
      bind();
      view.querySelectorAll('[data-ch]').forEach((btn) => btn.addEventListener('click', () => { s.ch = Number(btn.dataset.ch); draw(); window.scrollTo(0, 0); }));
      view.querySelector('#prev').addEventListener('click', () => { s.ch--; draw(); window.scrollTo(0, 0); });
      view.querySelector('#next').addEventListener('click', () => { s.ch++; addPoints(5); draw(); window.scrollTo(0, 0); });
      view.querySelector('#nota').addEventListener('input', (e) => { s.memo = e.target.value; save(); });
      view.querySelector('#save-sel').addEventListener('click', () => {
        const sel = String(window.getSelection()).trim();
        if (!sel) { toast('Selectează întâi un pasaj din text.'); return; }
        s.notes = (s.notes || []).concat(sel.slice(0, 400));
        save();
        draw();
      });
      trackChapter(ch);
      view.querySelectorAll('[data-del]').forEach((btn) => btn.addEventListener('click', () => { s.notes.splice(Number(btn.dataset.del), 1); save(); draw(); }));
    }
    draw();
  });
})();
