// Un lucru nou pe zi: o lectie scurta, cu un final clar. Fiecare persoana merge in ordine, fara zile pierdute.
(function () {
  const { esc, route, mount, state, save, backIcon } = HP;

  const lessons = () => window.NOVELTY.map((x, i) => ({ id: 'n' + (i + 1), domain: x[0], title: x[1], paras: x[2], q: x[3], options: x[4], why: x[5] }));
  const byId = (id) => lessons().find((l) => l.id === id);

  function info() {
    if (!state.novelty) state.novelty = { day: null, id: null, seen: [], answered: {} };
    return state.novelty;
  }

  function todayLesson() {
    const n = info();
    const now = window.Daily.today();
    if (n.day !== now) {
      const all = lessons();
      let next = all.find((l) => !n.seen.includes(l.id));
      // Dupa ultima lectie, reincepem de la prima, ca recapitulare.
      if (!next) { n.seen = []; n.answered = {}; next = all[0]; }
      n.day = now;
      n.id = next.id;
      n.seen.push(next.id);
      save();
    }
    return byId(n.id);
  }

  const doneToday = () => !!info().answered[todayLesson().id];

  function shuffled(a) {
    const c = a.map((text, i) => ({ text, right: i === 0 }));
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  }

  function lessonPage(l, isToday) {
    const view = mount({ section: 'learning', theme: 'study', noCoin: true, narrow: true });
    const back = isToday ? ['#/learning', 'Învățat'] : ['#/learning/lucru-nou/arhiva', 'Lecțiile de până acum'];
    const answered = info().answered[l.id];
    const opts = shuffled(l.options);
    view.innerHTML = `<div><a class="back" href="${back[0]}"><span class="round small">${backIcon}</span>${esc(back[1])}</a></div>
      <article class="daily-lesson">
        <p class="kicker">${isToday ? 'Un lucru nou · ' : ''}${esc(l.domain)}</p>
        <h1 class="h1">${esc(l.title)}</h1>
        ${l.paras.map((p) => `<p>${esc(p)}</p>`).join('')}
      </article>
      <section class="panel stack" id="check">
        <h2 class="today-h">${esc(l.q)}</h2>
        <div class="stack" id="opts">${opts.map((o, i) => `<button type="button" class="pick" data-i="${i}">${esc(o.text)}</button>`).join('')}</div>
        <div id="after"></div>
      </section>`;
    const after = view.querySelector('#after');
    const finish = (chosen) => {
      view.querySelectorAll('.pick').forEach((b, i) => {
        b.disabled = true;
        if (opts[i].right) b.classList.add('ok');
        else if (i === chosen) b.classList.add('bad');
      });
      after.innerHTML = `<p class="solution">${esc(l.why)}</p>
        ${isToday ? `<div class="end-day"><b class="serif">Gata pentru azi.</b><span>Următoarea lecție te așteaptă mâine.</span></div>` : ''}
        <p class="how-line"><a href="#/learning/lucru-nou/arhiva">Lecțiile de până acum</a></p>`;
    };
    view.querySelector('#opts').addEventListener('click', (e) => {
      const b = e.target.closest('.pick');
      if (!b || b.disabled) return;
      info().answered[l.id] = true;
      save();
      finish(Number(b.dataset.i));
    });
    if (answered) finish(-1);
  }

  route(/^\/learning\/lucru-nou$/, () => lessonPage(todayLesson(), true));

  route(/^\/learning\/lucru-nou\/arhiva$/, () => {
    const view = mount({ section: 'learning', theme: 'study', noCoin: true });
    todayLesson();
    const seen = info().seen.map(byId).filter(Boolean).reverse();
    view.innerHTML = `<div><a class="back" href="#/learning/lucru-nou"><span class="round small">${backIcon}</span>Lecția de azi</a></div>
      <div><h1 class="h1">Lecțiile de până acum</h1><p class="lead">${seen.length} din ${lessons().length}. O lecție nouă se adaugă în fiecare zi.</p></div>
      <section class="subjects">${seen.map((l) => `<a class="subject-row" href="#/learning/lucru-nou/${l.id}"><span><b>${esc(l.title)}</b><small>${esc(l.domain)}</small></span><span class="arrow" aria-hidden="true">→</span></a>`).join('')}</section>`;
  });

  route(/^\/learning\/lucru-nou\/(n\d+)$/, (id) => {
    const l = byId(id);
    if (!l || !info().seen.includes(id)) { location.hash = '#/learning/lucru-nou'; return; }
    lessonPage(l, id === todayLesson().id);
  });

  window.Novelty = { todayLesson, doneToday };
})();
