// Nonogram: umpli patratele dupa indicii si apare un desen.
(function () {
  const PICS = [
    { id: 'inima', title: 'Mister 1', reveal: 'o inimă', rows: ['.###..###.', '##########', '##########', '##########', '.########.', '..######..', '...####...', '....##....'] },
    { id: 'ciuperca', title: 'Mister 2', reveal: 'o ciupercă', rows: ['...####...', '.########.', '##..##..##', '##########', '.########.', '...####...', '...####...', '...####...'] },
    { id: 'peste', title: 'Mister 3', reveal: 'un pește', rows: ['...###...#', '.######.##', '##.#######', '##########', '.######.##', '...###...#'] },
    { id: 'pisica', title: 'Mister 4', reveal: 'o pisică', rows: ['#........#', '##......##', '##########', '#.##..##.#', '##########', '###.##.###', '.########.', '..######..'] },
    { id: 'ursulet', title: 'Mister 5', reveal: 'un ursuleț', rows: ['##......##', '###....###', '.########.', '.#.####.#.', '.########.', '.###..###.', '.##.##.##.', '..######..'] },
    { id: 'casa', title: 'Mister 6', reveal: 'o căsuță', rows: ['....##....', '...####...', '..######..', '.########.', '##########', '.##....##.', '.##.##.##.', '.##.##.##.', '.########.'] },
    { id: 'stea', title: 'Mister 7', reveal: 'o stea', rows: ['....##....', '....##....', '...####...', '##########', '.########.', '..######..', '..######..', '.###..###.', '.##....##.', '#........#'] },
    { id: 'copac', title: 'Mister 8', reveal: 'un copac', rows: ['...####...', '..######..', '.########.', '##########', '##########', '.########.', '..######..', '....##....', '....##....', '...####...'] },
    { id: 'floare', title: 'Mister 9', reveal: 'o floare', rows: ['...#..#...', '..###.###.', '...####...', '.###..###.', '...####...', '..###.###.', '...#..#...', '....##....', '.##.##.##.', '..######..'] },
    { id: 'fluture', title: 'Mister 10', reveal: 'un fluture', rows: ['##......##', '###.##.###', '##########', '.########.', '...####...', '.########.', '##########', '###.##.###', '##......##'] },
    { id: 'racheta', title: 'Mister 11', reveal: 'o rachetă', rows: ['....##....', '...####...', '...####...', '...#..#...', '...#..#...', '...####...', '...####...', '..######..', '.###..###.', '.#......#.'] },
    { id: 'barca', title: 'Mister 12', reveal: 'o barcă', rows: ['....#.....', '....##....', '....###...', '....####..', '....#####.', '....#.....', '##########', '.########.', '..######..'] },
    { id: 'cana', title: 'Mister 13', reveal: 'o cană', rows: ['..#..#....', '.#..#.....', '..#..#....', '########..', '#########.', '########.#', '########.#', '#########.', '########..', '.######...'] },
    { id: 'pasare', title: 'Mister 14', reveal: 'o pasăre', rows: ['...###....', '..#####...', '..#.####..', '#########.', '..#######.', '..########', '...#######', '....#####.', '....#..#..', '...##.##..'] },
    { id: 'iepure', title: 'Mister 15', reveal: 'un iepure', rows: ['.##....##.', '.##....##.', '.##....##.', '.##....##.', '.########.', '##########', '##.####.##', '##########', '.###..###.', '..######..'] },
    { id: 'umbrela', title: 'Mister 16', reveal: 'o umbrelă', rows: ['....##....', '..######..', '.########.', '##########', '##########', '#.#.##.#.#', '....##....', '....##....', '.#..##....', '..###.....'] },
    { id: 'clopot', title: 'Mister 17', reveal: 'un clopoțel', rows: ['....##....', '...####...', '..######..', '..######..', '..######..', '.########.', '.########.', '##########', '##########', '....##....'] },
    { id: 'ceainic', title: 'Mister 18', reveal: 'un ceainic', rows: ['...####...', '....##....', '.########.', '##########', '##########', '#.########', '#.########', '##########', '.########.', '..######..'] },
  ];

  function line(cells) {
    const out = [];
    let run = 0;
    cells.forEach((v) => {
      if (v) run++;
      else if (run) { out.push(run); run = 0; }
    });
    if (run) out.push(run);
    return out;
  }
  function clues(rows) {
    const grid = rows.map((r) => [...r].map((c) => c === '#'));
    return {
      rows: grid.map(line),
      cols: grid[0].map((_, c) => line(grid.map((r) => r[c]))),
    };
  }
  const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

  window.NonogramEngine = { PICS, clues, line };
  if (!window.HP) return;
  const { route, mount, state, save, addPoints, touch, forget, dialog, confetti, backIcon, esc } = HP;

  route(/^\/hobby\/nonogram$/, () => {
    const view = mount({ section: 'hobby', theme: 'hobby' });
    view.innerHTML = `<div><h1 class="h1">Nonogram</h1>
      <p class="lead">Numerele spun câte pătrate pline vin la rând pe fiecare linie și coloană. La final apare un desen.</p><a class="how" href="#/hobby/nonogram/tutorial">Cum se joacă</a></div>
      <section class="grid-cards">${PICS.map((p, i) => {
        const done = state.nonoDone[p.id];
        return `<a class="card" href="#/hobby/nonogram/${p.id}"><h2>${done ? 'E ' + esc(p.reveal) + '!' : p.title}</h2><p>${p.rows[0].length} × ${p.rows.length}${done ? ' · rezolvat' : ''}</p></a>`;
      }).join('')}</section>`;
  });

  route(/^\/hobby\/nonogram\/(\w+)$/, (id) => {
    const daily = id === 'zilnic';
    const pic = daily ? PICS[window.Daily.dayNumber() % PICS.length] : PICS.find((p) => p.id === id);
    if (!pic) { location.hash = '#/hobby/nonogram'; return; }
    const view = mount({ section: 'hobby', theme: 'hobby' });
    const key = daily ? 'nonoDaily' : 'nono-' + id;
    const h = pic.rows.length, w = pic.rows[0].length;
    const hint = clues(pic.rows);
    if (daily && state.games[key] && state.games[key].date !== window.Daily.today()) delete state.games[key];
    let g = state.games[key] || (state.games[key] = { on: Array(w * h).fill(0), hints: 3, date: daily ? window.Daily.today() : undefined });
    if (g.hints === undefined) g.hints = 3;
    const solution = pic.rows.join('').split('').map((ch) => (ch === '#' ? 1 : 0));
    let mark = false;
    let finished = !!(g.won || g.gaveUp);

    view.innerHTML = `<section class="headrow">
      <div style="display:flex;align-items:center;gap:14px"><a class="round" href="#/hobby/nonogram" aria-label="Înapoi la nonograme">${backIcon}</a><h1 class="h1">${daily ? 'Provocarea zilei' : pic.title}</h1></div>
      <div class="chips"><button type="button" class="tab on" id="m-fill">Umple</button><button type="button" class="tab" id="m-x">Marchează gol ×</button><button type="button" class="tab" id="clear">Șterge tot</button><button type="button" class="tab" id="hint"></button><button type="button" class="tab" id="giveup">Mă dau bătut</button></div></section>
      <section class="game"><div class="game-main"><div class="nono" id="board" role="group" aria-label="Tablă de Nonogram"></div></div></section><div id="end-note"></div>`;
    const board = view.querySelector('#board');
    board.style.gridTemplateColumns = `minmax(44px,1.6fr) repeat(${w},1fr)`;

    const rowVals = (r) => g.on.slice(r * w, r * w + w).map((v) => v === 1);
    const colVals = (c) => Array.from({ length: h }, (_, r) => g.on[r * w + c] === 1);

    function draw() {
      let html = '<span class="n-clue"></span>';
      for (let c = 0; c < w; c++) {
        const done = same(line(colVals(c)), hint.cols[c]);
        html += `<span class="n-clue col${done ? ' done' : ''}">${hint.cols[c].map((n) => `<span>${n}</span>`).join('')}</span>`;
      }
      for (let r = 0; r < h; r++) {
        const done = same(line(rowVals(r)), hint.rows[r]);
        html += `<span class="n-clue rowc${done ? ' done' : ''}">${hint.rows[r].map((n) => `<span>${n}</span>`).join('')}</span>`;
        for (let c = 0; c < w; c++) {
          const v = g.on[r * w + c];
          html += `<button type="button" class="n-cell${v === 1 ? ' on' : ''}" data-i="${r * w + c}" aria-label="Rândul ${r + 1}, coloana ${c + 1}${v === 1 ? ', plin' : v === 2 ? ', gol marcat' : ''}">${v === 2 ? '×' : ''}</button>`;
        }
      }
      board.innerHTML = html;
      view.querySelector('#m-fill').classList.toggle('on', !mark);
      view.querySelector('#m-x').classList.toggle('on', mark);
      const hintBtn = view.querySelector('#hint');
      hintBtn.textContent = `Indiciu (${g.hints})`;
      hintBtn.disabled = finished || g.hints === 0;
      view.querySelector('#giveup').disabled = finished;
      view.querySelector('#clear').disabled = finished;
      view.querySelector('#end-note').innerHTML = g.won || g.gaveUp ? `<p class="end-note">E ${esc(pic.reveal)}!${g.gaveUp ? ' Aceasta este soluția.' : ''}</p>` : '';
    }

    function isSolved() {
      for (let r = 0; r < h; r++) if (!same(line(rowVals(r)), hint.rows[r])) return false;
      for (let c = 0; c < w; c++) if (!same(line(colVals(c)), hint.cols[c])) return false;
      return true;
    }

    board.addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]');
      if (!b || finished) return;
      const i = Number(b.dataset.i);
      const want = mark ? 2 : 1;
      g.on[i] = g.on[i] === want ? 0 : want;
      save();
      const filled = g.on.filter((v) => v === 1).length;
      const total = pic.rows.join('').replace(/\./g, '').length;
      touch({ id: key, section: 'hobby', title: 'Nonogram · ' + pic.title, sub: '', pct: Math.min(100, Math.round((filled / total) * 100)), href: '#/hobby/nonogram/' + id });
      draw();
      board.querySelector(`[data-i="${i}"]`).focus();
      checkWin();
    });
    function checkWin() {
      if (!isSolved()) return;
      finished = true;
      const first = !state.nonoDone[pic.id];
      state.nonoDone[pic.id] = true;
      if (first) addPoints(40);
      forget(key);
      confetti();
      g.won = true;
      if (daily) window.Daily.complete();
      if (!daily) delete state.games[key];
      save();
      draw();
      dialog(`E ${pic.reveal}!`, (first ? 'Ai rezolvat desenul.' : 'Ai rezolvat-o din nou.') + (daily ? ' Seria ta: ' + window.Daily.streak() + '.' : ''), [
        { label: daily ? 'Înapoi la Hobby' : 'Alt desen', href: daily ? '#/hobby' : '#/hobby/nonogram' },
        { label: 'Rămân să privesc', ghost: true },
      ]);
    }
    view.querySelector('#hint').addEventListener('click', () => {
      if (finished || g.hints === 0) return;
      const wrong = solution.map((v, i) => ((g.on[i] === 1) !== (v === 1) ? i : -1)).filter((i) => i >= 0);
      if (!wrong.length) return;
      const i = wrong[Math.floor(Math.random() * wrong.length)];
      g.on[i] = solution[i] ? 1 : 2;
      g.hints--;
      save();
      draw();
      checkWin();
    });
    view.querySelector('#giveup').addEventListener('click', () => {
      if (finished) return;
      dialog('Te dai bătut?', daily ? 'Îți arăt desenul, iar ziua de azi nu intră în serie.' : 'Îți arăt desenul.', [
        { label: 'Arată soluția', onClick: () => {
          g.on = solution.slice();
          g.gaveUp = true;
          finished = true;
          forget(key);
          save();
          draw();
        } },
        { label: 'Mai încerc', ghost: true },
      ]);
    });
    view.querySelector('#m-fill').addEventListener('click', () => { mark = false; draw(); });
    view.querySelector('#m-x').addEventListener('click', () => { mark = true; draw(); });
    view.querySelector('#clear').addEventListener('click', () => {
      if (finished) return;
      g.on = Array(w * h).fill(0);
      state.games[key] = g;
      save();
      draw();
    });
    draw();
  });
})();
