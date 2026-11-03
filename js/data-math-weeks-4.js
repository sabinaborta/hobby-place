// Matematica, saptamanile 18-25: Faza 5, statistica, din planul tau.
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const f = (html) => `<p class="formula">${html}</p>`;
  const BAREM = '5 puncte pentru metodă corectă și 5 puncte pentru rezultat, la fiecare problemă.';
  const INSTR = 'Zece probleme, câte 10 puncte fiecare, total 100 de puncte. Poți folosi calculatorul, dar nu lecțiile. Corectează apoi cu rezolvările.';
  const BIG = 'Testul mare al fazei. Douăsprezece probleme, cu punctaj egal. Poți folosi calculatorul. Sub 70% mai faci o săptămână de consolidare.';
  const P5 = 'Faza 5 · Statistică';
  const ADV = 'Refă exemplele pe hârtie, cu calculatorul alături. La fiecare rezultat, întreabă-te ce înseamnă în cuvinte.';
  const Z = table(['z', '1', '1,645', '1,96', '2', '2,576'], [['Φ(z) = P(Z ≤ z)', '0,8413', '0,95', '0,975', '0,9772', '0,995']]);
  const ex = (a, b, c) => ({ n: 3, kind: 'exercises', minutes: 60, title: 'Exerciții (ușor → provocator)', tiers: [
    { title: 'Treapta A – Încălzire', items: a }, { title: 'Treapta B – Aplicații', items: b }, { title: 'Treapta C – Provocări', items: c },
  ] });
  const test = (problems) => ({ n: 4, kind: 'test', minutes: 45, title: 'Test cronometrat și corectare', test: { minutes: 30, instr: INSTR, barem: BAREM, problems } });
  const big = (title, problems) => ({ n: 5, kind: 'test', minutes: 120, title, test: { minutes: 90, instr: BIG, barem: BAREM, problems } });

  window.MATH_WEEK18 = {
    id: 's18', short: 'Săptămâna 18', title: 'Săptămâna 18: Probabilități și teorema lui Bayes', phase: P5,
    tagline: 'Începutul Fazei 5: probabilități condiționate, independență, Bayes',
    lead: 'Prima săptămână de statistică: reguli de probabilitate, probabilități condiționate și teorema lui Bayes.',
    advice: ADV + ' La Bayes, ajută să gândești cu 1000 de persoane imaginare.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 45, title: 'Reguli de bază', html: `<h2>Reguli</h2>
${f('P(non A) = 1 − P(A)')}
${f('P(A ∪ B) = P(A) + P(B) − P(A ∩ B)')}
<div class="worked"><b>Exemplu 1.</b> P(A) = 0,5, P(B) = 0,4, P(A ∩ B) = 0,2. Atunci P(A ∪ B) = 0,7.</div>
<h2>Probabilitate condiționată</h2>
${f('P(A | B) = P(A ∩ B) / P(B)')}
<div class="worked"><b>Exemplu 2.</b> Două monede, cel puțin o stemă. Cazurile rămase sunt SS, SB, BS, deci P(două steme) = 1/3.</div>
<h2>Independență</h2>
<p>A și B sunt independente dacă P(A ∩ B) = P(A) · P(B). Atunci P(A | B) = P(A).</p>
<div class="worked"><b>Exemplu 3.</b> Cel puțin un 6 la 4 zaruri: 1 − (5/6)⁴ = 671/1296 ≈ 0,518.</div>` },
      { n: 2, kind: 'lesson', minutes: 50, title: 'Probabilitate totală și Bayes', html: `<h2>Probabilitatea totală</h2>
${f('P(A) = P(A | B) P(B) + P(A | non B) P(non B)')}
<div class="worked"><b>Exemplu 1.</b> Mașina M₁ face 60% din piese, cu 1% defecte. M₂ face 40%, cu 2% defecte. P(defect) = 0,006 + 0,008 = 0,014.</div>
<h2>Teorema lui Bayes</h2>
${f('P(B | A) = P(A | B) P(B) / P(A)')}
<div class="worked"><b>Exemplu 2.</b> Piesa este defectă. P(M₂ | defect) = 0,008 / 0,014 = 4/7.</div>
<h2>Teste medicale</h2>
<div class="worked"><b>Exemplu 3.</b> Boala are prevalența 1%, testul găsește 90% din bolnavi și are 5% rezultate fals pozitive. P(+) = 0,009 + 0,0495 = 0,0585. P(boală | +) = 0,009 / 0,0585 ≈ 15,4%.</div>
<p>Un test bun poate da multe alarme false dacă boala este rară.</p>` },
      ex([
        [1, 'P(A) = 0,4. Află P(non A).', '<b>0,6</b>.'],
        [2, 'P(A) = 0,5, P(B) = 0,4, P(A ∩ B) = 0,2. Află P(A ∪ B).', '<b>0,7</b>.'],
        [3, 'Pentru aceleași date, află P(A | B).', '0,2 / 0,4 = <b>0,5</b>.'],
        [4, 'Sunt A și B independente?', '0,5 · 0,4 = 0,2: <b>da</b>.'],
      ], [
        [5, 'Două monede, cel puțin o stemă. Probabilitatea a două steme.', '<b>1/3</b>.'],
        [6, 'M₁ face 60% (1% defecte), M₂ face 40% (2% defecte). Află P(defect).', '<b>0,014</b>.'],
        [7, 'Piesa este defectă. Află P(M₂ | defect).', '<b>4/7</b>.'],
        [8, 'Două zaruri, primul arată 3. Probabilitatea sumei 8.', 'Al doilea trebuie să fie 5: <b>1/6</b>.'],
      ], [
        [9, 'Prevalență 1%, sensibilitate 90%, fals pozitive 5%. Află P(boală | +).', '<b>≈ 15,4%</b>.'],
        [10, 'Probabilitatea a cel puțin un 6 la 4 zaruri.', '<b>≈ 0,518</b>.'],
        [11, 'U₁ are 3 bile roșii și 1 albastră, U₂ are 1 roșie și 3 albastre. Alegi la întâmplare o urnă și scoți o bilă roșie. Probabilitatea să fie din U₁.', '(3/8) / (1/2) = <b>3/4</b>.'],
        [12, 'A și B independente, P(A) = 0,3, P(B) = 0,5. Află P(A ∪ B).', '0,8 − 0,15 = <b>0,65</b>.'],
      ]),
      test([
        ['P(A) = 0,7. Află P(non A).', '0,3', '1 − 0,7'],
        ['P(A) = 0,6, P(B) = 0,5, P(A ∩ B) = 0,3. Află P(A ∪ B).', '0,8', '0,6 + 0,5 − 0,3'],
        ['Pentru aceleași date, află P(A | B).', '0,6', '0,3 / 0,5'],
        ['A și B independente, P(A) = 0,4, P(B) = 0,5. Află P(A ∩ B).', '0,2', 'Produsul'],
        ['P(A ∩ B) = 0,1, P(A) = 0,4. Află P(B | A).', '0,25', '0,1 / 0,4'],
        ['Mergi 70% cu autobuzul (întârzie 10%) și 30% cu trenul (întârzie 20%). Află P(întârziere).', '0,13', '0,07 + 0,06'],
        ['Ai întârziat. Probabilitatea să fi fost cu trenul.', '6/13', '0,06 / 0,13'],
        ['Două zaruri: primul 6 și al doilea par.', '1/12', '(1/6)(1/2)'],
        ['O familie are doi copii, cel puțin o fată. Probabilitatea a două fete.', '1/3', 'FF, FB, BF'],
        ['Prevalență 2%, sensibilitate 95%, fals pozitive 10%. Află P(boală | +).', '≈ 16%', '0,019 / 0,117'],
      ]),
    ],
  };

  window.MATH_WEEK19 = {
    id: 's19', short: 'Săptămâna 19', title: 'Săptămâna 19: Variabile aleatoare discrete', phase: P5,
    tagline: 'Medie, varianță, distribuțiile binomială, geometrică, Poisson',
    lead: 'Descrii rezultate numerice aleatoare cu media și varianța lor și înveți distribuțiile discrete uzuale.',
    advice: ADV,
    sessions: [
      { n: 1, kind: 'lesson', minutes: 45, title: 'Medie și varianță', html: `<h2>Media</h2>
${f('E[X] = Σ x · P(X = x)')}
<div class="worked"><b>Exemplu 1.</b> La zar, E[X] = (1 + 2 + … + 6) / 6 = 3,5.</div>
<h2>Varianța</h2>
${f('Var(X) = E[X²] − (E[X])²')}
<div class="worked"><b>Exemplu 2.</b> X ia valorile 1, 2, 3 cu 0,2; 0,5; 0,3. E[X] = 2,1, E[X²] = 4,9, Var(X) = 4,9 − 4,41 = 0,49.</div>
<h2>Proprietăți</h2>
${table(['Regulă', 'Formulă'], [['Media transformării', 'E[aX + b] = aE[X] + b'], ['Varianța transformării', 'Var(aX + b) = a²Var(X)'], ['Media sumei', 'E[X + Y] = E[X] + E[Y]'], ['X, Y independente', 'Var(X ± Y) = Var(X) + Var(Y)']])}
<p>Abaterea standard este rădăcina varianței.</p>` },
      { n: 2, kind: 'lesson', minutes: 50, title: 'Distribuții discrete', html: `${table(['Distribuție', 'Când apare', 'P(X = k)', 'Medie', 'Varianță'], [['Bernoulli(p)', 'o încercare', 'p sau 1 − p', 'p', 'p(1 − p)'], ['Binomială(n, p)', 'succese din n încercări', 'Cₙᵏ pᵏ (1 − p)ⁿ⁻ᵏ', 'np', 'np(1 − p)'], ['Geometrică(p)', 'încercări până la primul succes', '(1 − p)ᵏ⁻¹ p', '1/p', '(1 − p)/p²'], ['Poisson(λ)', 'evenimente rare într-un interval', 'e⁻λ λᵏ / k!', 'λ', 'λ']])}
<div class="worked"><b>Exemplu 1.</b> Binomială(4; 0,5): P(X = 2) = 6 · (1/16) = 3/8.</div>
<div class="worked"><b>Exemplu 2.</b> Binomială(5; 0,2): P(cel puțin un succes) = 1 − 0,8⁵ ≈ 0,672.</div>
<div class="worked"><b>Exemplu 3.</b> Poisson(2): P(X = 0) = e⁻² ≈ 0,135.</div>` },
      ex([
        [1, 'Află media unui zar.', '<b>3,5</b>.'],
        [2, 'X ia 0 și 1, cu 0,7 și 0,3. Află E[X].', '<b>0,3</b>.'],
        [3, 'Află varianța lui X de mai sus.', '0,3 · 0,7 = <b>0,21</b>.'],
        [4, 'E[X] = 4. Află E[2X + 3].', '<b>11</b>.'],
      ], [
        [5, 'Var(X) = 4. Află Var(2X + 3).', '4 · 4 = <b>16</b>.'],
        [6, 'Binomială(10; 0,5). Află media și varianța.', '<b>5 și 2,5</b>.'],
        [7, 'Binomială(4; 0,5). Află P(X = 2).', '<b>3/8</b>.'],
        [8, 'Poisson(2). Află P(X = 0).', '<b>≈ 0,135</b>.'],
      ], [
        [9, 'X ia 1, 2, 3 cu 0,2; 0,5; 0,3. Află varianța.', '<b>0,49</b>.'],
        [10, 'Geometrică(0,2). Câte încercări sunt în medie?', '<b>5</b>.'],
        [11, 'Binomială(5; 0,2). Află P(cel puțin un succes).', '<b>≈ 0,672</b>.'],
        [12, 'X, Y independente, Var 2 și 3. Află Var(X − Y).', '<b>5</b>.'],
      ]),
      test([
        ['X ia 0 și 10, fiecare cu 0,5. Află E[X].', '5', '(0 + 10) / 2'],
        ['X ia 1 și 2, cu 0,4 și 0,6. Află E[X].', '1,6', '0,4 + 1,2'],
        ['Află varianța lui X de mai sus.', '0,24', '2,8 − 2,56'],
        ['E[X] = 2. Află E[3X − 1].', '5', '6 − 1'],
        ['Var(X) = 2. Află Var(3X − 1).', '18', '9 · 2'],
        ['Binomială(20; 0,1). Află media și varianța.', '2 și 1,8', 'np și np(1 − p)'],
        ['Binomială(3; 0,5). Află P(X = 2).', '3/8', '3 · 1/8'],
        ['Poisson(3). Află media și varianța.', '3 și 3', 'Ambele sunt λ'],
        ['Poisson(1). Află P(X = 1).', '≈ 0,368', 'e⁻¹'],
        ['X, Y independente, Var 4 și 5. Află abaterea standard a sumei.', '3', '√9'],
      ]),
    ],
  };

  window.MATH_WEEK20 = {
    id: 's20', short: 'Săptămâna 20', title: 'Săptămâna 20: Distribuții continue și distribuția normală', phase: P5,
    tagline: 'Densitate, uniformă, exponențială, normală, standardizare',
    lead: 'Lucrezi cu variabile continue și înveți să calculezi probabilități cu distribuția normală.',
    advice: ADV + ' Desenează clopotul și hașurează zona căutată înainte să calculezi.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 45, title: 'Densitate de probabilitate', html: `<h2>Densitatea</h2>
<p>P(a ≤ X ≤ b) este aria de sub densitatea f, între a și b. Aria totală este 1.</p>
${f('E[X] = ∫ x f(x) dx &emsp; Var(X) = E[X²] − (E[X])²')}
<div class="worked"><b>Exemplu 1.</b> f(x) = 2x pe [0, 1]. E[X] = ∫₀¹ 2x² dx = 2/3.</div>
<div class="worked"><b>Exemplu 2.</b> f(x) = cx² pe [0, 3]. Aria este 9c = 1, deci c = 1/9.</div>
${table(['Distribuție', 'Densitate', 'Medie', 'Varianță'], [['Uniformă pe [a, b]', '1/(b − a)', '(a + b)/2', '(b − a)²/12'], ['Exponențială(λ)', 'λe^(−λx), x ≥ 0', '1/λ', '1/λ²']])}
<div class="worked"><b>Exemplu 3.</b> Exponențială(2): P(X &gt; 1) = e⁻² ≈ 0,135.</div>` },
      { n: 2, kind: 'lesson', minutes: 50, title: 'Distribuția normală', html: `<h2>Standardizarea</h2>
<p>Dacă X este normală cu media μ și abaterea σ, atunci:</p>
${f('Z = (X − μ) / σ')}
<p>Z are media 0 și abaterea 1. Valorile le citești din tabel.</p>
${Z}
<p>P(Z &gt; z) = 1 − Φ(z) și P(Z ≤ −z) = 1 − Φ(z).</p>
<h2>Regula 68–95–99,7</h2>
<p>Aproximativ 68% din valori sunt la cel mult σ de medie, 95% la cel mult 2σ și 99,7% la cel mult 3σ.</p>
<div class="worked"><b>Exemplu 1.</b> X normală cu μ = 100, σ = 15. P(X &gt; 130): z = 2, deci 1 − 0,9772 = 0,0228.</div>
<div class="worked"><b>Exemplu 2.</b> μ = 50, σ = 10. P(40 ≤ X ≤ 60) = 2 · 0,8413 − 1 = 0,6826.</div>
<div class="worked"><b>Exemplu 3.</b> μ = 60, σ = 10. Percentila 95 este 60 + 1,645 · 10 = 76,45.</div>` },
      ex([
        [1, 'Uniformă pe [0, 10]. Află P(X ≤ 3).', '<b>0,3</b>.'],
        [2, 'Uniformă pe [2, 8]. Află media.', '<b>5</b>.'],
        [3, 'Uniformă pe [0, 12]. Află varianța.', '144 / 12 = <b>12</b>.'],
        [4, 'μ = 100, σ = 15. Află z pentru x = 130.', '<b>2</b>.'],
      ], [
        [5, 'Află P(Z ≤ 1).', '<b>0,8413</b>.'],
        [6, 'Află P(Z > 1).', '<b>0,1587</b>.'],
        [7, 'f(x) = 2x pe [0, 1]. Află media.', '<b>2/3</b>.'],
        [8, 'Exponențială(2). Află media și P(X > 1).', '<b>0,5 și ≈ 0,135</b>.'],
      ], [
        [9, 'μ = 50, σ = 10. Află P(40 ≤ X ≤ 60).', '<b>0,6826</b>.'],
        [10, 'μ = 100, σ = 15. Află P(X > 130).', '<b>0,0228</b>.'],
        [11, 'f(x) = cx² pe [0, 3]. Află c.', '<b>1/9</b>.'],
        [12, 'μ = 60, σ = 10. Află percentila 95.', '<b>76,45</b>.'],
      ]),
      test([
        ['Uniformă pe [0, 4]. Află P(1 ≤ X ≤ 3).', '0,5', '2 / 4'],
        ['Uniformă pe [0, 20]. Află media.', '10', '(0 + 20) / 2'],
        ['Uniformă pe [0, 6]. Află varianța.', '3', '36 / 12'],
        ['μ = 70, σ = 5. Află z pentru x = 80.', '2', '10 / 5'],
        ['Află P(Z ≤ 2).', '0,9772', 'Din tabel'],
        ['Află P(Z > 2).', '0,0228', '1 − 0,9772'],
        ['Află P(−1 ≤ Z ≤ 1).', '0,6826', '2 · 0,8413 − 1'],
        ['f(x) = 3x² pe [0, 1]. Află media.', '3/4', '∫₀¹ 3x³ dx'],
        ['Exponențială(1/2). Află media.', '2', '1/λ'],
        ['Află P(−1,96 ≤ Z ≤ 1,96).', '0,95', '2 · 0,975 − 1'],
      ]),
    ],
  };

  window.MATH_WEEK21 = {
    id: 's21', short: 'Săptămâna 21', title: 'Săptămâna 21: Teorema limită centrală și estimare', phase: P5,
    tagline: 'Media eșantionului, eroarea standard, intervale de încredere',
    lead: 'Afli cât de precisă este o medie calculată pe un eșantion și construiești intervale de încredere.',
    advice: ADV + ' Nu confunda σ, împrăștierea datelor, cu σ/√n, împrăștierea mediei.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 45, title: 'Media eșantionului și TLC', html: `<h2>Statistici de eșantion</h2>
${f('x̄ = Σxᵢ / n &emsp; s² = Σ(xᵢ − x̄)² / (n − 1)')}
<div class="worked"><b>Exemplu 1.</b> Pentru 2, 4, 6, 8: x̄ = 5 și s² = (9 + 1 + 1 + 9) / 3 ≈ 6,67.</div>
<p>Împărțim la n − 1 ca estimatorul varianței să nu fie deplasat: în medie dă exact σ².</p>
<h2>Legea numerelor mari</h2>
<p>Pe măsură ce n crește, x̄ se apropie de media reală μ.</p>
<h2>Teorema limită centrală</h2>
<p>Pentru n suficient de mare, media eșantionului este aproximativ normală, indiferent de forma datelor.</p>
${f('x̄ ~ N(μ, σ²/n), &emsp; SE = σ / √n')}
<div class="worked"><b>Exemplu 2.</b> μ = 100, σ = 20, n = 100. SE = 2. P(x̄ &gt; 104) = P(Z &gt; 2) = 0,0228.</div>
<p>Dacă vrei SE de două ori mai mică, ai nevoie de un eșantion de patru ori mai mare.</p>` },
      { n: 2, kind: 'lesson', minutes: 50, title: 'Intervale de încredere', html: `<h2>Pentru medie</h2>
${f('x̄ ± z · σ / √n')}
${table(['Nivel', '90%', '95%', '99%'], [['z', '1,645', '1,96', '2,576']])}
<div class="worked"><b>Exemplu 1.</b> x̄ = 50, σ = 10, n = 100, 95%: 50 ± 1,96, adică [48,04; 51,96].</div>
<p>Când σ este necunoscut, folosești s și distribuția t cu n − 1 grade de libertate.</p>
<h2>Pentru o proporție</h2>
${f('p̂ ± z · √(p̂(1 − p̂) / n)')}
<div class="worked"><b>Exemplu 2.</b> p̂ = 0,4, n = 100: SE ≈ 0,049, deci intervalul este 0,4 ± 0,096.</div>
<h2>Mărimea eșantionului</h2>
${f('n ≥ (z σ / E)²')}
<div class="worked"><b>Exemplu 3.</b> σ = 10, marja E = 2, 95%: (9,8)² = 96,04, deci n = 97.</div>
<p class="note">Sensul corect: metoda prinde media reală în 95% din eșantioane. Nu spune că media reală are 95% șanse să fie într-un anumit interval deja calculat.</p>` },
      ex([
        [1, 'Află media lui 2, 4, 6, 8.', '<b>5</b>.'],
        [2, 'Află s² pentru 2, 4, 6, 8.', '20 / 3 ≈ <b>6,67</b>.'],
        [3, 'σ = 10, n = 25. Află SE.', '<b>2</b>.'],
        [4, 'Ce se întâmplă cu SE dacă n crește de 4 ori?', '<b>Se înjumătățește</b>.'],
      ], [
        [5, 'x̄ = 50, σ = 10, n = 100. Interval de 95%.', '<b>[48,04; 51,96]</b>.'],
        [6, 'μ = 100, σ = 20, n = 100. Află P(x̄ > 104).', '<b>0,0228</b>.'],
        [7, 'p̂ = 0,4, n = 100. Interval de 95%.', '<b>0,4 ± 0,096</b>.'],
        [8, 'Suma a 100 de zaruri: media și abaterea standard. Varianța unui zar este 35/12.', '<b>350 și ≈ 17,08</b>.'],
      ], [
        [9, 'σ = 10, marja 2, 95%. Ce n îți trebuie?', '<b>97</b>.'],
        [10, 'x̄ = 20, σ = 4, n = 16. Interval de 90%.', 'SE = 1: <b>20 ± 1,645</b>.'],
        [11, 'De ce împărțim la n − 1 în s²?', 'Ca estimatorul să <b>nu fie deplasat</b>.'],
        [12, 'p̂ = 0,5, n = 400. Marja la 95%.', '1,96 · 0,025 = <b>0,049</b>.'],
      ]),
      test([
        ['Află media lui 3, 5, 7.', '5', '15 / 3'],
        ['Află s² pentru 3, 5, 7.', '4', '(4 + 0 + 4) / 2'],
        ['σ = 6, n = 36. Află SE.', '1', '6 / 6'],
        ['x̄ = 30, σ = 5, n = 25. Interval de 95%.', '[28,04; 31,96]', 'SE = 1'],
        ['μ = 50, σ = 10, n = 25. Află P(x̄ ≤ 52).', '0,8413', 'SE = 2, z = 1'],
        ['p̂ = 0,5, n = 100. Află SE.', '0,05', '√(0,25 / 100)'],
        ['Pentru datele de mai sus, află intervalul de 95%.', '0,5 ± 0,098', '1,96 · 0,05'],
        ['σ = 8. Ce n dă SE = 1?', '64', '(8 / 1)²'],
        ['Ce z folosești la 99%?', '2,576', 'Din tabel'],
        ['σ = 5, marja 1, 95%. Ce n îți trebuie?', '97', '9,8² = 96,04'],
      ]),
    ],
  };

  window.MATH_WEEK22 = {
    id: 's22', short: 'Săptămâna 22', title: 'Săptămâna 22: Teste de ipoteză', phase: P5,
    tagline: 'H₀, valoarea p, erori, testele z și t',
    lead: 'Înveți să decizi dacă un efect observat este real sau poate fi explicat prin întâmplare.',
    advice: ADV + ' Scrie întotdeauna H₀ și H₁ înainte de orice calcul.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 45, title: 'Logica testului', html: `<h2>Pașii</h2>
<ol><li>Formulezi H₀ (nu există efect) și H₁.</li><li>Alegi α, de obicei 0,05.</li><li>Calculezi statistica testului.</li><li>Afli valoarea p.</li><li>Dacă p ≤ α, respingi H₀.</li></ol>
<h2>Valoarea p</h2>
<p>Este probabilitatea de a obține un rezultat cel puțin la fel de extrem, <b>presupunând că H₀ este adevărată</b>. Nu este probabilitatea ca H₀ să fie adevărată.</p>
<h2>Erori</h2>
${table(['', 'H₀ adevărată', 'H₀ falsă'], [['Respingi H₀', 'Eroare de tip I (α)', 'Corect (puterea testului)'], ['Nu respingi H₀', 'Corect', 'Eroare de tip II (β)']])}
<p>Dacă micșorezi α, scade eroarea de tip I, dar crește cea de tip II. Un eșantion mai mare crește puterea.</p>` },
      { n: 2, kind: 'lesson', minutes: 50, title: 'Testele z și t', html: `<h2>Testul z pentru medie</h2>
${f('z = (x̄ − μ₀) / (σ / √n)')}
<div class="worked"><b>Exemplu 1.</b> x̄ = 52, μ₀ = 50, σ = 10, n = 100. z = 2. Cu două cozi, valoarea critică la 5% este 1,96, deci respingi H₀. p = 2 · 0,0228 = 0,0456.</div>
<h2>Testul t</h2>
<p>Când σ este necunoscut: t = (x̄ − μ₀) / (s / √n), cu n − 1 grade de libertate.</p>
<div class="worked"><b>Exemplu 2.</b> x̄ = 12, μ₀ = 10, s = 4, n = 16. t = 2, cu 15 grade de libertate.</div>
<h2>Proporție</h2>
${f('z = (p̂ − p₀) / √(p₀(1 − p₀) / n)')}
<div class="worked"><b>Exemplu 3.</b> p̂ = 0,6, p₀ = 0,5, n = 100. SE = 0,05, z = 2. Respingi H₀.</div>
<h2>Două medii</h2>
${f('z = (x̄₁ − x̄₂) / √(σ₁²/n₁ + σ₂²/n₂)')}` },
      ex([
        [1, 'Scrie H₀ pentru „moneda este corectă”.', '<b>p = 0,5</b>.'],
        [2, 'Ce este eroarea de tip I?', 'Respingi o <b>H₀ adevărată</b>.'],
        [3, 'p = 0,03, α = 0,05. Ce decizi?', '<b>Respingi H₀</b>.'],
        [4, 'p = 0,2, α = 0,05. Ce decizi?', '<b>Nu respingi H₀</b>.'],
      ], [
        [5, 'x̄ = 52, μ₀ = 50, σ = 10, n = 100. Află z.', '<b>2</b>.'],
        [6, 'Cu z = 2, două cozi, α = 0,05. Ce decizi?', '2 &gt; 1,96: <b>respingi H₀</b>.'],
        [7, 'Pentru z = 2, află valoarea p cu o coadă și cu două.', '<b>0,0228 și 0,0456</b>.'],
        [8, 'x̄ = 12, μ₀ = 10, s = 4, n = 16. Află t și gradele de libertate.', '<b>t = 2, 15 grade</b>.'],
      ], [
        [9, 'p̂ = 0,6, p₀ = 0,5, n = 100. Testează, α = 0,05.', 'z = 2: <b>respingi H₀</b>.'],
        [10, 'x̄₁ = 10, x̄₂ = 8, σ = 3 la ambele, n = 36 la ambele. Află z.', 'SE ≈ 0,707, <b>z ≈ 2,83</b>, respingi H₀.'],
        [11, 'Cum crești puterea testului?', '<b>Mărești eșantionul</b>.'],
        [12, 'p = 0,03 înseamnă că H₀ are 3% șanse să fie adevărată?', '<b>Nu</b>: 3% este probabilitatea unor date atât de extreme dacă H₀ este adevărată.'],
      ]),
      test([
        ['p = 0,01, α = 0,05. Ce decizi?', 'Respingi H₀', 'p ≤ α'],
        ['p = 0,08, α = 0,05. Ce decizi?', 'Nu respingi H₀', 'p peste α'],
        ['Ce este eroarea de tip II?', 'Nu respingi o H₀ falsă', 'Definiție'],
        ['x̄ = 105, μ₀ = 100, σ = 15, n = 25. Află z.', '≈ 1,67', 'SE = 3'],
        ['Pentru z de mai sus, două cozi, α = 0,05. Ce decizi?', 'Nu respingi H₀', '1,67 este sub 1,96'],
        ['x̄ = 22, μ₀ = 20, s = 5, n = 25. Află t.', '2', 'SE = 1'],
        ['Câte grade de libertate are testul de mai sus?', '24', 'n − 1'],
        ['z = 1,8, o coadă, α = 0,05. Ce decizi?', 'Respingi H₀', '1,8 peste 1,645'],
        ['p̂ = 0,55, p₀ = 0,5, n = 400. Află z.', '2', 'SE = 0,025'],
        ['Ce se întâmplă cu eroarea de tip II dacă micșorezi α?', 'Crește', 'Compromis între erori'],
      ]),
    ],
  };

  window.MATH_WEEK23 = {
    id: 's23', short: 'Săptămâna 23', title: 'Săptămâna 23: Regresie liniară', phase: P5,
    tagline: 'Dreapta de regresie, corelație, R², interpretare',
    lead: 'Modelezi legătura dintre două variabile cu o dreaptă și verifici cât de bine descrie datele.',
    advice: ADV + ' Corelația nu înseamnă cauzalitate. Fă mereu și un grafic al datelor.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Dreapta de regresie', html: `<h2>Modelul</h2>
${f('ŷ = a + bx')}
<p>Alegem a și b astfel încât suma pătratelor reziduurilor, Σ(y − ŷ)², să fie minimă.</p>
${f('b = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)² = Cov(x, y) / Var(x) &emsp; a = ȳ − b x̄')}
<div class="worked"><b>Exemplu 1.</b> Puncte (1, 2), (2, 4), (3, 5). x̄ = 2, ȳ = 11/3. Numărătorul este 3, numitorul 2, deci b = 1,5 și a = 2/3.</div>
<p><b>b</b> spune cu cât se schimbă în medie y când x crește cu 1. <b>Reziduul</b> este valoarea observată minus cea prezisă.</p>
<h2>Corelație</h2>
${f('r = b · s<sub>x</sub> / s<sub>y</sub>, &emsp; −1 ≤ r ≤ 1')}
<div class="worked"><b>Exemplu 2.</b> b = 2, sₓ = 3, sᵧ = 10: r = 0,6.</div>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Calitatea modelului', html: `<h2>R²</h2>
${f('R² = 1 − SSE / SST')}
<p>Este proporția din variația lui y explicată de model. La regresia simplă, R² = r².</p>
<div class="worked"><b>Exemplu 1.</b> SSE = 20, SST = 100: R² = 0,8.</div>
<h2>Testul pentru pantă</h2>
${f('t = b / SE(b)')}
<div class="worked"><b>Exemplu 2.</b> b = 1,5 și SE = 0,5: t = 3, deci panta este semnificativă pentru un eșantion rezonabil.</div>
<h2>Regresie multiplă</h2>
<p>ŷ = a + b₁x₁ + b₂x₂. Fiecare coeficient se citește „ținând celelalte variabile constante”.</p>
<h2>Presupuneri</h2>
<p>Relație liniară, reziduuri independente, cu varianță constantă și aproximativ normale. Le verifici pe graficul reziduurilor.</p>` },
      ex([
        [1, 'ŷ = 2 + 3x. Prezice y pentru x = 4.', '<b>14</b>.'],
        [2, 'Ce înseamnă b = 3?', 'y crește în medie cu <b>3</b> când x crește cu 1.'],
        [3, 'Observat 10, prezis 8. Află reziduul.', '<b>2</b>.'],
        [4, 'r = 0,8. Află R².', '<b>0,64</b>.'],
      ], [
        [5, 'Puncte (1, 2), (2, 4), (3, 5). Află b.', '<b>1,5</b>.'],
        [6, 'Pentru aceleași puncte, află a.', '<b>2/3</b>.'],
        [7, 'Cov = 6, Var(x) = 3. Află b.', '<b>2</b>.'],
        [8, 'b = 2, x̄ = 5, ȳ = 13. Află a.', '<b>3</b>.'],
      ], [
        [9, 'b = 2, sₓ = 3, sᵧ = 10. Află r.', '<b>0,6</b>.'],
        [10, 'SSE = 20, SST = 100. Află R².', '<b>0,8</b>.'],
        [11, 'ŷ = 1 + 2x₁ − x₂. Prezice pentru x₁ = 3, x₂ = 4.', '<b>3</b>.'],
        [12, 'b = 1,5, SE = 0,5. Află t.', '<b>3</b>.'],
      ]),
      test([
        ['ŷ = 5 − 2x. Prezice y pentru x = 3.', '−1', '5 − 6'],
        ['Observat 7, prezis 9. Află reziduul.', '−2', '7 − 9'],
        ['r = −0,5. Află R².', '0,25', 'r²'],
        ['Cov = 8, Var(x) = 4. Află b.', '2', '8 / 4'],
        ['b = 3, x̄ = 2, ȳ = 10. Află a.', '4', '10 − 6'],
        ['Puncte (0, 1), (1, 3), (2, 5). Află dreapta.', 'ŷ = 1 + 2x', 'Punctele sunt coliniare'],
        ['SSE = 30, SST = 120. Află R².', '0,75', '1 − 0,25'],
        ['ŷ = 2 + x₁ + 3x₂. Prezice pentru x₁ = 1, x₂ = 2.', '9', '2 + 1 + 6'],
        ['b = 2, SE = 0,4. Află t.', '5', '2 / 0,4'],
        ['b = 1,5, sₓ = 2, sᵧ = 5. Află r.', '0,6', '1,5 · 2 / 5'],
      ]),
    ],
  };

  window.MATH_WEEK24 = {
    id: 's24', short: 'Săptămâna 24', title: 'Săptămâna 24: Regresie logistică', phase: P5,
    tagline: 'Șanse, logit, sigmoid, matrice de confuzie',
    lead: 'Prezici probabilitatea unui rezultat cu două variante și evaluezi cât de bun este clasificatorul.',
    advice: ADV + ' Nu te opri la acuratețe: la clase rare poate fi înșelătoare.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Modelul logistic', html: `<h2>Șanse și logit</h2>
${f('șanse = p / (1 − p) &emsp; logit(p) = ln(p / (1 − p))')}
<div class="worked"><b>Exemplu 1.</b> p = 0,8: șansele sunt 4. Invers, șansele 3 dau p = 3/4.</div>
<h2>Modelul</h2>
${f('ln(p / (1 − p)) = a + bx &emsp; p = 1 / (1 + e^(−(a + bx)))')}
<div class="worked"><b>Exemplu 2.</b> a + bx = 1: p = e / (1 + e) ≈ 0,731.</div>
<h2>Interpretarea coeficientului</h2>
<p>Când x crește cu 1, șansele se înmulțesc cu eᵇ.</p>
<div class="worked"><b>Exemplu 3.</b> b = 0,7: eᵇ ≈ 2,01, deci șansele aproape se dublează.</div>
<h2>Estimare</h2>
<p>a și b se aleg prin maximizarea verosimilității: Σ [y ln p + (1 − y) ln(1 − p)]. Nu există formulă directă, așa că se folosesc metode de optimizare, de exemplu coborârea pe gradient.</p>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Evaluarea clasificatorului', html: `<h2>Matricea de confuzie</h2>
${table(['', 'Prezis pozitiv', 'Prezis negativ'], [['Real pozitiv', 'TP', 'FN'], ['Real negativ', 'FP', 'TN']])}
${table(['Măsură', 'Formulă', 'Întrebare'], [['Acuratețe', '(TP + TN) / total', 'Cât de des are dreptate?'], ['Precizie', 'TP / (TP + FP)', 'Dintre alarme, câte sunt reale?'], ['Recall', 'TP / (TP + FN)', 'Dintre cazurile reale, câte găsește?'], ['F1', '2PR / (P + R)', 'Echilibru între cele două']])}
<div class="worked"><b>Exemplu.</b> TP = 40, FP = 10, FN = 20, TN = 30. Acuratețe 0,7, precizie 0,8, recall ≈ 0,667, F1 ≈ 0,727.</div>
<p>Pragul de decizie, de obicei 0,5, poate fi schimbat. Un prag mai mic crește recall-ul, dar de obicei scade precizia.</p>` },
      ex([
        [1, 'p = 0,8. Află șansele.', '<b>4</b>.'],
        [2, 'Șansele sunt 3. Află p.', '<b>0,75</b>.'],
        [3, 'Cât este sigmoidul în 0?', '<b>0,5</b>.'],
        [4, 'Cât este logit(0,5)?', '<b>0</b>.'],
      ], [
        [5, 'Logit = −1 + 0,5x. Află p pentru x = 2.', 'Logit 0: <b>p = 0,5</b>.'],
        [6, 'b = 0,7. Cu cât se înmulțesc șansele?', '<b>≈ 2,01</b>.'],
        [7, 'Logit = 1. Află p.', '<b>≈ 0,731</b>.'],
        [8, 'Pragul este 0,5, iar p = 0,62. Ce clasă prezici?', '<b>Clasa 1</b>.'],
      ], [
        [9, 'TP = 40, FP = 10, FN = 20, TN = 30. Află acuratețea, precizia și recall-ul.', '<b>0,7; 0,8; ≈ 0,667</b>.'],
        [10, 'Pentru aceleași date, află F1.', '<b>≈ 0,727</b>.'],
        [11, 'y = 1, p = 0,8. Află log-verosimilitatea.', 'ln 0,8 ≈ <b>−0,223</b>.'],
        [12, 'p = 0,2. Află șansele și logit-ul.', '<b>0,25 și ≈ −1,386</b>.'],
      ]),
      test([
        ['p = 0,9. Află șansele.', '9', '0,9 / 0,1'],
        ['Șansele sunt 1. Află p.', '0,5', '1 / 2'],
        ['Logit = −2 + x. Află p pentru x = 2.', '0,5', 'Logit 0'],
        ['b = ln 2. Cu cât se înmulțesc șansele?', '2', 'eᵇ'],
        ['Logit = 2. Află p.', '≈ 0,881', 'e² / (1 + e²)'],
        ['TP = 30, FP = 10, FN = 10, TN = 50. Află acuratețea.', '0,8', '80 / 100'],
        ['Pentru aceleași date, află precizia.', '0,75', '30 / 40'],
        ['Pentru aceleași date, află recall-ul.', '0,75', '30 / 40'],
        ['Pentru aceleași date, află F1.', '0,75', 'P = R'],
        ['y = 1, p = 0,5. Află log-verosimilitatea.', '≈ −0,693', 'ln 0,5'],
      ]),
    ],
  };

  window.MATH_WEEK25 = {
    id: 's25', short: 'Săptămâna 25', title: 'Săptămâna 25: Serii de timp și mini-proiect', phase: P5,
    tagline: 'Trend, sezonalitate, prognoză, mini-proiect, plus testul mare al Fazei 5',
    lead: 'Ultima săptămână din plan: analizezi date în timp, faci prognoze, lucrezi la un mini-proiect și dai testul final.',
    advice: ADV + ' Pentru mini-proiect, alege date care chiar te interesează.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Componente și prognoză', html: `<h2>Componente</h2>
<p><b>Trend</b>: direcția pe termen lung. <b>Sezonalitate</b>: tiparul care se repetă la intervale fixe. <b>Zgomot</b>: restul.</p>
<h2>Instrumente</h2>
${table(['Instrument', 'Formulă', 'Ce face'], [['Medie mobilă de 3', '(xₜ + xₜ₋₁ + xₜ₋₂) / 3', 'netezește'], ['Diferențiere', 'xₜ − xₜ₋₁', 'elimină trendul'], ['Diferențiere sezonieră', 'xₜ − xₜ₋₁₂ la date lunare', 'elimină sezonalitatea']])}
<h2>Netezire exponențială</h2>
${f('Lₜ = αxₜ + (1 − α)Lₜ₋₁')}
<div class="worked"><b>Exemplu 1.</b> α = 0,5, nivelul 10, observația 14: noul nivel este 12.</div>
<h2>Modelul AR(1)</h2>
${f('Xₜ = c + φXₜ₋₁ + εₜ')}
<p>Este staționar dacă |φ| &lt; 1. Media pe termen lung este c / (1 − φ).</p>
<div class="worked"><b>Exemplu 2.</b> c = 2, φ = 0,5, ultima valoare 10. Prognozele sunt 7, apoi 5,5, spre media 4.</div>
<p>Autocorelația de ordin 1 măsoară cât de legată este o valoare de cea dinaintea ei.</p>
<h2>Măsurarea erorii</h2>
${f('MAE = Σ|eₜ| / n &emsp; RMSE = √(Σeₜ² / n)')}
<div class="worked"><b>Exemplu 3.</b> Erorile 1, −2, 3: MAE = 2.</div>` },
      { n: 2, kind: 'lesson', minutes: 60, title: 'Mini-proiect cu date reale', html: `<h2>Tema</h2>
<p>Alege un set mic de date reale, de exemplu cheltuieli lunare, pașii zilnici, vremea din orașul tău sau date publice de la Institutul Național de Statistică. Lucrează în Excel sau într-un alt program pe care îl ai deja.</p>
<h2>Pași</h2>
<ol>
<li><b>Întrebarea.</b> Formulează o întrebare la care datele pot răspunde.</li>
<li><b>Descriere.</b> Calculează media și abaterea standard și fă un grafic.</li>
<li><b>Estimare.</b> Construiește un interval de încredere de 95% pentru medie.</li>
<li><b>Test.</b> Formulează H₀ și H₁ și fă un test de ipoteză.</li>
<li><b>Model.</b> Fă o regresie liniară sau, dacă datele sunt în timp, o prognoză.</li>
<li><b>Verificare.</b> Păstrează ultimele valori deoparte și măsoară eroarea prognozei.</li>
<li><b>Concluzie.</b> Scrie în cinci rânduri ce ai aflat și ce limite are analiza.</li>
</ol>
<p class="note">Nu există o singură soluție corectă. Contează să poți explica fiecare pas.</p>` },
      ex([
        [1, 'Calculează media mobilă de 3 pentru 3, 6, 9.', '<b>6</b>.'],
        [2, 'Diferențiază seria 5, 7, 10.', '<b>2, 3</b>.'],
        [3, 'Ce întârziere folosești la diferențierea sezonieră pentru date lunare?', '<b>12</b>.'],
        [4, 'Care este diferența dintre trend și sezonalitate?', 'Trendul este <b>direcția pe termen lung</b>, sezonalitatea este un <b>tipar repetat</b>.'],
      ], [
        [5, 'α = 0,5, nivelul 10, observația 14. Află noul nivel.', '<b>12</b>.'],
        [6, 'Xₜ = 2 + 0,5Xₜ₋₁, iar ultima valoare este 10. Prognoza următoare.', '<b>7</b>.'],
        [7, 'Pentru același model, află media pe termen lung.', '2 / 0,5 = <b>4</b>.'],
        [8, 'Erorile sunt 1, −2, 3. Află MAE.', '<b>2</b>.'],
      ], [
        [9, 'Erorile sunt 1, −2, 2. Află RMSE.', '√(9/3) = <b>√3</b>.'],
        [10, 'Ce înseamnă o autocorelație de ordin 1 pozitivă?', 'După valori mari tind să urmeze <b>tot valori mari</b>.'],
        [11, 'Când este staționar un model AR(1)?', '<b>|φ| &lt; 1</b>.'],
        [12, 'Xₜ = 2 + 0,5Xₜ₋₁, de la 10. Prognoza la doi pași.', '7, apoi <b>5,5</b>.'],
      ]),
      test([
        ['Calculează media mobilă de 3 pentru 2, 4, 9.', '5', '15 / 3'],
        ['Diferențiază seria 8, 5, 6.', '−3, 1', 'Diferențe succesive'],
        ['α = 0,2, nivelul 20, observația 30. Află noul nivel.', '22', '6 + 16'],
        ['Xₜ = 1 + 0,8Xₜ₋₁, de la 5. Prognoza următoare.', '5', '1 + 4'],
        ['Pentru același model, află media pe termen lung.', '5', '1 / 0,2'],
        ['Este staționar un AR(1) cu φ = 1,2?', 'Nu', '|φ| peste 1'],
        ['Erorile sunt 2, −2, 4. Află MAE.', '8/3', '(2 + 2 + 4) / 3'],
        ['Erorile sunt 3, −4. Află RMSE.', '≈ 3,54', '√(25 / 2)'],
        ['Xₜ = 3 + 0,5Xₜ₋₁, de la 10. Prognoza la doi pași.', '7', '8, apoi 7'],
        ['Ce întârziere folosești pentru date trimestriale cu sezonalitate anuală?', '4', 'Patru trimestre'],
      ]),
      big('Testul mare al Fazei 5', [
        ['P(A) = 0,5, P(B) = 0,3, P(A ∩ B) = 0,1. Află P(A ∪ B).', '0,7', '0,5 + 0,3 − 0,1'],
        ['Prevalență 10%, sensibilitate 80%, fals pozitive 20%. Află P(boală | +).', '4/13 ≈ 0,308', '0,08 / 0,26'],
        ['Binomială(10; 0,2). Află media și varianța.', '2 și 1,6', 'np și np(1 − p)'],
        ['μ = 100, σ = 10. Află P(X > 120).', '0,0228', 'z = 2'],
        ['σ = 12, n = 36. Află SE.', '2', '12 / 6'],
        ['x̄ = 40, σ = 10, n = 100. Interval de 95%.', '[38,04; 41,96]', 'SE = 1'],
        ['x̄ = 53, μ₀ = 50, σ = 15, n = 100, două cozi, α = 0,05. Ce decizi?', 'Respingi H₀', 'SE = 1,5, z = 2'],
        ['r = 0,7. Află R².', '0,49', 'r²'],
        ['Cov = 10, Var(x) = 5, x̄ = 3, ȳ = 7. Află dreapta de regresie.', 'ŷ = 1 + 2x', 'b = 2, a = 7 − 6'],
        ['Logit = 0. Află p.', '0,5', 'Sigmoid în 0'],
        ['TP = 20, FP = 5. Află precizia.', '0,8', '20 / 25'],
        ['Xₜ = 1 + 0,5Xₜ₋₁, de la 6. Prognoza următoare.', '4', '1 + 3'],
      ]),
    ],
  };
})();
