// Matematica pe clase: intrebari generate, cu raspunsul calculat.
(function () {
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const num = (n) => String(n).replace('-', '−');
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶' };
  const signed = (n) => (n < 0 ? '− ' + -n : '+ ' + n);
  const comb = (n, k) => {
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
    return r;
  };

  // Fiecare generator da {q, a} si, optional, w (variante gresite plauzibile).
  const T = [
    [5, 'operatii', 'Ordinea operațiilor', () => {
      const a = rnd(2, 12), b = rnd(2, 12), c = rnd(2, 40);
      return { q: `Cât face ${a} × ${b} + ${c}?`, a: a * b + c, w: [a * (b + c), a + b + c] };
    }],
    [5, 'fractii', 'Adunarea fracțiilor', () => {
      const n = rnd(5, 15), a = rnd(1, n - 2), b = rnd(1, n - a - 1);
      return { q: `Cât face ${a}/${n} + ${b}/${n}?`, a: `${a + b}/${n}`, w: [`${a + b}/${2 * n}`, `${a * b}/${n}`, `${a + b + 1}/${n}`, `${a + b - 1}/${n}`] };
    }],
    [6, 'procente', 'Procente', () => {
      const p = pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]), n = 20 * rnd(1, 20);
      return { q: `Cât înseamnă ${p}% din ${n}?`, a: (p * n) / 100, w: [(p * n) / 10, n - (p * n) / 100] };
    }],
    [6, 'proportii', 'Proporții', () => {
      const k = rnd(2, 9), b = rnd(2, 12), d = b * k, a = rnd(1, 12);
      return { q: `Află x din proporția ${a}/${b} = x/${d}.`, a: a * k, w: [a + k, d - b + a] };
    }],
    [7, 'ecuatii', 'Ecuații de gradul I', () => {
      const a = rnd(2, 9), x = rnd(-9, 12), b = rnd(1, 20);
      return { q: `Rezolvă: ${a}x ${signed(b)} = ${num(a * x + b)}. Cât este x?`, a: x, w: [x + a, -x] };
    }],
    [7, 'pitagora', 'Teorema lui Pitagora', () => {
      const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), k = rnd(1, 3);
      return { q: `Un triunghi dreptunghic are catetele ${p * k} și ${q * k}. Cât este ipotenuza?`, a: r * k, w: [(p + q) * k, r * k + 1] };
    }],
    [8, 'calcul', 'Formule de calcul', () => {
      const x = rnd(1, 9), a = rnd(1, 9);
      return { q: `Pentru x = ${x}, cât este (x + ${a})²?`, a: (x + a) ** 2, w: [x * x + a * a, x * x + a] };
    }],
    [8, 'sisteme', 'Sisteme de ecuații', () => {
      const x = rnd(2, 15), y = rnd(1, 15);
      return { q: `Dacă x + y = ${x + y} și x − y = ${num(x - y)}, cât este x?`, a: x, w: [y, x + y] };
    }],
    [9, 'functie', 'Funcția de gradul I', () => {
      const a = rnd(2, 9) * pick([1, -1]), b = rnd(-9, 9), k = rnd(-5, 6);
      const bText = b === 0 ? '' : ' ' + signed(b);
      return { q: `Fie f(x) = ${num(a)}x${bText}. Cât este f(${num(k)})?`, a: a * k + b, w: [a + k + b, a * k - b] };
    }],
    [9, 'progresii', 'Progresii aritmetice', () => {
      const a1 = rnd(1, 12), r = rnd(2, 8), n = rnd(4, 12);
      return { q: `Într-o progresie aritmetică, a₁ = ${a1} și rația r = ${r}. Cât este termenul al ${n}-lea?`, a: a1 + (n - 1) * r, w: [a1 + n * r, a1 * n] };
    }],
    [10, 'logaritmi', 'Logaritmi', () => {
      const b = pick([2, 3, 5, 10]), k = rnd(1, b === 2 ? 8 : 4);
      return { q: `Cât este log în baza ${b} din ${b ** k}?`, a: k, w: [k + 1, b] };
    }],
    [10, 'combinari', 'Combinări', () => {
      const n = rnd(4, 9), k = rnd(2, n - 2);
      return { q: `Câte moduri există de a alege ${k} obiecte din ${n}? (combinări de ${n} luate câte ${k})`, a: comb(n, k), w: [comb(n, k) + n, n * k] };
    }],
    [11, 'determinanti', 'Determinanți 2 × 2', () => {
      const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9), d = rnd(1, 9);
      return { q: `Calculează determinantul matricei cu liniile (${a}, ${b}) și (${c}, ${d}).`, a: a * d - b * c, w: [a * d + b * c, a * b - c * d] };
    }],
    [11, 'derivate', 'Derivate', () => {
      const a = rnd(2, 6), n = rnd(2, 4), k = rnd(1, 3);
      return { q: `Fie f(x) = ${a}x${SUP[n]}. Cât este f′(${k})?`, a: a * n * k ** (n - 1), w: [a * k ** n, a * n * k ** n] };
    }],
    [12, 'primitive', 'Primitive', () => {
      const n = rnd(1, 4), k = rnd(2, 6), a = k * (n + 1);
      const xp = (m) => (m === 1 ? 'x' : 'x' + SUP[m]);
      return {
        q: `Care este o primitivă a funcției f(x) = ${a}${xp(n)}?`,
        a: `${k}${xp(n + 1)} + C`,
        w: [`${a}${xp(n + 1)} + C`, `${k}${xp(n)} + C`, `${a * n}${n === 1 ? '' : xp(n - 1)} + C`],
      };
    }],
    [12, 'integrale', 'Integrale definite', () => {
      const a = 2 * rnd(1, 5), b = rnd(0, 6), k = rnd(1, 5);
      const f = b ? `${a}x + ${b}` : `${a}x`;
      return { q: `Calculează integrala de la 0 la ${k} din (${f}) dx.`, a: (a * k * k) / 2 + b * k, w: [a * k + b, a * k * k + b * k] };
    }],
  ];

  function question(gen) {
    const raw = gen();
    const isText = typeof raw.a === 'string';
    const answer = isText ? raw.a : num(raw.a);
    const seen = new Set([answer]);
    const opts = [answer];
    (raw.w || []).forEach((w) => {
      const s = isText ? w : num(w);
      if (!seen.has(s) && opts.length < 4) { seen.add(s); opts.push(s); }
    });
    // Completeaza cu valori apropiate daca variantele gresite s-au suprapus.
    let d = 1;
    while (opts.length < 4 && !isText) {
      [raw.a + d, raw.a - d].forEach((v) => {
        const s = num(v);
        if (!seen.has(s) && opts.length < 4) { seen.add(s); opts.push(s); }
      });
      d++;
    }
    return { q: raw.q, a: answer, opts };
  }

  function makeQuestions(topic, n) {
    const out = [];
    const seen = new Set();
    for (let t = 0; t < 200 && out.length < n; t++) {
      const q = question(topic.gen);
      if (!seen.has(q.q)) { seen.add(q.q); out.push(q); }
    }
    return out;
  }

  window.MATH_TOPICS = T.map(([grade, id, title, gen]) => ({ id: 'm' + grade + '-' + id, grade, title, gen }));
  window.MATH_GRADES = [5, 6, 7, 8, 9, 10, 11, 12];
  window.makeMathQuestions = makeQuestions;
})();
