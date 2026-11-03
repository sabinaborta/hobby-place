// Nucleu: progres salvat, rutare, antet, dialoguri.
(function () {
  const KEY = 'hobbyplace.v1';
  const defaults = { points: 0, recent: [], scores: {}, books: {}, games: {}, coloring: {}, nonoDone: {} };

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  const state = Object.assign({}, defaults, load());

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* mod privat: progresul ramane doar in sesiune */ }
  }

  function esc(v) {
    return String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove('show'), 2200);
  }

  function addPoints(n) {
    state.points += n;
    save();
    const c = document.getElementById('coin-val');
    if (c) c.textContent = state.points;
  }

  // Ce apare la "Continuă de unde ai rămas".
  function touch(item) {
    state.recent = [item].concat(state.recent.filter((r) => r.id !== item.id)).slice(0, 5);
    save();
  }
  function forget(id) {
    state.recent = state.recent.filter((r) => r.id !== id);
    save();
  }

  // Stilul serios nu mai are confetti; apelurile din jocuri raman inofensive.
  function confetti() {}

  // actions: [{label, href?, onClick?, ghost?}]
  function dialog(title, text, actions) {
    const d = document.createElement('dialog');
    d.innerHTML = `<h2>${esc(title)}</h2><p style="font-weight:700">${esc(text)}</p><div class="dlg-actions"></div>`;
    const box = d.querySelector('.dlg-actions');
    actions.forEach((a) => {
      const b = document.createElement(a.href ? 'a' : 'button');
      b.className = 'btn' + (a.ghost ? ' ghost' : '');
      b.textContent = a.label;
      if (a.href) b.href = a.href; else b.type = 'button';
      b.addEventListener('click', () => { d.close(); if (a.onClick) a.onClick(); });
      box.appendChild(b);
    });
    d.addEventListener('close', () => d.remove());
    document.body.appendChild(d);
    d.showModal();
    return d;
  }

  function fmtTime(s) {
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  const routes = [];
  let cleanup = null;

  function route(pattern, fn) { routes.push([pattern, fn]); }
  function onLeave(fn) { cleanup = fn; }

  const sections = [['Acasă', '#/', 'home'], ['Citit', '#/citit', 'citit'], ['Hobby', '#/hobby', 'hobby'], ['Învățat', '#/learning', 'learning']];

  function header(active) {
    const tabs = sections.map(([label, href, id]) =>
      `<a class="tab${id === active ? ' on' : ''}" href="${href}"${id === active ? ' aria-current="page"' : ''}>${label}</a>`).join('');
    return `<header class="nav">
      <a class="logo" href="#/">Hobby Place</a>
      <nav class="chips" aria-label="Secțiuni">${tabs}</nav>
    </header>`;
  }

  const backIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14172B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"></path></svg>';

  // Afiseaza o pagina: returneaza containerul de continut.
  function mount(opts) {
    document.body.dataset.theme = opts.theme || '';
    const app = document.getElementById('app');
    app.innerHTML = `<div class="page${opts.narrow ? ' narrow' : ''}">${opts.noHeader ? '' : header(opts.section)}<div class="stack" id="view" style="gap:26px"></div></div>`;
    window.scrollTo(0, 0);
    return document.getElementById('view');
  }

  function render() {
    if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
    const path = (location.hash || '#/').slice(1) || '/';
    for (const [re, fn] of routes) {
      const m = path.match(re);
      if (m) { fn.apply(null, m.slice(1).map(decodeURIComponent)); return; }
    }
    location.hash = '#/';
  }

  function start() {
    window.addEventListener('hashchange', render);
    render();
  }

  window.HP = { state, save, esc, toast, addPoints, touch, forget, confetti, dialog, fmtTime, route, onLeave, mount, start, backIcon, render };
})();
