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
      lead: 'Primele 11 săptămâni din planul tău de recapitulare: gimnaziu și liceu, clasele 5–12.',
      intro: `<p>${plan.rhythm}</p><p>${plan.rule}</p>`,
      weeks: [W1, window.MATH_WEEK2, window.MATH_WEEK3, window.MATH_WEEK4, window.MATH_WEEK5, window.MATH_WEEK6, window.MATH_WEEK7, window.MATH_WEEK8, window.MATH_WEEK9, window.MATH_WEEK10, window.MATH_WEEK11],
      after: `<details class="plan-box"><summary><b>Tot planul, pe 5 faze</b></summary><ul>${phases}</ul></details>
        <a class="btn ghost" style="align-self:flex-start" href="#/learning/matematica/antrenament">Exerciții suplimentare pe clase</a>`,
    },
    claude: {
      id: 'claude', short: 'Examen Claude', title: 'Examen Claude: Certified Architect – Foundations',
      lead: 'Program de 4 săptămâni pentru examenul CCAR-F, după materialele tale.',
      intro: '<p>Ritmul din materiale: 60–80 de ore în 4 săptămâni. Lecțiile sunt în română, iar termenii tehnici, fișele și examenele de probă rămân în engleză, ca la examen.</p><p><b>Ținte:</b> minimum 85% la Examenul de probă 1 și 90% la Examenul de probă 2. Pragul real este 720 din 1 000.</p>',
      weeks: [window.CLAUDE_WEEK1, window.CLAUDE_WEEK2, window.CLAUDE_WEEK3, window.CLAUDE_WEEK4],
    },
  };
})();
