// ═══════════════════════════════════════════════════════════
//  data.js — база даних всіх тризубів
//  Щоб додати новий тризуб: скопіюй один об'єкт і заповни.
// ═══════════════════════════════════════════════════════════

const CATEGORIES = [
  { id: "historical",   ua: "Історичні",    en: "Historical"   },
  { id: "military",     ua: "Військові",    en: "Military"     },
  { id: "political",    ua: "Політичні",    en: "Political"    },
  { id: "charitable",  ua: "Благодійні",   en: "Charitable"   },
  { id: "cultural",    ua: "Культурні",    en: "Cultural"     },
];

const TRIDENTS = [

  // ── ПРИКЛАД 1 ──────────────────────────────────────────
  {
    id: "volodymyr-1",
    category: "historical",
    svg: "tridents/volodymyr-1/trident.svg",
    page: "tridents/volodymyr-1/index.html",
    title:    { ua: "Тризуб Володимира Великого", en: "Trident of Volodymyr the Great" },
    subtitle: { ua: "Х століття",                 en: "10th century"                   },
    preview:  { ua: "Державна печатка Київської Русі", en: "State seal of Kyivan Rus" },
    team: {
      scout:      { ua: "Іваненко І.",  en: "Ivanenko I."  },
      illustrator:{ ua: "Петренко М.", en: "Petrenko M."  },
      developer:  { ua: "Коваль О.",   en: "Koval O."     },
      researcher: { ua: "Сидоренко Т.",en: "Sydorenko T." },
      translator: { ua: "Франко Л.",   en: "Franko L."    },
    }
  },

  // ── ПРИКЛАД 2 ──────────────────────────────────────────
  {
    id: "bohdan-1",
    category: "historical",
    svg: "tridents/bohdan-1/trident.svg",
    page: "tridents/bohdan-1/index.html",
    title:    { ua: "Тризуб Богдана Хмельницького", en: "Trident of Bohdan Khmelnytskyi" },
    subtitle: { ua: "XVII століття",                en: "17th century"                    },
    preview:  { ua: "Печатка Гетьманщини",          en: "Seal of the Hetmanate"           },
    team: {
      scout:      { ua: "Мельник Д.",  en: "Melnyk D."    },
      illustrator:{ ua: "Бойко С.",   en: "Boyko S."     },
      developer:  { ua: "Лисенко В.", en: "Lysenko V."   },
      researcher: { ua: "Гончар Н.",  en: "Honchar N."   },
      translator: { ua: "Кравець О.", en: "Kravets O."   },
    }
  },

  // ── ДОДАЙ СВІЙ ТРИЗУБ ТУТ ─────────────────────────────
  // {
  //   id: "назва-номер",
  //   category: "military",   ← одна з: historical / military / political / charitable / cultural
  //   svg: "tridents/назва-номер/trident.svg",
  //   page: "tridents/назва-номер/index.html",
  //   title:    { ua: "Назва українською", en: "Name in English" },
  //   subtitle: { ua: "Епоха",             en: "Era"             },
  //   preview:  { ua: "Короткий опис",     en: "Short description" },
  //   team: {
  //     scout:       { ua: "Прізвище І.", en: "Surname I." },
  //     illustrator: { ua: "Прізвище І.", en: "Surname I." },
  //     developer:   { ua: "Прізвище І.", en: "Surname I." },
  //     researcher:  { ua: "Прізвище І.", en: "Surname I." },
  //     translator:  { ua: "Прізвище І.", en: "Surname I." },
  //   }
  // },

];
