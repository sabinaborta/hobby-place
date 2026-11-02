// Sudoku: generator cu solutie unica si interfata de joc.
(function () {
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function can(g, i, v) {
    const r = Math.floor(i / 9), c = i % 9;
    for (let k = 0; k < 9; k++) {
      if (g[r * 9 + k] === v || g[k * 9 + c] === v) return false;
    }
    const br = r - (r % 3), bc = c - (c % 3);
    for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) if (g[(br + y) * 9 + bc + x] === v) return false;
    return true;
  }
  function fill(g) {
    const i = g.indexOf(0);
    if (i < 0) return true;
    for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      if (can(g, i, v)) {
        g[i] = v;
        if (fill(g)) return true;
        g[i] = 0;
      }
    }
    return false;
  }
  // Numara solutiile, oprindu-se la limita.
  function count(g, limit) {
    let best = -1, bestOpts = null;
    for (let i = 0; i < 81; i++) {
      if (g[i]) continue;
      const opts = [];
      for (let v = 1; v <= 9; v++) if (can(g, i, v)) opts.push(v);
      if (!opts.length) return 0;
      if (!bestOpts || opts.length < bestOpts.length) { best = i; bestOpts = opts; }
    }
    if (best < 0) return 1;
    let n = 0;
    for (const v of bestOpts) {
      g[best] = v;
      n += count(g, limit - n);
      g[best] = 0;
      if (n >= limit) break;
    }
    return n;
  }
  const clues = { usor: 40, mediu: 32, greu: 27 };
  function generate(level) {
    const sol = new Array(81).fill(0);
    fill(sol);
    const puzzle = sol.slice();
    let left = 81;
    for (const i of shuffle([...Array(81).keys()])) {
      if (left <= clues[level]) break;
      const keep = puzzle[i];
      puzzle[i] = 0;
      if (count(puzzle.slice(), 2) !== 1) puzzle[i] = keep; else left--;
    }
    return { puzzle, sol };
  }
  window.SudokuEngine = { generate, count, can };

  if (!window.HP) return;
  const { route, mount, state, save, addPoints, touch, forget, dialog, confetti, fmtTime, toast, onLeave } = HP;
  const names = { usor: 'Ușor', mediu: 'Mediu', greu: 'Greu' };
  const reward = { usor: 30, mediu: 60, greu: 100 };
  const MAX_HINTS = 3;

  function newGame(level, key, daily) {
    const { puzzle, sol } = daily ? window.Daily.seeded(() => generate(level)) : generate(level);
    state.games[key] = { level, puzzle, sol, cells: puzzle.slice(), notes: {}, secs: 0, undo: [], hints: MAX_HINTS, date: daily ? window.Daily.today() : undefined };
    save();
  }

  route(/^\/hobby\/sudoku$/, () => page(false));
  route(/^\/hobby\/sudoku\/zilnic$/, () => page(true));

  function page(daily) {
    const view = mount({ section: 'hobby', theme: 'hobby' });
    const KEY = daily ? 'sudokuDaily' : 'sudoku';
    const HREF = daily ? '#/hobby/sudoku/zilnic' : '#/hobby/sudoku';
    if (daily && state.games[KEY] && state.games[KEY].date !== window.Daily.today()) state.games[KEY] = null;
    if (!state.games[KEY]) newGame(daily ? window.Daily.game().level || 'mediu' : 'mediu', KEY, daily);
    let g = state.games[KEY];
    let sel = g.cells.indexOf(0);
    let notesOn = false;
    let finished = !!(g.won || g.gaveUp);

    view.innerHTML = `<section class="headrow"><div><h1 class="h1">Sudoku${daily ? ' · Provocarea zilei' : ''}</h1><a class="how" href="#/hobby/sudoku/tutorial">Cum se joacă</a></div>
      <div class="chips" id="levels"></div></section>
      <section class="game">
        <div class="game-main"><div class="sudoku" id="board" role="group" aria-label="Tablă de Sudoku"></div></div>
        <aside class="game-side">
          <div class="panel stat"><div><small>Nivel</small><b id="lvl"></b></div><div style="text-align:right"><small>Timp</small><b id="time"></b></div></div>
          <div class="panel">
            <div class="pad" role="group" aria-label="Cifre">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button class="key" type="button" data-n="${n}">${n}</button>`).join('')}</div>
            <div class="tools">
              <button class="tool" type="button" id="notes" aria-pressed="false">Notițe</button>
              <button class="tool" type="button" id="undo">Anulează</button>
              <button class="tool" type="button" id="erase">Șterge</button>
              <button class="tool" type="button" id="hint">Indiciu</button>
              <button class="tool" type="button" id="giveup">Mă dau bătut</button>
            </div>
            <div id="end-note"></div>
          </div>
          <p style="font-weight:700">Poți folosi și tastatura: săgeți, cifre, Backspace.</p>
        </aside></section>`;
    const board = view.querySelector('#board');
    board.innerHTML = [...Array(81).keys()].map((i) => {
      const r = Math.floor(i / 9), c = i % 9;
      const cls = (c === 2 || c === 5 ? ' br' : '') + (r === 2 || r === 5 ? ' bb' : '');
      return `<button type="button" class="c${cls}" data-i="${i}"></button>`;
    }).join('');
    const cellsEl = [...board.children];

    function conflict(i) {
      const v = g.cells[i];
      if (!v) return false;
      const copy = g.cells.slice();
      copy[i] = 0;
      return !can(copy, i, v);
    }

    function draw() {
      const selV = sel >= 0 ? g.cells[sel] : 0;
      const sr = Math.floor(sel / 9), sc = sel % 9;
      cellsEl.forEach((el, i) => {
        const r = Math.floor(i / 9), c = i % 9;
        const v = g.cells[i];
        const given = g.puzzle[i] !== 0;
        const near = sel >= 0 && (r === sr || c === sc || (Math.floor(r / 3) === Math.floor(sr / 3) && Math.floor(c / 3) === Math.floor(sc / 3)));
        el.className = 'c' + (c === 2 || c === 5 ? ' br' : '') + (r === 2 || r === 5 ? ' bb' : '') +
          (near ? ' h' : '') + (v && v === selV ? ' same' : '') + (!given && v ? ' u' : '') + (conflict(i) ? ' bad' : '') + (i === sel ? ' sel' : '');
        const notes = g.notes[i];
        el.innerHTML = v ? String(v) : notes && notes.length
          ? `<span class="notes">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<span>${notes.includes(n) ? n : ''}</span>`).join('')}</span>` : '';
        el.setAttribute('aria-label', `Rândul ${r + 1}, coloana ${c + 1}${v ? ': ' + v : ', gol'}${given ? ', dat' : ''}`);
      });
      view.querySelector('#levels').innerHTML = daily ? '' : Object.keys(names).map((l) =>
        `<button type="button" class="tab${l === g.level ? ' on' : ''}" data-l="${l}">${names[l]}</button>`).join('');
      view.querySelector('#giveup').disabled = finished;
      view.querySelector('#end-note').innerHTML = g.won ? '<p class="end-note">Rezolvat! Felicitări.</p>' : g.gaveUp ? '<p class="end-note">Aceasta este soluția.</p>' : '';
      view.querySelector('#lvl').textContent = names[g.level];
      view.querySelector('#time').textContent = fmtTime(g.secs);
      const notesBtn = view.querySelector('#notes');
      notesBtn.classList.toggle('on', notesOn);
      notesBtn.setAttribute('aria-pressed', notesOn);
      if (g.hints === undefined) g.hints = MAX_HINTS;
      const hintBtn = view.querySelector('#hint');
      hintBtn.textContent = `Indiciu (${g.hints})`;
      hintBtn.disabled = g.hints === 0;
    }

    function remember() {
      const filled = g.cells.filter(Boolean).length - g.puzzle.filter(Boolean).length;
      const total = 81 - g.puzzle.filter(Boolean).length;
      touch({ id: KEY, section: 'hobby', title: (daily ? 'Provocarea zilei · ' : 'Sudoku · ') + names[g.level], sub: fmtTime(g.secs), pct: Math.round((filled / total) * 100), href: HREF });
    }

    function set(i, v) {
      if (finished || i < 0 || g.puzzle[i]) return;
      g.undo.push([i, g.cells[i], (g.notes[i] || []).slice()]);
      if (g.undo.length > 200) g.undo.shift();
      g.cells[i] = v;
      if (v) delete g.notes[i];
      save();
      remember();
      draw();
      if (g.cells.every((x, k) => x === g.sol[k])) win();
    }

    function press(n) {
      if (sel < 0 || g.puzzle[sel]) return;
      if (notesOn) {
        if (g.cells[sel]) return;
        const cur = g.notes[sel] || [];
        g.notes[sel] = cur.includes(n) ? cur.filter((x) => x !== n) : cur.concat(n);
        save();
        draw();
      } else set(sel, n);
    }

    function start(level) {
      newGame(level, KEY, daily);
      g = state.games[KEY];
      sel = g.cells.indexOf(0);
      finished = false;
      forget(KEY);
      draw();
    }

    function win() {
      finished = true;
      const p = reward[g.level];
      addPoints(p);
      forget(KEY);
      confetti();
      const level = g.level;
      const t = fmtTime(g.secs);
      g.won = true;
      if (daily) window.Daily.complete();
      save();
      draw();
      dialog('Bravo!', `Ai terminat în ${t} și ai câștigat ${p} de puncte.${daily ? ' Seria ta: ' + window.Daily.streak() + '.' : ''}`, daily
        ? [{ label: 'Înapoi la Hobby', href: '#/hobby' }]
        : [
          { label: 'Alt puzzle', onClick: () => { if (location.hash === HREF) start(level); } },
          { label: 'Înapoi la Hobby', href: '#/hobby', ghost: true },
        ]);
    }

    board.addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]');
      if (b) { sel = Number(b.dataset.i); draw(); }
    });
    board.addEventListener('keydown', (e) => {
      const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -9, ArrowDown: 9 };
      if (moves[e.key] !== undefined) {
        e.preventDefault();
        const next = sel + moves[e.key];
        if (next >= 0 && next < 81) { sel = next; draw(); cellsEl[sel].focus(); }
      } else if (/^[1-9]$/.test(e.key)) press(Number(e.key));
      else if (e.key === 'Backspace' || e.key === 'Delete') set(sel, 0);
    });
    view.querySelector('.pad').addEventListener('click', (e) => {
      const b = e.target.closest('[data-n]');
      if (b) press(Number(b.dataset.n));
    });
    view.querySelector('#levels').addEventListener('click', (e) => {
      const b = e.target.closest('[data-l]');
      if (!b) return;
      if (!finished && g.cells.some((v, i) => v && !g.puzzle[i])) {
        dialog('Începi un puzzle nou?', 'Puzzle-ul curent se pierde.', [
          { label: 'Da, puzzle nou', onClick: () => start(b.dataset.l) },
          { label: 'Rămân aici', ghost: true },
        ]);
      } else start(b.dataset.l);
    });
    view.querySelector('#giveup').addEventListener('click', () => {
      if (finished) return;
      dialog('Te dai bătut?', daily ? 'Îți arăt soluția. Nu primești puncte, iar ziua de azi nu intră în serie.' : 'Îți arăt soluția. Nu primești puncte.', [
        { label: 'Arată soluția', onClick: () => {
          g.cells = g.sol.slice();
          g.notes = {};
          g.gaveUp = true;
          finished = true;
          forget(KEY);
          save();
          draw();
        } },
        { label: 'Mai încerc', ghost: true },
      ]);
    });
    view.querySelector('#notes').addEventListener('click', () => { notesOn = !notesOn; draw(); });
    view.querySelector('#erase').addEventListener('click', () => {
      if (sel >= 0 && !g.puzzle[sel]) { delete g.notes[sel]; set(sel, 0); }
    });
    view.querySelector('#undo').addEventListener('click', () => {
      const u = g.undo.pop();
      if (!u) return;
      g.cells[u[0]] = u[1];
      if (u[2].length) g.notes[u[0]] = u[2];
      save();
      draw();
    });
    view.querySelector('#hint').addEventListener('click', () => {
      if (g.hints === 0) return;
      if (sel < 0 || g.puzzle[sel] || g.cells[sel] === g.sol[sel]) { toast('Alege o căsuță goală sau greșită.'); return; }
      g.hints--;
      set(sel, g.sol[sel]);
    });

    const timer = setInterval(() => {
      if (finished || document.hidden) return;
      g.secs++;
      view.querySelector('#time').textContent = fmtTime(g.secs);
      if (g.secs % 10 === 0) save();
    }, 1000);
    onLeave(() => { clearInterval(timer); save(); });
    draw();
  }
})();
