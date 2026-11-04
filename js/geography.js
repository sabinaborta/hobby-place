// Geografie: harti pe continente, cu explorare, gasirea tarilor si capitale.
(function () {
  const { esc, route, mount, state, save, backIcon, onLeave } = HP;

  const SESSION = 10;
  const regions = () => window.GEO_REGIONS;
  const byId = (id) => regions().find((r) => r.id === id);
  const allOf = (r) => r.countries.concat(r.extra);
  const withCapital = (r) => allOf(r).filter((c) => c.c);

  function progress() {
    if (!state.geo) state.geo = { map: {}, cap: {} };
    return state.geo;
  }
  const known = (kind, list) => list.filter((c) => progress()[kind][c.n]).length;

  function shuffle(a) {
    const c = a.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  }

  const back = (href, label) => `<div><a class="back" href="${href}"><span class="round small">${backIcon}</span>${esc(label)}</a></div>`;
  const screen = () => mount({ section: 'learning', theme: 'study', noCoin: true });

  // Ce nu stii inca vine primul; greselile revin in aceeasi serie.
  function pickRound(list, kind) {
    const fresh = shuffle(list.filter((c) => !progress()[kind][c.n]));
    const old = shuffle(list.filter((c) => progress()[kind][c.n]));
    return fresh.concat(old).slice(0, SESSION);
  }

  // ---------- Harta, cu marire si deplasare ----------
  function createMap(host, region, { onPick }) {
    const paths = region.countries.map((c, i) => `<path class="geo-land" data-i="${i}" d="${c.p}"></path>`).join('');
    host.innerHTML = `<div class="geo-map">
        <svg viewBox="0 0 ${region.w} ${region.h}" role="application" aria-label="Harta: ${esc(region.name)}">
          <path class="geo-context" d="${region.context}"></path>${paths}<circle class="geo-ring" r="0"></circle>
        </svg>
        <div class="geo-zoom"><button type="button" class="tool" data-z="in" aria-label="Mărește">+</button><button type="button" class="tool" data-z="out" aria-label="Micșorează">−</button></div>
      </div>`;
    const svg = host.querySelector('svg');
    const ring = svg.querySelector('.geo-ring');
    const lands = [...svg.querySelectorAll('.geo-land')];
    let box = { x: 0, y: 0, w: region.w, h: region.h };

    function apply() { svg.setAttribute('viewBox', `${box.x} ${box.y} ${box.w} ${box.h}`); }
    function zoomAt(factor, cx, cy) {
      const w = Math.min(region.w, Math.max(region.w / 10, box.w * factor));
      const scale = w / box.w;
      const h = box.h * scale;
      box = { x: cx - (cx - box.x) * scale, y: cy - (cy - box.y) * scale, w, h };
      clamp();
      apply();
    }
    function clamp() {
      box.x = Math.min(region.w - box.w, Math.max(0, box.x));
      box.y = Math.min(region.h - box.h, Math.max(0, box.y));
    }
    function toMap(clientX, clientY) {
      const r = svg.getBoundingClientRect();
      return { x: box.x + ((clientX - r.left) / r.width) * box.w, y: box.y + ((clientY - r.top) / r.height) * box.h };
    }

    // Atingerea in apropierea unei tari mici o alege pe aceea.
    function hit(clientX, clientY) {
      const el = document.elementFromPoint(clientX, clientY);
      if (el && el.classList && el.classList.contains('geo-land')) return Number(el.dataset.i);
      const p = toMap(clientX, clientY);
      const limit = (18 / svg.getBoundingClientRect().width) * box.w;
      let best = -1;
      let bestD = limit;
      lands.forEach((l, i) => {
        const b = l.getBBox();
        const dx = Math.max(b.x - p.x, 0, p.x - b.x - b.width);
        const dy = Math.max(b.y - p.y, 0, p.y - b.y - b.height);
        const d = Math.hypot(dx, dy);
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    }

    const pointers = new Map();
    let moved = false;
    let pinch = 0;
    svg.addEventListener('pointerdown', (e) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY });
      if (pointers.size === 1) moved = false;
      if (pointers.size === 2) {
        moved = true;
        const [a, b] = [...pointers.values()];
        pinch = Math.hypot(a.x - b.x, a.y - b.y);
      }
      try { svg.setPointerCapture(e.pointerId); } catch (err) { /* pointerul a disparut deja */ }
    });
    svg.addEventListener('pointermove', (e) => {
      const p = pointers.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;
      if (Math.hypot(p.x - p.sx, p.y - p.sy) > 8) moved = true;
      if (pointers.size === 1 && moved && box.w < region.w) {
        const r = svg.getBoundingClientRect();
        box.x -= (dx / r.width) * box.w;
        box.y -= (dy / r.height) * box.h;
        clamp();
        apply();
      } else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch && dist) {
          const mid = toMap((a.x + b.x) / 2, (a.y + b.y) / 2);
          zoomAt(pinch / dist, mid.x, mid.y);
        }
        pinch = dist;
      }
    });
    const release = (e) => {
      const had = pointers.delete(e.pointerId);
      if (!had) return;
      if (e.type === 'pointerup' && !moved && !pointers.size) {
        const i = hit(e.clientX, e.clientY);
        if (i >= 0) onPick(i);
      }
    };
    svg.addEventListener('pointerup', release);
    svg.addEventListener('pointercancel', release);
    host.querySelector('.geo-zoom').addEventListener('click', (e) => {
      const b = e.target.closest('[data-z]');
      if (!b) return;
      zoomAt(b.dataset.z === 'in' ? 0.6 : 1 / 0.6, box.x + box.w / 2, box.y + box.h / 2);
    });

    return {
      clear() {
        lands.forEach((l) => l.removeAttribute('data-mark'));
        ring.setAttribute('r', 0);
      },
      mark(i, kind) {
        if (i < 0) return;
        lands[i].setAttribute('data-mark', kind);
        lands[i].parentNode.insertBefore(lands[i], ring);
      },
      // Tarile mici primesc un cerc, ca sa fie vazute.
      ringAround(i) {
        const b = lands[i].getBBox();
        if (Math.max(b.width, b.height) > region.w * 0.045) return;
        ring.setAttribute('cx', b.x + b.width / 2);
        ring.setAttribute('cy', b.y + b.height / 2);
        ring.setAttribute('r', Math.max(b.width, b.height) / 2 + region.w * 0.012);
      },
      showAll() { box = { x: 0, y: 0, w: region.w, h: region.h }; apply(); },
    };
  }

  // ---------- Lista continentelor ----------
  route(/^\/learning\/geografie$/, () => {
    const view = screen();
    view.innerHTML = `${back('#/learning', 'Învățat')}
      <div><h1 class="h1">Geografie</h1><p class="lead">Țările lumii, pe continente: unde sunt și care le sunt capitalele.</p></div>
      <section class="subjects">${regions().map((r) => {
        const shapes = r.countries;
        const caps = withCapital(r);
        return `<a class="subject-row" href="#/learning/geografie/${r.id}"><span><b>${esc(r.name)}</b><small>${allOf(r).length} de țări · pe hartă: ${known('map', shapes)} din ${shapes.length} · capitale: ${known('cap', caps)} din ${caps.length}</small></span><span class="arrow" aria-hidden="true">→</span></a>`;
      }).join('')}</section>
      <p class="journal-note">Hărțile sunt simplificate, iar țările foarte mici nu apar pe ele, ci doar la capitale. Date cartografice: Natural Earth, domeniu public. Granițele nu exprimă o poziție asupra teritoriilor disputate.</p>`;
  });

  // ---------- Un continent ----------
  route(/^\/learning\/geografie\/(europa|asia|africa|america-nord|america-sud|oceania)$/, (id) => {
    const r = byId(id);
    const view = screen();
    const home = `#/learning/geografie/${id}`;
    view.innerHTML = `${back('#/learning/geografie', 'Geografie')}
      <div><h1 class="h1">${esc(r.name)}</h1><p class="lead">Începe prin a explora harta, apoi verifică-te.</p></div>
      <section class="subjects">
        <a class="subject-row" href="${home}/explorare"><span><b>Explorează harta</b><small>Atinge o țară și află cum se numește și care îi este capitala</small></span><span class="arrow" aria-hidden="true">→</span></a>
        <a class="subject-row" href="${home}/harta"><span><b>Găsește pe hartă</b><small>${SESSION} țări pe serie · știi ${known('map', r.countries)} din ${r.countries.length}</small></span><span class="arrow" aria-hidden="true">→</span></a>
        <a class="subject-row" href="${home}/capitale"><span><b>Capitale</b><small>${SESSION} întrebări pe serie · știi ${known('cap', withCapital(r))} din ${withCapital(r).length}</small></span><span class="arrow" aria-hidden="true">→</span></a>
      </section>`;
  });

  // ---------- Explorare ----------
  route(/^\/learning\/geografie\/([\w-]+)\/explorare$/, (id) => {
    const r = byId(id);
    if (!r) { location.hash = '#/learning/geografie'; return; }
    const view = screen();
    view.innerHTML = `${back('#/learning/geografie/' + id, r.name)}
      <section class="geo-work"><div id="map"></div>
        <aside class="panel stack geo-side">
          <div id="info"><p class="kicker">Explorează</p><h1 class="geo-q">Atinge o țară</h1><p>Poți mări harta cu butoanele sau cu două degete.</p></div>
          <div class="geo-names">${r.countries.map((c, i) => `<button type="button" class="geo-name" data-i="${i}">${esc(c.n)}</button>`).join('')}</div>
          ${r.extra.length ? `<div><p class="kicker">Prea mici pentru hartă</p><ul class="geo-extra">${r.extra.map((c) => `<li><b>${esc(c.n)}</b> · ${esc(c.c)}</li>`).join('')}</ul></div>` : ''}
        </aside></section>`;
    const info = view.querySelector('#info');
    let map = null;
    const show = (i) => {
      const c = r.countries[i];
      map.clear();
      map.mark(i, 'on');
      map.ringAround(i);
      info.innerHTML = `<p class="kicker">Țara</p><h1 class="geo-q">${esc(c.n)}</h1><p>${c.c ? `Capitala: <b>${esc(c.c)}</b>` : 'Statutul capitalei este disputat.'}</p>`;
    };
    map = createMap(view.querySelector('#map'), r, { onPick: show });
    view.querySelector('.geo-names').addEventListener('click', (e) => {
      const b = e.target.closest('.geo-name');
      if (b) show(Number(b.dataset.i));
    });
  });

  function endOfRound(view, region, firstTry, total, missed, again) {
    const home = '#/learning/geografie/' + region.id;
    view.querySelector('.geo-work').outerHTML = `<section class="panel stack end-round">
        <p class="kicker">Serie încheiată</p>
        <h1 class="h1">${firstTry} din ${total} din prima</h1>
        ${missed.length ? `<p>De revăzut: ${missed.map((c) => `<b>${esc(c.n)}</b>`).join(', ')}.</p>` : '<p>Nicio greșeală în această serie.</p>'}
        <div class="chips"><button class="btn" type="button" id="again">Încă o serie</button><a class="btn ghost" href="${home}">Înapoi la ${esc(region.name)}</a></div>
      </section>`;
    view.querySelector('#again').addEventListener('click', again);
  }

  // ---------- Gaseste pe harta ----------
  route(/^\/learning\/geografie\/([\w-]+)\/harta$/, (id) => {
    const r = byId(id);
    if (!r) { location.hash = '#/learning/geografie'; return; }
    function begin() {
      const view = screen();
      view.innerHTML = `${back('#/learning/geografie/' + id, r.name)}
        <section class="geo-work"><div id="map"></div><aside class="panel stack geo-side" id="side"></aside></section>`;
      const side = view.querySelector('#side');
      const round = pickRound(r.countries, 'map');
      const total = round.length;
      const queue = round.slice();
      const missed = [];
      let firstTry = 0;
      let current = null;
      let open = false;
      const map = createMap(view.querySelector('#map'), r, { onPick });

      function ask() {
        current = queue.shift();
        open = true;
        map.clear();
        map.showAll();
        const repeat = missed.includes(current);
        side.innerHTML = `<p class="kicker">${repeat ? 'Din nou' : `Țara ${total - queue.length} din ${total}`}</p><h1 class="geo-q">${esc(current.n)}</h1><p>Atinge țara pe hartă.</p>`;
      }
      function onPick(i) {
        if (!open) return;
        open = false;
        const right = r.countries.indexOf(current);
        const ok = i === right;
        map.mark(right, 'ok');
        map.ringAround(right);
        if (!ok) map.mark(i, 'bad');
        const repeat = missed.includes(current);
        progress().map[current.n] = ok ? 1 : 0;
        save();
        if (ok && !repeat) firstTry++;
        if (!ok && !repeat) { missed.push(current); queue.push(current); }
        const capital = current.c ? ` Capitala: ${esc(current.c)}.` : '';
        const msg = ok ? `Corect.${capital}` : `Ai atins ${esc(r.countries[i].n)}. ${esc(current.n)} este marcată pe hartă.${capital}`;
        side.innerHTML = `<p class="kicker">${ok ? 'Corect' : 'Nu chiar'}</p><h1 class="geo-q">${esc(current.n)}</h1><p>${msg}</p>
          <div><button class="btn" type="button" id="next">${queue.length ? 'Următoarea' : 'Vezi rezultatul'}</button></div>`;
        side.querySelector('#next').addEventListener('click', () => {
          if (queue.length) ask();
          else endOfRound(view, r, firstTry, total, missed, begin);
        });
      }
      ask();
    }
    begin();
  });

  // ---------- Capitale ----------
  route(/^\/learning\/geografie\/([\w-]+)\/capitale$/, (id) => {
    const r = byId(id);
    if (!r) { location.hash = '#/learning/geografie'; return; }
    const pool = withCapital(r);
    function begin() {
      const view = screen();
      view.innerHTML = `${back('#/learning/geografie/' + id, r.name)}
        <section class="geo-work"><div id="map"></div><aside class="panel stack geo-side" id="side"></aside></section>`;
      const side = view.querySelector('#side');
      const round = pickRound(pool, 'cap');
      const total = round.length;
      const queue = round.slice();
      const missed = [];
      let firstTry = 0;
      const map = createMap(view.querySelector('#map'), r, { onPick: () => {} });

      function ask() {
        const current = queue.shift();
        const repeat = missed.includes(current);
        const others = shuffle(pool.filter((c) => c !== current && c.c !== current.c)).slice(0, 3);
        const opts = shuffle([current, ...others]);
        map.clear();
        const shape = r.countries.indexOf(current);
        if (shape >= 0) { map.mark(shape, 'on'); map.ringAround(shape); }
        side.innerHTML = `<p class="kicker">${repeat ? 'Din nou' : `Întrebarea ${total - queue.length} din ${total}`}</p>
          <h1 class="geo-q">${esc(current.n)}</h1><p>Care este capitala?</p>
          <div class="stack">${opts.map((o, i) => `<button type="button" class="pick" data-i="${i}">${esc(o.c)}</button>`).join('')}</div><div id="after"></div>`;
        side.querySelectorAll('.pick').forEach((b) => b.addEventListener('click', () => {
          const chosen = opts[Number(b.dataset.i)];
          const ok = chosen === current;
          side.querySelectorAll('.pick').forEach((x, i) => {
            x.disabled = true;
            if (opts[i] === current) x.classList.add('ok');
            else if (x === b) x.classList.add('bad');
          });
          progress().cap[current.n] = ok ? 1 : 0;
          save();
          if (ok && !repeat) firstTry++;
          if (!ok && !repeat) { missed.push(current); queue.push(current); }
          side.querySelector('#after').innerHTML = `<button class="btn" type="button" id="next">${queue.length ? 'Următoarea' : 'Vezi rezultatul'}</button>`;
          side.querySelector('#next').addEventListener('click', () => {
            if (queue.length) ask();
            else endOfRound(view, r, firstTry, total, missed, begin);
          });
        }));
      }
      ask();
    }
    begin();
  });

  window.Geography = { known };
})();
