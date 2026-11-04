// Intrebarea zilei: un jurnal scurt, pastrat doar pe acest dispozitiv.
(function () {
  const { esc, route, mount, state, save, backIcon, onLeave, toast } = HP;

  const QUESTIONS = [
    'Ce ți-a rămas în minte din ziua de azi?',
    'Pentru ce simți recunoștință azi, chiar dacă e ceva mic?',
    'Ce ai învățat recent și ai vrea să nu uiți?',
    'Ce ai amânat în ultima vreme și de ce crezi că ai făcut-o?',
    'Cu cine ți-ar plăcea să stai de vorbă săptămâna aceasta?',
    'Când ai simțit cu adevărat liniște în ultima vreme?',
    'Ce obicei ai vrea să păstrezi peste zece ani?',
    'Ce te-a făcut să zâmbești azi?',
    'Ce părere ai schimbat în ultimii ani?',
    'Ce sfat i-ai da persoanei care erai acum cinci ani?',
    'Ce lucru mic ți-ar face mâine mai ușoară?',
    'Ce te neliniștește acum și ce parte din asta depinde de tine?',
    'Care este cea mai frumoasă amintire din copilărie care îți vine acum în minte?',
    'Ce carte, film sau piesă te-a schimbat cumva?',
    'Ce ai făcut azi doar pentru tine?',
    'Ce ai vrea să faci mai des și ce te oprește?',
    'Cine te-a ajutat, fără să știe poate, în ultima vreme?',
    'Ce ai spus azi „da” când voiai de fapt să spui „nu”?',
    'Ce loc îți lipsește și de ce?',
    'Ce ai vrea să știe despre tine oamenii apropiați?',
    'Ce te-a surprins săptămâna aceasta?',
    'Cum arată o zi bună pentru tine, de dimineață până seara?',
    'Ce ai vrea să înveți anul acesta?',
    'Ce gând îți revine cel mai des în ultima vreme?',
    'Ce ai făcut și te bucură, deși nu spui asta cu voce tare?',
    'Ce ai renunțat să mai faci și nu îți pare rău?',
    'Ce ți-a dat energie azi și ce ți-a luat?',
    'Ce ai face mâine dacă nu ai avea nicio obligație?',
    'De la cine ai învățat cel mai mult în viață?',
    'Ce ai vrea să spui cuiva, dar încă nu ai făcut-o?',
    'Ce îți place la locul în care trăiești?',
    'Ce frică s-a dovedit, până la urmă, nejustificată?',
    'Ce lucru simplu îți aduce bucurie de fiecare dată?',
    'Ce ai observat azi și de obicei îți scapă?',
    'Ce rutină te ajută și ce rutină te încurcă?',
    'Ce ai greșit recent și ce ai înțeles din asta?',
    'Cum te-ai simțit când ai lăsat telefonul deoparte azi?',
    'Ce ți-ar plăcea să găsești aici peste un an, recitind?',
    'Ce conversație din ultima vreme ți-a rămas în minte?',
    'Ce ai primit de la părinții tăi și vrei să păstrezi?',
    'Când ai râs ultima dată cu adevărat?',
    'Ce lucru ai vrea să simplifici în viața ta?',
    'Ce te-ar face să simți că săptămâna aceasta a meritat?',
    'Ce ai citit sau ai auzit recent și te-a pus pe gânduri?',
    'Ce ai vrea să ierți, ție sau altcuiva?',
    'Ce ai făcut bine azi, chiar dacă nu a observat nimeni?',
    'Ce anotimp ți se potrivește acum și de ce?',
    'Ce ai vrea să faci mai încet?',
    'Ce înseamnă pentru tine „suficient”?',
    'Cui i-ai putea trimite un gând bun azi?',
    'Ce ai început și ai vrea să duci până la capăt?',
    'Ce ți-ar plăcea să povestești nepoților despre această perioadă?',
    'Ce te ajută să-ți regăsești liniștea într-o zi grea?',
    'Ce ai crezut că îți trebuie și, până la urmă, nu ți-a trebuit?',
    'Ce parte din ziua de azi ai vrea să o trăiești din nou?',
    'Ce ai vrea să întrebi o persoană care nu mai este printre noi?',
    'Ce îți dă sentimentul că ești acasă?',
    'Ce schimbare mică ai observat la tine în ultimul an?',
    'Ce gând ai vrea să lași aici, ca să nu-l mai porți cu tine în seara asta?',
    'Ce aștepți cu nerăbdare în perioada următoare?',
  ];

  function entries() {
    if (!state.journal) state.journal = {};
    return state.journal;
  }

  const questionToday = () => {
    const saved = entries()[window.Daily.today()];
    return saved ? saved.q : QUESTIONS[window.Daily.dayNumber() % QUESTIONS.length];
  };
  const doneToday = () => !!entries()[window.Daily.today()];

  const MONTHS = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
  function longDate(key) {
    const [y, m, d] = key.split('-').map(Number);
    return `${d} ${MONTHS[m - 1]} ${y}`;
  }
  const pastDays = () => Object.keys(entries()).filter((k) => k !== window.Daily.today()).sort().reverse();

  function exportFile() {
    const all = entries();
    const text = Object.keys(all).sort().map((k) => `${longDate(k)}\n${all[k].q}\n\n${all[k].text}\n`).join('\n---\n\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jurnal-hobby-place.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  route(/^\/jurnal$/, () => {
    const view = mount({ section: 'home', narrow: true });
    const key = window.Daily.today();
    const q = questionToday();
    const saved = entries()[key];
    const past = pastDays();
    view.innerHTML = `<div><a class="back" href="#/"><span class="round small">${backIcon}</span>Acasă</a></div>
      <section class="daily-lesson">
        <p class="kicker">Întrebarea zilei · ${longDate(key)}</p>
        <h1 class="h1">${esc(q)}</h1>
      </section>
      <section class="stack">
        <label class="sr" for="entry">Răspunsul tău</label>
        <textarea id="entry" class="journal-box" rows="7" placeholder="Câteva rânduri sunt de ajuns.">${esc(saved ? saved.text : '')}</textarea>
        <p class="journal-note" id="status">${saved ? 'Salvat.' : 'Se salvează singur, pe măsură ce scrii.'}</p>
      </section>
      <section class="stack">
        <h2 class="today-h">Zilele trecute</h2>
        ${past.length ? past.map((k) => `<details class="journal-day"><summary><span>${longDate(k)}</span><small>${esc(entries()[k].q)}</small></summary><p>${esc(entries()[k].text)}</p></details>`).join('') : '<p class="empty">Aici vor apărea răspunsurile din zilele trecute.</p>'}
      </section>
      <section class="stack">
        <p class="journal-note">Jurnalul rămâne doar pe acest dispozitiv și nu este trimis nicăieri. Dacă se șterg datele browserului, se șterge și el, așa că e bine să păstrezi din când în când o copie.</p>
        <div><button class="btn ghost" type="button" id="export">Salvează o copie</button></div>
      </section>`;

    const box = view.querySelector('#entry');
    const status = view.querySelector('#status');
    const store = () => {
      const text = box.value.trim();
      if (text) entries()[key] = { q, text };
      else delete entries()[key];
      save();
    };
    let timer = null;
    box.addEventListener('input', () => {
      clearTimeout(timer);
      status.textContent = 'Se salvează...';
      timer = setTimeout(() => { store(); status.textContent = box.value.trim() ? 'Salvat.' : 'Se salvează singur, pe măsură ce scrii.'; }, 500);
    });
    box.addEventListener('blur', store);
    onLeave(() => { clearTimeout(timer); store(); });
    view.querySelector('#export').addEventListener('click', () => {
      store();
      if (!Object.keys(entries()).length) { toast('Încă nu ai scris nimic.'); return; }
      exportFile();
    });
  });

  window.Journal = { questionToday, doneToday };
})();
