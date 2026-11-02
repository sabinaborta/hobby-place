// Imparte textul unei carti in capitole. Fara dependente, ca sa poata fi testat separat.
(function () {
  const MAX_PART = 40000;

  function clean(text) {
    text = text.replace(/\r\n/g, '\n').replace(/^﻿/, '');
    const start = text.search(/\*\*\* ?START OF[^\n]*\n/i);
    if (start >= 0) text = text.slice(text.indexOf('\n', start) + 1);
    // Fisierele unite au mai multe marcaje: pastram textul, scoatem licenta dintre ele.
    text = text.replace(/\*\*\* ?END OF[\s\S]*?\*\*\* ?START OF[^\n]*\n/gi, '\n\n');
    const end = text.search(/\*\*\* ?END OF/i);
    if (end >= 0) text = text.slice(0, end);
    const oldTail = text.search(/\nEnd of (the )?(this )?Project Gutenberg/i);
    if (oldTail >= 0) text = text.slice(0, oldTail);
    // Antetul Project Gutenberg Australia se termina cu un al doilea rand Title/Author.
    const contact = text.indexOf('To contact Project Gutenberg of Australia');
    if (contact >= 0 && contact < 3000) {
      text = text.slice(contact).replace(/^.*\n\s*(Title:.*\n)?\s*(Author:.*\n)?/, '');
      text = text.replace(/\s*Project Gutenberg Australia\s*$/, '');
    }
    // Urme de tiparire din textele scanate: marcaje de ilustratii, cursive si note de transcriere.
    // Unele editii ascund titlul capitolului in marcajul ilustratiei; il pastram.
    text = text.replace(/\[Illustration[^\]]*?(chapter\s+[ivxlc\d]+\.?)[^\]]*\]/gi, '\n\n$1\n\n');
    text = text.replace(/\[Illustration[^\]]*\]/gi, '');
    text = text.replace(/\[\s*(Transcriber|Editor)[^\]]*\]/gi, '');
    text = text.replace(/^\s*(Produced by|E-text prepared by|HTML file produced)[^\n]*(\n[^\n]+)*\n*/gim, '');
    text = text.replace(/(?<!_)_(?!_)/g, '');
    text = text.replace(/\[Pg ?\d+\]|\{\d+\}/g, '');
    text = text.replace(/\n{3,}/g, '\n\n');
    return text.trim();
  }

  const WORDS = 'one|two|three|four|five|six|seven|eight|nine|ten|first|second|third|fourth|fifth|sixth|seventh|eighth|unu|doi|trei';
  const KEYWORD = new RegExp(`^[ \\t]*(chapter|capitolul|cap\\.|book|cartea|letter|act|actul|partea|part|stave|canto|scene|day)[ \\t]+(the[ \\t]+)?([\\divxlc]+|${WORDS})\\b[^\\n]*$`, 'gim');
  const ROMAN = /^[ \t]*[IVXLC]+\.?(?:[ \t]+[A-Z][A-Z ,'’\-.]*)?[ \t]*$/gm;

  function marks(text, re) {
    const out = [];
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) out.push({ at: m.index, end: m.index + m[0].length, title: m[0].replace(/\s+/g, ' ').trim() });
    return out;
  }

  // Cuprinsul de la inceput: multe titluri la cativa pasi unul de altul, inclusiv ultimul din lista.
  function dropContents(found) {
    let run = 0;
    while (run + 1 < found.length && found[run + 1].at - found[run].at < 300) run++;
    return run >= 2 ? found.slice(run + 1) : found;
  }

  function cut(text, found) {
    const out = [];
    if (found[0].at > 1500) out.push({ title: 'Început', body: text.slice(0, found[0].at).trim() });
    found.forEach((c, i) => {
      out.push({ title: c.title.slice(0, 70), body: text.slice(c.end, i + 1 < found.length ? found[i + 1].at : text.length).trim() });
    });
    // Titlurile din cuprins si cele din "Book I / Chapter I" nu au text propriu.
    return out.filter((c) => c.body.length >= 150);
  }

  function divide(chapter) {
    if (chapter.body.length <= MAX_PART) return [chapter];
    const out = [];
    let cur = '';
    chapter.body.split(/\n\s*\n/).forEach((p) => {
      cur += p + '\n\n';
      if (cur.length > MAX_PART * 0.8) { out.push(cur.trim()); cur = ''; }
    });
    if (cur.trim()) out.push(cur.trim());
    if (out.length === 1) return [chapter];
    return out.map((body, i) => ({ title: chapter.title === 'Partea' ? `Partea ${i + 1}` : `${chapter.title} (${i + 1}/${out.length})`, body }));
  }

  function splitChapters(raw) {
    const text = clean(raw);
    let chapters = null;
    if (/^@@ /m.test(text)) {
      chapters = text.split(/^@@ /m).filter((s) => s.trim()).map((s) => {
        const nl = s.indexOf('\n');
        return { title: s.slice(0, nl).trim(), body: s.slice(nl + 1).trim() };
      });
    } else {
      for (const re of [KEYWORD, ROMAN]) {
        const found = dropContents(marks(text, re));
        if (found.length >= 3) {
          const c = cut(text, found);
          // Sute de bucati foarte scurte (strofe numerotate) nu sunt capitole.
          const tiny = c.length > 80 && text.length / c.length < 1500;
          if (c.length >= 3 && !tiny) { chapters = c; break; }
        }
      }
    }
    if (!chapters) chapters = [{ title: 'Partea', body: text }];
    const parts = chapters.flatMap(divide);
    if (parts.length === 1) parts[0].title = 'Text';
    return parts;
  }

  window.splitChapters = splitChapters;
})();
