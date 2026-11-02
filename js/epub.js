// Citeste un fisier EPUB ales de utilizator, direct in browser, fara a-l trimite nicaieri.
(function () {
  async function unzip(buffer) {
    const view = new DataView(buffer);
    let end = buffer.byteLength - 22;
    while (end >= 0 && view.getUint32(end, true) !== 0x06054b50) end--;
    if (end < 0) throw new Error('Nu este un fișier EPUB valid.');
    const count = view.getUint16(end + 10, true);
    let p = view.getUint32(end + 16, true);
    const entries = {};
    const dec = new TextDecoder();
    for (let i = 0; i < count; i++) {
      if (view.getUint32(p, true) !== 0x02014b50) break;
      const method = view.getUint16(p + 10, true);
      const size = view.getUint32(p + 20, true);
      const nameLen = view.getUint16(p + 28, true);
      const extraLen = view.getUint16(p + 30, true);
      const commentLen = view.getUint16(p + 32, true);
      const local = view.getUint32(p + 42, true);
      const name = dec.decode(new Uint8Array(buffer, p + 46, nameLen));
      entries[name] = { method, size, local };
      p += 46 + nameLen + extraLen + commentLen;
    }
    return {
      names: Object.keys(entries),
      async text(name) {
        const e = entries[name];
        if (!e) return null;
        const start = e.local + 30 + view.getUint16(e.local + 26, true) + view.getUint16(e.local + 28, true);
        const raw = new Uint8Array(buffer, start, e.size);
        if (e.method === 0) return dec.decode(raw);
        const stream = new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
        return dec.decode(await new Response(stream).arrayBuffer());
      },
    };
  }

  function resolve(base, href) {
    const parts = (base + decodeURIComponent(href.split('#')[0])).split('/');
    const out = [];
    parts.forEach((x) => {
      if (x === '..') out.pop();
      else if (x !== '.' && x !== '') out.push(x);
    });
    return out.join('/');
  }

  const BLOCKS = 'h1,h2,h3,h4,h5,p,li,blockquote';

  function chapterText(doc) {
    const nodes = [...doc.querySelectorAll(BLOCKS)].filter((el) => !(el.parentElement && el.parentElement.closest('li,blockquote')));
    const lines = nodes.map((el) => el.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean);
    return lines.length ? lines.join('\n\n') : (doc.body ? doc.body.textContent.replace(/\s+/g, ' ').trim() : '');
  }

  async function readEpub(file) {
    const zip = await unzip(await file.arrayBuffer());
    const parser = new DOMParser();
    const container = await zip.text('META-INF/container.xml');
    if (!container) throw new Error('Nu este un fișier EPUB valid.');
    const opfPath = parser.parseFromString(container, 'application/xml').querySelector('rootfile').getAttribute('full-path');
    const opf = parser.parseFromString(await zip.text(opfPath), 'application/xml');
    const base = opfPath.includes('/') ? opfPath.slice(0, opfPath.lastIndexOf('/') + 1) : '';
    const manifest = {};
    opf.querySelectorAll('manifest > item').forEach((it) => { manifest[it.getAttribute('id')] = it.getAttribute('href'); });
    const titleEl = opf.getElementsByTagNameNS('*', 'title')[0];
    const title = (titleEl && titleEl.textContent.trim()) || file.name.replace(/\.epub$/i, '');
    const chapters = [];
    for (const ref of opf.querySelectorAll('spine > itemref')) {
      const href = manifest[ref.getAttribute('idref')];
      if (!href) continue;
      const html = await zip.text(resolve(base, href));
      if (!html) continue;
      const doc = parser.parseFromString(html, 'text/html');
      const text = chapterText(doc);
      if (text.length < 200) continue;
      const head = doc.querySelector('h1,h2,h3');
      const name = head && head.textContent.replace(/\s+/g, ' ').trim();
      chapters.push({ title: (name || `Partea ${chapters.length + 1}`).slice(0, 80), text });
    }
    if (!chapters.length) throw new Error('Nu am găsit text în acest EPUB.');
    return { title, chapters };
  }

  window.readEpub = readEpub;
})();
