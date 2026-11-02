// Spaniola: unitatile 3 si 4 si programul pe 4 saptamani.
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  window.SPANISH_UNITS.push(
    {
      id: 'u3', n: 3, title: 'Gente de vacaciones', theme: 'Locuri, preferințe și planuri de vacanță', pages: [38, 47], grammar: [147, 148],
      goals: ['Spui ce există într-un loc și unde se află', 'Exprimi gusturi și preferințe', 'Pui întrebări cu qué, dónde, cuándo, cómo, quién', 'Spui lunile, anotimpurile și mijloacele de transport'],
      sections: [
        { h: 'Hay și está', html: `<p><b>Hay</b> spune că ceva <b>există</b>. Are o singură formă. <b>Está / están</b> spune <b>unde se află</b> ceva cunoscut.</p>` + table(['Construcție', 'Exemplu', 'Română'], [
          ['hay + un/una, număr, fără articol', 'Hay un museo. Hay dos hoteles.', 'Există un muzeu. Sunt două hoteluri.'],
          ['el/la + está', 'El museo está en el centro.', 'Muzeul este în centru.'],
          ['los/las + están', 'Los hoteles están cerca.', 'Hotelurile sunt aproape.'],
        ]) + `<p class="note">Nu se spune „hay el museo”. După <b>hay</b> nu vine articol hotărât.</p>` },
        { h: 'Gustar, interesar, querer și preferir', html: `<p><b>Gustar</b> funcționează ca în română „îmi place”: verbul se acordă cu ce place.</p>` + table(['Pronume', 'Singular sau verb', 'Plural'], [
          ['(a mí) me', 'gusta el mar / gusta viajar', 'gustan los museos'],
          ['(a ti) te', 'gusta', 'gustan'],
          ['(a él, ella, usted) le', 'gusta', 'gustan'],
          ['(a nosotros) nos', 'gusta', 'gustan'],
          ['(a vosotros) os', 'gusta', 'gustan'],
          ['(a ellos, ustedes) les', 'gusta', 'gustan'],
        ]) + `<p><b>Interesar</b> are aceeași construcție: <b>Me interesa el arte.</b> <b>A mí</b> se folosește pentru accent: <b>A mí me gusta. ¿Y a ti?</b></p>` + table(['', 'querer (e → ie)', 'preferir (e → ie)'], [
          ['yo', 'quiero', 'prefiero'],
          ['tú', 'quieres', 'prefieres'],
          ['él, ella, usted', 'quiere', 'prefiere'],
          ['nosotros/as', 'queremos', 'preferimos'],
          ['vosotros/as', 'queréis', 'preferís'],
          ['ellos, ellas, ustedes', 'quieren', 'prefieren'],
        ]) + `<p>După ele poate urma un infinitiv: <b>Quiero ir a Cuba. Prefiero viajar en tren.</b></p>` },
        { h: 'Y, también, ni, tampoco', html: table(['Cuvânt', 'Folosire', 'Exemplu'], [
          ['<b>y</b>', 'adaugă', 'Hay un museo y un teatro.'],
          ['<b>también</b>', 'adaugă o afirmație', 'Me gusta el mar. A mí también.'],
          ['<b>ni</b>', 'leagă negații', 'No hay museo ni teatro.'],
          ['<b>tampoco</b>', 'adaugă o negație', 'No me gusta. A mí tampoco.'],
        ]) },
        { h: 'Cuvinte de întrebare', html: table(['Spaniolă', 'Română', 'Exemplu'], [
          ['¿Qué?', 'Ce?', '¿Qué quieres hacer?'],
          ['¿Dónde? / ¿Adónde?', 'Unde? / Încotro?', '¿Adónde vas?'],
          ['¿Cuándo?', 'Când?', '¿Cuándo vais?'],
          ['¿Cómo?', 'Cum?', '¿Cómo vas? En tren.'],
          ['¿Con quién?', 'Cu cine?', '¿Con quién viajas?'],
          ['¿Cuántos? / ¿Cuántas?', 'Câți? / Câte?', '¿Cuántos días?'],
        ]) },
        { h: 'Timp și transport', html: table(['Luni', '', 'Anotimpuri', 'Transport'], [
          ['enero, febrero', 'julio, agosto', 'la primavera', 'en tren'],
          ['marzo, abril', 'septiembre, octubre', 'el verano', 'en avión'],
          ['mayo, junio', 'noviembre, diciembre', 'el otoño', 'en coche, en barco'],
          ['', '', 'el invierno', 'a pie (pe jos)'],
        ]) + `<p class="note">Lunile se scriu cu literă mică. Se spune <b>en verano</b>, <b>en julio</b>, <b>en tren</b>, dar <b>a pie</b>.</p>` },
      ],
      exercises: [
        { title: 'Hay sau está', instr: 'Scrie hay, está sau están.', items: [
          ['En mi barrio ___ un museo.', 'hay'],
          ['La playa ___ cerca del hotel.', 'está'],
          ['Los restaurantes ___ en el centro.', 'están'],
          ['En la ciudad ___ dos teatros.', 'hay'],
          ['¿Dónde ___ la estación?', 'está'],
        ] },
        { title: 'Gustar', instr: 'Scrie gusta sau gustan.', items: [
          ['Me ___ viajar en tren.', 'gusta'],
          ['Te ___ los museos.', 'gustan'],
          ['Nos ___ la playa.', 'gusta'],
          ['A Ana le ___ las ciudades grandes.', 'gustan'],
          ['No me ___ el invierno.', 'gusta'],
        ] },
        { title: 'Pronumele lui gustar', instr: 'Scrie me, te, le, nos, os sau les.', items: [
          ['A mí ___ gusta el mar.', 'me'],
          ['A ti ___ interesa el arte.', 'te'],
          ['A Pablo ___ gustan los barcos.', 'le'],
          ['A nosotros ___ gusta viajar.', 'nos'],
          ['A ellos ___ gusta el verano.', 'les'],
        ] },
        { title: 'Querer și preferir', instr: 'Conjugă verbul.', items: [
          ['Yo ___ ir a México. (querer)', 'quiero'],
          ['¿Tú ___ el mar o la montaña? (preferir)', 'prefieres'],
          ['Nosotros ___ viajar en junio. (querer)', 'queremos'],
          ['Ellos ___ ir en avión. (preferir)', 'prefieren'],
          ['Ana ___ un hotel barato. (querer)', 'quiere'],
          ['Nosotros ___ el tren. (preferir)', 'preferimos'],
        ] },
        { title: 'También, tampoco, ni', instr: 'Completează.', items: [
          ['Me gusta el mar. A mí ___.', 'también'],
          ['No me gusta el frío. A mí ___.', 'tampoco'],
          ['No hay hotel ___ restaurante.', 'ni'],
        ] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [
          ['În iulie merg cu trenul. → ___', ['En julio voy en tren']],
          ['Îmi plac muzeele. → ___', ['Me gustan los museos']],
          ['Unde este hotelul? → ___', ['¿Dónde está el hotel?', 'Dónde está el hotel']],
          ['Prefer vara. → ___', ['Prefiero el verano']],
        ] },
      ],
    },
    {
      id: 'u4', n: 4, title: 'Gente de compras', theme: 'Prețuri, obligații, haine și pronume', pages: [48, 57], grammar: [149, 150],
      goals: ['Numeri peste 100 și întrebi prețul', 'Spui ce trebuie să faci, cu tener que și necesitar', 'Înlocuiești obiectul cu lo, la, los, las', 'Spui culori și haine'],
      sections: [
        { h: 'Numerele peste 100', html: table(['Număr', 'Spaniolă', 'Număr', 'Spaniolă'], [
          ['100', 'cien', '500', 'quinientos/as'],
          ['101', 'ciento uno', '700', 'setecientos/as'],
          ['200', 'doscientos/as', '900', 'novecientos/as'],
          ['300', 'trescientos/as', '1 000', 'mil'],
          ['400', 'cuatrocientos/as', '1 000 000', 'un millón'],
        ]) + `<p><b>Cien</b> se folosește singur; de la 101 se spune <b>ciento</b>. Sutele se acordă: <b>doscientos euros</b>, <b>doscientas personas</b>. <b>Mil</b> nu are plural aici: <b>dos mil</b>. Se spune <b>un millón de euros</b>.</p>` },
        { h: 'Tener que și necesitar', html: table(['Construcție', 'Sens', 'Exemplu'], [
          ['<b>tener que</b> + infinitiv', 'a trebui să', 'Tengo que comprar pan.'],
          ['<b>necesitar</b> + substantiv', 'a avea nevoie de', 'Necesito un abrigo.'],
          ['<b>necesitar</b> + infinitiv', 'a avea nevoie să', 'Necesito comprar un regalo.'],
        ]) + `<p>Formele lui <b>poder</b> (o → ue): puedo, puedes, puede, podemos, podéis, pueden. Pentru oferte: <b>Yo puedo comprar el vino.</b></p>` },
        { h: 'Cât costă', html: table(['Întrebare', 'Răspuns'], [
          ['¿Cuánto cuesta este bolso?', 'Cuesta cuarenta euros.'],
          ['¿Cuánto cuestan estos zapatos?', 'Cuestan ochenta euros.'],
        ]) + `<p>Forme de plată: <b>en efectivo</b> (numerar), <b>con tarjeta</b> (cu cardul).</p>` },
        { h: 'Un, uno, una', html: `<p>Înaintea substantivului masculin este <b>un</b>; singur, fără substantiv, este <b>uno</b>.</p>` + table(['Cu substantiv', 'Fără substantiv'], [
          ['¿Tienes <b>un</b> bolígrafo?', 'Sí, tengo <b>uno</b>.'],
          ['¿Tienes <b>una</b> maleta?', 'Sí, tengo <b>una</b>.'],
        ]) + `<p>La fel, cu demonstrativele: <b>esto</b> se folosește când nu numești lucrul; <b>este, esta</b> se acordă cu lucrul despre care vorbești.</p>` },
        { h: 'Pronumele complement', html: table(['Complement direct', 'Înlocuiește', 'Exemplu'], [
          ['<b>lo</b>', 'masculin singular', '¿El té? <b>Lo</b> compro aquí.'],
          ['<b>la</b>', 'feminin singular', '¿La leche? <b>La</b> compro yo.'],
          ['<b>los</b>', 'masculin plural', '¿Los zapatos? <b>Los</b> quiero.'],
          ['<b>las</b>', 'feminin plural', '¿Las flores? <b>Las</b> compra Ana.'],
        ]) + table(['Complement indirect', 'Persoana', 'Exemplu'], [
          ['me, te', 'mie, ție', '<b>Te</b> compro un libro.'],
          ['le, les', 'lui, ei, lor', '<b>Le</b> compro flores a mi madre.'],
          ['nos, os', 'nouă, vouă', '<b>Nos</b> regalan un vino.'],
        ]) + `<p class="note">Pronumele stă <b>înaintea verbului conjugat</b>: <b>Lo compro.</b> Cu un infinitiv poate sta și după, lipit: <b>Tengo que comprarlo</b> sau <b>Lo tengo que comprar</b>.</p>` },
        { h: 'Culori și haine', html: table(['Culori', 'Haine și obiecte', ''], [
          ['rojo/a, amarillo/a', 'la camisa (cămașa)', 'el abrigo (paltonul)'],
          ['blanco/a, negro/a', 'la camiseta (tricoul)', 'el jersey (puloverul)'],
          ['azul, verde, gris', 'los pantalones', 'el vestido (rochia)'],
          ['marrón, naranja, rosa', 'los zapatos', 'el bolso (geanta)'],
        ]) + `<p>Culorile în <b>-o</b> se acordă: <b>camisa roja</b>, <b>zapatos negros</b>. <b>Azul</b> și <b>verde</b> se schimbă doar la plural: <b>pantalones azules</b>.</p>` },
      ],
      exercises: [
        { title: 'Numere', instr: 'Scrie numărul în litere.', items: [
          ['100 = ___', 'cien'],
          ['105 = ___', 'ciento cinco'],
          ['250 = ___', 'doscientos cincuenta'],
          ['500 = ___', 'quinientos'],
          ['2 000 = ___', 'dos mil'],
          ['300 personas = ___ personas', 'trescientas'],
        ] },
        { title: 'Tener que', instr: 'Conjugă tener și adaugă que.', items: [
          ['Yo ___ comprar pan.', 'tengo que'],
          ['Tú ___ ir a la tienda.', 'tienes que'],
          ['Ana ___ pagar.', 'tiene que'],
          ['Nosotros ___ buscar un regalo.', 'tenemos que'],
          ['Ellos ___ llevar vino.', 'tienen que'],
        ] },
        { title: 'Cuesta sau cuestan', instr: 'Completează.', items: [
          ['¿Cuánto ___ este libro?', 'cuesta'],
          ['¿Cuánto ___ estos pantalones?', 'cuestan'],
          ['La camisa ___ treinta euros.', 'cuesta'],
          ['Los zapatos ___ noventa euros.', 'cuestan'],
        ] },
        { title: 'Lo, la, los, las', instr: 'Scrie pronumele care înlocuiește substantivul din întrebare.', items: [
          ['¿El vino? Yo ___ compro.', 'lo'],
          ['¿La camisa? ___ quiero roja.', 'La'],
          ['¿Los zapatos? ___ compro aquí.', 'Los'],
          ['¿Las flores? Ana ___ lleva.', 'las'],
          ['¿El pan? ___ compra mi madre.', 'Lo'],
        ] },
        { title: 'Le și les', instr: 'Scrie le sau les.', items: [
          ['A mi madre ___ compro flores.', 'le'],
          ['A mis amigos ___ regalo un libro.', 'les'],
          ['A Pablo ___ compro un jersey.', 'le'],
        ] },
        { title: 'Acordul culorilor', instr: 'Scrie culoarea la forma corectă.', items: [
          ['una camisa ___ (rojo)', 'roja'],
          ['unos zapatos ___ (negro)', 'negros'],
          ['un bolso ___ (blanco)', 'blanco'],
          ['unos pantalones ___ (azul)', 'azules'],
        ] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [
          ['Cât costă această geantă? → ___', ['¿Cuánto cuesta este bolso?', 'Cuánto cuesta este bolso']],
          ['Trebuie să cumpăr un cadou. → ___', ['Tengo que comprar un regalo']],
          ['Am nevoie de un palton. → ___', ['Necesito un abrigo']],
        ] },
      ],
    },
  );

  window.SPANISH_NEXT = window.SPANISH_NEXT.filter((x) => x[0] > 4);

  // Programul pe 4 saptamani, cate o portiune din manual pe saptamana.
  window.SPANISH_WEEKS = [
    { n: 1, title: 'Săptămâna 1', units: ['u0', 'u1'] },
    { n: 2, title: 'Săptămâna 2', units: ['u2'] },
    { n: 3, title: 'Săptămâna 3', units: ['u3'] },
    { n: 4, title: 'Săptămâna 4', units: ['u4'] },
  ];
})();
