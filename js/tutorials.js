// Tutoriale pe pasi pentru Sudoku, Kakuro si Nonogram, fiecare cu un exercitiu de proba la final.
(function () {
  const { route, mount, backIcon, esc, toast } = HP;

  // Tabla statica: fiecare celula este {t: text, c: clase}.
  function board(rows, opts) {
    const o = opts || {};
    const cols = rows[0].length;
    return `<div class="tut-board${o.kind ? ' ' + o.kind : ''}" style="grid-template-columns:repeat(${cols},1fr);max-width:${o.width || cols * 58}px" role="img" aria-label="${esc(o.label || 'Exemplu')}">${rows.map((row) => row.map((cell) => {
      const x = typeof cell === 'object' ? cell : { t: cell };
      return `<span class="tc ${x.c || ''}">${esc(x.t === undefined || x.t === 0 ? '' : x.t)}</span>`;
    }).join('')).join('')}</div>`;
  }
  const on = (t) => ({ t, c: 'mark' });
  const answer = (t) => ({ t, c: 'answer' });
  const clue = (t) => ({ t, c: 'clue' });
  const block = () => ({ t: '', c: 'block' });
  const fill = () => ({ t: '', c: 'filled' });
  const sureFill = () => ({ t: '', c: 'filled sure' });
  const x = () => ({ t: '×', c: 'crossed' });

  const line = (cells) => {
    const out = [];
    let run = 0;
    cells.forEach((v) => {
      if (v) run++;
      else if (run) { out.push(run); run = 0; }
    });
    if (run) out.push(run);
    return out;
  };

  const TUTORIALS = {
    sudoku: {
      title: 'Sudoku', play: '#/hobby/sudoku',
      steps: [
        { h: 'Scopul jocului', html: `<p>Completezi tabla cu cifre, astfel încât fiecare cifră să apară <b>o singură dată</b> în:</p><ul><li>fiecare <b>rând</b>;</li><li>fiecare <b>coloană</b>;</li><li>fiecare <b>pătrat mare</b>.</li></ul><p>Tabla mare are 9 × 9 căsuțe și cifrele 1–9. Aici începem cu o tablă mică, de 4 × 4, cu cifrele 1–4. Regulile sunt aceleași.</p>${board([[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]], { kind: 'box2', label: 'Tablă de 4 pe 4 completată' })}` },
        { h: 'Primul truc: căsuța rămasă', html: `<p>Caută un rând, o coloană sau un pătrat căruia îi lipsește o singură cifră.</p>${board([[on(1), on(2), answer(3), on(4)], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], { kind: 'box2', label: 'Primul rând are 1, 2 și 4, deci lipsește 3' })}<p>Primul rând are deja 1, 2 și 4. Singura cifră rămasă este <b>3</b>.</p>` },
        { h: 'Al doilea truc: eliminarea', html: `<p>Alege o cifră și vezi unde <b>nu</b> poate sta. O cifră blochează restul rândului și al coloanei ei.</p>${board([[on(4), 0, 0, 0], [0, 0, 0, 0], [{ t: '', c: 'off' }, { t: '', c: 'off' }, answer(4), 3], [0, on(4), 0, 0]], { kind: 'box2', label: 'Cifra 4 în rândul al treilea poate sta doar pe coloana a treia' })}<p>Unde merge <b>4</b> pe rândul al treilea? Prima și a doua coloană au deja un 4, iar ultima căsuță este ocupată de 3. Rămâne un singur loc: coloana a treia.</p>` },
        { h: 'Butoanele din joc', html: `<div class="tbl"><table><tbody><tr><td><b>Cifrele</b></td><td>Alegi o căsuță, apoi apeși cifra sau o tastezi.</td></tr><tr><td><b>Notițe</b></td><td>Scrii cu mic cifrele posibile, când nu ai decis încă.</td></tr><tr><td><b>Anulează</b></td><td>Revine la pasul anterior.</td></tr><tr><td><b>Șterge</b></td><td>Golește căsuța aleasă.</td></tr><tr><td><b>Indiciu</b></td><td>Completează corect căsuța aleasă. Ai <b>3 indicii</b> pe puzzle.</td></tr></tbody></table></div><p>O cifră apare <b>roșie și subliniată</b> când se repetă în același rând, coloană sau pătrat.</p>` },
        { h: 'Exersează', practice: 'sudoku' },
      ],
    },
    kakuro: {
      title: 'Kakuro', play: '#/hobby/kakuro',
      steps: [
        { h: 'Scopul jocului', html: `<p>Kakuro seamănă cu un careu de cuvinte, dar cu cifre. Umpli căsuțele albe cu cifre de la 1 la 9, după două reguli:</p><ol><li>cifrele unui grup trebuie să dea <b>suma</b> din căsuța închisă;</li><li>într-un grup, <b>nicio cifră nu se repetă</b>.</li></ol>` },
        { h: 'Cum citești sumele', html: `<p><b>→ 4</b> este suma grupului de la dreapta. <b>↓ 3</b> este suma grupului de dedesubt.</p>${board([[block(), clue('↓4'), clue('↓3')], [clue('→3'), answer(1), answer(2)], [clue('→4'), answer(3), answer(1)]], { kind: 'kakuro', label: 'Tablă de Kakuro rezolvată' })}<p>Verificare: pe rânduri 1 + 2 = 3 și 3 + 1 = 4; pe coloane 1 + 3 = 4 și 2 + 1 = 3.</p>` },
        { h: 'Combinații care ajută', html: `<p>Unele sume se pot face într-un singur fel. Începe cu ele.</p><div class="tbl"><table><thead><tr><th>Sumă</th><th>Căsuțe</th><th>Cifre</th></tr></thead><tbody><tr><td>3</td><td>2</td><td>1 + 2</td></tr><tr><td>4</td><td>2</td><td>1 + 3</td></tr><tr><td>16</td><td>2</td><td>7 + 9</td></tr><tr><td>17</td><td>2</td><td>8 + 9</td></tr><tr><td>6</td><td>3</td><td>1 + 2 + 3</td></tr><tr><td>24</td><td>3</td><td>7 + 8 + 9</td></tr></tbody></table></div><p>Nu trebuie să le înveți pe dinafară. Când alegi o căsuță, jocul îți arată combinațiile posibile.</p>` },
        { h: 'Intersecția', html: `<p>O căsuță aparține unui rând și unei coloane, deci cifra ei trebuie să se potrivească la ambele.</p>${board([[block(), clue('↓17'), block()], [clue('→16'), on('?'), 0], [block(), 0, block()]], { kind: 'kakuro', label: 'Căsuța de la intersecția sumelor 16 și 17' })}<ul><li>Rândul <b>→16</b> folosește doar 7 și 9.</li><li>Coloana <b>↓17</b> folosește doar 8 și 9.</li><li>Singura cifră comună este <b>9</b>.</li></ul>` },
        { h: 'Exersează', practice: 'kakuro' },
      ],
    },
    nonogram: {
      title: 'Nonogram', play: '#/hobby/nonogram',
      steps: [
        { h: 'Scopul jocului', html: `<p>Umpli pătrățele după numerele de pe margini. Când termini, apare un desen.</p><p>Numerele arată câte pătrate pline vin <b>unul lângă altul</b>, pe rândul sau coloana respectivă.</p>${board([[{ t: '', c: 'clue-soft' }, { t: '2', c: 'clue-soft' }, { t: '3', c: 'clue-soft' }, { t: '2', c: 'clue-soft' }], [{ t: '3', c: 'clue-soft' }, fill(), fill(), fill()], [{ t: '3', c: 'clue-soft' }, fill(), fill(), fill()], [{ t: '1', c: 'clue-soft' }, 0, fill(), 0]], { kind: 'nono-mini', label: 'Nonogram mic rezolvat' })}` },
        { h: 'Cum citești numerele', html: `<p><b>3 1</b> înseamnă: un grup de 3 pătrate, <b>cel puțin un gol</b>, apoi un grup de 1. Ordinea contează.</p>${board([[fill(), fill(), fill(), 0, fill()]], { kind: 'nono-mini', width: 260, label: 'Rând cu indiciul 3 1' })}<p>Pe un rând de 5 căsuțe, 3 + 1 + golul dintre ele înseamnă exact 5, deci există un singur mod.</p>` },
        { h: 'Truc: suprapunerea', html: `<p>Dacă un grup este lung, unele căsuțe sunt pline oriunde l-ai așeza. Luăm <b>4</b> pe un rând de 5 căsuțe:</p>${board([[fill(), fill(), fill(), fill(), 0], [0, fill(), fill(), fill(), fill()], [0, sureFill(), sureFill(), sureFill(), 0]], { kind: 'nono-mini', width: 260, label: 'Grupul de 4 pus la stânga și la dreapta; căsuțele din mijloc sunt sigur pline' })}<p>Primele două rânduri arată cele două așezări posibile. Căsuțele 2, 3 și 4 sunt pline în ambele, deci le poți umple imediat.</p>` },
        { h: 'Marchează golurile', html: `<p>Modul <b>Marchează gol ×</b> pune un semn pe căsuțele care sigur rămân goale. Te ajută să nu încerci aceeași căsuță de două ori.</p>${board([[fill(), fill(), x(), x(), fill()]], { kind: 'nono-mini', width: 260, label: 'Rând cu două căsuțe marcate gol' })}<p>Când un rând sau o coloană este completă, numerele ei devin mai deschise la culoare.</p>` },
        { h: 'Exersează', practice: 'nonogram' },
      ],
    },
  };

  // ---------- Exercitiile de proba ----------
  function sudokuPractice(box, done) {
    const sol = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]];
    const given = [[1, 0, 3, 0], [0, 4, 0, 2], [2, 0, 4, 0], [0, 3, 0, 1]];
    const g = given.map((r) => r.slice());
    box.innerHTML = `<p>Completează tabla cu cifrele 1–4: fiecare o singură dată pe rând, pe coloană și în pătratul de 2 × 2.</p>
      <div class="tut-board box2 play" style="grid-template-columns:repeat(4,1fr);max-width:232px">${g.map((row, r) => row.map((v, c) => (v ? `<span class="tc">${v}</span>` : `<input class="tc inp" inputmode="numeric" maxlength="1" data-r="${r}" data-c="${c}" aria-label="Rândul ${r + 1}, coloana ${c + 1}">`)).join('')).join('')}</div>`;
    box.addEventListener('input', (e) => {
      const i = e.target;
      if (!i.dataset || i.dataset.r === undefined) return;
      const v = i.value.replace(/[^1-4]/g, '');
      i.value = v;
      g[i.dataset.r][i.dataset.c] = Number(v) || 0;
      const wrong = v && Number(v) !== sol[i.dataset.r][i.dataset.c];
      i.classList.toggle('bad', !!wrong);
      if (g.every((row, r) => row.every((n, c) => n === sol[r][c]))) done();
    });
  }

  function kakuroPractice(box, done) {
    const vals = { a: '', b: '', c: '', d: '' };
    const cell = (k) => `<input class="tc inp" inputmode="numeric" maxlength="1" data-k="${k}" aria-label="Căsuță">`;
    box.innerHTML = `<p>Completează tabla. Începe cu rândul <b>→3</b>: singura combinație este 1 + 2.</p>
      <div class="tut-board kakuro play" style="grid-template-columns:repeat(3,1fr);max-width:190px"><span class="tc block"></span><span class="tc clue">↓4</span><span class="tc clue">↓3</span><span class="tc clue">→3</span>${cell('a')}${cell('b')}<span class="tc clue">→4</span>${cell('c')}${cell('d')}</div>
      <p class="tut-hint" id="hintline"></p>`;
    box.addEventListener('input', (e) => {
      const i = e.target;
      if (!i.dataset || !i.dataset.k) return;
      i.value = i.value.replace(/[^1-9]/g, '');
      vals[i.dataset.k] = Number(i.value) || 0;
      const { a, b, c, d } = vals;
      if (a && b && c && d) {
        const ok = a + b === 3 && c + d === 4 && a + c === 4 && b + d === 3 && a !== b && c !== d && a !== c && b !== d;
        box.querySelector('#hintline').textContent = ok ? '' : 'Nu se potrivește încă. Verifică sumele și repetițiile.';
        if (ok) done();
      }
    });
  }

  function nonogramPractice(box, done) {
    const pic = ['.#.#.', '#####', '#####', '.###.', '..#..'].map((r) => [...r].map((ch) => ch === '#'));
    const n = 5;
    const on = pic.map((r) => r.map(() => false));
    const colClue = (c) => line(pic.map((r) => r[c]));
    const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
    box.innerHTML = `<p>Apasă pe pătrate ca să le umpli. Începe cu rândurile <b>5</b>: sunt pline de tot.</p>
      <div class="tut-board nono-mini play" style="grid-template-columns:44px repeat(${n},1fr);max-width:300px"><span class="tc clue-soft"></span>${pic[0].map((_, c) => `<span class="tc clue-soft col">${colClue(c).join(' ')}</span>`).join('')}${pic.map((row, r) => `<span class="tc clue-soft">${line(row).join(' ')}</span>${row.map((_, c) => `<button type="button" class="tc cellbtn" data-r="${r}" data-c="${c}" aria-label="Rândul ${r + 1}, coloana ${c + 1}"></button>`).join('')}`).join('')}</div>`;
    box.addEventListener('click', (e) => {
      const b = e.target.closest('.cellbtn');
      if (!b) return;
      const r = Number(b.dataset.r);
      const c = Number(b.dataset.c);
      on[r][c] = !on[r][c];
      b.classList.toggle('filled', on[r][c]);
      const ok = pic.every((row, y) => same(line(on[y]), line(row))) && pic[0].every((_, cc) => same(line(on.map((row) => row[cc])), colClue(cc)));
      if (ok) done();
    });
  }

  const practice = { sudoku: sudokuPractice, kakuro: kakuroPractice, nonogram: nonogramPractice };

  route(/^\/hobby\/(sudoku|kakuro|nonogram)\/tutorial$/, (id) => {
    const T = TUTORIALS[id];
    const view = mount({ section: 'hobby', theme: 'hobby', narrow: true });
    let i = 0;
    function draw() {
      const s = T.steps[i];
      const last = i === T.steps.length - 1;
      view.innerHTML = `<a class="back" href="${T.play}"><span class="round small">${backIcon}</span>Înapoi la ${esc(T.title)}</a>
        <article class="panel tut">
          <p class="kicker">Tutorial ${esc(T.title)} · pasul ${i + 1} din ${T.steps.length}</p>
          <h1 class="serif tut-title">${esc(s.h)}</h1>
          <div class="tut-body">${s.html || ''}</div>
          <div class="practice" id="practice"></div>
          <p class="tut-done" id="donemsg" hidden>Bravo, ai rezolvat exercițiul! Poți începe jocul.</p>
          <div class="chips tut-nav">
            ${i ? '<button class="btn ghost" type="button" id="prev">Înapoi</button>' : ''}
            ${last ? `<a class="btn" href="${T.play}">Începe să joci</a>` : '<button class="btn" type="button" id="next">Mai departe</button>'}
          </div>
        </article>`;
      if (s.practice) practice[s.practice](view.querySelector('#practice'), () => {
        view.querySelector('#donemsg').hidden = false;
        toast('Bravo!');
      });
      window.scrollTo(0, 0);
    }
    view.addEventListener('click', (e) => {
      if (e.target.id === 'next') { i++; draw(); }
      if (e.target.id === 'prev') { i--; draw(); }
    });
    draw();
  });
})();
