// Cursurile pe saptamani: leaga datele intr-o structura comuna.
(function () {
  const W1 = window.MATH_WEEK1;
  W1.short = 'Săptămâna 1';
  W1.phase = 'Faza 1 · Gimnaziu';
  W1.tagline = 'Numere naturale, divizibilitate, fracții, procente';
  W1.sessions.forEach((s) => {
    if (s.kind === 'exercises') s.tiers = W1.tiers;
    if (s.kind === 'test') s.test = W1.test;
  });

  const plan = window.MATH_PLAN;
  const phases = plan.phases.map((p) => `<li><b>Faza ${p.n}. ${p.title}</b>, ${p.weeks} săptămâni: ${p.topics}</li>`).join('');

  window.COURSES = {
    matematica: {
      id: 'matematica', short: 'Matematică', title: 'Matematică',
      lead: 'Tot planul tău de recapitulare, în 25 de săptămâni: gimnaziu, liceu, facultate și statistică.',
      intro: `<p>${plan.rhythm}</p><p>${plan.rule}</p>`,
      weeks: [W1, window.MATH_WEEK2, window.MATH_WEEK3, window.MATH_WEEK4, window.MATH_WEEK5, window.MATH_WEEK6, window.MATH_WEEK7, window.MATH_WEEK8, window.MATH_WEEK9, window.MATH_WEEK10, window.MATH_WEEK11, window.MATH_WEEK12, window.MATH_WEEK13, window.MATH_WEEK14, window.MATH_WEEK15, window.MATH_WEEK16, window.MATH_WEEK17, window.MATH_WEEK18, window.MATH_WEEK19, window.MATH_WEEK20, window.MATH_WEEK21, window.MATH_WEEK22, window.MATH_WEEK23, window.MATH_WEEK24, window.MATH_WEEK25],
      after: `<details class="plan-box"><summary><b>Tot planul, pe 5 faze</b></summary><ul>${phases}</ul></details>
        <a class="btn ghost" style="align-self:flex-start" href="#/learning/matematica/antrenament">Exerciții suplimentare pe clase</a>`,
    },
    claude: {
      id: 'claude', short: 'Examen Claude', title: 'Examen Claude: Certified Architect – Foundations',
      lead: 'Program de 4 săptămâni pentru examenul CCAR-F, după materialele tale.',
      intro: '<p>Ritmul din materiale: 60–80 de ore în 4 săptămâni. Lecțiile sunt în română, iar termenii tehnici, fișele și examenele de probă rămân în engleză, ca la examen.</p><p><b>Ținte:</b> minimum 85% la Examenul de probă 1 și 90% la Examenul de probă 2. Pragul real este 720 din 1 000.</p>',
      weeks: [window.CLAUDE_WEEK1, window.CLAUDE_WEEK2, window.CLAUDE_WEEK3, window.CLAUDE_WEEK4],
      data: window.CLAUDE_DATA,
      examTarget: 'Ținte: 85% la prima încercare, 90% înainte de examenul real. Pragul real este 720 din 1 000.',
      retryOrder: 'Reia lecțiile în ordinea domeniilor 1, 2, 3, 4, 5, apoi dă din nou examenul.',
    },
    dp600: {
      id: 'dp600', short: 'DP-600', title: 'DP-600: Microsoft Fabric Analytics Engineer',
      lead: 'Program de 4 săptămâni pentru examenul DP-600, după ghidul oficial de studiu Microsoft.',
      intro: '<p>Programa urmează versiunea „Skills measured as of October 19, 2026”. Lecțiile sunt în română, iar termenii tehnici, fișele și examenele de probă rămân în engleză, ca la examen.</p><p><b>Atenție:</b> examenele de probă sunt scrise pentru această aplicație, nu sunt întrebări reale Microsoft. Pentru exersare oficială folosește și testul gratuit de pe AI Skills Navigator (aka.ms/DP600-PA).</p><p><b>Examenul real:</b> 100 de minute, prag 700 din 1 000.</p>',
      weeks: [window.DP600_WEEK1, window.DP600_WEEK2, window.DP600_WEEK3, window.DP600_WEEK4],
      data: window.DP600_DATA,
      examTarget: 'Țintă: cel puțin 80% înainte de examenul real. Pragul real este 700 din 1 000.',
      retryOrder: 'Reia lecțiile în ordinea domeniilor 2, 1, 3, începând cu cel mai mare, apoi dă din nou examenul.',
    },
  };
})();
