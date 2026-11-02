// Cursuri pe saptamani: lectii, exercitii pe hartie, teste cronometrate, examene de proba, fise de recapitulare.
(function () {
  const { esc, route, mount, state, save, touch, backIcon, fmtTime, onLeave, dialog } = HP;

  // Textele din materialele in engleza au `cod` si **bold**.
  function inline(s) {
    return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  }

  const backLink = (href, label) => `<a class="back" href="${href}"><span class="round small">${backIcon}</span>${esc(label)}</a>`;
  const screen = () => mount({ section: 'learning', theme: 'study', noCoin: true });

  function weekState(cid, wid) {
    if (!state.courses) state.courses = {};
    if (state.mathWeeks && state.mathWeeks.s1) {
      const old = state.mathWeeks.s1;
      state.courses.matematica = { s1: { read: old.read || {}, solved: old.solved || {}, tests: old.test ? { 4: old.test } : {}, exams: {}, cards: {} } };
      delete state.mathWeeks;
    }
    const c = state.courses[cid] || (state.courses[cid] = {});
    return c[wid] || (c[wid] = { read: {}, solved: {}, tests: {}, exams: {}, cards: {} });
  }

  function allProblems(s) {
    return s.tiers.flatMap((t) => t.items);
  }

  function status(s, w) {
    if (s.kind === 'lesson') return w.read[s.n] ? 'Citită' : 'Neîncepută';
    if (s.kind === 'exercises') {
      const ok = allProblems(s).filter((it) => w.solved[it[0]] === 'ok').length;
      return ok ? `${ok}/${allProblems(s).length} rezolvate` : 'Neîncepute';
    }
    if (s.kind === 'test') {
      const t = w.tests[s.n];
      return t && t.score !== undefined ? `${t.score}/100` : 'Nedat';
    }
    if (s.kind === 'exam') {
      const e = w.exams[s.n];
      return e && e.score !== undefined ? `${e.score}%` : 'Nedat';
    }
    const known = Object.values(w.cards[s.n] || {}).filter((v) => v === 'ok').length;
    return known ? `${known} știute` : 'Neîncepute';
  }

  function sessionDone(s, w) {
    if (s.kind === 'lesson') return !!w.read[s.n];
    if (s.kind === 'exercises') return allProblems(s).every((it) => w.solved[it[0]]);
    if (s.kind === 'test') return !!(w.tests[s.n] && w.tests[s.n].score !== undefined);
    if (s.kind === 'exam') return !!(w.exams[s.n] && w.exams[s.n].score !== undefined);
    return Object.keys(w.cards[s.n] || {}).length > 0;
  }

  const kindLabel = { lesson: 'Lecție', exercises: 'Exerciții', test: 'Test', exam: 'Examen de probă', cards: 'Fișe de recapitulare' };

  function nextSession(week, s) {
    return week.sessions[week.sessions.indexOf(s) + 1];
  }

  function footerNext(c, week, s) {
    const next = nextSession(week, s);
    return next ? `<a class="btn ghost" href="#/learning/${c.id}/${week.id}/${next.n}">Sesiunea ${next.n}: ${esc(next.title)}</a>` : `<a class="btn ghost" href="#/learning/${c.id}">Înapoi la plan</a>`;
  }

  function remember(c, week, s, sub, pct) {
    touch({ id: `c-${c.id}`, section: 'learning', title: `${c.short} · ${week.short || week.title}`, sub, pct, href: `#/learning/${c.id}/${week.id}/${s.n}` });
  }

  // ---------- Pagina cursului ----------
  route(/^\/learning\/(matematica|claude)$/, (cid) => {
    const c = window.COURSES[cid];
    const view = screen();
    view.innerHTML = `${backLink('#/learning', 'Materii')}
      <div><h1 class="h1">${esc(c.title)}</h1><p class="lead">${esc(c.lead)}</p></div>
      ${c.intro ? `<div class="plan-box">${c.intro}</div>` : ''}
      <section class="unit-list">${c.weeks.map((wk, i) => {
        const w = weekState(c.id, wk.id);
        const done = wk.sessions.filter((s) => sessionDone(s, w)).length;
        return `<a class="unit-row" href="#/learning/${c.id}/${wk.id}"><span class="unit-n">${i + 1}</span>
          <span class="unit-main"><b>${esc(wk.title)}</b><small>${esc(wk.tagline || '')}</small></span>
          <span class="unit-state">${done}/${wk.sessions.length} sesiuni</span></a>`;
      }).join('')}</section>
      ${c.after || ''}`;
  });

  // ---------- Pagina saptamanii ----------
  route(/^\/learning\/(matematica|claude)\/(s\d+)$/, (cid, wid) => {
    const c = window.COURSES[cid];
    const wk = c.weeks.find((x) => x.id === wid);
    if (!wk) { location.hash = `#/learning/${cid}`; return; }
    const view = screen();
    const w = weekState(cid, wid);
    view.innerHTML = `${backLink(`#/learning/${cid}`, 'Planul')}
      <div><p class="kicker">${esc(wk.phase || '')}</p><h1 class="h1">${esc(wk.title)}</h1><p class="lead">${esc(wk.lead)}</p></div>
      <section class="unit-list">${wk.sessions.map((s) => `<a class="unit-row" href="#/learning/${cid}/${wid}/${s.n}"><span class="unit-n">${s.n}</span>
        <span class="unit-main"><b>${esc(s.title)}</b><small>${kindLabel[s.kind]}${s.minutes ? ` · ${s.minutes} min` : ''}</small></span>
        <span class="unit-state">${esc(status(s, w))}</span></a>`).join('')}</section>
      ${wk.advice ? `<p class="plan-note">${esc(wk.advice)}</p>` : ''}`;
  });

  // ---------- Lectie ----------
  function lessonPage(c, wk, s, w) {
    const view = screen();
    const shown = {};
    function draw() {
      view.innerHTML = `${backLink(`#/learning/${c.id}/${wk.id}`, wk.short || wk.title)}
        <article class="lesson math">
          <header><p class="kicker">Sesiunea ${s.n}${s.minutes ? ` · ${s.minutes} min` : ''}</p><h1 class="h1">${esc(s.title)}</h1>${s.intro ? `<p class="lead">${esc(s.intro)}</p>` : ''}</header>
          ${s.goals ? `<section class="goals"><h2>La finalul lecției</h2><ul>${s.goals.map((g) => `<li>${g}</li>`).join('')}</ul></section>` : ''}
          <div class="theory">${s.html}</div>
          ${s.checks ? `<section><h2>Întrebări de control</h2><p class="ex-instr">Răspunde întâi cu voce tare sau pe hârtie, apoi verifică.</p>
            <ol class="ex-items">${s.checks.map((q, i) => `<li class="check"><span>${q[0]}</span> <button type="button" class="linkish" data-show="${i}" aria-expanded="${!!shown[i]}">${shown[i] ? 'Ascunde' : 'Răspuns'}</button>${shown[i] ? `<div class="solution">${q[1]}</div>` : ''}</li>`).join('')}</ol></section>` : ''}
          <footer class="lesson-foot">
            <button class="btn${w.read[s.n] ? ' ghost' : ''}" type="button" id="read">${w.read[s.n] ? 'Citită. Anulează marcajul' : 'Am terminat lecția'}</button>
            ${footerNext(c, wk, s)}
          </footer>
        </article>`;
    }
    view.addEventListener('click', (e) => {
      const b = e.target.closest('[data-show]');
      if (!b && e.target.id !== 'read') return;
      const y = window.scrollY;
      if (b) shown[b.dataset.show] = !shown[b.dataset.show];
      else {
        w.read[s.n] = !w.read[s.n];
        save();
        const done = wk.sessions.filter((x) => sessionDone(x, w)).length;
        remember(c, wk, s, `Sesiunea ${s.n}`, Math.round((done / wk.sessions.length) * 100));
      }
      draw();
      window.scrollTo(0, y);
    });
    draw();
  }

  // ---------- Exercitii pe hartie, cu rezolvari ----------
  function exercisesPage(c, wk, s, w) {
    const view = screen();
    const open = {};
    const items = allProblems(s);
    function item(it) {
      const [n, q, sol] = it;
      const st = w.solved[n];
      return `<li class="problem"><p class="p-q"><b>${n}.</b> ${esc(q)}</p>
        <div class="chips"><button type="button" class="tool" data-open="${n}" aria-expanded="${!!open[n]}">${open[n] ? 'Ascunde rezolvarea' : 'Arată rezolvarea'}</button>
        ${open[n] ? `<button type="button" class="tool${st === 'ok' ? ' on' : ''}" data-mark="ok" data-n="${n}">Mi-a ieșit</button><button type="button" class="tool${st === 'again' ? ' on' : ''}" data-mark="again" data-n="${n}">De reluat</button>` : st ? `<span class="p-state">${st === 'ok' ? 'Mi-a ieșit' : 'De reluat'}</span>` : ''}</div>
        ${open[n] ? `<div class="solution">${sol}</div>` : ''}</li>`;
    }
    function draw() {
      const ok = items.filter((it) => w.solved[it[0]] === 'ok').length;
      view.innerHTML = `${backLink(`#/learning/${c.id}/${wk.id}`, wk.short || wk.title)}
        <article class="lesson math">
          <header><p class="kicker">Sesiunea ${s.n}${s.minutes ? ` · ${s.minutes} min` : ''}</p><h1 class="h1">Exerciții</h1>
          <p class="lead">${items.length} probleme în trei trepte. Încearcă fiecare problemă pe hârtie cel puțin 5 minute înainte să te uiți la soluție.</p>
          <p class="refs">${ok} din ${items.length} marcate „Mi-a ieșit”</p></header>
          ${s.tiers.map((t) => `<section><h2>${esc(t.title)}</h2><ul class="problems">${t.items.map(item).join('')}</ul></section>`).join('')}
          <footer class="lesson-foot">${footerNext(c, wk, s)}</footer>
        </article>`;
    }
    view.addEventListener('click', (e) => {
      const o = e.target.closest('[data-open]');
      const m = e.target.closest('[data-mark]');
      if (!o && !m) return;
      const y = window.scrollY;
      if (o) open[o.dataset.open] = !open[o.dataset.open];
      if (m) {
        w.solved[m.dataset.n] = m.dataset.mark;
        save();
        const ok = items.filter((it) => w.solved[it[0]] === 'ok').length;
        remember(c, wk, s, `${ok}/${items.length}`, Math.round((ok / items.length) * 100));
      }
      draw();
      window.scrollTo(0, y);
    });
    draw();
  }

  // ---------- Test pe hartie, cronometrat, cu autocorectare ----------
  function testPage(c, wk, s, w) {
    const view = screen();
    const T = s.test;
    let timer = null;
    const cur = () => w.tests[s.n];
    const left = () => Math.max(0, Math.round((cur().endsAt - Date.now()) / 1000));
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    const back = backLink(`#/learning/${c.id}/${wk.id}`, wk.short || wk.title);

    function finish() {
      stop();
      cur().finished = true;
      save();
      draw();
      window.scrollTo(0, 0);
    }

    function draw() {
      const t = cur();
      if (!t) {
        view.innerHTML = `${back}<article class="lesson math"><header><p class="kicker">Sesiunea ${s.n}</p><h1 class="h1">Test: ${T.minutes} de minute</h1><p class="lead">${esc(T.instr)}</p></header>
          <p>Pregătește hârtie și creion. Problemele apar după ce pornești cronometrul.</p><div><button class="btn" type="button" id="start">Pornește testul</button></div></article>`;
        return;
      }
      if (!t.finished) {
        if (left() === 0) { finish(); return; }
        view.innerHTML = `${back}<article class="lesson math"><header class="test-head"><h1 class="h1">Test</h1><p class="timer" id="clock" role="timer">${fmtTime(left())}</p></header>
          <ol class="test-list">${T.problems.map((p) => `<li>${esc(p[0])}</li>`).join('')}</ol>
          <div><button class="btn" type="button" id="finish">Am terminat. Corectez</button></div></article>`;
        if (!timer) {
          timer = setInterval(() => {
            const el = document.getElementById('clock');
            if (left() === 0) { finish(); return; }
            if (el) el.textContent = fmtTime(left());
          }, 1000);
        }
        return;
      }
      const pts = t.pts;
      const each = 100 / T.problems.length;
      const graded = Object.keys(pts).length;
      const total = Math.round(Object.values(pts).reduce((a, b) => a + Number(b), 0));
      const complete = graded === T.problems.length;
      t.score = complete ? total : undefined;
      save();
      const verdict = !complete ? `Punctează toate problemele (${graded}/${T.problems.length}).`
        : total >= 70 ? `${total} din 100. Poți trece mai departe.`
        : `${total} din 100. Refă lecția la subiectele greșite și lucrează din nou exercițiile din treapta corespunzătoare.`;
      view.innerHTML = `${back}<article class="lesson math"><header><p class="kicker">Corectare</p><h1 class="h1">${complete ? `${total}/100` : 'Corectează testul'}</h1><p class="lead">${esc(verdict)}</p><p class="refs">Barem: ${esc(T.barem)}</p></header>
        <ol class="test-list graded">${T.problems.map((p, i) => `<li><p>${esc(p[0])}</p>
          <div class="solution"><b>Rezultat: ${esc(p[1])}</b><br>${esc(p[2])}</div>
          <div class="chips" role="group" aria-label="Puncte problema ${i + 1}">${[0, each / 2, each].map((v) => `<button type="button" class="tool${pts[i] !== undefined && Number(pts[i]) === v ? ' on' : ''}" data-i="${i}" data-pts="${v}">${v} p</button>`).join('')}</div></li>`).join('')}</ol>
        <div class="chips"><button class="btn ghost" type="button" id="reset">Dă testul din nou</button>${footerNext(c, wk, s)}</div></article>`;
    }

    view.addEventListener('click', (e) => {
      if (e.target.id === 'start') { w.tests[s.n] = { endsAt: Date.now() + T.minutes * 60000, pts: {} }; save(); draw(); }
      else if (e.target.id === 'finish') finish();
      else if (e.target.id === 'reset') {
        dialog('Dai testul din nou?', 'Scorul de acum se șterge.', [
          { label: 'Da', onClick: () => { delete w.tests[s.n]; save(); draw(); } },
          { label: 'Nu', ghost: true },
        ]);
      } else if (e.target.dataset.pts !== undefined) {
        cur().pts[e.target.dataset.i] = Number(e.target.dataset.pts);
        save();
        const y = window.scrollY;
        draw();
        window.scrollTo(0, y);
        if (cur().score !== undefined) remember(c, wk, s, `Test ${cur().score}/100`, cur().score);
      }
    });
    onLeave(stop);
    draw();
  }

  // ---------- Examen de proba, corectat automat ----------
  function sameSet(a, b) {
    return a.length === b.length && a.every((x) => b.includes(x));
  }
  function domainOf(it) {
    const m = (it.dom || '').match(/D(\d)/);
    return m ? 'Domeniul ' + m[1] : 'Altele';
  }

  function examPage(c, wk, s, w) {
    const view = screen();
    if (!window.CLAUDE_DATA) {
      view.innerHTML = `${backLink(`#/learning/${c.id}/${wk.id}`, wk.short || wk.title)}<p class="empty">Examenele de probă sunt disponibile doar în copia de pe calculatorul tău.</p>`;
      return;
    }
    const exam = window.CLAUDE_DATA.exams[s.exam];
    const back = backLink(`#/learning/${c.id}/${wk.id}`, wk.short || wk.title);
    const cur = () => w.exams[s.n];
    const left = () => Math.max(0, Math.round((cur().endsAt - Date.now()) / 1000));
    let timer = null;
    let reviewFilter = 'gresite';
    const stop = () => { if (timer) clearInterval(timer); timer = null; };

    function grade() {
      const e = cur();
      const ok = exam.items.filter((it) => sameSet(e.answers[it.n] || [], it.ans)).length;
      e.score = Math.round((ok / exam.items.length) * 100);
      e.correct = ok;
      e.finished = true;
      save();
      stop();
      remember(c, wk, s, `Examen ${e.score}%`, e.score);
      draw();
      window.scrollTo(0, 0);
    }

    function questionHtml(it) {
      const sel = cur().answers[it.n] || [];
      const scenario = it.scenario !== lastScenario ? `<h2 class="scenario">${inline(it.scenario)}</h2>` : '';
      lastScenario = it.scenario;
      return `${scenario}<li class="exam-q" id="q-${it.n}"><p class="p-q"><b>${it.n}.</b> ${inline(it.q)} <span class="sel-n">(alege ${it.sel})</span></p>
        <div class="drill-opts">${it.opts.map(([k, t]) => `<button type="button" class="drill-opt${sel.includes(k) ? ' picked' : ''}" data-q="${it.n}" data-k="${k}" aria-pressed="${sel.includes(k)}"><b>${k}.</b> ${inline(t)}</button>`).join('')}</div></li>`;
    }
    let lastScenario = '';

    function reviewHtml(it) {
      const sel = cur().answers[it.n] || [];
      const right = sameSet(sel, it.ans);
      return `<li class="exam-q${right ? '' : ' wrong'}"><p class="p-q"><b>${it.n}.</b> ${inline(it.q)} <span class="sel-n">${esc(domainOf(it))}</span></p>
        <div class="drill-opts">${it.opts.map(([k, t]) => {
          const isRight = it.ans.includes(k);
          const isPick = sel.includes(k);
          return `<div class="drill-opt${isRight ? ' ok' : isPick ? ' no' : ''}"><b>${k}.</b> ${inline(t)}${isRight ? ' (corect)' : isPick ? ' (ales de tine)' : ''}</div>`;
        }).join('')}</div>
        <div class="solution"><b>${right ? 'Corect.' : sel.length ? 'Greșit.' : 'Fără răspuns.'}</b> ${inline(it.why || '')}</div></li>`;
    }

    function draw() {
      const e = cur();
      if (!e) {
        view.innerHTML = `${back}<article class="lesson math"><header><p class="kicker">Sesiunea ${s.n}</p><h1 class="h1">${esc(exam.title)}</h1><p class="lead">${exam.items.length} de întrebări, ${exam.minutes} de minute, ca la examenul real.</p></header>
          <ul><li>Întrebările sunt în engleză, ca la examen.</li><li>Fiecare întrebare spune câte răspunsuri alegi. Primești punct doar dacă le alegi exact pe cele corecte.</li><li>Fără notițe. Cronometrul continuă și dacă ieși din pagină.</li><li>Ținte: 85% la prima încercare, 90% înainte de examenul real. Pragul real este 720 din 1 000.</li></ul>
          <div><button class="btn" type="button" id="start">Pornește examenul</button></div></article>`;
        return;
      }
      if (!e.finished) {
        if (left() === 0) { grade(); return; }
        lastScenario = '';
        const answered = Object.values(e.answers).filter((a) => a.length).length;
        view.innerHTML = `${back}<article class="lesson math"><header class="test-head"><div><h1 class="h1" style="font-size:22px">${esc(exam.title)}</h1><p class="refs" id="count" style="margin-top:2px">${answered}/${exam.items.length} răspunsuri</p></div><p class="timer" id="clock" role="timer">${fmtTime(left())}</p></header>
          <ol class="exam-list">${exam.items.map(questionHtml).join('')}</ol>
          <div><button class="btn" type="button" id="finish">Predau examenul</button></div></article>`;
        if (!timer) {
          timer = setInterval(() => {
            const el = document.getElementById('clock');
            if (left() === 0) { grade(); return; }
            if (el) el.textContent = fmtTime(left());
          }, 1000);
        }
        return;
      }
      const doms = {};
      exam.items.forEach((it) => {
        const d = domainOf(it);
        doms[d] = doms[d] || { ok: 0, all: 0 };
        doms[d].all++;
        if (sameSet(e.answers[it.n] || [], it.ans)) doms[d].ok++;
      });
      const verdict = e.score >= 90 ? 'Ești gata pentru examen. Recitește doar punctele slabe.'
        : e.score >= 85 ? 'Ești pe drumul bun. Recitește domeniile la care ai greșit.'
        : e.score >= 70 ? 'Recitește lecțiile domeniilor slabe și reia întrebările greșite.'
        : 'Reia lecțiile în ordinea domeniilor 1, 2, 3, 4, 5, apoi dă din nou examenul.';
      const list = reviewFilter === 'toate' ? exam.items : exam.items.filter((it) => !sameSet(e.answers[it.n] || [], it.ans));
      view.innerHTML = `${back}<article class="lesson math"><header><p class="kicker">Rezultat</p><h1 class="h1">${e.score}%</h1><p class="lead">${e.correct} din ${exam.items.length} corecte. ${esc(verdict)}</p></header>
        <div class="tbl"><table><thead><tr><th>Domeniu</th><th>Corecte</th><th>%</th></tr></thead><tbody>${Object.keys(doms).sort().map((d) => `<tr><td>${esc(d)}</td><td>${doms[d].ok}/${doms[d].all}</td><td>${Math.round((doms[d].ok / doms[d].all) * 100)}%</td></tr>`).join('')}</tbody></table></div>
        <div class="chips"><button type="button" class="tool${reviewFilter === 'gresite' ? ' on' : ''}" data-f="gresite">Doar greșelile (${exam.items.length - e.correct})</button><button type="button" class="tool${reviewFilter === 'toate' ? ' on' : ''}" data-f="toate">Toate întrebările</button></div>
        <ol class="exam-list">${list.map(reviewHtml).join('') || '<li class="exam-q">Nicio greșeală.</li>'}</ol>
        <div class="chips"><button class="btn ghost" type="button" id="reset">Dă examenul din nou</button>${footerNext(c, wk, s)}</div></article>`;
    }

    view.addEventListener('click', (ev) => {
      const opt = ev.target.closest('button.drill-opt');
      if (opt && cur() && !cur().finished) {
        const n = opt.dataset.q;
        const k = opt.dataset.k;
        const it = exam.items.find((x) => String(x.n) === n);
        let sel = cur().answers[n] || [];
        if (it.sel === 1) sel = sel.includes(k) ? [] : [k];
        else if (sel.includes(k)) sel = sel.filter((x) => x !== k);
        else if (sel.length < it.sel) sel = sel.concat(k);
        cur().answers[n] = sel;
        save();
        // Fara redesenare: pagina are 60 de intrebari si pozitia trebuie sa ramana.
        opt.parentElement.querySelectorAll('.drill-opt').forEach((b) => {
          const on = sel.includes(b.dataset.k);
          b.classList.toggle('picked', on);
          b.setAttribute('aria-pressed', on);
        });
        const cnt = document.getElementById('count');
        if (cnt) cnt.textContent = `${Object.values(cur().answers).filter((a) => a.length).length}/${exam.items.length} răspunsuri`;
        return;
      }
      if (ev.target.id === 'start') { w.exams[s.n] = { endsAt: Date.now() + exam.minutes * 60000, answers: {} }; save(); draw(); window.scrollTo(0, 0); }
      else if (ev.target.id === 'finish') {
        const missing = exam.items.length - Object.values(cur().answers).filter((a) => a.length).length;
        if (missing) dialog('Predai examenul?', `Mai ai ${missing} întrebări fără răspuns.`, [{ label: 'Predau', onClick: grade }, { label: 'Mă mai uit', ghost: true }]);
        else grade();
      } else if (ev.target.id === 'reset') {
        dialog('Dai examenul din nou?', 'Rezultatul de acum se șterge.', [
          { label: 'Da', onClick: () => { delete w.exams[s.n]; save(); draw(); } },
          { label: 'Nu', ghost: true },
        ]);
      } else if (ev.target.dataset.f) {
        reviewFilter = ev.target.dataset.f;
        const y = window.scrollY;
        draw();
        window.scrollTo(0, y);
      }
    });
    onLeave(stop);
    draw();
  }

  // ---------- Fise de recapitulare ----------
  function cardsPage(c, wk, s, w) {
    const view = screen();
    if (!window.CLAUDE_DATA) {
      view.innerHTML = `${backLink(`#/learning/${c.id}/${wk.id}`, wk.short || wk.title)}<p class="empty">Fișele sunt disponibile doar în copia de pe calculatorul tău.</p>`;
      return;
    }
    const decks = window.CLAUDE_DATA.decks.filter((d, i) => s.decks.includes(i));
    const marks = w.cards[s.n] || (w.cards[s.n] = {});
    const open = {};
    let onlyMissed = false;
    function draw() {
      const all = decks.flatMap((d) => d.cards);
      const ok = all.filter((x) => marks[x[0]] === 'ok').length;
      view.innerHTML = `${backLink(`#/learning/${c.id}/${wk.id}`, wk.short || wk.title)}
        <article class="lesson math">
          <header><p class="kicker">Sesiunea ${s.n}</p><h1 class="h1">${esc(s.title)}</h1><p class="lead">Citește întrebarea, răspunde din memorie, apoi verifică. Fișele sunt în engleză, cu termenii de la examen.</p>
          <p class="refs">${ok} din ${all.length} știute</p></header>
          <div class="chips"><button type="button" class="tool${onlyMissed ? '' : ' on'}" data-only="0">Toate</button><button type="button" class="tool${onlyMissed ? ' on' : ''}" data-only="1">Doar de reluat</button></div>
          ${decks.map((d) => {
            const list = d.cards.filter((x) => !onlyMissed || marks[x[0]] !== 'ok');
            return list.length ? `<section><h2>${esc(d.title)}</h2><ul class="problems">${list.map((x) => `<li class="problem"><p class="p-q">${inline(x[1])}</p>
              <div class="chips"><button type="button" class="tool" data-c="${esc(x[0])}">${open[x[0]] ? 'Ascunde' : 'Arată răspunsul'}</button>
              ${open[x[0]] ? `<button type="button" class="tool${marks[x[0]] === 'ok' ? ' on' : ''}" data-m="ok" data-id="${esc(x[0])}">Știu</button><button type="button" class="tool${marks[x[0]] === 'no' ? ' on' : ''}" data-m="no" data-id="${esc(x[0])}">De reluat</button>` : marks[x[0]] ? `<span class="p-state">${marks[x[0]] === 'ok' ? 'Știu' : 'De reluat'}</span>` : ''}</div>
              ${open[x[0]] ? `<div class="solution">${inline(x[2])}</div>` : ''}</li>`).join('')}</ul></section>` : '';
          }).join('')}
          <footer class="lesson-foot">${footerNext(c, wk, s)}</footer>
        </article>`;
    }
    view.addEventListener('click', (e) => {
      const b = e.target;
      if (!b.dataset || (b.dataset.c === undefined && b.dataset.m === undefined && b.dataset.only === undefined)) return;
      const y = window.scrollY;
      if (b.dataset.c !== undefined) open[b.dataset.c] = !open[b.dataset.c];
      if (b.dataset.m) { marks[b.dataset.id] = b.dataset.m; save(); }
      if (b.dataset.only !== undefined) onlyMissed = b.dataset.only === '1';
      draw();
      window.scrollTo(0, y);
    });
    draw();
  }

  route(/^\/learning\/(matematica|claude)\/(s\d+)\/(\d+)$/, (cid, wid, n) => {
    const c = window.COURSES[cid];
    const wk = c.weeks.find((x) => x.id === wid);
    const s = wk && wk.sessions.find((x) => x.n === Number(n));
    if (!s) { location.hash = `#/learning/${cid}`; return; }
    const w = weekState(cid, wid);
    ({ lesson: lessonPage, exercises: exercisesPage, test: testPage, exam: examPage, cards: cardsPage })[s.kind](c, wk, s, w);
  });

  window.COURSE_INLINE = inline;
})();
