// Engleza: unitatile 10-13. Verbe neregulate, comparatii, viitor, experiente si sanatate.
(function () {
  const table = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const TF = 'Scrie true sau false.';

  window.ENGLISH_UNITS.push(
    {
      id: 'en10', n: 10, title: 'A story to tell', theme: 'Verbele neregulate la trecut și cum povestești',
      goals: ['Folosești cele mai frecvente verbe neregulate', 'Pui întrebări despre trecut', 'Legi întâmplările cu first, then, after that', 'Povestești o călătorie sau o zi'],
      sections: [
        { h: 'Verbe neregulate', html: `<p>Unele verbe nu primesc -ed. Se învață pe rând. Acestea sunt cele mai folosite:</p>` + table(['Prezent', 'Trecut', 'Română', 'Prezent', 'Trecut', 'Română'], [
          ['go', 'went', 'a merge', 'come', 'came', 'a veni'],
          ['have', 'had', 'a avea', 'do', 'did', 'a face'],
          ['see', 'saw', 'a vedea', 'say', 'said', 'a spune'],
          ['get', 'got', 'a primi, a ajunge', 'make', 'made', 'a face, a pregăti'],
          ['take', 'took', 'a lua', 'give', 'gave', 'a da'],
          ['eat', 'ate', 'a mânca', 'drink', 'drank', 'a bea'],
          ['buy', 'bought', 'a cumpăra', 'find', 'found', 'a găsi'],
          ['know', 'knew', 'a ști', 'think', 'thought', 'a crede'],
          ['meet', 'met', 'a întâlni', 'leave', 'left', 'a pleca'],
          ['write', 'wrote', 'a scrie', 'read', 'read', 'a citi'],
        ]) + `<p class="note"><b>Read</b> la trecut se scrie la fel, dar se citește „red”. <b>Said</b> se citește „sed”, iar în <b>bought</b> și <b>thought</b> grupul „gh” nu se aude.</p>` },
        { h: 'Negativ și întrebări', html: `<p>Regula este aceeași ca la verbele regulate: <b>did</b>, <b>didn't</b> și verbul la forma simplă.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ['I went.', "I didn't go.", 'Did you go?'],
          ['She saw it.', "She didn't see it.", 'What did she see?'],
          ['We ate.', "We didn't eat.", 'Where did you eat?'],
        ]) + `<p class="note">Greșit: <b>I didn't went</b>, <b>Did you saw?</b> După did verbul rămâne simplu.</p>` },
        { h: 'Cum legi o poveste', html: table(['Engleză', 'Română'], [
          ['first', 'mai întâi'], ['then', 'apoi'], ['after that', 'după aceea'], ['finally', 'în cele din urmă'], ['suddenly', 'deodată'], ['because', 'pentru că'], ['so', 'așa că'], ['but', 'dar'],
        ]) + `<p>Exemplu: <b>First we went to the market. Then we had lunch. After that we took the train home.</b></p>` },
        { h: 'Reacții', html: table(['Engleză', 'Română'], [
          ['How was your weekend?', 'Cum a fost weekendul?'],
          ['It was great! / It was OK.', 'A fost minunat! / A fost bine.'],
          ['Really?', 'Serios?'],
          ['What happened?', 'Ce s-a întâmplat?'],
          ["That's a pity.", 'Ce păcat.'],
          ['Sounds good!', 'Sună bine!'],
        ]) },
      ],
      reading: {
        title: 'The wrong bag',
        text: `Last summer I went to Greece with my sister. We left Bucharest early in the morning and we got to Athens at ten o'clock. First we went to get our bags. I found a black bag and I took it to the hotel.

In the room I opened the bag and I saw a pair of big shoes, a camera and a book in German. It wasn't my bag! Suddenly I felt very bad. My sister laughed. "You always do this," she said.

There was a small card with a phone number in the bag. I called the number and a man answered. His name was Klaus. He had my bag, with my dresses in it!

That evening we met him in a restaurant by the sea. We changed bags and we ate fish together. He and my sister talked all night. They got married two years later. Now I always check my bag twice.`,
        glossary: { summer: 'vară', left: 'am plecat', early: 'devreme', got: 'am ajuns', found: 'am găsit', took: 'am dus', opened: 'am deschis', saw: 'am văzut', pair: 'pereche', shoes: 'pantofi', camera: 'aparat foto', german: 'germană', suddenly: 'deodată', felt: 'm-am simțit', laughed: 'a râs', said: 'a spus', card: 'cartonaș', answered: 'a răspuns', had: 'avea', dresses: 'rochii', met: 'ne-am întâlnit', sea: 'mare', changed: 'am schimbat', ate: 'am mâncat', married: 'căsătoriți', later: 'mai târziu', check: 'a verifica', twice: 'de două ori', wrong: 'greșit', bag: 'geantă' },
        questions: [['Unde a mers cu sora ei?', 'În Grecia.'], ['Ce era în geanta greșită?', 'Pantofi mari, un aparat foto și o carte în germană.'], ['Ce s-a întâmplat după doi ani?', 'Klaus și sora ei s-au căsătorit.']],
      },
      exercises: [
        { title: 'Verbe neregulate', instr: 'Scrie verbul la trecut.', items: [
          ['We ___ to the sea. (go)', 'went'],
          ['I ___ a new coat. (buy)', 'bought'],
          ['She ___ a letter. (write)', 'wrote'],
          ['They ___ a good film. (see)', 'saw'],
          ['He ___ "hello". (say)', 'said'],
          ['I ___ my friend at the station. (meet)', 'met'],
          ['We ___ fish for dinner. (eat)', 'ate'],
          ['She ___ home at six. (come)', 'came'],
        ] },
        { title: 'Regulat sau neregulat', instr: 'Scrie verbul la trecut.', items: [
          ['Yesterday I ___ my mother. (call)', 'called'],
          ['We ___ a big breakfast. (have)', 'had'],
          ['She ___ her keys in the car. (find)', 'found'],
          ['He ___ in Sibiu for years. (live)', 'lived'],
          ['I ___ the bus to work. (take)', 'took'],
          ['They ___ all evening. (talk)', 'talked'],
        ] },
        { title: 'Negativ', instr: "Scrie negativul cu didn't.", items: [
          ['I went. → I ___', "didn't go"],
          ['She saw it. → She ___ it', "didn't see"],
          ['We ate. → We ___', "didn't eat"],
          ['He bought it. → He ___ it', "didn't buy"],
          ['They came. → They ___', "didn't come"],
        ] },
        { title: 'Întrebări', instr: 'Scrie verbul la forma simplă.', items: [
          ['Where did you ___ last summer? (went)', 'go'],
          ['What did she ___? (said)', 'say'],
          ['Did you ___ the film? (saw)', 'see'],
          ['When did they ___? (left)', 'leave'],
          ['What did you ___ for lunch? (ate)', 'eat'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['They went to Italy. ___', 'false'],
          ['The bag was black. ___', 'true'],
          ['Klaus had her bag. ___', 'true'],
          ['Klaus and the writer got married. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Am mers la mare. → ___', ['I went to the seaside', 'I went to the sea']],
          ['Ce ai cumpărat? → ___', 'What did you buy'],
          ['Nu am văzut-o. → ___', "I didn't see her"],
          ['Ce s-a întâmplat? → ___', 'What happened'],
        ] },
      ],
    },
    {
      id: 'en11', n: 11, title: 'Better or worse', theme: 'Comparații, superlative, too și enough',
      goals: ['Compari oameni și lucruri', 'Spui care este cel mai bun', 'Folosești as ... as', 'Folosești too și enough', 'Alegi la cumpărături'],
      sections: [
        { h: 'Comparativul', html: table(['Regulă', 'Exemple'], [
          ['adjectiv scurt + er', 'cheap → cheaper, old → older'],
          ['e final + r', 'nice → nicer, large → larger'],
          ['consoană + y → ier', 'easy → easier, happy → happier'],
          ['vocală scurtă + o consoană: se dublează', 'big → bigger, hot → hotter'],
          ['adjectiv lung: more', 'expensive → more expensive, beautiful → more beautiful'],
          ['neregulate', 'good → better, bad → worse, far → further'],
        ]) + `<p>După comparativ vine <b>than</b>: <b>Cluj is bigger than Sibiu.</b></p><p class="note">Nu se combină <b>more</b> cu -er. Greșit: <b>more cheaper</b>. Corect: <b>cheaper</b>.</p>` },
        { h: 'Superlativul', html: `<p>Vine cu <b>the</b> în față.</p>` + table(['Adjectiv', 'Superlativ', 'Română'], [
          ['cheap', 'the cheapest', 'cel mai ieftin'],
          ['big', 'the biggest', 'cel mai mare'],
          ['easy', 'the easiest', 'cel mai ușor'],
          ['expensive', 'the most expensive', 'cel mai scump'],
          ['good', 'the best', 'cel mai bun'],
          ['bad', 'the worst', 'cel mai rău'],
        ]) + `<p>Într-un loc: <b>in</b>. <b>It's the oldest house in the city.</b></p>` },
        { h: 'As ... as', html: `<p>Pentru lucruri egale: <b>She's as tall as her mother.</b> La negativ arată că unul e mai puțin: <b>This coat isn't as warm as that one.</b></p>` },
        { h: 'Too și enough', html: table(['Cuvânt', 'Unde stă', 'Exemplu'], [
          ['too (prea)', 'înaintea adjectivului', "It's too expensive."],
          ['enough (destul)', 'după adjectiv', "It isn't big enough."],
          ['enough (destul)', 'înaintea substantivului', "I haven't got enough money."],
        ]) + `<p class="note"><b>Too</b> are sens negativ: ceva este mai mult decât trebuie. <b>Very</b> arată doar intensitatea: <b>It's very good.</b></p>` },
        { h: 'La cumpărături', html: table(['Engleză', 'Română'], [
          ['Can I try it on?', 'Pot să îl probez?'],
          ['Do you have it in a smaller size?', 'Îl aveți într-o mărime mai mică?'],
          ['Do you have it in black?', 'Îl aveți în negru?'],
          ["It's too small for me.", 'Îmi este prea mic.'],
          ['Which one do you prefer?', 'Pe care îl preferi?'],
          ['I prefer this one.', 'Îl prefer pe acesta.'],
        ]) },
      ],
      reading: {
        title: 'Which city?',
        text: `Mihai got a job offer last month. He can work in Bucharest or in Cluj, and he doesn't know which is better.

Bucharest is the biggest city in Romania. The salary there is higher, and there are more theatres and restaurants. But the traffic is worse, and flats are more expensive. "My friends are there," he says, "but I don't want to spend two hours in a car every day."

Cluj is smaller and greener. It isn't as cheap as it was ten years ago, but people say life is quieter there. The mountains are nearer too, and Mihai loves walking.

His sister thinks the money is the most important thing. His mother thinks the best city is the one nearest to her! Mihai made a list on a big piece of paper, but it wasn't long enough. Finally he asked himself a simple question: "Where am I happiest?" The next day he called Cluj.`,
        glossary: { offer: 'ofertă', salary: 'salariu', higher: 'mai mare', theatres: 'teatre', traffic: 'trafic', worse: 'mai rău', expensive: 'scump', spend: 'a petrece', greener: 'mai verde', cheap: 'ieftin', quieter: 'mai liniștit', life: 'viață', mountains: 'munți', nearer: 'mai aproape', nearest: 'cel mai aproape', list: 'listă', paper: 'hârtie', enough: 'destul', finally: 'în cele din urmă', himself: 'pe sine', simple: 'simplu', question: 'întrebare', happiest: 'cel mai fericit', biggest: 'cel mai mare', better: 'mai bun' },
        questions: [['Ce e mai bine la București?', 'Salariul e mai mare și sunt mai multe teatre și restaurante.'], ['De ce contează pentru Mihai că munții sunt aproape?', 'Pentru că îi place mult să meargă pe jos.'], ['Ce oraș alege?', 'Clujul.']],
      },
      exercises: [
        { title: 'Comparativ', instr: 'Scrie comparativul adjectivului.', items: [
          ['This bag is ___ than that one. (cheap)', 'cheaper'],
          ['My brother is ___ than me. (old)', 'older'],
          ['Summer is ___ than spring. (hot)', 'hotter'],
          ['English is ___ than Chinese. (easy)', 'easier'],
          ['This hotel is ___ than that one. (expensive)', 'more expensive'],
          ['Today is ___ than yesterday. (good)', 'better'],
          ['The weather is ___ than last week. (bad)', 'worse'],
        ] },
        { title: 'Superlativ', instr: 'Scrie superlativul, cu the.', items: [
          ['It is ___ city in Romania. (big)', 'the biggest'],
          ['This is ___ book I have got. (good)', 'the best'],
          ['She is ___ person in our family. (funny)', 'the funniest'],
          ['It is ___ shop in town. (expensive)', 'the most expensive'],
          ['That was ___ day of my life. (bad)', 'the worst'],
        ] },
        { title: 'Than, as, too, enough', instr: 'Scrie than, as, too sau enough.', items: [
          ['Dan is taller ___ Tom.', 'than'],
          ['She is as tall ___ her sister.', 'as'],
          ['This coat is ___ big for me.', 'too'],
          ["I haven't got ___ time.", 'enough'],
          ["The room isn't warm ___.", 'enough'],
          ['Your flat is bigger ___ mine.', 'than'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['Flats are more expensive in Bucharest. ___', 'true'],
          ['Cluj is bigger than Bucharest. ___', 'false'],
          ['His mother thinks money is the most important thing. ___', 'false'],
          ['Mihai called Cluj the next day. ___', 'true'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Este prea scump. → ___', "It's too expensive"],
          ['Acesta este cel mai bun. → ___', 'This is the best'],
          ['Pot să îl probez? → ___', 'Can I try it on'],
          ['Ea este mai tânără decât mine. → ___', ['She is younger than me', 'She is younger than I am']],
        ] },
      ],
    },
    {
      id: 'en12', n: 12, title: 'What comes next', theme: 'Planuri, viitorul, invitații și călătorii',
      goals: ['Vorbești despre planuri cu going to', 'Spui ce ai aranjat deja, cu prezentul continuu', 'Faci previziuni și decizii rapide cu will', 'Inviți și răspunzi la o invitație', 'Rezervi o cameră'],
      sections: [
        { h: 'Going to', html: `<p>Pentru planuri și intenții: ai decis deja. Se formează cu <b>to be + going to + verb</b>.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ["I'm going to study.", "I'm not going to study.", 'Am I going to study?'],
          ["She's going to travel.", "She isn't going to travel.", 'Is she going to travel?'],
          ["They're going to move.", "They aren't going to move.", 'Are they going to move?'],
        ]) + `<p>Cuvinte de timp: <b>tomorrow</b> mâine, <b>next week</b> săptămâna viitoare, <b>next year</b> anul viitor, <b>soon</b> curând, <b>in two days</b> peste două zile.</p>` },
        { h: 'Will', html: `<p>Pentru ce crezi că se va întâmpla și pentru ce hotărăști pe loc. Nu se schimbă la he/she.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ["I'll help you.", "I won't help you.", 'Will you help me?'],
          ["It'll rain.", "It won't rain.", 'Will it rain?'],
        ]) + `<p>Previziune: <b>I think it will rain.</b> Decizie pe loc: <b>The phone is ringing. I'll answer it.</b> Promisiune: <b>I'll call you.</b></p><p class="note"><b>Won't</b> = will not. Se citește cu „ou”, nu ca <b>want</b>.</p>` },
        { h: 'Ce ai aranjat deja', html: `<p>Pentru întâlniri și lucruri cu dată stabilită, se folosește prezentul continuu: <b>I'm meeting Ana on Friday.</b> <b>We're flying to Rome tomorrow.</b></p>` + table(['Spui', 'Pentru că'], [
          ["I'm going to learn Italian.", 'este o intenție a ta'],
          ["I'm seeing the doctor at five.", 'este o programare stabilită'],
          ["I'll open the window.", 'te-ai hotărât chiar acum'],
        ]) },
        { h: 'Invitații', html: table(['Engleză', 'Română'], [
          ['Would you like to come to dinner?', 'Vrei să vii la cină?'],
          ["Let's go to the cinema.", 'Hai să mergem la cinema.'],
          ['What about Saturday?', 'Ce zici de sâmbătă?'],
          ["I'd love to.", 'Cu mare plăcere.'],
          ['Good idea!', 'Bună idee!'],
          ["Sorry, I can't. I'm working.", 'Îmi pare rău, nu pot. Lucrez.'],
        ]) + `<p class="note">După <b>Would you like</b> vine <b>to</b>, iar după <b>Let's</b> verbul simplu. Compară cu <b>I like reading</b>, care vorbește despre un obicei.</p>` },
        { h: 'Călătorii', html: table(['Engleză', 'Română'], [
          ["I'd like to book a room.", 'Aș dori să rezerv o cameră.'],
          ['a single room / a double room', 'o cameră single / dublă'],
          ['for three nights', 'pentru trei nopți'],
          ['Is breakfast included?', 'Micul dejun este inclus?'],
          ['I have a reservation.', 'Am o rezervare.'],
          ['What time is check-out?', 'La ce oră se eliberează camera?'],
        ]) },
      ],
      reading: {
        title: 'A letter to next year',
        text: `Dear me,

It is the last week of December and I am writing to you with a cup of tea. Next year is going to be different.

First, I'm going to learn to drive. I'm starting lessons in January. My teacher's name is Mr Dobre, and I'm seeing him on the tenth. I think I'll be a terrible driver at first, but I won't stop.

Second, I'm going to read more and look at my phone less. I'm not going to promise a hundred books. Twelve will be enough.

In July, Ada and I are going to Portugal. We're flying on the fifth, and the hotel is already booked. Will it be hot? I think so. Will we speak any Portuguese? Probably not.

I don't know what else will happen. Maybe I'll meet someone new. Maybe nothing will change. But I'll open this letter next December, and I hope you will smile.

With love,
Me`,
        glossary: { dear: 'drag', last: 'ultima', cup: 'ceașcă', different: 'diferit', learn: 'a învăța', drive: 'a conduce', starting: 'încep', terrible: 'groaznic', driver: 'șofer', stop: 'a mă opri', less: 'mai puțin', promise: 'a promite', hundred: 'o sută', enough: 'destul', flying: 'zburăm', already: 'deja', booked: 'rezervat', hot: 'foarte cald', probably: 'probabil', happen: 'a se întâmpla', maybe: 'poate', someone: 'cineva', nothing: 'nimic', change: 'a se schimba', hope: 'sper', smile: 'a zâmbi', letter: 'scrisoare' },
        questions: [['Ce vrea să învețe?', 'Să conducă.'], ['Câte cărți își propune?', 'Douăsprezece.'], ['Unde merge în iulie și cu cine?', 'În Portugalia, cu Ada.']],
      },
      exercises: [
        { title: 'Going to', instr: 'Scrie am, is sau are.', items: [
          ['I ___ going to study tonight.', 'am'],
          ['She ___ going to buy a car.', 'is'],
          ['We ___ going to move next year.', 'are'],
          ['___ they going to visit us?', 'Are'],
          ['What ___ you going to do tomorrow?', 'are'],
          ['He ___ not going to come.', 'is'],
        ] },
        { title: 'Will', instr: "Scrie will sau won't, după sens.", items: [
          ["I'm sure you ___ like this film. It's very good.", 'will'],
          ["Don't worry, I ___ tell anyone.", "won't"],
          ['It is very cold. I think it ___ snow.', 'will'],
          ['He is very busy. He ___ come to the party.', "won't"],
          ['The phone is ringing. I ___ answer it.', ['will', "'ll"]],
        ] },
        { title: 'Going to sau will', instr: 'Scrie forma potrivită. La going to scrie și am, is sau are.', items: [
          ['We have got the tickets. We ___ visit Rome. (plan)', ['are going to', "'re going to"]],
          ['That bag looks heavy. I ___ help you. (decizie acum)', ['will', "'ll"]],
          ['She has decided. She ___ study medicine. (plan)', ['is going to', "'s going to"]],
          ['I think people ___ live longer in the future. (părere)', 'will'],
        ] },
        { title: 'Invitații', instr: 'Completează.', items: [
          ['Would you like ___ come to my house?', 'to'],
          ['___ go to the park.', "Let's"],
          ['What ___ Sunday?', 'about'],
          ["I'd ___ to. Thank you!", 'love'],
          ["Sorry, I ___. I'm working.", "can't"],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['The driving lessons start in January. ___', 'true'],
          ['The plan is to read a hundred books. ___', 'false'],
          ['The hotel in Portugal is already booked. ___', 'true'],
          ['The trip to Portugal is in December. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['O să învăț engleză. → ___', "I'm going to learn English"],
          ['Te sun mâine. → ___', "I'll call you tomorrow"],
          ['Nu va ploua. → ___', "It won't rain"],
          ['Hai să mergem acasă. → ___', "Let's go home"],
          ['Aș dori să rezerv o cameră. → ___', "I'd like to book a room"],
        ] },
      ],
    },
    {
      id: 'en13', n: 13, title: 'Life so far', theme: 'Prezentul perfect, sănătatea și sfaturile',
      goals: ['Vorbești despre experiențe cu ever și never', 'Deosebești prezentul perfect de trecut', 'Folosești already, yet, for, since', 'Spui ce te doare', 'Dai sfaturi cu should, must și have to'],
      sections: [
        { h: 'Prezentul perfect', html: `<p>Se formează cu <b>have/has + participiu</b>. Îl folosești pentru experiențe de viață, când nu contează momentul exact.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ["I've seen it.", "I haven't seen it.", 'Have you seen it?'],
          ["She's been to Rome.", "She hasn't been to Rome.", 'Has she been to Rome?'],
        ]) + `<p>Participiul verbelor regulate este la fel ca trecutul: <b>worked, lived</b>. Cele neregulate se învață:</p>` + table(['Verb', 'Trecut', 'Participiu', 'Verb', 'Trecut', 'Participiu'], [
          ['be', 'was/were', 'been', 'go', 'went', 'gone'],
          ['see', 'saw', 'seen', 'eat', 'ate', 'eaten'],
          ['do', 'did', 'done', 'write', 'wrote', 'written'],
          ['have', 'had', 'had', 'meet', 'met', 'met'],
          ['read', 'read', 'read', 'buy', 'bought', 'bought'],
        ]) + `<p>Pentru experiențe: <b>Have you ever been to Italy?</b> (ai fost vreodată) și <b>I've never eaten sushi.</b> (n-am mâncat niciodată).</p>` },
        { h: 'Prezent perfect sau trecut', html: `<p>Dacă spui <b>când</b> s-a întâmplat, folosești trecutul.</p>` + table(['Prezent perfect', 'Trecut'], [
          ["I've been to Paris.", 'I went to Paris in 2019.'],
          ['Have you seen this film?', 'Did you see it last night?'],
        ]) + `<p class="note">Greșit: <b>I have seen him yesterday.</b> Corect: <b>I saw him yesterday.</b> În română același „am văzut” acoperă ambele forme.</p>` },
        { h: 'Already, yet, for, since', html: table(['Cuvânt', 'Sens', 'Exemplu'], [
          ['already', 'deja', "I've already eaten."],
          ['yet', 'încă (negativ), deja (întrebare)', "I haven't finished yet. Have you finished yet?"],
          ['for', 'de (o perioadă)', "I've lived here for ten years."],
          ['since', 'din (un moment)', "I've lived here since 2015."],
        ]) + `<p class="note">În română „locuiesc aici de zece ani”, la prezent. În engleză spui <b>I've lived here for ten years</b>, nu „I live here for ten years”.</p>` },
        { h: 'La doctor', html: table(['Engleză', 'Română'], [
          ["What's the matter?", 'Ce s-a întâmplat? Ce aveți?'],
          ["I don't feel well.", 'Nu mă simt bine.'],
          ['I have a headache.', 'Mă doare capul.'],
          ['I have a sore throat.', 'Mă doare gâtul.'],
          ['I have a cold.', 'Am o răceală.'],
          ['I have a temperature.', 'Am febră.'],
          ['My back hurts.', 'Mă doare spatele.'],
          ['I need an appointment.', 'Am nevoie de o programare.'],
        ]) + `<p>Corpul: <b>head</b> cap, <b>eye</b> ochi, <b>ear</b> ureche, <b>arm</b> braț, <b>hand</b> mână, <b>leg</b> picior, <b>foot</b> (plural <b>feet</b>) laba piciorului, <b>stomach</b> stomac.</p>` },
        { h: 'Should, must, have to', html: table(['Construcție', 'Sens', 'Exemplu'], [
          ['should', 'ar trebui (sfat)', 'You should rest.'],
          ["shouldn't", 'n-ar trebui', "You shouldn't smoke."],
          ['must', 'trebuie (regulă, decizie personală)', 'I must call my mother.'],
          ["mustn't", 'nu ai voie', "You mustn't park here."],
          ['have to / has to', 'trebuie (obligație din afară)', 'She has to work on Saturday.'],
          ["don't have to", 'nu e nevoie', "You don't have to pay."],
        ]) + `<p class="note"><b>Mustn't</b> și <b>don't have to</b> nu înseamnă același lucru: primul interzice, al doilea spune doar că nu e necesar. După <b>should</b> și <b>must</b> nu se pune to.</p>` },
      ],
      reading: {
        title: 'Have you ever?',
        text: `Doctor Stan has worked at the same small hospital for thirty years. She has met thousands of people there. This morning a young man came in.

"What's the matter?" she asked.

"I don't feel well. I've had a headache since Monday and I'm always tired."

"Have you taken anything?"

"Yes, I've already taken some tablets, but they haven't helped."

"How much water do you drink? How many hours do you sleep?"

He looked at the floor. "I've started a new job. I work at night, and I drink a lot of coffee. I haven't had a day off for a month."

She smiled. "I've seen this many times. You don't have to take more tablets. You should sleep more, and you must drink water. Have you ever taken a real holiday?"

"Never," he said.

"Then that is my advice. And you mustn't check your email on the beach!"`,
        glossary: { same: 'același', hospital: 'spital', thousands: 'mii', matter: 'problemă', feel: 'a se simți', headache: 'durere de cap', tired: 'obosit', taken: 'luat', tablets: 'pastile', helped: 'ajutat', hours: 'ore', sleep: 'a dormi', floor: 'podea', night: 'noapte', off: 'a day off = o zi liberă', month: 'lună', times: 'ori', real: 'adevărat', holiday: 'concediu', advice: 'sfat', beach: 'plajă', email: 'e-mail' },
        questions: [['De cât timp lucrează doctorița la spital?', 'De treizeci de ani.'], ['De când îl doare capul pe tânăr?', 'De luni.'], ['Ce sfat primește?', 'Să doarmă mai mult, să bea apă și să își ia un concediu adevărat.']],
      },
      exercises: [
        { title: 'Participii', instr: 'Scrie participiul verbului.', items: [
          ['see → ___', 'seen'], ['go → ___', 'gone'], ['be → ___', 'been'], ['eat → ___', 'eaten'], ['write → ___', 'written'], ['work → ___', 'worked'], ['buy → ___', 'bought'],
        ] },
        { title: 'Prezent perfect', instr: 'Scrie forma cerută a verbului.', items: [
          ['I ___ this film. (have + see)', ['have seen', "'ve seen"]],
          ['She ___ to London twice. (has + be)', ['has been', "'s been"]],
          ['We ___ here for years. (have + live)', ['have lived', "'ve lived"]],
          ['Have you ever ___ to Spain? (be)', 'been'],
          ["He hasn't ___ his homework yet. (do)", 'done'],
          ["I've never ___ this food. (eat)", 'eaten'],
        ] },
        { title: 'Prezent perfect sau trecut', instr: 'Scrie forma potrivită a verbului.', items: [
          ['I ___ him yesterday. (see)', 'saw'],
          ['We ___ to Paris in 2015. (go)', 'went'],
          ['She ___ here since March. (work)', ['has worked', "'s worked"]],
          ['Last night they ___ a film. (watch)', 'watched'],
          ['I ___ that book three times. (read, experiență)', ['have read', "'ve read"]],
        ] },
        { title: 'For sau since', instr: 'Scrie for sau since.', items: [
          ["I've lived here ___ 2015.", 'since'],
          ["She's worked there ___ ten years.", 'for'],
          ["We've known them ___ a long time.", 'for'],
          ["I've had this cold ___ Monday.", 'since'],
          ["He's been here ___ two hours.", 'for'],
        ] },
        { title: 'Sfaturi și reguli', instr: "Scrie should, mustn't sau don't have to, după sens.", items: [
          ["You're tired. You ___ go to bed early.", 'should'],
          ["It's free. You ___ pay.", "don't have to"],
          ['This is a hospital. You ___ smoke here.', "mustn't"],
          ['It is Sunday. I ___ get up early.', "don't have to"],
          ['You have a cold. You ___ drink hot tea.', 'should'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['Doctor Stan has worked there for thirty years. ___', 'true'],
          ['The young man has already taken tablets. ___', 'true'],
          ['He works during the day. ___', 'false'],
          ['He has often taken real holidays. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Ai fost vreodată în Italia? → ___', ['Have you ever been to Italy', 'Have you ever been in Italy']],
          ['Mă doare capul. → ___', ['I have a headache', "I've got a headache", 'My head hurts']],
          ['Ar trebui să te odihnești. → ___', 'You should rest'],
          ['Locuiesc aici de zece ani. → ___', "I've lived here for ten years"],
          ['Nu mă simt bine. → ___', "I don't feel well"],
        ] },
      ],
    },
  );

  window.ENGLISH_WEEKS.push(
    { n: 10, title: 'Săptămâna 10', units: ['en10'] },
    { n: 11, title: 'Săptămâna 11', units: ['en11'] },
    { n: 12, title: 'Săptămâna 12', units: ['en12'] },
    { n: 13, title: 'Săptămâna 13', units: ['en13'] },
  );

  // Formele scurte si lungi sunt acceptate la fel: "isn't" si "is not".
  const SHORT = [["isn't", 'is not'], ["aren't", 'are not'], ["wasn't", 'was not'], ["weren't", 'were not'], ["don't", 'do not'], ["doesn't", 'does not'], ["didn't", 'did not'], ["haven't", 'have not'], ["hasn't", 'has not'], ["can't", 'cannot'], ["can't", 'can not'], ["won't", 'will not'], ["mustn't", 'must not'], ["shouldn't", 'should not'], ["i'm", 'i am'], ["you're", 'you are'], ["he's", 'he is'], ["she's", 'she is'], ["it's", 'it is'], ["we're", 'we are'], ["they're", 'they are'], ["i've", 'i have'], ["you've", 'you have'], ["we've", 'we have'], ["they've", 'they have'], ["i'll", 'i will'], ["you'll", 'you will'], ["it'll", 'it will'], ["i'd", 'i would'], ["there's", 'there is'], ["what's", 'what is'], ["let's", 'let us'], ["name's", 'name is']];
  const word = (w) => new RegExp(`(^|[^\\p{L}'])${w}(?=[^\\p{L}']|$)`, 'giu');
  function variants(answer) {
    const all = new Set([answer, answer.replace(/,/g, '')]);
    SHORT.forEach(([a, b]) => {
      [...all].forEach((x) => {
        all.add(x.replace(word(a), `$1${b}`));
        all.add(x.replace(word(b), `$1${a}`));
      });
    });
    return [...all];
  }
  window.ENGLISH_UNITS.forEach((u) => {
    u.exercises.forEach((ex) => {
      ex.items.forEach((it) => { it[1] = [...new Set([].concat(it[1]).flatMap(variants))]; });
    });
  });
})();
