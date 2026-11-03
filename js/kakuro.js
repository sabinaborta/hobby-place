// Kakuro: generator de table si interfata. Se accepta orice solutie care respecta sumele.
(function () {
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Grupurile de casute albe, pe orizontala si pe verticala.
  function findRuns(mask) {
    const n = mask.length, runs = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (!mask[r][c]) continue;
        if (!mask[r][c - 1]) {
          const cells = [];
          for (let k = c; k < n && mask[r][k]; k++) cells.push([r, k]);
          runs.push({ dir: 'a', clue: [r, c - 1], cells });
        }
        if (!(mask[r - 1] && mask[r - 1][c])) {
          const cells = [];
          for (let k = r; k < n && mask[k][c]; k++) cells.push([k, c]);
          runs.push({ dir: 'd', clue: [r - 1, c], cells });
        }
      }
    }
    return runs;
  }

  function validMask(mask, minWhite) {
    const n = mask.length;
    let white = 0, start = null;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (mask[r][c]) { white++; start = start || [r, c]; }
    if (!start || white < minWhite) return false;
    if (findRuns(mask).some((run) => run.cells.length < 2 || run.cells.length > 6)) return false;
    const seen = new Set([start.join()]);
    const stack = [start];
    while (stack.length) {
      const [r, c] = stack.pop();
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([a, b]) => {
        const y = r + a, x = c + b, key = y + ',' + x;
        if (mask[y] && mask[y][x] && !seen.has(key)) { seen.add(key); stack.push([y, x]); }
      });
    }
    return seen.size === white;
  }

  // Masca simetrica la rotire; randul si coloana 0 raman pentru indicii.
  function randomMask(size, minWhite) {
    const n = size + 1;
    for (let t = 0; t < 20000; t++) {
      const mask = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => r > 0 && c > 0));
      const blocks = Math.floor(size * size * (0.18 + Math.random() * 0.14));
      for (let b = 0; b < blocks / 2; b++) {
        const r = 1 + Math.floor(Math.random() * size), c = 1 + Math.floor(Math.random() * size);
        mask[r][c] = false;
        mask[size + 1 - r][size + 1 - c] = false;
      }
      if (validMask(mask, minWhite)) return mask;
    }
    return null;
  }

  function fillDigits(mask, runs) {
    const n = mask.length;
    const sol = Array.from({ length: n }, () => new Array(n).fill(0));
    const list = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (mask[r][c]) list.push([r, c]);
    const runsOf = {};
    runs.forEach((run) => run.cells.forEach(([r, c]) => { (runsOf[r + ',' + c] = runsOf[r + ',' + c] || []).push(run); }));
    function step(i) {
      if (i === list.length) return true;
      const [r, c] = list[i];
      for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        if (runsOf[r + ',' + c].some((run) => run.cells.some(([y, x]) => sol[y][x] === v))) continue;
        sol[r][c] = v;
        if (step(i + 1)) return true;
        sol[r][c] = 0;
      }
      return false;
    }
    return step(0) ? sol : null;
  }

  const sizes = { usor: [4, 8], mediu: [5, 13], greu: [7, 26] };
  function generate(level) {
    const [size, minWhite] = sizes[level];
    for (;;) {
      const mask = randomMask(size, minWhite);
      if (!mask) continue;
      const runs = findRuns(mask);
      const sol = fillDigits(mask, runs);
      if (!sol) continue;
      runs.forEach((run) => { run.sum = run.cells.reduce((s, [r, c]) => s + sol[r][c], 0); });
      return { mask, runs: runs, sol };
    }
  }

  function combos(sum, count, used) {
    const out = [];
    (function rec(start, left, pick) {
      if (pick.length === count) { if (left === 0) out.push(pick); return; }
      for (let v = start; v <= 9; v++) if (!used.includes(v) && v <= left) rec(v + 1, left - v, pick.concat(v));
    })(1, sum, []);
    return out;
  }

  // Gaseste o solutie din sume, pentru butonul Ma dau batut.
  function solve(game) {
    const cells = [];
    game.runs.forEach((run) => run.cells.forEach(([r, c]) => { if (!cells.some(([y, x]) => y === r && x === c)) cells.push([r, c]); }));
    const v = {};
    const ok = () => game.runs.every((run) => {
      const a = run.cells.map(([r, c]) => v[r + ',' + c]).filter(Boolean);
      const sum = a.reduce((p, q) => p + q, 0);
      return new Set(a).size === a.length && sum <= run.sum && (a.length < run.cells.length || sum === run.sum);
    });
    (function step(i) {
      if (i === cells.length) return true;
      const key = cells[i].join();
      for (let d = 1; d <= 9; d++) {
        v[key] = d;
        if (ok() && step(i + 1)) return true;
      }
      delete v[key];
      return false;
    })(0);
    return v;
  }

  window.KakuroEngine = { generate, findRuns, combos, solve };

  if (!window.HP) return;
  const { route, mount, state, save, addPoints, touch, forget, dialog, confetti } = HP;
  const names = { usor: 'Mic', mediu: 'Mediu', greu: 'Mare' };
  const reward = { usor: 30, mediu: 60, greu: 120 };

  function newGame(level, key, daily) {
    const g = daily ? window.Daily.seeded(() => generate(level)) : generate(level);
    state.games[key] = { level, mask: g.mask, runs: g.runs, cells: {}, date: daily ? window.Daily.today() : undefined };
    save();
  }

  route(/^\/hobby\/kakuro$/, () => page(false));
  route(/^\/hobby\/kakuro\/zilnic$/, () => page(true));

  function page(daily) {
    const view = mount({ section: 'hobby', theme: 'hobby' });
    const KEY = daily ? 'kakuroDaily' : 'kakuro';
    const HREF = daily ? '#/hobby/kakuro/zilnic' : '#/hobby/kakuro';
    if (daily && state.games[KEY] && state.games[KEY].date !== window.Daily.today()) state.games[KEY] = null;
    if (!state.games[KEY]) newGame(daily ? window.Daily.game().level || 'usor' : 'usor', KEY, daily);
    let g = state.games[KEY];
    let sel = null;
    let finished = !!(g.won || g.gaveUp);

    view.innerHTML = `<section class="headrow">
      <div><h1 class="h1">Kakuro${daily ? ' · Provocarea zilei' : ''}</h1><p class="lead">Fiecare grup trebuie să dea suma din căsuța închisă, fără cifre repetate.</p><a class="how" href="#/hobby/kakuro/tutorial">Cum se joacă</a></div>
      <div class="chips" id="levels"></div></section>
      <section class="game">
        <div class="game-main"><div class="kakuro" id="board" role="group" aria-label="Tablă de Kakuro"></div></div>
        <aside class="game-side">
          <div class="panel" id="help" style="background:var(--lime)"></div>
          <div class="panel">
            <div class="pad" role="group" aria-label="Cifre">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button class="key" type="button" data-n="${n}">${n}</button>`).join('')}</div>
            <div class="tools"><button class="tool" type="button" id="erase">Șterge</button><button class="tool" type="button" id="giveup">Mă dau bătut</button></div>
            <div id="end-note"></div>
          </div>
        </aside></section>`;
    const board = view.querySelector('#board');
    const val = (r, c) => g.cells[r + ',' + c] || 0;
    const runsAt = (r, c) => g.runs.filter((run) => run.cells.some(([y, x]) => y === r && x === c));

    function bad(run) {
      const vals = run.cells.map(([r, c]) => val(r, c)).filter(Boolean);
      const sum = vals.reduce((a, b) => a + b, 0);
      return new Set(vals).size !== vals.length || sum > run.sum || (vals.length === run.cells.length && sum !== run.sum);
    }

    function draw() {
      const n = g.mask.length;
      board.style.gridTemplateColumns = `repeat(${n},1fr)`;
      let html = '';
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (g.mask[r][c]) {
            const v = val(r, c);
            const isBad = v && runsAt(r, c).some(bad);
            const isSel = sel && sel[0] === r && sel[1] === c;
            html += `<button type="button" class="k w${isBad ? ' bad' : ''}${isSel ? ' sel' : ''}" data-r="${r}" data-c="${c}" aria-label="Căsuță${v ? ': ' + v : ' goală'}">${v || ''}</button>`;
          } else {
            const across = g.runs.find((x) => x.dir === 'a' && x.clue[0] === r && x.clue[1] === c);
            const down = g.runs.find((x) => x.dir === 'd' && x.clue[0] === r && x.clue[1] === c);
            if (across || down) {
              html += `<span class="k clue">${down ? `<span aria-label="${down.sum} pe verticală">↓${down.sum}</span>` : ''}${across ? `<span aria-label="${across.sum} pe orizontală">→${across.sum}</span>` : ''}</span>`;
            } else html += '<span class="k block"></span>';
          }
        }
      }
      board.innerHTML = html;
      view.querySelector('#levels').innerHTML = daily ? '' : Object.keys(names).map((l) => `<button type="button" class="tab${l === g.level ? ' on' : ''}" data-l="${l}">${names[l]}</button>`).join('');
      view.querySelector('#giveup').disabled = finished;
      view.querySelector('#end-note').innerHTML = g.won ? '<p class="end-note">Rezolvat! Felicitări.</p>' : g.gaveUp ? '<p class="end-note">Aceasta este o soluție corectă.</p>' : '';
      drawHelp();
    }

    function drawHelp() {
      const box = view.querySelector('#help');
      if (!sel) { box.innerHTML = '<p style="font-weight:800">Alege o căsuță albă și îți arăt ce cifre pot merge.</p>'; return; }
      box.innerHTML = runsAt(sel[0], sel[1]).map((run) => {
        const used = run.cells.map(([r, c]) => val(r, c)).filter(Boolean);
        const left = run.sum - used.reduce((a, b) => a + b, 0);
        const free = run.cells.length - used.length;
        const opts = free > 0 ? combos(left, free, used) : [];
        return `<div style="margin-bottom:14px"><h2 style="font-size:16px;font-weight:800">${run.dir === 'a' ? 'Rândul →' : 'Coloana ↓'}${run.sum}</h2>
          <p style="font-weight:700;margin:2px 0 8px">${free ? `Mai ai ${left} în ${free} ${free === 1 ? 'căsuță' : 'căsuțe'}:` : 'Grup complet.'}</p>
          <div class="chips">${opts.slice(0, 8).map((o) => `<span class="pill">${o.join(' + ')}</span>`).join('')}${free && !opts.length ? '<span class="pill">nicio variantă, verifică cifrele</span>' : ''}${opts.length > 8 ? '<span class="pill">…</span>' : ''}</div></div>`;
      }).join('');
    }

    function set(v) {
      if (!sel || finished) return;
      const key = sel.join();
      if (v) g.cells[key] = v; else delete g.cells[key];
      const total = g.runs.filter((x) => x.dir === 'a').reduce((s, x) => s + x.cells.length, 0);
      touch({ id: KEY, section: 'hobby', title: (daily ? 'Provocarea zilei · Kakuro' : 'Kakuro · ' + names[g.level]), sub: Object.keys(g.cells).length + '/' + total, pct: Math.round((Object.keys(g.cells).length / total) * 100), href: HREF });
      save();
      draw();
      const full = g.runs.every((run) => run.cells.every(([r, c]) => val(r, c)));
      if (full && !g.runs.some(bad)) win();
    }

    function start(level) {
      newGame(level, KEY, daily);
      g = state.games[KEY];
      sel = null;
      finished = false;
      forget(KEY);
      draw();
    }

    function win() {
      finished = true;
      const level = g.level;
      const p = reward[level];
      addPoints(p);
      forget(KEY);
      confetti();
      g.won = true;
      if (daily) window.Daily.complete();
      save();
      draw();
      dialog('Rezolvat', `Toate sumele ies.${daily ? ' Seria ta: ' + window.Daily.streak() + '.' : ''}`, daily
        ? [{ label: 'Înapoi la Hobby', href: '#/hobby' }]
        : [
          { label: 'Altă tablă', onClick: () => { if (location.hash === HREF) start(level); } },
          { label: 'Înapoi la Hobby', href: '#/hobby', ghost: true },
        ]);
    }

    board.addEventListener('click', (e) => {
      const b = e.target.closest('[data-r]');
      if (b) { sel = [Number(b.dataset.r), Number(b.dataset.c)]; draw(); board.querySelector(`[data-r="${sel[0]}"][data-c="${sel[1]}"]`).focus(); }
    });
    board.addEventListener('keydown', (e) => {
      if (/^[1-9]$/.test(e.key)) set(Number(e.key));
      else if (e.key === 'Backspace' || e.key === 'Delete') set(0);
    });
    view.querySelector('.pad').addEventListener('click', (e) => {
      const b = e.target.closest('[data-n]');
      if (b) set(Number(b.dataset.n));
    });
    view.querySelector('#erase').addEventListener('click', () => set(0));
    view.querySelector('#giveup').addEventListener('click', () => {
      if (finished) return;
      dialog('Te dai bătut?', daily ? 'Îți arăt o soluție, iar ziua de azi nu intră în serie.' : 'Îți arăt o soluție.', [
        { label: 'Arată soluția', onClick: () => {
          g.cells = solve(g);
          g.gaveUp = true;
          finished = true;
          forget(KEY);
          save();
          draw();
        } },
        { label: 'Mai încerc', ghost: true },
      ]);
    });
    view.querySelector('#levels').addEventListener('click', (e) => {
      const b = e.target.closest('[data-l]');
      if (!b) return;
      if (!finished && Object.keys(g.cells).length) {
        dialog('Începi o tablă nouă?', 'Tabla curentă se pierde.', [
          { label: 'Da, tablă nouă', onClick: () => start(b.dataset.l) },
          { label: 'Rămân aici', ghost: true },
        ]);
      } else start(b.dataset.l);
    });
    draw();
  }
})();
