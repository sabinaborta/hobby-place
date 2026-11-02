// Matematica, saptamanile 2-4, in acelasi format ca Saptamana 1 din planul tau.
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const f = (html) => `<p class="formula">${html}</p>`;
  const frac = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  const BAREM = '5 puncte pentru metodă corectă și 5 puncte pentru rezultat, la fiecare problemă.';
  const INSTR = 'Zece probleme, câte 10 puncte fiecare, total 100 de puncte. Lucrează fără calculator și fără lecții, apoi corectează cu rezolvările.';

  window.MATH_WEEK2 = {
    id: 's2', short: 'Săptămâna 2', title: 'Săptămâna 2: Calcul algebric, ecuații și sisteme', phase: 'Faza 1 · Gimnaziu',
    tagline: 'Formule de calcul, radicali, ecuații, inecuații, sisteme',
    lead: 'Reia materia claselor 6–8: calcul cu litere, formule de calcul prescurtat, ecuații, inecuații și sisteme.',
    advice: 'Refă exemplele pe hârtie, fără să te uiți la soluție. La ecuații, verifică mereu rezultatul înlocuind în ecuația inițială.',
    sessions: [
      {
        n: 1, kind: 'lesson', minutes: 45, title: 'Calcul algebric și radicali',
        intro: 'Formulele de calcul prescurtat apar peste tot la liceu, deci trebuie să le recunoști și de la dreapta la stânga.',
        html: `<h2>Desfacerea parantezelor</h2>
<p>Fiecare termen din prima paranteză se înmulțește cu fiecare termen din a doua.</p>
<div class="worked"><b>Exemplu 1.</b> 3x(2x − 5) = 6x² − 15x.<br>(x + 2)(x − 7) = x² − 7x + 2x − 14 = x² − 5x − 14.</div>
<h2>Formule de calcul prescurtat</h2>
${f('(a + b)² = a² + 2ab + b² &emsp; (a − b)² = a² − 2ab + b² &emsp; (a − b)(a + b) = a² − b²')}
<div class="worked"><b>Exemplu 2.</b> (x + 3)² = x² + 6x + 9.<br>(2x − 1)² = 4x² − 4x + 1.<br>(x − 5)(x + 5) = x² − 25.</div>
<div class="note">Greșeala obișnuită: (a + b)² nu este a² + b². Lipsește termenul 2ab.</div>
<h2>Descompunerea în factori</h2>
<ol><li>Scoți factorul comun: 12x² − 8x = 4x(3x − 2).</li><li>Cauți o formulă: x² − 25 = (x − 5)(x + 5), iar x² + 6x + 9 = (x + 3)².</li></ol>
<div class="worked"><b>Exemplu 3.</b> Descompune 2x² − 18. Scoți factorul comun: 2(x² − 9). Aplici diferența de pătrate: 2(x − 3)(x + 3).</div>
<h2>Fracții algebrice</h2>
<p>Simplifici doar factori, nu termeni. Descompui întâi, apoi simplifici și notezi pentru ce valori este definită fracția.</p>
<div class="worked"><b>Exemplu 4.</b> (x² − 4)/(x² + 4x + 4) = (x − 2)(x + 2)/(x + 2)² = (x − 2)/(x + 2), pentru x ≠ −2.</div>
<h2>Radicali</h2>
${f('√(a · b) = √a · √b &emsp; √(a/b) = √a / √b &emsp; √(a²) = |a|')}
<div class="worked"><b>Exemplu 5.</b> √72 = √(36 · 2) = 6√2.<br>√50 + √8 = 5√2 + 2√2 = 7√2.</div>
<p><b>Raționalizarea numitorului:</b> amplifici ca să dispară radicalul de jos.</p>
<div class="worked"><b>Exemplu 6.</b> 6/√3 = 6√3/3 = 2√3.</div>`,
      },
      {
        n: 2, kind: 'lesson', minutes: 45, title: 'Ecuații, inecuații și sisteme',
        html: `<h2>Ecuația de gradul I</h2>
<p>Pași: desfaci parantezele, aduni termenii cu x într-o parte și numerele în cealaltă, împarți la coeficient, verifici.</p>
<div class="worked"><b>Exemplu 1.</b> 2(x − 3) = x + 5. Avem 2x − 6 = x + 5, deci x = 11. Verificare: 2 · 8 = 16 și 11 + 5 = 16.</div>
<div class="worked"><b>Exemplu 2.</b> (x + 1)/2 + (x − 1)/3 = 6. Numitor comun 6: 3(x + 1) + 2(x − 1) = 36, adică 5x + 1 = 36, deci x = 7.</div>
<h2>Modulul</h2>
<p>|x| = a, cu a &gt; 0, are două soluții: x = a sau x = −a.</p>
<div class="worked"><b>Exemplu 3.</b> |x − 2| = 5. Atunci x − 2 = 5 sau x − 2 = −5, deci x = 7 sau x = −3.</div>
<h2>Inecuații</h2>
<div class="rule">Când înmulțești sau împarți o inecuație la un număr <b>negativ</b>, semnul se schimbă.</div>
<div class="worked"><b>Exemplu 4.</b> 3x − 4 &lt; 8 dă 3x &lt; 12, deci x &lt; 4.<br>−2x &gt; 6 dă x &lt; −3.</div>
<h2>Sisteme de două ecuații</h2>
<div class="worked"><b>Exemplu 5 (reducere).</b> x + y = 7 și 2x − y = 5. Adunăm: 3x = 12, deci x = 4 și y = 3.</div>
<div class="worked"><b>Exemplu 6 (substituție).</b> y = x + 1 și 2x + 3y = 13. Înlocuim: 2x + 3x + 3 = 13, deci x = 2 și y = 3.</div>
<h2>Probleme cu ecuații</h2>
<ol><li>Alegi necunoscuta și scrii ce reprezintă.</li><li>Scrii ecuația din enunț.</li><li>Rezolvi.</li><li>Verifici în enunț.</li></ol>
<div class="worked"><b>Exemplu 7.</b> Un tată are de 3 ori vârsta fiului. Peste 12 ani va avea de 2 ori vârsta fiului. Fie f vârsta fiului: 3f + 12 = 2(f + 12), deci f = 12. Fiul are 12 ani, tatăl 36.</div>`,
      },
      {
        n: 3, kind: 'exercises', minutes: 60, title: 'Exerciții (ușor → provocator)',
        tiers: [
          { title: 'Treapta A – Încălzire', items: [
            [1, 'Calculează (2x − 3)(x + 4).', '2x² + 8x − 3x − 12 = <b>2x² + 5x − 12</b>.'],
            [2, 'Calculează (3x − 2)².', '<b>9x² − 12x + 4</b>.'],
            [3, 'Calculează (2a + 5)(2a − 5).', '<b>4a² − 25</b>.'],
            [4, 'Descompune 6x² + 9x.', '<b>3x(2x + 3)</b>.'],
            [5, 'Descompune x² − 49.', '<b>(x − 7)(x + 7)</b>.'],
            [6, 'Rezolvă 5x − 7 = 2x + 8.', '3x = 15, deci <b>x = 5</b>.'],
          ] },
          { title: 'Treapta B – Aplicații', items: [
            [7, 'Rezolvă 3(x − 2) − 2(x + 1) = 4.', '3x − 6 − 2x − 2 = 4, adică x − 8 = 4, deci <b>x = 12</b>.'],
            [8, 'Rezolvă 2x − 5 ≤ 3x + 1.', '−x ≤ 6. Înmulțim cu −1 și schimbăm semnul: <b>x ≥ −6</b>.'],
            [9, 'Rezolvă sistemul 2x + 3y = 12 și x − y = 1.', 'x = y + 1. Înlocuim: 2y + 2 + 3y = 12, deci y = 2 și x = 3. Soluția: <b>x = 3, y = 2</b>.'],
            [10, 'Suma a trei numere consecutive este 96. Află numerele.', 'n + (n + 1) + (n + 2) = 96, deci 3n + 3 = 96 și n = 31. Numerele: <b>31, 32, 33</b>.'],
            [11, 'Un dreptunghi are perimetrul 46 cm, iar lungimea este cu 5 cm mai mare decât lățimea. Află aria.', '2(x + x + 5) = 46, deci 2x + 5 = 23 și x = 9. Laturile sunt 9 și 14, iar aria este <b>126 cm²</b>.'],
            [12, 'Calculează √50 + √18 − √8.', '5√2 + 3√2 − 2√2 = <b>6√2</b>.'],
          ] },
          { title: 'Treapta C – Provocări', items: [
            [13, 'Simplifică (x² − 9)/(x² + 6x + 9).', '(x − 3)(x + 3)/(x + 3)² = <b>(x − 3)/(x + 3)</b>, pentru x ≠ −3.'],
            [14, 'Dacă a + b = 7 și ab = 10, află a² + b².', 'a² + b² = (a + b)² − 2ab = 49 − 20 = <b>29</b>.'],
            [15, 'Rezolvă |2x − 1| = 5.', '2x − 1 = 5 dă x = 3; 2x − 1 = −5 dă x = −2. Soluții: <b>3 și −2</b>.'],
            [16, 'Arată că n² + n este par, pentru orice număr natural n.', 'n² + n = n(n + 1), produsul a două numere consecutive. Unul dintre ele este par, deci produsul este par.'],
          ] },
        ],
      },
      {
        n: 4, kind: 'test', minutes: 45, title: 'Test cronometrat și corectare',
        test: { minutes: 25, instr: INSTR, barem: BAREM, problems: [
          ['Calculează (x + 5)² − (x − 5)².', '20x', 'x² + 10x + 25 − x² + 10x − 25 = 20x'],
          ['Descompune 3x² − 12.', '3(x − 2)(x + 2)', '3(x² − 4), apoi diferența de pătrate'],
          ['Rezolvă 4(x − 1) = 2x + 6.', 'x = 5', '4x − 4 = 2x + 6, deci 2x = 10'],
          ['Rezolvă 5 − 2x > 11.', 'x < −3', '−2x > 6; împărțim la −2 și schimbăm semnul'],
          ['Rezolvă sistemul 3x + y = 10 și x − y = 2.', 'x = 3, y = 1', 'Adunăm: 4x = 12, deci x = 3 și y = 1'],
          ['Calculează √75 − √12.', '3√3', '5√3 − 2√3'],
          ['Rezolvă |x + 3| = 4.', 'x = 1 sau x = −7', 'x + 3 = 4 sau x + 3 = −4'],
          ['Dacă x + y = 5 și xy = 6, află x² + y².', '13', '25 − 2 · 6 = 13'],
          ['Simplifică (x² − 4)/(x − 2).', 'x + 2, pentru x ≠ 2', '(x − 2)(x + 2)/(x − 2)'],
          ['Suma vârstelor unei mame și a fiicei este 50 de ani, iar mama este cu 20 de ani mai mare. Ce vârste au?', '15 și 35 de ani', 'x + x + 20 = 50, deci x = 15'],
        ] },
      },
    ],
  };

  window.MATH_WEEK3 = {
    id: 's3', short: 'Săptămâna 3', title: 'Săptămâna 3: Geometrie plană', phase: 'Faza 1 · Gimnaziu',
    tagline: 'Pitagora, Thales, asemănare, arii, plus testul mare al Fazei 1',
    lead: 'Închide Faza 1: triunghiuri, teorema lui Pitagora, teorema lui Thales, asemănare și arii. La final dai testul mare al fazei.',
    advice: 'Desenează fiecare figură. Multe probleme devin simple după ce ai trasat înălțimea și ai văzut un triunghi dreptunghic.',
    sessions: [
      {
        n: 1, kind: 'lesson', minutes: 45, title: 'Triunghiuri și teorema lui Pitagora',
        html: `<h2>Triunghiul</h2>
<p>Suma unghiurilor unui triunghi este 180°. Într-un triunghi isoscel, unghiurile de la bază sunt egale, iar înălțimea din vârf împarte baza în două părți egale. Într-un triunghi echilateral, toate unghiurile au 60°.</p>
<h2>Teorema lui Pitagora</h2>
<p>Într-un triunghi dreptunghic, pătratul ipotenuzei este egal cu suma pătratelor catetelor:</p>
${f('c² = a² + b²')}
<p><b>Reciproca:</b> dacă laturile respectă relația, triunghiul este dreptunghic.</p>
<div class="worked"><b>Exemplu 1.</b> Catetele 6 și 8: c² = 36 + 64 = 100, deci c = 10.</div>
<div class="worked"><b>Exemplu 2.</b> Ipotenuza 13 și cateta 5: b² = 169 − 25 = 144, deci b = 12.</div>
<p>Merită reținute tripletele 3-4-5, 5-12-13, 8-15-17 și 7-24-25.</p>
<h2>Triunghiuri dreptunghice speciale</h2>
${table(['Triunghi', 'Laturi', 'Regulă'], [
  ['45°-45°-90°', 'a, a, a√2', 'Diagonala pătratului de latură a este a√2'],
  ['30°-60°-90°', 'a, a√3, 2a', 'Cateta opusă unghiului de 30° este jumătate din ipotenuză'],
])}
<div class="worked"><b>Exemplu 3.</b> Triunghi echilateral cu latura 6. Înălțimea îl împarte în două triunghiuri 30°-60°-90°, deci h = 3√3, iar aria este 6 · 3√3 / 2 = 9√3.</div>
<h2>Relații în triunghiul dreptunghic</h2>
<p>Fie h înălțimea din unghiul drept, iar p și q proiecțiile catetelor pe ipotenuză c.</p>
${f('h² = p · q (teorema înălțimii) &emsp; a² = p · c (teorema catetei)')}
<div class="worked"><b>Exemplu 4.</b> Proiecțiile sunt 4 și 9. Atunci h² = 36, deci h = 6. Ipotenuza este 13, iar aria este 13 · 6 / 2 = 39.</div>`,
      },
      {
        n: 2, kind: 'lesson', minutes: 45, title: 'Thales, asemănare și arii',
        html: `<h2>Teorema lui Thales</h2>
<p>O paralelă la o latură a unui triunghi împarte celelalte două laturi în segmente proporționale. Dacă DE ∥ BC, cu D pe AB și E pe AC:</p>
${f(`${frac('AD', 'DB')} = ${frac('AE', 'EC')}`)}
<div class="worked"><b>Exemplu 1.</b> AD = 4, DB = 6, AE = 6. Atunci 4/6 = 6/EC, deci EC = 9.</div>
<h2>Asemănarea</h2>
<p>Două triunghiuri sunt asemenea dacă au unghiurile egale, iar laturile proporționale, cu raportul k. Ariile sunt în raportul k².</p>
<div class="worked"><b>Exemplu 2.</b> Dacă DE ∥ BC și AD/AB = 1/2, atunci triunghiul ADE are aria de 4 ori mai mică decât ABC.</div>
<h2>Formule de arie</h2>
${table(['Figură', 'Arie', 'Perimetru sau lungime'], [
  ['Pătrat de latură a', 'a²', '4a'],
  ['Dreptunghi', 'L · l', '2(L + l)'],
  ['Triunghi', 'b · h / 2', 'suma laturilor'],
  ['Paralelogram', 'b · h', '2(a + b)'],
  ['Romb, cu diagonalele d₁ și d₂', 'd₁ · d₂ / 2', '4a'],
  ['Trapez, cu bazele B și b', '(B + b) · h / 2', 'suma laturilor'],
  ['Cerc de rază r', 'π r²', '2π r'],
])}
<div class="worked"><b>Exemplu 3.</b> Trapez cu bazele 10 și 6 și înălțimea 4: A = 16 · 4 / 2 = 32.</div>
<div class="worked"><b>Exemplu 4.</b> Trapez isoscel cu bazele 16 și 10 și laturile neparalele 5. Fiecare proiecție este (16 − 10)/2 = 3, deci h = 4 din Pitagora, iar A = 26 · 4 / 2 = 52.</div>
<div class="worked"><b>Exemplu 5.</b> Cerc cu raza 3: A = 9π, L = 6π.</div>`,
      },
      {
        n: 3, kind: 'exercises', minutes: 60, title: 'Exerciții (ușor → provocator)',
        tiers: [
          { title: 'Treapta A – Încălzire', items: [
            [1, 'Un triunghi dreptunghic are catetele 9 și 12. Află ipotenuza.', '81 + 144 = 225, deci ipotenuza este <b>15</b>.'],
            [2, 'Ipotenuza este 25, iar o catetă 7. Află cealaltă catetă.', '625 − 49 = 576, deci cateta este <b>24</b>.'],
            [3, 'Un triunghi are unghiurile de 50° și 60°. Află al treilea unghi.', '180° − 110° = <b>70°</b>.'],
            [4, 'Află diagonala unui pătrat cu latura 6.', '<b>6√2</b>.'],
            [5, 'Află lungimea și aria unui cerc cu raza 5.', 'L = <b>10π</b>, A = <b>25π</b>.'],
            [6, 'Un trapez are bazele 12 și 8, iar înălțimea 5. Află aria.', '(12 + 8) · 5 / 2 = <b>50</b>.'],
          ] },
          { title: 'Treapta B – Aplicații', items: [
            [7, 'Este dreptunghic triunghiul cu laturile 7, 24 și 25?', '49 + 576 = 625 = 25². <b>Da</b>, conform reciprocei lui Pitagora.'],
            [8, 'Un romb are diagonalele 10 și 24. Află aria și latura.', 'A = 10 · 24 / 2 = <b>120</b>. Diagonalele se înjumătățesc și sunt perpendiculare: latura = √(25 + 144) = <b>13</b>.'],
            [9, 'Află înălțimea și aria unui triunghi echilateral cu latura 6.', 'h = 3√3; A = 6 · 3√3 / 2 = <b>9√3</b>.'],
            [10, 'În triunghiul ABC, DE ∥ BC, AD = 3, DB = 5, AE = 4,5. Află EC.', '3/5 = 4,5/EC, deci EC = <b>7,5</b>.'],
            [11, 'Un dreptunghi are diagonala 13 și o latură 5. Află aria și perimetrul.', 'Cealaltă latură este 12. A = <b>60</b>, P = <b>34</b>.'],
            [12, 'Într-un triunghi dreptunghic, proiecțiile catetelor pe ipotenuză sunt 4 și 9. Află înălțimea și aria.', 'h² = 4 · 9, deci h = <b>6</b>. Ipotenuza este 13, deci A = <b>39</b>.'],
          ] },
          { title: 'Treapta C – Provocări', items: [
            [13, 'Două triunghiuri asemenea au raportul laturilor 3/5. Cel mic are aria 18. Află aria celui mare.', 'Raportul ariilor este 9/25, deci 18 · 25 / 9 = <b>50</b>.'],
            [14, 'Un triunghi isoscel are laturile 10, 10 și 12. Află aria.', 'Înălțimea împarte baza în 6 și 6, deci h = 8. A = 12 · 8 / 2 = <b>48</b>.'],
            [15, 'Un pătrat este înscris într-un cerc cu raza 4. Află aria pătratului.', 'Diagonala este 8, deci latura este 4√2, iar aria <b>32</b>.'],
            [16, 'Un triunghi 30°-60°-90° are ipotenuza 10. Află catetele și aria.', 'Catetele sunt 5 și 5√3. A = 5 · 5√3 / 2 = <b>25√3/2</b>.'],
            [17, 'Află aria coroanei circulare dintre cercurile cu razele 5 și 3.', '25π − 9π = <b>16π</b>.'],
          ] },
        ],
      },
      {
        n: 4, kind: 'test', minutes: 45, title: 'Test cronometrat și corectare',
        test: { minutes: 25, instr: INSTR, barem: BAREM, problems: [
          ['Catetele unui triunghi dreptunghic sunt 8 și 15. Află ipotenuza.', '17', '64 + 225 = 289'],
          ['Ipotenuza este 10, iar o catetă 6. Află cealaltă catetă.', '8', '100 − 36 = 64'],
          ['Un dreptunghi are laturile 8 și 6. Află diagonala și aria.', 'd = 10, A = 48', '64 + 36 = 100'],
          ['Un triunghi are baza 10 și înălțimea 7. Află aria.', '35', '10 · 7 / 2'],
          ['Un paralelogram are baza 9 și înălțimea 4. Află aria.', '36', '9 · 4'],
          ['Un cerc are lungimea 12π. Află aria.', '36π', '2πr = 12π, deci r = 6'],
          ['DE ∥ BC, AD = 2, DB = 3, AC = 10. Află AE.', '4', 'AE/AC = AD/AB = 2/5'],
          ['Două triunghiuri asemenea au raportul laturilor 2. Cel mic are aria 12. Află aria celui mare.', '48', 'Raportul ariilor este 4'],
          ['Află aria unui triunghi echilateral cu latura 4.', '4√3', 'h = 2√3, A = 4 · 2√3 / 2'],
          ['Un trapez isoscel are bazele 16 și 10, iar laturile neparalele 5. Află aria.', '52', 'Proiecția este 3, h = 4, A = 26 · 4 / 2'],
        ] },
      },
      {
        n: 5, kind: 'test', minutes: 120, title: 'Testul mare al Fazei 1',
        test: { minutes: 90, instr: 'Recapitulare din săptămânile 1–3. Conform planului, sub 70 de puncte mai faci o săptămână de consolidare înainte să treci mai departe.', barem: BAREM, problems: [
          ['Află cmmdc și cmmmc pentru 72 și 120.', 'cmmdc = 24; cmmmc = 360', '72 = 2³ · 3²; 120 = 2³ · 3 · 5'],
          ['Calculează 3/4 − 2/5 + 7/10.', '21/20', '15/20 − 8/20 + 14/20'],
          ['Un produs de 300 lei se scumpește cu 10%, apoi se ieftinește cu 10%. Care este prețul final?', '297 lei', '300 · 1,1 = 330; 330 · 0,9 = 297'],
          ['Calculează (2x + 3)² − (2x − 3)².', '24x', '4x² + 12x + 9 − 4x² + 12x − 9'],
          ['Descompune x² − 10x + 25.', '(x − 5)²', 'Formula pătratului diferenței'],
          ['Rezolvă (x − 1)/2 + (x + 1)/4 = 5.', 'x = 7', '2x − 2 + x + 1 = 20, deci 3x = 21'],
          ['Rezolvă sistemul 2x − y = 4 și x + 2y = 7.', 'x = 3, y = 2', 'y = 2x − 4; x + 4x − 8 = 7'],
          ['Catetele unui triunghi dreptunghic sunt 20 și 21. Află ipotenuza.', '29', '400 + 441 = 841'],
          ['Un trapez dreptunghic are bazele 14 și 8 și înălțimea 8. Află aria și latura oblică.', 'A = 88; latura oblică = 10', '(14 + 8) · 8 / 2; √(6² + 8²)'],
          ['În triunghiul ABC cu aria 45, DE ∥ BC și AD/AB = 2/3. Află aria triunghiului ADE.', '20', '45 · (2/3)² = 45 · 4/9'],
        ] },
      },
    ],
  };

  window.MATH_WEEK4 = {
    id: 's4', short: 'Săptămâna 4', title: 'Săptămâna 4: Funcția de gradul I și de gradul II', phase: 'Faza 2 · Liceu 9–10',
    tagline: 'Începutul Fazei 2: drepte, parabole, ecuația de gradul II',
    lead: 'Prima săptămână din Faza 2: funcția de gradul I, ecuația de gradul II, parabola și semnul funcției.',
    advice: 'Schițează graficul la fiecare problemă. Vârful și intersecțiile cu axele spun aproape tot despre o parabolă.',
    sessions: [
      {
        n: 1, kind: 'lesson', minutes: 45, title: 'Funcția de gradul I',
        html: `<h2>Definiție</h2>
${f('f(x) = ax + b, &emsp; a ≠ 0')}
<p>Graficul este o dreaptă. <b>a</b> este panta, iar <b>b</b> este valoarea la x = 0.</p>
${table(['Semnul lui a', 'Funcția', 'Dreapta'], [['a > 0', 'crescătoare', 'urcă'], ['a < 0', 'descrescătoare', 'coboară']])}
<h2>Intersecțiile cu axele</h2>
<ul><li>Cu Oy: pui x = 0 și obții punctul (0, b).</li><li>Cu Ox: pui f(x) = 0 și obții x = −b/a.</li></ul>
<div class="worked"><b>Exemplu 1.</b> f(x) = 2x − 4. Cu Oy: (0, −4). Cu Ox: 2x − 4 = 0, deci (2, 0). Funcția este crescătoare.</div>
<h2>Dreapta prin două puncte</h2>
${f(`a = ${frac('y₂ − y₁', 'x₂ − x₁')}`)}
<div class="worked"><b>Exemplu 2.</b> Prin (1, 3) și (3, 7): a = 4/2 = 2. Din 3 = 2 · 1 + b rezultă b = 1, deci f(x) = 2x + 1.</div>
<h2>Intersecția a două drepte</h2>
<p>Egalezi funcțiile.</p>
<div class="worked"><b>Exemplu 3.</b> f(x) = 2x + 1 și g(x) = −x + 7. Din 2x + 1 = −x + 7 rezultă x = 2 și y = 5. Punctul este (2, 5).</div>
<h2>Semnul funcției</h2>
<p>f are semnul lui a la dreapta rădăcinii și semnul opus la stânga ei.</p>`,
      },
      {
        n: 2, kind: 'lesson', minutes: 45, title: 'Ecuația și funcția de gradul II',
        html: `<h2>Ecuația de gradul II</h2>
${f(`ax² + bx + c = 0, &emsp; Δ = b² − 4ac, &emsp; x = ${frac('−b ± √Δ', '2a')}`)}
${table(['Δ', 'Soluții reale'], [['Δ > 0', 'două, diferite'], ['Δ = 0', 'una dublă'], ['Δ < 0', 'niciuna']])}
<div class="worked"><b>Exemplu 1.</b> x² − 5x + 6 = 0. Δ = 25 − 24 = 1, deci x = 2 sau x = 3.</div>
<div class="worked"><b>Exemplu 2.</b> 2x² + 3x − 2 = 0. Δ = 9 + 16 = 25, deci x = (−3 ± 5)/4, adică x = 1/2 sau x = −2.</div>
<h2>Relațiile lui Viète</h2>
${f('x₁ + x₂ = −b/a &emsp; x₁ · x₂ = c/a')}
<div class="worked"><b>Exemplu 3.</b> Pentru x² − 5x + 3 = 0: suma este 5, produsul 3. Atunci x₁² + x₂² = 5² − 2 · 3 = 19, fără să calculezi rădăcinile.</div>
<p>O ecuație cu rădăcinile x₁ și x₂ este x² − Sx + P = 0, unde S este suma, iar P produsul.</p>
<h2>Parabola</h2>
<p>Graficul lui f(x) = ax² + bx + c este o parabolă: deschisă în sus dacă a &gt; 0 și în jos dacă a &lt; 0.</p>
${f('Vârful: V(−b/2a, −Δ/4a)')}
<div class="worked"><b>Exemplu 4.</b> f(x) = x² − 4x + 3. Vârful are x = 2 și y = f(2) = −1. Deoarece a &gt; 0, minimul este −1.</div>
<div class="worked"><b>Exemplu 5.</b> Un dreptunghi are perimetrul 40. Aria este A(x) = x(20 − x) = −x² + 20x, cu maximul la x = 10. Aria maximă este 100.</div>
<h2>Semnul și inecuațiile de gradul II</h2>
<div class="rule">Între rădăcini, f are semn <b>opus</b> lui a. În afara rădăcinilor, are semnul lui a.</div>
<div class="worked"><b>Exemplu 6.</b> x² − 5x + 6 &lt; 0. Rădăcinile sunt 2 și 3, iar a &gt; 0, deci soluția este x ∈ (2, 3).</div>`,
      },
      {
        n: 3, kind: 'exercises', minutes: 60, title: 'Exerciții (ușor → provocator)',
        tiers: [
          { title: 'Treapta A – Încălzire', items: [
            [1, 'Află intersecțiile cu axele pentru f(x) = 3x − 6.', 'Cu Ox: <b>(2, 0)</b>. Cu Oy: <b>(0, −6)</b>.'],
            [2, 'Pentru f(x) = −2x + 5, calculează f(3) și spune dacă funcția crește sau scade.', 'f(3) = <b>−1</b>. Deoarece a &lt; 0, funcția este <b>descrescătoare</b>.'],
            [3, 'Rezolvă x² − 7x + 10 = 0.', 'Δ = 9, deci <b>x = 2 sau x = 5</b>.'],
            [4, 'Are soluții reale x² + 2x + 5 = 0?', 'Δ = 4 − 20 = −16 &lt; 0. <b>Nu</b> are.'],
            [5, 'Află vârful parabolei f(x) = x² + 6x + 5.', 'x = −3; f(−3) = 9 − 18 + 5 = −4. Vârful este <b>(−3, −4)</b>.'],
            [6, 'Pentru x² − 8x + 15 = 0, află suma și produsul rădăcinilor.', 'Suma <b>8</b>, produsul <b>15</b>.'],
          ] },
          { title: 'Treapta B – Aplicații', items: [
            [7, 'Află funcția de gradul I al cărei grafic trece prin (0, 2) și (2, 8).', 'b = 2; a = 6/2 = 3. <b>f(x) = 3x + 2</b>.'],
            [8, 'Află intersecția graficelor f(x) = 2x + 1 și g(x) = −x + 7.', '3x = 6, deci x = 2 și y = 5. Punctul: <b>(2, 5)</b>.'],
            [9, 'Rezolvă 2x² − 3x − 2 = 0.', 'Δ = 25; x = (3 ± 5)/4, deci <b>x = 2 sau x = −1/2</b>.'],
            [10, 'Rezolvă x² − x − 6 ≤ 0.', 'Rădăcinile sunt −2 și 3, a &gt; 0. Soluția: <b>x ∈ [−2, 3]</b>.'],
            [11, 'Scrie o ecuație de gradul II cu rădăcinile 3 și −4.', 'S = −1, P = −12, deci <b>x² + x − 12 = 0</b>.'],
            [12, 'Află maximul funcției f(x) = −x² + 4x + 1.', 'x = 2; f(2) = −4 + 8 + 1 = <b>5</b>.'],
          ] },
          { title: 'Treapta C – Provocări', items: [
            [13, 'Pentru ce m are x² − 4x + m = 0 o rădăcină dublă?', 'Δ = 16 − 4m = 0, deci <b>m = 4</b>.'],
            [14, 'Pentru x² − 5x + 3 = 0, calculează x₁² + x₂².', 'S² − 2P = 25 − 6 = <b>19</b>.'],
            [15, 'Un dreptunghi are perimetrul 40. Ce laturi îi dau arie maximă?', 'A = x(20 − x), cu maximul la x = 10. Pătrat cu latura <b>10</b> și aria <b>100</b>.'],
            [16, 'Află parabola cu vârful (1, 2) care trece prin (0, 3).', 'f(x) = a(x − 1)² + 2; f(0) = a + 2 = 3, deci a = 1. <b>f(x) = x² − 2x + 3</b>.'],
            [17, 'O minge are înălțimea h(t) = −5t² + 20t metri. Când atinge maximul, cât este acesta și când cade pe sol?', 't = 2 s, h = <b>20 m</b>. h(t) = 0 dă t = 0 sau <b>t = 4 s</b>.'],
          ] },
        ],
      },
      {
        n: 4, kind: 'test', minutes: 45, title: 'Test cronometrat și corectare',
        test: { minutes: 25, instr: INSTR, barem: BAREM, problems: [
          ['Află intersecțiile cu axele pentru f(x) = 4x − 8.', '(2, 0) și (0, −8)', 'f(x) = 0 și x = 0'],
          ['Pentru f(x) = −3x + 1, calculează f(−2).', '7', '6 + 1'],
          ['Află funcția de gradul I al cărei grafic trece prin (1, 1) și (3, 5).', 'f(x) = 2x − 1', 'a = 4/2 = 2; 1 = 2 + b'],
          ['Rezolvă x² − 9x + 20 = 0.', 'x = 4 sau x = 5', 'Δ = 1'],
          ['Rezolvă 3x² − 2x − 1 = 0.', 'x = 1 sau x = −1/3', 'Δ = 16; x = (2 ± 4)/6'],
          ['Află vârful parabolei f(x) = x² − 2x − 3.', '(1, −4)', 'x = 1; f(1) = −4'],
          ['Rezolvă x² − 4 < 0.', 'x ∈ (−2, 2)', 'Între rădăcini, semn opus lui a'],
          ['Pentru ce m are x² − 6x + m = 0 o rădăcină dublă?', 'm = 9', 'Δ = 36 − 4m = 0'],
          ['Pentru x² − 7x + 10 = 0, calculează 1/x₁ + 1/x₂.', '7/10', 'S/P'],
          ['Un dreptunghi are perimetrul 24. Află aria maximă.', '36', 'A = x(12 − x), maxim la x = 6'],
        ] },
      },
    ],
  };
})();
