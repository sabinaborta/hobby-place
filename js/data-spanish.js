// Spaniola: urmeaza ordinea unitatilor din Gente Hoy 1. Explicatiile si exercitiile sunt scrise aici, nu copiate din manual.
// Exercitii: {title, instr, items: [[propozitie cu ___, raspuns sau [raspunsuri acceptate], indiciu optional]]}
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  window.SPANISH_BOOK = {
    student: '',
    workbook: '',
    // Pagina 18 din carte este pagina 19 din PDF.
    offset: 1,
  };

  window.SPANISH_UNITS = [
    {
      id: 'u0', n: 0, title: 'Gente en clase', theme: 'Prima oră: saluturi și prezentare', pages: [14, 17],
      goals: ['Saluți și îți iei rămas-bun', 'Spui cum te cheamă și de unde ești', 'Ceri să ți se repete sau să ți se explice un cuvânt', 'Folosești un / una înaintea unui substantiv'],
      sections: [
        { h: 'Saluturi și despărțiri', html: table(['Spaniolă', 'Română', 'Când'], [
          ['<b>Hola</b>', 'Salut / Bună', 'oricând, informal'],
          ['<b>Buenos días</b>', 'Bună dimineața', 'până la prânz'],
          ['<b>Buenas tardes</b>', 'Bună ziua', 'după prânz, până seara'],
          ['<b>Buenas noches</b>', 'Bună seara / Noapte bună', 'seara și noaptea'],
          ['<b>Adiós</b>', 'La revedere', 'despărțire'],
          ['<b>Hasta luego</b>', 'Pe curând', 'despărțire, te revezi curând'],
          ['<b>Hasta mañana</b>', 'Pe mâine', 'despărțire până a doua zi'],
        ]) },
        { h: 'Cum te prezinți', html: `<p>Pentru nume se folosește verbul <b>llamarse</b> („a se numi”), iar pentru origine <b>ser de</b> („a fi din”).</p>` + table(['Întrebare', 'Răspuns'], [
          ['¿Cómo te llamas?', 'Me llamo Ana.'],
          ['¿De dónde eres?', 'Soy de Rumanía. / Soy de Cluj.'],
        ]) + `<p class="note">În spaniolă, întrebările și exclamațiile au semn și la început: <b>¿…?</b> și <b>¡…!</b></p>` },
        { h: 'Când nu înțelegi', html: table(['Spaniolă', 'Română'], [
          ['¿Perdón? / ¿Cómo?', 'Poftim? / Cum?'],
          ['¿Qué significa «playa»?', 'Ce înseamnă „playa”?'],
          ['¿Cómo se dice «carte» en español?', 'Cum se spune „carte” în spaniolă?'],
          ['¿Cómo se escribe?', 'Cum se scrie?'],
        ]) },
        { h: 'Un și una', html: `<p>Substantivele sunt masculine sau feminine. <b>Un</b> stă înaintea celor masculine, <b>una</b> înaintea celor feminine. Multe substantive în <b>-o</b> sunt masculine, multe în <b>-a</b> sunt feminine.</p>` + table(['Masculin', 'Feminin'], [
          ['un amigo (un prieten)', 'una amiga (o prietenă)'],
          ['un libro (o carte)', 'una ciudad (un oraș)'],
          ['un escritor (un scriitor)', 'una canción (un cântec)'],
        ]) },
      ],
      exercises: [
        { title: 'Salutul potrivit', instr: 'Scrie salutul sau formula potrivită.', items: [
          ['Este ora 9:00. Saluți: ___', 'Buenos días'],
          ['Este ora 16:00. Saluți: ___', 'Buenas tardes'],
          ['Este ora 22:00. Saluți: ___', 'Buenas noches'],
          ['Pleci și revii mâine: ___', 'Hasta mañana'],
          ['Saluți informal un prieten: ___', 'Hola'],
        ] },
        { title: 'Prezentare', instr: 'Completează dialogul.', items: [
          ['¿Cómo te ___?', 'llamas'],
          ['Me ___ Ana.', 'llamo'],
          ['¿De dónde ___?', 'eres'],
          ['___ de Rumanía.', 'Soy'],
        ] },
        { title: 'Un sau una', instr: 'Scrie articolul nehotărât.', items: [
          ['___ amigo', 'un'],
          ['___ amiga', 'una'],
          ['___ libro', 'un'],
          ['___ ciudad', 'una', 'orașele în -dad sunt feminine'],
          ['___ canción', 'una', 'cuvintele în -ción sunt feminine'],
          ['___ escritor', 'un'],
        ] },
      ],
    },
    {
      id: 'u1', n: 1, title: 'Gente que estudia español', theme: 'Alfabet, numere, verbul ser, genul și numărul', pages: [18, 27], grammar: [140, 142],
      goals: ['Silabisești și citești corect sunetele noi', 'Numeri de la 0 la 20 și spui un număr de telefon', 'Conjugi verbul ser la prezent', 'Folosești el, la, los, las și este, esta, estos, estas', 'Formezi pluralul substantivelor'],
      sections: [
        { h: 'Litere și sunete', html: `<p>Pentru un vorbitor de română, acestea sunt literele care se citesc altfel:</p>` + table(['Scris', 'Se citește', 'Exemplu'], [
          ['<b>h</b>', 'nu se pronunță', 'hola → „ola”'],
          ['<b>j</b>, <b>g</b> + e/i', 'h aspirat, ca în „hrană”', 'Juan, Gerardo'],
          ['<b>g</b> + a/o/u, <b>gu</b> + e/i', 'g ca în „gară”', 'Gonzalo, Guillén'],
          ['<b>c</b> + a/o/u, <b>qu</b> + e/i', 'k', 'Carolina, Quique'],
          ['<b>c</b> + e/i, <b>z</b>', 'ca „th” englezesc în Spania; s în America Latină', 'Celia, Zara'],
          ['<b>ch</b>', 'ci, ca în „ciocan”', 'Chelo'],
          ['<b>ll</b>, <b>y</b>', 'apropiat de i, ca în „iar”', 'Llorente'],
          ['<b>ñ</b>', 'ni, ca în „Ania”', 'España'],
          ['<b>b</b>, <b>v</b>', 'același sunet: b', 'Borja, Vicente'],
          ['<b>rr</b>, <b>r</b> la început', 'r puternic, vibrat', 'Rita, Parra'],
        ]) },
        { h: 'Numerele de la 0 la 20', html: table(['', '', '', ''], [
          ['0 cero', '6 seis', '11 once', '16 dieciséis'],
          ['1 uno', '7 siete', '12 doce', '17 diecisiete'],
          ['2 dos', '8 ocho', '13 trece', '18 dieciocho'],
          ['3 tres', '9 nueve', '14 catorce', '19 diecinueve'],
          ['4 cuatro', '10 diez', '15 quince', '20 veinte'],
          ['5 cinco', '', '', ''],
        ]) },
        { h: 'Verbul ser (a fi), la prezent', html: table(['Pronume', 'Ser', 'Exemplu'], [
          ['yo', '<b>soy</b>', 'Yo soy estudiante.'],
          ['tú', '<b>eres</b>', '¿Tú eres de Madrid?'],
          ['él, ella, usted', '<b>es</b>', 'Ella es profesora.'],
          ['nosotros, nosotras', '<b>somos</b>', 'Somos amigos.'],
          ['vosotros, vosotras', '<b>sois</b>', '¿Sois de Perú?'],
          ['ellos, ellas, ustedes', '<b>son</b>', 'Ellos son de Chile.'],
        ]) + `<p class="note">Pronumele se omite de obicei, pentru că forma verbului arată persoana: <b>Soy de Rumanía.</b> <b>Usted</b> și <b>ustedes</b> sunt formele de politețe și se folosesc cu persoana a III-a.</p>` },
        { h: 'Articolul hotărât', html: `<p>În română articolul se lipește la sfârșit (cartea); în spaniolă stă înainte de substantiv.</p>` + table(['', 'Singular', 'Plural'], [
          ['Masculin', '<b>el</b> país', '<b>los</b> países'],
          ['Feminin', '<b>la</b> ciudad', '<b>las</b> ciudades'],
        ]) + `<p>Regula de plural: după vocală se adaugă <b>-s</b> (la lista → las listas); după consoană se adaugă <b>-es</b> (la ciudad → las ciudades).</p><p class="note">Excepții de reținut: <b>el mapa</b> și <b>el día</b> sunt masculine, deși se termină în -a; <b>la foto</b> este feminin, deși se termină în -o; <b>la gente</b> („oamenii”) este singular în spaniolă.</p>` },
        { h: 'Demonstrativele', html: table(['', 'Singular', 'Plural'], [
          ['Masculin', '<b>este</b> país', '<b>estos</b> países'],
          ['Feminin', '<b>esta</b> ciudad', '<b>estas</b> ciudades'],
        ]) + `<p><b>Esto</b> este forma neutră. O folosești când nu numești lucrul: <b>¿Qué es esto? Esto es Chile.</b></p>` },
        { h: 'Țări și capitale hispanofone', html: table(['Țară', 'Capitală', 'Țară', 'Capitală'], [
          ['España', 'Madrid', 'Perú', 'Lima'],
          ['México', 'Ciudad de México', 'Chile', 'Santiago'],
          ['Argentina', 'Buenos Aires', 'Cuba', 'La Habana'],
          ['Colombia', 'Bogotá', 'Uruguay', 'Montevideo'],
          ['Venezuela', 'Caracas', 'Ecuador', 'Quito'],
        ]) },
      ],
      exercises: [
        { title: 'Verbul ser', instr: 'Completează cu forma corectă a verbului ser.', items: [
          ['Yo ___ de Rumanía.', 'soy'],
          ['¿Tú ___ estudiante?', 'eres'],
          ['Laura ___ profesora.', 'es'],
          ['Nosotros ___ amigos.', 'somos'],
          ['¿Vosotros ___ de Lima?', 'sois'],
          ['Ellas ___ de Colombia.', 'son'],
          ['¿Usted ___ de México?', 'es', 'usted se folosește cu persoana a III-a'],
        ] },
        { title: 'Articolul hotărât', instr: 'Scrie el, la, los sau las.', items: [
          ['___ teléfono', 'el'],
          ['___ lista', 'la'],
          ['___ números', 'los'],
          ['___ letras', 'las'],
          ['___ mapa', 'el', 'excepție: masculin în -a'],
          ['___ foto', 'la', 'excepție: feminin în -o'],
          ['___ ciudades', 'las'],
          ['___ países', 'los'],
        ] },
        { title: 'Pluralul', instr: 'Scrie forma de plural, cu tot cu articol.', items: [
          ['la capital → ___', 'las capitales'],
          ['el libro → ___', 'los libros'],
          ['el país → ___', 'los países'],
          ['la amiga → ___', 'las amigas'],
          ['la ciudad → ___', 'las ciudades'],
        ] },
        { title: 'Demonstrative', instr: 'Scrie este, esta, estos, estas sau esto.', items: [
          ['___ ciudad es Quito.', 'Esta'],
          ['___ libros son de Ana.', 'Estos'],
          ['¿Qué es ___?', 'esto'],
          ['___ país es Perú.', 'Este'],
          ['___ fotos son de Cuba.', 'Estas'],
        ] },
        { title: 'Numere', instr: 'Scrie numărul în litere.', items: [
          ['7 = ___', 'siete'],
          ['12 = ___', 'doce'],
          ['15 = ___', 'quince'],
          ['16 = ___', 'dieciséis'],
          ['19 = ___', 'diecinueve'],
          ['20 = ___', 'veinte'],
        ] },
        { title: 'Capitale', instr: 'Scrie capitala.', items: [
          ['La capital de Perú es ___.', 'Lima'],
          ['La capital de Argentina es ___.', 'Buenos Aires'],
          ['La capital de Colombia es ___.', ['Bogotá']],
          ['La capital de Cuba es ___.', ['La Habana']],
        ] },
      ],
    },
    {
      id: 'u2', n: 2, title: 'Gente con gente', theme: 'Vorbim despre persoane: prezentul, posesive, adjective', pages: [28, 37], grammar: [143, 146],
      goals: ['Conjugi verbele regulate în -ar, -er, -ir la prezent', 'Spui vârsta, profesia și relațiile de familie', 'Folosești posesivele mi, tu, su', 'Acorzi adjectivele în gen și număr', 'Numeri până la 100'],
      sections: [
        { h: 'Prezentul verbelor regulate', html: `<p>Scoți terminația de infinitiv și adaugi terminațiile grupei.</p>` + table(['', 'hablar (a vorbi)', 'comer (a mânca)', 'vivir (a locui)'], [
          ['yo', 'habl<b>o</b>', 'com<b>o</b>', 'viv<b>o</b>'],
          ['tú', 'habl<b>as</b>', 'com<b>es</b>', 'viv<b>es</b>'],
          ['él, ella, usted', 'habl<b>a</b>', 'com<b>e</b>', 'viv<b>e</b>'],
          ['nosotros/as', 'habl<b>amos</b>', 'com<b>emos</b>', 'viv<b>imos</b>'],
          ['vosotros/as', 'habl<b>áis</b>', 'com<b>éis</b>', 'viv<b>ís</b>'],
          ['ellos, ellas, ustedes', 'habl<b>an</b>', 'com<b>en</b>', 'viv<b>en</b>'],
        ]) },
        { h: 'Două verbe de știut pe dinafară', html: table(['', 'tener (a avea)', 'llamarse (a se numi)'], [
          ['yo', 'tengo', 'me llamo'],
          ['tú', 'tienes', 'te llamas'],
          ['él, ella, usted', 'tiene', 'se llama'],
          ['nosotros/as', 'tenemos', 'nos llamamos'],
          ['vosotros/as', 'tenéis', 'os llamáis'],
          ['ellos, ellas, ustedes', 'tienen', 'se llaman'],
        ]) + `<p>Vârsta se spune cu <b>tener</b>, nu cu „a fi”: <b>¿Cuántos años tienes? Tengo treinta años.</b></p>` },
        { h: 'Posesivele', html: table(['Persoana', 'Singular', 'Plural', 'Exemplu'], [
          ['yo', '<b>mi</b>', '<b>mis</b>', 'mi hermano, mis hermanos'],
          ['tú', '<b>tu</b>', '<b>tus</b>', 'tu madre, tus padres'],
          ['él, ella, usted', '<b>su</b>', '<b>sus</b>', 'su hija, sus hijas'],
        ]) + `<p class="note">Posesivul stă înaintea substantivului și nu se pune articol: <b>mi casa</b>, nu „la mi casa”. Se acordă în număr cu lucrul posedat, nu cu posesorul.</p>` },
        { h: 'Adjectivele', html: table(['Terminație', 'Masculin', 'Feminin', 'Plural'], [
          ['-o / -a', 'simpático', 'simpática', 'simpáticos, simpáticas'],
          ['-e', 'inteligente', 'inteligente', 'inteligentes'],
          ['consoană', 'joven', 'joven', 'jóvenes'],
          ['naționalități', 'español', 'española', 'españoles, españolas'],
        ]) + `<p>Pentru grad folosești, de la mai mult la mai puțin: <b>muy</b> (foarte), <b>bastante</b> (destul de), <b>un poco</b> (puțin), iar la negativ <b>no es nada</b> (nu este deloc).</p>` },
        { h: 'Numerele de la 20 la 100', html: table(['', '', ''], [
          ['21 veintiuno', '30 treinta', '70 setenta'],
          ['22 veintidós', '31 treinta y uno', '80 ochenta'],
          ['23 veintitrés', '40 cuarenta', '90 noventa'],
          ['26 veintiséis', '50 cincuenta', '99 noventa y nueve'],
          ['29 veintinueve', '60 sesenta', '100 cien'],
        ]) + `<p>De la 31 în sus se scrie în trei cuvinte, cu <b>y</b> între zeci și unități: <b>cuarenta y cinco</b>.</p>` },
        { h: 'Familie și profesii', html: table(['Familie', '', 'Profesii', ''], [
          ['el padre', 'tatăl', 'el profesor / la profesora', 'profesor'],
          ['la madre', 'mama', 'el médico / la médica', 'medic'],
          ['el hermano', 'fratele', 'el estudiante / la estudiante', 'student'],
          ['la hermana', 'sora', 'el camarero / la camarera', 'ospătar'],
          ['el hijo / la hija', 'fiul / fiica', 'el ingeniero / la ingeniera', 'inginer'],
          ['los abuelos', 'bunicii', 'el enfermero / la enfermera', 'asistent medical'],
        ]) + `<p class="note">La profesii nu se pune articol după ser: <b>Es médica.</b> <b>Los padres</b> înseamnă „părinții”, iar <b>los hermanos</b> poate însemna „frații” sau „frații și surorile”.</p>` },
      ],
      exercises: [
        { title: 'Prezentul regulat', instr: 'Conjugă verbul din paranteză.', items: [
          ['Yo ___ español. (hablar)', 'hablo'],
          ['Tú ___ en Madrid. (vivir)', 'vives'],
          ['Ana ___ mucho. (comer)', 'come'],
          ['Nosotros ___ italiano. (hablar)', 'hablamos'],
          ['Vosotros ___ en un piso. (vivir)', 'vivís'],
          ['Ellos ___ en casa. (comer)', 'comen'],
          ['Usted ___ muy bien. (hablar)', 'habla'],
          ['Nosotros ___ en Cluj. (vivir)', 'vivimos'],
        ] },
        { title: 'Tener și llamarse', instr: 'Completează.', items: [
          ['¿Cuántos años ___ tú?', 'tienes'],
          ['Yo ___ treinta años.', 'tengo'],
          ['Mi hermana ___ Elena.', 'se llama'],
          ['Ellos ___ dos hijos.', 'tienen'],
          ['Nosotros ___ un perro.', 'tenemos'],
          ['Yo ___ Andrei.', 'me llamo'],
        ] },
        { title: 'Posesive', instr: 'Alege mi, mis, tu, tus, su sau sus.', items: [
          ['Yo y ___ hermano. (al meu)', 'mi'],
          ['Yo y ___ padres. (ai mei)', 'mis'],
          ['¿Es ___ madre? (a ta)', 'tu'],
          ['¿Son ___ amigos? (ai tăi)', 'tus'],
          ['Elena y ___ hija. (a ei)', 'su'],
          ['Pablo y ___ abuelos. (ai lui)', 'sus'],
        ] },
        { title: 'Acordul adjectivului', instr: 'Scrie adjectivul la forma corectă.', items: [
          ['Mi madre es ___. (simpático)', 'simpática'],
          ['Mis hermanos son ___. (inteligente)', 'inteligentes'],
          ['Ana es ___. (español)', 'española'],
          ['Ellos son ___. (joven)', 'jóvenes'],
          ['Mi hermana es ___. (inteligente)', 'inteligente'],
          ['Las chicas son ___. (simpático)', 'simpáticas'],
        ] },
        { title: 'Numere', instr: 'Scrie numărul în litere.', items: [
          ['21 = ___', 'veintiuno'],
          ['35 = ___', 'treinta y cinco'],
          ['48 = ___', 'cuarenta y ocho'],
          ['67 = ___', 'sesenta y siete'],
          ['76 = ___', 'setenta y seis'],
          ['100 = ___', 'cien'],
        ] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [
          ['Sora mea este medic. → ___', ['Mi hermana es médica']],
          ['Am douăzeci și cinci de ani. → ___', ['Tengo veinticinco años']],
          ['Unde locuiești? → ___', ['¿Dónde vives?', 'Dónde vives']],
          ['Părinții mei vorbesc spaniolă. → ___', ['Mis padres hablan español']],
        ] },
      ],
    },
  ];

  // Unitatile urmatoare din manual, de scris dupa ce formatul e aprobat.
  window.SPANISH_NEXT = [
    [3, 'Gente de vacaciones', 'Hay, está; querer, gustar; preferințe; călătorii', 38],
    [4, 'Gente de compras', 'Numere peste 100; tener que; pronume complement; cumpărături', 48],
    [5, 'Gente en forma', 'Prezent neregulat; sfaturi; corpul uman; sport', 58],
    [6, 'Gente que come bien', 'Alimente, restaurant, rețete', 68],
    [7, 'Gente que trabaja', 'Profesii și experiență profesională', 78],
    [8, 'Gente que viaja', 'Programe, ore, deplasări', 88],
    [9, 'Gente de ciudad', 'Orașe, opinii, comparații', 98],
    [10, 'Gente y fechas', 'Date și evenimente din trecut', 108],
    [11, 'Gente en casa', 'Locuință, anunțuri imobiliare', 118],
    [12, 'Amintiri', 'Cum era viața când eram mici', 128],
  ];
})();
