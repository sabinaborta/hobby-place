// Invatat: lectii cu teorie si exercitii scrise; fara puncte sau animatii.
(function () {
  const { esc, route, mount, state, save, touch, backIcon } = HP;

  function shuffle(a) {
    const c = a.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  }

  function lessonState(id) {
    if (!state.lessons) state.lessons = {};
    if (!state.lessons[id]) state.lessons[id] = { answers: {}, results: {}, done: false };
    return state.lessons[id];
  }

  function unitProgress(u) {
    const s = state.lessons && state.lessons[u.id];
    const total = u.exercises.length;
    const checked = s ? u.exercises.filter((_, i) => s.results[i]).length : 0;
    return { checked, total, pct: Math.round((checked / total) * 100), done: !!(s && s.done) };
  }

  const backLink = (href, label) => `<a class="back" href="${href}"><span class="round small">${backIcon}</span>${esc(label)}</a>`;

  // ---------- Pagina materiilor ----------
  route(/^\/learning$/, () => {
    const view = mount({ section: 'learning', theme: 'study', noCoin: true });
    const langRow = (L) => `<a class="subject-row" href="#/learning/${L.id}"><span><b>${L.name}</b><small>${L.listNote} · ${L.weeks.length} săptămâni · ${L.units.length} unități · ${L.units.filter((u) => unitProgress(u).checked > 0).length} începute</small></span><span class="arrow" aria-hidden="true">→</span></a>`;
    view.innerHTML = `<div><h1 class="h1">Învățat</h1><p class="lead">Lecții pe rând: teorie, exemple, exerciții scrise.</p></div>
      <section class="subjects">
        ${window.LANGS.map(langRow).join('')}
        <a class="subject-row" href="#/learning/matematica"><span><b>Matematică</b><small>25 de săptămâni din planul tău: lecții, exerciții, teste</small></span><span class="arrow" aria-hidden="true">→</span></a>
        <a class="subject-row" href="#/learning/geografie"><span><b>Geografie</b><small>Țările lumii pe hartă și capitalele lor, pe continente</small></span><span class="arrow" aria-hidden="true">→</span></a>
        <a class="subject-row" href="#/learning/lucru-nou"><span><b>Un lucru nou pe zi</b><small>O lecție scurtă: istorie, știință, artă, filosofie, natură</small></span><span class="arrow" aria-hidden="true">→</span></a>
        <a class="subject-row" href="#/learning/claude"><span><b>Examen Claude (CCAR-F)</b><small>4 săptămâni: lecții, 2 examene de probă, fișe</small></span><span class="arrow" aria-hidden="true">→</span></a>
      </section>`;
  });

  function norm(s) {
    return s.trim().replace(/\s+/g, ' ').replace(/’/g, "'").replace(/^[¿¡]+|[?!.]+$/g, '').toLowerCase();
  }
  const bare = (s) => s.normalize('NFD').replace(/[̀-ͯ']/g, '');

  // ok: corect; accent: lipseste doar accentul; no: gresit.
  function grade(value, answers) {
    const list = [].concat(answers);
    const v = norm(value);
    if (!v) return 'no';
    if (list.some((a) => norm(a) === v)) return 'ok';
    if (list.some((a) => bare(norm(a)) === bare(v))) return 'accent';
    return 'no';
  }
  window.gradeAnswer = grade;

  function itemHtml(ex, ei, item, ii, s, L) {
    const [text, answer, hint] = item;
    const key = ei + '-' + ii;
    const val = s.answers[key] || '';
    const res = s.results[ei] && s.results[ei][ii];
    const shown = [].concat(answer)[0];
    const size = Math.max(6, shown.length + 2);
    const input = `<input class="fill${res ? ' ' + res : ''}" type="text" data-k="${key}" value="${esc(val)}" size="${size}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Răspuns ${ii + 1}">`;
    const parts = text.split('___');
    const body = parts.length > 1 ? `${esc(parts[0])}${input}${esc(parts[1])}` : `${esc(text)} ${input}`;
    let fb = '';
    if (res === 'no') fb = `<span class="fb no">Corect: ${esc(shown)}${hint ? ' · ' + esc(hint) : ''}</span>`;
    if (res === 'accent') fb = `<span class="fb no">${L.nearWord}: ${esc(shown)}</span>`;
    if (res === 'ok') fb = '<span class="fb ok">Corect</span>';
    return `<li><span class="ex-line">${body}</span>${fb}</li>`;
  }

  function exerciseHtml(ex, ei, s, L) {
    const r = s.results[ei];
    const score = r ? r.filter((x) => x === 'ok').length : 0;
    return `<section class="exercise" id="ex-${ei}">
      <div class="ex-head"><h3>Exercițiul ${ei + 1}. ${esc(ex.title)}</h3>${r ? `<span class="ex-score">${score}/${ex.items.length}</span>` : ''}</div>
      <p class="ex-instr">${esc(ex.instr)}</p>
      <ol class="ex-items">${ex.items.map((it, ii) => itemHtml(ex, ei, it, ii, s, L)).join('')}</ol>
      <div class="chips"><button class="btn" type="button" data-check="${ei}">Verifică</button>${r ? `<button class="btn ghost" type="button" data-redo="${ei}">Reia exercițiul</button>` : ''}</div>
    </section>`;
  }

  window.LANGS.forEach((L) => {
    route(new RegExp(`^/learning/${L.id}$`), () => {
      const view = mount({ section: 'learning', theme: 'study', noCoin: true });
      const book = L.book;
      const unitRow = (u) => {
        const p = unitProgress(u);
        return `<a class="unit-row" href="#/learning/${L.id}/${u.id}">
          <span class="unit-n">${u.n}</span>
          <span class="unit-main"><b>${esc(u.title)}</b><small>${esc(u.theme)}${u.pages ? ` · manual p. ${u.pages[0]}–${u.pages[1]}` : ''}</small></span>
          <span class="unit-state">${p.done ? 'Terminată' : p.checked ? `${p.checked}/${p.total} exerciții` : 'Neîncepută'}</span></a>`;
      };
      const rows = L.weeks.map((w) => `<section class="grade"><h2>${esc(w.title)}</h2><div class="unit-list">${w.units.map((id) => unitRow(L.units.find((u) => u.id === id))).join('')}</div></section>`).join('');
      const next = L.next.map(([n, t, s, p]) => `<div class="unit-row off"><span class="unit-n">${n}</span>
        <span class="unit-main"><b>${esc(t)}</b><small>${esc(s)} · manual de la p. ${p}</small></span><span class="unit-state">În pregătire</span></div>`).join('');
      view.innerHTML = `${backLink('#/learning', 'Materii')}
        <div class="headrow"><div><h1 class="h1">${L.name} A1–A2</h1><p class="lead">${L.lead}</p></div>
        ${book && location.protocol === 'file:' ? `<div class="chips"><a class="btn ghost" href="${book.student}" target="_blank" rel="noopener">Manualul</a><a class="btn ghost" href="${book.workbook}" target="_blank" rel="noopener">Caietul de exerciții</a></div>` : ''}</div>
        <section class="unit-list"><a class="unit-row" href="#/learning/${L.id}/povesti"><span class="unit-main"><b>Povești scurte</b><small>Citești și subliniezi cuvintele pe care nu le știi</small></span><span class="arrow" aria-hidden="true">→</span></a><a class="unit-row" href="#/learning/${L.id}/dictare"><span class="unit-main"><b>Dictare</b><small>Asculți propoziții din povești și le scrii</small></span><span class="arrow" aria-hidden="true">→</span></a><a class="unit-row" href="#/learning/${L.id}/cuvinte"><span class="unit-main"><b>Cuvintele mele</b><small>Lista ta, cu traduceri și recapitulare</small></span><span class="arrow" aria-hidden="true">→</span></a></section>
        ${rows}${next ? `<section class="grade"><h2>Urmează</h2><div class="unit-list">${next}</div></section>` : ''}`;
    });

    route(new RegExp(`^/learning/${L.id}/(${L.unitPattern})$`), (id) => {
      const u = L.units.find((x) => x.id === id);
      if (!u) { location.hash = `#/learning/${L.id}`; return; }
      const view = mount({ section: 'learning', theme: 'study', noCoin: true });
      const s = lessonState(id);
      const book = L.book;
      const page = (p) => (book ? `${book.student}#page=${p + book.offset}` : '');
      const idx = L.units.indexOf(u);
      const next = L.units[idx + 1];

      function remember() {
        const p = unitProgress(u);
        touch({ id: L.prefix + '-' + id, section: 'learning', title: `${L.name} · Unitatea ${u.n}`, sub: `${p.checked}/${p.total}`, pct: p.pct, href: `#/learning/${L.id}/` + id });
      }

      function draw(keep) {
        const y = keep ? window.scrollY : 0;
        view.innerHTML = `${backLink(`#/learning/${L.id}`, 'Toate unitățile')}
          <article class="lesson">
            <header class="lesson-head">
              <p class="kicker">Unitatea ${u.n}</p>
              <h1 class="h1">${esc(u.title)}</h1>
              <p class="lead">${esc(u.theme)}</p>
              ${u.pages ? `<p class="refs">În manual: ${location.protocol === 'file:' ? `<a href="${page(u.pages[0])}" target="_blank" rel="noopener">paginile ${u.pages[0]}–${u.pages[1]}</a>` : `paginile ${u.pages[0]}–${u.pages[1]}`}${u.grammar ? ` · gramatică: ${location.protocol === 'file:' ? `<a href="${page(u.grammar[0])}" target="_blank" rel="noopener">paginile ${u.grammar[0]}–${u.grammar[1]}</a>` : `paginile ${u.grammar[0]}–${u.grammar[1]}`}` : ''}</p>` : ''}
            </header>
            <section class="goals"><h2>La finalul lecției</h2><ul>${u.goals.map((g) => `<li>${esc(g)}</li>`).join('')}</ul></section>
            ${u.sections.map((sec, i) => `<section class="theory"><h2>${i + 1}. ${esc(sec.h)}</h2>${sec.html}</section>`).join('')}
            ${u.reading ? `<section class="reading"><h2>Lectură: ${esc(u.reading.title)}</h2><div class="story-text" lang="${L.code}">${u.reading.text.split(/\n\s*\n/).map((x) => `<p>${esc(x)}</p>`).join('')}</div>
              <a class="btn ghost" href="#/learning/${L.id}/povesti/r${u.n}">Deschide cu vocabular și subliniere</a></section>` : ''}
            <h2 class="ex-title">Exerciții</h2>
            ${u.exercises.map((ex, ei) => exerciseHtml(ex, ei, s, L)).join('')}
            <footer class="lesson-foot">
              <button class="btn${s.done ? ' ghost' : ''}" type="button" id="done">${s.done ? 'Terminată. Anulează marcajul' : 'Marchează lecția ca terminată'}</button>
              ${next ? `<a class="btn ghost" href="#/learning/${L.id}/${next.id}">Unitatea ${next.n}: ${esc(next.title)}</a>` : ''}
            </footer>
          </article>`;
        window.scrollTo(0, y);
      }

      view.addEventListener('input', (e) => {
        if (e.target.dataset.k) { s.answers[e.target.dataset.k] = e.target.value; save(); }
      });
      view.addEventListener('click', (e) => {
        const check = e.target.closest('[data-check]');
        const redo = e.target.closest('[data-redo]');
        if (check) {
          const ei = Number(check.dataset.check);
          s.results[ei] = u.exercises[ei].items.map((it, ii) => grade(s.answers[ei + '-' + ii] || '', it[1]));
          save();
          remember();
          draw(true);
        } else if (redo) {
          const ei = Number(redo.dataset.redo);
          delete s.results[ei];
          u.exercises[ei].items.forEach((_, ii) => { delete s.answers[ei + '-' + ii]; });
          save();
          draw(true);
        } else if (e.target.id === 'done') {
          s.done = !s.done;
          save();
          remember();
          draw(true);
        }
      });
      view.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' || !e.target.dataset.k) return;
        const all = [...view.querySelectorAll('input.fill')];
        const nextInput = all[all.indexOf(e.target) + 1];
        if (nextInput) nextInput.focus();
      });
      remember();
      draw(false);
    });

    // Vechile lectii de vocabular nu mai exista: curatam linkurile salvate la "Continuă".
    route(new RegExp(`^/learning/${L.id}/(\\w+)$`), (id) => {
      HP.forget(L.prefix + '-' + id);
      location.hash = `#/learning/${L.id}`;
    });
  });

  // ---------- Matematica si Claude: antrenament simplu pana sosesc materialele ----------
  route(/^\/learning\/matematica\/antrenament$/, () => {
    const view = mount({ section: 'learning', theme: 'study', noCoin: true });
    view.innerHTML = `${backLink('#/learning/matematica', 'Planul')}
      <div><h1 class="h1">Exerciții suplimentare</h1><p class="lead">Întrebări generate pe clase, în plus față de plan.</p></div>
      ${window.MATH_GRADES.map((g) => `<section class="grade"><h2>Clasa a ${g}-a</h2><div class="unit-list">${window.MATH_TOPICS.filter((t) => t.grade === g).map((t) => {
        const r = state.scores[t.id];
        return `<a class="unit-row" href="#/learning/matematica/${t.id}"><span class="unit-main"><b>${esc(t.title)}</b></span><span class="unit-state">${r ? `Ultimul scor bun: ${r.best}/${r.total}` : 'Neînceput'}</span></a>`;
      }).join('')}</div></section>`).join('')}`;
  });

  route(/^\/learning\/matematica\/([\w-]+)$/, (id) => {
    const topic = window.MATH_TOPICS.find((t) => t.id === id);
    if (!topic) { location.hash = '#/learning/matematica/antrenament'; return; }
    runDrill({ id, title: `Clasa a ${topic.grade}-a · ${topic.title}`, back: '#/learning/matematica/antrenament', questions: window.makeMathQuestions(topic, 10), href: '#/learning/matematica/' + id });
  });
  // Toate intrebarile pe aceeasi pagina, corectate la final.
  function runDrill(o) {
    const view = mount({ section: 'learning', theme: 'study', noCoin: true, narrow: true });
    const picks = {};
    let graded = false;
    const opts = o.questions.map((q) => shuffle(q.opts));

    function draw() {
      const correct = o.questions.filter((q, i) => picks[i] === q.a).length;
      view.innerHTML = `${backLink(o.back, 'Înapoi')}
        <div><h1 class="h1" style="font-size:clamp(24px,3.5vw,34px)">${esc(o.title)}</h1>
        ${graded ? `<p class="lead">Rezultat: ${correct} din ${o.questions.length}</p>` : `<p class="lead">${o.questions.length} întrebări. Le corectezi la final.</p>`}</div>
        <ol class="drill">${o.questions.map((q, i) => `<li class="exercise"><p class="drill-q">${esc(q.q)}</p>
          <div class="drill-opts">${opts[i].map((t) => {
            const isPick = picks[i] === t;
            const cls = graded ? (t === q.a ? ' ok' : isPick ? ' no' : '') : isPick ? ' picked' : '';
            return `<button type="button" class="drill-opt${cls}" data-q="${i}" data-v="${esc(t)}"${graded ? ' disabled' : ''} aria-pressed="${isPick}">${esc(t)}${graded && t === q.a ? ' (corect)' : ''}</button>`;
          }).join('')}</div></li>`).join('')}</ol>
        <div class="chips">${graded ? '<button class="btn" type="button" id="again">Alt set</button>' : '<button class="btn" type="button" id="grade">Corectează</button>'}<a class="btn ghost" href="${o.back}">Înapoi</a></div>`;
    }

    view.addEventListener('click', (e) => {
      const opt = e.target.closest('.drill-opt');
      if (opt && !graded) {
        picks[opt.dataset.q] = opt.dataset.v;
        const y = window.scrollY;
        draw();
        window.scrollTo(0, y);
      } else if (e.target.id === 'grade') {
        graded = true;
        const correct = o.questions.filter((q, i) => picks[i] === q.a).length;
        const prev = state.scores[o.id];
        state.scores[o.id] = { best: Math.max(correct, prev ? prev.best : 0), total: o.questions.length, title: o.title, href: o.href, at: Date.now() };
        touch({ id: o.id, section: 'learning', title: o.title, sub: `${correct}/${o.questions.length}`, pct: Math.round((correct / o.questions.length) * 100), href: o.href });
        save();
        draw();
        window.scrollTo(0, 0);
      } else if (e.target.id === 'again') {
        HP.render();
      }
    });
    draw();
  }
})();
