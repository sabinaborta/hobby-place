// Examen Claude, saptamana 1: domeniile 1 si 2. Lectii scrise in romana pe baza pachetului de studiu; termenii raman in engleza, ca la examen.
(function () {
  const t = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const pre = (s) => `<pre class="code">${s}</pre>`;

  window.CLAUDE_WEEK1 = {
    id: 's1', short: 'Săptămâna 1', title: 'Săptămâna 1: Arhitectură agentică, instrumente și MCP', phase: 'Domeniile 1 și 2 · 45% din examen',
    tagline: 'Domeniul 1 (27%) și Domeniul 2 (18%)',
    lead: 'Începem cu cele două domenii care dau aproape jumătate din întrebări. La finalul săptămânii știi bucla agentică, multi-agent, hooks, proiectarea instrumentelor și MCP.',
    advice: 'După fiecare lecție, închide pagina și scrie din memorie ideile principale. La examen nu contează doar ce face o funcție, ci când o alegi în locul alteia.',
    sessions: [
      {
        n: 1, kind: 'lesson', minutes: 45, title: 'Cum arată examenul și cum citești o întrebare',
        goals: ['Știi structura examenului și cele 5 domenii', 'Aplici regula care rezolvă cele mai multe întrebări', 'Citești o întrebare în 6 pași'],
        html: `<h2>1. Structura examenului</h2>
${t(['Element', 'Valoare'], [
  ['Certificare', 'Claude Certified Architect – Foundations (cod CCAR-F)'],
  ['Întrebări', '60: alegere simplă și alegere multiplă; fiecare spune câte răspunsuri alegi'],
  ['Scenarii', '4 scenarii extrase la întâmplare din 6'],
  ['Timp', '120 de minute, deci 2 minute pe întrebare'],
  ['Prag de trecere', '720, pe o scală de la 100 la 1 000'],
  ['Notare', 'După un standard fix, nu prin comparație cu alți candidați'],
])}
<h2>2. Cele 5 domenii</h2>
${t(['Domeniu', 'Pondere', 'Întrebări', 'Temă'], [
  ['1', '27%', '~16', 'Arhitectură agentică și orchestrare'],
  ['3', '20%', '~12', 'Configurarea Claude Code și fluxuri de lucru'],
  ['4', '20%', '~12', 'Prompt engineering și rezultat structurat'],
  ['2', '18%', '~11', 'Proiectarea instrumentelor și integrarea MCP'],
  ['5', '15%', '~9', 'Gestionarea contextului și fiabilitate'],
])}
<h2>3. Regula principală</h2>
<div class="rule">Când o secvență de instrumente, o regulă de business sau o cerință de conformitate <b>trebuie garantată</b>, alegi o soluție <b>programatică</b> (hook, prerequisite gate, <code>tool_choice</code>, schemă). Instrucțiunile din prompt sunt <b>probabilistice</b> și pot eșua.</div>
${t(['Situație', 'Răspuns corect', 'Capcană'], [
  ['Verificarea identității înainte de refund', 'Prerequisite gate', '„Scrie în system prompt”'],
  ['Refunduri peste 500 $', 'Hook care interceptează apelul', 'Instrucțiune în prompt'],
  ['Rezultat JSON garantat', '<code>tool_use</code> + JSON schema', '„Răspunde doar cu JSON”'],
  ['Ordine forțată a instrumentelor', '<code>tool_choice</code> forțat', 'Exemple în prompt'],
  ['Convenții pentru anumite fișiere', '<code>.claude/rules/</code> cu <code>paths:</code>', 'Secțiuni într-un CLAUDE.md mare'],
])}
<h2>4. Citirea unei întrebări, în 6 pași</h2>
<ol><li>Citește scenariul: numere, constrângeri, instrumente numite.</li><li>Găsește verbul de decizie: <i>most effective</i>, <i>first step</i>, <i>root cause</i>.</li><li>Citește toate cele 4 variante.</li><li>Etichetează fiecare variantă: deterministă, probabilistică, supradimensionată sau anti-pattern.</li><li>Potrivește verbul cu varianta: <i>root cause</i> cere cauza din amonte, <i>first step</i> cere efortul mic și efectul mare.</li><li>Verifică: de ce n-ar fi corectă a doua variantă bună?</li></ol>
<h2>5. Ce nu intră în examen</h2>
<p>Fine-tuning, autentificare și facturare API, găzduirea serverelor MCP, internele modelului, Constitutional AI, embeddings și baze vectoriale, computer use, vision, streaming, rate limits. O variantă bazată pe acestea este, de regulă, greșită.</p>
<div class="note">Dacă documentația actuală diferă de ghidul examenului, la examen contează formularea din ghid. De exemplu, ghidul spune <b>Task tool</b>, iar documentația actuală spune <b>Agent tool</b>.</div>`,
        checks: [
          ['Câte întrebări și cât timp are examenul?', '60 de întrebări în 120 de minute, deci 2 minute pe întrebare.'],
          ['Care este pragul de trecere?', '720 pe o scală de la 100 la 1 000.'],
          ['Care sunt ponderile celor 5 domenii?', 'D1 27%, D2 18%, D3 20%, D4 20%, D5 15%.'],
          ['De ce nu este suficientă o instrucțiune în prompt când ai nevoie de o garanție?', 'Pentru că este probabilistică: modelul o poate ignora. O garanție cere un control programatic.'],
          ['Ce cere de obicei formularea „first step”?', 'Corecția cu efort mic și efect mare, care atinge cauza, nu o arhitectură nouă.'],
        ],
      },
      {
        n: 2, kind: 'lesson', minutes: 60, title: 'Bucla agentică și sistemele multi-agent',
        intro: 'Domeniul 1, punctele 1.1–1.3 și paralelismul.',
        goals: ['Scrii din memorie bucla agentică', 'Explici arhitectura hub-and-spoke', 'Transmiți context corect către subagenți', 'Alegi între coordinator-worker, paralel și pipeline'],
        html: `<h2>1. Bucla agentică</h2>
${pre(`1. Trimiți cererea: system + istoric + tools
2. Claude răspunde. Citești response.stop_reason
3. Dacă stop_reason == "tool_use":
      execuți fiecare instrument cerut
      adaugi în istoric mesajul assistant (tool_use)
      adaugi un mesaj user cu tool_result pentru fiecare tool_use_id
      revii la pasul 1
   Altfel (de obicei "end_turn"):
      modelul a terminat; oprești bucla`)}
<div class="rule"><code>tool_use</code> înseamnă <b>continuă</b>. <code>end_turn</code> înseamnă <b>oprește</b>. Decizia se ia după câmpul <code>stop_reason</code>, niciodată după text.</div>
<p>Rezultatele instrumentelor intră în istoric, iar modelul alege următorul pas pe baza lor. Asta e diferența față de un router cu reguli fixe, care duce mereu aceeași stare în același pas.</p>
<p><b>Greșeli care apar ca variante false:</b></p>
<ul><li>verifici dacă asistentul a scris „gata”;</li><li>folosești un număr maxim de iterații ca oprire <b>principală</b> (ca plasă de siguranță este acceptabil);</li><li>consideri textul asistentului semn de terminare.</li></ul>
<h2>2. Arhitectura hub-and-spoke</h2>
<p>Un singur <b>coordinator</b> face: descompunerea sarcinii, delegarea, combinarea rezultatelor, rutarea informației și tratarea erorilor. Subagenții sunt specializați: căutare web, analiză de documente, sinteză, raport.</p>
<p><b>De ce trece totul prin coordinator?</b> Pentru observabilitate, tratare consecventă a erorilor și flux controlat de informație. Nu pentru token-uri și nu pentru că subagenții n-ar putea apela instrumente.</p>
<div class="rule">Subagenții <b>nu moștenesc automat</b> istoricul coordinatorului. Tot ce trebuie să știe primesc explicit în prompt.</div>
<p><b>Riscuri ale coordinatorului.</b> O descompunere prea îngustă duce la acoperire incompletă: tema „AI în industriile creative” a fost împărțită doar în artă digitală, design grafic și fotografie, deci muzica și scrisul au lipsit. Vina este a coordinatorului, nu a subagenților. A doua greșeală este să rulezi tot pipeline-ul la fiecare cerere, în loc să alegi subagenții după nevoie.</p>
<p><b>Ce face un coordinator bun.</b> Împarte domeniul fără suprapuneri, verifică sinteza, găsește golurile, redeleagă întrebări țintite și repetă. Promptul lui stabilește <b>obiective și criterii de calitate</b>, nu pași rigizi.</p>
<h2>3. Pornirea subagenților</h2>
<ul><li>Coordinatorul pornește subagenți prin <b>Task tool</b>, deci <code>allowedTools</code> trebuie să includă <code>"Task"</code>.</li><li>Un subagent este definit prin <b>AgentDefinition</b>: descriere, system prompt, restricții de instrumente.</li><li>Sinteza trebuie să primească în prompt rezultatele complete de la căutare și analiză.</li><li>Folosește date structurate care separă conținutul de metadate (URL, document, pagină), ca să nu pierzi sursa.</li></ul>
<h2>4. Execuție paralelă</h2>
<p>Nu există un flag <code>parallel: true</code>. Paralelismul înseamnă <b>mai multe blocuri <code>tool_use</code> în același răspuns</b> al asistentului.</p>
${t(['Situație', 'Decizie'], [
  ['Subsarcini independente', 'Paralel, în același răspuns'],
  ['B are nevoie de rezultatul lui A', 'Secvențial: <code>get_customer</code> înainte de <code>lookup_order</code>'],
])}
<p>Timpul total este aproximativ numărul de ture înmulțit cu durata unei ture. Șase apeluri independente, mutate dintr-o tură în șase într-o singură tură, reduc timpul de aproape șase ori.</p>
<h2>5. Ce topologie alegi</h2>
${t(['Cerința dominantă', 'Alegi', 'Motiv'], [
  ['Acoperire: toate unghiurile, completarea golurilor', 'Coordinator-worker', 'Bucla centrală găsește golurile și redeleagă'],
  ['Fiabilitate, reluare, tratarea erorilor', 'Coordinator-worker', 'Control central, observabilitate'],
  ['Viteză, subsarcini independente', 'Paralel', 'Totul într-o singură tură'],
  ['Dependențe ordonate', 'Pipeline secvențial', 'Fiecare etapă are nevoie de cea anterioară'],
])}`,
        checks: [
          ['Ce două valori ale lui stop_reason conduc bucla?', '<code>tool_use</code> continuă bucla; <code>end_turn</code> o oprește.'],
          ['Numește trei moduri greșite de a opri bucla.', 'Citirea textului natural, numărul de iterații ca oprire principală, textul asistentului ca semn de terminare.'],
          ['Moștenesc subagenții contextul coordinatorului?', 'Nu. Totul se transmite explicit în promptul lor.'],
          ['Ce trebuie să conțină allowedTools la coordinator?', '<code>"Task"</code>.'],
          ['Tema a fost acoperită incomplet, deși subagenții au lucrat corect. Unde este cauza?', 'În descompunerea prea îngustă făcută de coordinator.'],
          ['Cum rulezi trei apeluri independente în paralel?', 'Trei blocuri <code>tool_use</code> în același răspuns al asistentului. Nu există un flag.'],
          ['De ce trece comunicarea prin coordinator?', 'Observabilitate, tratare consecventă a erorilor, flux controlat de informație.'],
        ],
      },
      {
        n: 3, kind: 'lesson', minutes: 60, title: 'Hooks, descompunerea sarcinilor și sesiuni',
        intro: 'Domeniul 1, punctele 1.4–1.7.',
        goals: ['Deosebești controlul programatic de instrucțiunile din prompt', 'Folosești PreToolUse și PostToolUse corect', 'Alegi tipul de descompunere', 'Alegi între resume, fork și sesiune nouă'],
        html: `<h2>1. Programatic sau prin prompt</h2>
${t(['Mecanism', 'Natură', 'Eșec'], [
  ['Hooks, prerequisite gates', 'Deterministă', 'Aproape zero, dacă sunt implementate și conectate corect'],
  ['Instrucțiuni în prompt', 'Probabilistică', 'Mai mare ca zero'],
])}
<p><b>Prerequisite gate.</b> Blochezi apelurile următoare până când pasul obligatoriu s-a încheiat. Exemplu: <code>lookup_order</code> și <code>process_refund</code> rămân blocate până când <code>get_customer</code> a întors un ID verificat. Este soluția clasică atunci când jurnalele arată că agentul sare peste <code>get_customer</code>.</p>
<div class="note">„Determinist” descrie mecanismul. Un hook cu un matcher greșit nu aplică nimic, deci și hook-urile trebuie testate.</div>
<h2>2. Cele două tipuri de hook</h2>
${t(['Hook', 'Când acționează', 'Rol', 'Exemplu'], [
  ['<b>PostToolUse</b>', 'După instrument, înainte ca modelul să vadă rezultatul', 'Transformă rezultatul', 'Aduce timestamp Unix, ISO 8601 și coduri numerice la același format'],
  ['<b>PreToolUse</b> (interceptare)', 'Înainte de execuție', 'Blochează sau redirecționează', 'Blochează refundurile peste 500 $ și trimite cazul la un om'],
])}
<h2>3. Cereri cu mai multe probleme și predarea către om</h2>
<p>„Vreau refund, corectați factura și schimbați adresa” se descompune în trei probleme. Le investighezi separat, adesea în paralel, apoi dai un singur răspuns unitar.</p>
<p>Omul care preia cazul <b>nu vede conversația</b>. Rezumatul trebuie să conțină: ID-ul clientului, cauza, suma și acțiunea recomandată.</p>
<h2>4. Descompunerea sarcinilor</h2>
${t(['Model', 'Când', 'Exemplu'], [
  ['<b>Prompt chaining</b> (pipeline fix)', 'Pași previzibili', 'Analizezi fiecare fișier, apoi faci un pas de integrare între fișiere'],
  ['<b>Descompunere dinamică</b>', 'Investigație deschisă', '„Adaugă teste într-un cod vechi”: mapezi, găsești zonele importante, adaptezi planul'],
])}
<h2>5. Sesiuni</h2>
${t(['Nevoie', 'Mecanism'], [
  ['Continui o conversație anume', '<code>--resume &lt;nume&gt;</code>'],
  ['Compari două abordări din același punct', '<code>fork_session</code> (în CLI: <code>--fork-session</code>)'],
  ['Codul s-a schimbat puțin', 'Reiei și spui exact ce fișiere s-au schimbat'],
  ['Rezultatele vechi nu mai sunt valabile', 'Sesiune nouă + rezumat structurat'],
])}
<h2>6. Reluarea după o cădere</h2>
<p><code>--resume</code> reia o conversație, dar nu restaurează un pipeline făcut pe jumătate. Pentru asta, fiecare worker scrie un <b>manifest</b> JSON:</p>
${pre(`{ "completed": [...], "findings": [...], "errors": [...], "coverage_gaps": [...] }`)}
<p>La reluare, coordinatorul citește manifestele și le pune în prompt: „Continuă doar ce nu este terminat”. Astfel nu repeți munca și nu pierzi rezultatele.</p>`,
        checks: [
          ['Agentul sare uneori peste verificarea clientului. Ce schimbare este cea mai eficientă?', 'Un prerequisite gate care blochează operațiile până există un ID verificat.'],
          ['Ce hook aduce la același format datele de la instrumente diferite?', 'PostToolUse.'],
          ['Ce hook blochează refundurile peste un prag?', 'PreToolUse, adică interceptarea apelului.'],
          ['Ce trebuie să conțină rezumatul pentru un om?', 'ID client, cauză, sumă, acțiune recomandată. Omul nu vede conversația.'],
          ['Prompt chaining sau descompunere dinamică pentru o investigație deschisă?', 'Descompunere dinamică.'],
          ['Când începi o sesiune nouă în loc să reiei?', 'Când rezultatele vechi ale instrumentelor nu mai sunt valabile, de exemplu după modificarea fișierelor.'],
          ['Cum reiei un pipeline căzut fără să repeți munca?', 'Încarci manifestele structurate ale workerilor, le pui în prompt și continui doar ce a rămas.'],
        ],
      },
      {
        n: 4, kind: 'lesson', minutes: 60, title: 'Instrumente bune, erori structurate și tool_choice',
        intro: 'Domeniul 2, punctele 2.1–2.3.',
        goals: ['Repari o selecție greșită de instrumente în ordinea corectă', 'Clasifici erorile în 4 categorii', 'Folosești corect valorile tool_choice', 'Limitezi instrumentele fiecărui agent'],
        html: `<h2>1. Descrierea este mecanismul principal de selecție</h2>
<div class="rule">Modelul alege instrumentul în primul rând după <b>descriere</b>. Dacă alege greșit între instrumente asemănătoare, primul pas este să <b>extinzi descrierile</b>.</div>
<p>O descriere bună spune: ce formate primește, exemple de cereri, cazuri-limită, când se folosește în locul altui instrument și ce dependențe are (de exemplu, „necesită ID-ul întors de <code>search_documents</code>”).</p>
<p><b>Ordinea corectă când selecția e slabă:</b></p>
<ol><li>Extinzi descrierile.</li><li>Adaugi câteva exemple pentru cazurile ambigue.</li><li>Redenumești, împarți sau unești instrumente.</li><li>Abia la final, un strat de rutare sau un clasificator.</li></ol>
<p>Instrumentele cu descrieri aproape identice (<code>analyze_content</code> și <code>analyze_document</code>) se redenumesc sau se împart: <code>extract_data_points</code>, <code>summarize_content</code>, <code>verify_claim_against_source</code>. Verifică și system prompt-ul: cuvintele din el pot crea asocieri nedorite cu un instrument.</p>
<h2>2. Acțiuni cu consecințe</h2>
<ul><li><b>Archive</b> este reversibil; <b>delete</b> este definitiv. „Vechi” nu înseamnă „șterge”.</li><li>Pentru acțiuni distructive: <b>preview</b> arată impactul și întoarce un <b>token de confirmare de unică folosință</b>, legat de acțiunea exactă. Este mai sigur decât un flag <code>dry_run</code> sau o instrucțiune de confirmare.</li><li>Dacă verifici și apoi scrii (locuri libere, apoi rezervare), folosește o singură operație <b>atomică</b> pe server. Promptul nu elimină cursa între cei doi pași.</li><li>Pentru multe rezultate: o primă pagină limitată, <code>total_count</code> și un <code>next_cursor</code>.</li></ul>
<h2>3. Erori structurate</h2>
${t(['Categorie', 'Înseamnă', 'Se reîncearcă?'], [
  ['<b>Transient</b>', 'Timeout, serviciu indisponibil', 'De obicei da'],
  ['<b>Validation</b>', 'Date de intrare greșite', 'Nu, corectezi datele'],
  ['<b>Business</b>', 'Încalcă o politică', 'Nu'],
  ['<b>Permission</b>', 'Fără drepturi', 'Nu'],
])}
${pre(`isError:       true
errorCategory: transient | validation | business | permission
isRetryable:   true | false
description:   explicație clară, pe înțelesul clientului`)}
<p>„Operation failed” nu ajută agentul să decidă. Două distincții apar des:</p>
<ul><li><b>Acces eșuat</b> sau <b>rezultat gol valid</b>: „nicio potrivire” este succes fără înregistrări, nu eroare.</li><li><b>Eroare de protocol</b> (cerere invalidă, JSON-RPC) sau <b>rezultat cu <code>isError: true</code></b> (instrumentul a rulat și a eșuat: client inexistent, permisiuni, serviciu extern căzut).</li></ul>
<h2>4. Câte instrumente?</h2>
<p>Prea multe instrumente (18 în loc de 4–5) scad calitatea selecției. Un agent cu instrumente din afara rolului le folosește greșit. Soluția: instrumente limitate la rol, plus un instrument restrâns acolo unde apare o nevoie frecventă, de exemplu <code>verify_fact</code> pentru agentul de sinteză. Cazurile complexe trec prin coordinator.</p>
<h2>5. tool_choice</h2>
${t(['Valoare', 'Efect', 'Când'], [
  ['<code>"auto"</code>', 'Poate apela un instrument sau poate răspunde cu text', 'Implicit'],
  ['<code>"any"</code>', 'Trebuie să apeleze un instrument, alege singur care', 'Mai multe scheme, tip necunoscut de document'],
  ['<code>{"type":"tool","name":"X"}</code>', 'Trebuie să apeleze instrumentul X', 'Forțezi un pas, de exemplu <code>extract_metadata</code>'],
  ['<code>{"type":"none"}</code>', 'Fără instrumente', 'Dezactivezi instrumentele'],
])}
<p>Dacă forțezi un instrument la primul pas, folosește <code>"auto"</code> în turele următoare. Altfel agentul nu mai poate alege alte instrumente.</p>`,
        checks: [
          ['Agentul alege get_customer în loc de lookup_order. Care este primul pas?', 'Extinzi descrierile cu formate, exemple, limite și când se folosește fiecare.'],
          ['Care sunt cele 4 categorii de erori?', 'Transient, validation, business, permission.'],
          ['O căutare nu găsește nimic. Este eroare?', 'Nu. Este succes fără rezultate. Eroare ar fi accesul eșuat.'],
          ['Ce tool_choice garantează apelarea unui instrument, oricare?', '<code>"any"</code>.'],
          ['Ce tool_choice forțează un instrument anume?', '<code>{"type":"tool","name":"X"}</code>.'],
          ['Câte instrumente sunt prea multe, orientativ?', 'Aproximativ 18, față de 4–5 cât e potrivit.'],
          ['Agentul de sinteză are des nevoie de verificări simple. Ce faci?', 'Îi dai un instrument restrâns, <code>verify_fact</code>, nu toate instrumentele de căutare.'],
          ['De ce este mai bun un token de confirmare decât un dry_run?', 'Execuția cere un token valid pentru acțiunea exactă, deci pasul de preview nu poate fi ocolit.'],
        ],
      },
      {
        n: 5, kind: 'lesson', minutes: 45, title: 'MCP și instrumentele incluse',
        intro: 'Domeniul 2, punctele 2.4–2.5.',
        goals: ['Alegi locul corect pentru configurarea unui server MCP', 'Deosebești resources de tools', 'Alegi corect între Grep, Glob, Read, Write, Edit și Bash'],
        html: `<h2>1. Unde configurezi un server MCP</h2>
${t(['Nivel', 'Fișier', 'Comun cu echipa?', 'Când'], [
  ['Proiect', '<code>.mcp.json</code> în repo', 'Da, prin version control', 'Instrumente pentru toată echipa'],
  ['Utilizator', '<code>~/.claude.json</code>', 'Nu', 'Servere personale, în toate proiectele'],
  ['Local', 'Intrare personală pentru un proiect, necomisă', 'Nu', 'Server doar pentru tine, într-un repo'],
])}
<div class="rule">Tiparul se repetă în tot examenul: ce începe cu <code>.</code> în proiect este <b>comun</b>; ce este în <code>~</code> este <b>personal</b>.</div>
<p>Secretele nu se comit. În <code>.mcp.json</code> folosești expandarea variabilelor de mediu: <code>\${GITHUB_TOKEN}</code>.</p>
<p>Pentru integrări standard, cum este Jira, alegi un server din comunitate. Un server propriu are sens pentru fluxuri specifice echipei. Dacă agentul preferă <code>Grep</code> în locul unui instrument MCP mai bun, îmbunătățește descrierea instrumentului MCP.</p>
<h2>2. Resources și tools</h2>
${t(['', 'Resource', 'Tool'], [
  ['Întrebarea', 'Ce conținut există aici?', 'Fă această acțiune'],
  ['Natură', 'Date: cataloage, documente, scheme', 'Acțiune: caută, modifică, calculează'],
  ['Exemplu', 'Lista proiectelor Jira', '<code>create_issue</code>, <code>search_issues</code>'],
  ['Analogie', 'Catalogul bibliotecii', 'Bibliotecarul care aduce cartea'],
])}
<p><b>De ce contează:</b> fără catalog, agentul ghicește prin apeluri de explorare. Cu un resource, citește întâi ce există, apoi face un singur apel precis. Rezultatul: mai puține apeluri și un agent mai eficient.</p>
<h2>3. Instrumentele incluse</h2>
${t(['Instrument', 'Rol', 'Exemplu'], [
  ['<b>Grep</b>', 'Caută în <b>conținutul</b> fișierelor', 'Toate apelurile unei funcții'],
  ['<b>Glob</b>', 'Caută după <b>calea</b> fișierelor', '<code>**/*.test.tsx</code>'],
  ['<b>Read / Write</b>', 'Citește sau scrie un fișier întreg', 'Încarci tot fișierul'],
  ['<b>Edit</b>', 'Modificare țintită, după text unic', 'Schimbi o funcție'],
  ['<b>Bash</b>', 'Rulează comenzi', 'Build, teste, git'],
])}
<ul><li>Dacă <b>Edit</b> eșuează pentru că textul nu este unic, treci la <b>Read + Write</b>.</li><li>Înțelegi codul treptat: <b>Grep</b> pentru puncte de intrare, <b>Read</b> pentru a urmări importurile. Nu citești tot de la început.</li></ul>`,
        checks: [
          ['Unde pui un server MCP folosit de toată echipa?', 'În <code>.mcp.json</code>, în repo, cu token-urile prin <code>\${VAR}</code>.'],
          ['Unde pui un server personal, experimental?', 'În <code>~/.claude.json</code>.'],
          ['Lista proiectelor Jira este resource sau tool?', 'Resource. <code>create_issue</code> este tool.'],
          ['De ce expui un catalog ca resource?', 'Agentul vede ce există fără apeluri de explorare, deci este mai eficient.'],
          ['Cu ce găsești toate apelurile unei funcții? Dar toate fișierele de test?', 'Grep pentru conținut, Glob pentru căi.'],
          ['Edit eșuează pentru că textul apare de mai multe ori. Ce faci?', 'Read + Write.'],
        ],
      },
      { n: 6, kind: 'cards', minutes: 30, title: 'Fișe: Domeniile 1 și 2', decks: [0, 1] },
    ],
  };

  window.CLAUDE_TOOLS = { t, pre };
})();
