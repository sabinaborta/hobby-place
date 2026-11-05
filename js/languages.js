// Limbile din Invatat: aceleasi pagini, fiecare cu datele si progresul ei.
(function () {
  window.LANGS = [
    {
      id: 'spaniola', name: 'Spaniolă', inLang: 'în spaniolă', code: 'es', voice: 'es-ES', prefix: 'es', unitPattern: 'u\\d+',
      units: window.SPANISH_UNITS, weeks: window.SPANISH_WEEKS, next: window.SPANISH_NEXT, stories: window.STORIES, book: window.SPANISH_BOOK,
      wordsKey: 'words', customKey: 'customStories', dictKey: 'dictation',
      nearWord: 'Atenție la accent', nearText: 'Aproape: verifică accentele.',
      lead: 'Unitățile urmează ordinea din <i>Gente Hoy 1</i>.', listNote: 'După manualul Gente Hoy 1',
    },
    {
      id: 'engleza', name: 'Engleză', inLang: 'în engleză', code: 'en', voice: 'en-GB', prefix: 'en', unitPattern: 'en\\d+',
      units: window.ENGLISH_UNITS, weeks: window.ENGLISH_WEEKS, next: [], stories: window.ENGLISH_STORIES, book: null,
      wordsKey: 'wordsEn', customKey: 'customStoriesEn', dictKey: 'dictationEn',
      nearWord: 'Atenție la apostrof', nearText: 'Aproape: verifică apostrofurile.',
      lead: 'Lecții pe situații din viața de zi cu zi, cu explicații în română.', listNote: 'Situații din viața de zi cu zi',
    },
  ];
})();
