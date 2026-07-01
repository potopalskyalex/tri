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

  // ── ВІЙСЬКОВІ ───────────────────────────────────────────
  {
    id: "military-1",
    category: "military",
    svg: "tridents/volodymyr-1/trident.svg",
    page: "tridents/volodymyr-1/index.html",
    title:    { ua: "Військовий тризуб", en: "Military Trident" },
    subtitle: { ua: "XX століття", en: "20th century" },
    preview:  { ua: "Символ бойової єдності", en: "Symbol of martial unity" },
    team: {
      scout:      { ua: "Шевченко Р.", en: "Shevchenko R." },
      illustrator:{ ua: "Козак Л.", en: "Kozak L." },
      developer:  { ua: "Крамар В.", en: "Kramar V." },
      researcher: { ua: "Руденко П.", en: "Rudenko P." },
      translator: { ua: "Мартинюк А.", en: "Martyniuk A." },
    }
  },

  // ── ПОЛІТИЧНІ ───────────────────────────────────────────
  {
    id: "political-1",
    category: "political",
    svg: "tridents/bohdan-1/trident.svg",
    page: "tridents/bohdan-1/index.html",
    title:    { ua: "Політичний тризуб", en: "Political Trident" },
    subtitle: { ua: "XIX століття", en: "19th century" },
    preview:  { ua: "Державний знак політичної вертикалі", en: "State sign of political authority" },
    team: {
      scout:      { ua: "Демченко М.", en: "Demchenko M." },
      illustrator:{ ua: "Литвин І.", en: "Lytvyn I." },
      developer:  { ua: "Павленко Б.", en: "Pavlenko B." },
      researcher: { ua: "Ткаченко Ю.", en: "Tkachenko Y." },
      translator: { ua: "Капустян С.", en: "Kapustian S." },
    }
  },

  // ── БЛАГОДІЙНІ ──────────────────────────────────────────
  {
    id: "charitable-1",
    category: "charitable",
    svg: "tridents/volodymyr-1/trident.svg",
    page: "tridents/volodymyr-1/index.html",
    title:    { ua: "Благодійний тризуб", en: "Charitable Trident" },
    subtitle: { ua: "XXI століття", en: "21st century" },
    preview:  { ua: "Символ допомоги та гуманітарної місії", en: "Symbol of aid and humanitarian mission" },
    team: {
      scout:      { ua: "Іванова К.", en: "Ivanova K." },
      illustrator:{ ua: "Семенюк О.", en: "Semenyuk O." },
      developer:  { ua: "Савчук Т.", en: "Savchuk T." },
      researcher: { ua: "Мороз В.", en: "Moroz V." },
      translator: { ua: "Григоренко Н.", en: "Hryhorenko N." },
    }
  },

  // ── КУЛЬТУРНІ ───────────────────────────────────────────
  {
    id: "cultural-1",
    category: "cultural",
    svg: "tridents/bohdan-1/trident.svg",
    page: "tridents/bohdan-1/index.html",
    title:    { ua: "Культурний тризуб", en: "Cultural Trident" },
    subtitle: { ua: "XXI століття", en: "21st century" },
    preview:  { ua: "Символ культурної спадщини", en: "Symbol of cultural heritage" },
    team: {
      scout:      { ua: "Бойчук А.", en: "Boychuk A." },
      illustrator:{ ua: "Федоренко Д.", en: "Fedorenko D." },
      developer:  { ua: "Гаврилюк С.", en: "Havryliuk S." },
      researcher: { ua: "Панасюк Л.", en: "Panasiuk L." },
      translator: { ua: "Петрик Я.", en: "Petryk Y." },
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
