// Matematica, saptamanile 12-17: Faza 4, matematica de facultate, din planul tau.
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const f = (html) => `<p class="formula">${html}</p>`;
  const BAREM = '5 puncte pentru metodă corectă și 5 puncte pentru rezultat, la fiecare problemă.';
  const INSTR = 'Zece probleme, câte 10 puncte fiecare, total 100 de puncte. Lucrează fără lecții, apoi corectează cu rezolvările.';
  const BIG = 'Testul mare al fazei. Douăsprezece probleme, cu punctaj egal. Sub 70% mai faci o săptămână de consolidare înainte să treci mai departe.';
  const P4 = 'Faza 4 · Matematică de facultate';
  const ADV = 'Refă exemplele pe hârtie fără să te uiți la soluție. La exerciții încearcă cel puțin 5 minute înainte să deschizi rezolvarea.';
  const NOTA = '<p class="note">Scriem matricele pe un rând: [1 2; 3 4] înseamnă rândul 1 2 și rândul 3 4.</p>';
  const ex = (a, b, c) => ({ n: 3, kind: 'exercises', minutes: 60, title: 'Exerciții (ușor → provocator)', tiers: [
    { title: 'Treapta A – Încălzire', items: a }, { title: 'Treapta B – Aplicații', items: b }, { title: 'Treapta C – Provocări', items: c },
  ] });
  const test = (problems) => ({ n: 4, kind: 'test', minutes: 45, title: 'Test cronometrat și corectare', test: { minutes: 30, instr: INSTR, barem: BAREM, problems } });
  const big = (title, problems) => ({ n: 5, kind: 'test', minutes: 120, title, test: { minutes: 90, instr: BIG, barem: BAREM, problems } });

  window.MATH_WEEK12 = {
    id: 's12', short: 'Săptămâna 12', title: 'Săptămâna 12: Vectori și spații vectoriale', phase: P4,
    tagline: 'Începutul Fazei 4: produs scalar, independență, bază, rang',
    lead: 'Prima săptămână de algebră liniară: vectori, combinații liniare, independență, bază, dimensiune și rang.',
    advice: ADV + ' Când vezi mai mulți vectori, așază-i într-o matrice: rangul spune aproape tot.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Vectori și combinații liniare', html: `<h2>Operații</h2>
<p>Vectorii se adună și se înmulțesc cu un număr pe componente: (1, 2) + (3, −1) = (4, 1).</p>
<h2>Produs scalar și normă</h2>
${f('u · v = u₁v₁ + … + uₙvₙ &emsp; ‖u‖ = √(u · u) &emsp; cos θ = (u · v) / (‖u‖ ‖v‖)')}
<p>Dacă u · v = 0, vectorii sunt ortogonali, adică perpendiculari.</p>
<div class="worked"><b>Exemplu 1.</b> Unghiul dintre (1, 0) și (1, 1): cos θ = 1 / √2, deci θ = 45°.</div>
<h2>Combinații liniare</h2>
<p>O combinație liniară este a·u + b·v. Coeficienții se află dintr-un sistem.</p>
<div class="worked"><b>Exemplu 2.</b> (5, 7) = a(1, 1) + b(1, 2). Sistemul a + b = 5, a + 2b = 7 dă b = 2 și a = 3.</div>
<h2>Independență liniară</h2>
<p>Vectorii sunt independenți dacă a₁v₁ + … + aₖvₖ = 0 are doar soluția cu toți coeficienții 0. Dacă unul se scrie din ceilalți, sunt dependenți.</p>
<div class="worked"><b>Exemplu 3.</b> (1, 2) și (2, 4) sunt dependenți: al doilea este de două ori primul.</div>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Bază, dimensiune și rang', html: `${NOTA}<h2>Bază și dimensiune</h2>
<p>O bază este o mulțime de vectori independenți care generează tot spațiul. Dimensiunea este numărul vectorilor din bază. ℝⁿ are dimensiunea n.</p>
<div class="worked"><b>Exemplu 1.</b> Planul x + y + z = 0 din ℝ³ are z = −x − y. Două variabile sunt libere, deci dimensiunea este 2. O bază: (1, 0, −1) și (0, 1, −1).</div>
<h2>Rangul</h2>
<p>Rangul este numărul maxim de rânduri independente. Îl afli prin eliminare Gauss, numărând rândurile nenule.</p>
<div class="worked"><b>Exemplu 2.</b> [1 2 3; 4 5 6; 7 8 9]. Scăzând, ajungem la [1 2 3; 0 −3 −6; 0 0 0]. Rangul este 2.</div>
<p>n vectori din ℝⁿ sunt independenți dacă și numai dacă determinantul matricei lor este nenul.</p>` },
      ex([
        [1, 'Calculează (1, 2) + (3, −1).', '<b>(4, 1)</b>.'],
        [2, 'Calculează 3 · (2, −1, 0).', '<b>(6, −3, 0)</b>.'],
        [3, 'Calculează (1, 2, 3) · (4, 0, 1).', '4 + 0 + 3 = <b>7</b>.'],
        [4, 'Calculează norma lui (3, 4).', '√25 = <b>5</b>.'],
      ], [
        [5, 'Sunt (1, 2) și (2, 4) independenți?', '<b>Nu</b>: (2, 4) = 2(1, 2).'],
        [6, 'Sunt (1, 0), (0, 1), (2, 3) independenți?', '<b>Nu</b>: trei vectori în ℝ² sunt mereu dependenți; (2, 3) = 2(1, 0) + 3(0, 1).'],
        [7, 'Scrie (5, 7) ca a(1, 1) + b(1, 2).', '<b>a = 3, b = 2</b>.'],
        [8, 'Află rangul lui [1 2; 2 4].', 'Al doilea rând este dublul primului: <b>1</b>.'],
      ], [
        [9, 'Află dimensiunea planului x + y + z = 0.', 'Două variabile libere: <b>2</b>.'],
        [10, 'Află rangul lui [1 2 3; 4 5 6; 7 8 9].', '<b>2</b>.'],
        [11, 'Pentru ce m sunt (1, m) și (m, 4) dependenți?', '4 − m² = 0: <b>m = ±2</b>.'],
        [12, 'Află unghiul dintre (1, 0) și (1, 1).', '<b>45°</b>.'],
      ]),
      test([
        ['Calculează (2, 1) − (1, 3).', '(1, −2)', 'Pe componente'],
        ['Sunt (2, −1) și (1, 2) ortogonali?', 'Da', 'Produsul scalar este 2 − 2 = 0'],
        ['Calculează norma lui (1, 2, 2).', '3', '√(1 + 4 + 4)'],
        ['Calculează 2(1, 0, 1) + (0, 1, 1).', '(2, 1, 3)', 'Pe componente'],
        ['Află rangul lui [1 1; 1 1].', '1', 'Rânduri egale'],
        ['Sunt (1, 1, 0), (0, 1, 1), (1, 0, 1) independenți?', 'Da', 'Determinantul este 2'],
        ['Care este dimensiunea lui ℝ⁴?', '4', 'Baza are 4 vectori'],
        ['Scrie (3, 5) ca a(1, 1) + b(0, 1).', 'a = 3, b = 2', 'a = 3, a + b = 5'],
        ['Pentru ce m sunt (2, m) și (4, 6) dependenți?', 'm = 3', '12 − 4m = 0'],
        ['Află dimensiunea planului x − y = 0 din ℝ³.', '2', 'Două variabile libere'],
      ]),
    ],
  };

  window.MATH_WEEK13 = {
    id: 's13', short: 'Săptămâna 13', title: 'Săptămâna 13: Aplicații liniare și valori proprii', phase: P4,
    tagline: 'Matricea unei aplicații, nucleu, valori și vectori proprii',
    lead: 'Vezi matricele ca transformări și afli direcțiile pe care le lasă neschimbate: vectorii proprii.',
    advice: ADV + ' Verifică valorile proprii: suma lor este urma, iar produsul lor este determinantul.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 45, title: 'Aplicații liniare', html: `${NOTA}<h2>Definiție</h2>
<p>T este liniară dacă T(u + v) = T(u) + T(v) și T(au) = aT(u). Orice aplicație liniară se scrie ca o matrice.</p>
<div class="worked"><b>Exemplu 1.</b> T(x, y) = (2x, x + y) are matricea [2 0; 1 1]. Coloanele sunt imaginile vectorilor (1, 0) și (0, 1).</div>
<h2>Nucleu și imagine</h2>
<p>Nucleul conține vectorii cu Av = 0. Imaginea conține toate rezultatele Av.</p>
${f('dim nucleu + rang A = numărul coloanelor')}
<div class="worked"><b>Exemplu 2.</b> O matrice de 3 × 5 cu rangul 2 are nucleul de dimensiune 5 − 2 = 3.</div>
<div class="worked"><b>Exemplu 3.</b> Nucleul lui [1 1; 1 1]: x + y = 0, deci vectorii de forma a(1, −1).</div>` },
      { n: 2, kind: 'lesson', minutes: 50, title: 'Valori și vectori proprii', html: `${NOTA}<h2>Definiție</h2>
${f('Av = λv, &emsp; v ≠ 0')}
<p>Direcția lui v nu se schimbă; vectorul este doar înmulțit cu λ.</p>
<h2>Calcul</h2>
${f('det(A − λI) = 0')}
<div class="worked"><b>Exemplu 1.</b> A = [2 1; 1 2]. (2 − λ)² − 1 = 0, adică λ² − 4λ + 3 = 0, deci λ = 1 și λ = 3.</div>
<div class="worked"><b>Exemplu 2.</b> Pentru λ = 3: (A − 3I)v = 0 dă −x + y = 0, deci v = (1, 1).</div>
<h2>Proprietăți</h2>
${table(['Proprietate', 'Formulă'], [['Suma valorilor proprii', 'urma lui A'], ['Produsul valorilor proprii', 'det A'], ['Valorile proprii ale lui Aⁿ', 'λⁿ']])}
<h2>Diagonalizare</h2>
<p>A = PDP⁻¹, cu vectorii proprii în P și valorile proprii în D. Este nevoie de n vectori proprii independenți. Astfel Aⁿ = PDⁿP⁻¹.</p>
<div class="worked"><b>Exemplu 3.</b> [1 1; 0 1] are λ = 1 dublu, dar o singură direcție proprie, (1, 0). Nu este diagonalizabilă.</div>` },
      ex([
        [1, 'Scrie matricea lui T(x, y) = (2x, x + y).', '<b>[2 0; 1 1]</b>.'],
        [2, 'Aplică [1 2; 0 1] vectorului (1, 1).', '<b>(3, 1)</b>.'],
        [3, 'Află valorile proprii ale lui [2 0; 0 5].', '<b>2 și 5</b>.'],
        [4, 'Află valorile proprii ale lui [1 2; 0 3].', 'Matrice triunghiulară: <b>1 și 3</b>.'],
      ], [
        [5, 'Află valorile proprii ale lui [2 1; 1 2].', '<b>1 și 3</b>.'],
        [6, 'Găsește un vector propriu al lui [2 1; 1 2] pentru λ = 3.', '<b>(1, 1)</b>.'],
        [7, 'Află nucleul lui [1 1; 1 1].', 'Vectorii <b>a(1, −1)</b>, dimensiune 1.'],
        [8, 'O matrice de 3 × 5 are rangul 2. Ce dimensiune are nucleul?', '<b>3</b>.'],
      ], [
        [9, 'Verifică suma și produsul valorilor proprii ale lui [2 1; 1 2].', 'Suma 4 este urma, produsul 3 este determinantul.'],
        [10, 'A = [2 1; 1 2]. Ce valori proprii are A²?', '1² și 3²: <b>1 și 9</b>.'],
        [11, 'Este [1 1; 0 1] diagonalizabilă?', '<b>Nu</b>: are un singur vector propriu independent.'],
        [12, 'Află valorile și vectorii proprii ai lui [0 1; 1 0].', '<b>λ = 1 cu (1, 1), λ = −1 cu (1, −1)</b>.'],
      ]),
      test([
        ['Scrie matricea lui T(x, y) = (x − y, 2y).', '[1 −1; 0 2]', 'Imaginile lui (1, 0) și (0, 1)'],
        ['Pentru T de mai sus, calculează T(1, 2).', '(−1, 4)', 'Înlocuire directă'],
        ['Află valorile proprii ale lui [3 0; 0 −1].', '3 și −1', 'Matrice diagonală'],
        ['Află valorile proprii ale lui [4 1; 2 3].', '2 și 5', 'λ² − 7λ + 10 = 0'],
        ['Găsește un vector propriu al lui [4 1; 2 3] pentru λ = 5.', '(1, 1)', '−x + y = 0'],
        ['Care este suma valorilor proprii ale lui [4 1; 2 3]?', '7', 'Urma'],
        ['O matrice de 4 × 6 are rangul 4. Ce dimensiune are nucleul?', '2', '6 − 4'],
        ['Află nucleul lui [1 2; 2 4].', 'a(2, −1)', 'x + 2y = 0'],
        ['A are valorile proprii 2 și 3. Ce valori proprii are A³?', '8 și 27', 'λ³'],
        ['Valorile proprii sunt 2, 3, 4. Cât este det A?', '24', 'Produsul lor'],
      ]),
    ],
  };

  window.MATH_WEEK14 = {
    id: 's14', short: 'Săptămâna 14', title: 'Săptămâna 14: Ortogonalitate și SVD', phase: P4,
    tagline: 'Proiecții, Gram–Schmidt, cele mai mici pătrate, valori singulare',
    lead: 'Închei algebra liniară cu proiecții și descompunerea în valori singulare, baza multor metode din statistică.',
    advice: ADV + ' Desenează proiecțiile în plan: formula devine evidentă.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Proiecții și ortogonalizare', html: `${NOTA}<h2>Proiecția pe un vector</h2>
${f('proj<sub>u</sub> v = ((v · u) / (u · u)) · u')}
<div class="worked"><b>Exemplu 1.</b> Proiecția lui (1, 2) pe (1, 1): (3 / 2)(1, 1) = (1,5; 1,5).</div>
<h2>Gram–Schmidt</h2>
<p>Din fiecare vector scazi proiecțiile pe vectorii deja obținuți.</p>
<div class="worked"><b>Exemplu 2.</b> Din (1, 1) și (1, 0): u₂ = (1, 0) − (1/2)(1, 1) = (1/2, −1/2).</div>
<h2>Matrice ortogonale</h2>
<p>QᵀQ = I. Ele păstrează lungimile, iar det Q = ±1. Rotațiile sunt un exemplu.</p>
<h2>Cele mai mici pătrate</h2>
<p>Când Ax = b nu are soluție, căutăm x care minimizează ‖Ax − b‖. Soluția vine din AᵀAx = Aᵀb.</p>
<div class="worked"><b>Exemplu 3.</b> Dreapta y = ax prin (1, 2) și (2, 3): a = Σxy / Σx² = 8 / 5.</div>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Descompunerea SVD', html: `${NOTA}<h2>Forma</h2>
${f('A = U Σ Vᵀ')}
<p>U și V sunt ortogonale, iar Σ are pe diagonală valorile singulare σ₁ ≥ σ₂ ≥ … ≥ 0. Orice matrice are SVD, chiar și una care nu este pătrată.</p>
<h2>Calcul</h2>
<p>Valorile singulare sunt rădăcinile pătrate ale valorilor proprii ale lui AᵀA.</p>
<div class="worked"><b>Exemplu 1.</b> A = [1 1; 1 1]. AᵀA = [2 2; 2 2] are valorile proprii 4 și 0, deci σ = 2 și 0.</div>
<h2>Ce ne spune</h2>
${table(['Noțiune', 'Legătura cu SVD'], [['Rang', 'numărul valorilor singulare nenule'], ['Aproximare de rang k', 'păstrezi primele k valori singulare'], ['Compresie de date, PCA', 'primele direcții conțin cea mai mare variație']])}
<div class="worked"><b>Exemplu 2.</b> Cea mai bună aproximare de rang 1 pentru [5 0; 0 1] este [5 0; 0 0].</div>` },
      ex([
        [1, 'Sunt (1, 1) și (1, −1) ortogonali?', '1 − 1 = 0: <b>da</b>.'],
        [2, 'Normează vectorul (3, 4).', '<b>(3/5, 4/5)</b>.'],
        [3, 'Proiectează (2, 3) pe (1, 0).', '<b>(2, 0)</b>.'],
        [4, 'Este [0 −1; 1 0] ortogonală?', 'QᵀQ = I: <b>da</b>, este o rotație cu 90°.'],
      ], [
        [5, 'Proiectează (1, 2) pe (1, 1).', '<b>(1,5; 1,5)</b>.'],
        [6, 'Aplică Gram–Schmidt pentru (1, 1) și (1, 0).', 'u₁ = (1, 1), <b>u₂ = (1/2, −1/2)</b>.'],
        [7, 'Află valorile singulare ale lui [3 0; 0 2].', '<b>3 și 2</b>.'],
        [8, 'A = [1 0; 0 −2]. Află valorile singulare.', 'AᵀA are 1 și 4: <b>1 și 2</b>.'],
      ], [
        [9, 'Află valorile singulare ale lui [1 1; 1 1].', '<b>2 și 0</b>.'],
        [10, 'Ce rang are matricea de mai sus?', 'O singură valoare nenulă: <b>1</b>.'],
        [11, 'Aproximarea de rang 1 pentru [5 0; 0 1] și eroarea ei.', '<b>[5 0; 0 0]</b>, eroarea (norma Frobenius) este <b>1</b>.'],
        [12, 'Dreapta y = ax prin cele mai mici pătrate pentru (1, 2), (2, 3).', '<b>a = 8/5</b>.'],
      ]),
      test([
        ['Sunt (2, 1) și (1, −2) ortogonali?', 'Da', '2 − 2 = 0'],
        ['Normează vectorul (1, 2, 2).', '(1/3, 2/3, 2/3)', 'Norma este 3'],
        ['Proiectează (3, 1) pe (0, 1).', '(0, 1)', 'Păstrezi a doua componentă'],
        ['Proiectează (4, 2) pe (1, 1).', '(3, 3)', '(6 / 2)(1, 1)'],
        ['Află valorile singulare ale lui [4 0; 0 1].', '4 și 1', 'Matrice diagonală pozitivă'],
        ['Află valorile singulare ale lui [0 2; 0 0].', '2 și 0', 'AᵀA = [0 0; 0 4]'],
        ['Valorile singulare sunt 5, 2, 0. Cât este rangul?', '2', 'Două nenule'],
        ['Ce valori poate avea det Q, pentru Q ortogonală?', '1 sau −1', 'QᵀQ = I'],
        ['y = ax prin cele mai mici pătrate pentru (1, 1), (2, 2), (3, 2).', 'a = 11/14', 'Σxy = 11, Σx² = 14'],
        ['Aproximarea de rang 1 pentru [3 0; 0 2].', '[3 0; 0 0]', 'Păstrezi valoarea cea mai mare'],
      ]),
    ],
  };

  window.MATH_WEEK15 = {
    id: 's15', short: 'Săptămâna 15', title: 'Săptămâna 15: Serii numerice și serii Taylor', phase: P4,
    tagline: 'Convergență, criterii, serii de puteri, Taylor',
    lead: 'Afli când o sumă infinită are sens și cum aproximezi funcții cu polinoame.',
    advice: ADV + ' Verifică întâi dacă termenul general tinde la 0. Dacă nu, seria diverge imediat.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Convergența seriilor', html: `<h2>Seria geometrică</h2>
${f('Σₙ₌₀^∞ qⁿ = 1 / (1 − q), &emsp; |q| &lt; 1')}
<div class="worked"><b>Exemplu 1.</b> Σₙ₌₁^∞ (1/3)ⁿ = (1/3) / (1 − 1/3) = 1/2.</div>
<h2>Condiția necesară</h2>
<p>Dacă seria converge, termenul general tinde la 0. Reciproca este falsă: Σ 1/n diverge, deși 1/n → 0.</p>
<h2>Seria p</h2>
<p>Σ 1/nᵖ converge pentru p &gt; 1 și diverge pentru p ≤ 1.</p>
<h2>Criteriul raportului</h2>
${f('L = lim |aₙ₊₁ / aₙ|')}
<p>L &lt; 1: converge. L &gt; 1: diverge. L = 1: nu decide.</p>
<div class="worked"><b>Exemplu 2.</b> Σ 1/n!: raportul este 1/(n + 1) → 0, deci converge. Suma pornind de la n = 0 este e.</div>
<h2>Serii telescopice</h2>
<div class="worked"><b>Exemplu 3.</b> 1/(n(n + 1)) = 1/n − 1/(n + 1). Suma primilor N termeni este 1 − 1/(N + 1), iar seria are suma 1.</div>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Serii de puteri și Taylor', html: `<h2>Raza de convergență</h2>
<p>Σ aₙxⁿ converge pentru |x| &lt; R, unde R = lim |aₙ / aₙ₊₁|, când limita există.</p>
<div class="worked"><b>Exemplu 1.</b> Σ xⁿ/n are R = 1.</div>
<h2>Seria Taylor în 0</h2>
${f('f(x) = f(0) + f′(0)x + f″(0)x²/2! + f‴(0)x³/3! + …')}
${table(['Funcția', 'Seria', 'Valabilă pentru'], [['eˣ', '1 + x + x²/2! + x³/3! + …', 'orice x'], ['sin x', 'x − x³/3! + x⁵/5! − …', 'orice x'], ['cos x', '1 − x²/2! + x⁴/4! − …', 'orice x'], ['1/(1 − x)', '1 + x + x² + …', '|x| &lt; 1'], ['ln(1 + x)', 'x − x²/2 + x³/3 − …', '−1 &lt; x ≤ 1']])}
<div class="worked"><b>Exemplu 2.</b> sin 0,1 ≈ 0,1 − 0,001/6 ≈ 0,09983.</div>` },
      ex([
        [1, 'Calculează suma lui (1/2)ⁿ, de la n = 0.', '<b>2</b>.'],
        [2, 'Calculează suma lui (1/3)ⁿ, de la n = 1.', '<b>1/2</b>.'],
        [3, 'Converge Σ 1/n?', '<b>Nu</b>, p = 1.'],
        [4, 'Converge Σ 1/n²?', '<b>Da</b>, p = 2.'],
      ], [
        [5, 'Converge Σ n/(n + 1)?', 'Termenul tinde la 1, deci <b>diverge</b>.'],
        [6, 'Converge Σ 1/n!?', '<b>Da</b>, după criteriul raportului.'],
        [7, 'Calculează Σₙ₌₁^∞ 1/(n(n + 1)).', 'Seria telescopică: <b>1</b>.'],
        [8, 'Scrie seria lui eˣ până la x³.', '<b>1 + x + x²/2 + x³/6</b>.'],
      ], [
        [9, 'Află raza de convergență a lui Σ xⁿ/n.', '<b>R = 1</b>.'],
        [10, 'Calculează Σₙ₌₁^∞ n/2ⁿ.', 'Raportul tinde la 1/2, deci converge. Suma este <b>2</b>.'],
        [11, 'Aproximează sin 0,1 cu doi termeni.', '<b>0,09983</b>.'],
        [12, 'Scrie seria lui ln(1 + x) până la x³.', '<b>x − x²/2 + x³/3</b>.'],
      ]),
      test([
        ['Calculează suma lui (1/3)ⁿ, de la n = 0.', '3/2', '1 / (1 − 1/3)'],
        ['Calculează suma lui (1/4)ⁿ, de la n = 1.', '1/3', '(1/4) / (3/4)'],
        ['Converge Σ 1/√n?', 'Nu', 'p = 1/2'],
        ['Converge Σ 1/n³?', 'Da', 'p = 3'],
        ['Converge Σ 2n/(n + 3)?', 'Nu', 'Termenul tinde la 2'],
        ['Calculează suma primilor 9 termeni din Σ 1/(n(n + 1)).', '9/10', '1 − 1/10'],
        ['Converge Σ 3ⁿ/n!?', 'Da', 'Raportul 3/(n + 1) tinde la 0'],
        ['Află raza de convergență a lui Σ xⁿ/2ⁿ.', '2', 'Serie geometrică cu q = x/2'],
        ['Scrie seria lui cos x până la x⁴.', '1 − x²/2 + x⁴/24', 'Din tabel'],
        ['Calculează 1 + x + x² + … pentru x = 1/2.', '2', '1 / (1 − x)'],
      ]),
    ],
  };

  window.MATH_WEEK16 = {
    id: 's16', short: 'Săptămâna 16', title: 'Săptămâna 16: Funcții de mai multe variabile', phase: P4,
    tagline: 'Derivate parțiale, gradient, hessiană, integrale duble',
    lead: 'Treci de la o variabilă la mai multe: derivate parțiale, gradient și integrale pe suprafețe.',
    advice: ADV + ' La derivata parțială tratezi celelalte variabile drept constante.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Derivate parțiale și gradient', html: `${NOTA}<h2>Derivate parțiale</h2>
<div class="worked"><b>Exemplu 1.</b> f = x²y. ∂f/∂x = 2xy și ∂f/∂y = x².</div>
<h2>Gradientul</h2>
${f('∇f = (∂f/∂x, ∂f/∂y)')}
<p>Arată direcția de creștere maximă. Derivata pe direcția unui vector unitar u este ∇f · u.</p>
<div class="worked"><b>Exemplu 2.</b> f = x² + y² în (1, 2): ∇f = (2, 4). În (1, 1), pe direcția (1, 0), derivata este 2.</div>
<h2>Hessiana</h2>
<p>Este matricea derivatelor de ordinul doi.</p>
<div class="worked"><b>Exemplu 3.</b> f = x² + xy: fₓₓ = 2, fₓᵧ = 1, fᵧᵧ = 0, deci H = [2 1; 1 0].</div>
<h2>Regula lanțului</h2>
<div class="worked"><b>Exemplu 4.</b> f = sin(xy): ∂f/∂x = y cos(xy).</div>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Integrale duble', html: `<h2>Pe un dreptunghi</h2>
<p>Integrezi pe rând, după o variabilă, iar pe cealaltă o tratezi drept constantă (teorema lui Fubini).</p>
<div class="worked"><b>Exemplu 1.</b> ∫₀¹ ∫₀² xy dy dx = (∫₀¹ x dx)(∫₀² y dy) = (1/2) · 2 = 1.</div>
<h2>Pe alte domenii</h2>
<p>Limitele interioare depind de variabila exterioară.</p>
<div class="worked"><b>Exemplu 2.</b> ∫₀¹ ∫₀ˣ y dy dx = ∫₀¹ x²/2 dx = 1/6.</div>
<h2>Coordonate polare</h2>
${f('x = r cos θ, y = r sin θ, &emsp; dx dy = r dr dθ')}
<div class="worked"><b>Exemplu 3.</b> Aria discului de rază 2: ∫₀^(2π) ∫₀² r dr dθ = 2π · 2 = 4π.</div>` },
      ex([
        [1, 'f = x²y. Află derivatele parțiale.', '<b>fₓ = 2xy, fᵧ = x²</b>.'],
        [2, 'f = 3x + 2y². Află gradientul.', '<b>(3, 4y)</b>.'],
        [3, 'f = x² + y². Află gradientul în (1, 2).', '<b>(2, 4)</b>.'],
        [4, 'Calculează ∫₀¹ ∫₀¹ 1 dx dy.', '<b>1</b>.'],
      ], [
        [5, 'f = x eʸ. Află derivatele parțiale.', '<b>fₓ = eʸ, fᵧ = x eʸ</b>.'],
        [6, 'Află hessiana lui x² + xy.', '<b>[2 1; 1 0]</b>.'],
        [7, 'Calculează ∫₀¹ ∫₀² xy dy dx.', '<b>1</b>.'],
        [8, 'f = x² + y². Derivata în (1, 1) pe direcția (1, 0).', '∇f · u = <b>2</b>.'],
      ], [
        [9, 'f = sin(xy). Află fₓ.', '<b>y cos(xy)</b>.'],
        [10, 'Aria triunghiului 0 ≤ y ≤ x ≤ 1, cu integrală dublă.', '∫₀¹ x dx = <b>1/2</b>.'],
        [11, 'Calculează ∫₀¹ ∫₀ˣ y dy dx.', '<b>1/6</b>.'],
        [12, 'Aria discului de rază 2, în coordonate polare.', '<b>4π</b>.'],
      ]),
      test([
        ['f = x³y². Află fₓ.', '3x²y²', 'y constant'],
        ['f = x³y². Află fᵧ.', '2x³y', 'x constant'],
        ['f = x² + 3y. Află gradientul în (2, 1).', '(4, 3)', '(2x, 3)'],
        ['f = ln(x + y). Află fₓ.', '1/(x + y)', 'Regula lanțului'],
        ['f = x²y³. Află derivata mixtă fₓᵧ.', '6xy²', 'fₓ = 2xy³'],
        ['Calculează ∫₀¹ ∫₀¹ (x + y) dx dy.', '1', '1/2 + 1/2'],
        ['Calculează ∫₀² ∫₀¹ x dx dy.', '1', '2 · 1/2'],
        ['Află hessiana lui x² + y².', '[2 0; 0 2]', 'Derivatele de ordinul doi'],
        ['f = e^(xy). Află fᵧ.', 'x e^(xy)', 'Regula lanțului'],
        ['Aria discului de rază 3, în coordonate polare.', '9π', '2π · 9/2'],
      ]),
    ],
  };

  window.MATH_WEEK17 = {
    id: 's17', short: 'Săptămâna 17', title: 'Săptămâna 17: Optimizare', phase: P4,
    tagline: 'Puncte critice, gradient descent, Lagrange, plus testul mare al Fazei 4',
    lead: 'Închide Faza 4: găsești minime și maxime, folosești coborârea pe gradient și multiplicatorii Lagrange.',
    advice: ADV + ' După ce găsești un punct critic, verifică și tipul lui, cu hessiana.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Puncte critice și gradient descent', html: `${NOTA}<h2>Puncte critice</h2>
<p>Rezolvi ∇f = 0. Tipul îl dă hessiana, cu D = det H.</p>
${table(['Condiție', 'Tip'], [['D > 0 și fₓₓ > 0', 'minim'], ['D > 0 și fₓₓ &lt; 0', 'maxim'], ['D &lt; 0', 'punct șa'], ['D = 0', 'testul nu decide']])}
<div class="worked"><b>Exemplu 1.</b> f = x² + y² − 4x + 6y. ∇f = 0 dă (2, −3). H = [2 0; 0 2], deci minim, iar f(2, −3) = −13.</div>
<div class="worked"><b>Exemplu 2.</b> f = x² − y²: în (0, 0), D = −4, deci punct șa.</div>
<h2>Convexitate</h2>
<p>Dacă hessiana are toate valorile proprii pozitive peste tot, f este strict convexă, iar punctul critic este minimul global.</p>
<h2>Coborârea pe gradient</h2>
${f('xₖ₊₁ = xₖ − η ∇f(xₖ)')}
<div class="worked"><b>Exemplu 3.</b> f = x² + y², η = 0,1, din (1, 2): ∇f = (2, 4), deci noul punct este (0,8; 1,6).</div>
<p>Dacă η este prea mare, metoda poate diverge. Dacă este prea mic, merge foarte încet.</p>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Multiplicatori Lagrange', html: `<h2>Ideea</h2>
<p>Pentru a optimiza f cu restricția g = 0, la optim gradienții sunt paraleli.</p>
${f('∇f = λ ∇g, &emsp; g = 0')}
<div class="worked"><b>Exemplu 1.</b> Maximizează xy cu x + y = 10. (y, x) = λ(1, 1) dă x = y = 5. Maximul este 25.</div>
<div class="worked"><b>Exemplu 2.</b> Minimizează x² + y² cu x + y = 2. (2x, 2y) = λ(1, 1) dă x = y = 1. Minimul este 2.</div>
<div class="worked"><b>Exemplu 3.</b> Maximizează x + y cu x² + y² = 2. (1, 1) = λ(2x, 2y) dă x = y. Maximul este în (1, 1) și valorează 2.</div>` },
      ex([
        [1, 'Află punctul critic al lui x² + y².', '<b>(0, 0)</b>.'],
        [2, 'Află punctul critic al lui x² − 2x + y².', '<b>(1, 0)</b>.'],
        [3, 'f = x², x₀ = 1, η = 0,25. Află x₁.', '1 − 0,25 · 2 = <b>0,5</b>.'],
        [4, 'Scrie condițiile Lagrange pentru f și restricția g = 0.', '<b>∇f = λ∇g și g = 0</b>.'],
      ], [
        [5, 'Ce tip are (0, 0) pentru x² − y²?', '<b>Punct șa</b>.'],
        [6, 'Află minimul lui x² + y² − 4x + 6y.', 'În (2, −3), valoarea <b>−13</b>.'],
        [7, 'Maximizează xy cu x + y = 10.', '<b>25</b>, în (5, 5).'],
        [8, 'Minimizează x² + y² cu x + y = 2.', '<b>2</b>, în (1, 1).'],
      ], [
        [9, 'f = x² + y², η = 0,1, din (1, 2). Fă un pas.', '<b>(0,8; 1,6)</b>.'],
        [10, 'Clasifică punctele critice ale lui x³ − 3x + y².', '<b>(1, 0) minim, (−1, 0) punct șa</b>.'],
        [11, 'Maximizează x + y cu x² + y² = 2.', '<b>2</b>, în (1, 1).'],
        [12, 'Este x² + xy + y² convexă?', 'H = [2 1; 1 2] are valorile proprii 1 și 3: <b>da</b>.'],
      ]),
      test([
        ['Află punctul critic al lui x² + 2y² − 4y.', '(0, 1)', '2x = 0, 4y − 4 = 0'],
        ['Ce tip are (0, 0) pentru xy?', 'Punct șa', 'D = −1'],
        ['Află minimul lui x² + y² − 2x.', '−1', 'În (1, 0)'],
        ['f = (x − 3)², x₀ = 0, η = 0,25. Află x₁.', '1,5', 'f′(0) = −6'],
        ['Continuă: află x₂.', '2,25', 'f′(1,5) = −3'],
        ['Minimizează x² + y² cu x + 2y = 5.', '5, în (1, 2)', 'x = λ/2, y = λ'],
        ['Maximizează xy cu 2x + y = 8.', '8, în (2, 4)', 'x(8 − 2x)'],
        ['Cât este det H pentru x² + y²?', '4', 'H = 2I'],
        ['Este −x² convexă?', 'Nu', 'A doua derivată este −2'],
        ['Află minimul lui x² + y² − 2x − 4y + 5.', '0, în (1, 2)', '(x − 1)² + (y − 2)²'],
      ]),
      big('Testul mare al Fazei 4', [
        ['Calculează (1, 2) · (3, −1).', '1', '3 − 2'],
        ['Află rangul lui [1 2; 3 6].', '1', 'Rânduri proporționale'],
        ['Află valorile proprii ale lui [3 1; 1 3].', '2 și 4', 'λ² − 6λ + 8 = 0'],
        ['Găsește un vector propriu pentru λ = 4 la matricea de mai sus.', '(1, 1)', '−x + y = 0'],
        ['Află valorile singulare ale lui [6 0; 0 2].', '6 și 2', 'Matrice diagonală pozitivă'],
        ['Proiectează (2, 2) pe (1, 0).', '(2, 0)', 'Prima componentă'],
        ['Calculează suma lui (2/3)ⁿ, de la n = 0.', '3', '1 / (1 − 2/3)'],
        ['Converge Σ 1/n²?', 'Da', 'p = 2'],
        ['f = x²y + y³. Află fₓ.', '2xy', 'y constant'],
        ['Calculează ∫₀¹ ∫₀¹ xy dx dy.', '1/4', '(1/2)(1/2)'],
        ['Află minimul lui x² + y² − 6x.', '−9, în (3, 0)', '(x − 3)² + y² − 9'],
        ['Maximizează xy cu x + y = 6.', '9, în (3, 3)', 'x(6 − x)'],
      ]),
    ],
  };
})();
