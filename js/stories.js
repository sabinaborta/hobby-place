// Povesti in spaniola: apesi pe un cuvant ca sa il subliniezi si il regasesti in lista ta.
(function () {
  const { esc, route, mount, state, save, backIcon, toast, dialog, touch } = HP;

  const screen = (narrow) => mount({ section: 'learning', theme: 'study', noCoin: true, narrow });
  const backLink = (href, label) => `<a class="back" href="${href}"><span class="round small">${backIcon}</span>${esc(label)}</a>`;

  function words() {
    if (!state.words) state.words = {};
    return state.words;
  }
  function customs() {
    if (!state.customStories) state.customStories = [];
    return state.customStories;
  }
  const allStories = () => [
    ...window.STORIES.map((s) => Object.assign({ group: 'stories' }, s)),
    ...customs().map((s) => Object.assign({ group: 'own', level: 'Textul tău' }, s)),
  ];

  const norm = (w) => w.toLowerCase();
  const WORD = /[\p{L}]+/gu;

  // Traducerea din vocabularele povestilor, daca exista.
  function lookup(word, story) {
    const w = norm(word);
    if (story && story.glossary && story.glossary[w]) return story.glossary[w];
    for (const s of window.STORIES) if (s.glossary[w]) return s.glossary[w];
    return '';
  }

  function speak(text, rate) {
    if (!window.speechSynthesis) { toast('Browserul nu poate citi cu voce.'); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = rate || 1;
    speechSynthesis.speak(u);
  }
  const dictUrl = (w) => 'https://translate.google.com/?sl=es&tl=ro&op=translate&text=' + encodeURIComponent(w);

  function sentenceOf(text, index) {
    const before = text.slice(0, index);
    const start = Math.max(before.lastIndexOf('.'), before.lastIndexOf('!'), before.lastIndexOf('?'), before.lastIndexOf('\n')) + 1;
    const rest = text.slice(index);
    const m = rest.search(/[.!?\n]/);
    return text.slice(start, m < 0 ? text.length : index + m + 1).trim();
  }

  // Textul devine butoane pentru fiecare cuvant, cu cele subliniate marcate.
  function textHtml(text) {
    const w = words();
    return text.split(/\n\s*\n/).map((para) => {
      let out = '';
      let last = 0;
      for (const m of para.matchAll(WORD)) {
        out += esc(para.slice(last, m.index));
        const key = norm(m[0]);
        const st = w[key];
        out += `<button type="button" class="wd${st ? (st.known ? ' known' : ' marked') : ''}" data-w="${esc(key)}" data-at="${m.index}">${esc(m[0])}</button>`;
        last = m.index + m[0].length;
      }
      return `<p>${out}${esc(para.slice(last))}</p>`;
    }).join('');
  }

  // ---------- Lista povestilor ----------
  route(/^\/learning\/spaniola\/povesti$/, () => {
    const view = screen();
    const row = (s) => {
      const count = [...new Set((s.text.match(WORD) || []).map(norm))].filter((w) => words()[w]).length;
      return `<a class="unit-row" href="#/learning/spaniola/povesti/${s.id}"><span class="unit-main"><b>${esc(s.title)}</b><small>${esc(s.level)} · ${(s.text.match(WORD) || []).length} de cuvinte</small></span><span class="unit-state">${count ? `${count} subliniate` : ''}</span></a>`;
    };
    const list = allStories();
    const section = (title, note, items) => (items.length ? `<section class="grade"><h2>${esc(title)}</h2>${note ? `<p class="plan-note" style="margin-bottom:8px">${esc(note)}</p>` : ''}<div class="unit-list">${items.map(row).join('')}</div></section>` : '');
    const total = Object.values(words()).filter((w) => !w.known).length;
    view.innerHTML = `${backLink('#/learning/spaniola', 'Spaniolă')}
      <div class="headrow"><div><h1 class="h1">Povești scurte</h1><p class="lead">Apasă pe orice cuvânt pe care nu îl știi, ca să îl subliniezi.</p></div>
      <a class="btn" href="#/learning/spaniola/cuvinte">Cuvintele mele (${total})</a></div>
      ${[...new Set(customs().filter((s) => s.book).map((s) => s.book))].map((b) => `<section class="grade"><div class="headrow" style="margin-bottom:8px"><h2 style="margin:0">${esc(b)}</h2><button class="tool" type="button" style="padding:0 12px" data-book="${esc(b)}">Șterge cartea</button></div><div class="unit-list">${list.filter((s) => s.book === b).map(row).join('')}</div></section>`).join('')}
      ${section('Povești', '', list.filter((s) => s.group === 'stories'))}
      ${section('Lecturi din lecții', '', list.filter((s) => s.group === 'lesson'))}
      ${section('Textele tale', '', list.filter((s) => s.group === 'own' && !s.book))}
      <section class="panel stack" style="max-width:820px">
        <h2 style="font-size:17px;font-weight:800">Adaugă o carte (EPUB)</h2>
        <p style="font-weight:700;line-height:1.5">Alege un fișier .epub. Capitolele apar aici ca povești și poți sublinia cuvinte în ele. Textul rămâne doar pe acest dispozitiv.</p>
        <div><label class="btn" style="cursor:pointer">Alege fișierul EPUB<input type="file" id="epub-file" accept=".epub,application/epub+zip" class="sr"></label></div>
        <p class="end-note" id="epub-status" hidden></p>
      </section>
      <section class="panel stack" style="max-width:820px">
        <h2 style="font-size:17px;font-weight:800">Adaugă un text în spaniolă</h2>
        <label style="font-weight:700">Titlu<input id="own-title" type="text" class="own-in"></label>
        <label style="font-weight:700">Text<textarea id="own-text" rows="6"></textarea></label>
        <div><button class="btn" type="button" id="own-add">Adaugă</button></div>
      </section>`;
    view.querySelector('#epub-file').addEventListener('change', async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const status = view.querySelector('#epub-status');
      status.hidden = false;
      status.textContent = 'Citesc cartea…';
      try {
        const book = await window.readEpub(f);
        const stamp = Date.now();
        book.chapters.forEach((c, i) => customs().push({ id: `own${stamp}x${i}`, book: book.title, title: c.title, text: c.text }));
        save();
        if (!localStorage.getItem('hobbyplace.v1') || !localStorage.getItem('hobbyplace.v1').includes(String(stamp))) throw new Error('quota');
        HP.render();
      } catch (err) {
        console.error(err);
        status.textContent = err.message === 'quota' ? 'Cartea este prea mare pentru spațiul disponibil.' : 'Nu am putut citi fișierul. Verifică dacă este un EPUB fără protecție.';
      }
    });
    view.addEventListener('click', (e) => {
      const b = e.target.dataset && e.target.dataset.book;
      if (!b) return;
      dialog('Ștergi cartea?', 'Cuvintele subliniate rămân în lista ta.', [
        { label: 'Da, șterge', onClick: () => { state.customStories = customs().filter((s) => s.book !== b); save(); HP.render(); } },
        { label: 'Nu', ghost: true },
      ]);
    });
    view.querySelector('#own-add').addEventListener('click', () => {
      const title = view.querySelector('#own-title').value.trim();
      const text = view.querySelector('#own-text').value.trim();
      if (!title || !text) { toast('Scrie un titlu și un text.'); return; }
      const id = 'own' + Date.now();
      customs().push({ id, title: title.slice(0, 80), text });
      save();
      location.hash = '#/learning/spaniola/povesti/' + id;
    });
  });

  // ---------- Cititorul ----------
  route(/^\/learning\/spaniola\/povesti\/(\w+)$/, (id) => {
    const story = allStories().find((s) => s.id === id);
    if (!story) { location.hash = '#/learning/spaniola/povesti'; return; }
    const view = screen(true);
    const shown = {};
    let active = null;

    function panelHtml() {
      if (!active) return '<p class="wp-empty">Apasă pe un cuvânt din text.</p>';
      const w = words()[active.key];
      const tr = w ? w.tr : lookup(active.key, story);
      return `<div class="wp-head"><b class="serif">${esc(active.key)}</b><button type="button" class="linkish" id="wp-say">Ascultă</button></div>
        <label class="wp-label">Traducere<input type="text" id="wp-tr" class="own-in" value="${esc(tr)}" autocomplete="off"></label>
        <div class="chips">
          ${w ? '<button type="button" class="tool" id="wp-del">Scoate sublinierea</button>' : '<button type="button" class="tool on" id="wp-add">Subliniază</button>'}
          <a class="tool wp-link" href="${dictUrl(active.key)}" target="_blank" rel="noopener">Caută traducerea</a>
        </div>`;
    }

    function drawText() {
      view.querySelector('#story-text').innerHTML = textHtml(story.text);
    }
    function drawPanel() {
      view.querySelector('#word-panel').innerHTML = panelHtml();
    }

    function addWord() {
      const tr = (view.querySelector('#wp-tr') || {}).value;
      words()[active.key] = { word: active.key, tr: (tr || lookup(active.key, story) || '').trim(), ctx: active.ctx, story: story.id, title: story.title, known: false, at: Date.now() };
      save();
      touch({ id: 'es-stories', section: 'learning', title: 'Spaniolă · ' + story.title, sub: '', pct: 50, href: '#/learning/spaniola/povesti/' + story.id });
    }

    view.innerHTML = `${backLink('#/learning/spaniola/povesti', 'Toate poveștile')}
      <article class="lesson story">
        <header><p class="kicker">${esc(story.level)}</p><h1 class="h1">${esc(story.title)}</h1>
        <div class="chips" style="margin-top:12px"><button class="tool" type="button" id="say">Ascultă povestea</button><button class="tool" type="button" id="say-slow">Mai rar</button><button class="tool" type="button" id="stop">Oprește</button>${window.STORIES.some((s) => s.id === story.id) ? `<a class="tool wp-link" href="#/learning/spaniola/dictare/${story.id}">Dictare</a>` : ''}</div></header>
        <div class="story-text" id="story-text" lang="es"></div>
        ${story.questions ? `<section><h2>Ai înțeles?</h2><ol class="ex-items">${story.questions.map((q, i) => `<li class="check"><span>${esc(q[0])}</span> <button type="button" class="linkish" data-q="${i}">Răspuns</button><div class="solution" id="ans-${i}" hidden>${esc(q[1])}</div></li>`).join('')}</ol></section>` : ''}
        ${story.glossary ? `<details class="plan-box"><summary><b>Vocabularul poveștii</b></summary><div class="tbl"><table><tbody>${Object.entries(story.glossary).map(([a, b]) => `<tr><td lang="es"><b>${esc(a)}</b></td><td>${esc(b)}</td></tr>`).join('')}</tbody></table></div></details>` : ''}
        ${story.group === 'own' && !story.book ? '<div><button class="tool" type="button" id="own-del" style="padding:0 14px">Șterge textul</button></div>' : ''}
      </article>
      <aside class="word-panel panel" id="word-panel" aria-live="polite"></aside>`;
    drawText();
    drawPanel();

    view.addEventListener('click', (e) => {
      const wd = e.target.closest('.wd');
      if (wd) {
        const fresh = !words()[wd.dataset.w];
        active = { key: wd.dataset.w };
        const paras = story.text.split(/\n\s*\n/);
        const paraEl = wd.closest('p');
        const para = paras[[...paraEl.parentElement.children].indexOf(paraEl)];
        active.ctx = sentenceOf(para, Number(wd.dataset.at));
        if (fresh) {
          drawPanel();
          addWord();
          drawText();
        }
        drawPanel();
        return;
      }
      const t = e.target;
      if (t.id === 'wp-add') { addWord(); drawText(); drawPanel(); }
      else if (t.id === 'wp-del') { delete words()[active.key]; save(); drawText(); drawPanel(); }
      else if (t.id === 'wp-say') speak(active.key);
      else if (t.id === 'say') speak(story.text);
      else if (t.id === 'say-slow') speak(story.text, 0.75);
      else if (t.id === 'stop') { if (window.speechSynthesis) speechSynthesis.cancel(); }
      else if (t.dataset.q !== undefined) {
        const box = view.querySelector('#ans-' + t.dataset.q);
        box.hidden = !box.hidden;
        t.textContent = box.hidden ? 'Răspuns' : 'Ascunde';
      } else if (t.id === 'own-del') {
        dialog('Ștergi textul?', 'Cuvintele subliniate rămân în lista ta.', [
          { label: 'Da, șterge', onClick: () => { state.customStories = customs().filter((s) => s.id !== story.id); save(); location.hash = '#/learning/spaniola/povesti'; } },
          { label: 'Nu', ghost: true },
        ]);
      }
    });
    view.addEventListener('input', (e) => {
      if (e.target.id === 'wp-tr' && active && words()[active.key]) {
        words()[active.key].tr = e.target.value;
        save();
      }
    });
    HP.onLeave(() => { if (window.speechSynthesis) speechSynthesis.cancel(); });
  });

  // ---------- Cuvintele mele ----------
  route(/^\/learning\/spaniola\/cuvinte$/, () => {
    const view = screen(true);
    let filter = 'invat';
    let quiz = null;

    function list() {
      return Object.values(words()).filter((w) => (filter === 'invat' ? !w.known : w.known)).sort((a, b) => b.at - a.at);
    }

    function draw() {
      const all = Object.values(words());
      const learning = all.filter((w) => !w.known);
      if (quiz) {
        const w = quiz.items[quiz.i];
        view.innerHTML = `${backLink('#/learning/spaniola/povesti', 'Povești')}
          <article class="lesson story"><p class="kicker">Recapitulare · ${quiz.i + 1} din ${quiz.items.length}</p>
          <h1 class="h1" lang="es">${esc(w.word)}</h1>
          <p class="ctx" lang="es">${esc(w.ctx || '')}</p>
          ${quiz.open ? `<div class="solution"><b>${esc(w.tr || 'Fără traducere încă')}</b></div>
            <div class="chips"><button class="btn" type="button" data-rate="known">Îl știu</button><button class="btn ghost" type="button" data-rate="again">Mai exersez</button></div>` : '<div><button class="btn" type="button" id="reveal">Arată traducerea</button></div>'}
          <div><button class="linkish" type="button" id="quit">Ieși din recapitulare</button></div></article>`;
        return;
      }
      const rows = list();
      view.innerHTML = `${backLink('#/learning/spaniola/povesti', 'Povești')}
        <div class="headrow"><div><h1 class="h1">Cuvintele mele</h1><p class="lead">${learning.length} de învățat, ${all.length - learning.length} știute.</p></div>
        <div class="chips">${learning.length ? '<button class="btn ghost" type="button" id="start">Recapitulează</button><a class="btn" href="#/learning/spaniola/cuvinte/exercitii">Exerciții din cuvintele mele</a>' : ''}</div></div>
        <div class="chips"><button type="button" class="tool${filter === 'invat' ? ' on' : ''}" data-f="invat" style="padding:0 14px">De învățat</button><button type="button" class="tool${filter === 'stiu' ? ' on' : ''}" data-f="stiu" style="padding:0 14px">Știute</button></div>
        ${rows.length ? `<ul class="word-list">${rows.map((w) => `<li><div class="wl-main"><b lang="es">${esc(w.word)}</b>
            <label class="sr" for="tr-${esc(w.word)}">Traducere</label><input id="tr-${esc(w.word)}" class="own-in" data-tr="${esc(w.word)}" value="${esc(w.tr || '')}" placeholder="Scrie traducerea" autocomplete="off">
            ${w.ctx ? `<p class="ctx" lang="es">${esc(w.ctx)}</p>` : ''}${w.title ? `<a class="wl-src" href="#/learning/spaniola/povesti/${esc(w.story)}">${esc(w.title)}</a>` : ''}</div>
            <div class="wl-act"><button type="button" class="tool" data-say="${esc(w.word)}">Ascultă</button><button type="button" class="tool" data-known="${esc(w.word)}">${w.known ? 'De reluat' : 'Îl știu'}</button><button type="button" class="tool" data-del="${esc(w.word)}">Șterge</button></div></li>`).join('')}</ul>`
          : `<p class="empty">${filter === 'invat' ? 'Niciun cuvânt încă. Deschide o poveste și apasă pe cuvintele pe care nu le știi.' : 'Niciun cuvânt marcat ca știut.'}</p>`}`;
    }

    view.addEventListener('click', (e) => {
      const t = e.target;
      if (t.dataset.f) { filter = t.dataset.f; draw(); }
      else if (t.id === 'start') {
        const items = Object.values(words()).filter((w) => !w.known).sort(() => Math.random() - 0.5);
        quiz = { items, i: 0, open: false };
        draw();
      } else if (t.id === 'reveal') { quiz.open = true; draw(); }
      else if (t.id === 'quit') { quiz = null; draw(); }
      else if (t.dataset.rate) {
        if (t.dataset.rate === 'known') { quiz.items[quiz.i].known = true; save(); }
        quiz.i++;
        quiz.open = false;
        if (quiz.i >= quiz.items.length) { quiz = null; toast('Recapitulare terminată.'); }
        draw();
      } else if (t.dataset.say) speak(t.dataset.say);
      else if (t.dataset.known) { const w = words()[t.dataset.known]; w.known = !w.known; save(); draw(); }
      else if (t.dataset.del) { delete words()[t.dataset.del]; save(); draw(); }
    });
    view.addEventListener('input', (e) => {
      if (e.target.dataset.tr) { words()[e.target.dataset.tr].tr = e.target.value; save(); }
    });
    draw();
  });
})();
