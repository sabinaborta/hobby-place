// Engleza A1-A2: unitatile 0-4. Pe situatii din viata de zi cu zi; explicatiile, textele si exercitiile sunt scrise aici.
// Acelasi format ca la spaniola: {title, instr, items: [[propozitie cu ___, raspuns sau [raspunsuri acceptate], indiciu optional]]}
(function () {
  const table = (head, rows) => `<div class="tbl"><table>${head.some(Boolean) ? `<thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>` : ''}<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const TF = 'Scrie true sau false.';

  window.ENGLISH_UNITS = [
    {
      id: 'en0', n: 0, title: 'First words', theme: 'Prima oră: saluturi, prezentare și cum se citește engleza',
      goals: ['Saluți și îți iei rămas-bun', 'Spui cum te cheamă și de unde ești', 'Ceri să ți se repete sau să ți se explice un cuvânt', 'Folosești a și an', 'Recunoști câteva sunete care nu există în română'],
      sections: [
        { h: 'Saluturi și despărțiri', html: table(['Engleză', 'Română', 'Când'], [
          ['<b>Hello</b> / <b>Hi</b>', 'Bună / Salut', 'oricând; hi este mai informal'],
          ['<b>Good morning</b>', 'Bună dimineața', 'până la prânz'],
          ['<b>Good afternoon</b>', 'Bună ziua', 'după prânz, până seara'],
          ['<b>Good evening</b>', 'Bună seara', 'când ajungi undeva, seara'],
          ['<b>Good night</b>', 'Noapte bună', 'doar când pleci sau te culci'],
          ['<b>Goodbye</b> / <b>Bye</b>', 'La revedere / Pa', 'despărțire'],
          ['<b>See you tomorrow</b>', 'Pe mâine', 'despărțire până a doua zi'],
        ]) + `<p class="note"><b>Good night</b> nu este un salut de întâlnire. Când intri într-o cameră seara, spui <b>Good evening</b>.</p>` },
        { h: 'Cum te prezinți', html: table(['Întrebare', 'Răspuns'], [
          ["What's your name?", "My name's Ana. / I'm Ana."],
          ['Where are you from?', "I'm from Romania. / I'm from Cluj."],
          ['How are you?', "I'm fine, thank you. And you?"],
          ['Nice to meet you.', 'Nice to meet you too.'],
        ]) + `<p>Forma scurtă cu apostrof este cea obișnuită în vorbire: <b>I'm</b> = I am, <b>what's</b> = what is, <b>name's</b> = name is.</p>` },
        { h: 'Când nu înțelegi', html: table(['Engleză', 'Română'], [
          ['Sorry?', 'Poftim?'],
          ['Can you repeat that, please?', 'Puteți repeta, vă rog?'],
          ['What does "beach" mean?', 'Ce înseamnă „beach”?'],
          ['How do you say "carte" in English?', 'Cum se spune „carte” în engleză?'],
          ['How do you spell it?', 'Cum se scrie?'],
          ["I don't understand.", 'Nu înțeleg.'],
        ]) },
        { h: 'A și an', html: `<p>Engleza nu are genuri la substantive: același cuvânt pentru „un” și „o”. Spui <b>a</b> înaintea unui sunet consoană și <b>an</b> înaintea unui sunet vocală. Contează sunetul, nu litera.</p>` + table(['a', 'an'], [
          ['a book (o carte)', 'an apple (un măr)'],
          ['a friend (un prieten, o prietenă)', 'an idea (o idee)'],
          ['a university (se aude „iu”)', 'an hour (h nu se aude)'],
        ]) },
        { h: 'Câteva sunete noi', html: `<p>Engleza nu se citește cum se scrie, așa că e bine să asculți cuvintele noi. Câteva sunete cer atenție:</p>` + table(['Sunet', 'Exemple', 'Cum îl faci'], [
          ['th (fără voce)', 'thank you, three', 'limba între dinți, suflu ușor; nu „s”, nu „t”'],
          ['th (cu voce)', 'the, this, mother', 'limba între dinți, cu vibrație; nu „d”, nu „z”'],
          ['w', 'water, what', 'buzele rotunjite ca la „u”; nu „v”'],
          ['h', 'hello, house', 'doar un suflu ușor, mai slab decât h românesc'],
          ['ee / i', 'sheep / ship', 'lung și scurt, schimbă sensul'],
        ]) },
      ],
      reading: {
        title: 'Nice to meet you',
        text: `Maria is in a language class in London. It is the first day. She is from Romania. A man is next to her.

"Hello," he says. "I'm Tom. What's your name?"

"Hi, Tom. My name's Maria. Nice to meet you."

"Nice to meet you too. Where are you from, Maria?"

"I'm from Romania. I'm from Cluj. And you?"

"I'm from Dublin. I'm a teacher."

"Sorry? Can you repeat that, please?"

"Yes, of course. I'm a teacher. And you?"

"I'm a nurse."

The class starts. The teacher says, "Good morning, everyone!" Maria and Tom say, "Good morning!"`,
        glossary: { class: 'curs, clasă', first: 'primul', day: 'zi', man: 'bărbat', next: 'alături (next to = lângă)', says: 'spune', teacher: 'profesor', sorry: 'poftim, scuze', repeat: 'a repeta', course: 'of course = desigur', nurse: 'asistent medical', starts: 'începe', everyone: 'toată lumea' },
        questions: [['De unde este Maria?', 'Din România, din Cluj.'], ['Ce meserie are Tom?', 'Este profesor.'], ['Ce îi cere Maria lui Tom?', 'Să repete ce a spus.']],
      },
      exercises: [
        { title: 'Salutul potrivit', instr: 'Scrie salutul sau formula potrivită, în engleză.', items: [
          ['Este ora 9:00 și saluți: ___', 'Good morning'],
          ['Este ora 15:00 și saluți: ___', 'Good afternoon'],
          ['Este ora 20:00 și ajungi la o cină: ___', 'Good evening'],
          ['Te duci la culcare: ___', 'Good night'],
          ['Pleci și revii mâine: ___', 'See you tomorrow'],
        ] },
        { title: 'Prezentare', instr: 'Completează dialogul.', items: [
          ["What's your ___?", 'name'],
          ["___ Ana.", ["I'm", "My name's"]],
          ['Where are you ___?', 'from'],
          ["I'm ___ Romania.", 'from'],
          ['Nice to ___ you.', 'meet'],
        ] },
        { title: 'A sau an', instr: 'Scrie a sau an.', items: [
          ['___ book', 'a'],
          ['___ apple', 'an'],
          ['___ teacher', 'a'],
          ['___ idea', 'an'],
          ['___ hour', 'an', 'h nu se aude'],
          ['___ university', 'a', 'începe cu sunetul „iu”'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['Maria is from Romania. ___', 'true'],
          ['Tom is a nurse. ___', 'false'],
          ['Tom is from Dublin. ___', 'true'],
          ['It is the last day of the class. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Nu înțeleg. → ___', "I don't understand"],
          ['Cum se scrie? → ___', 'How do you spell it'],
          ['Sunt din România. → ___', "I'm from Romania"],
          ['Mulțumesc. → ___', ['Thank you', 'Thanks']],
        ] },
      ],
    },
    {
      id: 'en1', n: 1, title: 'Who I am', theme: 'Verbul to be, alfabetul, numerele până la 20 și pluralul',
      goals: ['Folosești verbul to be la afirmativ, negativ și interogativ', 'Silabisești un nume', 'Numeri de la 0 la 20', 'Formezi pluralul substantivelor', 'Folosești this, that, these, those'],
      sections: [
        { h: 'Verbul to be', html: `<p>În engleză, subiectul se spune mereu: <b>I am tired</b>, nu doar „am tired”. Asta e o diferență importantă față de română.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ["I am (I'm)", "I am not (I'm not)", 'Am I?'],
          ["you are (you're)", "you are not (you aren't)", 'Are you?'],
          ["he/she/it is (he's, she's, it's)", "he/she/it is not (isn't)", 'Is he/she/it?'],
          ["we are (we're)", "we are not (we aren't)", 'Are we?'],
          ["they are (they're)", "they are not (they aren't)", 'Are they?'],
        ]) + `<p>Răspunsuri scurte: <b>Yes, I am.</b> / <b>No, I'm not.</b> / <b>Yes, she is.</b> / <b>No, she isn't.</b></p><p class="note"><b>You</b> înseamnă și „tu”, și „dumneavoastră”, și „voi”. <b>It</b> se folosește pentru obiecte și animale.</p>` },
        { h: 'Alfabetul', html: `<p>Pronunția literelor, scrisă aproximativ cu sunete românești:</p>` + table(['', '', '', ''], [
          ['A ei', 'B bi', 'C si', 'D di'], ['E i', 'F ef', 'G gi', 'H eici'], ['I ai', 'J gei', 'K kei', 'L el'], ['M em', 'N en', 'O ou', 'P pi'], ['Q chiu', 'R ar', 'S es', 'T ti'], ['U iu', 'V vi', 'W dabliu', 'X ecs'], ['Y uai', 'Z zed', '', ''],
        ]) + `<p class="note">Atenție la perechile <b>E</b> și <b>I</b>, <b>G</b> și <b>J</b>: sunt cele mai des confundate.</p>` },
        { h: 'Numerele de la 0 la 20', html: table(['', '', '', ''], [
          ['0 zero', '1 one', '2 two', '3 three'], ['4 four', '5 five', '6 six', '7 seven'], ['8 eight', '9 nine', '10 ten', '11 eleven'], ['12 twelve', '13 thirteen', '14 fourteen', '15 fifteen'], ['16 sixteen', '17 seventeen', '18 eighteen', '19 nineteen'], ['20 twenty', '', '', ''],
        ]) + `<p>La telefon, cifra 0 se spune de obicei <b>oh</b>: <b>oh seven two…</b></p>` },
        { h: 'Pluralul', html: table(['Regulă', 'Exemple'], [
          ['de obicei + s', 'book → books, friend → friends'],
          ['după s, ss, sh, ch, x + es', 'bus → buses, class → classes, watch → watches'],
          ['consoană + y → ies', 'city → cities, baby → babies'],
          ['neregulate', 'man → men, woman → women, child → children, person → people'],
        ]) },
        { h: 'This, that, these, those', html: table(['', 'aproape', 'departe'], [
          ['singular', 'this book (cartea aceasta)', 'that book (cartea aceea)'],
          ['plural', 'these books (cărțile acestea)', 'those books (cărțile acelea)'],
        ]) },
      ],
      reading: {
        title: 'The new neighbours',
        text: `This is my street. It is small and quiet. These houses are old, but they are nice. That blue house is new, and the people in it are new too.

My name is Elena and I am forty. I am a doctor. My new neighbours are from Scotland. Their names are Fiona and David. They are not old. They are about thirty.

"Are you from Edinburgh?" I ask.

"No, we aren't," says Fiona. "We are from Glasgow. My name is Fiona, F-I-O-N-A."

"Are you a doctor too?"

"No, I'm not. I'm a cook. David is a taxi driver."

They are friendly. I am happy. Good neighbours are important.`,
        glossary: { street: 'stradă', small: 'mic', quiet: 'liniștit', houses: 'case', old: 'vechi, bătrân', nice: 'frumos, drăguț', blue: 'albastru', new: 'nou', people: 'oameni', doctor: 'medic', neighbours: 'vecini', their: 'lor', about: 'aproximativ', ask: 'întreb', cook: 'bucătar', driver: 'șofer', friendly: 'prietenos', happy: 'bucuros', important: 'important' },
        questions: [['De unde sunt vecinii?', 'Din Scoția, din Glasgow.'], ['Ce meserie are Elena?', 'Este medic.'], ['Ce meserie are David?', 'Este șofer de taxi.']],
      },
      exercises: [
        { title: 'To be', instr: 'Scrie am, is sau are.', items: [
          ['I ___ from Romania.', 'am'],
          ['She ___ a doctor.', 'is'],
          ['We ___ friends.', 'are'],
          ['They ___ in London.', 'are'],
          ['It ___ a small house.', 'is'],
          ['You ___ very nice.', 'are'],
        ] },
        { title: 'Negativ și întrebări', instr: 'Scrie forma cerută a verbului to be.', items: [
          ['He ___ a teacher. (negativ)', "isn't"],
          ['I ___ tired. (negativ)', ['am not', "'m not"]],
          ['___ you from Italy?', 'Are'],
          ['___ she your friend?', 'Is'],
          ['Are they at home? No, they ___.', "aren't"],
          ['Is he a cook? Yes, he ___.', 'is'],
        ] },
        { title: 'Numere', instr: 'Scrie numărul cu litere.', items: [
          ['3 → ___', 'three'], ['8 → ___', 'eight'], ['12 → ___', 'twelve'], ['15 → ___', 'fifteen'], ['20 → ___', 'twenty'],
        ] },
        { title: 'Plural', instr: 'Scrie pluralul.', items: [
          ['book → ___', 'books'], ['bus → ___', 'buses'], ['city → ___', 'cities'], ['child → ___', 'children'], ['woman → ___', 'women'], ['person → ___', 'people'],
        ] },
        { title: 'This, that, these, those', instr: 'Completează. „Aici” înseamnă aproape, „acolo” înseamnă departe.', items: [
          ['___ book is good. (aici)', 'This'],
          ['___ houses are old. (acolo)', 'Those'],
          ['___ man is my friend. (acolo)', 'That'],
          ['___ apples are nice. (aici)', 'These'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['Elena is a doctor. ___', 'true'],
          ['The neighbours are from Edinburgh. ___', 'false'],
          ['Fiona is a cook. ___', 'true'],
          ['David is a doctor. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Nu sunt profesor. → ___', "I'm not a teacher"],
          ['Ei sunt din Scoția. → ___', "They're from Scotland"],
          ['Ești din București? → ___', 'Are you from Bucharest'],
          ['Casa aceasta este mică. → ___', 'This house is small'],
        ] },
      ],
    },
    {
      id: 'en2', n: 2, title: 'People I love', theme: 'Familia, have got, posesia și descrierea oamenilor',
      goals: ['Vorbești despre familie', 'Folosești have got și has got', 'Folosești my, your, his, her și forma cu \'s', 'Spui vârsta corect', 'Descrii o persoană', 'Numeri până la 100'],
      sections: [
        { h: 'Familia', html: table(['Engleză', 'Română', 'Engleză', 'Română'], [
          ['mother / mum', 'mamă', 'father / dad', 'tată'],
          ['sister', 'soră', 'brother', 'frate'],
          ['daughter', 'fiică', 'son', 'fiu'],
          ['wife', 'soție', 'husband', 'soț'],
          ['grandmother', 'bunică', 'grandfather', 'bunic'],
          ['aunt', 'mătușă', 'uncle', 'unchi'],
          ['parents', 'părinți', 'children', 'copii'],
        ]) },
        { h: 'Have got', html: `<p>Pentru „a avea” (familie, lucruri, trăsături), în engleza britanică se spune des <b>have got</b>. La he, she, it devine <b>has got</b>.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ["I have got (I've got)", "I haven't got", 'Have you got…?'],
          ["she has got (she's got)", "she hasn't got", 'Has she got…?'],
          ["we have got (we've got)", "we haven't got", 'Have they got…?'],
        ]) + `<p>Răspuns scurt: <b>Yes, I have.</b> / <b>No, she hasn't.</b></p>` },
        { h: 'Vârsta se spune cu to be', html: `<p>În română „am 30 de ani”, dar în engleză „sunt 30”: <b>I am thirty.</b> sau <b>I am thirty years old.</b> Întrebarea este <b>How old are you?</b></p><p class="note">Nu spune niciodată <b>I have thirty years</b>: este greșeala tipică a vorbitorilor de română.</p>` },
        { h: 'Al cui este', html: table(['Pronume', 'Posesiv', 'Exemplu'], [
          ['I', 'my', 'my sister (sora mea)'], ['you', 'your', 'your name (numele tău)'], ['he', 'his', 'his wife (soția lui)'], ['she', 'her', 'her husband (soțul ei)'], ['it', 'its', 'its name (numele lui, al animalului)'], ['we', 'our', 'our house (casa noastră)'], ['they', 'their', 'their children (copiii lor)'],
        ]) + `<p>Pentru o persoană numită folosești <b>'s</b>: <b>Ana's brother</b> (fratele Anei), <b>my mother's car</b> (mașina mamei mele).</p><p class="note">Posesivul nu se schimbă după ce urmează: <b>my brother, my sister, my friends</b>.</p>` },
        { h: 'Descrierea oamenilor', html: `<p>Adjectivul stă înaintea substantivului și nu are plural: <b>a tall man</b>, <b>tall men</b>.</p>` + table(['Engleză', 'Română', 'Engleză', 'Română'], [
          ['tall / short', 'înalt / scund', 'young / old', 'tânăr / bătrân'],
          ['long / short hair', 'păr lung / scurt', 'dark / fair hair', 'păr închis / blond'],
          ['kind', 'bun, amabil', 'funny', 'amuzant'],
          ['quiet', 'liniștit', 'clever', 'isteț'],
        ]) },
        { h: 'Numerele până la 100', html: `<p><b>30</b> thirty, <b>40</b> forty, <b>50</b> fifty, <b>60</b> sixty, <b>70</b> seventy, <b>80</b> eighty, <b>90</b> ninety, <b>100</b> a hundred. La compuse se pune cratimă: <b>21</b> twenty-one, <b>47</b> forty-seven.</p><p class="note">Se scrie <b>forty</b>, fără u. Atenție la pronunție: <b>thirteen</b> are accent la final, <b>thirty</b> la început.</p>` },
      ],
      reading: {
        title: 'A photo on the wall',
        text: `There is a big photo on my wall. It is my family. This is my mother, Rodica. She is sixty-four. She has got short grey hair and she is very kind. My father's name is Ion. He is seventy and he is tall and funny.

I have got one sister and one brother. My sister's name is Irina. She is a teacher and she has got two children, a boy and a girl. Their names are Matei and Ioana. Matei is twelve and Ioana is nine.

My brother, Andrei, is in Canada. He hasn't got children, but he has got a big dog. Its name is Bruno.

We are not often together, but this photo is always here.`,
        glossary: { photo: 'fotografie', wall: 'perete', family: 'familie', grey: 'gri, cărunt', hair: 'păr', kind: 'bun, amabil', tall: 'înalt', funny: 'amuzant', boy: 'băiat', girl: 'fată', dog: 'câine', often: 'des', together: 'împreună', always: 'mereu', here: 'aici', big: 'mare' },
        questions: [['Câți ani are mama?', 'Șaizeci și patru.'], ['Câți copii are Irina?', 'Doi: Matei și Ioana.'], ['Unde este Andrei?', 'În Canada.']],
      },
      exercises: [
        { title: 'Have got', instr: 'Scrie have sau has.', items: [
          ['I ___ got two sisters.', 'have'],
          ['She ___ got a big family.', 'has'],
          ['We ___ got a small car.', 'have'],
          ['He ___ got short hair.', 'has'],
          ['___ you got children?', 'Have'],
          ['___ your brother got a dog?', 'Has'],
        ] },
        { title: 'Posesive', instr: 'Scrie my, your, his, her, our sau their.', items: [
          ['I am Dan. ___ name is Dan.', 'My'],
          ['This is Ana. ___ son is ten.', 'Her'],
          ['This is Tom. ___ wife is a nurse.', 'His'],
          ['We have got a house. ___ house is small.', 'Our'],
          ['They have got a dog. ___ dog is old.', 'Their'],
          ['Are you Maria? What is ___ phone number?', 'your'],
        ] },
        { title: 'Forma cu \'s', instr: 'Scrie în engleză cu \'s.', items: [
          ['fratele Anei → ___', "Ana's brother"],
          ['mașina lui Tom → ___', "Tom's car"],
          ['numele mamei mele → ___', "my mother's name"],
          ['câinele lui Andrei → ___', "Andrei's dog"],
        ] },
        { title: 'Numere', instr: 'Scrie numărul cu litere.', items: [
          ['21 → ___', 'twenty-one'], ['34 → ___', 'thirty-four'], ['40 → ___', 'forty'], ['58 → ___', 'fifty-eight'], ['90 → ___', 'ninety'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['The mother has got long hair. ___', 'false'],
          ['Irina has got two children. ___', 'true'],
          ['Andrei is in Canada. ___', 'true'],
          ['Bruno is a child. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Am patruzeci de ani. → ___', ["I'm forty", "I'm forty years old"], 'vârsta se spune cu to be'],
          ['Câți ani ai? → ___', 'How old are you'],
          ['Am o soră. → ___', ["I've got a sister", 'I have a sister', "I've got one sister", 'I have one sister']],
          ['Ea nu are copii. → ___', ["She hasn't got children", "She hasn't got any children", "She doesn't have children"]],
        ] },
      ],
    },
    {
      id: 'en3', n: 3, title: 'My day', theme: 'Prezentul simplu, ora, zilele și obiceiurile',
      goals: ['Folosești prezentul simplu', 'Pui întrebări cu do și does', 'Spui cât este ceasul', 'Spui cât de des faci ceva', 'Folosești in, on, at pentru timp'],
      sections: [
        { h: 'Prezentul simplu', html: `<p>Îl folosești pentru obiceiuri și lucruri mereu adevărate. Verbul rămâne la fel, în afară de he, she, it, unde primește <b>-s</b>.</p>` + table(['Afirmativ', 'Negativ', 'Interogativ'], [
          ['I work', "I don't work", 'Do I work?'],
          ['you work', "you don't work", 'Do you work?'],
          ['he/she/it works', "he/she/it doesn't work", 'Does he/she/it work?'],
          ['we work', "we don't work", 'Do we work?'],
          ['they work', "they don't work", 'Do they work?'],
        ]) + `<p>Răspuns scurt: <b>Yes, I do.</b> / <b>No, she doesn't.</b></p><p class="note">După <b>doesn't</b> și <b>does</b>, verbul nu mai primește -s: <b>She doesn't work. Does she work?</b></p>` },
        { h: 'Forma cu -s la he, she, it', html: table(['Regulă', 'Exemple'], [
          ['de obicei + s', 'work → works, read → reads'],
          ['după s, sh, ch, x, o + es', 'watch → watches, go → goes, do → does'],
          ['consoană + y → ies', 'study → studies, fly → flies'],
          ['neregulat', 'have → has'],
        ]) },
        { h: 'Rutina zilnică', html: table(['Engleză', 'Română', 'Engleză', 'Română'], [
          ['get up', 'a se trezi, a se da jos din pat', 'have breakfast', 'a lua micul dejun'],
          ['have a shower', 'a face duș', 'go to work', 'a merge la muncă'],
          ['have lunch', 'a lua prânzul', 'come home', 'a veni acasă'],
          ['have dinner', 'a lua cina', 'go to bed', 'a merge la culcare'],
        ]) },
        { h: 'Cât este ceasul', html: table(['Ora', 'Se spune'], [
          ['7:00', "It's seven o'clock."],
          ['7:15', "It's quarter past seven."],
          ['7:30', "It's half past seven."],
          ['7:45', "It's quarter to eight."],
          ['7:10', "It's ten past seven."],
          ['7:50', "It's ten to eight."],
        ]) + `<p>Întrebarea: <b>What time is it?</b> La ce oră: <b>What time do you get up? At seven.</b></p><p class="note"><b>Half past seven</b> înseamnă 7:30: o jumătate de oră după ora șapte.</p>` },
        { h: 'Cât de des', html: `<p><b>always</b> mereu, <b>usually</b> de obicei, <b>often</b> des, <b>sometimes</b> uneori, <b>never</b> niciodată.</p><p>Stau <b>înaintea</b> verbului obișnuit, dar <b>după</b> to be: <b>I always get up early. She is never late.</b></p><p class="note"><b>Never</b> nu se combină cu not. Spui <b>I never drink coffee</b>, nu „I don't never”.</p>` },
        { h: 'Zile și prepoziții de timp', html: `<p>Zilele se scriu cu majusculă: <b>Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday</b>.</p>` + table(['Prepoziție', 'Cu ce', 'Exemple'], [
          ['at', 'ore', "at seven o'clock, at night"],
          ['on', 'zile', 'on Monday, on Sundays'],
          ['in', 'părți ale zilei, luni, ani', 'in the morning, in June, in 2020'],
        ]) },
      ],
      reading: {
        title: "Dan's week",
        text: `Dan is a bus driver in Brasov. He usually gets up at half past five. He has a shower and a small breakfast, usually coffee and bread. He starts work at seven o'clock.

He likes his job because he meets a lot of people. He doesn't like the traffic. He has lunch at one o'clock and he comes home at four.

His wife, Carmen, works in a shop. She doesn't start early, so she takes their son to school. In the evening they have dinner together. They sometimes watch a film, but Dan never stays awake to the end.

On Saturdays he plays football with his friends. On Sundays he doesn't do much. He reads the news, goes for a walk and goes to bed early.`,
        glossary: { gets: 'gets up = se trezește', coffee: 'cafea', bread: 'pâine', job: 'slujbă', because: 'pentru că', meets: 'întâlnește', traffic: 'trafic', shop: 'magazin', early: 'devreme', takes: 'duce', son: 'fiu', school: 'școală', watch: 'a se uita la', film: 'film', stays: 'rămâne', awake: 'treaz', end: 'sfârșit', plays: 'joacă', friends: 'prieteni', news: 'știri', walk: 'plimbare', evening: 'seară', lunch: 'prânz' },
        questions: [['La ce oră începe Dan lucrul?', 'La ora șapte.'], ['Ce nu îi place la slujbă?', 'Traficul.'], ['Ce face sâmbăta?', 'Joacă fotbal cu prietenii.']],
      },
      exercises: [
        { title: 'Prezent simplu', instr: 'Scrie verbul la forma corectă.', items: [
          ['I ___ in an office. (work)', 'work'],
          ['She ___ English. (study)', 'studies'],
          ['He ___ to work by bus. (go)', 'goes'],
          ['We ___ dinner at seven. (have)', 'have'],
          ['My father ___ the news. (watch)', 'watches'],
          ['They ___ in Cluj. (live)', 'live'],
          ['Ana ___ two sisters. (have)', 'has'],
        ] },
        { title: 'Negativ', instr: "Scrie don't sau doesn't.", items: [
          ['I ___ like coffee.', "don't"],
          ['She ___ work on Sundays.', "doesn't"],
          ['We ___ watch TV.', "don't"],
          ['Tom ___ speak Romanian.', "doesn't"],
          ['My parents ___ live here.', "don't"],
        ] },
        { title: 'Întrebări', instr: 'Scrie Do sau Does.', items: [
          ['___ you speak English?', 'Do'],
          ['___ she live here?', 'Does'],
          ['___ they have children?', 'Do'],
          ['What time ___ he get up?', 'does'],
          ['Where ___ you work?', 'do'],
        ] },
        { title: 'Ora', instr: 'Scrie ora în cuvinte, fără „It\'s”.', items: [
          ['8:00 → ___', "eight o'clock"],
          ['8:30 → ___', 'half past eight'],
          ['8:15 → ___', 'quarter past eight'],
          ['8:45 → ___', 'quarter to nine'],
          ['8:50 → ___', 'ten to nine'],
        ] },
        { title: 'In, on, at', instr: 'Scrie in, on sau at.', items: [
          ['___ Monday', 'on'],
          ['___ six o\'clock', 'at'],
          ['___ the morning', 'in'],
          ['___ June', 'in'],
          ['___ Saturdays', 'on'],
          ['___ night', 'at'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['Dan is a bus driver. ___', 'true'],
          ['He likes the traffic. ___', 'false'],
          ['Carmen works in a shop. ___', 'true'],
          ['Dan plays football on Sundays. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Mă trezesc la șapte. → ___', ["I get up at seven", "I get up at seven o'clock"]],
          ['Ea nu bea niciodată cafea. → ___', 'She never drinks coffee'],
          ['Unde lucrezi? → ___', 'Where do you work'],
          ['El merge la culcare devreme. → ___', 'He goes to bed early'],
        ] },
      ],
    },
    {
      id: 'en4', n: 4, title: 'Where I live', theme: 'Casa, there is și there are, prepoziții de loc',
      goals: ['Descrii o casă sau un oraș', 'Folosești there is și there are', 'Spui unde se află ceva', 'Folosești some, any și the'],
      sections: [
        { h: 'Casa', html: table(['Engleză', 'Română', 'Engleză', 'Română'], [
          ['flat', 'apartament', 'house', 'casă'],
          ['kitchen', 'bucătărie', 'bathroom', 'baie'],
          ['bedroom', 'dormitor', 'living room', 'sufragerie'],
          ['table', 'masă', 'chair', 'scaun'],
          ['bed', 'pat', 'sofa', 'canapea'],
          ['fridge', 'frigider', 'window', 'fereastră'],
          ['floor', 'podea, etaj', 'garden', 'grădină'],
        ]) },
        { h: 'There is, there are', html: `<p>Echivalentul lui „este” și „sunt” când spui că ceva există într-un loc.</p>` + table(['', 'Singular', 'Plural'], [
          ['Afirmativ', "There is (there's) a table.", 'There are two chairs.'],
          ['Negativ', "There isn't a garden.", "There aren't any chairs."],
          ['Interogativ', 'Is there a garden?', 'Are there any chairs?'],
          ['Răspuns', "Yes, there is. / No, there isn't.", "Yes, there are. / No, there aren't."],
        ]) + `<p class="note">Întrebarea „câte sunt?” este <b>How many chairs are there?</b></p>` },
        { h: 'Some, any', html: table(['Când', 'Cuvânt', 'Exemplu'], [
          ['afirmativ', 'some', 'There are some books on the table.'],
          ['negativ', 'any', "There aren't any books."],
          ['întrebare', 'any', 'Are there any books?'],
        ]) },
        { h: 'Unde se află', html: table(['Engleză', 'Română', 'Exemplu'], [
          ['in', 'în', 'in the kitchen'],
          ['on', 'pe', 'on the table'],
          ['under', 'sub', 'under the bed'],
          ['next to', 'lângă', 'next to the window'],
          ['behind', 'în spatele', 'behind the door'],
          ['in front of', 'în fața', 'in front of the house'],
          ['between', 'între', 'between the bank and the shop'],
          ['opposite', 'vizavi de', 'opposite the park'],
        ]) + `<p class="note">Spui <b>in Iasi</b> pentru oraș și <b>on the second floor</b> pentru etaj. <b>At home</b> înseamnă „acasă”, fără the.</p>` },
        { h: 'The', html: `<p><b>The</b> are aceeași formă pentru toate cuvintele. Îl folosești când e clar despre ce e vorba: <b>I've got a flat. The flat is small.</b></p><p>Nu îl folosești la lucruri în general: <b>I like books</b> (îmi plac cărțile, în general). Tot fără the: <b>at home, at work, to school, to bed</b>.</p><p class="note">Se citește „dă”, cu sunetul th, și „di” înaintea unei vocale: <b>the apple</b>.</p>` },
      ],
      reading: {
        title: 'A flat near the river',
        text: `Hi Laura,

I have got a new flat! It is in the centre of Sibiu, near the river. It is on the third floor and there is a small balcony.

There are three rooms: a living room, a bedroom and a kitchen. There is also a small bathroom. There isn't a garden, but there is a park opposite the building.

In the living room there is an old sofa and a big table. There aren't any pictures on the walls yet. My books are still in boxes under the table!

There is a good bakery next to the building and a bus stop in front of it. Are there any good shops near your house?

Come and see me in May!

Love,
Sorin`,
        glossary: { centre: 'centru', near: 'aproape de', river: 'râu', third: 'al treilea', floor: 'etaj', balcony: 'balcon', rooms: 'camere', also: 'de asemenea', park: 'parc', opposite: 'vizavi de', building: 'clădire', pictures: 'tablouri', walls: 'pereți', yet: 'încă', still: 'încă', boxes: 'cutii', under: 'sub', bakery: 'brutărie', stop: 'stație', front: 'in front of = în fața', love: 'cu drag' },
        questions: [['La ce etaj este apartamentul?', 'La etajul trei.'], ['Ce este vizavi de clădire?', 'Un parc.'], ['Unde sunt cărțile?', 'În cutii, sub masă.']],
      },
      exercises: [
        { title: 'There is, there are', instr: 'Scrie is sau are.', items: [
          ['There ___ a sofa in the room.', 'is'],
          ['There ___ two beds.', 'are'],
          ['There ___ some books on the table.', 'are'],
          ['There ___ a bank near here.', 'is'],
          ['___ there a garden?', 'Is'],
          ['___ there any chairs?', 'Are'],
        ] },
        { title: 'Some sau any', instr: 'Scrie some sau any.', items: [
          ['There are ___ pictures on the wall.', 'some'],
          ["There aren't ___ shops here.", 'any'],
          ['Are there ___ parks near your house?', 'any'],
          ['I have got ___ friends in Sibiu.', 'some'],
          ["We haven't got ___ chairs.", 'any'],
        ] },
        { title: 'Unde se află', instr: 'Scrie prepoziția în engleză.', items: [
          ['The cat is ___ the bed. (sub)', 'under'],
          ['The book is ___ the table. (pe)', 'on'],
          ['The milk is ___ the fridge. (în)', 'in'],
          ['The chair is ___ the window. (lângă)', 'next to'],
          ['The car is ___ the house. (în fața)', 'in front of'],
          ['The park is ___ the school. (vizavi de)', 'opposite'],
        ] },
        { title: 'Camere și lucruri', instr: 'Scrie cuvântul în engleză.', items: [
          ['bucătărie → ___', 'kitchen'],
          ['dormitor → ___', 'bedroom'],
          ['fereastră → ___', 'window'],
          ['scaun → ___', 'chair'],
          ['apartament → ___', 'flat'],
        ] },
        { title: 'Lectură: adevărat sau fals', instr: TF, items: [
          ['The flat is in Sibiu. ___', 'true'],
          ['There is a garden. ___', 'false'],
          ['There is a bakery next to the building. ___', 'true'],
          ['There are pictures on the walls. ___', 'false'],
        ] },
        { title: 'Traducere', instr: 'Tradu în engleză.', items: [
          ['Este un parc lângă casa mea. → ___', ['There is a park next to my house', 'There is a park near my house']],
          ['Nu sunt scaune. → ___', ["There aren't any chairs", 'There are no chairs']],
          ['Este o bancă aici? → ___', ['Is there a bank here', 'Is there a bank near here']],
          ['Pisica este sub masă. → ___', 'The cat is under the table'],
        ] },
      ],
    },
  ];

  window.ENGLISH_WEEKS = [
    { n: 1, title: 'Săptămâna 1', units: ['en0', 'en1'] },
    { n: 2, title: 'Săptămâna 2', units: ['en2'] },
    { n: 3, title: 'Săptămâna 3', units: ['en3'] },
    { n: 4, title: 'Săptămâna 4', units: ['en4'] },
  ];
})();
