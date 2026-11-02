// Matematica, saptamanile 5-11: restul Fazei 2 si Faza 3 din planul tau, in acelasi format.
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const f = (html) => `<p class="formula">${html}</p>`;
  const BAREM = '5 puncte pentru metodă corectă și 5 puncte pentru rezultat, la fiecare problemă.';
  const INSTR = 'Zece probleme, câte 10 puncte fiecare, total 100 de puncte. Lucrează fără calculator și fără lecții, apoi corectează cu rezolvările.';
  const BIG = 'Testul mare al fazei. Douăsprezece probleme, cu punctaj egal. Sub 70% mai faci o săptămână de consolidare înainte să treci mai departe.';
  const P2 = 'Faza 2 · Liceu 9–10';
  const P3 = 'Faza 3 · Liceu 11–12';
  const ADV = 'Refă exemplele pe hârtie fără să te uiți la soluție. La exerciții încearcă cel puțin 5 minute înainte să deschizi rezolvarea.';
  const ex = (a, b, c) => ({ n: 3, kind: 'exercises', minutes: 60, title: 'Exerciții (ușor → provocator)', tiers: [
    { title: 'Treapta A – Încălzire', items: a }, { title: 'Treapta B – Aplicații', items: b }, { title: 'Treapta C – Provocări', items: c },
  ] });
  const test = (problems) => ({ n: 4, kind: 'test', minutes: 45, title: 'Test cronometrat și corectare', test: { minutes: 30, instr: INSTR, barem: BAREM, problems } });
  const big = (title, problems) => ({ n: 5, kind: 'test', minutes: 120, title, test: { minutes: 90, instr: BIG, barem: BAREM, problems } });

  window.MATH_WEEK5 = {
    id: 's5', short: 'Săptămâna 5', title: 'Săptămâna 5: Ecuații, inecuații și progresii', phase: P2,
    tagline: 'Inecuații de gradul II, radicali, exponențiale, logaritmi, progresii',
    lead: 'Rezolvi inecuații de gradul II și ecuații cu radicali, exponențiale și logaritmi, apoi lucrezi cu progresii.',
    advice: ADV + ' La radicali și logaritmi, verifică mereu condițiile de existență.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Inecuații și ecuații speciale', html: `<h2>Inecuația de gradul II</h2>
<p>Afli rădăcinile, apoi folosești semnul funcției: între rădăcini are semn contrar lui a, în afara lor are semnul lui a.</p>
<div class="worked"><b>Exemplu 1.</b> x² − 5x + 6 &lt; 0. Rădăcinile sunt 2 și 3, iar a = 1 &gt; 0. Expresia este negativă între rădăcini: x ∈ (2, 3).</div>
<h2>Ecuații cu radicali</h2>
<p>Scrii condiția de existență, ridici la pătrat și verifici soluțiile în ecuația inițială.</p>
<div class="worked"><b>Exemplu 2.</b> √(2x + 3) = x. Ridicăm la pătrat: x² − 2x − 3 = 0, deci x = 3 sau x = −1. Membrul drept trebuie să fie pozitiv, deci rămâne x = 3.</div>
<h2>Ecuații exponențiale</h2>
${f('a<sup>x</sup> = a<sup>y</sup> ⇔ x = y, &emsp; a &gt; 0, a ≠ 1')}
<div class="worked"><b>Exemplu 3.</b> 3<sup>2x−1</sup> = 27 = 3³. Deci 2x − 1 = 3 și x = 2.</div>
<h2>Logaritmi</h2>
${f('log<sub>a</sub> b = c ⇔ a<sup>c</sup> = b, &emsp; a &gt; 0, a ≠ 1, b &gt; 0')}
${table(['Regulă', 'Formulă'], [['Produs', 'log(xy) = log x + log y'], ['Cât', 'log(x/y) = log x − log y'], ['Putere', 'log(xⁿ) = n · log x']])}
<div class="worked"><b>Exemplu 4.</b> lg x + lg(x − 3) = 1, cu x &gt; 3. Avem x(x − 3) = 10, deci x = 5 sau x = −2. Condiția lasă doar x = 5.</div>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Progresii aritmetice și geometrice', html: `<h2>Progresia aritmetică</h2>
<p>Fiecare termen se obține adunând aceeași rație r.</p>
${f('a<sub>n</sub> = a<sub>1</sub> + (n − 1)r &emsp; S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>) / 2')}
<div class="worked"><b>Exemplu 1.</b> a₂ = 5 și a₆ = 17. Atunci 4r = 12, r = 3, a₁ = 2. S₁₀ = 10(4 + 27) / 2 = 155.</div>
<h2>Progresia geometrică</h2>
<p>Fiecare termen se obține înmulțind cu aceeași rație q.</p>
${f('b<sub>n</sub> = b<sub>1</sub> · q<sup>n−1</sup> &emsp; S<sub>n</sub> = b<sub>1</sub>(qⁿ − 1) / (q − 1), q ≠ 1')}
<div class="worked"><b>Exemplu 2.</b> 1 + 2 + 4 + … + 2⁹ are 10 termeni, q = 2. Suma este 2¹⁰ − 1 = 1023.</div>
<div class="worked"><b>Exemplu 3.</b> Trei numere în progresie aritmetică se notează a − r, a, a + r. Dacă suma lor este 15, atunci a = 5.</div>` },
      ex([
        [1, 'Rezolvă x² − 5x + 6 < 0.', 'Rădăcinile 2 și 3, a &gt; 0: <b>x ∈ (2, 3)</b>.'],
        [2, 'Rezolvă 2ˣ = 32.', '32 = 2⁵, deci <b>x = 5</b>.'],
        [3, 'Calculează log₂ 8.', '2³ = 8, deci <b>3</b>.'],
        [4, 'Rezolvă √(x + 1) = 3.', 'x + 1 = 9, deci <b>x = 8</b>.'],
        [5, 'a₁ = 3, r = 4. Află a₁₀.', '3 + 9 · 4 = <b>39</b>.'],
        [6, 'b₁ = 2, q = 3. Află b₅.', '2 · 3⁴ = <b>162</b>.'],
      ], [
        [7, 'Rezolvă x² − 4 ≥ 0.', '<b>x ≤ −2 sau x ≥ 2</b>.'],
        [8, 'Rezolvă 3^(2x − 1) = 27.', '2x − 1 = 3, deci <b>x = 2</b>.'],
        [9, 'Rezolvă log₃(x − 1) = 2.', 'x − 1 = 9, deci <b>x = 10</b>.'],
        [10, 'Calculează 1 + 2 + … + 20.', '20 · 21 / 2 = <b>210</b>.'],
        [11, 'Rezolvă √(2x + 3) = x.', 'x² − 2x − 3 = 0 dă 3 și −1. Cum x ≥ 0: <b>x = 3</b>.'],
        [12, 'a₂ = 5, a₆ = 17. Află S₁₀.', 'r = 3, a₁ = 2, S₁₀ = 5(4 + 27) = <b>155</b>.'],
      ], [
        [13, 'Rezolvă lg x + lg(x − 3) = 1.', 'x(x − 3) = 10 dă 5 și −2. Cu x &gt; 3: <b>x = 5</b>.'],
        [14, 'Rezolvă 4ˣ − 5 · 2ˣ + 4 = 0.', 'Cu t = 2ˣ: t² − 5t + 4 = 0, t = 1 sau t = 4. Deci <b>x = 0 sau x = 2</b>.'],
        [15, 'Calculează 1 + 2 + 4 + … + 2⁹.', '2¹⁰ − 1 = <b>1023</b>.'],
        [16, 'Trei numere în progresie aritmetică au suma 15 și produsul 80. Află-le.', 'a = 5; 5(25 − r²) = 80, deci r² = 9. Numerele: <b>2, 5, 8</b>.'],
      ]),
      test([
        ['Rezolvă x² − 7x + 10 ≤ 0.', 'x ∈ [2, 5]', 'Rădăcinile 2 și 5, a > 0'],
        ['Rezolvă 5ˣ⁺¹ = 125.', 'x = 2', 'x + 1 = 3'],
        ['Rezolvă log₂(x + 3) = 4.', 'x = 13', 'x + 3 = 16'],
        ['Rezolvă √(x − 2) = 4.', 'x = 18', 'x − 2 = 16'],
        ['a₁ = 7, r = −2. Află a₈.', '−7', '7 + 7 · (−2)'],
        ['b₁ = 5, q = 2. Află b₄.', '40', '5 · 2³'],
        ['Calculează 1 + 3 + 5 + … + 19.', '100', '10 termeni: 10 · (1 + 19) / 2'],
        ['Rezolvă 9ˣ = 3ˣ⁺².', 'x = 2', '2x = x + 2'],
        ['Calculează log₃ 81 − log₃ 3.', '3', '4 − 1'],
        ['Rezolvă −x² + x + 6 > 0.', 'x ∈ (−2, 3)', 'Rădăcinile −2 și 3, a < 0, pozitiv între ele'],
      ]),
    ],
  };

  window.MATH_WEEK6 = {
    id: 's6', short: 'Săptămâna 6', title: 'Săptămâna 6: Trigonometrie și geometrie analitică', phase: P2,
    tagline: 'Sinus, cosinus, legi în triunghi, drepte în plan',
    lead: 'Reiei trigonometria în triunghi și pe cerc, apoi descrii puncte și drepte cu ajutorul coordonatelor.',
    advice: ADV + ' Desenează triunghiul sau sistemul de axe la fiecare problemă.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Trigonometrie', html: `<h2>În triunghiul dreptunghic</h2>
${f('sin = opusă / ipotenuză &emsp; cos = alăturată / ipotenuză &emsp; tg = opusă / alăturată')}
${table(['Unghi', '30°', '45°', '60°', '90°'], [['sin', '1/2', '√2/2', '√3/2', '1'], ['cos', '√3/2', '√2/2', '1/2', '0'], ['tg', '√3/3', '1', '√3', 'nu există']])}
<h2>Formula fundamentală</h2>
${f('sin²x + cos²x = 1')}
<div class="worked"><b>Exemplu 1.</b> sin x = 3/5, x ascuțit. cos²x = 1 − 9/25 = 16/25, deci cos x = 4/5.</div>
<h2>Cercul trigonometric</h2>
<p>sin(180° − x) = sin x. De aceea sin x = 1/2 are, pe [0°, 360°], soluțiile 30° și 150°.</p>
<h2>Legile din orice triunghi</h2>
${f('a / sin A = b / sin B = c / sin C')}
${f('a² = b² + c² − 2bc · cos A')}
${f('Aria = (1/2) · b · c · sin A')}
<div class="worked"><b>Exemplu 2.</b> b = 3, c = 4, A = 60°. a² = 9 + 16 − 12 = 13, deci a = √13.</div>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Geometrie analitică', html: `<h2>Puncte</h2>
${f('AB = √((x₂ − x₁)² + (y₂ − y₁)²)')}
${f('Mijlocul: ((x₁ + x₂)/2, (y₁ + y₂)/2)')}
<div class="worked"><b>Exemplu 1.</b> A(1, 2), B(4, 6): AB = √(9 + 16) = 5. Mijlocul este (2,5; 4).</div>
<h2>Dreapta</h2>
${f('y = mx + n, &emsp; m = (y₂ − y₁) / (x₂ − x₁)')}
${table(['Poziție', 'Condiție'], [['Paralele', 'm₁ = m₂'], ['Perpendiculare', 'm₁ · m₂ = −1']])}
<div class="worked"><b>Exemplu 2.</b> Perpendiculara pe y = 2x + 1 prin (0, 3) are panta −1/2: y = −x/2 + 3.</div>
<div class="worked"><b>Exemplu 3.</b> Intersecția dreptelor y = 2x − 1 și y = −x + 5: 2x − 1 = −x + 5, deci x = 2, y = 3.</div>` },
      ex([
        [1, 'Cât este sin 30°?', '<b>1/2</b>.'],
        [2, 'Cât este tg 45°?', '<b>1</b>.'],
        [3, 'Distanța dintre A(1, 2) și B(4, 6).', '√(9 + 16) = <b>5</b>.'],
        [4, 'Mijlocul segmentului cu capetele (2, 3) și (6, 7).', '<b>(4, 5)</b>.'],
        [5, 'Panta dreptei prin (1, 1) și (3, 5).', '4 / 2 = <b>2</b>.'],
        [6, 'sin x = 3/5, x ascuțit. Află cos x.', '<b>4/5</b>.'],
      ], [
        [7, 'Ipotenuza este 10, iar un unghi are 30°. Află cateta opusă.', '10 · 1/2 = <b>5</b>.'],
        [8, 'b = 3, c = 4, A = 60°. Află a.', 'a² = 9 + 16 − 12 = 13, deci <b>a = √13</b>.'],
        [9, 'Dreapta prin (0, 1) cu panta 3.', '<b>y = 3x + 1</b>.'],
        [10, 'Perpendiculara pe y = 2x + 1 prin (0, 3).', '<b>y = −x/2 + 3</b>.'],
        [11, 'Calculează sin²20° + cos²20°.', '<b>1</b>.'],
        [12, 'b = 6, c = 8, A = 30°. Află aria.', '(1/2) · 6 · 8 · (1/2) = <b>12</b>.'],
      ], [
        [13, 'Rezolvă sin x = 1/2 pe [0°, 360°].', '<b>30° și 150°</b>.'],
        [14, 'a = 10, A = 30°, B = 90°. Află b.', 'b = 10 · sin 90° / sin 30° = <b>20</b>.'],
        [15, 'Intersecția dreptelor y = 2x − 1 și y = −x + 5.', '3x = 6, deci <b>(2, 3)</b>.'],
        [16, 'A(0, 0), B(4, 0), C(0, 3). Află perimetrul și aria.', 'Laturile 4, 3, 5: perimetrul <b>12</b>, aria <b>6</b>.'],
      ]),
      test([
        ['Cât este cos 60°?', '1/2', 'Din tabel'],
        ['Cât este sin 90°?', '1', 'Din tabel'],
        ['Cât este tg 30°?', '√3/3', 'Din tabel'],
        ['sin x = 5/13, x ascuțit. Află cos x.', '12/13', '1 − 25/169 = 144/169'],
        ['Distanța dintre (−1, 2) și (2, 6).', '5', '√(9 + 16)'],
        ['Mijlocul segmentului (−2, 4), (6, 0).', '(2, 2)', 'Media coordonatelor'],
        ['Dreapta prin (1, 2) și (3, 8).', 'y = 3x − 1', 'm = 3, apoi n = −1'],
        ['b = 5, c = 8, A = 60°. Află a.', '7', '25 + 64 − 40 = 49'],
        ['Paralela la y = 4x − 3 prin (1, 6).', 'y = 4x + 2', 'm = 4, 6 = 4 + n'],
        ['Rezolvă sin x = √2/2 pe [0°, 360°].', '45° și 135°', 'sin(180° − x) = sin x'],
      ]),
    ],
  };

  window.MATH_WEEK7 = {
    id: 's7', short: 'Săptămâna 7', title: 'Săptămâna 7: Combinatorică și probabilități', phase: P2,
    tagline: 'Permutări, aranjamente, combinări, probabilități, plus testul mare al Fazei 2',
    lead: 'Închide Faza 2: numeri posibilități, calculezi probabilități simple și dai testul mare al fazei.',
    advice: ADV + ' Întreabă-te mereu dacă ordinea contează: asta decide între aranjamente și combinări.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Combinatorică și binomul lui Newton', html: `<h2>Formule</h2>
${table(['Noțiune', 'Când', 'Formulă'], [['Permutări', 'așezi toate cele n elemente', 'Pₙ = n!'], ['Aranjamente', 'alegi k din n, ordinea contează', 'Aₙᵏ = n! / (n − k)!'], ['Combinări', 'alegi k din n, ordinea nu contează', 'Cₙᵏ = n! / (k!(n − k)!)']])}
<div class="worked"><b>Exemplu 1.</b> Un comitet de 3 persoane din 8: ordinea nu contează, deci C₈³ = 56.</div>
<div class="worked"><b>Exemplu 2.</b> Un cod din 3 cifre distincte: ordinea contează, deci A₁₀³ = 720.</div>
<h2>Binomul lui Newton</h2>
${f('(a + b)ⁿ = Σ Cₙᵏ aⁿ⁻ᵏ bᵏ')}
<div class="worked"><b>Exemplu 3.</b> (a + b)³ = a³ + 3a²b + 3ab² + b³.</div>
<p>Suma tuturor combinărilor: Cₙ⁰ + Cₙ¹ + … + Cₙⁿ = 2ⁿ.</p>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Probabilități', html: `<h2>Definiția clasică</h2>
${f('P(A) = cazuri favorabile / cazuri posibile')}
<div class="worked"><b>Exemplu 1.</b> Două zaruri, suma 7: 6 cazuri favorabile din 36, deci P = 1/6.</div>
<h2>Reguli</h2>
${table(['Situație', 'Formulă'], [['Evenimentul contrar', 'P(non A) = 1 − P(A)'], ['Evenimente care se exclud', 'P(A sau B) = P(A) + P(B)'], ['Evenimente independente', 'P(A și B) = P(A) · P(B)']])}
<div class="worked"><b>Exemplu 2.</b> Cel puțin o stemă la 3 aruncări: contrarul este „nicio stemă”, cu P = 1/8. Rezultatul: 7/8.</div>
<div class="worked"><b>Exemplu 3.</b> Urnă cu 3 bile roșii și 5 albastre, două extrageri fără punere la loc, ambele roșii: (3/8)(2/7) = 3/28.</div>` },
      ex([
        [1, 'Calculează 5!.', '<b>120</b>.'],
        [2, 'Calculează C₅².', '<b>10</b>.'],
        [3, 'Calculează A₅².', '5 · 4 = <b>20</b>.'],
        [4, 'Probabilitatea de stemă la o aruncare.', '<b>1/2</b>.'],
        [5, 'Probabilitatea unui număr par la zar.', '3/6 = <b>1/2</b>.'],
        [6, 'Dezvoltă (a + b)³.', '<b>a³ + 3a²b + 3ab² + b³</b>.'],
      ], [
        [7, 'În câte feluri așezi 4 cărți pe raft?', '4! = <b>24</b>.'],
        [8, 'Câte coduri de 3 cifre distincte există?', '10 · 9 · 8 = <b>720</b>.'],
        [9, 'Câte comitete de 3 din 8 persoane există?', 'C₈³ = <b>56</b>.'],
        [10, 'Două zaruri: probabilitatea sumei 7.', '6/36 = <b>1/6</b>.'],
        [11, 'Urnă cu 3 bile roșii și 5 albastre: probabilitatea unei bile roșii.', '<b>3/8</b>.'],
        [12, 'Rezolvă Cₙ² = 15.', 'n(n − 1) = 30, deci <b>n = 6</b>.'],
      ], [
        [13, 'Aceeași urnă, două extrageri fără punere la loc, ambele roșii.', '(3/8)(2/7) = <b>3/28</b>.'],
        [14, 'Coeficientul lui x² din (x + 2)⁵.', 'C₅² · 2³ = <b>80</b>.'],
        [15, 'Cel puțin o stemă la 3 aruncări.', '1 − 1/8 = <b>7/8</b>.'],
        [16, 'Calculează C₆⁰ + C₆¹ + … + C₆⁶.', '2⁶ = <b>64</b>.'],
      ]),
      test([
        ['Calculează 6! / 4!.', '30', '6 · 5'],
        ['Calculează C₇³.', '35', '7 · 6 · 5 / 6'],
        ['Calculează A₆².', '30', '6 · 5'],
        ['Probabilitatea unui număr mai mare ca 4 la zar.', '1/3', '2 din 6'],
        ['3 cămăși și 4 pantaloni: câte ținute?', '12', '3 · 4'],
        ['Dezvoltă (x + 1)⁴.', 'x⁴ + 4x³ + 6x² + 4x + 1', 'Coeficienții 1, 4, 6, 4, 1'],
        ['Urnă cu 4 bile albe și 6 negre: probabilitatea unei bile albe.', '2/5', '4/10'],
        ['Rezolvă Cₙ² = 10.', 'n = 5', 'n(n − 1) = 20'],
        ['Două monede: probabilitatea a două steme.', '1/4', '(1/2)(1/2)'],
        ['A și B se exclud, P(A) = 0,3 și P(B) = 0,5. Află P(A sau B).', '0,8', '0,3 + 0,5'],
      ]),
      big('Testul mare al Fazei 2', [
        ['Află zeroul funcției f(x) = 2x − 6.', 'x = 3', '2x = 6'],
        ['Află vârful parabolei y = x² − 4x + 1.', '(2, −3)', 'x = −b/2a = 2, y = 4 − 8 + 1'],
        ['Rezolvă x² − 3x − 4 ≤ 0.', 'x ∈ [−1, 4]', 'Rădăcinile −1 și 4, a > 0'],
        ['Rezolvă log₂(x − 1) = 3.', 'x = 9', 'x − 1 = 8'],
        ['a₁ = 2, r = 3. Află S₁₀.', '155', '10(4 + 27) / 2'],
        ['sin x = 4/5, x ascuțit. Află tg x.', '4/3', 'cos x = 3/5'],
        ['Distanța dintre (1, 1) și (4, 5).', '5', '√(9 + 16)'],
        ['Perpendiculara pe y = 3x + 1 prin (3, 0).', 'y = −x/3 + 1', 'm = −1/3, 0 = −1 + n'],
        ['Calculează C₁₀².', '45', '10 · 9 / 2'],
        ['Două zaruri: probabilitatea sumei 10.', '1/12', '3 cazuri din 36'],
        ['Rezolvă 4ˣ = 8.', 'x = 3/2', '2x = 3'],
        ['b = 7, c = 8, A = 60°. Află a.', '√57', '49 + 64 − 56 = 57'],
      ]),
    ],
  };

  const NOTA = '<p class="note">Scriem matricele pe un rând: [1 2; 3 4] înseamnă rândul 1 2 și rândul 3 4.</p>';

  window.MATH_WEEK8 = {
    id: 's8', short: 'Săptămâna 8', title: 'Săptămâna 8: Matrice și determinanți', phase: P3,
    tagline: 'Începutul Fazei 3: operații cu matrice, determinanți, inversa',
    lead: 'Prima săptămână din Faza 3: operații cu matrice, determinanți de ordin 2 și 3 și matricea inversă.',
    advice: ADV + ' Înmulțirea matricelor se face „rând pe coloană” și nu este comutativă.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 45, title: 'Operații cu matrice', html: `${NOTA}<h2>Adunare și înmulțire cu un număr</h2>
<p>Se fac element cu element.</p>
<div class="worked"><b>Exemplu 1.</b> [1 2; 3 4] + [0 1; 1 0] = [1 3; 4 4].</div>
<h2>Înmulțirea matricelor</h2>
<p>Elementul din rândul i și coloana j este produsul rândului i din prima matrice cu coloana j din a doua. În general, AB ≠ BA.</p>
<div class="worked"><b>Exemplu 2.</b> [1 2; 0 1] · [1 0; 3 1]. Primul rând: 1 · 1 + 2 · 3 = 7 și 1 · 0 + 2 · 1 = 2. Al doilea rând: 3 și 1. Rezultatul: [7 2; 3 1].</div>
<h2>Transpusa și urma</h2>
<p>Transpusa schimbă rândurile cu coloanele. Urma este suma elementelor de pe diagonala principală.</p>` },
      { n: 2, kind: 'lesson', minutes: 50, title: 'Determinanți și inversa', html: `${NOTA}<h2>Ordinul 2</h2>
${f('det [a b; c d] = ad − bc')}
<h2>Ordinul 3</h2>
<p>Dezvoltăm după primul rând:</p>
<div class="worked"><b>Exemplu 1.</b> det [1 0 2; 0 1 3; 1 1 1] = 1(1 · 1 − 3 · 1) − 0 + 2(0 · 1 − 1 · 1) = −2 − 2 = −4.</div>
<h2>Proprietăți</h2>
${table(['Proprietate', 'Formulă'], [['Produs', 'det(AB) = det A · det B'], ['Număr, ordin n', 'det(kA) = kⁿ · det A'], ['Triunghiulară', 'produsul diagonalei']])}
<h2>Inversa</h2>
<p>Există dacă și numai dacă det A ≠ 0.</p>
${f('[a b; c d]⁻¹ = (1 / (ad − bc)) · [d −b; −c a]')}
<div class="worked"><b>Exemplu 2.</b> [2 1; 1 1] are det = 1, deci inversa este [1 −1; −1 2].</div>` },
      ex([
        [1, 'Calculează [1 2; 3 4] + [0 1; 1 0].', '<b>[1 3; 4 4]</b>.'],
        [2, 'Calculează 2 · [1 −1; 0 3].', '<b>[2 −2; 0 6]</b>.'],
        [3, 'Calculează det [2 3; 1 4].', '8 − 3 = <b>5</b>.'],
        [4, 'Calculează det [1 2; 2 4].', '4 − 4 = <b>0</b>.'],
        [5, 'Transpusa lui [1 2; 3 4].', '<b>[1 3; 2 4]</b>.'],
        [6, 'Calculează [1 2; 0 1] · [1 0; 3 1].', '<b>[7 2; 3 1]</b>.'],
      ], [
        [7, 'Inversa lui [2 1; 1 1].', '<b>[1 −1; −1 2]</b>.'],
        [8, 'Calculează det [1 0 2; 0 1 3; 1 1 1].', '<b>−4</b>.'],
        [9, 'Pentru ce m este det [m 2; 3 6] = 0?', '6m − 6 = 0, deci <b>m = 1</b>.'],
        [10, 'A = [1 1; 0 1]. Calculează A².', '<b>[1 2; 0 1]</b>.'],
        [11, 'A este de ordin 2 și det A = 3. Află det(2A).', '2² · 3 = <b>12</b>.'],
        [12, 'Calculează [1 2; 3 4] · [1; 1].', '<b>[3; 7]</b>.'],
      ], [
        [13, 'A = [1 1; 0 1]. Găsește Aⁿ.', '<b>[1 n; 0 1]</b>, prin inducție.'],
        [14, 'det A = 2, det B = −3. Află det(AB).', '<b>−6</b>.'],
        [15, 'Pentru ce m nu este inversabilă [1 m; m 4]?', '4 − m² = 0, deci <b>m = ±2</b>.'],
        [16, 'O matrice triunghiulară are diagonala 2, 3, 4. Află determinantul.', '<b>24</b>.'],
      ]),
      test([
        ['Calculează [2 0; 1 3] + [1 1; 1 1].', '[3 1; 2 4]', 'Element cu element'],
        ['Calculează det [3 1; 2 5].', '13', '15 − 2'],
        ['Calculează det [1 2 3; 0 1 4; 0 0 2].', '2', 'Matrice triunghiulară'],
        ['Calculează [1 0; 2 1] · [1 3; 0 1].', '[1 3; 2 7]', 'Rând pe coloană'],
        ['Inversa lui [1 2; 0 1].', '[1 −2; 0 1]', 'det = 1'],
        ['A de ordin 2, det A = 2. Află det(3A).', '18', '3² · 2'],
        ['Pentru ce m este det [m 1; 4 m] = 0?', 'm = ±2', 'm² − 4 = 0'],
        ['Urma matricei [1 2; 3 4].', '5', '1 + 4'],
        ['det A = −2. Află det(A²).', '4', '(−2)²'],
        ['A = [0 1; 1 0]. Calculează A².', '[1 0; 0 1]', 'Rând pe coloană'],
      ]),
    ],
  };

  window.MATH_WEEK9 = {
    id: 's9', short: 'Săptămâna 9', title: 'Săptămâna 9: Sisteme și limite', phase: P3,
    tagline: 'Regula lui Cramer, limite de șiruri și funcții, continuitate',
    lead: 'Rezolvi sisteme cu determinanți, apoi lucrezi cu limite și continuitate.',
    advice: ADV + ' La limite, înlocuiește mai întâi și vezi dacă apare o nedeterminare.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 45, title: 'Sisteme de ecuații liniare', html: `<h2>Regula lui Cramer</h2>
<p>Pentru ax + by = e și cx + dy = g, dacă Δ = ad − bc ≠ 0, soluția este unică.</p>
${f('x = Δₓ / Δ, &emsp; y = Δᵧ / Δ')}
<p>Δₓ se obține înlocuind coloana lui x cu termenii liberi, iar Δᵧ înlocuind coloana lui y.</p>
<div class="worked"><b>Exemplu 1.</b> 2x + y = 5 și x + 3y = 5. Δ = 5, Δₓ = 15 − 5 = 10, Δᵧ = 10 − 5 = 5. Deci x = 2, y = 1.</div>
<h2>Metoda lui Gauss</h2>
<p>Elimini necunoscutele pas cu pas până ajungi la o formă triunghiulară, apoi rezolvi de jos în sus.</p>
<div class="worked"><b>Exemplu 2.</b> x + y + z = 6, y + z = 5, z = 2. De jos în sus: z = 2, y = 3, x = 1.</div>` },
      { n: 2, kind: 'lesson', minutes: 50, title: 'Limite și continuitate', html: `<h2>Cazuri de bază</h2>
${table(['Situație', 'Rezultat'], [['1/n, când n → ∞', '0'], ['raport de polinoame de același grad', 'raportul coeficienților dominanți'], ['(1 + 1/n)ⁿ, când n → ∞', 'e'], ['sin x / x, când x → 0', '1']])}
<h2>Nedeterminări</h2>
<p>La 0/0 descompui în factori și simplifici.</p>
<div class="worked"><b>Exemplu 1.</b> (x² − 9)/(x − 3) = x + 3, deci limita în 3 este 6.</div>
<p>La ∞ − ∞ cu radicali înmulțești cu conjugata.</p>
<div class="worked"><b>Exemplu 2.</b> √(x² + x) − x = x / (√(x² + x) + x), care tinde la 1/2.</div>
<h2>Continuitate</h2>
<p>f este continuă în a dacă limita din stânga, limita din dreapta și f(a) sunt egale.</p>
<div class="worked"><b>Exemplu 3.</b> f(x) = x + 1 pentru x &lt; 1 și f(x) = ax pentru x ≥ 1. Punem 2 = a, deci a = 2.</div>` },
      ex([
        [1, 'Rezolvă x + y = 5, x − y = 1.', '<b>x = 3, y = 2</b>.'],
        [2, 'Limita lui x² + 1 când x → 2.', '<b>5</b>.'],
        [3, 'Limita lui 1/n când n → ∞.', '<b>0</b>.'],
        [4, 'Limita lui (2x + 1)/(x + 3) când x → ∞.', '<b>2</b>.'],
        [5, 'Limita lui (x² − 9)/(x − 3) când x → 3.', '<b>6</b>.'],
        [6, 'Δ pentru 2x + y = 1, x + y = 2.', '2 − 1 = <b>1</b>.'],
      ], [
        [7, 'Rezolvă cu Cramer 2x + y = 5, x + 3y = 5.', 'Δ = 5: <b>x = 2, y = 1</b>.'],
        [8, 'Limita lui (3x² − x)/(x² + 1) când x → ∞.', '<b>3</b>.'],
        [9, 'Limita lui sin(3x)/x când x → 0.', '3 · sin(3x)/(3x) → <b>3</b>.'],
        [10, 'Limita lui (1 + 1/n)ⁿ.', '<b>e</b>.'],
        [11, 'Limita lui (x² − 3x + 2)/(x − 1) când x → 1.', 'Se simplifică la x − 2: <b>−1</b>.'],
        [12, 'Rezolvă x + y + z = 6, y + z = 5, z = 2.', '<b>x = 1, y = 3, z = 2</b>.'],
      ], [
        [13, 'Limita lui √(x² + x) − x când x → ∞.', '<b>1/2</b>.'],
        [14, 'f(x) = x + 1 pentru x < 1, f(x) = ax pentru x ≥ 1. Pentru ce a este continuă?', '<b>a = 2</b>.'],
        [15, 'Când are mx + y = 1, x + y = 1 soluție unică?', 'Δ = m − 1 ≠ 0: <b>m ≠ 1</b>.'],
        [16, 'Limita lui (2ⁿ + 1)/2ⁿ.', '1 + 1/2ⁿ → <b>1</b>.'],
      ]),
      test([
        ['Rezolvă x + 2y = 7, x − y = 1.', 'x = 3, y = 2', 'Scazi: 3y = 6'],
        ['Limita lui (x − 4)/(x² − 16) când x → 4.', '1/8', '1/(x + 4)'],
        ['Limita lui 5x³/(x³ + 2) când x → ∞.', '5', 'Același grad'],
        ['Limita lui sin(5x)/x când x → 0.', '5', 'Limita fundamentală'],
        ['Limita lui (x² − 1)/(x − 1) când x → 1.', '2', 'x + 1'],
        ['Rezolvă cu Cramer 3x + y = 7, x + y = 3.', 'x = 2, y = 1', 'Δ = 2, Δₓ = 4, Δᵧ = 2'],
        ['Limita lui 1/x² când x → ∞.', '0', 'Numitorul crește'],
        ['f(x) = x² pentru x < 2, f(x) = x + a pentru x ≥ 2. Află a pentru continuitate.', 'a = 2', '4 = 2 + a'],
        ['Limita lui √(x² + 4x) − x când x → ∞.', '2', '4x / (√(x² + 4x) + x)'],
        ['Limita lui (3n + 1)/(n − 2).', '3', 'Același grad'],
      ]),
    ],
  };

  window.MATH_WEEK10 = {
    id: 's10', short: 'Săptămâna 10', title: 'Săptămâna 10: Derivate și studiul funcțiilor', phase: P3,
    tagline: 'Reguli de derivare, tangentă, monotonie, extreme',
    lead: 'Înveți regulile de derivare și le folosești pentru tangentă, monotonie, extreme și optimizare.',
    advice: ADV + ' La funcții compuse, derivezi din exterior spre interior.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Reguli de derivare', html: `<h2>Definiție</h2>
<p>Derivata în a este panta tangentei la grafic în acel punct.</p>
${f('f′(a) = lim (f(x) − f(a)) / (x − a), când x → a')}
<h2>Tabel</h2>
${table(['f(x)', 'f′(x)', 'f(x)', 'f′(x)'], [['c', '0', 'eˣ', 'eˣ'], ['xⁿ', 'n · xⁿ⁻¹', 'ln x', '1/x'], ['√x', '1/(2√x)', 'sin x', 'cos x'], ['1/x', '−1/x²', 'cos x', '−sin x']])}
<h2>Reguli</h2>
${f('(fg)′ = f′g + fg′ &emsp; (f/g)′ = (f′g − fg′) / g² &emsp; (f(g))′ = f′(g) · g′')}
<div class="worked"><b>Exemplu 1.</b> (x · eˣ)′ = eˣ + x · eˣ = eˣ(x + 1).</div>
<div class="worked"><b>Exemplu 2.</b> ((x² + 1)³)′ = 3(x² + 1)² · 2x = 6x(x² + 1)².</div>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Studiul funcțiilor', html: `<h2>Tangenta</h2>
${f('y − f(a) = f′(a)(x − a)')}
<div class="worked"><b>Exemplu 1.</b> y = x² în x = 1: f(1) = 1, f′(1) = 2, deci y = 2x − 1.</div>
<h2>Monotonie și extreme</h2>
${table(['Semnul lui f′', 'Funcția'], [['f′ > 0', 'crescătoare'], ['f′ < 0', 'descrescătoare'], ['f′ schimbă semnul', 'punct de extrem']])}
<div class="worked"><b>Exemplu 2.</b> f(x) = x³ − 3x. f′ = 3x² − 3, zerouri în ±1. Maxim în −1, f(−1) = 2. Minim în 1, f(1) = −2.</div>
<h2>Convexitate</h2>
<p>f″ &gt; 0: convexă. f″ &lt; 0: concavă. Unde f″ schimbă semnul avem punct de inflexiune.</p>
<div class="worked"><b>Exemplu 3.</b> Un dreptunghi cu perimetrul 20 are aria A = x(10 − x). A′ = 10 − 2x = 0 dă x = 5, deci aria maximă este 25.</div>` },
      ex([
        [1, 'Derivează x³.', '<b>3x²</b>.'],
        [2, 'Derivează 5x² − 3x + 2.', '<b>10x − 3</b>.'],
        [3, 'Derivează sin x.', '<b>cos x</b>.'],
        [4, 'Derivează eˣ.', '<b>eˣ</b>.'],
        [5, 'Derivează ln x.', '<b>1/x</b>.'],
        [6, 'f(x) = x². Află f′(3).', '<b>6</b>.'],
      ], [
        [7, 'Derivează x · eˣ.', '<b>eˣ(x + 1)</b>.'],
        [8, 'Derivează (x² + 1)³.', '<b>6x(x² + 1)²</b>.'],
        [9, 'Derivează x/(x + 1).', '<b>1/(x + 1)²</b>.'],
        [10, 'Tangenta la y = x² în x = 1.', '<b>y = 2x − 1</b>.'],
        [11, 'Extremele lui x³ − 3x.', '<b>Maxim 2 în x = −1, minim −2 în x = 1</b>.'],
        [12, 'Monotonia lui x² − 4x + 1.', '<b>Descrescătoare pe (−∞, 2), crescătoare pe (2, ∞)</b>.'],
      ], [
        [13, 'Derivează sin 2x.', '<b>2cos 2x</b>.'],
        [14, 'Derivează ln(x² + 1).', '<b>2x/(x² + 1)</b>.'],
        [15, 'Aria maximă a unui dreptunghi cu perimetrul 20.', 'Pătrat cu latura 5: <b>25</b>.'],
        [16, 'Punctul de inflexiune al lui x³ − 3x².', 'f″ = 6x − 6: <b>x = 1</b>.'],
      ]),
      test([
        ['Derivează 4x³ − 2x.', '12x² − 2', 'Regula puterii'],
        ['Derivează √x.', '1/(2√x)', 'Din tabel'],
        ['Derivează x · ln x.', 'ln x + 1', 'Regula produsului'],
        ['Derivează cos 3x.', '−3 sin 3x', 'Funcție compusă'],
        ['f(x) = x³. Află f′(2).', '12', '3 · 4'],
        ['Tangenta la y = x³ în x = 1.', 'y = 3x − 2', 'f(1) = 1, f′(1) = 3'],
        ['Punctul critic al lui x² − 6x.', 'x = 3', '2x − 6 = 0'],
        ['Minimul lui x² − 6x + 10.', '1', 'f(3) = 9 − 18 + 10'],
        ['Punctele critice ale lui x³ − 12x.', 'x = ±2', '3x² − 12 = 0'],
        ['Derivează e²ˣ.', '2e²ˣ', 'Funcție compusă'],
      ]),
    ],
  };

  window.MATH_WEEK11 = {
    id: 's11', short: 'Săptămâna 11', title: 'Săptămâna 11: Primitive și integrale', phase: P3,
    tagline: 'Primitive, substituție, integrare prin părți, arii, plus testul mare al Fazei 3',
    lead: 'Închide Faza 3: calculezi primitive și integrale definite, afli arii și dai testul mare al fazei.',
    advice: ADV + ' Poți verifica orice primitivă derivând rezultatul.',
    sessions: [
      { n: 1, kind: 'lesson', minutes: 50, title: 'Primitive', html: `<h2>Tabel</h2>
${table(['f(x)', '∫ f(x) dx', 'f(x)', '∫ f(x) dx'], [['xⁿ, n ≠ −1', 'xⁿ⁺¹/(n + 1) + C', 'eˣ', 'eˣ + C'], ['1/x', 'ln|x| + C', 'sin x', '−cos x + C'], ['1/x²', '−1/x + C', 'cos x', 'sin x + C']])}
<h2>Substituția</h2>
<p>Cauți o funcție și derivata ei în integrand.</p>
<div class="worked"><b>Exemplu 1.</b> ∫ 2x(x² + 1)³ dx. Cu t = x² + 1, dt = 2x dx: rezultă (x² + 1)⁴/4 + C.</div>
<h2>Integrarea prin părți</h2>
${f('∫ f g′ dx = fg − ∫ f′g dx')}
<div class="worked"><b>Exemplu 2.</b> ∫ x eˣ dx = x eˣ − ∫ eˣ dx = (x − 1)eˣ + C.</div>
<div class="worked"><b>Exemplu 3.</b> ∫ ln x dx = x ln x − x + C.</div>` },
      { n: 2, kind: 'lesson', minutes: 45, title: 'Integrala definită și arii', html: `<h2>Formula Leibniz–Newton</h2>
${f('∫ₐᵇ f(x) dx = F(b) − F(a)')}
<div class="worked"><b>Exemplu 1.</b> ∫₀² 3x² dx = x³ evaluat între 0 și 2 = 8.</div>
<h2>Arii</h2>
<p>Pentru f ≥ 0, aria dintre grafic și axa Ox este integrala lui f. Între două grafice integrezi diferența, funcția de sus minus cea de jos.</p>
<div class="worked"><b>Exemplu 2.</b> Aria dintre y = x și y = x² pe [0, 1]: ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6.</div>
<div class="worked"><b>Exemplu 3.</b> Aria de sub y = 4 − x²: ∫₋₂² (4 − x²) dx = 16 − 16/3 = 32/3.</div>` },
      ex([
        [1, 'Calculează ∫ x² dx.', '<b>x³/3 + C</b>.'],
        [2, 'Calculează ∫ (2x + 1) dx.', '<b>x² + x + C</b>.'],
        [3, 'Calculează ∫ cos x dx.', '<b>sin x + C</b>.'],
        [4, 'Calculează ∫ 1/x dx.', '<b>ln|x| + C</b>.'],
        [5, 'Calculează ∫₀¹ x dx.', '<b>1/2</b>.'],
        [6, 'Calculează ∫₀² 3x² dx.', '<b>8</b>.'],
      ], [
        [7, 'Calculează ∫ e²ˣ dx.', '<b>e²ˣ/2 + C</b>.'],
        [8, 'Calculează ∫ 2x(x² + 1)³ dx.', '<b>(x² + 1)⁴/4 + C</b>.'],
        [9, 'Calculează ∫ x eˣ dx.', '<b>(x − 1)eˣ + C</b>.'],
        [10, 'Calculează ∫₁ᵉ 1/x dx.', 'ln e − ln 1 = <b>1</b>.'],
        [11, 'Calculează ∫₀^π sin x dx.', '−cos π + cos 0 = <b>2</b>.'],
        [12, 'Aria de sub y = x² pe [0, 3].', '27/3 = <b>9</b>.'],
      ], [
        [13, 'Aria dintre y = x și y = x² pe [0, 1].', '<b>1/6</b>.'],
        [14, 'Calculează ∫ ln x dx.', '<b>x ln x − x + C</b>.'],
        [15, 'Calculează ∫₀¹ 2x/(x² + 1) dx.', 'ln(x² + 1) între 0 și 1 = <b>ln 2</b>.'],
        [16, 'Calculează ∫₀^(π/2) cos x dx.', '<b>1</b>.'],
      ]),
      test([
        ['Calculează ∫ (x³ + 1) dx.', 'x⁴/4 + x + C', 'Regula puterii'],
        ['Calculează ∫ sin x dx.', '−cos x + C', 'Din tabel'],
        ['Calculează ∫₀¹ (2x + 3) dx.', '4', '1 + 3'],
        ['Calculează ∫₁² 1/x² dx.', '1/2', '−1/2 + 1'],
        ['Calculează ∫ 3eˣ dx.', '3eˣ + C', 'Din tabel'],
        ['Calculează ∫ cos 2x dx.', 'sin 2x / 2 + C', 'Substituție'],
        ['Calculează ∫ x cos x dx.', 'x sin x + cos x + C', 'Prin părți'],
        ['Aria de sub y = 4 − x², deasupra axei Ox.', '32/3', 'Între −2 și 2'],
        ['Calculează ∫₀¹ eˣ dx.', 'e − 1', 'Leibniz–Newton'],
        ['Calculează ∫ 2x e^(x²) dx.', 'e^(x²) + C', 'Substituție'],
      ]),
      big('Testul mare al Fazei 3', [
        ['Calculează det [2 1; 4 3].', '2', '6 − 4'],
        ['Calculează [1 1; 0 2] · [2 0; 1 1].', '[3 1; 2 2]', 'Rând pe coloană'],
        ['Inversa lui [3 1; 2 1].', '[1 −1; −2 3]', 'det = 1'],
        ['Rezolvă 2x + y = 4, x − y = −1.', 'x = 1, y = 2', 'Aduni: 3x = 3'],
        ['Limita lui (x² − 4)/(x − 2) când x → 2.', '4', 'x + 2'],
        ['Limita lui (2x² + 1)/(x² − 3) când x → ∞.', '2', 'Același grad'],
        ['Derivează x² eˣ.', 'eˣ(x² + 2x)', 'Regula produsului'],
        ['Extremele lui x³ − 3x².', 'Maxim în x = 0, minim în x = 2', 'f′ = 3x(x − 2)'],
        ['Calculează ∫₀² (3x² − 2x) dx.', '4', '8 − 4'],
        ['Aria dintre y = x² și y = 4.', '32/3', '∫₋₂² (4 − x²) dx'],
        ['Tangenta la y = ln x în x = 1.', 'y = x − 1', 'f(1) = 0, f′(1) = 1'],
        ['Calculează ∫ x ln x dx.', '(x²/2) ln x − x²/4 + C', 'Prin părți'],
      ]),
    ],
  };
})();
