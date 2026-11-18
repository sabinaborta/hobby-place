// DP-600, saptamanile 3 si 4: semantic models, optimizare, examene de proba.
(function () {
  const t = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const pre = (s) => `<pre class="code">${s}</pre>`;

  window.DP600_WEEK3 = {
    id: 's3', short: 'Săptămâna 3', title: 'Săptămâna 3: Semantic models', phase: 'Domeniul 3 · 25–30% din examen',
    tagline: 'Implement and manage semantic models',
    lead: 'Construiești modelul: storage mode, relații, DAX, calculation groups, apoi îl faci rapid, cu accent pe Direct Lake.',
    advice: 'La Direct Lake reține două lucruri: când apare fallback la DirectQuery și ce diferă între Direct Lake on OneLake și Direct Lake on SQL analytics endpoint.',
    sessions: [
      {
        n: 1, kind: 'lesson', minutes: 60, title: 'Storage modes, relații și composite models',
        goals: ['Alegi storage mode-ul potrivit', 'Rezolvi relațiile many-to-many cu un bridge table', 'Construiești un composite model', 'Știi când activezi large semantic model storage format'],
        html: `<h2>1. Storage modes</h2>
${t(['Mod', 'Unde sunt datele', 'Avantaj', 'Dezavantaj'], [
  ['Import', 'copiate în memoria modelului', 'cele mai rapide interogări, DAX complet', 'cere refresh; copie a datelor'],
  ['DirectQuery', 'rămân la sursă', 'date mereu actuale', 'viteza depinde de sursă; unele limite DAX'],
  ['Dual', 'și importate, și la sursă', 'pentru dimensiuni într-un composite model', '—'],
  ['Direct Lake', 'tabele Delta din OneLake, încărcate în memorie la nevoie', 'aproape viteza Import, fără copie de import', 'doar pe Delta din Fabric; are limite (guardrails)'],
])}
<h2>2. Relații</h2>
<ul><li>Cardinalitate: one-to-many (cea normală), one-to-one, many-to-many.</li><li>Direcția filtrului: <b>Single</b> este implicită și recomandată. <b>Both</b> doar când ai nevoie, pentru că poate crea ambiguitate și încetinește modelul.</li><li><b>Bridge table</b>: un client are mai multe conturi și un cont are mai mulți clienți. Pui un tabel ClientCont între ele, cu două relații one-to-many.</li><li>Relațiile inactive (linie punctată) se activează într-o măsură cu <code>USERELATIONSHIP</code>, de exemplu Data comenzii și Data livrării față de aceeași tabelă Data.</li></ul>
<h2>3. Composite models</h2>
<p>Un model care combină surse sau moduri: tabele Import cu tabele DirectQuery, sau un model publicat folosit prin DirectQuery și extins cu tabelele tale. Dimensiunile comune se pun pe <b>Dual</b>, ca să nu încetinească interogările.</p>
<h2>4. Large semantic model storage format</h2>
<p>Setare a modelului, pe capacitate Fabric sau Premium. O activezi când modelul poate depăși 10 GB; atunci mărimea este limitată doar de memoria capacității. Ajută și la operațiile prin XMLA.</p>`,
        checks: [
          ['Ce mod alegi pentru o dimensiune folosită și de tabele Import, și de tabele DirectQuery?', 'Dual.'],
          ['Cum activezi o relație inactivă într-o măsură?', 'Cu USERELATIONSHIP în CALCULATE.'],
          ['Modelul va avea 30 GB. Ce setare activezi?', 'Large semantic model storage format.'],
        ],
      },
      {
        n: 2, kind: 'lesson', minutes: 75, title: 'DAX: variabile, iteratori, filtre, ferestre și calculation groups',
        goals: ['Scrii măsuri cu VAR și RETURN', 'Folosești iteratori și CALCULATE cu filtre', 'Folosești OFFSET, INDEX și WINDOW', 'Creezi calculation groups, dynamic format strings și field parameters'],
        html: `<h2>1. Variabile</h2>
${pre(`Marja % =
VAR Venit = SUM ( Vanzari[Valoare] )
VAR Cost  = SUM ( Vanzari[Cost] )
RETURN DIVIDE ( Venit - Cost, Venit )`)}
<p>Variabila se calculează o singură dată, deci măsura e mai rapidă și mai ușor de citit. <code>DIVIDE</code> evită eroarea la împărțirea la zero.</p>
<h2>2. Iteratori</h2>
<p><code>SUMX</code>, <code>AVERAGEX</code>, <code>MAXX</code>, <code>RANKX</code> calculează o expresie pe fiecare rând, apoi agregă:</p>
${pre(`Venit = SUMX ( Vanzari, Vanzari[Cantitate] * Vanzari[Pret] )`)}
<h2>3. CALCULATE și filtrele</h2>
${t(['Funcție', 'Efect'], [
  ['<code>CALCULATE ( [Venit], Produs[Culoare] = "Rosu" )</code>', 'înlocuiește filtrul pe Culoare'],
  ['<code>REMOVEFILTERS ( Produs )</code> sau <code>ALL</code>', 'scoate filtrele, de exemplu pentru procent din total'],
  ['<code>ALLEXCEPT ( Produs, Produs[Categorie] )</code>', 'scoate toate filtrele în afară de categorie'],
  ['<code>KEEPFILTERS ( … )</code>', 'adaugă filtrul peste cel existent, nu îl înlocuiește'],
  ['<code>FILTER ( tabel, condiție )</code>', 'filtru rând cu rând; pe tabele mari preferă filtre pe coloane'],
])}
<h2>4. Funcții de fereastră</h2>
${pre(`Venit luna anterioara =
CALCULATE ( [Venit], OFFSET ( -1, ALLSELECTED ( 'Data'[An], 'Data'[Luna] ), ORDERBY ( 'Data'[An], ASC, 'Data'[Luna], ASC ) ) )

Total cumulat =
CALCULATE ( [Venit], WINDOW ( 1, ABS, 0, REL, ALLSELECTED ( 'Data'[Data] ), ORDERBY ( 'Data'[Data] ) ) )`)}
<p><code>OFFSET</code> ia rândul relativ (anterior, următor), <code>INDEX</code> un rând pe o poziție fixă, <code>WINDOW</code> un interval de rânduri, de exemplu pentru totaluri cumulate sau medii mobile.</p>
<h2>5. Funcții de informare</h2>
<p><code>ISBLANK</code>, <code>HASONEVALUE</code>, <code>ISINSCOPE</code>, <code>ISFILTERED</code> și <code>SELECTEDVALUE</code> te ajută să scrii măsuri care se comportă diferit pe total și pe detaliu. Funcțiile <code>INFO.TABLES()</code>, <code>INFO.MEASURES()</code> și celelalte <code>INFO.*</code> descriu modelul și se folosesc în DAX query view.</p>
<h2>6. Calculation groups, format dinamic și field parameters</h2>
<ul><li><b>Calculation group</b>: un singur set de calcule aplicat oricărei măsuri. Item-ul YTD este <code>CALCULATE ( SELECTEDMEASURE (), DATESYTD ( 'Data'[Data] ) )</code>. Evită zeci de măsuri copiate. Modelul trebuie să aibă măsuri explicite, nu implicite.</li><li><b>Dynamic format strings</b>: formatul unei măsuri se alege printr-o expresie DAX, de exemplu valuta clientului sau K și M după mărime.</li><li><b>Field parameters</b>: utilizatorul alege din slicer ce măsură sau ce coloană apare în grafic.</li></ul>`,
        checks: [
          ['De ce folosești VAR?', 'Expresia se calculează o singură dată, iar codul e mai clar.'],
          ['Ce funcție de fereastră folosești pentru valoarea lunii anterioare?', 'OFFSET.'],
          ['Ce întoarce SELECTEDMEASURE() într-un calculation item?', 'Măsura pe care este aplicat calculul.'],
          ['Utilizatorul vrea să schimbe singur măsura din grafic. Ce folosești?', 'Field parameters.'],
        ],
      },
      {
        n: 3, kind: 'lesson', minutes: 60, title: 'Performanță, Direct Lake și incremental refresh',
        goals: ['Găsești interogarea lentă', 'Faci modelul și DAX-ul mai rapide', 'Configurezi Direct Lake și înțelegi fallback-ul', 'Configurezi incremental refresh'],
        html: `<h2>1. Unde e problema</h2>
<ul><li><b>Performance analyzer</b> în Power BI Desktop arată timpul pe fiecare vizual: DAX query, Visual display, Other. Poți copia interogarea.</li><li>În <b>DAX query view</b> sau <b>DAX Studio</b> o rulezi singură; Server Timings arată cât lucrează Formula Engine și cât Storage Engine.</li><li><b>VertiPaq Analyzer</b> arată ce coloane ocupă cel mai mult. <b>Best Practice Analyzer</b> din Tabular Editor găsește greșeli de model.</li></ul>
<h2>2. Ce îmbunătățești</h2>
${t(['Zonă', 'Ce faci'], [
  ['Model', 'elimini coloanele nefolosite, reduci cardinalitatea (de exemplu separi data de oră), folosești chei întregi, dezactivezi Auto date/time'],
  ['Relații', 'eviți Both și many-to-many dacă nu sunt necesare'],
  ['DAX', 'VAR, filtre pe coloane în loc de FILTER pe tot tabelul, DIVIDE, fără IFERROR pe rânduri'],
  ['Rapoarte', 'mai puține vizuale pe pagină, butonul Apply pentru slicere (query reduction)'],
])}
<h2>3. Direct Lake</h2>
<ul><li>Modelul citește direct fișierele Delta din OneLake. Coloanele intră în memorie când sunt cerute (transcoding).</li><li><b>Refresh</b> la Direct Lake nu copiază date. Face <b>framing</b>: modelul trece la cea mai nouă versiune a tabelelor Delta. Cu setarea de actualizare automată, se întâmplă singur când se schimbă datele.</li><li>Fișierele scrise cu <b>V-Order</b> și compactate cu <code>OPTIMIZE</code> se citesc mai repede.</li></ul>
${t(['', 'Direct Lake on SQL analytics endpoint', 'Direct Lake on OneLake'], [
  ['Fallback la DirectQuery', 'da, când folosești view-uri SQL, securitate definită în SQL endpoint sau depășești limitele (guardrails)', 'nu; nu există fallback'],
  ['Surse', 'tabelele unui singur lakehouse sau warehouse', 'tabele din mai mulți itemi Fabric'],
  ['Securitate', 'permisiunile SQL', 'OneLake security'],
])}
<p>Fallback-ul se controlează cu proprietatea <b>DirectLakeBehavior</b>: <b>Automatic</b> (fallback permis), <b>DirectLakeOnly</b> (interogarea dă eroare în loc de fallback) și <b>DirectQueryOnly</b>.</p>
<div class="rule">Dacă un raport Direct Lake devine brusc lent, verifică întâi dacă a trecut pe DirectQuery: view-uri, RLS în SQL sau prea multe fișiere și rânduri.</div>
<h2>4. Incremental refresh</h2>
<ol><li>Creezi în Power Query parametrii <code>RangeStart</code> și <code>RangeEnd</code>, de tip Date/Time; numele trebuie scrise exact așa.</li><li>Filtrezi tabelul pe coloana de dată cu ei. Filtrul trebuie să poată fi trimis la sursă (query folding).</li><li>Definești politica: câți ani păstrezi și câte zile reîmprospătezi. Opțional: detect data changes, only refresh complete periods și o partiție în timp real cu DirectQuery.</li><li>După publicare, serviciul creează și gestionează partițiile.</li></ol>`,
        checks: [
          ['Ce arată Performance analyzer?', 'Timpul fiecărui vizual: DAX query, Visual display, Other.'],
          ['Ce face refresh-ul unui model Direct Lake?', 'Framing: trece modelul pe cea mai nouă versiune Delta, fără să copieze date.'],
          ['Vrei ca interogările să dea eroare în loc să treacă pe DirectQuery. Ce setezi?', 'DirectLakeBehavior = DirectLakeOnly.'],
          ['Cum trebuie să se numească parametrii pentru incremental refresh?', 'RangeStart și RangeEnd.'],
          ['Ai nevoie de tabele din două lakehouse-uri într-un model Direct Lake. Ce variantă?', 'Direct Lake on OneLake.'],
        ],
      },
      { n: 4, kind: 'cards', minutes: 30, title: 'Fișe: Domeniul 3', decks: [4, 5] },
    ],
  };

  window.DP600_WEEK4 = {
    id: 's4', short: 'Săptămâna 4', title: 'Săptămâna 4: Examene de probă și recapitulare', phase: 'Recapitulare activă',
    tagline: 'Două examene complete, capcanele, fișe din toate domeniile',
    lead: 'Dai primul examen, înveți să elimini variantele false, apoi dai al doilea examen și recapitulezi totul.',
    advice: 'Pentru fiecare greșeală notează domeniul și regula care te-ar fi ajutat. Țintește cel puțin 80% înainte de examenul real.',
    sessions: [
      { n: 1, kind: 'exam', minutes: 80, title: 'Examen de probă 1', exam: 0 },
      {
        n: 2, kind: 'lesson', minutes: 45, title: 'Capcanele: cum elimini variantele false',
        goals: ['Recunoști cuvintele care decid răspunsul', 'Eviți capcanele frecvente'],
        html: `<h2>1. Cuvintele care decid</h2>
${t(['Dacă întrebarea spune', 'Gândește-te la'], [
  ['fără să copiezi datele, o singură copie', 'shortcut'],
  ['replică continuă a unei baze operaționale', 'mirroring'],
  ['fără cod, analist de business', 'Dataflow Gen2, Visual query editor'],
  ['volume foarte mari, Python', 'notebook cu Spark'],
  ['evenimente în timp real, telemetrie', 'eventstream și eventhouse, KQL'],
  ['echipa scrie doar T-SQL și modifică date', 'warehouse'],
  ['least privilege, un singur item', 'partajare item, nu rol de workspace'],
  ['altă sursă în fiecare mediu', 'deployment rules'],
  ['același calcul pentru multe măsuri', 'calculation group'],
  ['raport Direct Lake lent după o schimbare', 'fallback la DirectQuery'],
])}
<h2>2. Capcane frecvente</h2>
<ul><li>RLS din semantic model <b>nu</b> se aplică Admin, Member și Contributor.</li><li>SQL analytics endpoint este <b>doar citire</b> pentru datele tabelelor.</li><li>Direct Lake on OneLake <b>nu</b> are fallback la DirectQuery.</li><li>Refresh-ul Direct Lake nu copiază date, face doar framing.</li><li>Merge adaugă coloane (join), Append adaugă rânduri (union).</li><li>KQL folosește <code>==</code> și <code>summarize … by</code>, nu GROUP BY.</li><li>Certified și Master data le pot da doar persoanele autorizate de admin; Promoted oricine poate edita itemul.</li><li>Incremental refresh cere <code>RangeStart</code> și <code>RangeEnd</code> și query folding.</li></ul>`,
        checks: [
          ['„O singură copie a datelor din ADLS Gen2”: ce alegi?', 'Shortcut.'],
          ['Un Member vede datele filtrate de RLS?', 'Nu, vede tot.'],
        ],
      },
      { n: 3, kind: 'exam', minutes: 80, title: 'Examen de probă 2', exam: 1 },
      { n: 4, kind: 'cards', minutes: 45, title: 'Fișe: toate domeniile', decks: [0, 1, 2, 3, 4, 5] },
    ],
  };
})();
