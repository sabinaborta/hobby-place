// Provocarea zilei: acelasi joc pentru toata ziua, cu serie de zile la rand.
(function () {
  const { state, save, addPoints, confetti, esc } = HP;

  const pad = (n) => String(n).padStart(2, '0');
  const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => dateKey(new Date());
  const shift = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return dateKey(d);
  };
  const dayNumber = () => {
    const d = new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  };

  function info() {
    if (!state.daily) state.daily = { last: null, streak: 0, best: 0, days: {} };
    if (state.daily.saves === undefined) state.daily.saves = 1;
    return state.daily;
  }

  // Seria ramane valabila daca ultima zi rezolvata a fost azi sau ieri.
  function streak() {
    const d = info();
    if (d.last === today() || d.last === shift(-1)) return d.streak;
    // O zi de iertare pastreaza seria daca a lipsit o singura zi.
    return d.last === shift(-2) && d.saves > 0 ? d.streak : 0;
  }

  const ROTATION = [
    { id: 'sudoku', name: 'Sudoku', level: 'usor', href: '#/hobby/sudoku/zilnic' },
    { id: 'kakuro', name: 'Kakuro', level: 'usor', href: '#/hobby/kakuro/zilnic' },
    { id: 'nonogram', name: 'Nonogram', href: '#/hobby/nonogram/zilnic' },
    { id: 'careu', name: 'Careu de cuvinte', href: '#/hobby/careu/zilnic' },
    { id: 'sudoku', name: 'Sudoku', level: 'mediu', href: '#/hobby/sudoku/zilnic' },
    { id: 'kakuro', name: 'Kakuro', level: 'mediu', href: '#/hobby/kakuro/zilnic' },
    { id: 'sudoku', name: 'Sudoku', level: 'greu', href: '#/hobby/sudoku/zilnic' },
  ];
  const game = () => ROTATION[dayNumber() % ROTATION.length];

  // Ruleaza fn cu numere aleatoare fixate de data, ca puzzle-ul sa fie acelasi toata ziua.
  function seeded(fn) {
    let h = dayNumber() * 2654435761 >>> 0;
    const original = Math.random;
    Math.random = () => {
      h = (h + 0x6D2B79F5) >>> 0;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    try { return fn(); } finally { Math.random = original; }
  }

  const doneToday = () => !!info().days[today()];

  function complete() {
    const d = info();
    const now = today();
    if (d.days[now]) return false;
    if (d.last === shift(-1)) d.streak += 1;
    else if (d.last === shift(-2) && d.saves > 0) {
      d.saves -= 1;
      d.days[shift(-1)] = 'saved';
      d.streak += 1;
    } else d.streak = 1;
    if (d.streak % 7 === 0) d.saves = Math.min(2, d.saves + 1);
    d.best = Math.max(d.best, d.streak);
    d.last = now;
    d.days[now] = true;
    addPoints(50);
    save();
    confetti();
    return true;
  }

  const WEEK = ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'];

  function cardHtml() {
    const g = game();
    const done = doneToday();
    const s = streak();
    const strip = [-6, -5, -4, -3, -2, -1, 0].map((n) => {
      const key = shift(n);
      const d = new Date();
      d.setDate(d.getDate() + n);
      return `<span class="day${info().days[key] === 'saved' ? ' saved' : info().days[key] ? ' on' : ''}${n === 0 ? ' now' : ''}" aria-label="${WEEK[d.getDay()]}${info().days[key] ? ', rezolvat' : ''}">${WEEK[d.getDay()]}</span>`;
    }).join('');
    return `<section class="daily-card">
      <div class="daily-main"><p class="kicker" style="color:inherit">Provocarea zilei</p>
        <h2 class="serif">${esc(g.name)}</h2>
        <a class="btn" href="${g.href}">${done ? 'Rezolvată azi. Revezi' : 'Începe'}</a></div>
      <div class="daily-side"><p class="streak"><b>${s}</b> ${s === 1 ? 'zi la rând' : 'zile la rând'}</p>
        <p class="best">Record: ${info().best} · Zile de iertare: ${info().saves}</p><div class="days">${strip}</div>
        <a class="how" style="color:inherit" href="#/hobby/calendar">Calendar și insigne</a></div>
    </section>`;
  }

  // ---------- Citit: obiectiv zilnic de pagini ----------
  const PAGE_GOAL = 15;
  function reading() {
    if (!state.reading) state.reading = { log: {}, last: null, streak: 0, best: 0 };
    return state.reading;
  }
  const pagesToday = () => reading().log[today()] || 0;
  function readingStreak() {
    const r = reading();
    return r.last === today() || r.last === shift(-1) ? r.streak : 0;
  }
  function addPages(n) {
    if (n <= 0) return;
    const r = reading();
    const before = pagesToday();
    r.log[today()] = before + n;
    if (before < PAGE_GOAL && r.log[today()] >= PAGE_GOAL) {
      r.streak = r.last === shift(-1) ? r.streak + 1 : 1;
      r.best = Math.max(r.best, r.streak);
      r.last = today();
      addPoints(30);
      HP.toast('Ai citit 15 pagini azi! +30 de puncte');
    }
    save();
  }
  function goalHtml() {
    const p = pagesToday();
    const pct = Math.min(100, Math.round((p / PAGE_GOAL) * 100));
    const s = readingStreak();
    return `<div class="goal"><div class="goal-top"><b>Azi: ${p} din ${PAGE_GOAL} pagini</b><span>${s} ${s === 1 ? 'zi' : 'zile'} la rând</span></div><div class="goal-bar"><span style="width:${pct}%"></span></div></div>`;
  }

  // ---------- Calendar si insigne ----------
  const BADGES = [
    [1, 'Prima zi'], [3, '3 zile'], [7, 'O săptămână'], [14, 'Două săptămâni'], [30, 'O lună'], [60, 'Două luni'], [100, '100 de zile'],
  ];
  const MONTHS = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

  HP.route(/^\/hobby\/calendar$/, () => {
    const view = HP.mount({ section: 'hobby', theme: 'hobby' });
    const now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth();
    function draw() {
      const d = info();
      const first = new Date(y, m, 1);
      const offset = (first.getDay() + 6) % 7;
      const count = new Date(y, m + 1, 0).getDate();
      let cells = '';
      for (let i = 0; i < offset; i++) cells += '<span class="cal-day empty"></span>';
      for (let n = 1; n <= count; n++) {
        const key = `${y}-${pad(m + 1)}-${pad(n)}`;
        const v = d.days[key];
        const read = (reading().log[key] || 0) >= PAGE_GOAL;
        cells += `<span class="cal-day${v === 'saved' ? ' saved' : v ? ' on' : ''}${key === today() ? ' now' : ''}">${n}${read ? '<i class="cal-read" aria-label="15 pagini citite"></i>' : ''}</span>`;
      }
      view.innerHTML = `<div><a class="back" href="#/hobby"><span class="round small">${HP.backIcon}</span>Hobby</a></div>
        <section class="split" style="gap:24px"><div class="panel stack">
          <div class="headrow" style="align-items:center"><h1 class="serif" style="font-size:24px;font-weight:900">${MONTHS[m]} ${y}</h1>
          <div class="chips"><button class="tool" style="padding:0 16px" type="button" id="prev" aria-label="Luna anterioară">‹</button><button class="tool" style="padding:0 16px" type="button" id="next" aria-label="Luna următoare">›</button></div></div>
          <div class="cal">${['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'].map((x) => `<b>${x}</b>`).join('')}${cells}</div>
          <p class="cal-legend"><span class="cal-key on"></span>Provocare rezolvată <span class="cal-key saved"></span>Zi de iertare <i class="cal-read inline"></i>15 pagini citite</p>
        </div>
        <div class="panel stack"><h2 style="font-size:20px;font-weight:800">Seria ta</h2>
          <p><b class="serif" style="font-size:40px;font-weight:900">${streak()}</b> ${streak() === 1 ? 'zi' : 'zile'} la rând · Record: ${d.best}</p>
          <p style="font-weight:700;line-height:1.5">Zile de iertare: <b>${d.saves}</b>. Dacă lipsești o singură zi, una dintre ele îți păstrează seria. Primești încă una la fiecare 7 zile, cel mult 2.</p>
          <h2 style="font-size:20px;font-weight:800">Insigne</h2>
          <div class="badges">${BADGES.map(([n, label]) => `<div class="badge${d.best >= n ? ' on' : ''}"><b class="serif">${n}</b><span>${label}</span></div>`).join('')}</div>
        </div></section>`;
    }
    view.addEventListener('click', (e) => {
      if (e.target.id === 'prev') { m--; if (m < 0) { m = 11; y--; } draw(); }
      if (e.target.id === 'next') { m++; if (m > 11) { m = 0; y++; } draw(); }
    });
    draw();
  });

  window.Daily = { today, dayNumber, seeded, complete, doneToday, streak, game, cardHtml, addPages, pagesToday, goalHtml, PAGE_GOAL };
})();
