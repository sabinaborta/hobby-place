// Spaniola: lecturi originale pentru fiecare unitate si exercitii suplimentare.
(function () {
  const VF = 'Scrie verdadero sau falso.';
  const extra = {
    u0: {
      reading: {
        title: 'En la clase de español',
        text: `Hoy es el primer día de clase. La profesora se llama Lucía y es de Salamanca. Entra en la clase y dice:

—¡Buenos días! ¿Cómo estáis? Yo me llamo Lucía. ¿Y tú? ¿Cómo te llamas?

—Me llamo Hans. Soy de Berlín.

—Hola, Hans. ¿Y tú, de dónde eres?

—Yo soy Ioana. Soy de Rumanía, de Cluj.

—¡Muy bien! Y tú, ¿cómo te llamas?

—¿Perdón? ¿Cómo?

—¿Cómo te llamas?

—Ah, me llamo Yuki. Soy de Japón.

La profesora escribe una palabra en la pizarra: «amigo».

—¿Qué significa «amigo»?

—En rumano es «prieten» —dice Ioana.

—Muy bien, Ioana. ¿Y cómo se dice «libro» en alemán, Hans?

—Se dice «Buch».

Al final de la clase, todos dicen: «¡Adiós! ¡Hasta mañana!».`,
        glossary: { hoy: 'azi', primer: 'primul', clase: 'oră, clasă', profesora: 'profesoară', entra: 'intră', dice: 'spune', pizarra: 'tablă', palabra: 'cuvânt', escribe: 'scrie', final: 'sfârșit', todos: 'toți', alemán: 'germană', rumano: 'română' },
        questions: [['De unde este Lucía?', 'Din Salamanca.'], ['Cum se spune „prieten” în spaniolă?', 'Amigo.'], ['Ce spun toți la sfârșit?', '¡Adiós! ¡Hasta mañana!']],
      },
      exercises: [
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [
          ['Lucía es de Salamanca. ___', 'verdadero'], ['Hans es de Rumanía. ___', 'falso'], ['Ioana es de Cluj. ___', 'verdadero'], ['Yuki es de Japón. ___', 'verdadero'], ['«Amigo» significa «carte». ___', 'falso'],
        ] },
        { title: 'Lectură: completează', instr: 'Completează cu un cuvânt din text.', items: [
          ['La profesora ___ llama Lucía.', 'se'], ['Yo ___ Ioana.', 'soy'], ['¿Cómo ___ dice «libro» en alemán?', 'se'], ['¿Qué ___ «amigo»?', 'significa'], ['¡Hasta ___!', 'mañana'],
        ] },
        { title: 'Dialog', instr: 'Scrie replica potrivită.', items: [
          ['—¡Buenos días! —___ días.', 'Buenos'], ['—¿Cómo te llamas? —___ llamo Ana.', 'Me'], ['—¿De dónde eres? —Soy ___ Italia.', 'de'], ['Nu ai auzit: ¿___? ¿Cómo?', 'Perdón'], ['Pleci și revii curând: Hasta ___.', 'luego'],
        ] },
        { title: 'Traducere', instr: 'Tradu în spaniolă.', items: [
          ['Bună dimineața! → ___', 'Buenos días'], ['Cum te cheamă? → ___', ['¿Cómo te llamas?', 'Cómo te llamas']], ['Sunt din România. → ___', 'Soy de Rumanía'], ['Ce înseamnă? → ___', ['¿Qué significa?', 'Qué significa']], ['Pe mâine! → ___', 'Hasta mañana'],
        ] },
        { title: 'Un sau una, mai departe', instr: 'Scrie un sau una.', items: [
          ['___ profesora', 'una'], ['___ palabra', 'una'], ['___ estudiante (băiat)', 'un'], ['___ clase', 'una'], ['___ país', 'un'], ['___ persona', 'una'],
        ] },
      ],
    },
    u1: {
      reading: {
        title: 'Una escuela en Salamanca',
        text: `Esta es una escuela de idiomas en Salamanca. Es pequeña, pero muy bonita. En la clase hay doce estudiantes. Son de países diferentes.

Paolo es de Italia. Tiene el teléfono en la mano y busca una palabra en el diccionario. Sophie y Claire son francesas. Son de Lyon. Ioana es de Rumanía.

En la pared hay un mapa de América Latina. La profesora señala un país con el dedo.

—¿Qué es esto?

—Es Perú —dice Paolo.

—Muy bien. ¿Y cuál es la capital?

—¡Lima! —dicen Sophie y Claire.

—Y este país, ¿qué es?

—Es Colombia. La capital es Bogotá —dice Ioana.

Después, la profesora dicta números de teléfono. Los estudiantes escuchan y escriben: seis, cero, nueve, tres, doce, quince, veinte.

—¿Cómo se escribe «Guadalajara»? —pregunta Paolo.

—Ge, u, a, de, a, ele, a, jota, a, erre, a —dice la profesora.

Todos se ríen. Es una palabra muy larga.`,
        glossary: { escuela: 'școală', idiomas: 'limbi străine', pequeña: 'mică', bonita: 'frumoasă', hay: 'există, sunt', estudiantes: 'studenți', países: 'țări', diferentes: 'diferite', mano: 'mână', busca: 'caută', palabra: 'cuvânt', pared: 'perete', mapa: 'hartă', señala: 'arată', dedo: 'deget', dicta: 'dictează', escuchan: 'ascultă', escriben: 'scriu', larga: 'lungă', 'se ríen': 'râd' },
        questions: [['Câți studenți sunt în clasă?', 'Doisprezece.'], ['Care este capitala Columbiei?', 'Bogotá.'], ['De ce râd toți?', 'Pentru că Guadalajara este un cuvânt foarte lung.']],
      },
      exercises: [
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [
          ['La escuela está en Salamanca. ___', 'verdadero'], ['En la clase hay veinte estudiantes. ___', 'falso'], ['Sophie y Claire son italianas. ___', 'falso'], ['La capital de Perú es Lima. ___', 'verdadero'], ['La capital de Colombia es Quito. ___', 'falso'],
        ] },
        { title: 'Ser, în propoziții noi', instr: 'Completează cu forma lui ser.', items: [
          ['Sophie y Claire ___ francesas.', 'son'], ['Paolo ___ de Italia.', 'es'], ['La escuela ___ pequeña.', 'es'], ['Tú y yo ___ estudiantes.', 'somos'], ['¿Vosotras ___ de Lyon?', 'sois'], ['¿Tú ___ de Rumanía?', 'eres'], ['Yo ___ profesora.', 'soy'], ['Ustedes ___ de Perú.', 'son'],
        ] },
        { title: 'Masculin sau feminin', instr: 'Scrie m pentru masculin sau f pentru feminin.', items: [
          ['teléfono: ___', 'm'], ['ciudad: ___', 'f'], ['mapa: ___', 'm'], ['foto: ___', 'f'], ['canción: ___', 'f'], ['país: ___', 'm'], ['lista: ___', 'f'], ['día: ___', 'm'],
        ] },
        { title: 'Singular și plural', instr: 'Scrie forma de singular, cu articol.', items: [
          ['los teléfonos → ___', 'el teléfono'], ['las ciudades → ___', 'la ciudad'], ['los mapas → ___', 'el mapa'], ['las canciones → ___', 'la canción'], ['los países → ___', 'el país'], ['las fotos → ___', 'la foto'],
        ] },
        { title: 'Scrie numărul de telefon', instr: 'Scrie cifrele în litere, separate prin spațiu.', items: [
          ['6 0 9 → ___', 'seis cero nueve'], ['3 5 7 → ___', 'tres cinco siete'], ['1 8 2 → ___', 'uno ocho dos'], ['4 0 4 → ___', 'cuatro cero cuatro'],
        ] },
        { title: 'Socotește în spaniolă', instr: 'Scrie rezultatul în litere.', items: [
          ['dos + tres = ___', 'cinco'], ['diez + cinco = ___', 'quince'], ['veinte − cuatro = ___', 'dieciséis'], ['once + dos = ___', 'trece'], ['nueve + nueve = ___', 'dieciocho'], ['siete + siete = ___', 'catorce'],
        ] },
        { title: 'Sunete și litere', instr: 'Completează cuvântul cu litera care lipsește.', items: [
          ['___ola (salut): h sau j? ___', 'h'], ['Espa___a: n sau ñ? ___', 'ñ'], ['___uan: j sau h? ___', 'j'], ['___ueso (brânză): q sau c? ___', 'q'], ['ciudad se scrie cu: c sau z? ___', 'c'],
        ] },
      ],
    },
    u2: {
      reading: {
        title: 'Los vecinos de la calle Mayor',
        text: `En la calle Mayor viven personas muy diferentes. En el número tres vive Carmen Ruiz. Tiene sesenta y cuatro años y es médica. Está casada con Jorge, que es profesor de música. Tienen dos hijos, pero viven en Barcelona.

En el segundo piso vive Lucas. Tiene veintiocho años y es camarero. Es muy simpático y bastante hablador. Trabaja por la noche y por la mañana duerme. Le gusta jugar al fútbol y toca la guitarra, un poco mal.

Al lado vive la familia Ortega. La madre, Ana, es ingeniera. El padre, Miguel, trabaja en casa. Sus hijas se llaman Inés y Paula. Inés tiene doce años y Paula, nueve. Inés es seria y muy inteligente. Paula no es nada tímida y habla con todos los vecinos.

Todos los sábados, los vecinos comen juntos en el patio. Carmen trae una ensalada, Lucas prepara café, y las niñas escuchan la guitarra y se ríen.`,
        glossary: { calle: 'stradă', viven: 'locuiesc', casada: 'căsătorită', hijos: 'copii', segundo: 'al doilea', piso: 'etaj; apartament', camarero: 'ospătar', hablador: 'vorbăreț', noche: 'noapte', duerme: 'doarme', jugar: 'a juca', toca: 'cântă la', 'al lado': 'alături', hijas: 'fiice', seria: 'serioasă', tímida: 'timidă', sábados: 'sâmbete', juntos: 'împreună', patio: 'curte', trae: 'aduce', ensalada: 'salată', niñas: 'fetițe' },
        questions: [['Ce profesie are Carmen?', 'Este medic.'], ['Când doarme Lucas?', 'Dimineața, pentru că lucrează noaptea.'], ['Ce fac vecinii sâmbăta?', 'Mănâncă împreună în curte.']],
      },
      exercises: [
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [
          ['Carmen tiene sesenta y cuatro años. ___', 'verdadero'], ['Jorge es médico. ___', 'falso'], ['Lucas trabaja por la mañana. ___', 'falso'], ['Inés tiene doce años. ___', 'verdadero'], ['Paula es muy tímida. ___', 'falso'], ['Los vecinos comen juntos los sábados. ___', 'verdadero'],
        ] },
        { title: 'Lectură: răspunde', instr: 'Completează cu informația din text.', items: [
          ['Carmen está casada con ___.', 'Jorge'], ['Lucas toca la ___.', 'guitarra'], ['La madre de Inés es ___.', 'ingeniera'], ['Las hijas de Ana se llaman Inés y ___.', 'Paula'], ['Los hijos de Carmen viven en ___.', 'Barcelona'],
        ] },
        { title: 'Conjugă: -ar', instr: 'Scrie verbul la forma corectă.', items: [
          ['Yo ___ en un hospital. (trabajar)', 'trabajo'], ['Tú ___ la guitarra. (tocar)', 'tocas'], ['Él ___ mucho. (hablar)', 'habla'], ['Nosotras ___ música. (escuchar)', 'escuchamos'], ['Vosotros ___ café. (preparar)', 'preparáis'], ['Ellos ___ mucho. (estudiar)', 'estudian'],
        ] },
        { title: 'Conjugă: -er și -ir', instr: 'Scrie verbul la forma corectă.', items: [
          ['Yo ___ un libro. (leer)', 'leo'], ['Tú ___ una carta. (escribir)', 'escribes'], ['Ana ___ pan. (comer)', 'come'], ['Nosotros ___ en Cluj. (vivir)', 'vivimos'], ['Vosotras ___ agua. (beber)', 'bebéis'], ['Ellas ___ cartas. (escribir)', 'escriben'],
        ] },
        { title: 'Scrie vârsta', instr: 'Scrie propoziția cu numărul în litere.', items: [
          ['Ana, 30: Ana tiene ___ años.', 'treinta'], ['Yo, 42: Tengo ___ años.', 'cuarenta y dos'], ['Pablo, 26: Pablo tiene ___ años.', 'veintiséis'], ['Mi abuela, 81: Mi abuela tiene ___ años.', 'ochenta y uno'], ['Tú, 57: Tienes ___ años.', 'cincuenta y siete'],
        ] },
        { title: 'Muy, bastante, un poco, nada', instr: 'Scrie varianta potrivită.', items: [
          ['Foarte simpatic: Es ___ simpático.', 'muy'], ['Destul de serios: Es ___ serio.', 'bastante'], ['Puțin timid: Es ___ tímido.', 'un poco'], ['Deloc vorbăreț: No es ___ hablador.', 'nada'],
        ] },
        { title: 'Familia', instr: 'Scrie cuvântul potrivit.', items: [
          ['El padre de mi padre es mi ___.', 'abuelo'], ['La hija de mi madre es mi ___.', 'hermana'], ['El hermano de mi madre es mi ___.', 'tío'], ['La madre de mi madre es mi ___.', 'abuela'], ['Mi padre y mi madre son mis ___.', 'padres'],
        ] },
        { title: 'Scrie despre tine', instr: 'Tradu în spaniolă.', items: [
          ['Am un frate și o soră. → ___', ['Tengo un hermano y una hermana']], ['Fratele meu este foarte simpatic. → ___', ['Mi hermano es muy simpático']], ['Sora ta locuiește în Madrid. → ___', ['Tu hermana vive en Madrid']], ['Ei vorbesc spaniolă. → ___', ['Ellos hablan español', 'Hablan español']],
        ] },
      ],
    },
    u3: {
      reading: {
        title: 'Una semana en Asturias',
        text: `Hola, soy Blanca. Este verano quiero ir de vacaciones, pero no me gustan los hoteles grandes ni las playas con mucha gente. Prefiero los pueblos pequeños y las montañas.

Mi amiga Rosa dice que Asturias es perfecto. Allí hay montañas muy verdes y también mar. En el pueblo de Llanes hay un puerto, varios restaurantes y una playa muy bonita. No hay discotecas ni centros comerciales, y a mí eso no me importa.

Queremos ir en agosto, porque Rosa tiene vacaciones. A ella le gusta viajar en coche, pero yo prefiero el tren. Es más tranquilo y puedo leer. Al final vamos en tren hasta Oviedo y allí alquilamos un coche.

¿Dónde dormimos? Hay una casa rural a dos kilómetros de la playa. Es barata y tiene un jardín. A Rosa le interesa la cocina asturiana y yo quiero caminar por los Picos de Europa.

¿Y tú? ¿Adónde quieres ir este verano? ¿Con quién?`,
        glossary: { verano: 'vară', vacaciones: 'vacanță', playas: 'plaje', gente: 'oameni', montañas: 'munți', verdes: 'verzi', mar: 'mare', puerto: 'port', varios: 'câteva', 'no me importa': 'nu mă deranjează', coche: 'mașină', tranquilo: 'liniștit', leer: 'a citi', alquilamos: 'închiriem', dormimos: 'dormim', barata: 'ieftină', jardín: 'grădină', cocina: 'bucătărie', caminar: 'a merge pe jos' },
        questions: [['Ce îi place Blancăi?', 'Satele mici și munții.'], ['Când pleacă?', 'În august.'], ['Unde dorm?', 'Într-o casă rurală, la doi kilometri de plajă.']],
      },
      exercises: [
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [
          ['A Blanca le gustan los hoteles grandes. ___', 'falso'], ['En Llanes hay una playa. ___', 'verdadero'], ['En Llanes hay discotecas. ___', 'falso'], ['Rosa tiene vacaciones en agosto. ___', 'verdadero'], ['Blanca prefiere el coche. ___', 'falso'], ['La casa rural tiene un jardín. ___', 'verdadero'],
        ] },
        { title: 'Lectură: cuvinte de întrebare', instr: 'Scrie qué, dónde, cuándo, cómo sau con quién.', items: [
          ['¿___ van? En agosto.', 'Cuándo'], ['¿___ va Blanca? Con Rosa.', 'Con quién'], ['¿___ van a Oviedo? En tren.', 'Cómo'], ['¿___ duermen? En una casa rural.', 'Dónde'], ['¿___ le interesa a Rosa? La cocina.', 'Qué'],
        ] },
        { title: 'Hay, está, están, mai departe', instr: 'Scrie hay, está sau están.', items: [
          ['En Llanes ___ un puerto.', 'hay'], ['El puerto ___ cerca.', 'está'], ['Los Picos de Europa ___ en Asturias.', 'están'], ['En mi calle no ___ restaurantes.', 'hay'], ['¿Dónde ___ tus amigos?', 'están'], ['Aquí ___ muchos hoteles.', 'hay'],
        ] },
        { title: 'Gusta, gustan, interesa, interesan', instr: 'Alege forma corectă.', items: [
          ['A Rosa le ___ la cocina. (interesar)', 'interesa'], ['A mí me ___ los pueblos. (gustar)', 'gustan'], ['¿Te ___ caminar? (gustar)', 'gusta'], ['A ellos les ___ los museos. (interesar)', 'interesan'], ['No nos ___ las discotecas. (gustar)', 'gustan'], ['Os ___ el mar. (gustar)', 'gusta'],
        ] },
        { title: 'Luni și anotimpuri', instr: 'Completează.', items: [
          ['Después de enero viene ___.', 'febrero'], ['Después de julio viene ___.', 'agosto'], ['El último mes del año es ___.', 'diciembre'], ['El primer mes del año es ___.', 'enero'], ['Después del verano viene el ___.', 'otoño'], ['Después del invierno viene la ___.', 'primavera'],
        ] },
        { title: 'En sau a', instr: 'Scrie en sau a.', items: [
          ['Voy ___ tren.', 'en'], ['Voy ___ pie.', 'a'], ['Viajamos ___ agosto.', 'en'], ['Queremos ir ___ Asturias.', 'a'], ['Vivo ___ Cluj.', 'en'],
        ] },
        { title: 'Scrie despre vacanța ta', instr: 'Tradu în spaniolă.', items: [
          ['Vreau să merg la mare. → ___', ['Quiero ir al mar']], ['Prefer munții. → ___', ['Prefiero las montañas']], ['Nu îmi plac hotelurile mari. → ___', ['No me gustan los hoteles grandes']], ['Vrem să călătorim cu mașina. → ___', ['Queremos viajar en coche']],
        ] },
      ],
    },
    u4: {
      reading: {
        title: 'La fiesta de Marcos',
        text: `El sábado es el cumpleaños de Marcos y sus amigos quieren organizar una fiesta sorpresa. Lola hace una lista en el móvil.

—Necesitamos bebidas, un pastel y un regalo. ¿Quién puede comprar las bebidas?

—Yo puedo —dice Teo—. Las compro en el supermercado, que está al lado de mi casa.

—¿Y el pastel?

—Lo hace mi madre —dice Sara—. Hace unos pasteles buenísimos.

—Perfecto. Ahora tenemos que buscar el regalo.

Lola y Sara van a una tienda de ropa del centro. Ven un jersey azul y una camisa blanca.

—Perdone, ¿cuánto cuesta este jersey?

—Cuesta cuarenta y cinco euros.

—¿Y la camisa?

—Veintinueve con noventa.

—El jersey es muy bonito, pero es caro. ¿Se lo compramos a Marcos entre todos?

—Sí, somos seis. Tenemos que pagar siete euros y medio cada uno.

—¿Se puede pagar con tarjeta?

—Claro que sí.

El sábado, Marcos abre la puerta y todos gritan: «¡Sorpresa!». Marcos se pone el jersey azul. Le queda muy bien.`,
        glossary: { cumpleaños: 'zi de naștere', fiesta: 'petrecere', sorpresa: 'surpriză', necesitamos: 'avem nevoie', bebidas: 'băuturi', pastel: 'tort', regalo: 'cadou', puede: 'poate', supermercado: 'supermarket', buscar: 'a căuta', tienda: 'magazin', ropa: 'haine', caro: 'scump', pagar: 'a plăti', tarjeta: 'card', gritan: 'strigă', 'se pone': 'își pune', 'le queda': 'îi vine', 'cada uno': 'fiecare' },
        questions: [['Cine aduce tortul?', 'Mama Sarei îl face.'], ['Cât costă puloverul?', 'Patruzeci și cinci de euro.'], ['Cât plătește fiecare?', 'Șapte euro și jumătate.']],
      },
      exercises: [
        { title: 'Lectură: adevărat sau fals', instr: VF, items: [
          ['La fiesta es el sábado. ___', 'verdadero'], ['Teo compra el pastel. ___', 'falso'], ['El jersey cuesta cuarenta y cinco euros. ___', 'verdadero'], ['La camisa es negra. ___', 'falso'], ['Se puede pagar con tarjeta. ___', 'verdadero'],
        ] },
        { title: 'Pronumele din lectură', instr: 'Scrie lo, la, los, las.', items: [
          ['¿Las bebidas? ___ compra Teo.', 'Las'], ['¿El pastel? ___ hace la madre de Sara.', 'Lo'], ['¿La camisa? No ___ compran.', 'la'], ['¿Los regalos? ___ buscamos hoy.', 'Los'], ['¿El jersey? Marcos ___ lleva.', 'lo'], ['¿Las flores? ___ quiero rojas.', 'Las'],
        ] },
        { title: 'Tener que sau poder', instr: 'Conjugă verbul din paranteză.', items: [
          ['Yo ___ comprar las bebidas. (poder)', 'puedo'], ['¿Tú ___ venir el sábado? (poder)', 'puedes'], ['Nosotros ___ pagar. (poder)', 'podemos'], ['Ellos no ___ venir. (poder)', 'pueden'], ['Lola ___ hacer la lista. (tener que)', 'tiene que'], ['Vosotros ___ buscar el regalo. (tener que)', 'tenéis que'],
        ] },
        { title: 'Prețuri în litere', instr: 'Scrie numărul în litere.', items: [
          ['45 € = ___ euros', 'cuarenta y cinco'], ['120 € = ___ euros', 'ciento veinte'], ['350 € = ___ euros', 'trescientos cincuenta'], ['500 € = ___ euros', 'quinientos'], ['1 000 € = ___ euros', 'mil'], ['700 personas = ___ personas', 'setecientas'],
        ] },
        { title: 'Haine și culori', instr: 'Scrie forma corectă.', items: [
          ['Dos camisas ___ (blanco)', 'blancas'], ['Un jersey ___ (azul)', 'azul'], ['Unos zapatos ___ (rojo)', 'rojos'], ['Una falda ___ (negro)', 'negra'], ['Dos abrigos ___ (verde)', 'verdes'],
        ] },
        { title: 'Un, uno, una', instr: 'Completează.', items: [
          ['¿Tienes un móvil? Sí, tengo ___.', 'uno'], ['Necesito ___ regalo.', 'un'], ['¿Hay una tienda? Sí, hay ___.', 'una'], ['Quiero ___ camisa.', 'una'], ['¿Tienes un euro? No, no tengo ___.', 'uno'],
        ] },
        { title: 'La magazin', instr: 'Tradu în spaniolă.', items: [
          ['Cât costă această cămașă? → ___', ['¿Cuánto cuesta esta camisa?', 'Cuánto cuesta esta camisa']], ['Este foarte scump. → ___', ['Es muy caro']], ['Pot să plătesc cu cardul? → ___', ['¿Puedo pagar con tarjeta?', 'Puedo pagar con tarjeta']], ['Îi cumpăr un cadou. → ___', ['Le compro un regalo']],
        ] },
      ],
    },
  };

  window.SPANISH_UNITS.forEach((u) => {
    const x = extra[u.id];
    if (!x) return;
    u.reading = x.reading;
    u.exercises = u.exercises.concat(x.exercises);
    window.STORIES.push({ id: 'r' + u.n, group: 'lesson', level: 'Unitatea ' + u.n, unit: u.id, ...x.reading });
  });
})();
