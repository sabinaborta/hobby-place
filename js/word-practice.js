// Spaniola: exercitii facute din cuvintele subliniate si dictare din povesti.
(function () {
  const { esc, route, mount, state, save, backIcon, toast, addPoints, onLeave } = HP;

  const screen = () => mount({ section: 'learning', theme: 'study', noCoin: true, narrow: true });
  const backLink = (href, label) => `<a class="back" href="${href}"><span class="round small">${backIcon}</span>${esc(label)}</a>`;

  const shuffle = (a) => {
    const c = a.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  };

  function speak(text, rate) {
    if (!window.speechSynthesis) { toast('Acest browser nu poate citi cu voce.'); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = rate || 0.85;
    speechSynthesis.speak(u);
  }

  const words = () => Object.values(state.words || {});
  const norm = (s) => s.trim().toLowerCase().replace(/[¿¡?!.,;:«»"“”—–-]/g, ' ').replace(/\s+/g, ' ').trim();
  const bare = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

  function compare(typed, answer) {
    const a = norm(typed);
    const b = norm(answer);
    if (a && a === b) return 'ok';
    if (a && bare(a) === bare(b)) return 'accent';
    return 'no';
  }

  // ---------- Exercitii din cuvintele tale ----------
  function makeQuestions(pool) {
    const withTr = pool.filter((w) => w.tr);
    const qs = [];
    shuffle(pool).forEach((w) => {
      const kinds = ['dictation'];
      if (w.ctx && new RegExp(`(^|[^\\p{L}])${w.word}([^\\p{L}]|$)`, 'iu').test(w.ctx)) kinds.push('cloze');
      if (w.tr) kinds.push('write');
      if (w.tr && withTr.length >= 4) kinds.push('choose');
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      qs.push({ kind, w });
    });
    return qs.slice(0, 12).map((q) => {
      if (q.kind === 'choose') {
        const others = shuffle(withTr.filter((x) => x.word !== q.w.word && x.tr !== q.w.tr)).slice(0, 3).map((x) => x.tr);
        return Object.assign(q, { opts: shuffle([q.w.tr, ...others]) });
      }
      return q;
    });
  }

  route(/^\/learning\/spaniola\/cuvinte\/exercitii$/, () => {
    const view = screen();
    const pool = words().filter((w) => !w.known);
    if (pool.length < 4) {
      view.innerHTML = `${backLink('#/learning/spaniola/cuvinte', 'Cuvintele mele')}<p class="empty">Ai nevoie de cel puțin 4 cuvinte subliniate de învățat. Acum ai ${pool.length}.</p><a class="btn" style="align-self:flex-start" href="#/learning/spaniola/povesti">Citește o poveste</a>`;
      return;
    }
    const qs = makeQuestions(pool);
    let i = 0;
    let good = 0;
    let answered = false;
    const missed = [];

    function questionHtml(q) {
      if (q.kind === 'choose') return `<p class="ex-instr">Alege traducerea.</p><h1 class="h1" lang="es">${esc(q.w.word)}</h1><div class="drill-opts">${q.opts.map((o) => `<button type="button" class="drill-opt" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
      if (q.kind === 'write') return `<p class="ex-instr">Scrie cuvântul în spaniolă.</p><h1 class="h1">${esc(q.w.tr)}</h1><input id="ans" class="own-in" autocomplete="off" autocapitalize="off" spellcheck="false" lang="es" aria-label="Răspuns">`;
      if (q.kind === 'cloze') {
        const re = new RegExp(`(^|[^\\p{L}])(${q.w.word})(?=[^\\p{L}]|$)`, 'iu');
        const line = esc(q.w.ctx.replace(re, '$1\u0001')).replace('\u0001', '_____');
        return `<p class="ex-instr">Completează cuvântul care lipsește.${q.w.tr ? ` Înseamnă: ${esc(q.w.tr)}.` : ''}</p><p class="serif cloze" lang="es">${line}</p><input id="ans" class="own-in" autocomplete="off" autocapitalize="off" spellcheck="false" lang="es" aria-label="Răspuns">`;
      }
      return `<p class="ex-instr">Ascultă și scrie cuvântul.</p><div><button class="btn ghost" type="button" id="hear">Ascultă</button></div><input id="ans" class="own-in" autocomplete="off" autocapitalize="off" spellcheck="false" lang="es" aria-label="Răspuns">`;
    }

    function draw() {
      if (i >= qs.length) {
        addPoints(good);
        view.innerHTML = `${backLink('#/learning/spaniola/cuvinte', 'Cuvintele mele')}<article class="lesson story"><h1 class="h1">${good} din ${qs.length}</h1>
          ${missed.length ? `<section><h2>De exersat</h2><ul>${[...new Set(missed)].map((w) => `<li lang="es"><b>${esc(w)}</b></li>`).join('')}</ul></section>` : '<p class="lead">Toate corecte.</p>'}
          <div class="chips"><button class="btn" type="button" id="again">Alt set</button><a class="btn ghost" href="#/learning/spaniola/cuvinte">Înapoi la listă</a></div></article>`;
        return;
      }
      const q = qs[i];
      answered = false;
      view.innerHTML = `${backLink('#/learning/spaniola/cuvinte', 'Cuvintele mele')}<article class="lesson story practice-card"><p class="kicker">Întrebarea ${i + 1} din ${qs.length}</p>
        ${questionHtml(q)}<div id="fb"></div>
        <div class="chips" id="acts">${q.kind === 'choose' ? '' : '<button class="btn" type="button" id="check">Verifică</button>'}</div></article>`;
      const inp = view.querySelector('#ans');
      if (inp) inp.focus();
      if (q.kind === 'dictation') speak(q.w.word);
    }

    function finishQuestion(result) {
      const q = qs[i];
      answered = true;
      if (result === 'ok') good++;
      else missed.push(q.w.word);
      const msg = result === 'ok' ? 'Corect.' : result === 'accent' ? `Atenție la accent: ${q.w.word}` : `Răspunsul corect: ${q.kind === 'choose' ? q.w.tr : q.w.word}`;
      view.querySelector('#fb').innerHTML = `<p class="fb-line ${result === 'ok' ? 'ok' : 'no'}">${esc(msg)}</p>`;
      view.querySelector('#acts').innerHTML = '<button class="btn" type="button" id="next">Continuă</button>';
      view.querySelector('#next').focus();
    }

    view.addEventListener('click', (e) => {
      const t = e.target;
      if (t.id === 'hear') speak(qs[i].w.word);
      else if (t.id === 'again') HP.render();
      else if (t.id === 'next') { i++; draw(); window.scrollTo(0, 0); }
      else if (t.id === 'check' && !answered) finishQuestion(compare(view.querySelector('#ans').value, qs[i].w.word));
      else if (t.dataset.o !== undefined && !answered) {
        const right = t.dataset.o === qs[i].w.tr;
        t.classList.add(right ? 'ok' : 'no');
        view.querySelectorAll('.drill-opt').forEach((b) => { if (b.dataset.o === qs[i].w.tr) b.classList.add('ok'); b.disabled = true; });
        finishQuestion(right ? 'ok' : 'no');
      }
    });
    view.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const btn = view.querySelector('#check') || view.querySelector('#next');
      if (btn && e.target.tagName === 'INPUT') { e.preventDefault(); btn.click(); }
    });
    onLeave(() => { if (window.speechSynthesis) speechSynthesis.cancel(); });
    draw();
  });

  // ---------- Dictare ----------
  function sentences(text) {
    return text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?»]*/g).map((s) => s.replace(/^[\s—«»-]+|[\s«»]+$/g, '').trim())
      .filter((s) => s.split(' ').length >= 3 && s.split(' ').length <= 16);
  }

  route(/^\/learning\/spaniola\/dictare$/, () => {
    const view = screen();
    const scores = state.dictation || {};
    view.innerHTML = `${backLink('#/learning/spaniola', 'Spaniolă')}
      <div><h1 class="h1">Dictare</h1><p class="lead">Asculți propoziții din povești și le scrii. Poți asculta de câte ori vrei.</p></div>
      <section class="unit-list">${window.STORIES.map((s) => `<a class="unit-row" href="#/learning/spaniola/dictare/${s.id}"><span class="unit-main"><b>${esc(s.title)}</b><small>${esc(s.level)}</small></span><span class="unit-state">${scores[s.id] ? `Ultima: ${scores[s.id]}` : ''}</span></a>`).join('')}</section>`;
  });

  route(/^\/learning\/spaniola\/dictare\/(\w+)$/, (id) => {
    const story = window.STORIES.find((s) => s.id === id);
    if (!story) { location.hash = '#/learning/spaniola/dictare'; return; }
    const view = screen();
    const list = shuffle(sentences(story.text)).slice(0, 8);
    let i = 0;
    let good = 0;
    let done = false;

    function draw() {
      if (i >= list.length) {
        if (!state.dictation) state.dictation = {};
        state.dictation[id] = `${good}/${list.length}`;
        save();
        addPoints(good * 2);
        view.innerHTML = `${backLink('#/learning/spaniola/dictare', 'Dictare')}<article class="lesson story"><h1 class="h1">${good} din ${list.length}</h1><p class="lead">${esc(story.title)}</p>
          <div class="chips"><button class="btn" type="button" id="again">Încă o dată</button><a class="btn ghost" href="#/learning/spaniola/povesti/${id}">Citește povestea</a></div></article>`;
        return;
      }
      done = false;
      view.innerHTML = `${backLink('#/learning/spaniola/dictare', 'Dictare')}<article class="lesson story practice-card"><p class="kicker">${esc(story.title)} · propoziția ${i + 1} din ${list.length}</p>
        <div class="chips"><button class="btn" type="button" id="hear">Ascultă</button><button class="btn ghost" type="button" id="slow">Mai rar</button></div>
        <label class="ex-instr" for="dict">Scrie ce auzi</label>
        <textarea id="dict" rows="3" lang="es" autocapitalize="off" spellcheck="false"></textarea>
        <div id="fb"></div><div class="chips" id="acts"><button class="btn" type="button" id="check">Verifică</button></div></article>`;
      speak(list[i]);
    }

    function diffHtml(typed, answer) {
      const said = norm(typed).split(' ');
      return answer.split(' ').map((w, k) => {
        const c = norm(w);
        const ok = said[k] === c;
        return `<span class="${ok ? '' : 'diff'}">${esc(w)}</span>`;
      }).join(' ');
    }

    view.addEventListener('click', (e) => {
      const t = e.target;
      if (t.id === 'hear') speak(list[i]);
      else if (t.id === 'slow') speak(list[i], 0.6);
      else if (t.id === 'again') HP.render();
      else if (t.id === 'next') { i++; draw(); window.scrollTo(0, 0); }
      else if (t.id === 'check' && !done) {
        done = true;
        const typed = view.querySelector('#dict').value;
        const r = compare(typed, list[i]);
        if (r === 'ok') good++;
        view.querySelector('#fb').innerHTML = `<p class="fb-line ${r === 'ok' ? 'ok' : 'no'}">${r === 'ok' ? 'Corect.' : r === 'accent' ? 'Aproape: verifică accentele.' : 'Textul corect, cu diferențele marcate:'}</p>${r === 'ok' ? '' : `<p class="serif cloze" lang="es">${diffHtml(typed, list[i])}</p>`}`;
        view.querySelector('#acts').innerHTML = '<button class="btn" type="button" id="next">Continuă</button>';
      }
    });
    onLeave(() => { if (window.speechSynthesis) speechSynthesis.cancel(); });
    draw();
  });
})();
