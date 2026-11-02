// Cele 100 de clasice: titlu românesc | titlu original | autor | gen | ro (autor român)
(function () {
  const raw = `Orgoliu și prejudecată|Pride and Prejudice|Jane Austen|Roman
Rațiune și simțire|Sense and Sensibility|Jane Austen|Roman
Emma|Emma|Jane Austen|Roman
Jane Eyre|Jane Eyre|Charlotte Brontë|Roman
La răscruce de vânturi|Wuthering Heights|Emily Brontë|Roman
Frankenstein|Frankenstein|Mary Shelley|Roman
Dracula|Dracula|Bram Stoker|Roman
Marile speranțe|Great Expectations|Charles Dickens|Roman
Oliver Twist|Oliver Twist|Charles Dickens|Roman
Poveste despre două orașe|A Tale of Two Cities|Charles Dickens|Roman
David Copperfield|David Copperfield|Charles Dickens|Roman
Moby Dick|Moby Dick|Herman Melville|Roman
Aventurile lui Tom Sawyer|The Adventures of Tom Sawyer|Mark Twain|Roman
Aventurile lui Huckleberry Finn|Adventures of Huckleberry Finn|Mark Twain|Roman
Alice în Țara Minunilor|Alice's Adventures in Wonderland|Lewis Carroll|Roman
Portretul lui Dorian Gray|The Picture of Dorian Gray|Oscar Wilde|Roman
Insula comorilor|Treasure Island|Robert Louis Stevenson|Roman
Doctorul Jekyll și domnul Hyde|Strange Case of Dr Jekyll and Mr Hyde|Robert Louis Stevenson|Povestiri
Robinson Crusoe|Robinson Crusoe|Daniel Defoe|Roman
Călătoriile lui Gulliver|Gulliver's Travels|Jonathan Swift|Roman
Ivanhoe|Ivanhoe|Walter Scott|Roman
Cartea junglei|The Jungle Book|Rudyard Kipling|Povestiri
Aventurile lui Sherlock Holmes|The Adventures of Sherlock Holmes|Arthur Conan Doyle|Povestiri
Câinele din Baskerville|The Hound of the Baskervilles|Arthur Conan Doyle|Roman
Mașina timpului|The Time Machine|H. G. Wells|Roman
Războiul lumilor|The War of the Worlds|H. G. Wells|Roman
Inimă de întuneric|Heart of Darkness|Joseph Conrad|Povestiri
Fiicele doctorului March|Little Women|Louisa May Alcott|Roman
Anne de la Green Gables|Anne of Green Gables|L. M. Montgomery|Roman
Grădina secretă|The Secret Garden|Frances Hodgson Burnett|Roman
Marele Gatsby|The Great Gatsby|F. Scott Fitzgerald|Roman
Chemarea străbunilor|The Call of the Wild|Jack London|Roman
Colț Alb|White Fang|Jack London|Roman
Ulise|Ulysses|James Joyce|Roman
Doamna Dalloway|Mrs Dalloway|Virginia Woolf|Roman
1984|Nineteen Eighty-Four|George Orwell|Roman
Ferma animalelor|Animal Farm|George Orwell|Roman
Crimă și pedeapsă|Crime and Punishment|F. M. Dostoievski|Roman
Frații Karamazov|The Brothers Karamazov|F. M. Dostoievski|Roman
Idiotul|The Idiot|F. M. Dostoievski|Roman
Anna Karenina|Anna Karenina|Lev Tolstoi|Roman
Război și pace|War and Peace|Lev Tolstoi|Roman
Moartea lui Ivan Ilici|The Death of Ivan Ilyich|Lev Tolstoi|Povestiri
Părinți și copii|Fathers and Sons|Ivan Turgheniev|Roman
Suflete moarte|Dead Souls|Nikolai Gogol|Roman
Evgheni Oneghin|Eugene Onegin|Aleksandr Pușkin|Poezie
Un erou al timpului nostru|A Hero of Our Time|Mihail Lermontov|Roman
Mizerabilii|Les Misérables|Victor Hugo|Roman
Notre-Dame de Paris|The Hunchback of Notre-Dame|Victor Hugo|Roman
Contele de Monte-Cristo|The Count of Monte Cristo|Alexandre Dumas|Roman
Cei trei mușchetari|The Three Musketeers|Alexandre Dumas|Roman
Doamna Bovary|Madame Bovary|Gustave Flaubert|Roman
Roșu și negru|The Red and the Black|Stendhal|Roman
Moș Goriot|Father Goriot|Honoré de Balzac|Roman
Candide|Candide|Voltaire|Povestiri
Germinal|Germinal|Émile Zola|Roman
Bel-Ami|Bel Ami|Guy de Maupassant|Roman
Ocolul Pământului în 80 de zile|Around the World in Eighty Days|Jules Verne|Roman
Douăzeci de mii de leghe sub mări|Twenty Thousand Leagues Under the Sea|Jules Verne|Roman
Călătorie spre centrul Pământului|Journey to the Center of the Earth|Jules Verne|Roman
În căutarea timpului pierdut|Swann's Way|Marcel Proust|Roman
Fantoma de la Operă|The Phantom of the Opera|Gaston Leroux|Roman
Don Quijote|Don Quixote|Miguel de Cervantes|Roman
Divina Comedie|The Divine Comedy|Dante Alighieri|Epopee
Decameronul|The Decameron|Giovanni Boccaccio|Povestiri
Aventurile lui Pinocchio|The Adventures of Pinocchio|Carlo Collodi|Roman
Logodnicii|The Betrothed|Alessandro Manzoni|Roman
Faust|Faust|J. W. von Goethe|Teatru
Suferințele tânărului Werther|The Sorrows of Young Werther|J. W. von Goethe|Roman
Procesul|The Trial|Franz Kafka|Roman
Metamorfoza|Metamorphosis|Franz Kafka|Povestiri
Casa Buddenbrook|Buddenbrooks|Thomas Mann|Roman
Iliada|The Iliad|Homer|Epopee
Odiseea|The Odyssey|Homer|Epopee
Eneida|The Aeneid|Virgiliu|Epopee
Metamorfoze|Metamorphoses|Ovidiu|Poezie
Hamlet|Hamlet|William Shakespeare|Teatru
Romeo și Julieta|Romeo and Juliet|William Shakespeare|Teatru
Macbeth|Macbeth|William Shakespeare|Teatru
Regele Lear|King Lear|William Shakespeare|Teatru
Visul unei nopți de vară|A Midsummer Night's Dream|William Shakespeare|Teatru
Oedip rege|Oedipus Rex|Sofocle|Teatru
Antigona|Antigone|Sofocle|Teatru
Avarul|The Miser|Molière|Teatru
Tartuffe|Tartuffe|Molière|Teatru
Ce înseamnă să fii onest|The Importance of Being Earnest|Oscar Wilde|Teatru
Livada de vișini|The Cherry Orchard|Anton Cehov|Teatru
O casă de păpuși|A Doll's House|Henrik Ibsen|Teatru
Fire de iarbă|Leaves of Grass|Walt Whitman|Poezie
Florile răului|The Flowers of Evil|Charles Baudelaire|Poezie
Poezii|Poezii|Mihai Eminescu|Poezie|ro
Amintiri din copilărie|Amintiri din copilărie|Ion Creangă|Roman|ro
Povești|Povești|Ion Creangă|Povestiri|ro
Ion|Ion|Liviu Rebreanu|Roman|ro
Pădurea spânzuraților|Pădurea spânzuraților|Liviu Rebreanu|Roman|ro
O scrisoare pierdută|O scrisoare pierdută|I. L. Caragiale|Teatru|ro
O noapte furtunoasă|O noapte furtunoasă|I. L. Caragiale|Teatru|ro
Mara|Mara|Ioan Slavici|Roman|ro
Moara cu noroc|Moara cu noroc|Ioan Slavici|Povestiri|ro
Alexandru Lăpușneanul|Alexandru Lăpușneanul|Costache Negruzzi|Povestiri|ro
Meditații|Meditations|Marcus Aurelius|Non-ficțiune
Arta războiului|The Art of War|Sun Tzu|Non-ficțiune
Originea speciilor|On the Origin of Species|Charles Darwin|Non-ficțiune
Walden|Walden|Henry David Thoreau|Non-ficțiune
Autobiografie|Autobiography of Benjamin Franklin|Benjamin Franklin|Non-ficțiune
Republica|The Republic|Platon|Non-ficțiune
Principele|The Prince|Niccolò Machiavelli|Non-ficțiune
Avuția națiunilor|The Wealth of Nations|Adam Smith|Non-ficțiune
Despre libertate|On Liberty|John Stuart Mill|Non-ficțiune
Relativitatea|Relativity|Albert Einstein|Non-ficțiune
Călătorie pe Beagle|The Voyage of the Beagle|Charles Darwin|Non-ficțiune
Cum gândește omul|As a Man Thinketh|James Allen|Non-ficțiune
Povestea vieții mele|The Story of My Life|Helen Keller|Non-ficțiune
Interpretarea viselor|The Interpretation of Dreams|Sigmund Freud|Non-ficțiune
Viața lui Frederick Douglass|Narrative of the Life of Frederick Douglass|Frederick Douglass|Non-ficțiune
Eseuri|Essays: First Series|Ralph Waldo Emerson|Non-ficțiune
Bunul-simț|Common Sense|Thomas Paine|Non-ficțiune
Democrația în America|Democracy in America|Alexis de Tocqueville|Non-ficțiune
Manualul lui Epictet|The Enchiridion|Epictet|Non-ficțiune
Elementele stilului|The Elements of Style|William Strunk|Non-ficțiune`;

  window.BOOKS = raw.split('\n').map((line, i) => {
    const [title, orig, author, genre, ro] = line.split('|');
    return { id: 'b' + (i + 1), title, orig, author, genre, ro: ro === 'ro' };
  });
})();
