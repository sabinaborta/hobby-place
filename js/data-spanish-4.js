// Spaniola: unitatile 5-12. Urmeaza temele din manual, dar explicatiile, textele si exercitiile sunt scrise aici.
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const VF = 'Scrie verdadero sau falso.';

  const units = [
    {
      id: 'u5', n: 5, title: 'Gente en forma', theme: 'Corpul, sănătatea și obiceiurile zilnice', pages: [58, 67],
      goals: ['Conjugi verbele neregulate frecvente la prezent', 'Spui cât de des faci ceva', 'Spui ce te doare', 'Dai sfaturi cu hay que, tener que și deber'],
      sections: [
        { h: 'Verbe cu schimbare de vocală', html: `<p>Unele verbe își schimbă vocala din rădăcină la toate persoanele, în afară de <b>nosotros</b> și <b>vosotros</b>.</p>` + table(['', 'dormir (o → ue)', 'empezar (e → ie)', 'pedir (e → i)'], [
          ['yo', 'duermo', 'empiezo', 'pido'], ['tú', 'duermes', 'empiezas', 'pides'], ['él, ella, usted', 'duerme', 'empieza', 'pide'], ['nosotros/as', 'dormimos', 'empezamos', 'pedimos'], ['vosotros/as', 'dormís', 'empezáis', 'pedís'], ['ellos, ellas, ustedes', 'duermen', 'empiezan', 'piden'],
        ]) + `<p>La fel: <b>poder → puedo</b>, <b>volver → vuelvo</b>, <b>jugar → juego</b>, <b>cerrar → cierro</b>, <b>repetir → repito</b>.</p>` },
        { h: 'Verbe reflexive', html: `<p>Pronumele stă înaintea verbului: <b>me levanto</b> (mă scol), <b>te duchas</b> (faci duș).</p>` + table(['Persoană', 'levantarse', 'acostarse (o → ue)'], [
          ['yo', 'me levanto', 'me acuesto'], ['tú', 'te levantas', 'te acuestas'], ['él, ella, usted', 'se levanta', 'se acuesta'], ['nosotros/as', 'nos levantamos', 'nos acostamos'], ['vosotros/as', 'os levantáis', 'os acostáis'], ['ellos, ellas, ustedes', 'se levantan', 'se acuestan'],
        ]) },
        { h: 'Cât de des', html: table(['Spaniolă', 'Română'], [['siempre', 'mereu'], ['normalmente', 'de obicei'], ['a menudo', 'des'], ['a veces', 'uneori'], ['casi nunca', 'aproape niciodată'], ['nunca', 'niciodată'], ['dos veces a la semana', 'de două ori pe săptămână']]) + `<p class="note">Dacă <b>nunca</b> stă după verb, apare și <b>no</b>: <b>No fumo nunca.</b> Dar: <b>Nunca fumo.</b></p>` },
        { h: 'Corpul și durerea', html: `<p><b>Doler</b> (o → ue) funcționează ca <b>gustar</b>: <b>Me duele la cabeza. Me duelen los pies.</b></p>` + table(['Spaniolă', 'Română', 'Spaniolă', 'Română'], [['la cabeza', 'capul', 'la espalda', 'spatele'], ['el brazo', 'brațul', 'la pierna', 'piciorul'], ['la mano', 'mâna', 'el pie', 'laba piciorului'], ['el estómago', 'stomacul', 'la garganta', 'gâtul']]) },
        { h: 'Sfaturi', html: table(['Construcție', 'Sens', 'Exemplu'], [['hay que + infinitiv', 'trebuie, în general', 'Hay que dormir ocho horas.'], ['tener que + infinitiv', 'trebuie, o persoană anume', 'Tienes que beber más agua.'], ['deber + infinitiv', 'ar trebui', 'Debes comer menos sal.'], ['es bueno + infinitiv', 'este bine să', 'Es bueno caminar cada día.']]) },
      ],
      reading: {
        title: 'Una vida nueva',
        text: `Marcos tiene cuarenta años y trabaja en una oficina. Hace un mes, el médico le dijo: «Usted duerme poco y no hace deporte. Tiene que cambiar de vida».

Ahora Marcos se levanta a las siete. Se ducha, desayuna fruta y va al trabajo a pie. Tarda treinta minutos, pero le gusta caminar por el parque.

Dos veces a la semana juega al tenis con su hermana. Ella siempre gana, pero a él no le importa. Los sábados, los dos nadan en la piscina del barrio.

Ya no toma tanto café y casi nunca come en restaurantes. Por la noche cena pronto, lee un poco y se acuesta a las once.

Al principio le dolían las piernas y la espalda. Hoy se siente mucho mejor. «Duermo bien y tengo más energía», dice Marcos. «Pero los domingos no hago nada. ¡Hay que descansar también!»`,
        glossary: { oficina: 'birou', médico: 'medic', dijo: 'a spus', duerme: 'doarme', cambiar: 'a schimba', vida: 'viață', levanta: 'se scoală', ducha: 'face duș', desayuna: 'ia micul dejun', fruta: 'fructe', tarda: 'îi ia', caminar: 'a merge pe jos', hermana: 'soră', gana: 'câștigă', importa: 'contează', nadan: 'înoată', piscina: 'piscină', barrio: 'cartier', cena: 'ia cina', pronto: 'devreme', acuesta: 'se culcă', dolían: 'îl dureau', piernas: 'picioare', espalda: 'spate', siente: 'se simte', mejor: 'mai bine', descansar: 'a se odihni' },
        questions: [['Ce i-a spus medicul?', 'Că trebuie să își schimbe viața.'], ['Cu cine joacă Marcos tenis?', 'Cu sora lui.'], ['Ce face duminica?', 'Nimic, se odihnește.']],
      },
      exercises: [
        { title: 'Verbe neregulate', instr: 'Scrie verbul la prezent.', items: [['Yo ___ ocho horas. (dormir)', 'duermo'], ['La clase ___ a las nueve. (empezar)', 'empieza'], ['Nosotros ___ a casa a las seis. (volver)', 'volvemos'], ['¿___ ayudarme? (poder, tú)', 'Puedes'], ['Ellos ___ al fútbol. (jugar)', 'juegan'], ['Yo ___ un café. (pedir)', 'pido'], ['Vosotros ___ mucho. (dormir)', 'dormís']] },
        { title: 'Verbe reflexive', instr: 'Scrie forma corectă.', items: [['Yo ___ a las siete. (levantarse)', 'me levanto'], ['Tú ___ por la mañana. (ducharse)', 'te duchas'], ['Ana ___ tarde. (acostarse)', 'se acuesta'], ['Nosotros ___ a las once. (acostarse)', 'nos acostamos'], ['Ellos ___ pronto. (levantarse)', 'se levantan']] },
        { title: 'Doler', instr: 'Scrie duele sau duelen.', items: [['Me ___ la cabeza.', 'duele'], ['Me ___ los pies.', 'duelen'], ['¿Te ___ la espalda?', 'duele'], ['A Luis le ___ las piernas.', 'duelen'], ['Nos ___ el estómago.', 'duele']] },
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [['Marcos va al trabajo a pie. ___', 'verdadero'], ['Su hermana siempre pierde al tenis. ___', 'falso'], ['Nada los sábados. ___', 'verdadero'], ['Toma más café que antes. ___', 'falso'], ['Se acuesta a las once. ___', 'verdadero']] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [['Mă doare capul. → ___', 'Me duele la cabeza'], ['Trebuie să bei mai multă apă. → ___', 'Tienes que beber más agua'], ['Nu fac niciodată sport. → ___', ['No hago nunca deporte', 'Nunca hago deporte']], ['Mă culc la unsprezece. → ___', 'Me acuesto a las once']] },
      ],
    },
    {
      id: 'u6', n: 6, title: 'Gente que come bien', theme: 'Alimente, restaurant și rețete', pages: [68, 77],
      goals: ['Numești alimente și cantități', 'Comanzi la restaurant', 'Folosești pronumele lo, la, los, las', 'Explici o rețetă cu se și imperativul de bază'],
      sections: [
        { h: 'Alimente și cantități', html: table(['Alimente', 'Română', 'Cantități', 'Română'], [['el pan', 'pâinea', 'un kilo de', 'un kilogram de'], ['la carne', 'carnea', 'medio kilo de', 'jumătate de kilogram de'], ['el pescado', 'peștele', 'cien gramos de', 'o sută de grame de'], ['las verduras', 'legumele', 'un litro de', 'un litru de'], ['los huevos', 'ouăle', 'una docena de', 'o duzină de'], ['el arroz', 'orezul', 'una botella de', 'o sticlă de']]) + `<p class="note">După cantitate vine <b>de</b>, fără articol: <b>un kilo de tomates</b>.</p>` },
        { h: 'Mucho, poco, demasiado, bastante', html: `<p>Înaintea substantivului se acordă: <b>mucha sal</b>, <b>pocos huevos</b>. Înaintea adjectivului folosim <b>muy</b>: <b>muy rico</b>. După verb nu se schimbă: <b>Como mucho.</b></p>` + table(['Cuvânt', 'Exemplu', 'Română'], [['demasiado/a', 'demasiada sal', 'prea multă sare'], ['bastante', 'bastante agua', 'destulă apă'], ['nada de', 'nada de azúcar', 'deloc zahăr'], ['un poco de', 'un poco de aceite', 'puțin ulei']]) },
        { h: 'Lo, la, los, las', html: `<p>Înlocuiesc un obiect direct deja cunoscut și stau înaintea verbului conjugat.</p>` + table(['Obiect', 'Pronume', 'Exemplu'], [['el pescado', 'lo', '¿El pescado? Lo como a menudo.'], ['la sopa', 'la', '¿La sopa? La hago yo.'], ['los huevos', 'los', '¿Los huevos? Los compro aquí.'], ['las verduras', 'las', '¿Las verduras? No las como.']]) },
        { h: 'La restaurant', html: table(['Spaniolă', 'Română'], [['¿Qué van a tomar?', 'Ce doriți să serviți?'], ['De primero, sopa.', 'Ca primul fel, supă.'], ['De segundo, pescado.', 'Ca al doilea fel, pește.'], ['De postre, fruta.', 'Ca desert, fructe.'], ['Para beber, agua.', 'De băut, apă.'], ['La cuenta, por favor.', 'Nota, vă rog.']]) },
        { h: 'Rețete cu se', html: `<p>În rețete se folosește des <b>se</b> impersonal: <b>Se corta la cebolla. Se fríen las patatas.</b> Verbul se acordă cu ce urmează: singular sau plural.</p><p>Verbe utile: <b>cortar</b> (a tăia), <b>freír</b> (a prăji), <b>hervir</b> (a fierbe), <b>añadir</b> (a adăuga), <b>mezclar</b> (a amesteca).</p>` },
      ],
      reading: {
        title: 'La tortilla de la abuela',
        text: `Los domingos, Elena visita a su abuela. Hoy quiere aprender a hacer una tortilla de patatas.

—Es muy fácil —dice la abuela—. Necesitamos cuatro patatas, una cebolla, seis huevos, aceite y un poco de sal.

Primero, se cortan las patatas y la cebolla. Después, se fríen despacio en una sartén con bastante aceite. Mientras tanto, Elena bate los huevos en un plato grande.

—¿Cuánta sal pongo?

—Poca, hija. Demasiada sal lo estropea todo.

Se mezclan las patatas con los huevos y se pone todo otra vez en la sartén. Cuando la tortilla está dorada por un lado, hay que darle la vuelta con un plato. Elena tiene miedo, pero lo hace muy bien.

Comen en la cocina con pan y una ensalada de tomate. De postre, la abuela saca un poco de queso con miel.

—¿Te gusta?

—¡Está riquísima! El domingo que viene la hago yo sola.`,
        glossary: { abuela: 'bunică', aprender: 'a învăța', fácil: 'ușor', patatas: 'cartofi', cebolla: 'ceapă', huevos: 'ouă', aceite: 'ulei', sal: 'sare', primero: 'mai întâi', cortan: 'se taie', fríen: 'se prăjesc', despacio: 'încet', sartén: 'tigaie', bate: 'bate', plato: 'farfurie', estropea: 'strică', mezclan: 'se amestecă', dorada: 'aurie', lado: 'parte', vuelta: 'întoarcere', miedo: 'teamă', cocina: 'bucătărie', ensalada: 'salată', queso: 'brânză', miel: 'miere', riquísima: 'foarte gustoasă', sola: 'singură' },
        questions: [['Ce vrea Elena să învețe?', 'Să facă o tortilla de cartofi.'], ['De câte ouă e nevoie?', 'Șase.'], ['Ce mănâncă la desert?', 'Brânză cu miere.']],
      },
      exercises: [
        { title: 'Pronume', instr: 'Scrie lo, la, los sau las.', items: [['¿El pan? ___ compro por la mañana.', 'lo'], ['¿La carne? No ___ como.', 'la'], ['¿Los tomates? ___ corto yo.', 'los'], ['¿Las patatas? ___ frío ahora.', 'las'], ['¿El café? ___ tomo sin azúcar.', 'lo'], ['¿La cuenta? ___ pago yo.', 'la']] },
        { title: 'Mucho sau muy', instr: 'Scrie forma potrivită: muy, mucho, mucha, muchos, muchas.', items: [['La sopa está ___ rica.', 'muy'], ['Como ___ fruta.', 'mucha'], ['Hay ___ huevos.', 'muchos'], ['No bebo ___ café.', 'mucho'], ['Compro ___ verduras.', 'muchas']] },
        { title: 'Se la plural', instr: 'Scrie verbul la forma corectă.', items: [['Se ___ la cebolla. (cortar)', 'corta'], ['Se ___ los huevos. (batir)', 'baten'], ['Se ___ el arroz. (añadir)', 'añade'], ['Se ___ las patatas. (mezclar)', 'mezclan']] },
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [['Elena visita a su abuela los domingos. ___', 'verdadero'], ['La tortilla lleva diez huevos. ___', 'falso'], ['La abuela pone mucha sal. ___', 'falso'], ['Comen en la cocina. ___', 'verdadero'], ['A Elena no le gusta la tortilla. ___', 'falso']] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [['Nota, vă rog. → ___', 'La cuenta, por favor'], ['Un kilogram de roșii. → ___', 'Un kilo de tomates'], ['Ca primul fel, supă. → ___', 'De primero, sopa'], ['Nu mănânc pește. → ___', 'No como pescado']] },
      ],
    },
    {
      id: 'u7', n: 7, title: 'Gente que trabaja', theme: 'Profesii și experiență profesională', pages: [78, 87],
      goals: ['Vorbești despre profesii și calități', 'Folosești pretérito perfecto', 'Spui ce ai făcut și de câte ori', 'Spui ce știi să faci cu saber'],
      sections: [
        { h: 'Pretérito perfecto', html: `<p>Se formează cu <b>haber</b> la prezent și participiul verbului. Este folosit pentru experiențe și pentru un trecut legat de prezent: <b>hoy, esta semana, este año, ya, todavía no, nunca</b>.</p>` + table(['Persoană', 'haber', 'participiu'], [['yo', 'he', 'trabajado'], ['tú', 'has', 'comido'], ['él, ella, usted', 'ha', 'vivido'], ['nosotros/as', 'hemos', 'trabajado'], ['vosotros/as', 'habéis', 'comido'], ['ellos, ellas, ustedes', 'han', 'vivido']]) + `<p><b>-ar → -ado</b>, <b>-er, -ir → -ido</b>. Între <b>haber</b> și participiu nu se pune nimic: <b>No he comido.</b></p>` },
        { h: 'Participii neregulate', html: table(['Infinitiv', 'Participiu', 'Infinitiv', 'Participiu'], [['hacer', 'hecho', 'ver', 'visto'], ['decir', 'dicho', 'escribir', 'escrito'], ['poner', 'puesto', 'abrir', 'abierto'], ['volver', 'vuelto', 'romper', 'roto']]) },
        { h: 'Experiență', html: table(['Spaniolă', 'Română'], [['¿Has trabajado alguna vez en un hotel?', 'Ai lucrat vreodată la un hotel?'], ['Sí, una vez. / Sí, varias veces.', 'Da, o dată. / Da, de mai multe ori.'], ['No, nunca.', 'Nu, niciodată.'], ['Ya he terminado.', 'Am terminat deja.'], ['Todavía no he empezado.', 'Încă nu am început.']]) },
        { h: 'Saber și profesii', html: `<p><b>Saber</b> + infinitiv înseamnă „a ști să”: <b>Sé conducir.</b> Forma <b>yo sé</b> este neregulată; restul: sabes, sabe, sabemos, sabéis, saben.</p>` + table(['Profesie', 'Română', 'Calitate', 'Română'], [['enfermero/a', 'asistent/ă medical/ă', 'amable', 'amabil/ă'], ['abogado/a', 'avocat/ă', 'trabajador/a', 'harnic/ă'], ['camarero/a', 'chelner/iță', 'organizado/a', 'organizat/ă'], ['profesor/a', 'profesor/oară', 'paciente', 'răbdător/oare']]) + `<p class="note">După <b>ser</b>, profesia vine fără articol: <b>Soy abogada.</b></p>` },
      ],
      reading: {
        title: 'La entrevista',
        text: `Clara busca trabajo como recepcionista en un hotel de Valencia. Hoy tiene una entrevista con el señor Ortega.

—Buenos días, Clara. ¿Ha trabajado alguna vez en un hotel?

—Sí, he trabajado dos veranos en un hotel de Alicante. También he sido camarera.

—¿Qué idiomas habla?

—Hablo español, inglés y un poco de francés. Este año he empezado a estudiar alemán.

—¿Sabe usar el programa de reservas?

—No, todavía no lo he usado, pero aprendo rápido. Soy muy organizada y me gusta tratar con la gente.

—¿Ha vivido en otros países?

—Sí, he vivido un año en Irlanda. Allí he conocido a personas de todo el mundo.

El señor Ortega escribe algo en un papel y sonríe.

—Muy bien, Clara. La llamamos esta semana.

Por la tarde, Clara vuelve a casa contenta. Su teléfono suena a las seis. ¡Ya tiene el trabajo!`,
        glossary: { busca: 'caută', trabajo: 'loc de muncă', entrevista: 'interviu', veranos: 'veri', camarera: 'chelneriță', idiomas: 'limbi', reservas: 'rezervări', todavía: 'încă', aprendo: 'învăț', rápido: 'repede', organizada: 'organizată', tratar: 'a interacționa', gente: 'oameni', países: 'țări', conocido: 'cunoscut', papel: 'hârtie', sonríe: 'zâmbește', llamamos: 'sunăm', contenta: 'mulțumită', suena: 'sună' },
        questions: [['Ce post caută Clara?', 'Recepționeră la un hotel.'], ['Unde a locuit un an?', 'În Irlanda.'], ['Cum se termină povestea?', 'Clara primește postul.']],
      },
      exercises: [
        { title: 'Pretérito perfecto', instr: 'Scrie verbul la pretérito perfecto.', items: [['Yo ___ en un banco. (trabajar)', 'he trabajado'], ['¿Tú ___ paella? (comer)', 'has comido'], ['Ana ___ en Madrid. (vivir)', 'ha vivido'], ['Nosotros ___ mucho hoy. (estudiar)', 'hemos estudiado'], ['¿Vosotros ___ el libro? (leer)', 'habéis leído'], ['Ellos ___ a las ocho. (salir)', 'han salido']] },
        { title: 'Participii neregulate', instr: 'Scrie participiul.', items: [['He ___ un correo. (escribir)', 'escrito'], ['¿Has ___ la película? (ver)', 'visto'], ['No hemos ___ nada. (hacer)', 'hecho'], ['Ha ___ la ventana. (abrir)', 'abierto'], ['Han ___ tarde. (volver)', 'vuelto'], ['¿Qué has ___? (decir)', 'dicho']] },
        { title: 'Ya sau todavía no', instr: 'Scrie ya sau todavía no.', items: [['Son las diez y ___ he desayunado: tengo hambre.', 'todavía no'], ['No quiero café, ___ he tomado uno.', 'ya'], ['___ hemos terminado, necesitamos más tiempo.', 'Todavía no'], ['¡Mira, ___ ha llegado Pablo!', 'ya']] },
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [['Clara ha trabajado en un hotel. ___', 'verdadero'], ['Habla alemán muy bien. ___', 'falso'], ['Ha usado el programa de reservas. ___', 'falso'], ['Ha vivido en Irlanda. ___', 'verdadero'], ['Al final consigue el trabajo. ___', 'verdadero']] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [['Am lucrat într-un hotel. → ___', 'He trabajado en un hotel'], ['Ai fost vreodată în Spania? → ___', ['¿Has estado alguna vez en España?', 'Has estado alguna vez en España']], ['Știu să conduc. → ___', 'Sé conducir'], ['Sunt avocată. → ___', 'Soy abogada']] },
      ],
    },
    {
      id: 'u8', n: 8, title: 'Gente que viaja', theme: 'Programe, ore și deplasări', pages: [88, 97],
      goals: ['Spui ora și programul', 'Ceri și dai informații despre transport', 'Vorbești despre viitor cu ir a', 'Folosești estar + gerunziu'],
      sections: [
        { h: 'Ora și programul', html: table(['Întrebare sau expresie', 'Română'], [['¿Qué hora es?', 'Cât este ceasul?'], ['Es la una. Son las tres.', 'Este ora unu. Este ora trei.'], ['Son las cuatro y cuarto.', 'Este patru și un sfert.'], ['Son las cinco y media.', 'Este cinci și jumătate.'], ['Son las seis menos diez.', 'Este șase fără zece.'], ['¿A qué hora sale el tren?', 'La ce oră pleacă trenul?'], ['Sale a las ocho y llega a las diez.', 'Pleacă la opt și ajunge la zece.'], ['De nueve a dos.', 'De la nouă la două.']]) },
        { h: 'Ir a + infinitiv', html: `<p>Pentru planuri: <b>ir</b> la prezent + <b>a</b> + infinitiv.</p>` + table(['Persoană', 'ir a', 'Exemplu'], [['yo', 'voy a', 'Voy a viajar.'], ['tú', 'vas a', '¿Vas a salir?'], ['él, ella, usted', 'va a', 'Va a llover.'], ['nosotros/as', 'vamos a', 'Vamos a cenar.'], ['vosotros/as', 'vais a', '¿Vais a venir?'], ['ellos, ellas, ustedes', 'van a', 'Van a volver.']]) + `<p>Expresii de timp: <b>esta tarde, mañana, la semana que viene, el mes que viene</b>.</p>` },
        { h: 'Estar + gerunziu', html: `<p>Pentru ce se întâmplă acum: <b>Estoy esperando el tren.</b> Gerunziul: <b>-ar → -ando</b>, <b>-er, -ir → -iendo</b>.</p>` + table(['Infinitiv', 'Gerunziu', 'Observație'], [['hablar', 'hablando', 'regulat'], ['comer', 'comiendo', 'regulat'], ['leer', 'leyendo', 'neregulat'], ['dormir', 'durmiendo', 'o → u'], ['pedir', 'pidiendo', 'e → i']]) },
        { h: 'Prepoziții și gară', html: table(['Spaniolă', 'Română'], [['ir a Madrid', 'a merge la Madrid'], ['salir de Sevilla', 'a pleca din Sevilla'], ['ir en tren', 'a merge cu trenul'], ['un billete de ida y vuelta', 'bilet dus-întors'], ['el andén, la vía', 'peronul, linia'], ['estar a cien kilómetros de', 'a fi la o sută de km de'], ['tardar dos horas', 'a dura două ore']]) },
      ],
      reading: {
        title: 'El último tren',
        text: `Son las nueve menos cuarto y Sofía está corriendo por la estación de Atocha. Su tren a Córdoba sale a las nueve y todavía no ha comprado el billete.

—Un billete para Córdoba, por favor.

—¿De ida o de ida y vuelta?

—De ida y vuelta. Vuelvo el domingo por la tarde.

—Son setenta euros. El tren sale de la vía doce.

Sofía sube al tren a las nueve menos dos minutos. Se sienta junto a la ventana y llama a su amiga Marta.

—¡Lo he conseguido! Estoy en el tren. Llego a las diez y cuarenta.

—Perfecto. Voy a esperarte en la estación. Esta noche vamos a cenar en casa de mis padres, y mañana vamos a visitar la Mezquita.

El tren sale puntual. Un señor está leyendo el periódico y un niño está durmiendo. Sofía mira el campo por la ventana. Va a ser un buen fin de semana.`,
        glossary: { corriendo: 'alergând', estación: 'gară', todavía: 'încă', billete: 'bilet', ida: 'dus', vuelta: 'întors', vía: 'linie', sube: 'urcă', sienta: 'se așază', junto: 'lângă', ventana: 'fereastră', conseguido: 'reușit', esperarte: 'să te aștept', padres: 'părinți', mañana: 'mâine', puntual: 'la timp', periódico: 'ziar', niño: 'copil', durmiendo: 'dormind', campo: 'câmp', fin: 'sfârșit' },
        questions: [['Unde merge Sofía?', 'La Córdoba.'], ['Când se întoarce?', 'Duminică după-amiază.'], ['Ce vor vizita mâine?', 'Mezquita.']],
      },
      exercises: [
        { title: 'Ora', instr: 'Scrie în cifre ora, de exemplu 7:30.', items: [['Son las siete y media. ___', '7:30'], ['Son las diez y cuarto. ___', '10:15'], ['Son las dos menos cuarto. ___', '1:45'], ['Es la una y veinte. ___', '1:20'], ['Son las nueve menos diez. ___', '8:50']] },
        { title: 'Ir a', instr: 'Scrie forma cu ir a.', items: [['Mañana yo ___ a Toledo. (viajar)', 'voy a viajar'], ['¿Tú ___ en casa? (cenar)', 'vas a cenar'], ['Ana ___ un coche. (comprar)', 'va a comprar'], ['Nosotros ___ el tren. (tomar)', 'vamos a tomar'], ['Ellos ___ tarde. (llegar)', 'van a llegar']] },
        { title: 'Estar + gerunziu', instr: 'Scrie forma corectă.', items: [['Yo ___ un libro. (leer)', 'estoy leyendo'], ['El niño ___. (dormir)', 'está durmiendo'], ['¿Qué ___ tú? (hacer)', 'estás haciendo'], ['Nosotros ___ el tren. (esperar)', 'estamos esperando'], ['Ellos ___ en el bar. (comer)', 'están comiendo']] },
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [['El tren sale a las nueve. ___', 'verdadero'], ['Sofía compra un billete de ida. ___', 'falso'], ['El tren sale de la vía doce. ___', 'verdadero'], ['Marta la espera en la estación. ___', 'verdadero'], ['Sofía vuelve el lunes. ___', 'falso']] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [['La ce oră pleacă trenul? → ___', ['¿A qué hora sale el tren?', 'A qué hora sale el tren']], ['Un bilet dus-întors. → ___', 'Un billete de ida y vuelta'], ['Mâine o să călătoresc. → ___', ['Mañana voy a viajar', 'Voy a viajar mañana']], ['Te aștept. → ___', ['Te espero', 'Te estoy esperando']]] },
      ],
    },
    {
      id: 'u9', n: 9, title: 'Gente de ciudad', theme: 'Orașe, opinii și comparații', pages: [98, 107],
      goals: ['Compari locuri și lucruri', 'Îți exprimi și îți argumentezi opinia', 'Folosești superlativul', 'Vorbești despre probleme ale orașului'],
      sections: [
        { h: 'Comparația', html: table(['Construcție', 'Exemplu', 'Română'], [['más + adj. + que', 'Madrid es más grande que Toledo.', 'mai mare decât'], ['menos + adj. + que', 'Es menos caro que Londres.', 'mai puțin scump decât'], ['tan + adj. + como', 'Es tan bonito como Roma.', 'la fel de frumos ca'], ['tanto/a + subst. + como', 'Hay tanto tráfico como aquí.', 'la fel de mult trafic ca'], ['verb + tanto como', 'Llueve tanto como en Galicia.', 'plouă la fel de mult ca']]) + table(['Adjectiv', 'Comparativ neregulat'], [['bueno', 'mejor'], ['malo', 'peor'], ['grande (vârstă)', 'mayor'], ['pequeño (vârstă)', 'menor']]) },
        { h: 'Superlativul', html: `<p><b>el/la/los/las + (substantiv) + más + adjectiv + de</b>: <b>Es la ciudad más bonita de España.</b> Grad absolut: <b>carísimo</b> (foarte scump), <b>tranquilísima</b> (foarte liniștită).</p>` },
        { h: 'Opinii', html: table(['Spaniolă', 'Română'], [['Creo que...', 'Cred că...'], ['Para mí...', 'Pentru mine...'], ['En mi opinión...', 'După părerea mea...'], ['Estoy de acuerdo.', 'Sunt de acord.'], ['No estoy de acuerdo.', 'Nu sunt de acord.'], ['Porque...', 'Pentru că...'], ['Sin embargo...', 'Totuși...']]) },
        { h: 'Cuvinte despre oraș', html: table(['Spaniolă', 'Română', 'Spaniolă', 'Română'], [['el ruido', 'zgomotul', 'la contaminación', 'poluarea'], ['el tráfico', 'traficul', 'el barrio', 'cartierul'], ['el ayuntamiento', 'primăria', 'las afueras', 'periferia'], ['el transporte público', 'transportul public', 'la zona verde', 'zona verde']]) },
      ],
      reading: {
        title: '¿Madrid o un pueblo?',
        text: `Javier y Lola llevan diez años en Madrid, pero ahora quieren cambiar de vida. Lola tiene una oferta de trabajo en un pueblo de Asturias y no saben qué hacer.

—Para mí, Madrid es la ciudad más interesante de España —dice Javier—. Hay teatros, museos y restaurantes de todo el mundo.

—Sí, pero también es la ciudad más cara que conozco. Nuestro piso es más pequeño que la casa de mis padres y cuesta el doble. Además, hay demasiado ruido y mucha contaminación.

—En un pueblo no hay tantas cosas. ¿Qué vamos a hacer por la noche?

—Pasear, cenar con amigos, leer... Creo que allí vamos a vivir mejor. El aire es más limpio y la gente es tan simpática como aquí.

—No estoy de acuerdo. Los inviernos en Asturias son larguísimos y llueve mucho.

—Es verdad, pero aquí pasamos dos horas al día en el metro.

Javier se queda callado. Dos horas al día son muchas horas.

—Bueno —dice por fin—. Vamos a verlo este fin de semana.`,
        glossary: { pueblo: 'sat, orășel', llevan: 'sunt de', oferta: 'ofertă', cara: 'scumpă', conozco: 'cunosc', piso: 'apartament', doble: 'dublu', además: 'în plus', ruido: 'zgomot', tantas: 'atâtea', pasear: 'a se plimba', aire: 'aer', limpio: 'curat', simpática: 'simpatică', larguísimos: 'foarte lungi', llueve: 'plouă', verdad: 'adevăr', queda: 'rămâne', callado: 'tăcut', fin: 'sfârșit' },
        questions: [['Unde are Lola o ofertă de muncă?', 'Într-un sat din Asturias.'], ['Ce îi place lui Javier la Madrid?', 'Teatrele, muzeele și restaurantele.'], ['Ce decid la final?', 'Să meargă să vadă locul în weekend.']],
      },
      exercises: [
        { title: 'Comparativ', instr: 'Completează cu que sau como.', items: [['Mi barrio es más tranquilo ___ el tuyo.', 'que'], ['Sevilla es tan bonita ___ Granada.', 'como'], ['El metro es menos caro ___ el taxi.', 'que'], ['Aquí hay tanto ruido ___ allí.', 'como'], ['Este café es mejor ___ ese.', 'que']] },
        { title: 'Forme neregulate', instr: 'Scrie mejor, peor, mayor sau menor.', items: [['Mi hermana tiene 30 años y yo 25: ella es ___.', 'mayor'], ['Este hotel es muy malo, es ___ que el otro.', 'peor'], ['Mi hermano tiene 12 años y yo 20: él es ___.', 'menor'], ['Este restaurante es muy bueno, es ___ que el otro.', 'mejor']] },
        { title: 'Superlativ', instr: 'Scrie articolul sau prepoziția care lipsește.', items: [['Es ___ ciudad más grande de Chile.', 'la'], ['Son ___ museos más famosos del país.', 'los'], ['Es el barrio más antiguo ___ la ciudad.', 'de'], ['Es ___ río más largo de España.', 'el']] },
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [['Javier y Lola viven en Madrid. ___', 'verdadero'], ['Su piso es más grande que la casa de los padres. ___', 'falso'], ['Lola cree que van a vivir mejor en el pueblo. ___', 'verdadero'], ['Pasan dos horas al día en el metro. ___', 'verdadero'], ['Javier está de acuerdo desde el principio. ___', 'falso']] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [['Cred că orașul este foarte scump. → ___', 'Creo que la ciudad es muy cara'], ['Sunt de acord. → ___', 'Estoy de acuerdo'], ['Este mai mare decât Toledo. → ___', 'Es más grande que Toledo'], ['Este cel mai frumos cartier. → ___', 'Es el barrio más bonito']] },
      ],
    },
    {
      id: 'u10', n: 10, title: 'Gente y fechas', theme: 'Date și evenimente din trecut', pages: [108, 117],
      goals: ['Spui data completă', 'Conjugi pretérito indefinido', 'Povestești o biografie', 'Deosebești perfecto de indefinido'],
      sections: [
        { h: 'Date', html: `<p><b>El 12 de octubre de 1492</b>. Anii se citesc ca numere: <b>mil novecientos ochenta</b>, <b>dos mil veinte</b>. Pentru „la” o dată: <b>Nací el 3 de mayo. En 1999. En marzo.</b></p>` },
        { h: 'Pretérito indefinido regulat', html: `<p>Pentru acțiuni încheiate într-un moment trecut precis: <b>ayer, el año pasado, en 2010, hace dos años</b>.</p>` + table(['', 'trabajar', 'comer', 'vivir'], [['yo', 'trabajé', 'comí', 'viví'], ['tú', 'trabajaste', 'comiste', 'viviste'], ['él, ella, usted', 'trabajó', 'comió', 'vivió'], ['nosotros/as', 'trabajamos', 'comimos', 'vivimos'], ['vosotros/as', 'trabajasteis', 'comisteis', 'vivisteis'], ['ellos, ellas, ustedes', 'trabajaron', 'comieron', 'vivieron']]) },
        { h: 'Verbe neregulate', html: table(['', 'ser / ir', 'tener', 'hacer', 'estar'], [['yo', 'fui', 'tuve', 'hice', 'estuve'], ['tú', 'fuiste', 'tuviste', 'hiciste', 'estuviste'], ['él, ella', 'fue', 'tuvo', 'hizo', 'estuvo'], ['nosotros', 'fuimos', 'tuvimos', 'hicimos', 'estuvimos'], ['vosotros', 'fuisteis', 'tuvisteis', 'hicisteis', 'estuvisteis'], ['ellos', 'fueron', 'tuvieron', 'hicieron', 'estuvieron']]) + `<p>Formele neregulate nu au accent: <b>tuve</b>, <b>hizo</b>, <b>fue</b>. <b>Ser</b> și <b>ir</b> au aceleași forme.</p>` },
        { h: 'Perfecto sau indefinido', html: table(['Timp', 'Când', 'Exemplu'], [['Perfecto', 'perioadă care nu s-a încheiat: hoy, esta semana', 'Hoy he visto a Ana.'], ['Indefinido', 'perioadă încheiată: ayer, en 2015', 'Ayer vi a Ana.']]) + `<p class="note"><b>Hace dos años</b> înseamnă „acum doi ani”. <b>Se casó hace dos años.</b></p>` },
      ],
      reading: {
        title: 'La vida de una pintora',
        text: `Inés Vega nació el 8 de marzo de 1920 en un pequeño pueblo de Galicia. Su padre era marinero y su madre maestra. A los diez años empezó a pintar el mar y los barcos del puerto.

En 1938 se fue a Madrid y estudió en una escuela de arte. Allí conoció a Tomás, un joven poeta. Se casaron en 1945 y tuvieron dos hijas.

En 1951 viajaron a México. Inés vivió allí veinte años y pintó sus cuadros más famosos. En 1962 hizo su primera exposición en París y tuvo mucho éxito.

Volvió a Galicia en 1971, después de la muerte de Tomás. Compró una casa cerca del puerto y abrió una escuela de pintura para niños.

Murió en 2004, a los ochenta y cuatro años. Hoy su casa es un museo. Este verano la he visitado con mi familia: desde la ventana del estudio se ve el mismo mar que pintó de niña.

Esta historia es inventada, pero podría ser verdad.`,
        glossary: { nació: 's-a născut', marinero: 'marinar', maestra: 'învățătoare', empezó: 'a început', pintar: 'a picta', barcos: 'bărci', puerto: 'port', conoció: 'a cunoscut', joven: 'tânăr', casaron: 's-au căsătorit', hijas: 'fiice', cuadros: 'tablouri', exposición: 'expoziție', éxito: 'succes', muerte: 'moarte', abrió: 'a deschis', niños: 'copii', murió: 'a murit', verano: 'vară', mismo: 'același', inventada: 'inventată', podría: 'ar putea' },
        questions: [['Unde s-a născut Inés?', 'Într-un sat din Galicia.'], ['Cât a trăit în Mexic?', 'Douăzeci de ani.'], ['Ce este astăzi casa ei?', 'Un muzeu.']],
      },
      exercises: [
        { title: 'Indefinido regulat', instr: 'Scrie verbul la pretérito indefinido.', items: [['Ayer yo ___ mucho. (trabajar)', 'trabajé'], ['Ana ___ en Roma. (vivir)', 'vivió'], ['¿Tú ___ paella? (comer)', 'comiste'], ['Nosotros ___ en 2010. (casarse)', 'nos casamos'], ['Ellos ___ tarde. (llegar)', 'llegaron'], ['Vosotros ___ el tren. (tomar)', 'tomasteis']] },
        { title: 'Indefinido neregulat', instr: 'Scrie verbul la pretérito indefinido.', items: [['Yo ___ a Cuba en 2018. (ir)', 'fui'], ['Picasso ___ un gran pintor. (ser)', 'fue'], ['Nosotros ___ dos hijos. (tener)', 'tuvimos'], ['¿Qué ___ tú ayer? (hacer)', 'hiciste'], ['Ellos ___ en París. (estar)', 'estuvieron'], ['Ella ___ la cena. (hacer)', 'hizo']] },
        { title: 'Perfecto sau indefinido', instr: 'Scrie forma potrivită a verbului.', items: [['Hoy ___ a Ana. (ver, yo)', 'he visto'], ['Ayer ___ a Ana. (ver, yo)', 'vi'], ['Esta semana ___ mucho. (trabajar, nosotros)', 'hemos trabajado'], ['En 2015 ___ a Madrid. (ir, ellos)', 'fueron'], ['Este año ___ dos libros. (leer, yo)', 'he leído']] },
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [['Inés nació en 1920. ___', 'verdadero'], ['Se casó en México. ___', 'falso'], ['Tuvo mucho éxito en París. ___', 'verdadero'], ['Abrió una escuela para niños. ___', 'verdadero'], ['Murió en Madrid. ___', 'falso']] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [['M-am născut în 1990. → ___', 'Nací en 1990'], ['Ieri am mers la cinema. → ___', 'Ayer fui al cine'], ['Acum doi ani am locuit în Spania. → ___', ['Hace dos años viví en España', 'Viví en España hace dos años']], ['Ce ai făcut ieri? → ___', ['¿Qué hiciste ayer?', 'Qué hiciste ayer']]] },
      ],
    },
    {
      id: 'u11', n: 11, title: 'Gente en casa', theme: 'Locuință și anunțuri imobiliare', pages: [118, 127],
      goals: ['Descrii o locuință', 'Spui unde sunt lucrurile', 'Înțelegi un anunț imobiliar', 'Folosești imperativul afirmativ pentru tú'],
      sections: [
        { h: 'Casa', html: table(['Camere', 'Română', 'Obiecte', 'Română'], [['el salón', 'sufrageria', 'el sofá', 'canapeaua'], ['el dormitorio', 'dormitorul', 'la cama', 'patul'], ['la cocina', 'bucătăria', 'la nevera', 'frigiderul'], ['el baño', 'baia', 'la ducha', 'dușul'], ['el pasillo', 'holul', 'el armario', 'dulapul'], ['la terraza', 'terasa', 'la estantería', 'raftul']]) },
        { h: 'Unde se află', html: table(['Spaniolă', 'Română', 'Exemplu'], [['encima de', 'deasupra, pe', 'El libro está encima de la mesa.'], ['debajo de', 'sub', 'El gato está debajo de la cama.'], ['al lado de', 'lângă', 'La cocina está al lado del salón.'], ['delante de', 'în fața', 'Hay un árbol delante de la casa.'], ['detrás de', 'în spatele', 'El garaje está detrás.'], ['enfrente de', 'vizavi de', 'Vivo enfrente del parque.'], ['entre', 'între', 'Está entre el baño y la cocina.']]) + `<p class="note"><b>de + el = del</b>; <b>a + el = al</b>.</p>` },
        { h: 'Anunțuri', html: `<p>Cuvinte frecvente: <b>piso</b> (apartament), <b>alquiler</b> (chirie), <b>luminoso</b> (luminos), <b>amueblado</b> (mobilat), <b>ascensor</b> (lift), <b>metros cuadrados</b> (metri pătrați), <b>planta</b> (etaj).</p><p>Ordinale: <b>primero, segundo, tercero</b>. Înainte de substantiv masculin: <b>el primer piso, el tercer piso</b>.</p>` },
        { h: 'Imperativ pentru tú', html: `<p>Forma afirmativă este ca persoana a III-a singular de la prezent: <b>Abre la ventana. Come. Limpia.</b></p>` + table(['Infinitiv', 'Imperativ neregulat'], [['poner', 'pon'], ['venir', 'ven'], ['hacer', 'haz'], ['salir', 'sal'], ['tener', 'ten'], ['ir', 've']]) + `<p>Pronumele se lipește de verb: <b>Ciérrala. Ponlo aquí.</b></p>` },
      ],
      reading: {
        title: 'Se alquila piso',
        text: `«Se alquila piso en el centro de Salamanca. 70 metros cuadrados, tercera planta con ascensor. Dos dormitorios, salón muy luminoso, cocina equipada y baño con ducha. Amueblado. 650 euros al mes. Cerca de la universidad.»

Paula lee el anuncio y llama enseguida. Esa tarde visita el piso con la dueña, la señora Ruiz.

—Mira, este es el salón. El sofá es nuevo y la mesa está al lado de la ventana.

—¡Qué luminoso! ¿Y la cocina?

—Está enfrente del baño, al final del pasillo. Tiene nevera, horno y lavadora.

Paula abre un armario y mira debajo de la cama. Todo está limpio.

—¿El alquiler incluye el agua y la luz?

—El agua sí, la luz no. Hay que pagar un mes de fianza.

Paula piensa un momento. El piso es más caro que el anterior, pero está a cinco minutos de su trabajo.

—Me lo quedo.

—Muy bien. Ven mañana a las diez y firmamos el contrato. Trae tu carné de identidad.`,
        glossary: { alquila: 'se închiriază', metros: 'metri', cuadrados: 'pătrați', planta: 'etaj', ascensor: 'lift', dormitorios: 'dormitoare', luminoso: 'luminos', equipada: 'echipată', amueblado: 'mobilat', anuncio: 'anunț', enseguida: 'imediat', dueña: 'proprietară', pasillo: 'hol', nevera: 'frigider', horno: 'cuptor', lavadora: 'mașină de spălat', armario: 'dulap', limpio: 'curat', alquiler: 'chirie', incluye: 'include', fianza: 'garanție', anterior: 'precedent', quedo: 'îl iau', firmamos: 'semnăm', contrato: 'contract', trae: 'adu', carné: 'carte' },
        questions: [['La ce etaj este apartamentul?', 'La etajul trei.'], ['Ce nu include chiria?', 'Curentul.'], ['Ce trebuie să aducă Paula?', 'Cartea de identitate.']],
      },
      exercises: [
        { title: 'Unde este', instr: 'Scrie cuvântul care lipsește.', items: [['El libro está ___ de la mesa. (pe)', 'encima'], ['El gato está ___ de la cama. (sub)', 'debajo'], ['La cocina está al ___ del salón. (lângă)', 'lado'], ['Vivo ___ del parque. (vizavi)', 'enfrente'], ['El baño está ___ la cocina y el salón. (între)', 'entre']] },
        { title: 'Del și al', instr: 'Scrie del sau al.', items: [['El sofá está al lado ___ armario.', 'del'], ['Voy ___ salón.', 'al'], ['Vivo cerca ___ centro.', 'del'], ['El baño está al final ___ pasillo.', 'del'], ['Vamos ___ mercado.', 'al']] },
        { title: 'Imperativ', instr: 'Scrie imperativul pentru tú.', items: [['___ la ventana. (abrir)', 'Abre'], ['___ la mesa. (poner)', 'Pon'], ['___ aquí. (venir)', 'Ven'], ['___ la cama. (hacer)', 'Haz'], ['___ la cocina. (limpiar)', 'Limpia'], ['___ a casa. (ir)', 'Ve']] },
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [['El piso tiene dos dormitorios. ___', 'verdadero'], ['Está en la primera planta. ___', 'falso'], ['El alquiler incluye el agua. ___', 'verdadero'], ['El piso está lejos del trabajo de Paula. ___', 'falso'], ['Paula decide quedarse el piso. ___', 'verdadero']] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [['Baia este lângă bucătărie. → ___', ['El baño está al lado de la cocina']], ['Apartamentul este mobilat. → ___', 'El piso está amueblado'], ['Vino mâine! → ___', ['¡Ven mañana!', 'Ven mañana']], ['Locuiesc la etajul trei. → ___', ['Vivo en el tercer piso', 'Vivo en la tercera planta']]] },
      ],
    },
    {
      id: 'u12', n: 12, title: 'Amintiri', theme: 'Cum era viața când eram mici', pages: [128, 137],
      goals: ['Conjugi imperfectul', 'Descrii trecutul și obiceiurile de atunci', 'Compari trecutul cu prezentul', 'Combini imperfectul cu indefinido'],
      sections: [
        { h: 'Pretérito imperfecto', html: `<p>Descrie cum era ceva și ce se întâmpla în mod obișnuit în trecut.</p>` + table(['', 'jugar', 'comer', 'vivir'], [['yo', 'jugaba', 'comía', 'vivía'], ['tú', 'jugabas', 'comías', 'vivías'], ['él, ella, usted', 'jugaba', 'comía', 'vivía'], ['nosotros/as', 'jugábamos', 'comíamos', 'vivíamos'], ['vosotros/as', 'jugabais', 'comíais', 'vivíais'], ['ellos, ellas, ustedes', 'jugaban', 'comían', 'vivían']]) },
        { h: 'Trei verbe neregulate', html: table(['', 'ser', 'ir', 'ver'], [['yo', 'era', 'iba', 'veía'], ['tú', 'eras', 'ibas', 'veías'], ['él, ella', 'era', 'iba', 'veía'], ['nosotros', 'éramos', 'íbamos', 'veíamos'], ['vosotros', 'erais', 'ibais', 'veíais'], ['ellos', 'eran', 'iban', 'veían']]) + `<p><b>Hay</b> devine <b>había</b>: <b>Había un parque.</b></p>` },
        { h: 'Atunci și acum', html: table(['Spaniolă', 'Română'], [['Cuando era pequeño/a...', 'Când eram mic/ă...'], ['Antes...', 'Înainte...'], ['Ahora...', 'Acum...'], ['De niño/a...', 'În copilărie...'], ['Todos los veranos...', 'În fiecare vară...'], ['Ya no...', 'Nu mai...'], ['Soler + infinitiv', 'a obișnui să: Solía leer.']]) },
        { h: 'Imperfect și indefinido', html: table(['Imperfect', 'Indefinido'], [['fundalul, descrierea', 'evenimentul care se petrece'], ['Hacía sol y paseábamos...', '...cuando empezó a llover.'], ['Era una casa pequeña.', 'Compramos la casa en 1990.'], ['Todos los días iba a pie.', 'Ayer fui en coche.']]) },
      ],
      reading: {
        title: 'Los veranos en casa de mis abuelos',
        text: `Cuando era pequeña, pasaba todos los veranos en casa de mis abuelos, en un pueblo de Extremadura. Era una casa blanca con un patio lleno de flores.

Por la mañana, mi primo Andrés y yo íbamos al río. No teníamos móviles ni ordenador, pero nunca estábamos aburridos. Jugábamos en la calle hasta la noche con los otros niños del pueblo.

Mi abuela hacía un pan delicioso y mi abuelo me contaba historias de cuando era joven. Había muy pocos coches y todo el mundo se conocía.

Un día de agosto, cuando tenía nueve años, pasó algo que no voy a olvidar. Estábamos en el río cuando empezó una tormenta enorme. Corrimos a casa bajo la lluvia y mi abuela nos preparó chocolate caliente.

Ahora vivo en Barcelona y ya no voy tanto al pueblo. La casa sigue allí, pero ya no hay tantos niños en la calle. A veces, cuando huelo a pan recién hecho, vuelvo a tener nueve años.`,
        glossary: { pequeña: 'mică', pasaba: 'petreceam', abuelos: 'bunici', patio: 'curte', lleno: 'plin', flores: 'flori', primo: 'văr', río: 'râu', aburridos: 'plictisiți', calle: 'stradă', contaba: 'povestea', historias: 'povești', conocía: 'se cunoștea', pasó: 's-a întâmplat', olvidar: 'a uita', tormenta: 'furtună', corrimos: 'am alergat', lluvia: 'ploaie', caliente: 'cald', sigue: 'continuă să fie', huelo: 'miros', recién: 'proaspăt' },
        questions: [['Unde își petrecea verile?', 'La bunici, într-un sat din Extremadura.'], ['Ce s-a întâmplat la râu?', 'A început o furtună mare.'], ['Unde locuiește acum?', 'În Barcelona.']],
      },
      exercises: [
        { title: 'Imperfect regulat', instr: 'Scrie verbul la imperfect.', items: [['Yo ___ en la calle. (jugar)', 'jugaba'], ['Tú ___ en Madrid. (vivir)', 'vivías'], ['Nosotros ___ en casa. (comer)', 'comíamos'], ['Ellos ___ mucho. (trabajar)', 'trabajaban'], ['Mi abuela ___ pan. (hacer)', 'hacía'], ['¿Vosotros ___ inglés? (hablar)', 'hablabais']] },
        { title: 'Ser, ir, ver', instr: 'Scrie verbul la imperfect.', items: [['Yo ___ muy alta. (ser)', 'era'], ['Nosotros ___ al río. (ir)', 'íbamos'], ['Mi padre ___ la tele. (ver)', 'veía'], ['Las casas ___ blancas. (ser)', 'eran'], ['¿Tú ___ a la escuela a pie? (ir)', 'ibas']] },
        { title: 'Imperfect sau indefinido', instr: 'Scrie forma potrivită a verbului.', items: [['Cuando ___ niña, vivía en Cluj. (ser, yo)', 'era'], ['Ayer ___ al cine. (ir, yo)', 'fui'], ['Todos los días ___ al parque. (ir, nosotros)', 'íbamos'], ['Paseábamos cuando ___ a llover. (empezar)', 'empezó'], ['En 2010 ___ un coche. (comprar, yo)', 'compré']] },
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [['Pasaba los veranos en Extremadura. ___', 'verdadero'], ['Tenían móviles. ___', 'falso'], ['El abuelo hacía el pan. ___', 'falso'], ['La tormenta fue en agosto. ___', 'verdadero'], ['Ahora vive en Barcelona. ___', 'verdadero']] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [['Când eram mică, locuiam într-un sat. → ___', 'Cuando era pequeña, vivía en un pueblo'], ['Nu mai merg acolo. → ___', 'Ya no voy allí'], ['Era o casă albă. → ___', 'Era una casa blanca'], ['Nu aveam telefoane. → ___', 'No teníamos móviles']] },
      ],
    },
  ];

  units.forEach((u) => {
    window.SPANISH_UNITS.push(u);
    window.STORIES.push({ id: 'r' + u.n, group: 'lesson', level: 'Unitatea ' + u.n, unit: u.id, ...u.reading });
  });
  window.SPANISH_NEXT = [];
  window.SPANISH_WEEKS.push(
    { n: 5, title: 'Săptămâna 5', units: ['u5'] },
    { n: 6, title: 'Săptămâna 6', units: ['u6'] },
    { n: 7, title: 'Săptămâna 7', units: ['u7'] },
    { n: 8, title: 'Săptămâna 8', units: ['u8'] },
    { n: 9, title: 'Săptămâna 9', units: ['u9'] },
    { n: 10, title: 'Săptămâna 10', units: ['u10'] },
    { n: 11, title: 'Săptămâna 11', units: ['u11'] },
    { n: 12, title: 'Săptămâna 12', units: ['u12'] },
  );
})();
