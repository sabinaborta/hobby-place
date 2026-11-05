// Engleza: unitatile 5-9. Mancare, timp liber, prezent continuu, orasul, trecutul cu to be si verbe regulate.
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const TF = 'Scrie true sau false.';

  window.ENGLISH_UNITS.push(
    {
      id: 'en5', n: 5, title: 'Food and shopping', theme: 'Mâncare, cantități, cumpărături și restaurant',
      goals: ['Numești alimente', 'Deosebești ce se numără de ce nu se numără', 'Folosești how much, how many, a lot of', 'Comanzi cu would like', 'Întrebi prețul'],
      sections: [
        { h: 'Alimente', html: table(['Engleză', 'Română', 'Engleză', 'Română'], [
          ['bread', 'pâine', 'meat', 'carne'],
          ['fish', 'pește', 'chicken', 'pui'],
          ['egg', 'ou', 'cheese', 'brânză'],
          ['milk', 'lapte', 'butter', 'unt'],
          ['rice', 'orez', 'potato', 'cartof'],
          ['tomato', 'roșie', 'onion', 'ceapă'],
          ['apple', 'măr', 'sugar', 'zahăr'],
          ['water', 'apă', 'juice', 'suc'],
        ]) },
        { h: 'Ce se numără și ce nu', html: `<p>Unele substantive se pot număra: <b>an egg, two eggs</b>. Altele nu au plural și nu primesc a/an: <b>milk, bread, water, rice, cheese, money</b>.</p>` + table(['', 'Se numără', 'Nu se numără'], [
          ['Afirmativ', 'some eggs', 'some milk'],
          ['Negativ', "I haven't got any eggs.", "I haven't got any milk."],
          ['Cât', 'How many eggs?', 'How much milk?'],
          ['Mult', 'a lot of eggs', 'a lot of milk'],
          ['Puțin', 'a few eggs', 'a little milk'],
        ]) + `<p class="note">Când oferi sau ceri ceva, întrebarea merge cu <b>some</b>: <b>Would you like some tea? Can I have some water?</b></p>` },
        { h: 'Cantități', html: table(['Engleză', 'Română'], [
          ['a bottle of water', 'o sticlă de apă'], ['a cup of coffee', 'o ceașcă de cafea'], ['a glass of milk', 'un pahar de lapte'], ['a kilo of potatoes', 'un kilogram de cartofi'], ['a piece of cheese', 'o bucată de brânză'], ['a slice of bread', 'o felie de pâine'],
        ]) },
        { h: 'La restaurant', html: table(['Engleză', 'Română'], [
          ['A table for two, please.', 'O masă pentru doi, vă rog.'],
          ['Are you ready to order?', 'Sunteți gata să comandați?'],
          ["I'd like the soup, please.", 'Aș dori supa, vă rog.'],
          ['Would you like anything to drink?', 'Doriți ceva de băut?'],
          ['Can I have a glass of water?', 'Pot primi un pahar cu apă?'],
          ['Can we have the bill, please?', 'Ne aduceți nota, vă rog?'],
        ]) + `<p><b>I'd like</b> = I would like, adică „aș dori”. Este mai politicos decât <b>I want</b>.</p>` },
        { h: 'La magazin', html: table(['Engleză', 'Română'], [
          ['How much is it?', 'Cât costă? (un lucru)'],
          ['How much are they?', 'Cât costă? (mai multe)'],
          ["It's three pounds fifty.", 'Costă trei lire și cincizeci.'],
          ["I'm just looking, thank you.", 'Doar mă uit, mulțumesc.'],
          ["I'll take it.", 'Îl iau.'],
          ['Can I pay by card?', 'Pot plăti cu cardul?'],
        ]) },
      ],
      reading: {
        title: 'Dinner for four',
        text: `It is Friday and Ioana has got friends for dinner. She wants to make a chicken soup and a big salad. She goes to the kitchen and looks in the fridge. There isn't any chicken and there are only a few tomatoes. There is a little cheese, but there isn't any bread.

She goes to the market near her house.

"Good morning. I'd like a kilo of tomatoes and two onions, please."

"Here you are. Anything else?"

"How much is the chicken?"

"It's twenty lei a kilo."

"I'd like one kilo, please. And a piece of that cheese."

At the bakery she buys some bread. She hasn't got much money now, but she has got a lot of food. In the evening her friends arrive with a bottle of wine. The soup is very good, and nobody wants to go home.`,
        glossary: { dinner: 'cină', wants: 'vrea', soup: 'supă', salad: 'salată', looks: 'se uită', fridge: 'frigider', only: 'doar', few: 'câteva', tomatoes: 'roșii', little: 'puțin', cheese: 'brânză', market: 'piață', onions: 'cepe', else: 'altceva', piece: 'bucată', buys: 'cumpără', money: 'bani', food: 'mâncare', arrive: 'sosesc', bottle: 'sticlă', wine: 'vin', nobody: 'nimeni', chicken: 'pui' },
        questions: [['Ce vrea să gătească Ioana?', 'O supă de pui și o salată mare.'], ['Cât costă puiul?', 'Douăzeci de lei kilogramul.'], ['Ce aduc prietenii?', 'O sticlă de vin.']],
      },
      exercises: [
        { title: 'Much sau many', instr: 'Scrie much sau many.', items: [
          ['How ___ eggs have we got?', 'many'],
          ['How ___ water do you drink?', 'much'],
          ['How ___ sugar do you want?', 'much'],
          ['How ___ tomatoes do you need?', 'many'],
          ['How ___ is this cheese?', 'much'],
          ['How ___ people are there?', 'many'],
        ] },
        { title: 'A, an, some, any', instr: 'Scrie a, an, some sau any.', items: [
          ["I'd like ___ apple.", 'an'],
          ['There is ___ milk in the fridge.', 'some'],
          ["We haven't got ___ bread.", 'any'],
          ['Can I have ___ glass of water?', 'a'],
          ['Are there ___ onions?', 'any'],
          ['I want ___ eggs for breakfast.', 'some'],
        ] },
        { title: 'Cantități', instr: 'Scrie cuvântul în engleză.', items: [
          ['a ___ of water (sticlă)', 'bottle'],
          ['a ___ of coffee (ceașcă)', 'cup'],
          ['a ___ of bread (felie)', 'slice'],
          ['a ___ of cheese (bucată)', 'piece'],
          ['a ___ of milk (pahar)', 'glass'],
        ] },
        { title: 'La restaurant', instr: 'Completează.', items: [
          ['A table for two, ___.', 'please'],
          ["I'd ___ the soup, please.", 'like'],
          ['Can we have the ___, please?', 'bill'],
          ['Would you like anything to ___?', 'drink'],
          ['Can I pay by ___?', 'card'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['There is chicken in the fridge. ___', 'false'],
          ['Ioana buys tomatoes at the market. ___', 'true'],
          ['She buys bread at the bakery. ___', 'true'],
          ['Her friends go home early. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Aș dori o cafea, vă rog. → ___', ["I'd like a coffee, please", "I would like a coffee, please"]],
          ['Cât costă? → ___', ['How much is it', 'How much does it cost']],
          ['Nu avem lapte. → ___', ["We haven't got any milk", "We don't have any milk"]],
          ['Beau multă apă. → ___', ['I drink a lot of water', 'I drink lots of water']],
        ] },
      ],
    },
    {
      id: 'en6', n: 6, title: 'Free time', theme: 'Ce îți place, ce poți face și pronumele obiect',
      goals: ['Spui ce îți place și ce nu', 'Folosești like + -ing', 'Folosești can pentru ce știi să faci', 'Folosești me, him, her, us, them', 'Pui întrebări cu what, where, when, who, why, how'],
      sections: [
        { h: 'Like, love, hate', html: `<p>După aceste verbe, alt verb stă de obicei la forma cu <b>-ing</b>.</p>` + table(['Engleză', 'Română'], [
          ['I love reading.', 'Îmi place foarte mult să citesc.'],
          ['I like walking.', 'Îmi place să merg pe jos.'],
          ["I don't mind cooking.", 'Nu mă deranjează să gătesc.'],
          ["I don't like running.", 'Nu îmi place să alerg.'],
          ['I hate ironing.', 'Urăsc să calc.'],
        ]) + `<p class="note">Spre deosebire de română, cel care simte este subiectul: <b>I like coffee</b>, nu „to me likes”. La he/she: <b>She likes coffee.</b></p>` },
        { h: 'Forma cu -ing', html: table(['Regulă', 'Exemple'], [
          ['de obicei + ing', 'read → reading, walk → walking'],
          ['e final dispare', 'dance → dancing, write → writing'],
          ['vocală scurtă + o consoană: se dublează', 'swim → swimming, run → running, sit → sitting'],
        ]) },
        { h: 'Can și can\'t', html: `<p><b>Can</b> arată ce știi sau poți face. Nu se schimbă la he/she și verbul de după nu primește <b>to</b>.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ['I can swim.', "I can't swim.", 'Can you swim?'],
          ['She can drive.', "She can't drive.", 'Can she drive?'],
        ]) + `<p>Răspuns scurt: <b>Yes, I can.</b> / <b>No, I can't.</b> Grad: <b>very well</b> (foarte bine), <b>quite well</b> (destul de bine), <b>not at all</b> (deloc).</p><p class="note">Greșit: <b>She cans</b>, <b>I can to swim</b>. Corect: <b>She can</b>, <b>I can swim</b>.</p>` },
        { h: 'Me, him, her, us, them', html: `<p>După verb sau prepoziție folosești alte forme: <b>She loves him. Come with us.</b></p>` + table(['Subiect', 'Obiect', 'Exemplu'], [
          ['I', 'me', 'Call me.'], ['you', 'you', 'I can help you.'], ['he', 'him', 'I know him.'], ['she', 'her', 'Ask her.'], ['it', 'it', 'I like it.'], ['we', 'us', 'Wait for us.'], ['they', 'them', 'I love them.'],
        ]) },
        { h: 'Cuvintele de întrebare', html: table(['Engleză', 'Română', 'Exemplu'], [
          ['what', 'ce', 'What do you do at weekends?'],
          ['where', 'unde', 'Where do you swim?'],
          ['when', 'când', 'When do you read?'],
          ['who', 'cine', 'Who do you go with?'],
          ['why', 'de ce', 'Why do you like it?'],
          ['how', 'cum', 'How do you get there?'],
          ['how often', 'cât de des', 'How often do you walk?'],
        ]) + `<p>Răspunsul la <b>why</b> începe cu <b>because</b> (pentru că).</p>` },
      ],
      reading: {
        title: 'Never too late',
        text: `Mrs Pop is sixty-eight. She doesn't work now, so she has a lot of free time. What does she do? Almost everything!

She loves gardening and she likes walking with her friend Veronica. They walk by the lake every morning. She doesn't like watching television, because she thinks it is boring.

Her grandson often goes with her to the sea. "Grandma, can you swim?" he asks one day. "No, I can't," she says. He is very surprised. So she goes to lessons at the swimming pool. Now she can swim quite well, and she goes twice a week.

She can't use a computer very well yet, but her grandson is teaching her. He sends her photos and she answers him with long messages. "I don't mind making mistakes," she says. "I just enjoy learning."`,
        glossary: { free: 'liber', almost: 'aproape', everything: 'totul', gardening: 'grădinărit', lake: 'lac', boring: 'plictisitor', thinks: 'crede', grandson: 'nepot', surprised: 'surprins', sea: 'mare', lessons: 'lecții', pool: 'piscină', twice: 'de două ori', teaching: 'învață pe cineva', sends: 'trimite', answers: 'răspunde', messages: 'mesaje', mistakes: 'greșeli', enjoy: 'a se bucura de', learning: 'a învăța', late: 'târziu' },
        questions: [['Cu cine se plimbă doamna Pop?', 'Cu prietena ei, Veronica.'], ['De ce nu îi place televizorul?', 'I se pare plictisitor.'], ['Cine o învață să folosească un calculator?', 'Nepotul ei.']],
      },
      exercises: [
        { title: 'Forma cu -ing', instr: 'Scrie verbul cu -ing.', items: [
          ['I love ___. (read)', 'reading'],
          ['She hates ___. (cook)', 'cooking'],
          ['We like ___. (dance)', 'dancing'],
          ['He loves ___. (swim)', 'swimming'],
          ['They enjoy ___. (run)', 'running'],
          ['I like ___ letters. (write)', 'writing'],
        ] },
        { title: 'Can', instr: "Scrie can sau can't, după sens.", items: [
          ['Fish ___ swim.', 'can'],
          ['Babies ___ drive.', "can't"],
          ['Birds ___ fly.', 'can'],
          ['Dogs ___ read.', "can't"],
          ['A person ___ live without water for a month.', "can't"],
        ] },
        { title: 'Pronume obiect', instr: 'Scrie me, him, her, it, us sau them.', items: [
          ['Ana is my friend. I see ___ every day.', 'her'],
          ['Tom is here. Can you help ___?', 'him'],
          ['I like this book. I read ___ every evening.', 'it'],
          ['My parents are in Iasi. I call ___ on Sundays.', 'them'],
          ['We are at home. Call ___ later.', 'us'],
          ["I don't understand. Can you help ___?", 'me'],
        ] },
        { title: 'Întrebări', instr: 'Scrie cuvântul de întrebare.', items: [
          ['___ do you live? In Cluj.', 'Where'],
          ['___ is that man? He is my uncle.', 'Who'],
          ['___ do you get up? At seven.', 'When'],
          ['___ do you like it? Because it is fun.', 'Why'],
          ['___ do you do at weekends? I read.', 'What'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['Mrs Pop likes watching television. ___', 'false'],
          ['She can swim quite well now. ___', 'true'],
          ['She goes to the pool once a month. ___', 'false'],
          ['Her grandson sends her photos. ___', 'true'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Îmi place să citesc. → ___', ['I like reading', 'I like to read']],
          ['Nu știu să înot. → ___', "I can't swim"],
          ['Știi să conduci? → ___', 'Can you drive'],
          ['Ei îi place să gătească. → ___', ['She likes cooking', 'She likes to cook']],
          ['Îl cunosc. → ___', 'I know him'],
        ] },
      ],
    },
    {
      id: 'en7', n: 7, title: 'Right now', theme: 'Prezentul continuu, hainele și vremea',
      goals: ['Spui ce se întâmplă acum', 'Deosebești prezentul continuu de prezentul simplu', 'Numești haine și culori', 'Vorbești despre vreme'],
      sections: [
        { h: 'Prezentul continuu', html: `<p>Îl folosești pentru ce se întâmplă chiar acum. Se formează cu <b>to be + verb cu -ing</b>.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ["I'm working", "I'm not working", 'Am I working?'],
          ["you're working", "you aren't working", 'Are you working?'],
          ["she's working", "she isn't working", 'Is she working?'],
          ["we're working", "we aren't working", 'Are we working?'],
          ["they're working", "they aren't working", 'Are they working?'],
        ]) + `<p>Răspuns scurt: <b>Yes, I am.</b> / <b>No, she isn't.</b> Cuvinte care îl însoțesc: <b>now</b>, <b>at the moment</b>, <b>today</b>.</p>` },
        { h: 'Simplu sau continuu', html: `<p>Româna are un singur prezent, engleza are două. Trebuie să alegi de fiecare dată.</p>` + table(['Prezent simplu', 'Prezent continuu'], [
          ['obicei, lucru mereu adevărat', 'chiar acum, temporar'],
          ['I usually drink tea.', "I'm drinking coffee today."],
          ['She works in a bank.', "She's working at home this week."],
          ['What do you do? (ce meserie ai)', 'What are you doing? (ce faci acum)'],
        ]) + `<p class="note">Unele verbe nu se folosesc de obicei la continuu: <b>like, love, want, know, understand, need</b>. Spui <b>I want water</b>, nu „I am wanting”.</p>` },
        { h: 'Haine', html: table(['Engleză', 'Română', 'Engleză', 'Română'], [
          ['shirt', 'cămașă', 'T-shirt', 'tricou'],
          ['trousers', 'pantaloni', 'jeans', 'blugi'],
          ['dress', 'rochie', 'skirt', 'fustă'],
          ['jumper', 'pulover', 'coat', 'palton'],
          ['shoes', 'pantofi', 'boots', 'cizme, ghete'],
          ['hat', 'pălărie, căciulă', 'scarf', 'fular, eșarfă'],
        ]) + `<p><b>Trousers</b> și <b>jeans</b> sunt mereu la plural: <b>These trousers are nice.</b> A purta haine: <b>wear</b>. <b>She's wearing a red dress.</b></p><p>Culori: <b>black, white, red, blue, green, yellow, brown, grey, pink, orange</b>. Culoarea stă înaintea substantivului: <b>a green coat</b>.</p>` },
        { h: 'Vremea', html: table(['Engleză', 'Română'], [
          ["What's the weather like?", 'Cum e vremea?'],
          ["It's sunny.", 'E soare.'],
          ["It's cloudy.", 'E înnorat.'],
          ["It's windy.", 'Bate vântul.'],
          ["It's raining.", 'Plouă.'],
          ["It's snowing.", 'Ninge.'],
          ["It's hot / warm / cold.", 'E foarte cald / cald / frig.'],
        ]) + `<p class="note">Vremea începe mereu cu <b>It's</b>. În română „e frig”, iar în engleză tot așa: <b>It's cold.</b> Dar despre persoană spui <b>I'm cold</b> (mi-e frig), nu „I have cold”.</p><p>Anotimpuri: <b>spring</b> primăvară, <b>summer</b> vară, <b>autumn</b> toamnă, <b>winter</b> iarnă.</p>` },
      ],
      reading: {
        title: 'A phone call from the station',
        text: `"Hello, Mum! How are you?"

"I'm fine, Alina. Where are you? I can hear a lot of noise."

"I'm at the station. I'm waiting for my train. It's raining and it's very cold here in Edinburgh."

"Are you wearing your warm coat?"

"Yes, Mum, I'm wearing my coat, my boots and the blue scarf from Grandma. What are you doing?"

"I'm making a cake. Your father is sitting in the garden and reading the newspaper. It's sunny here."

"In November? I usually love November in Romania."

"And why are you going to Glasgow today? You don't usually work on Saturdays."

"I'm not going for work. I'm visiting Maya. Oh, the train is coming! I'll call you tomorrow. Bye, Mum!"`,
        glossary: { hear: 'a auzi', noise: 'zgomot', station: 'gară', waiting: 'așteaptă', train: 'tren', raining: 'plouă', cold: 'frig', wearing: 'poartă', warm: 'călduros', coat: 'palton', boots: 'cizme', scarf: 'fular', cake: 'prăjitură, tort', sitting: 'stă așezat', newspaper: 'ziar', sunny: 'însorit', usually: 'de obicei', visiting: 'vizitează', coming: 'vine', tomorrow: 'mâine', call: 'a suna' },
        questions: [['Unde este Alina?', 'În gară, la Edinburgh.'], ['Ce face mama?', 'Face o prăjitură.'], ['De ce merge Alina la Glasgow?', 'O vizitează pe Maya.']],
      },
      exercises: [
        { title: 'Prezent continuu', instr: 'Scrie forma completă a verbului, cu am, is sau are.', items: [
          ['I ___ a book now. (read)', ['am reading', "'m reading"]],
          ['She ___ in the garden. (sit)', ['is sitting', "'s sitting"]],
          ['We ___ for the bus. (wait)', ['are waiting', "'re waiting"]],
          ['They ___ TV. (watch)', ['are watching', "'re watching"]],
          ['He ___ a red shirt. (wear)', ['is wearing', "'s wearing"]],
          ['It ___ outside. (snow)', ['is snowing', "'s snowing"]],
        ] },
        { title: 'Negativ și întrebări', instr: 'Scrie verbul la forma cerută.', items: [
          ['I ___ now. (not work)', ["'m not working", 'am not working']],
          ['She ___ today. (not cook)', ["isn't cooking", 'is not cooking']],
          ['___ you wearing a coat?', 'Are'],
          ['What ___ he doing?', 'is'],
          ['Why ___ they running?', 'are'],
        ] },
        { title: 'Simplu sau continuu', instr: 'Scrie forma potrivită a verbului.', items: [
          ['I usually ___ tea. (drink)', 'drink'],
          ['Look! It ___. (rain)', ['is raining', "'s raining"]],
          ['She ___ in a bank. (work)', 'works'],
          ['Be quiet! The baby ___. (sleep)', ['is sleeping', "'s sleeping"]],
          ['We ___ to the sea every summer. (go)', 'go'],
          ['I ___ this song. (love)', 'love', 'love nu se folosește la continuu'],
        ] },
        { title: 'Haine și vreme', instr: 'Scrie cuvântul în engleză.', items: [
          ['palton → ___', 'coat'],
          ['rochie → ___', 'dress'],
          ['pantaloni → ___', 'trousers'],
          ['pulover → ___', 'jumper'],
          ['Plouă. → It\'s ___', 'raining'],
          ['Ninge. → It\'s ___', 'snowing'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['It is sunny in Edinburgh. ___', 'false'],
          ['Alina is wearing a blue scarf. ___', 'true'],
          ['Her father is reading a newspaper. ___', 'true'],
          ['Alina is going to Glasgow for work. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Ce faci acum? → ___', 'What are you doing now'],
          ['Mi-e frig. → ___', "I'm cold"],
          ['Plouă azi. → ___', "It's raining today"],
          ['Ea poartă o rochie albă. → ___', "She's wearing a white dress"],
        ] },
      ],
    },
    {
      id: 'en8', n: 8, title: 'In town', theme: 'Locuri în oraș, drumuri, transport și ce e voie',
      goals: ['Numești locuri din oraș', 'Întrebi și explici drumul', 'Folosești imperativul', 'Spui cum călătorești', 'Folosești can și could pentru cereri'],
      sections: [
        { h: 'Locuri în oraș', html: table(['Engleză', 'Română', 'Engleză', 'Română'], [
          ['bank', 'bancă', 'post office', 'poștă'],
          ['chemist\'s', 'farmacie', 'hospital', 'spital'],
          ['supermarket', 'supermarket', 'station', 'gară'],
          ['library', 'bibliotecă', 'bookshop', 'librărie'],
          ['church', 'biserică', 'museum', 'muzeu'],
          ['square', 'piață (loc deschis)', 'bridge', 'pod'],
        ]) + `<p class="note"><b>Library</b> nu este librărie, ci bibliotecă. Librăria se numește <b>bookshop</b>.</p>` },
        { h: 'Cum întrebi drumul', html: table(['Engleză', 'Română'], [
          ['Excuse me, where is the station?', 'Scuzați-mă, unde este gara?'],
          ['Is there a bank near here?', 'Este vreo bancă pe aproape?'],
          ['How can I get to the museum?', 'Cum ajung la muzeu?'],
          ['Is it far?', 'E departe?'],
          ["It's about ten minutes on foot.", 'Sunt cam zece minute pe jos.'],
        ]) },
        { h: 'Cum explici drumul', html: `<p>Imperativul este verbul simplu: <b>Go straight on.</b> La negativ: <b>Don't turn left.</b></p>` + table(['Engleză', 'Română'], [
          ['Go straight on.', 'Mergi drept înainte.'],
          ['Turn left.', 'Fă la stânga.'],
          ['Turn right.', 'Fă la dreapta.'],
          ['Take the first street on the left.', 'Ia prima stradă pe stânga.'],
          ['Cross the road.', 'Traversează strada.'],
          ["It's on your right.", 'Este pe dreapta ta.'],
          ['Go past the church.', 'Treci de biserică.'],
        ]) },
        { h: 'Transport', html: `<p>Mijlocul de transport merge cu <b>by</b>, fără articol: <b>by bus, by train, by car, by plane</b>. Excepție: <b>on foot</b> (pe jos).</p>` + table(['Engleză', 'Română'], [
          ['a single ticket', 'un bilet dus'],
          ['a return ticket', 'un bilet dus-întors'],
          ['What time does the train leave?', 'La ce oră pleacă trenul?'],
          ['Which platform?', 'Ce peron?'],
          ['get on / get off', 'a urca / a coborî'],
          ['How long does it take?', 'Cât durează?'],
        ]) },
        { h: 'Cereri politicoase', html: `<p><b>Can you…?</b> este obișnuit, <b>Could you…?</b> este mai politicos. Verbul rămâne la forma simplă.</p>` + table(['Engleză', 'Română'], [
          ['Can I have a ticket, please?', 'Pot primi un bilet, vă rog?'],
          ['Could you help me, please?', 'M-ați putea ajuta, vă rog?'],
          ['Could you speak more slowly?', 'Ați putea vorbi mai rar?'],
        ]) + `<p>Răspunsuri: <b>Of course. / Sure.</b> (Desigur) și <b>Sorry, I can't.</b> (Îmi pare rău, nu pot.)</p>` },
      ],
      reading: {
        title: 'Lost in York',
        text: `Vlad is on holiday in York. Today he wants to visit the old railway museum, but he can't find it. His phone is not working, so he stops a woman in the street.

"Excuse me. Could you help me, please? How can I get to the railway museum?"

"Of course. Go straight on and cross the bridge. Then turn left and go past the station. The museum is on your right. You can't miss it."

"Is it far?"

"No, it's about fifteen minutes on foot. You can also go by bus, but the bus is slow at this time of day."

"Thank you very much."

Vlad walks to the bridge and turns left. He sees the station, but he doesn't see a museum. He asks a young man. The man smiles. "It's behind you!" he says. Vlad turns round. There it is, a huge building with a big green door.`,
        glossary: { holiday: 'vacanță', railway: 'cale ferată', find: 'a găsi', stops: 'oprește', woman: 'femeie', cross: 'a traversa', bridge: 'pod', then: 'apoi', past: 'dincolo de, pe lângă', miss: 'a rata', far: 'departe', slow: 'lent', sees: 'vede', asks: 'întreabă', young: 'tânăr', smiles: 'zâmbește', behind: 'în spatele', huge: 'imens', door: 'ușă', lost: 'rătăcit', turns: 'se întoarce, face' },
        questions: [['Ce caută Vlad?', 'Muzeul căilor ferate.'], ['De ce nu își folosește telefonul?', 'Nu funcționează.'], ['Unde era muzeul?', 'În spatele lui.']],
      },
      exercises: [
        { title: 'Locuri', instr: 'Scrie locul în engleză.', items: [
          ['Citești cărți de împrumut la ___.', 'library', 'library = bibliotecă'],
          ['Cumperi medicamente de la ___.', ["chemist's", 'chemists', 'pharmacy']],
          ['Iei trenul de la ___.', 'station'],
          ['Trimiți o scrisoare de la ___.', 'post office'],
          ['Cumperi cărți de la ___.', 'bookshop'],
        ] },
        { title: 'Drumul', instr: 'Scrie cuvântul care lipsește.', items: [
          ['Go ___ on. (drept)', 'straight'],
          ['___ left at the bank. (fă)', 'Turn'],
          ['___ the road. (traversează)', 'Cross'],
          ['It is on your ___. (dreapta)', 'right'],
          ['Take the first street on the ___. (stânga)', 'left'],
          ['Go ___ the church. (treci de)', 'past'],
        ] },
        { title: 'Imperativ', instr: 'Scrie imperativul în engleză. Dacă este negativ, începe cu Don\'t.', items: [
          ['Nu face la dreapta. → ___', "Don't turn right"],
          ['Așteaptă aici. → ___', 'Wait here'],
          ['Nu traversa strada. → ___', "Don't cross the road"],
          ['Închide ușa. → ___', ['Close the door', 'Shut the door']],
        ] },
        { title: 'By sau on', instr: 'Scrie by sau on.', items: [
          ['I go to work ___ bus.', 'by'],
          ['We travel ___ train.', 'by'],
          ['She goes to school ___ foot.', 'on'],
          ['They go to Italy ___ plane.', 'by'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['Vlad is working in York. ___', 'false'],
          ['His phone is not working. ___', 'true'],
          ['The museum is two hours on foot. ___', 'false'],
          ['The museum has a green door. ___', 'true'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Scuzați-mă, unde este banca? → ___', 'Excuse me, where is the bank'],
          ['E departe? → ___', 'Is it far'],
          ['Merg pe jos la muncă. → ___', ['I go to work on foot', 'I walk to work']],
          ['Ați putea vorbi mai rar, vă rog? → ___', 'Could you speak more slowly, please'],
        ] },
      ],
    },
    {
      id: 'en9', n: 9, title: 'Yesterday', theme: 'Trecutul: was, were și verbele regulate',
      goals: ['Folosești was și were', 'Formezi trecutul verbelor regulate', 'Spui când s-a întâmplat ceva', 'Spui data și anul'],
      sections: [
        { h: 'Was și were', html: table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ['I was', "I wasn't", 'Was I?'],
          ['you were', "you weren't", 'Were you?'],
          ['he/she/it was', "he/she/it wasn't", 'Was he/she/it?'],
          ['we were', "we weren't", 'Were we?'],
          ['they were', "they weren't", 'Were they?'],
        ]) + `<p>Răspuns scurt: <b>Yes, I was.</b> / <b>No, they weren't.</b> Trecutul lui <b>there is</b>: <b>there was</b>, <b>there were</b>.</p><p>Tot cu to be spui: <b>I was born in 1980</b> (m-am născut în 1980).</p>` },
        { h: 'Trecutul verbelor regulate', html: `<p>Adaugi <b>-ed</b>. Forma este aceeași la toate persoanele: <b>I worked, she worked, they worked</b>.</p>` + table(['Regulă', 'Exemple'], [
          ['de obicei + ed', 'work → worked, walk → walked'],
          ['e final + d', 'live → lived, like → liked'],
          ['consoană + y → ied', 'study → studied, try → tried'],
          ['vocală scurtă + o consoană: se dublează', 'stop → stopped, plan → planned'],
        ]) + `<p class="note">Terminația <b>-ed</b> de obicei nu formează o silabă nouă: <b>worked</b> se aude „uărct”, iar <b>lived</b> „livd”. Se aude ca silabă doar după t și d: <b>wanted, needed</b>.</p>` },
        { h: 'Negativ și întrebări', html: `<p>Folosești <b>did</b> și <b>didn't</b>, iar verbul revine la forma simplă.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ['I worked.', "I didn't work.", 'Did you work?'],
          ['She called.', "She didn't call.", 'Did she call?'],
        ]) + `<p>Răspuns scurt: <b>Yes, I did.</b> / <b>No, I didn't.</b></p><p class="note">Greșit: <b>I didn't worked</b>. Corect: <b>I didn't work</b>.</p><p class="note">La <b>was</b> și <b>were</b> nu se folosește did: <b>I wasn't</b>, <b>Were you?</b></p>` },
        { h: 'Când', html: table(['Engleză', 'Română'], [
          ['yesterday', 'ieri'], ['yesterday morning', 'ieri dimineață'], ['last night', 'aseară, azi-noapte'], ['last week', 'săptămâna trecută'], ['last year', 'anul trecut'], ['two days ago', 'acum două zile'], ['a long time ago', 'demult'],
        ]) + `<p class="note"><b>Ago</b> stă după perioadă: <b>three years ago</b>. Nu spui „in last week”, ci doar <b>last week</b>.</p>` },
        { h: 'Date și ani', html: `<p>Numerale ordinale: <b>1st</b> first, <b>2nd</b> second, <b>3rd</b> third, <b>4th</b> fourth, <b>5th</b> fifth, <b>10th</b> tenth, <b>20th</b> twentieth, <b>31st</b> thirty-first.</p><p>Lunile, cu majusculă: <b>January, February, March, April, May, June, July, August, September, October, November, December</b>.</p><p>Data se spune <b>on the fifth of May</b>. Anii: <b>1989</b> nineteen eighty-nine, <b>2005</b> two thousand and five, <b>2024</b> twenty twenty-four.</p>` },
      ],
      reading: {
        title: 'The old school',
        text: `Last week I visited my old school in Suceava. I was there for the first time in thirty years. I called the school in the morning and a young teacher answered. She invited me to come in the afternoon.

The building was smaller than in my memory, but the stairs were the same. There was a new library on the first floor. In my time there wasn't a library, and there weren't any computers.

I walked to my old classroom. Twenty children looked at me and laughed. "Were you a good student?" a girl asked. "No, I wasn't," I said. "I talked a lot and I never listened." They liked that answer.

My old maths teacher lived near the school, but he died two years ago. I didn't know. I stayed for a long time in front of the school after that.`,
        glossary: { visited: 'am vizitat', called: 'am sunat', answered: 'a răspuns', invited: 'a invitat', afternoon: 'după-amiază', smaller: 'mai mic', memory: 'amintire', stairs: 'scări', same: 'aceleași', library: 'bibliotecă', classroom: 'sală de clasă', looked: 's-au uitat', laughed: 'au râs', student: 'elev', talked: 'vorbeam', listened: 'ascultam', liked: 'le-a plăcut', answer: 'răspuns', maths: 'matematică', lived: 'locuia', died: 'a murit', stayed: 'am rămas', ago: 'în urmă', walked: 'am mers' },
        questions: [['După câți ani a revenit la școală?', 'După treizeci de ani.'], ['Ce era nou la primul etaj?', 'O bibliotecă.'], ['Ce le-a răspuns copiilor?', 'Că nu a fost un elev bun: vorbea mult și nu asculta niciodată.']],
      },
      exercises: [
        { title: 'Was sau were', instr: 'Scrie was, were, wasn\'t sau weren\'t.', items: [
          ['I ___ at home yesterday.', 'was'],
          ['They ___ in Rome last year.', 'were'],
          ['She ___ tired last night.', 'was'],
          ['We ___ at work. We were at the sea. (negativ)', "weren't"],
          ['It ___ cold. It was hot. (negativ)', "wasn't"],
          ['___ you at school on Friday?', 'Were'],
        ] },
        { title: 'Trecutul', instr: 'Scrie verbul la trecut.', items: [
          ['I ___ in Brasov for ten years. (live)', 'lived'],
          ['She ___ English at university. (study)', 'studied'],
          ['We ___ to the park. (walk)', 'walked'],
          ['The bus ___ near the bank. (stop)', 'stopped'],
          ['He ___ his mother yesterday. (call)', 'called'],
          ['They ___ a film last night. (watch)', 'watched'],
        ] },
        { title: 'Negativ și întrebări', instr: 'Scrie verbul la forma cerută.', items: [
          ['I ___ yesterday. (not work)', ["didn't work", 'did not work']],
          ['She ___ me. (not call)', ["didn't call", 'did not call']],
          ['___ you like the film?', 'Did'],
          ['Where ___ you live in 2010?', 'did'],
          ['Did he phone? No, he ___.', "didn't"],
        ] },
        { title: 'Când', instr: 'Completează cu last, ago sau yesterday.', items: [
          ['I saw him ___ week.', 'last'],
          ['We moved here two years ___.', 'ago'],
          ['She called ___ morning.', 'yesterday'],
          ['They visited us ___ summer.', 'last'],
          ['It happened a long time ___.', 'ago'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['The school was in Suceava. ___', 'true'],
          ['There were computers in the old days. ___', 'false'],
          ['The writer was a very quiet student. ___', 'false'],
          ['The maths teacher died two years ago. ___', 'true'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Ieri am fost acasă. → ___', ['Yesterday I was at home', 'I was at home yesterday']],
          ['M-am născut în 1980. → ___', ['I was born in 1980']],
          ['Nu am lucrat săptămâna trecută. → ___', "I didn't work last week"],
          ['Ai sunat-o? → ___', 'Did you call her'],
        ] },
      ],
    },
  );

  window.ENGLISH_WEEKS.push(
    { n: 5, title: 'Săptămâna 5', units: ['en5'] },
    { n: 6, title: 'Săptămâna 6', units: ['en6'] },
    { n: 7, title: 'Săptămâna 7', units: ['en7'] },
    { n: 8, title: 'Săptămâna 8', units: ['en8'] },
    { n: 9, title: 'Săptămâna 9', units: ['en9'] },
  );
})();
