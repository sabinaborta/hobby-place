// Planul de recapitulare si Saptamana 1, preluate din documentul tau „Matematică 5–12 · Săptămâna 1”.
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const frac = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  const f = (html) => `<p class="formula">${html}</p>`;

  window.MATH_PLAN = {
    rhythm: '4 sesiuni pe săptămână, de 45–60 de minute: 2 lecții cu exemple rezolvate, 1 sesiune de exerciții, 1 test cu corectare.',
    rule: 'La sfârșitul fiecărei faze există un test mare, de circa 1,5 ore. Sub 70% mai faci o săptămână de consolidare înainte să treci mai departe.',
    phases: [
      { n: 1, title: 'Gimnaziu (5–8)', weeks: 3, topics: 'Numere și fracții, procente și proporții, ecuații, geometrie plană (Pitagora, Thales, arii).' },
      { n: 2, title: 'Liceu 9–10', weeks: 4, topics: 'Funcții (gradul I și II), ecuații și inecuații, progresii, trigonometrie, geometrie analitică, combinatorică și probabilități de bază.' },
      { n: 3, title: 'Liceu 11–12', weeks: 4, topics: 'Matrice, determinanți, sisteme, limite, derivate și studiul funcțiilor, primitive și integrale.' },
      { n: 4, title: 'Matematică de facultate', weeks: 6, topics: 'Algebră liniară (spații vectoriale, valori și vectori proprii, SVD), analiză (serii, funcții de mai multe variabile, integrale multiple), optimizare (gradient, multiplicatori Lagrange).' },
      { n: 5, title: 'Statistică', weeks: 8, topics: 'Probabilități și Bayes, variabile aleatoare și distribuții, TLC, estimare, teste de ipoteză, regresie liniară și logistică, serii de timp, eventual un mini-proiect cu date reale.' },
    ],
  };

  window.MATH_WEEK1 = {
    id: 's1',
    title: 'Săptămâna 1: Numere naturale, divizibilitate, fracții',
    lead: 'Reia materia claselor 5–6: numere naturale, divizibilitate, fracții și procente, în patru sesiuni de 45–60 de minute.',
    advice: 'Citește lecția cu creion și hârtie și refă singură exemplele rezolvate, fără să te uiți la soluție. La exerciții, încearcă fiecare problemă cel puțin 5 minute înainte să deschizi rezolvarea. La test, nu folosi calculator și nu te uita în lecții.',
    sessions: [
      {
        n: 1, kind: 'lesson', minutes: 45, title: 'Numere naturale, puteri, divizibilitate',
        intro: 'Ordinea operațiilor și criteriile de divizibilitate sunt baza pentru tot ce urmează, de la fracții la polinoame.',
        html: `<h2>Ordinea operațiilor</h2>
<ol><li>Parantezele, din interior spre exterior: rotunde, apoi pătrate, apoi acolade.</li><li>Puterile.</li><li>Înmulțirile și împărțirile, de la stânga la dreapta.</li><li>Adunările și scăderile, de la stânga la dreapta.</li></ol>
<div class="worked"><b>Exemplu 1.</b> Calculează 48 : [12 + 3 · (7 − 5)²].<br>Paranteza rotundă: 7 − 5 = 2. Puterea: 2² = 4. Înmulțirea: 3 · 4 = 12. În paranteza pătrată: 12 + 12 = 24. Rezultat: 48 : 24 = 2.</div>
<h2>Reguli de calcul cu puteri</h2>
${f('a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup> &emsp; a<sup>m</sup> : a<sup>n</sup> = a<sup>m−n</sup> &emsp; (a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup> &emsp; (a · b)<sup>n</sup> = a<sup>n</sup> · b<sup>n</sup> &emsp; a<sup>0</sup> = 1 (a ≠ 0)')}
<div class="worked"><b>Exemplu 2.</b> Calculează 2⁵ · 2³ : 2⁶. Avem 2⁵ · 2³ = 2⁸, iar 2⁸ : 2⁶ = 2² = 4.</div>
<h2>Împărțirea cu rest</h2>
<p>Pentru orice numere naturale a și b, cu b ≠ 0, există q (câtul) și r (restul) unice, astfel încât:</p>
${f('a = b · q + r, &emsp; 0 ≤ r &lt; b')}
<p>De exemplu, 83 = 7 · 11 + 6, deci restul împărțirii lui 83 la 7 este 6.</p>
<h2>Criteriile de divizibilitate</h2>
${table(['Divizibil cu', 'Condiție', 'Exemplu'], [
  ['2', 'ultima cifră este pară', '3 478'],
  ['3', 'suma cifrelor se împarte la 3', '2 514 (2+5+1+4 = 12)'],
  ['4', 'ultimele două cifre formează un număr divizibil cu 4', '5 316 (16 : 4)'],
  ['5', 'ultima cifră este 0 sau 5', '7 245'],
  ['9', 'suma cifrelor se împarte la 9', '7 245 (7+2+4+5 = 18)'],
  ['10', 'ultima cifră este 0', '3 870'],
  ['11', 'diferența dintre suma cifrelor de pe poziții impare și a celor de pe poziții pare se împarte la 11', '2 728 ((2+2) − (7+8) = −11)'],
])}
<h2>Numere prime și descompunerea în factori primi</h2>
<p>Un număr prim are exact doi divizori: 1 și el însuși. Primele numere prime sunt 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. Numărul 2 este singurul prim par, iar 1 nu este prim.</p>
<p>Orice număr natural mai mare ca 1 se scrie, în mod unic, ca produs de puteri de numere prime.</p>
<div class="worked"><b>Exemplu 3.</b> Descompune 360. Avem 360 = 8 · 45 = 2³ · 3² · 5.<br>Numărul divizorilor se obține mărind fiecare exponent cu 1 și înmulțind rezultatele: (3+1)(2+1)(1+1) = 24 divizori.</div>
<div class="worked"><b>Exemplu 4.</b> Este 7 245 divizibil cu 9? Da, pentru că 7+2+4+5 = 18. Dar cu 11? Nu: (7+4) − (2+5) = 4. Descompunerea completă este 7 245 = 3² · 5 · 7 · 23.</div>`,
      },
      {
        n: 2, kind: 'lesson', minutes: 45, title: 'Cmmdc, cmmmc, fracții, procente',
        html: `<h2>Cel mai mare divizor comun și cel mai mic multiplu comun</h2>
<p>Din descompunerile în factori primi: cmmdc ia factorii comuni la puterea cea mai mică, iar cmmmc ia toți factorii la puterea cea mai mare.</p>
<div class="worked"><b>Exemplu 1.</b> Pentru 360 = 2³ · 3² · 5 și 84 = 2² · 3 · 7:<br>cmmdc(360, 84) = 2² · 3 = 12<br>cmmmc(360, 84) = 2³ · 3² · 5 · 7 = 2 520</div>
<p>Legătura dintre ele:</p>
${f('cmmdc(a, b) · cmmmc(a, b) = a · b')}
<p>Verificare: 12 · 2 520 = 30 240 = 360 · 84.</p>
<p><b>Algoritmul lui Euclid</b> (când numerele sunt greu de descompus): împarți repetat, iar ultimul rest nenul este cmmdc. Pentru 252 și 105: 252 = 2 · 105 + 42, apoi 105 = 2 · 42 + 21, apoi 42 = 2 · 21 + 0. Deci cmmdc(252, 105) = 21.</p>
<p>Două numere sunt prime între ele dacă cmmdc = 1, de exemplu 8 și 15.</p>
<h2>Fracții ordinare</h2>
<ul><li>Simplificare și amplificare: a/b = (a·k)/(b·k), pentru k ≠ 0. Simplifici cu cmmdc al numărătorului și numitorului.</li><li>Comparare: aduci fracțiile la același numitor (cmmmc al numitorilor) și compari numărătorii.</li><li>Adunare și scădere: același numitor, apoi aduni sau scazi numărătorii.</li><li>Înmulțire: numărătorii între ei, numitorii între ei.</li><li>Împărțire: înmulțești cu inversa fracției a doua.</li></ul>
${f(`${frac('a', 'b')} + ${frac('c', 'd')} = ${frac('ad + bc', 'bd')} &emsp; ${frac('a', 'b')} · ${frac('c', 'd')} = ${frac('ac', 'bd')} &emsp; ${frac('a', 'b')} : ${frac('c', 'd')} = ${frac('a', 'b')} · ${frac('d', 'c')}`)}
<div class="worked"><b>Exemplu 2.</b> Calculează 3/4 + 5/6. Cmmmc(4, 6) = 12, deci 9/12 + 10/12 = 19/12 = 1 7/12.</div>
<div class="worked"><b>Exemplu 3.</b> Calculează 5/6 : 10/9. Obținem 5/6 · 9/10 = 45/60 = 3/4.</div>
<h2>Fracții zecimale</h2>
<p>O fracție ordinară devine zecimală prin împărțirea numărătorului la numitor: 3/8 = 0,375. Dacă numitorul simplificat are alți factori primi decât 2 și 5, zecimala este periodică: 1/3 = 0,(3).</p>
<p>Transformarea inversă pentru fracții periodice:</p>
<ul><li>Periodică simplă: 0,(36) = 36/99 = 4/11.</li><li>Periodică mixtă: 0,2(3) = (23 − 2)/90 = 21/90 = 7/30.</li></ul>
<h2>Rapoarte, proporții și procente</h2>
<p>Proporția a/b = c/d este adevărată exact când a · d = b · c.</p>
<p>P% din a înseamnă a · P/100.</p>
<div class="worked"><b>Exemplu 4.</b> O jachetă de 400 lei se ieftinește cu 15%, deci costă 400 · 0,85 = 340 lei. Dacă apoi se scumpește cu 15%, prețul devine 340 · 1,15 = 391 lei, nu 400. Procentele succesive nu se anulează, pentru că se aplică la baze diferite.</div>
<div class="worked"><b>Exemplu 5 (regula de trei simplă).</b> Dacă 6 muncitori termină o lucrare în 10 zile, câte zile îi trebuie la 15 muncitori? Mărimile sunt invers proporționale, deci 6 · 10 = 15 · x, adică x = 4 zile.</div>`,
      },
      { n: 3, kind: 'exercises', minutes: 60, title: 'Exerciții (ușor → provocator)' },
      { n: 4, kind: 'test', minutes: 45, title: 'Test cronometrat și corectare' },
    ],
    tiers: [
      { title: 'Treapta A – Încălzire', items: [
        [1, 'Calculează 100 − 4 · (15 + 3²) : 8.', '(15 + 9) = 24; 4 · 24 = 96; 96 : 8 = 12; 100 − 12 = <b>88</b>.'],
        [2, 'Calculează 3⁴ · 3² : 3⁵.', '3⁴ · 3² = 3⁶; 3⁶ : 3⁵ = <b>3</b>.'],
        [3, 'Află restul împărțirii lui 1 000 la 7.', '1 000 = 7 · 142 + 6, deci restul este <b>6</b>.'],
        [4, 'Fără să împarți, stabilește care dintre numerele 1 236, 4 515 și 2 718 sunt divizibile cu 3, cu 5, respectiv cu 9.', '1 236: suma cifrelor 12, deci divizibil cu 3, dar nu cu 5 sau 9. 4 515: suma 15, deci divizibil cu 3 și cu 5 (se termină în 5), dar nu cu 9. 2 718: suma 18, deci divizibil cu 3 și cu 9, dar nu cu 5.'],
        [5, 'Descompune 252 în factori primi.', '252 = 4 · 63 = <b>2² · 3² · 7</b>.'],
        [6, 'Află cmmdc și cmmmc pentru 48 și 180.', '48 = 2⁴ · 3 și 180 = 2² · 3² · 5. cmmdc = 2² · 3 = <b>12</b>; cmmmc = 2⁴ · 3² · 5 = <b>720</b>. Verificare: 12 · 720 = 8 640 = 48 · 180.'],
        [7, 'Calculează 2/3 + 3/5 − 1/15.', '10/15 + 9/15 − 1/15 = 18/15 = <b>6/5</b>.'],
        [8, 'Scrie 7/20 ca fracție zecimală și 0,(45) ca fracție ordinară.', '7/20 = 35/100 = <b>0,35</b>. Pentru 0,(45) = 45/99 = <b>5/11</b>.'],
      ] },
      { title: 'Treapta B – Aplicații', items: [
        [9, 'Află cel mai mic număr natural care împărțit la 8, la 12 și la 15 dă de fiecare dată restul 5.', 'Numărul minus 5 trebuie să fie multiplu comun al lui 8, 12 și 15. cmmmc = 120, deci numărul este 120 + 5 = <b>125</b>. Restul 5 este mai mic decât fiecare împărțitor, deci condiția este respectată.'],
        [10, 'Află cifrele x și y astfel încât numărul 3x2y să fie divizibil cu 45.', 'Numărul trebuie să fie divizibil cu 5 și cu 9. Din divizibilitatea cu 5, y = 0 sau y = 5. Dacă y = 0, suma cifrelor este 5 + x, deci x = 4 și numărul este 3 420. Dacă y = 5, suma este 10 + x, deci x = 8 și numărul este 3 825. Soluții: <b>3 420 și 3 825</b> (3 420 = 45 · 76; 3 825 = 45 · 85).'],
        [11, 'Un teren dreptunghiular de 168 m pe 252 m se împarte în parcele pătrate egale, cât mai mari posibil. Care este latura unei parcele și câte parcele se obțin?', 'Latura maximă este cmmdc(168, 252). Algoritmul lui Euclid: 252 = 1 · 168 + 84; 168 = 2 · 84 + 0. Latura este <b>84 m</b>, iar numărul de parcele este (168 : 84) · (252 : 84) = 2 · 3 = <b>6</b>.'],
        [12, 'Două autobuze pleacă împreună din stație la ora 6:00. Primul revine în stație la fiecare 18 minute, al doilea la fiecare 24 de minute. La ce oră se află din nou împreună în stație?', 'Se întâlnesc după cmmmc(18, 24) = 72 de minute, adică la <b>7:12</b>.'],
        [13, 'Calculează 1/2 + 1/6 + 1/12 + 1/20, fără să aduci toate fracțiile la același numitor. Observă un tipar la numitori.', 'Numitorii sunt 1·2, 2·3, 3·4, 4·5, iar 1/(n(n+1)) = 1/n − 1/(n+1). Suma se reduce telescopic: (1 − 1/2) + (1/2 − 1/3) + (1/3 − 1/4) + (1/4 − 1/5) = 1 − 1/5 = <b>4/5</b>.'],
        [14, 'Un produs costă 250 lei. Se scumpește cu 20%, apoi se ieftinește cu 20%. Care este prețul final?', '250 · 1,2 = 300; 300 · 0,8 = <b>240 lei</b>. Prețul final este mai mic decât cel inițial, pentru că scăderea de 20% se aplică la o bază mai mare.'],
        [15, 'Dacă 5 kg de mere costă 32 de lei, cât costă 12 kg?', '1 kg costă 32 : 5 = 6,4 lei, deci 12 kg costă 6,4 · 12 = <b>76,8 lei</b>.'],
      ] },
      { title: 'Treapta C – Provocări', items: [
        [16, 'Arată că 5ⁿ⁺² − 5ⁿ este divizibil cu 24, pentru orice număr natural n.', '5ⁿ⁺² − 5ⁿ = 5ⁿ · (5² − 1) = 5ⁿ · 24, care este multiplu de 24.'],
        [17, 'Câți divizori naturali are numărul 2 520?', '2 520 = 2³ · 3² · 5 · 7, deci numărul de divizori este (3+1)(2+1)(1+1)(1+1) = <b>48</b>.'],
        [18, 'Află perechile de numere naturale nenule (a, b) pentru care a + b = 60 și cmmdc(a, b) = 12.', 'Scriem a = 12x și b = 12y, cu x și y prime între ele. Din a + b = 60 rezultă x + y = 5. Perechile (x, y) sunt (1, 4), (2, 3), (3, 2), (4, 1), toate cu cmmdc 1. Deci (a, b) ∈ <b>{(12, 48), (24, 36), (36, 24), (48, 12)}</b>.'],
        [19, 'Ordonează crescător fracțiile 5/7, 8/11 și 13/18.', 'Comparăm prin înmulțire în cruce. 5/7 și 13/18: 5 · 18 = 90 &lt; 13 · 7 = 91, deci 5/7 &lt; 13/18. 13/18 și 8/11: 13 · 11 = 143 &lt; 8 · 18 = 144, deci 13/18 &lt; 8/11. Ordinea este <b>5/7 &lt; 13/18 &lt; 8/11</b>.'],
        [20, 'Scrie 0,(9) ca fracție ordinară. Ce observi?', 'Fie x = 0,(9). Atunci 10x = 9,(9), deci 10x − x = 9, adică x = 1. Așadar <b>0,(9) = 1</b>: o zecimală periodică nu are scriere unică în acest caz, iar 0,(9) și 1 sunt același număr.'],
        [21, 'Care este ultima cifră a numărului 7²⁰²⁶? Indiciu: calculează primele puteri ale lui 7 și caută un ciclu.', 'Puterile lui 7 se termină în 7, 9, 3, 1, apoi ciclul se repetă (perioada 4). Cum 2 026 = 4 · 506 + 2, ultima cifră este cea de la 7², adică <b>9</b>.'],
      ] },
    ],
    test: {
      minutes: 25,
      instr: 'Zece probleme, câte 10 puncte fiecare, total 100 de puncte. Lucrează fără calculator și fără lecții, apoi corectează cu rezolvările.',
      barem: '5 puncte pentru metodă corectă și 5 puncte pentru rezultat, la fiecare problemă.',
      problems: [
        ['Calculează 5 + 6 · [18 − (2³ + 4)] : 3.', '17', '2³ + 4 = 12; 18 − 12 = 6; 6 · 6 = 36; 36 : 3 = 12; 5 + 12 = 17'],
        ['Calculează 3⁵ · 9 : 3⁴.', '27', '3⁵ · 3² : 3⁴ = 3⁷ : 3⁴ = 3³'],
        ['Află restul împărțirii lui 2 026 la 9, folosind un criteriu de divizibilitate.', '1', '2+0+2+6 = 10, iar 10 dă restul 1 la 9; verificare: 2 026 = 9 · 225 + 1'],
        ['Află cifra a pentru care numărul 5a72 este divizibil cu 9.', 'a = 4', '5 + a + 7 + 2 = 14 + a trebuie să fie 18, deci a = 4 (5 472 = 9 · 608)'],
        ['Descompune 840 în factori primi și află câți divizori naturali are.', '840 = 2³ · 3 · 5 · 7; 32 de divizori', '(3+1)(1+1)(1+1)(1+1) = 32'],
        ['Află cmmdc și cmmmc pentru 126 și 84.', 'cmmdc = 42; cmmmc = 252', '126 = 2 · 3² · 7; 84 = 2² · 3 · 7; 42 · 252 = 10 584 = 126 · 84'],
        ['Calculează 5/6 − 3/8 + 1/4.', '17/24', '20/24 − 9/24 + 6/24'],
        ['Calculează (2/3 : 4/9) · 3/5.', '9/10', '2/3 : 4/9 = 2/3 · 9/4 = 3/2; 3/2 · 3/5 = 9/10'],
        ['Scrie ca fracții ordinare ireductibile numerele 0,36 și 1,(6).', '9/25 și 5/3', '0,36 = 36/100 = 9/25; 1,(6) = 1 + 6/9 = 1 + 2/3 = 5/3'],
        ['Un elev citește într-o zi 40% dintr-o carte, iar a doua zi 30% din ce a rămas. Îi mai rămân de citit 84 de pagini. Câte pagini are cartea?', '200 de pagini', 'Rămâne 60% după prima zi, apoi 70% din acest rest: 0,6 · 0,7 = 0,42 din carte. 84 : 0,42 = 200'],
      ],
    },
  };
})();
