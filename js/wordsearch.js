// Careu de cuvinte: gasesti cuvintele ascunse in tabla.
(function () {
  const THEMES = [
    { id: 'animale', title: 'Animale', words: ['URS', 'VULPE', 'PISICĂ', 'CÂINE', 'IEPURE', 'BUFNIȚĂ', 'LUP', 'ARICI', 'VEVERIȚĂ', 'CAL'] },
    { id: 'fructe', title: 'Fructe', words: ['MĂR', 'PARĂ', 'PRUNĂ', 'CAISĂ', 'CIREAȘĂ', 'GUTUIE', 'PIERSICĂ', 'LĂMÂIE', 'BANANĂ', 'SMOCHINĂ'] },
    { id: 'carti', title: 'În bibliotecă', words: ['ROMAN', 'POEZIE', 'AUTOR', 'CAPITOL', 'PAGINĂ', 'POVESTE', 'TEATRU', 'EROINĂ', 'RAFT', 'CITITOR'] },
    { id: 'spaniola', title: 'Cuvinte în spaniolă', words: ['HOLA', 'CASA', 'AMIGO', 'GATO', 'PERRO', 'LIBRO', 'AGUA', 'SOL', 'FLOR', 'NOCHE'] },
  ];
  const ALPHABET = 'AĂÂBCDEFGHIÎJKLMNOPRSȘTȚUVXZ';
  const SIZE = 12;
  const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0]];

  function shuffled(a) {
    const c = a.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  }

  function build(words) {
    for (;;) {
      const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(''));
      const placed = [];
      let ok = true;
      for (const word of words.slice().sort((a, b) => b.length - a.length)) {
        const letters = [...word];
        let done = false;
        for (let t = 0; t < 300 && !done; t++) {
          const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
          const r = Math.floor(Math.random() * SIZE), c = Math.floor(Math.random() * SIZE);
          const endR = r + dr * (letters.length - 1), endC = c + dc * (letters.length - 1);
          if (endR < 0 || endR >= SIZE || endC < 0 || endC >= SIZE) continue;
          if (!letters.every((l, i) => { const v = grid[r + dr * i][c + dc * i]; return v === '' || v === l; })) continue;
          letters.forEach((l, i) => { grid[r + dr * i][c + dc * i] = l; });
          placed.push({ word, r, c, endR, endC });
          done = true;
        }
        if (!done) { ok = false; break; }
      }
      if (!ok) continue;
      for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (!grid[r][c]) grid[r][c] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      return { grid, placed };
    }
  }

  window.WordSearchEngine = { build, THEMES, SIZE };
  if (!window.HP) return;
  const { route, mount, state, save, addPoints, touch, forget, dialog, confetti, backIcon, esc, toast } = HP;

  route(/^\/hobby\/careu$/, () => {
    const view = mount({ section: 'hobby', theme: 'hobby' });
    view.innerHTML = `<div><h1 class="h1">Careu de cuvinte</h1><p class="lead">Alege o temă.</p></div>
      <section class="grid-cards">${THEMES.map((t, i) => `<a class="card" href="#/hobby/careu/${t.id}"><h2>${esc(t.title)}</h2><p>${t.words.length} cuvinte</p></a>`).join('')}</section>`;
  });

  route(/^\/hobby\/careu\/(\w+)$/, (id) => {
    const isDaily = id === 'zilnic';
    const theme = isDaily ? THEMES[window.Daily.dayNumber() % THEMES.length] : THEMES.find((t) => t.id === id);
    if (!theme) { location.hash = '#/hobby/careu'; return; }
    const key = isDaily ? 'careuDaily' : 'careu-' + id;
    if (isDaily && state.games[key] && state.games[key].date !== window.Daily.today()) delete state.games[key];
    const view = mount({ section: 'hobby', theme: 'hobby' });
    let g = state.games[key];
    if (!g) {
      const b = isDaily ? window.Daily.seeded(() => build(shuffled(theme.words))) : build(shuffled(theme.words));
      g = state.games[key] = { grid: b.grid, placed: b.placed, found: [], date: isDaily ? window.Daily.today() : undefined };
      save();
    }
    let start = null;

    view.innerHTML = `<section class="headrow">
      <div style="display:flex;align-items:center;gap:14px"><a class="round" href="#/hobby/careu" aria-label="Înapoi la teme">${backIcon}</a><h1 class="h1">${isDaily ? 'Provocarea zilei: ' : ''}${esc(theme.title)}</h1></div>
      </section>
      <section class="game">
        <div class="game-main"><div class="ws" id="board" role="group" aria-label="Careu" style="grid-template-columns:repeat(${SIZE},1fr)"></div></div>
        <aside class="game-side"><div class="panel stack">
          <h2 style="font-size:17px;font-weight:800">Cuvinte de găsit</h2>
          <div class="words" id="words"></div>
          <p style="font-weight:700;font-size:15px">Trage peste un cuvânt sau apasă pe prima și pe ultima literă.</p>
          ${isDaily ? '' : '<button class="tool" type="button" id="fresh">Careu nou</button>'}
          <button class="tool" type="button" id="giveup">Mă dau bătut</button>
        </div></aside></section>`;
    const board = view.querySelector('#board');

    function cellsOf(p) {
      const dr = Math.sign(p.endR - p.r), dc = Math.sign(p.endC - p.c);
      const n = [...p.word].length;
      return Array.from({ length: n }, (_, i) => [p.r + dr * i, p.c + dc * i]);
    }

    function draw() {
      const found = new Set();
      g.placed.filter((p) => g.found.includes(p.word)).forEach((p) => cellsOf(p).forEach(([r, c]) => found.add(r + ',' + c)));
      let html = '';
      for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
        const isStart = start && start[0] === r && start[1] === c;
        html += `<button type="button" class="w-c${found.has(r + ',' + c) ? ' found' : ''}${isStart ? ' start' : ''}" data-r="${r}" data-c="${c}">${esc(g.grid[r][c])}</button>`;
      }
      board.innerHTML = html;
      view.querySelector('#words').innerHTML = theme.words.map((w) => `<span class="word${g.found.includes(w) ? ' found' : ''}">${esc(w)}</span>`).join('');
    }

    function attempt(a, b) {
      const hit = g.placed.find((p) => !g.found.includes(p.word) &&
        ((p.r === a[0] && p.c === a[1] && p.endR === b[0] && p.endC === b[1]) ||
         (p.r === b[0] && p.c === b[1] && p.endR === a[0] && p.endC === a[1])));
      start = null;
      if (hit) {
        g.found.push(hit.word);
        addPoints(3);
        touch({ id: key, section: 'hobby', title: 'Careu · ' + theme.title, sub: g.found.length + '/' + theme.words.length, pct: Math.round((g.found.length / theme.words.length) * 100), href: '#/hobby/careu/' + id });
        save();
        draw();
        if (g.found.length === theme.words.length) {
          addPoints(20);
          forget(key);
          confetti();
          if (isDaily) { g.won = true; window.Daily.complete(); } else delete state.games[key];
          save();
          dialog('Rezolvat', 'Ai găsit toate cuvintele.' + (isDaily ? ' Seria ta: ' + window.Daily.streak() + '.' : ''), isDaily
            ? [{ label: 'Înapoi la Hobby', href: '#/hobby' }]
            : [
              { label: 'Careu nou', onClick: () => HP.render() },
              { label: 'Înapoi la teme', href: '#/hobby/careu', ghost: true },
            ]);
        }
      } else {
        draw();
        toast('Nu e un cuvânt din listă.');
      }
    }

    const at = (x, y) => {
      const el = document.elementFromPoint(x, y);
      const b = el && el.closest('[data-r]');
      return b && board.contains(b) ? [Number(b.dataset.r), Number(b.dataset.c)] : null;
    };
    let down = null;
    board.addEventListener('pointerdown', (e) => {
      const p = at(e.clientX, e.clientY);
      if (p) { down = p; e.preventDefault(); }
    });
    board.addEventListener('pointerup', (e) => {
      const p = at(e.clientX, e.clientY);
      const from = down;
      down = null;
      if (!p || !from) return;
      if (p[0] !== from[0] || p[1] !== from[1]) { attempt(from, p); return; }
      if (start) {
        if (start[0] === p[0] && start[1] === p[1]) { start = null; draw(); }
        else attempt(start, p);
      } else { start = p; draw(); }
    });
    const fresh = view.querySelector('#fresh');
    if (fresh) fresh.addEventListener('click', () => {
      forget(key);
      delete state.games[key];
      save();
      HP.render();
    });
    view.querySelector('#giveup').addEventListener('click', () => {
      if (g.found.length === theme.words.length) return;
      dialog('Te dai bătut?', isDaily ? 'Îți arăt toate cuvintele. Ziua de azi nu intră în serie.' : 'Îți arăt toate cuvintele.', [
        { label: 'Arată soluția', onClick: () => {
          g.found = theme.words.slice();
          g.gaveUp = true;
          forget(key);
          save();
          draw();
        } },
        { label: 'Mai încerc', ghost: true },
      ]);
    });
    draw();
  });
})();
