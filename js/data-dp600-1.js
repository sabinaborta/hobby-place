// DP-600 (Microsoft Fabric), saptamanile 1 si 2. Lectii scrise in romana dupa ghidul oficial de studiu (versiunea din 19 octombrie 2026); termenii raman in engleza, ca la examen.
(function () {
  const t = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const pre = (s) => `<pre class="code">${s}</pre>`;

  window.DP600_WEEK1 = {
    id: 's1', short: 'Săptămâna 1', title: 'Săptămâna 1: Examenul, securitatea și ciclul de dezvoltare', phase: 'Domeniul 1 · 25–30% din examen',
    tagline: 'Maintain a data analytics solution',
    lead: 'Afli cum arată examenul și ce este Fabric, apoi parcurgi primul domeniu: cine are acces la ce, etichete, Git, PBIP, deployment pipelines și XMLA.',
    advice: 'La securitate, întrebările testează nivelul: workspace, item, rând, coloană, obiect sau fișier. Pentru fiecare cerință întreabă-te întâi la ce nivel se aplică.',
    sessions: [
      {
        n: 1, kind: 'lesson', minutes: 40, title: 'Cum arată examenul și ce este Microsoft Fabric',
        goals: ['Știi structura examenului și cele 3 domenii', 'Știi ce sunt tenant, capacity, workspace, item și OneLake', 'Știi unde găsești testul oficial de exersare'],
        html: `<h2>1. Examenul</h2>
${t(['Element', 'Valoare'], [
  ['Cod', 'DP-600: Implementing Analytics Solutions Using Microsoft Fabric'],
  ['Certificare', 'Microsoft Certified: Fabric Analytics Engineer Associate'],
  ['Timp', '100 de minute'],
  ['Prag de trecere', '700 din 1 000'],
  ['Programa', 'Skills measured as of October 19, 2026'],
  ['Reînnoire', 'anual, gratuit, printr-un test online pe Microsoft Learn'],
  ['Cerințe prealabile', 'niciuna'],
])}
<p>Numărul exact de întrebări nu este publicat. Pot apărea studii de caz și componente interactive. Majoritatea întrebărilor sunt despre funcții general disponibile (GA), dar pot apărea și funcții în Preview dacă sunt folosite des.</p>
<h2>2. Cele 3 domenii</h2>
${t(['Domeniu', 'Pondere', 'Ce cuprinde'], [
  ['1. Maintain a data analytics solution', '25–30%', 'securitate, guvernanță, Git, PBIP, deployment pipelines, XMLA'],
  ['2. Prepare data', '45–50%', 'conectare, ingestie, transformare, interogare cu SQL, KQL și DAX'],
  ['3. Implement and manage semantic models', '25–30%', 'storage modes, relații, DAX, Direct Lake, optimizare'],
])}
<div class="rule">Domeniul 2 dă aproape jumătate din examen. Dacă ai puțin timp, pe el îl repeți primul.</div>
<h2>3. Fabric în cinci cuvinte</h2>
${t(['Termen', 'Ce este'], [
  ['Tenant', 'organizația ta în Microsoft 365 și Fabric; setările de admin se aplică aici'],
  ['Capacity', 'resursele de calcul plătite (SKU-uri F2, F4 … F2048); workspace-urile rulează pe o capacitate'],
  ['Workspace', 'containerul de lucru: aici sunt itemii, rolurile și legătura cu Git'],
  ['Item', 'un obiect: lakehouse, warehouse, eventhouse, notebook, pipeline, dataflow, semantic model, report'],
  ['OneLake', 'un singur lac de date pentru tot tenantul; tabelele sunt stocate în format Delta Parquet'],
])}
<p>Lucrurile importante pentru examen: <b>totul ajunge în OneLake</b>, tabelele sunt în <b>Delta</b>, iar același tabel poate fi citit de Spark, de T-SQL și de un semantic model, fără copii.</p>
<h2>4. Cum citești o întrebare</h2>
<ol><li>Caută cerința reală: cel mai mic efort, fără copierea datelor, timp real, cost minim, fără cod.</li><li>Caută rolul persoanei: data engineer, analyst, viewer.</li><li>Elimină variantele care cer un serviciu din afara Fabric când Fabric are deja unul.</li><li>La „least privilege” alege permisiunea cea mai mică ce rezolvă cerința.</li></ol>
<h2>5. Resurse oficiale</h2>
<ul><li>Ghidul de studiu: aka.ms/dp600-StudyGuide</li><li>Testul de exersare nou, pe AI Skills Navigator: aka.ms/DP600-PA (cere autentificare)</li><li>Demonstrația interfeței de examen: aka.ms/examdemo</li></ul>`,
        checks: [
          ['Care domeniu are cea mai mare pondere?', 'Prepare data, 45–50%.'],
          ['În ce format sunt stocate tabelele în OneLake?', 'Delta Parquet.'],
          ['Ce leagă un workspace de resursele de calcul?', 'Capacitatea (capacity) pe care rulează.'],
        ],
      },
      {
        n: 2, kind: 'lesson', minutes: 60, title: 'Acces: workspace, item, rând, coloană, obiect și fișier',
        goals: ['Alegi rolul de workspace potrivit', 'Partajezi un singur item cu permisiunile minime', 'Știi unde se definesc RLS, CLS, OLS și accesul la fișiere'],
        html: `<h2>1. Rolurile de workspace</h2>
${t(['Rol', 'Poate', 'Nu poate'], [
  ['Admin', 'tot, inclusiv să șteargă workspace-ul și să gestioneze rolurile', '—'],
  ['Member', 'tot conținutul, adaugă persoane cu roluri egale sau mai mici, partajează itemi', 'să șteargă workspace-ul sau să adauge Admini'],
  ['Contributor', 'creează, modifică și șterge itemi, rulează notebooks și pipelines', 'să gestioneze accesul la workspace'],
  ['Viewer', 'vede și folosește conținutul, citește date prin SQL analytics endpoint', 'să modifice ceva'],
])}
<div class="rule">Rolul de workspace dă acces la <b>toți</b> itemii. Dacă cineva trebuie să vadă un singur item, nu îl adaugi în workspace: îi partajezi itemul.</div>
<h2>2. Permisiuni pe item</h2>
${t(['Permisiune', 'Ce permite', 'Exemplu'], [
  ['Read', 'să vadă itemul și metadatele lui', 'se conectează la SQL endpoint, dar fără date'],
  ['ReadData', 'să citească tabelele prin T-SQL', 'analist care scrie interogări SQL'],
  ['ReadAll', 'să citească fișierele din OneLake, de exemplu cu Spark', 'data engineer care citește din alt lakehouse'],
  ['Build', 'să construiască rapoarte pe un semantic model', 'creator de rapoarte'],
  ['Reshare', 'să partajeze mai departe', '—'],
])}
<h2>3. Securitate la nivel de rând, coloană și obiect</h2>
${t(['Nivel', 'Semantic model', 'Warehouse sau SQL endpoint'], [
  ['Rând (RLS)', 'roluri cu filtru DAX, de exemplu <code>[Email] = USERPRINCIPALNAME()</code>', '<code>CREATE SECURITY POLICY</code> cu o funcție inline ca filter predicate'],
  ['Coloană (CLS)', 'prin OLS pe coloană', '<code>GRANT SELECT ON dbo.Clienti (Id, Oras) TO …</code> sau <code>DENY</code>'],
  ['Obiect (OLS)', 'ascunde tabele sau coloane într-un rol, definit cu Tabular Editor sau TMDL', 'permisiuni pe tabele și view-uri'],
  ['Mascare', '—', 'Dynamic Data Masking: <code>MASKED WITH (FUNCTION = \'email()\')</code>; vede datele reale doar cine are UNMASK'],
])}
<p class="note">RLS dintr-un semantic model se aplică doar celor cu rol de <b>Viewer</b> sau acces prin partajare. Admin, Member și Contributor văd toate rândurile. Aceasta este o capcană frecventă.</p>
<h2>4. Acces la fișiere și foldere: OneLake security</h2>
<p>Pentru un lakehouse poți defini roluri OneLake (data access roles) care dau acces doar la anumite foldere sau tabele. Așa limitezi ce poate citi cineva cu Spark sau prin OneLake, fără să creezi un lakehouse separat.</p>
<h2>5. Cum alegi</h2>
${t(['Cerință', 'Alegere'], [
  ['Echipa de dezvoltare creează itemi, dar nu gestionează accesul', 'Contributor'],
  ['Un analist citește un singur warehouse cu SQL', 'partajare item cu ReadData, fără rol de workspace'],
  ['Managerii regionali văd doar regiunea lor în raport', 'RLS în semantic model, iar ei au rol de Viewer'],
  ['Coloana Salariu nu trebuie să apară pentru unii utilizatori de SQL', 'CLS: GRANT SELECT doar pe celelalte coloane'],
  ['Adresele de e-mail apar parțial ascunse, dar coloana rămâne interogabilă', 'Dynamic Data Masking'],
])}`,
        checks: [
          ['Un Contributor vede doar rândurile permise de RLS într-un semantic model?', 'Nu. RLS se aplică doar utilizatorilor cu rol Viewer sau acces prin partajare.'],
          ['Ce permisiune îi dai cuiva care trebuie să citească fișierele unui lakehouse din Spark?', 'ReadAll.'],
          ['Cu ce creezi RLS într-un warehouse?', 'Cu o funcție inline și CREATE SECURITY POLICY cu filter predicate.'],
          ['Cine poate șterge un workspace?', 'Doar Admin.'],
        ],
      },
      {
        n: 3, kind: 'lesson', minutes: 50, title: 'Etichete, endorsement, Git și PBIP',
        goals: ['Aplici etichete de sensibilitate și știi cum se moștenesc', 'Alegi între Promoted, Certified și Master data', 'Legi un workspace de Git', 'Lucrezi cu un proiect Power BI (.pbip)'],
        html: `<h2>1. Sensitivity labels</h2>
<p>Etichetele vin din <b>Microsoft Purview Information Protection</b> (de exemplu Public, General, Confidential). Le aplici pe itemi. Dacă adminul activează moștenirea, eticheta trece automat la itemii derivați: din lakehouse în semantic model, apoi în raport. Eticheta rămâne și pe fișierele exportate (Excel, PDF, PBIX).</p>
<h2>2. Endorsement</h2>
${t(['Nivel', 'Cine îl dă', 'Înseamnă'], [
  ['Promoted', 'oricine poate edita itemul', 'recomandat de autor ca bun de folosit'],
  ['Certified', 'doar persoanele autorizate de admin', 'verificat după standardele organizației'],
  ['Master data', 'doar persoanele desemnate de admin', 'sursa de adevăr pentru date de bază, de exemplu clienți sau produse'],
])}
<p>Itemii marcați apar evidențiați în OneLake catalog și în căutare.</p>
<h2>3. Git integration</h2>
<ul><li>Un admin de workspace leagă workspace-ul de un repository din <b>Azure DevOps</b> sau <b>GitHub</b>: organizație, proiect, repository, branch și folder.</li><li><b>Commit</b> trimite modificările din workspace în Git. <b>Update</b> aduce modificările din Git în workspace.</li><li>În Git ajung definițiile itemilor (semantic models, rapoarte, notebooks, pipelines și altele), nu datele.</li><li>Un model des întâlnit: fiecare dezvoltator lucrează pe un branch în workspace-ul lui, apoi face pull request în branch-ul principal.</li></ul>
<h2>4. Power BI Desktop project (.pbip)</h2>
<p>În Power BI Desktop: <b>File › Save as › Power BI project</b>. În loc de un singur fișier binar PBIX obții:</p>
${pre(`Vanzari.pbip
Vanzari.Report/          definiția raportului (format PBIR)
Vanzari.SemanticModel/   definiția modelului (TMDL)`)}
<p>Avantajul: fișiere text, deci poți vedea diferențele în Git, face merge și edita cu alte unelte. Datele din cache nu ajung în Git, pentru că sunt excluse prin .gitignore.</p>`,
        checks: [
          ['Cine poate marca un semantic model drept Certified?', 'Doar persoanele autorizate de adminul Fabric.'],
          ['Ce face Update în panoul Source control?', 'Aduce modificările din Git în workspace.'],
          ['De ce .pbip în loc de .pbix pentru lucru în echipă?', 'Definițiile sunt fișiere text, deci se pot compara și uni în Git.'],
          ['Ajung datele din lakehouse în Git?', 'Nu, doar definițiile itemilor.'],
        ],
      },
      {
        n: 4, kind: 'lesson', minutes: 50, title: 'Deployment pipelines, impact analysis, XMLA și reutilizare',
        goals: ['Configurezi un deployment pipeline cu reguli', 'Verifici ce se strică înainte de o schimbare', 'Folosești XMLA endpoint', 'Alegi între .pbit, .pbids și shared semantic model'],
        html: `<h2>1. Deployment pipelines</h2>
<ul><li>Un pipeline are între 2 și 10 etape; implicit: <b>Development, Test, Production</b>. Fiecare etapă este un workspace.</li><li>Deploy-ul copiază definițiile itemilor în etapa următoare, toate sau doar cele alese.</li><li>Poți compara etapele înainte de deploy.</li><li><b>Deployment rules</b> schimbă automat ce diferă între etape: <b>data source rules</b> și <b>parameter rules</b> pentru semantic models. Exemplu: în Test modelul citește din baza de test, în Production din cea de producție.</li></ul>
<div class="rule">Dacă cerința este „același conținut, dar altă sursă de date în fiecare mediu”, răspunsul este deployment rules, nu modificări manuale după deploy.</div>
<p>Git și pipelines merg împreună: Git pentru versiuni și colaborare în Development, pipeline pentru promovarea în Test și Production.</p>
<h2>2. Impact analysis</h2>
<p>Înainte să modifici un lakehouse, un warehouse, un dataflow sau un semantic model, deschizi <b>Impact analysis</b> (sau Lineage view). Vezi itemii afectați, workspace-urile lor și câte vizualizări au avut. Poți trimite o notificare persoanelor de contact ale acelor itemi.</p>
<h2>3. XMLA endpoint</h2>
<ul><li>Permite unelte externe să lucreze cu semantic models: SSMS, Tabular Editor, DAX Studio, ALM Toolkit.</li><li>Implicit este doar citire. Pentru deploy sau modificări trebuie <b>Read Write</b> în setările capacității.</li><li>Folosește-l pentru: partiții, calculation groups și OLS editate în Tabular Editor, deploy din scripturi și refresh pe partiții.</li></ul>
<p class="note">După ce un model a fost modificat prin XMLA, nu îl mai poți descărca ca PBIX.</p>
<h2>4. Ce reutilizezi și cum</h2>
${t(['Fișier sau item', 'Conține', 'Folosești când'], [
  ['.pbit (template)', 'raport, model, interogări, parametri, fără date', 'vrei același raport pentru alt client sau altă sursă'],
  ['.pbids (data source)', 'doar detaliile conexiunii, în JSON', 'vrei ca autorii să pornească din aceeași sursă'],
  ['Shared semantic model', 'un model publicat, folosit de multe rapoarte', 'vrei o singură definiție a măsurilor pentru toată organizația'],
])}`,
        checks: [
          ['Câte etape poate avea un deployment pipeline?', 'Între 2 și 10.'],
          ['Cum faci ca modelul din Production să citească din baza de producție?', 'Cu o deployment rule (data source sau parameter rule).'],
          ['Ce setare trebuie schimbată ca să faci deploy prin XMLA?', 'XMLA endpoint pe Read Write în setările capacității.'],
          ['Ce fișier păstrează modelul și raportul, dar nu datele?', '.pbit.'],
        ],
      },
      { n: 5, kind: 'cards', minutes: 30, title: 'Fișe: Domeniul 1', decks: [0, 1] },
    ],
  };

  window.DP600_WEEK2 = {
    id: 's2', short: 'Săptămâna 2', title: 'Săptămâna 2: Pregătirea datelor', phase: 'Domeniul 2 · 45–50% din examen',
    tagline: 'Prepare data: get, transform, query',
    lead: 'Cel mai mare domeniu: cum aduci datele în Fabric, unde le păstrezi, cum le transformi și cum le interoghezi cu SQL, KQL și DAX.',
    advice: 'Scrie de mână câte o interogare SQL, KQL și DAX pentru aceeași întrebare, de exemplu vânzările pe an. Diferențele de sintaxă apar des la examen.',
    sessions: [
      {
        n: 1, kind: 'lesson', minutes: 60, title: 'Conexiuni și moduri de a aduce datele',
        goals: ['Alegi gateway-ul potrivit', 'Deosebești shortcut, mirroring, pipeline, Dataflow Gen2, notebook și eventstream', 'Găsești date în OneLake catalog și Real-Time hub'],
        html: `<h2>1. Conexiuni</h2>
${t(['Sursa este', 'Ai nevoie de'], [
  ['în cloud, accesibilă public', 'o conexiune cloud, din Manage connections and gateways'],
  ['în rețeaua firmei (on-premises)', '<b>on-premises data gateway</b>'],
  ['în Azure, în spatele unui VNet sau private endpoint', '<b>VNet data gateway</b>'],
])}
<h2>2. Cum aduci datele</h2>
${t(['Metodă', 'Copiază datele?', 'Potrivită pentru'], [
  ['<b>Shortcut</b>', 'nu, doar indică locul', 'date deja în OneLake, ADLS Gen2, Amazon S3, Google Cloud Storage, Dataverse; acces fără duplicare'],
  ['<b>Mirroring</b>', 'da, continuu și aproape în timp real', 'baze operaționale, de exemplu Azure SQL Database, Cosmos DB, Snowflake'],
  ['<b>Pipeline</b> (Copy activity, Copy job)', 'da, programat', 'volume mari, multe surse, orchestrare'],
  ['<b>Dataflow Gen2</b>', 'da', 'transformări fără cod, cu Power Query'],
  ['<b>Notebook</b> (Spark)', 'da', 'volume mari, transformări complexe, Python'],
  ['<b>Eventstream</b>', 'da, în flux', 'evenimente în timp real, către eventhouse sau lakehouse'],
])}
<div class="rule">„Fără să copiezi datele” sau „o singură copie” înseamnă aproape mereu <b>shortcut</b>. „Replică continuă a unei baze operaționale” înseamnă <b>mirroring</b>.</div>
<h2>3. Unde găsești datele</h2>
<ul><li><b>OneLake catalog</b>: cauți itemi după tip, domeniu, endorsement și etichetă. Pe tabul Explore descoperi, pe tabul Govern vezi starea guvernanței.</li><li><b>Real-Time hub</b>: vezi fluxurile de date, evenimentele Fabric și Azure și le conectezi la un eventstream.</li></ul>`,
        checks: [
          ['O bază SQL Server on-premises: ce gateway?', 'On-premises data gateway.'],
          ['Datele sunt deja în ADLS Gen2 și nu vrei copii. Ce folosești?', 'Un shortcut.'],
          ['Vrei o replică aproape în timp real a unei baze Azure SQL. Ce folosești?', 'Mirroring.'],
          ['Unde descoperi fluxurile de evenimente din organizație?', 'În Real-Time hub.'],
        ],
      },
      {
        n: 2, kind: 'lesson', minutes: 45, title: 'Unde păstrezi datele: lakehouse, warehouse sau eventhouse',
        goals: ['Alegi magazinul de date după limbaj și tipul datelor', 'Știi ce face SQL analytics endpoint', 'Folosești integrarea OneLake pentru eventhouse și semantic models'],
        html: `<h2>1. Comparația principală</h2>
${t(['', 'Lakehouse', 'Warehouse', 'Eventhouse (KQL database)'], [
  ['Limbaj principal', 'Spark (PySpark, Spark SQL)', 'T-SQL complet', 'KQL'],
  ['Date', 'tabele Delta și fișiere de orice tip', 'tabele relaționale', 'evenimente, loguri, serii de timp'],
  ['Scriere cu T-SQL', 'nu; SQL analytics endpoint este doar citire', 'da: INSERT, UPDATE, DELETE, tranzacții pe mai multe tabele', 'nu, ingestie și comenzi KQL'],
  ['Potrivit pentru', 'data engineers, date semi-structurate', 'echipe care lucrează în SQL', 'analiză în timp real'],
])}
<p><b>SQL analytics endpoint</b> se creează automat cu fiecare lakehouse. Poți citi tabelele cu T-SQL și poți crea view-uri și funcții, dar nu poți modifica datele tabelelor.</p>
<p>Pentru aplicații operaționale (OLTP) există și <b>SQL database</b> în Fabric.</p>
<div class="rule">„Echipa știe doar T-SQL și trebuie să modifice datele” înseamnă warehouse. „Fișiere JSON, imagini și Spark” înseamnă lakehouse. „Telemetrie la fiecare secundă” înseamnă eventhouse.</div>
<h2>2. Integrarea cu OneLake</h2>
<ul><li><b>Eventhouse</b>: activezi <b>OneLake availability</b> pe o bază KQL sau pe un tabel. Datele apar în OneLake ca Delta, deci le pot citi lakehouse, warehouse sau un model Direct Lake, fără alt pipeline.</li><li><b>Semantic model</b> în Import: activezi <b>OneLake integration</b>. Tabelele importate sunt scrise în OneLake ca Delta și pot fi folosite prin shortcut de alte echipe.</li></ul>`,
        checks: [
          ['Poți face UPDATE printr-un SQL analytics endpoint?', 'Nu. Este doar citire; poți crea view-uri și funcții.'],
          ['Ai nevoie de tranzacții pe mai multe tabele în T-SQL. Ce alegi?', 'Warehouse.'],
          ['Cum faci datele unui eventhouse disponibile ca Delta?', 'Activezi OneLake availability.'],
        ],
      },
      {
        n: 3, kind: 'lesson', minutes: 60, title: 'Transformarea datelor și schema stea',
        goals: ['Creezi view-uri, funcții și proceduri stocate', 'Construiești o schemă stea', 'Elimini duplicatele și valorile lipsă', 'Faci join, agregare, filtrare și conversii de tip'],
        html: `<h2>1. Obiecte T-SQL în warehouse</h2>
${pre(`CREATE VIEW dbo.vVanzari AS
SELECT d.An, p.Categorie, SUM(f.Valoare) AS Total
FROM dbo.FactVanzari f
JOIN dbo.DimData d ON f.DataKey = d.DataKey
JOIN dbo.DimProdus p ON f.ProdusKey = p.ProdusKey
GROUP BY d.An, p.Categorie;

CREATE FUNCTION dbo.fnRegiune (@regiune VARCHAR(20))
RETURNS TABLE AS RETURN
  SELECT * FROM dbo.FactVanzari WHERE Regiune = @regiune;

CREATE PROCEDURE dbo.IncarcaZilnic AS
BEGIN
  INSERT INTO dbo.FactVanzari SELECT * FROM stg.Vanzari;
END;`)}
<h2>2. Schema stea</h2>
<ul><li><b>Fact</b>: evenimente măsurabile (vânzări, comenzi), cu chei către dimensiuni. Granularitatea (grain) spune ce reprezintă un rând.</li><li><b>Dimension</b>: descrieri (produs, client, dată), cu o <b>surrogate key</b> întreagă.</li><li><b>SCD Type 1</b> suprascrie valoarea veche. <b>SCD Type 2</b> adaugă un rând nou și păstrează istoricul, cu coloane de valabilitate.</li><li><b>Denormalizare</b>: unești Produs, Subcategorie și Categorie într-o singură DimProdus. Schema stea preferă dimensiuni plate.</li></ul>
<h2>3. Curățarea datelor</h2>
${t(['Problemă', 'T-SQL', 'PySpark', 'Power Query'], [
  ['Duplicate', '<code>ROW_NUMBER() OVER (PARTITION BY Id ORDER BY Data DESC)</code> și păstrezi 1', '<code>dropDuplicates(["Id"])</code>', 'Remove duplicates'],
  ['Valori lipsă', '<code>COALESCE(Oras, \'Necunoscut\')</code>', '<code>fillna({"Oras": "Necunoscut"})</code>', 'Replace values'],
  ['Tip greșit', '<code>CAST</code> / <code>TRY_CAST</code>', '<code>col("x").cast("int")</code>', 'Change type'],
  ['Filtrare', '<code>WHERE</code>', '<code>filter()</code>', 'Filter rows'],
])}
<h2>4. Join, append și agregare</h2>
<ul><li><b>Merge</b> în Power Query este un join: adaugă coloane din alt tabel. <b>Append</b> este un UNION: adaugă rânduri.</li><li>LEFT JOIN păstrează toate rândurile din stânga; INNER JOIN doar potrivirile.</li><li>Agregarea cu GROUP BY creează tabele sumar, utile când raportul nu are nevoie de detaliu.</li><li>Coloane noi: calculate în SQL, cu <code>withColumn</code> în Spark sau Add column în Power Query.</li></ul>`,
        checks: [
          ['Vrei să păstrezi istoricul adresei unui client. Ce tip de SCD?', 'Type 2.'],
          ['Merge sau Append pentru a adăuga vânzările din alt an?', 'Append.'],
          ['Cum păstrezi doar cel mai recent rând pentru fiecare Id în T-SQL?', 'ROW_NUMBER() OVER (PARTITION BY Id ORDER BY Data DESC) și filtrezi pe 1.'],
          ['Unde stau descrierile, în fact sau în dimension?', 'În dimension.'],
        ],
      },
      {
        n: 4, kind: 'lesson', minutes: 60, title: 'Interogări: Visual query editor, SQL, KQL și DAX',
        goals: ['Selectezi, filtrezi și agregi în toate cele patru moduri', 'Recunoști sintaxa KQL', 'Scrii o interogare DAX cu EVALUATE'],
        html: `<h2>1. Visual query editor</h2>
<p>În warehouse și SQL analytics endpoint poți construi o interogare fără cod: tragi tabelele, faci merge, group by și filtre. Editorul generează T-SQL, iar rezultatul îl poți salva ca view.</p>
<h2>2. Aceeași întrebare în trei limbaje</h2>
<p>Primele 5 categorii după valoarea vânzărilor din 2026:</p>
<p><b>SQL</b></p>
${pre(`SELECT TOP 5 Categorie, SUM(Valoare) AS Total
FROM dbo.Vanzari
WHERE An = 2026
GROUP BY Categorie
ORDER BY Total DESC;`)}
<p><b>KQL</b></p>
${pre(`Vanzari
| where An == 2026
| summarize Total = sum(Valoare) by Categorie
| top 5 by Total desc`)}
<p><b>DAX</b></p>
${pre(`EVALUATE
TOPN (
    5,
    SUMMARIZECOLUMNS (
        Produs[Categorie],
        TREATAS ( { 2026 }, 'Data'[An] ),
        "Total", SUM ( Vanzari[Valoare] )
    ),
    [Total], DESC
)`)}
<h2>3. KQL de bază</h2>
${t(['Operator', 'Rol', 'Echivalent SQL'], [
  ['<code>where</code>', 'filtrează rânduri', 'WHERE'],
  ['<code>project</code>', 'alege coloane', 'SELECT coloane'],
  ['<code>extend</code>', 'adaugă o coloană calculată', 'SELECT …, expresie AS x'],
  ['<code>summarize … by</code>', 'agregă', 'GROUP BY'],
  ['<code>top N by</code>', 'primele N', 'TOP N … ORDER BY'],
  ['<code>take N</code>', 'N rânduri oarecare', 'TOP N fără ordine'],
  ['<code>bin(Timestamp, 1h)</code>', 'grupează pe intervale de timp', '—'],
  ['<code>render timechart</code>', 'desenează un grafic', '—'],
])}
<p class="note">În KQL egalitatea se scrie <code>==</code>, iar operatorii se leagă cu <code>|</code>. Numele tabelelor și coloanelor țin cont de majuscule.</p>
<h2>4. DAX query</h2>
<ul><li>Orice interogare începe cu <code>EVALUATE</code> și întoarce un tabel.</li><li><code>DEFINE MEASURE</code> îți permite să testezi o măsură fără să o salvezi în model.</li><li>O scrii în <b>DAX query view</b> din Power BI Desktop sau din serviciu, ori în DAX Studio.</li></ul>`,
        checks: [
          ['Ce operator KQL corespunde lui GROUP BY?', 'summarize … by.'],
          ['Cu ce cuvânt începe o interogare DAX?', 'EVALUATE.'],
          ['Cum scrii egalitatea într-un filtru KQL?', 'Cu ==.'],
          ['Ce produce Visual query editor?', 'O interogare T-SQL, pe care o poți salva ca view.'],
        ],
      },
      { n: 5, kind: 'cards', minutes: 35, title: 'Fișe: Domeniul 2', decks: [2, 3] },
    ],
  };
})();
