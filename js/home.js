// Acasa si cautare.
(function () {
  const { esc, route, mount, state } = HP;

  const tone = { citit: '#17473A', hobby: '#7C1F2B', learning: '#23387F' };

  function searchIndex() {
    const items = [];
    window.BOOKS.forEach((b) => items.push({ t: b.title, s: b.author, h: '#/citit/' + b.id }));
    [['Sudoku', 'sudoku'], ['Kakuro', 'kakuro'], ['Nonogram', 'nonogram'], ['Careu de cuvinte', 'careu'], ['Colorat', 'colorat']].forEach(([t, id]) => items.push({ t, s: 'Hobby', h: '#/hobby/' + id }));
    window.STORIES.forEach((x) => items.push({ t: x.title, s: 'Poveste în spaniolă', h: '#/learning/spaniola/povesti/' + x.id }));
    window.SPANISH_UNITS.forEach((u) => items.push({ t: u.title, s: 'Spaniolă, unitatea ' + u.n, h: '#/learning/spaniola/' + u.id }));
    Object.values(window.COURSES).forEach((c) => c.weeks.forEach((w) => w.sessions.forEach((x) => items.push({ t: x.title, s: `${c.short}, ${w.short}`, h: `#/learning/${c.id}/${w.id}/${x.n}` }))));
    window.MATH_TOPICS.forEach((m) => items.push({ t: m.title, s: 'Matematică, clasa a ' + m.grade + '-a', h: '#/learning/matematica/' + m.id }));
    return items;
  }

  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  route(/^\/$/, () => {
    const view = mount({ section: 'home' });
    const recent = state.recent.map((r) => `<a class="row recent" href="${esc(r.href)}">
        <span style="flex:1;min-width:0"><span class="r-title">${esc(r.title)}</span>
        <span class="bar"><span class="fill" style="width:${Math.max(2, r.pct || 0)}%;background:${tone[r.section] || tone.hobby}"></span></span></span>
        <span class="r-end">${esc(r.sub || '')}</span></a>`).join('');
    const volume = (href, cloth, title, items, foot) => `<a class="vol cloth" href="${href}" style="--cloth:${cloth}">
        <h2>${title}</h2><ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul><p>${foot}</p></a>`;

    view.innerHTML = `<label class="search">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M16.5 16.5 21 21"></path></svg>
        <span class="sr">Caută</span>
        <input id="q" type="search" placeholder="Caută o carte, un joc sau o lecție" autocomplete="off">
      </label>
      <div class="results" id="results"></div>
      <section class="vols" aria-label="Secțiuni">
        ${volume('#/citit', '#17473A', 'Citit', ['Clasice', 'Non-ficțiune', 'Povestiri scurte', 'Poezie'], `${window.BOOKS.length} de titluri`)}
        ${volume('#/hobby', '#7C1F2B', 'Hobby', ['Sudoku', 'Kakuro', 'Nonogram', 'Careu, colorat'], `Provocarea zilei: ${esc(window.Daily.game().name)}`)}
        ${volume('#/learning', '#23387F', 'Învățat', ['Spaniolă', 'Matematică', 'Examen Claude'], '3 materii')}
      </section>
      <section class="today">
        <div class="panel stack">
          ${window.Daily.goalHtml()}
          <a class="row daily-row" href="${window.Daily.game().href}"><span style="flex:1">Provocarea zilei: ${esc(window.Daily.game().name)}</span><span class="r-end">${window.Daily.doneToday() ? 'Gata' : window.Daily.streak() + ' zile'}</span></a>
        </div>
        <div class="panel stack">
          <h2 class="today-h">Continuă de unde ai rămas</h2>
          ${recent || '<p class="empty">Încă nu ai început nimic. Alege o carte, un joc sau o lecție.</p>'}
        </div>
      </section>`;

    const index = searchIndex();
    const out = view.querySelector('#results');
    view.querySelector('#q').addEventListener('input', (e) => {
      const q = norm(e.target.value.trim());
      if (q.length < 2) { out.innerHTML = ''; return; }
      const hits = index.filter((i) => norm(i.t + ' ' + i.s).includes(q)).slice(0, 8);
      out.innerHTML = hits.length
        ? hits.map((h) => `<a class="result" href="${esc(h.h)}"><span>${esc(h.t)}</span><small>${esc(h.s)}</small></a>`).join('')
        : '<p class="result">Nu am găsit nimic.</p>';
    });
  });

  const hobbies = [
    ['sudoku', 'Sudoku', '3 niveluri, joc nou de fiecare dată'],
    ['kakuro', 'Kakuro', 'Sudoku cu sume, la 3 mărimi'],
    ['colorat', 'Colorat', 'Paginile tale, cu umplere sau carioca'],
    ['nonogram', 'Nonogram', 'Rezolvi logic și apare un desen'],
    ['careu', 'Careu de cuvinte', 'Găsește cuvintele ascunse'],
  ];

  route(/^\/hobby$/, () => {
    const view = mount({ section: 'hobby', theme: 'hobby' });
    view.innerHTML = `<div><h1 class="h1">Hobby</h1><p class="lead">Ce-ți face plăcere acum?</p></div>
      ${window.Daily.cardHtml()}
      <section class="grid-cards">${hobbies.map(([id, t, s]) =>
        `<a class="card" href="#/hobby/${id}"><h2>${t}</h2><p>${s}</p></a>`).join('')}</section>
      <p class="how-line"><b>Prima dată?</b> Tutoriale: <a href="#/hobby/sudoku/tutorial">Sudoku</a>, <a href="#/hobby/kakuro/tutorial">Kakuro</a>, <a href="#/hobby/nonogram/tutorial">Nonogram</a></p>`;
  });
})();
