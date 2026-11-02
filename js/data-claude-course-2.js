// Examen Claude, saptamanile 2-4.
(function () {
  const { t, pre } = window.CLAUDE_TOOLS;

  window.CLAUDE_WEEK2 = {
    id: 's2', short: 'Săptămâna 2', title: 'Săptămâna 2: Claude Code, prompturi și context', phase: 'Domeniile 3, 4 și 5 · 55% din examen',
    tagline: 'Domeniile 3, 4 și 5, plus cele 6 scenarii',
    lead: 'Parcurgem restul materiei. La final legăm totul prin cele 6 scenarii din care se aleg cele 4 de la examen.',
    advice: 'La Domeniul 3 greșeala obișnuită este să știi ce face o funcție, dar nu când o alegi. Exersează arborele de decizie până îl poți desena din memorie.',
    sessions: [
      {
        n: 1, kind: 'lesson', minutes: 60, title: 'Configurarea Claude Code: unde pui fiecare regulă',
        intro: 'Domeniul 3, punctele 3.1–3.3.',
        goals: ['Știi ierarhia CLAUDE.md', 'Alegi între CLAUDE.md, rules, skill, command, hook și permisiuni', 'Folosești frontmatter-ul pentru skills'],
        html: `<h2>1. Ierarhia CLAUDE.md</h2>
${t(['Nivel', 'Fișier', 'Cine îl primește'], [
  ['Politică de firmă', 'Managed policy', 'Toți, are prioritate maximă'],
  ['Utilizator', '<code>~/.claude/CLAUDE.md</code>', 'Doar tu, în toate proiectele'],
  ['Proiect', '<code>.claude/CLAUDE.md</code> sau <code>./CLAUDE.md</code>', 'Toată echipa, prin version control'],
  ['Local', '<code>./CLAUDE.local.md</code>', 'Doar tu, în acest proiect'],
  ['Subdirector', '<code>subdir/CLAUDE.md</code>', 'Se încarcă la lucrul în acel director'],
])}
<p><b>Întrebare clasică:</b> un coleg nou nu primește instrucțiunile. Cauza: sunt la nivel de utilizator. Le muți la nivel de proiect.</p>
<p><code>@path/to/file</code> importă un fișier, ca CLAUDE.md să rămână modular. <code>/context</code> arată ce s-a încărcat, iar <code>/memory</code> gestionează memoria.</p>
<div class="note">Materialele spun că ghidul examenului poate folosi <code>/memory</code> pentru a vedea ce e încărcat, iar documentația actuală folosește <code>/context</code>. Dacă la examen apare doar una dintre comenzi, urmează formularea ghidului.</div>
<h2>2. Arborele de decizie</h2>
${t(['Ce fel de regulă este?', 'Mecanism'], [
  ['Valabilă mereu, peste tot', '<b>CLAUDE.md</b>'],
  ['Doar pentru anumite fișiere', '<b><code>.claude/rules/</code></b> cu <code>paths:</code>'],
  ['Flux specific, la cerere', '<b>Skill</b>: <code>.claude/skills/&lt;nume&gt;/SKILL.md</code>'],
  ['Prompt reutilizabil, tastat de utilizator', '<b>Slash command</b>: <code>.claude/commands/</code>'],
  ['Trebuie respectată la granița instrumentelor', '<b>Hook</b>'],
  ['Ce are voie să facă agentul', '<b>Permisiuni</b> sau <code>allowed-tools</code>'],
])}
<h2>3. Reguli pe căi</h2>
${pre(`---
paths: ["**/*.test.tsx"]
---
# Convenții pentru teste
...`)}
<p>Regula se încarcă doar când lucrezi la fișiere potrivite. Este mai bună decât un <code>CLAUDE.md</code> în subdirector când fișierele sunt <b>împrăștiate</b> în tot proiectul, cum sunt testele. Mai bună și decât secțiuni într-un fișier mare, unde te bazezi pe inferența modelului.</p>
<h2>4. Commands și skills</h2>
${t(['Loc', 'Comun?'], [
  ['<code>.claude/commands/</code>, <code>.claude/skills/</code>', 'Da, pentru toată echipa'],
  ['<code>~/.claude/commands/</code>, <code>~/.claude/skills/</code>', 'Nu, personal. Folosește alt nume ca să nu încurci colegii.'],
])}
${t(['Frontmatter', 'Efect'], [
  ['<code>context: fork</code>', 'Rulează izolat, ca să nu încarce conversația principală'],
  ['<code>allowed-tools</code>', 'Limitează instrumentele în timpul skill-ului'],
  ['<code>argument-hint</code>', 'Cere parametrii lipsă la pornire'],
])}
<p><code>context: fork</code> se potrivește la rezultate lungi, unde contează doar concluzia (audit de cod). Nu grăbește execuția și nu impune read-only; pentru asta există <code>allowed-tools</code>. <b>Skills</b> se folosesc la cerere; <b>CLAUDE.md</b> este mereu încărcat.</p>`,
        checks: [
          ['Convenție valabilă în tot proiectul?', 'CLAUDE.md.'],
          ['Convenție pentru *.test.tsx, oriunde în repo?', '<code>.claude/rules/</code> cu <code>paths: ["**/*.test.tsx"]</code>.'],
          ['/review trebuie să existe la oricine clonează repo-ul. Unde îl pui?', '<code>.claude/commands/</code> în repo.'],
          ['Audit lung care nu trebuie să încarce conversația?', 'Skill cu <code>context: fork</code>.'],
          ['Blochezi refunduri peste 500 $?', 'Hook PreToolUse.'],
          ['Reviewerul nu are voie să scrie sau să ruleze Bash?', '<code>allowed-tools</code> sau permisiuni.'],
          ['Colegul nou nu primește instrucțiunile. De ce?', 'Sunt la nivel de utilizator, nu de proiect.'],
        ],
      },
      {
        n: 2, kind: 'lesson', minutes: 45, title: 'Plan mode, iterație și Claude Code în CI/CD',
        intro: 'Domeniul 3, punctele 3.4–3.6.',
        goals: ['Alegi între plan mode, execuție directă și flux pe etape', 'Dai instrucțiuni eficiente prin exemple', 'Configurezi un reviewer în CI în trei straturi'],
        html: `<h2>1. Plan, direct sau pe etape</h2>
${t(['Mod', 'Când', 'Exemplu'], [
  ['<b>Direct</b>', 'Mic, clar, risc scăzut', 'Un bug într-un fișier, cu stack trace'],
  ['<b>Plan mode</b>', 'Mare, arhitectural, mai multe variante, cere aprobare', 'Monolit spre microservicii, migrare în 45 de fișiere'],
  ['<b>Pe etape</b>', 'Mai multe preocupări distincte', 'Review de securitate, logică și API, cu prompturi separate'],
])}
<p>Poți combina: plan mode pentru investigație, execuție directă pentru implementare. Subagentul <b>Explore</b> este read-only: izolează căutările lungi și întoarce un rezumat, ca să nu se umple contextul principal.</p>
<h2>2. Cum îi spui ce vrei</h2>
${t(['Tehnică', 'Când'], [
  ['<b>2–3 exemple concrete de intrare și ieșire</b>', 'Când descrierea în cuvinte este interpretată diferit'],
  ['<b>Teste înainte de cod</b>', 'Scrii testele, apoi trimiți eșecurile'],
  ['<b>Interviu</b>', 'Într-un domeniu nou, îl pui pe Claude să te întrebe înainte să implementeze'],
  ['<b>Un singur mesaj</b>', 'Problemele se influențează între ele'],
  ['<b>Pe rând</b>', 'Problemele sunt independente'],
])}
<h2>3. Claude Code în CI/CD</h2>
${t(['Flag', 'Rol'], [
  ['<code>-p</code> / <code>--print</code>', 'Non-interactiv: nu mai așteaptă input. Rezolvă blocarea în CI.'],
  ['<code>--output-format json</code>', 'Rezultat pe care îl poate citi un program'],
  ['<code>--json-schema</code>', 'Impune o schemă, de exemplu pentru comentarii în PR'],
  ['<code>--allowed-tools</code>', 'Limitează instrumentele'],
  ['<code>--permission-mode</code>', '<code>default</code>, <code>acceptEdits</code>, <code>plan</code>, <code>bypassPermissions</code>'],
  ['<code>--max-turns</code>', 'Limitează numărul de ture'],
])}
<div class="rule"><b>Reviewer în trei straturi:</b> (1) standarde în CLAUDE.md, (2) instrumente restrânse: Read, Grep, Glob, fără Write și Bash, (3) rezultat structurat: <code>--output-format json --json-schema</code>. La examen se așteaptă toate trei.</div>
<ul><li><b>Executări scăpate de sub control:</b> <code>--max-turns</code>, limită de cost, instrumente restrânse și mod de permisiuni. <code>-p</code> singur nu ajunge.</li><li><b>Comentarii duplicate:</b> pui în context observațiile anterioare și ceri doar problemele noi sau nerezolvate.</li><li><b>Teste duplicate:</b> pui în context testele existente, iar standardele în CLAUDE.md.</li><li><b>Self-review:</b> sesiunea care a scris codul își vede greu greșelile. Folosește o <b>instanță independentă</b>.</li></ul>
<div class="note">Variante inventate care apar ca distractori: <code>CLAUDE_HEADLESS=true</code>, <code>--batch</code>, <code>.claude/config.json</code>.</div>`,
        checks: [
          ['Migrare în 45 de fișiere, cu aprobare?', 'Plan mode.'],
          ['Modificare mică, într-o funcție?', 'Execuție directă.'],
          ['Ce face subagentul Explore?', 'Izolează căutările lungi și întoarce un rezumat.'],
          ['Cum explici o transformare când descrierea e interpretată diferit?', 'Prin 2–3 exemple concrete de intrare și ieșire.'],
          ['Probleme care se influențează: un mesaj sau pe rând?', 'Un singur mesaj detaliat. Cele independente se rezolvă pe rând.'],
          ['Ce flag împiedică blocarea în CI?', '<code>-p</code>.'],
          ['Care sunt cele trei straturi ale unui reviewer?', 'CLAUDE.md, instrumente restrânse, rezultat structurat cu <code>--output-format json --json-schema</code>.'],
        ],
      },
      {
        n: 3, kind: 'lesson', minutes: 60, title: 'Prompturi precise și rezultat structurat',
        intro: 'Domeniul 4, punctele 4.1–4.4.',
        goals: ['Scrii criterii care reduc falsele pozitive', 'Folosești few-shot corect', 'Proiectezi o schemă care nu forțează inventarea datelor', 'Știi când ajută și când nu o reîncercare'],
        html: `<h2>1. Criterii explicite</h2>
${t(['Bine', 'Rău'], [
  ['„Semnalează comentariile doar când contrazic comportamentul codului”', '„Verifică dacă comentariile sunt corecte”'],
  ['Listă cu ce raportezi și ce ignori', '„Fii conservator”, „doar ce e sigur”'],
])}
<p>Falsele pozitive strică încrederea și în categoriile corecte. Poți <b>dezactiva temporar</b> categoriile problematice până le îmbunătățești. Pentru severitate, dă criterii cu exemple de cod.</p>
<h2>2. Few-shot</h2>
<div class="rule">Few-shot este cea mai eficientă tehnică pentru rezultate consecvente. Regula: <b>2–4 exemple țintite</b> pentru cazuri ambigue, cu motivul alegerii. Nu 5–8 exemple generice.</div>
<ul><li>Arată formatul exact: locație, problemă, severitate, corecție.</li><li>Arată surse variate: citări în text și bibliografie, narațiune și tabele.</li><li>Transformă greșelile recurente în exemple: intrare, rezultat corect, regulă.</li></ul>
${pre(`Intrare: "Built services in Python and SQL; familiar with data pipelines."
Ieșire:  ["Python", "SQL"]
Regulă:  câte o competență pe intrare; doar ce este numit explicit`)}
<h2>3. Rezultat structurat</h2>
<p>Cea mai sigură metodă: <code>tool_use</code> cu JSON schema. Definești un instrument de extragere, iar rezultatul îl iei din blocul <code>tool_use</code>.</p>
<div class="rule">Schema elimină erorile de <b>sintaxă</b>, nu pe cele de <b>sens</b>: totaluri care nu se potrivesc, valori în câmpul greșit. Pentru acestea ai nevoie de validare.</div>
${t(['Principiu', 'De ce'], [
  ['Câmpuri <b>optional / nullable</b> când sursa poate să nu aibă informația', 'Altfel modelul inventează valori'],
  ['Enum cu <b><code>"other"</code> + un câmp de detaliu</b>', 'Categoria poate crește'],
  ['Valoarea <b><code>"unclear"</code></b>', 'Pentru cazuri ambigue, nu <code>"neutral"</code>'],
  ['Reguli de normalizare în prompt', 'Sursele au formate diferite'],
])}
<p>Dacă tipul documentului nu se știe și ai mai multe scheme: <code>tool_choice: "any"</code>. Dacă un pas trebuie să fie primul: forțezi <code>extract_metadata</code>, apoi revii la <code>"auto"</code>.</p>
<h2>4. Validare și reîncercare</h2>
<p>La reîncercare trimiți <b>documentul original, extragerea eșuată și eroarea exactă</b>.</p>
${t(['Situație', 'Reîncercarea ajută?'], [
  ['Informația există, dar formatul e greșit („2 to 3” când se cere un număr)', 'Da'],
  ['Informația lipsește din document', 'Nu. Câmpul rămâne <code>null</code>.'],
])}
<p>Pentru facturi, păstrezi <code>stated_total</code> și <code>calculated_total</code>. Dacă diferă, pui <code>conflict_detected: true</code> și trimiți la verificare. Nu ajustezi niciodată sumele în tăcere. Câmpul <code>detected_pattern</code> ajută la analiza observațiilor respinse de dezvoltatori.</p>`,
        checks: [
          ['Ajută „fii conservator” la reducerea falselor pozitive?', 'Nu. Ajută criteriile explicite pe categorii.'],
          ['Câte exemple few-shot și de ce fel?', '2–4 exemple țintite pentru cazuri ambigue.'],
          ['Ce garantează tool_use cu schemă și ce nu?', 'Elimină erorile de sintaxă, nu și pe cele de sens.'],
          ['Cum împiedici inventarea unei valori lipsă?', 'Câmp optional/nullable și instrucțiunea de a întoarce <code>null</code>.'],
          ['Ce trimiți la o reîncercare?', 'Documentul original, extragerea eșuată și eroarea exactă.'],
          ['Când este inutilă reîncercarea?', 'Când informația nu există în document.'],
          ['Total declarat diferit de total calculat?', 'Păstrezi ambele, marchezi <code>conflict_detected</code> și trimiți la verificare.'],
        ],
      },
      {
        n: 4, kind: 'lesson', minutes: 40, title: 'Batch și review pe mai mulți pași',
        intro: 'Domeniul 4, punctele 4.5–4.6.',
        goals: ['Alegi între Message Batches și API sincron', 'Calculezi momentul trimiterii față de un termen', 'Organizezi un review mare'],
        html: `<h2>1. Message Batches API</h2>
${t(['Caracteristică', 'Valoare'], [
  ['Cost', 'Cu aproximativ 50% mai mic'],
  ['Durată', 'Până la 24 de ore'],
  ['SLA de latență', 'Niciunul'],
  ['Legătura cerere-răspuns', '<code>custom_id</code>'],
  ['Conversație cu instrumente', 'Fără bucla <code>tool_result</code> în același element'],
])}
<div class="note">Un element din batch poate defini instrumente și poate primi <code>tool_use</code>. Nu poți însă trimite <code>tool_result</code> și continua în aceeași cerere. Ghidul numește asta „no multi-turn tool calls”; la examen folosești această formulare.</div>
${t(['Flux', 'Batch?'], [
  ['Rapoarte peste noapte, audituri săptămânale', 'Da'],
  ['Verificare pre-merge, dezvoltatorul așteaptă', 'Nu, API sincron'],
])}
<p><b>Calcul de termen.</b> Dacă rezultatul trebuie în 30 de ore de la sosire și batch-ul poate dura 24, ai 6 ore marjă, deci trimiți cel puțin o dată la 6 ore sau într-un moment care respectă termenul.</p>
<p><b>Eșecuri.</b> Folosești <code>custom_id</code> ca să retrimiți doar documentele eșuate, de exemplu împărțite în bucăți, apoi unești rezultatele. Rafinezi întâi promptul pe un eșantion.</p>
<h2>2. Review pe mai mulți pași</h2>
<div class="rule">Modelul păstrează raționamentul din generare și își pune greu la îndoială deciziile. <b>O instanță independentă</b> găsește mai mult decât self-review.</div>
<p>Pentru PR-uri mari: <b>un pas local pentru fiecare fișier</b> și <b>un pas separat de integrare</b> între fișiere. Exemplu: un review într-un singur pas pe 14 fișiere a dat profunzime inegală și observații contradictorii. Cauza este diluarea atenției.</p>
<p><b>Variante greșite:</b></p>
<ul><li>model mai mare sau context mai mare: nu rezolvă atenția;</li><li>PR-uri mai mici: mută problema la dezvoltatori;</li><li>trei rulări și păstrezi ce apare de două ori: pierzi buguri reale.</li></ul>`,
        checks: [
          ['Cât costă Batches, cât durează și ce SLA are?', 'Cu ~50% mai ieftin, până la 24 de ore, fără SLA.'],
          ['Mutăm și verificarea pre-merge pe batch?', 'Nu. Blochează dezvoltatorii. Batch doar pentru fluxurile care pot aștepta.'],
          ['La ce folosește custom_id?', 'Leagă cererile de răspunsuri și permite retrimiterea doar a celor eșuate.'],
          ['Review inconsecvent pe 14 fișiere: soluția?', 'Pași locali pe fișier, plus un pas separat de integrare.'],
          ['Self-review sau instanță independentă?', 'Instanță independentă, fără raționamentul din generare.'],
        ],
      },
      {
        n: 5, kind: 'lesson', minutes: 60, title: 'Context, escaladare și erori în sisteme multi-agent',
        intro: 'Domeniul 5, punctele 5.1–5.3.',
        goals: ['Păstrezi faptele importante într-o conversație lungă', 'Știi când escaladezi', 'Propagi erorile corect'],
        html: `<h2>1. Cum se pierde informația</h2>
<ul><li><b>Rezumarea progresivă</b> transformă sume, date și procente în formule vagi.</li><li><b>Lost in the middle:</b> modelul reține mai bine începutul și sfârșitul unui text lung.</li><li><b>Rezultatele instrumentelor</b> se adună: 40 de câmpuri când ai nevoie de 5.</li><li>API-ul este <b>stateless</b>: istoricul se trimite la fiecare cerere.</li></ul>
${t(['Simptom', 'Tehnică'], [
  ['Faptele se pierd pe parcurs', '<b>Case facts</b>: un bloc de fapte, în fiecare prompt, în afara rezumatului'],
  ['Istoricul crește prea mult', '<b>Sliding window</b> + rezumat al părții vechi'],
  ['Rezultate lungi ale instrumentelor', '<b>Păstrezi doar câmpurile utile</b>, înainte să se adune'],
  ['Instrucțiune ignorată în text lung', '<b>Ordine</b>: esențialul la început și la sfârșit, cu titluri clare'],
  ['Persistență între sesiuni', '<b>Scratchpad</b>: fișiere la care faci referire'],
  ['Mai multe probleme într-o sesiune', 'Stare structurată pentru fiecare problemă'],
])}
<p>Dacă agentul din aval are puțin context, modifici <b>agentul din amonte</b> ca să întoarcă date structurate, nu text lung. Sau împarți un document lung în bucăți, extragi din fiecare și unești rezultatele.</p>
<h2>2. Când escaladezi</h2>
${t(['Situație', 'Ce faci'], [
  ['Clientul cere <b>explicit un om</b>', 'Escaladezi imediat, fără investigație'],
  ['<b>Politica nu acoperă</b> cazul', 'Escaladezi'],
  ['Nu mai poți progresa', 'Escaladezi'],
  ['Client frustrat, dar problemă simplă', 'Recunoști frustrarea și oferi soluția; escaladezi doar dacă insistă'],
  ['<b>Mai mulți clienți găsiți</b>', 'Ceri alte date de identificare, nu ghicești'],
])}
<div class="rule">Greșite: <b>analiza de sentiment</b>, <b>scorul de încredere raportat de model</b> și <b>clasificatorul nou</b> ca prim pas. Corect: <b>criterii explicite + few-shot</b>.</div>
<h2>3. Erorile între agenți</h2>
<p>Coordinatorul poate decide doar dacă primește: <b>tipul erorii, ce s-a încercat, rezultatele parțiale și alternativele</b>.</p>
${t(['Variantă', 'Verdict'], [
  ['Eroare generică, „search unavailable”', 'Greșit: ascunde informația'],
  ['Rezultat gol raportat ca succes', 'Greșit: nu mai există recuperare'],
  ['Oprești tot fluxul', 'Greșit: reacție disproporționată'],
  ['Recuperare locală, apoi context structurat', 'Corect'],
])}
<p>Sinteza finală marchează ce este bine susținut și unde există goluri, adică <b>coverage annotations</b>.</p>`,
        checks: [
          ['Sumele și datele se pierd într-o conversație lungă. Soluția?', 'Bloc persistent de case facts, în fiecare prompt, în afara rezumatului.'],
          ['Ce este „lost in the middle”? Cum îl combați?', 'Mijlocul textelor lungi e reținut mai slab. Pui esențialul la început și la sfârșit.'],
          ['Care sunt cele trei motive valide de escaladare?', 'Cerere explicită, politică lipsă sau ambiguă, imposibilitatea de a progresa.'],
          ['Ce două semnale de escaladare sunt nesigure?', 'Sentimentul și scorul de încredere raportat de model.'],
          ['Ai găsit mai mulți clienți cu același nume?', 'Ceri alte date de identificare.'],
          ['Ce conține o eroare utilă pentru coordinator?', 'Tip, ce s-a încercat, rezultate parțiale, alternative.'],
        ],
      },
      {
        n: 6, kind: 'lesson', minutes: 45, title: 'Cod mare, verificare umană și surse',
        intro: 'Domeniul 5, punctele 5.4–5.6.',
        goals: ['Explorezi un cod mare fără să pierzi contextul', 'Calibrezi verificarea umană', 'Păstrezi sursele și dezacordurile'],
        html: `<h2>1. Explorarea unui cod mare</h2>
<p>Semn de degradare: modelul vorbește despre „tipare obișnuite”, nu despre clasele găsite mai devreme. Instrumente:</p>
<ol><li><b>Scratchpad:</b> notezi descoperirile în fișiere și le recitești.</li><li><b>Subagenți</b> pentru întrebări precise; agentul principal păstrează imaginea de ansamblu.</li><li><b>Manifeste</b> pentru reluare după o cădere.</li><li><b><code>/compact</code></b> pentru a elibera context.</li></ol>
<p>Scăderea bruscă a calității lângă limita de context, conținutul lipsă din final sau o eroare de context arată că sistemul, instrumentele, conversația și documentul depășesc bugetul. Nu este o problemă generală a modelului.</p>
<h2>2. Verificare umană</h2>
<div class="rule">O acuratețe de 97% poate ascunde rezultate slabe pe un anumit tip de document sau câmp. Înainte să reduci verificarea umană, măsori <b>pe tip de document și pe câmp</b>.</div>
${t(['Instrument', 'Rol'], [
  ['<b>Stratified random sampling</b>', 'Măsori erorile și la extragerile cu încredere mare; găsești tipare noi'],
  ['<b>Încredere pe câmp</b>, calibrată pe date etichetate', 'Stabilești pragurile de verificare'],
  ['<b>Rutare</b> după încredere scăzută sau surse contradictorii', 'Folosești bine timpul limitat al oamenilor'],
])}
<p>Rezultatul include <code>requires_review</code> și <code>review_reasons</code>, ca decizia să poată fi verificată.</p>
<p><b>Deriva instrucțiunilor:</b> în conversații lungi, regulile vechi slăbesc. Le reamintești la momente potrivite; regulile critice stau în system prompt. Când schimbi comportamentul, versionezi promptul și aplici versiunea nouă doar conversațiilor noi. Pentru RAG, păstrezi rezultatele ultimelor 2–3 căutări, fără să înlocuiești conversația.</p>
<h2>3. Surse și incertitudine</h2>
${pre(`{ "claim": "...", "evidence_excerpt": "...", "source_url": "...",
  "source_doc": "...", "publication_date": "2024-11-03", "relevance": "high" }`)}
<ul><li>Subagenții produc perechi <b>afirmație-sursă</b>, iar agenții următori le păstrează și le unesc.</li><li><b>Sursele se contrazic:</b> dai ambele valori, cu sursa, și marchezi dezacordul. Nu faci media și nu alegi cea mai nouă valoare.</li><li><b>Date:</b> cere data publicării sau a colectării. Diferența dintre 2023 și 2024 poate să nu fie o contradicție.</li><li><b>Etichete:</b> stabilit, contestat, slab susținut.</li><li><b>Formatul:</b> date financiare în tabele, știri în proză, rezultate tehnice în liste.</li></ul>`,
        checks: [
          ['Trei instrumente pentru explorare lungă?', 'Scratchpad, subagenți, manifeste. Plus <code>/compact</code>.'],
          ['De ce poate înșela o acuratețe de 97%?', 'Poate ascunde rezultate slabe pe anumite tipuri de documente sau câmpuri.'],
          ['Cum măsori erorile la extragerile cu încredere mare?', 'Prin stratified random sampling.'],
          ['Două surse credibile se contrazic. Ce faci?', 'Prezinți ambele valori cu sursa lor și marchezi dezacordul.'],
          ['De ce ceri data publicării?', 'Ca diferențele de timp să nu pară contradicții.'],
        ],
      },
      {
        n: 7, kind: 'lesson', minutes: 45, title: 'Cele 6 scenarii',
        intro: 'La examen primești 4 dintre ele, fiecare cu aproximativ 15 întrebări.',
        html: `<h2>Scenariul 1. Agent de suport clienți</h2>
<p>Instrumente: <code>get_customer</code>, <code>lookup_order</code>, <code>process_refund</code>, <code>escalate_to_human</code>. Țintă: peste 80% rezolvare la primul contact. Domenii: 1, 2, 5.</p>
${t(['Simptom', 'Răspuns'], [
  ['Sare peste <code>get_customer</code>', 'Prerequisite gate'],
  ['Alege instrumentul greșit', 'Extinzi descrierile'],
  ['Escaladează cazuri ușoare', 'Criterii explicite + few-shot'],
  ['Refund peste 500 $', 'Hook PreToolUse'],
  ['Formate diferite la instrumente', 'Hook PostToolUse'],
  ['Predare către om', 'Rezumat: ID, cauză, sumă, recomandare'],
])}
<h2>Scenariul 2. Generare de cod cu Claude Code</h2>
<p>Domenii: 3, 5.</p>
${t(['Nevoie', 'Răspuns'], [
  ['/review pentru toată echipa', '<code>.claude/commands/</code>'],
  ['Monolit spre microservicii', 'Plan mode'],
  ['Teste împrăștiate', '<code>.claude/rules/</code> cu <code>paths:</code>'],
  ['Skill cu rezultat lung', '<code>context: fork</code>'],
])}
<h2>Scenariul 3. Sistem de cercetare multi-agent</h2>
<p>Subagenți: căutare web, analiză, sinteză, raport. Domenii: 1, 2, 5.</p>
${t(['Simptom', 'Răspuns'], [
  ['Temă acoperită parțial', 'Descompunere prea îngustă la coordinator'],
  ['Timeout la căutare', 'Eroare structurată către coordinator'],
  ['Verificări simple frecvente', 'Instrument restrâns <code>verify_fact</code>'],
  ['Surse pierdute', 'Perechi afirmație-sursă, cu date'],
  ['Statistici contradictorii', 'Ambele valori, cu sursa'],
])}
<h2>Scenariul 4. Productivitate pentru dezvoltatori</h2>
<p>Instrumente incluse și MCP. Domenii: 2, 3, 1.</p>
${t(['Nevoie', 'Răspuns'], [
  ['Toate apelurile unei funcții', 'Grep'],
  ['Toate fișierele de test', 'Glob'],
  ['Edit cu text neunic', 'Read + Write'],
  ['Explorare lungă', 'Scratchpad, subagenți, <code>/compact</code>'],
  ['Jira', 'Server MCP din comunitate; catalog ca resource'],
])}
<h2>Scenariul 5. Claude Code în CI</h2>
<p>Domenii: 3, 4.</p>
${t(['Nevoie', 'Răspuns'], [
  ['Se blochează în CI', '<code>-p</code>'],
  ['Pre-merge și raport peste noapte', 'Batch doar pentru raport'],
  ['Review pe 14 fișiere', 'Pași pe fișier + integrare'],
  ['Comentarii în PR', '<code>--output-format json --json-schema</code>'],
  ['Comentarii duplicate', 'Observațiile vechi în context'],
])}
<h2>Scenariul 6. Extragere de date structurate</h2>
<p>Domenii: 4, 5.</p>
${t(['Nevoie', 'Răspuns'], [
  ['Rezultat conform schemei', '<code>tool_use</code> + JSON schema'],
  ['Tip necunoscut de document', '<code>tool_choice: "any"</code>'],
  ['Câmp care poate lipsi', 'Nullable'],
  ['Categorie extensibilă', 'Enum cu <code>"other"</code> + detaliu'],
  ['Validare eșuată', 'Reîncercare cu documentul, extragerea și eroarea'],
  ['Volum mare peste noapte', 'Batches, cu <code>custom_id</code>'],
  ['Verificare umană', 'Eșantionare stratificată, acuratețe pe tip și câmp'],
])}`,
        checks: [
          ['Cum abordezi orice întrebare de scenariu?', 'Recunoști scenariul și instrumentele, găsești verbul de decizie, aplici filtrul programatic/probabilistic, elimini variantele tipic greșite, alegi termenii din ghid.'],
          ['Ce scenarii acoperă toate domeniile dacă le stăpânești bine?', 'Scenariile 1, 3, 5 și 6.'],
        ],
      },
      { n: 8, kind: 'cards', minutes: 40, title: 'Fișe: Domeniile 3, 4 și 5', decks: [2, 3, 4] },
    ],
  };

  window.CLAUDE_WEEK3 = {
    id: 's3', short: 'Săptămâna 3', title: 'Săptămâna 3: Examen de probă 1 și capcane', phase: 'Recapitulare activă',
    tagline: 'Primul examen complet, analiza greșelilor, capcanele',
    lead: 'Dai primul examen în condiții reale, analizezi fiecare greșeală, apoi înveți să recunoști variantele false.',
    advice: 'Pentru fiecare greșeală notează: domeniul, de ce ai ales greșit și regula care te-ar fi ajutat.',
    sessions: [
      { n: 1, kind: 'exam', minutes: 120, title: 'Examen de probă 1', exam: 0 },
      {
        n: 2, kind: 'lesson', minutes: 60, title: 'Capcanele: cum elimini variantele false',
        intro: 'Aproximativ un sfert dintre variante sunt construite să pară corecte.',
        goals: ['Recunoști tiparele de variante greșite', 'Elimini rapid distractorii', 'Alegi după tipul întrebării'],
        html: `<h2>1. Tipare generale</h2>
${t(['Tipar', 'De ce este, de obicei, greșit'], [
  ['<b>Mai mare, mai mult</b>: model mai mare, mai multe exemple, mai multe instrumente', 'Soluția corectă este de obicei mai țintită'],
  ['<b>Încă un strat</b>: rutare, clasificator, cache', 'Prea mult pentru un „first step”'],
  ['<b>Cere în prompt</b>', 'Probabilistic, dacă nu există și un control programatic'],
  ['<b>Se evaluează singur</b>: scor de încredere, sentiment, self-review', 'Inferior unui control independent'],
  ['<b>Vot</b>: păstrezi ce apare în cel puțin 2 din 3 rulări', 'Pierzi buguri reale'],
  ['<b>Flag-uri inventate</b>: <code>CLAUDE_HEADLESS</code>, <code>--batch</code>', 'Nu există'],
])}
<h2>2. Pe tip de întrebare</h2>
${t(['Tip', 'Elimină', 'Alege'], [
  ['Fiabilitate, bani, ordine', 'System prompt, exemple, contor de iterații', 'Gate, hook, <code>tool_choice</code>, schemă'],
  ['Instrument greșit', '5–8 exemple, routing layer, instrument unic', 'Descrieri mai bune'],
  ['Escaladare', 'Scor de încredere, sentiment, clasificator', 'Criterii + few-shot; cererea explicită; politică lipsă'],
  ['Erori între agenți', 'Eroare generică, succes fals, oprire totală', 'Context structurat'],
  ['Delegare', 'Toate instrumentele pentru sinteză, verificări la final', 'Instrument restrâns, descompunere largă'],
  ['Pierdere de context', 'Context mai mare, rezumare mai agresivă', 'Case facts, esențial la început, câmpuri puține'],
  ['Rezultat structurat', 'Toate câmpurile obligatorii, reîncercări nelimitate', '<code>tool_use</code>, nullable, <code>"other"</code>, <code>"unclear"</code>'],
  ['Batch', 'Batch pentru pre-merge', 'Batch peste noapte, sincron pentru blocante'],
  ['Review', 'PR-uri mai mici, model mai mare, vot', 'Pași pe fișier + integrare, instanță independentă'],
  ['Configurare', 'CLAUDE.md la rădăcină pe secțiuni, nivel de utilizator pentru echipă', 'Rules cu <code>paths:</code>; <code>.claude/</code> pentru echipă'],
  ['CI', 'Flag-uri inventate, <code>&lt; /dev/null</code>, self-review', '<code>-p</code>, <code>--output-format json</code>, <code>--json-schema</code>'],
])}
<h2>3. Etichetează fiecare variantă</h2>
<ul><li><b>Deterministă:</b> corectă, de regulă, când se cere o garanție.</li><li><b>Probabilistică:</b> corectă când problema este claritatea sau consecvența.</li><li><b>Supradimensionată:</b> de obicei greșită la „first step”.</li><li><b>Anti-pattern:</b> aproape mereu greșită.</li></ul>
<h2>4. Tactici pentru ziua examenului</h2>
<ul><li>Ai 2 minute pe întrebare. După 3 minute, alegi, marchezi și mergi mai departe.</li><li>La alegere multiplă, recitești câte răspunsuri se cer.</li><li>Alege varianta care folosește termenii din ghid.</li></ul>`,
        checks: [
          ['Variantele „model mai mare” sau „context mai mare” sunt de obicei corecte?', 'Nu. Mărimea nu rezolvă atenția sau cauza problemei.'],
          ['Întrebarea menționează pierderi financiare. Ce variantă cauți?', 'Una programatică: gate, hook, <code>tool_choice</code>, schemă.'],
          ['Întrebarea spune „first step” și apare un clasificator nou. Îl alegi?', 'De regulă nu: este supradimensionat.'],
          ['De ce este greșit să păstrezi doar ce apare în 2 din 3 rulări?', 'Pierzi buguri reale, găsite doar uneori.'],
        ],
      },
      { n: 3, kind: 'cards', minutes: 40, title: 'Fișe: Teme care se greșesc des', decks: [5, 6, 7, 8, 9] },
    ],
  };

  window.CLAUDE_WEEK4 = {
    id: 's4', short: 'Săptămâna 4', title: 'Săptămâna 4: Examen de probă 2, laboratoare și recapitulare', phase: 'Consolidare',
    tagline: 'Al doilea examen, cele 4 laboratoare, recapitularea finală',
    lead: 'Ținta este 90% la al doilea examen. Laboratoarele fixează sintaxa, iar recapitularea finală acoperă tot ce trebuie știut din memorie.',
    advice: 'Reia lecțiile domeniilor slabe de la examenul de probă și folosește lista finală în ultima zi.',
    sessions: [
      { n: 1, kind: 'exam', minutes: 120, title: 'Examen de probă 2', exam: 1 },
      {
        n: 2, kind: 'lesson', minutes: 120, title: 'Cele 4 laboratoare practice',
        intro: 'Exercițiile oficiale de pregătire. Pașii compleți și codul sunt în fișierul 15-Hands-on-Labs.md din pachetul tău.',
        html: `<p>Rulează-le dacă ai acces la Claude Agent SDK și Claude Code. Sintaxa se reține mai ușor după ce ai scris-o o dată.</p>
<h2>Laboratorul 1. Agent cu mai multe instrumente și escaladare</h2>
<ol><li>Definești 4 instrumente MCP, cu descrieri bune.</li><li>Scrii bucla agentică după <code>stop_reason</code>.</li><li>Întorci erori structurate.</li><li>Adaugi un hook pentru escaladare.</li><li>Testezi o cerere cu mai multe probleme.</li></ol>
<p><b>Domenii:</b> 1, 2, 5. <b>Ce fixezi:</b> regula programatică în practică.</p>
<h2>Laboratorul 2. Claude Code pentru o echipă</h2>
<ol><li>Construiești ierarhia CLAUDE.md.</li><li>Adaugi reguli cu <code>paths:</code>.</li><li>Creezi un skill izolat, cu <code>context: fork</code>.</li><li>Configurezi <code>.mcp.json</code> și <code>~/.claude.json</code>.</li><li>Compari plan mode cu execuția directă.</li></ol>
<p><b>Domenii:</b> 2, 3. <b>Ce fixezi:</b> unde stă fiecare configurare.</p>
<h2>Laboratorul 3. Extragere de date</h2>
<ol><li>Instrument de extragere cu nullable, enum și <code>"other"</code>.</li><li>Buclă de validare și reîncercare.</li><li>Few-shot pentru documente variate.</li><li>Message Batches API.</li><li>Rutare la verificare umană și eșantionare stratificată.</li></ol>
<p><b>Domenii:</b> 4, 5.</p>
<h2>Laboratorul 4. Pipeline de cercetare multi-agent</h2>
<ol><li>Coordinator și doi subagenți.</li><li>Execuție paralelă.</li><li>Transmitere explicită a contextului.</li><li>Erori structurate și perechi afirmație-sursă.</li></ol>
<p><b>Domenii:</b> 1, 2, 5.</p>`,
      },
      {
        n: 3, kind: 'lesson', minutes: 60, title: 'Recapitulare finală',
        intro: 'Tot ce trebuie să poți spune din memorie înainte de examen.',
        html: `<h2>Reguli de reținut</h2>
<ol><li>Descrieri întâi, few-shot apoi, rearhitectură la final.</li><li>Garanțiile cer controale programatice; prompturile sunt probabilistice.</li><li>Few-shot înseamnă 2–4 exemple țintite pentru cazuri ambigue.</li><li>Erorile structurate au context; cele generice îl ascund.</li><li><code>.</code> înseamnă comun, <code>~</code> înseamnă personal.</li><li>Batch: ieftin, până la 24 de ore, fără SLA, niciodată pentru fluxuri blocante.</li><li>Context: rezultate scurte, fapte persistente, esențialul primul, subagenți pentru text lung.</li><li>Instanța independentă bate self-review; pașii pe fișier plus integrare bat pasul unic.</li></ol>
<h2>Lista de verificare înainte de examen</h2>
<ul class="checklist"><li>Am citit ghidul oficial (<code>Exam Guide.txt</code>) de două ori.</li><li>Spun din memorie cele 5 domenii cu ponderi și cele 6 scenarii.</li><li>Scriu bucla agentică din memorie.</li><li>Explic <code>auto</code>, <code>any</code> și forțarea unui instrument.</li><li>Știu ierarhia CLAUDE.md și ce este comun sau personal.</li><li>Știu când aleg plan mode, execuția directă și Explore.</li><li>Știu faptele despre Message Batches.</li><li>Aleg corect între Grep, Glob, Read, Write, Edit și Bash.</li><li>Am minimum 85% la ambele examene de probă.</li><li>Am verificat fiecare greșeală în lecții și în ghid.</li></ul>
<div class="note">Niciun pachet de studiu nu garantează un scor. Dacă materialele diferă de ghid, se ține cont de ghid.</div>`,
      },
      { n: 4, kind: 'cards', minutes: 45, title: 'Fișe: toate domeniile', decks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
    ],
  };
})();
