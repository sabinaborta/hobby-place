// Acasa si cautare.
(function () {
  const { esc, route, mount, state } = HP;

  const icons = {
    book: (c) => `<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.6-4.6-2-8-2v15c3.4 0 6 .4 8 2 2-1.6 4.6-2 8-2V4c-3.4 0-6 .4-8 2Z"></path><path d="M12 6v15"></path></svg>`,
    grid: (c) => `<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg>`,
    cap: (c) => `<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 9 10-5 10 5-10 5Z"></path><path d="M6 11.5V17c3.5 2.6 8.5 2.6 12 0v-5.500"></path></svg>`,
  };
  const chev = '<svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14172B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 6-6 6 6"></path></svg>';

  const tone = { citit: ['#EAD8FA', '#7A2FD6'], hobby: ['#FFD0D0', '#C92A2A'], learning: ['#CBE6FD', '#0B6BB5'] };

  function ticket(href, bg, color, small, title, icon, num, unit) {
    return `<div class="ticket-wrap"><a class="ticket" href="${href}" style="background:${bg};color:${color}">
      <div class="t-row"><div><p class="t-small">${small}</p><h2 class="t-title">${title}</h2></div>
      <div class="t-num">${icons[icon](color)}<b>${num}</b>${unit}</div></div></a>${chev}</div>`;
  }

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
    const read = Object.values(state.books).filter((b) => b.done).length;
    const recent = state.recent.map((r, i) => {
      const [bg, fg] = tone[r.section] || tone.hobby;
      return `<a class="row" href="${esc(r.href)}" style="background:${bg}">
        <span class="ball" style="background:${fg}" aria-hidden="true">${i + 1}</span>
        <span style="flex:1;min-width:0"><span class="r-title">${esc(r.title)}</span>
        <span class="bar"><span class="fill" style="width:${Math.max(2, r.pct || 0)}%;background:${fg}"></span></span></span>
        <span class="r-end">${esc(r.sub || '')}</span></a>`;
    }).join('');

    view.innerHTML = `<section class="split">
      <div class="stack" style="gap:24px">
        <div><p style="font-weight:700;font-size:17px;margin-bottom:4px">Bine ai venit,</p>
        <h1 class="h1">Citești, te joci sau înveți azi?</h1></div>
        <label class="search">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#14172B" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M16.5 16.5 21 21"></path></svg>
          <span class="sr">Caută</span>
          <input id="q" type="search" placeholder="Caută o carte, un joc sau o lecție" autocomplete="off">
        </label>
        <div class="results" id="results"></div>
        <div style="padding-top:6px">
          ${ticket('#/citit', '#5B6CB2', '#FFF', 'Clasice, non-fiction și povestiri scurte', 'Citit', 'book', read, read === 1 ? 'citită' : 'citite')}
          ${ticket('#/hobby', '#FF9F9F', '#14172B', 'Jocuri de logică și colorat', 'Hobby', 'grid', 5, 'activități')}
          ${ticket('#/learning', '#DDF28B', '#14172B', 'Spaniolă, Matematică 5–12, Examen Claude', 'Learning', 'cap', 3, 'materii')}
        </div>
      </div>
      <aside class="panel stack">
        ${window.Daily.goalHtml()}
        <a class="row" href="${window.Daily.game().href}" style="background:#DDF28B"><span style="flex:1;font-family:var(--serif);font-weight:700">Provocarea zilei: ${esc(window.Daily.game().name)}</span><span class="r-end">${window.Daily.doneToday() ? 'Gata' : window.Daily.streak() + ' zile'}</span></a>
        <h2 style="font-size:20px;font-weight:800">Continuă de unde ai rămas</h2>
        ${recent || '<p class="empty">Încă nu ai început nimic. Alege un bilet și apare aici.</p>'}
      </aside>
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
    ['sudoku', 'Sudoku', '3 niveluri, puzzle nou de fiecare dată', '#FFF', '#14172B'],
    ['kakuro', 'Kakuro', 'Sudoku cu sume, la 3 mărimi', '#14172B', '#FFF'],
    ['colorat', 'Colorat', 'Paginile tale, cu umplere sau carioca', '#DDF28B', '#14172B'],
    ['nonogram', 'Nonogram', 'Rezolvi logic și apare un desen', '#CBE6FD', '#14172B'],
    ['careu', 'Careu de cuvinte', 'Găsește cuvintele ascunse', '#EAD8FA', '#14172B'],
  ];

  route(/^\/hobby$/, () => {
    const view = mount({ section: 'hobby', theme: 'hobby' });
    view.innerHTML = `<div><h1 class="h1">Hobby</h1><p class="lead">Ce-ți face plăcere acum?</p></div>
      ${window.Daily.cardHtml()}
      <section class="grid-cards">${hobbies.map(([id, t, s, bg, fg]) =>
        `<a class="card" href="#/hobby/${id}" style="background:${bg};color:${fg}"><h2>${t}</h2><p>${s}</p></a>`).join('')}</section>
      <p class="how-line"><b>Prima dată?</b> Tutoriale: <a href="#/hobby/sudoku/tutorial">Sudoku</a>, <a href="#/hobby/kakuro/tutorial">Kakuro</a>, <a href="#/hobby/nonogram/tutorial">Nonogram</a></p>`;
  });
})();
