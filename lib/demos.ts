/**
 * Конфиги живых демо-приглашений (/demo/[slug]).
 * Каждое демо — реальное работающее приглашение: таймер, RSVP, галерея,
 * генеративная музыка. Новый шаблон = новый конфиг здесь + demoSlug в designs.ts.
 */

export interface DemoTheme {
  bg: string;
  card: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
  font: "serif" | "sans";
}

export interface DemoConfig {
  slug: string;
  designSlug: string;
  pageTitle: string;
  theme: DemoTheme;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    dateLabel: string;
  };
  /** Дата события для таймера (ISO, будущее) */
  dateISO: string;
  message: string[];
  /** Заголовок блока тайминга (по умолчанию «программа дня») */
  timingTitle?: string;
  timing: { time: string; label: string }[];
  address: { title: string; line: string; mapQuery: string };
  dresscode?: { label: string; colors: string[] };
  /** Фото галереи; без src рисуется градиентная заглушка */
  gallery: { from: string; to: string; label: string; src?: string; alt?: string }[];
  music: { tempo: number; notes: number[] };
  rsvp: { deadline: string; question: string };
  /** Анимация фона (см. ParticleLayer) */
  effect?: "petals" | "snow" | "confetti" | "sparks" | "bokeh";
  effectColors?: string[];
}

export const DEMOS: DemoConfig[] = [
  {
    slug: "tishina",
    effect: "bokeh",
    effectColors: ["#b09468"],
    designSlug: "tishina",
    pageTitle: "Дарья и Марк — приглашение на свадьбу",
    theme: {
      bg: "#f2ede4",
      card: "#faf7f0",
      ink: "#37322a",
      muted: "#6b6355",
      accent: "#8f5230",
      accentInk: "#faf7f0",
      font: "serif",
    },
    hero: {
      eyebrow: "приглашение на свадьбу",
      title: "Дарья и Марк",
      subtitle: "Мы женимся — и хотим разделить этот день с вами",
      dateLabel: "19 декабря 2026, суббота",
    },
    dateISO: "2026-12-19T16:00:00+03:00",
    message: [
      "Дорогие наши! Восемь лет назад мы случайно встретились в очереди за кофе — и с тех пор не расставались.",
      "19 декабря мы станем семьёй и будем счастливы видеть рядом самых близких людей. Без вас этот день не будет полным.",
    ],
    timing: [
      { time: "15:30", label: "Сбор гостей и welcome-фуршет" },
      { time: "16:00", label: "Церемония" },
      { time: "17:00", label: "Банкет и первый танец" },
      { time: "21:00", label: "Торт и свечи" },
      { time: "23:00", label: "Завершение вечера" },
    ],
    address: {
      title: "Усадьба «Белый сад»",
      line: "Московская область, Истра, ул. Садовая, 12",
      mapQuery: "Истра, улица Садовая 12",
    },
    dresscode: {
      label: "Будем рады видеть вас в спокойных оттенках",
      colors: ["#e8e2d6", "#c9bfa8", "#8c8272", "#4a443a", "#a15e3b"],
    },
    gallery: [
      { from: "#ddd2c0", to: "#b8a98e", label: "Наша первая осень", src: "/demo/tishina-1.webp", alt: "Пара идёт по осенней дороге в лесу" },
      { from: "#cfc6b4", to: "#a3987f", label: "Путешествие в горы", src: "/demo/tishina-2.webp", alt: "Пара на скале на фоне гор на закате" },
      { from: "#e4dccb", to: "#c2b394", label: "Тот самый вечер", src: "/demo/tishina-3.webp", alt: "Свечи на деревянном столе, руки рядом" },
      { from: "#d6cab2", to: "#ab9c7d", label: "Помолвка", src: "/demo/tishina-4.webp", alt: "Руки пары в момент помолвки" },
    ],
    music: { tempo: 72, notes: [261.63, 329.63, 392.0, 523.25, 392.0, 329.63] },
    rsvp: {
      deadline: "до 1 декабря",
      question: "Сможете ли вы разделить с нами этот день?",
    },
  },
  {
    slug: "konfetti",
    effect: "confetti",
    effectColors: ["#e08a2e", "#5fae8a", "#5f8ecc", "#dd7693"],
    designSlug: "konfetti",
    pageTitle: "Мише 6 лет — приглашение на день рождения",
    theme: {
      bg: "#fdf3e3",
      card: "#fffaf0",
      ink: "#5c3a10",
      muted: "#75603a",
      accent: "#96551a",
      accentInk: "#fffaf0",
      font: "sans",
    },
    hero: {
      eyebrow: "день рождения",
      title: "Мише — 6!",
      subtitle: "Приглашаем на самый шумный праздник этой весны",
      dateLabel: "12 апреля 2027, воскресенье",
    },
    dateISO: "2027-04-12T12:00:00+03:00",
    message: [
      "Привет! Мне исполняется целых шесть лет, и без тебя праздник не получится.",
      "Будут батут, мыльные пузыри размером с меня, охота за сокровищами и торт с динозавром. Приходи обязательно!",
    ],
    timing: [
      { time: "12:00", label: "Встреча гостей" },
      { time: "12:30", label: "Игры с аниматором" },
      { time: "14:00", label: "Торт с динозавром" },
      { time: "15:00", label: "Дискотека и прощание" },
    ],
    address: {
      title: "Детский лофт «Чердак»",
      line: "Москва, ул. Лесная, 7, 3 этаж",
      mapQuery: "Москва, улица Лесная 7",
    },
    gallery: [
      { from: "#f4c98a", to: "#e0862f", label: "Мне 5", src: "/demo/konfetti-1.webp", alt: "Дети играют с воздушными шарами" },
      { from: "#a8d8c0", to: "#5fae8a", label: "Лето на даче", src: "/demo/konfetti-2.webp", alt: "Мальчик сидит на летней лужайке" },
      { from: "#a9c8ee", to: "#5f8ecc", label: "Первый велосипед", src: "/demo/konfetti-3.webp", alt: "Мальчик едет на велосипеде" },
      { from: "#f2b8c6", to: "#dd7693", label: "С Бимом", src: "/demo/konfetti-4.webp", alt: "Мальчик обнимает собаку" },
    ],
    music: { tempo: 132, notes: [392.0, 493.88, 587.33, 783.99, 587.33, 493.88] },
    rsvp: {
      deadline: "до 5 апреля",
      question: "Придёшь на праздник?",
    },
  },
  {
    slug: "gran",
    effect: "bokeh",
    effectColors: ["#d0aa4e"],
    designSlug: "gran",
    pageTitle: "Юбилей Виктора Петровича — 50 лет",
    theme: {
      bg: "#16130e",
      card: "#211c14",
      ink: "#efe3c4",
      muted: "#9a8d6c",
      accent: "#d0aa4e",
      accentInk: "#16130e",
      font: "serif",
    },
    hero: {
      eyebrow: "торжественный вечер",
      title: "Виктору Петровичу — 50",
      subtitle: "Полвека — отличный повод собрать всех, кто дорог",
      dateLabel: "14 ноября 2026, суббота",
    },
    dateISO: "2026-11-14T18:00:00+03:00",
    message: [
      "Дорогие родные и друзья! Юбилеи случаются не каждый день, а такие — раз в пятьдесят лет.",
      "Приглашаю вас на торжественный ужин: вспомним лучшие истории, поднимем бокалы и обязательно потанцуем.",
    ],
    timing: [
      { time: "18:00", label: "Сбор гостей, аперитив" },
      { time: "19:00", label: "Торжественный ужин" },
      { time: "20:30", label: "Тосты и истории" },
      { time: "22:00", label: "Танцы" },
    ],
    address: {
      title: "Ресторан «Меридиан»",
      line: "Санкт-Петербург, наб. Фонтанки, 21",
      mapQuery: "Санкт-Петербург, набережная Фонтанки 21",
    },
    dresscode: {
      label: "Дресс-код: вечерний, тёмные тона",
      colors: ["#16130e", "#3a3226", "#6b5d3f", "#d0aa4e"],
    },
    gallery: [
      { from: "#3a3226", to: "#211c14", label: "1976", src: "/demo/gran-1.webp", alt: "Архивное чёрно-белое семейное фото" },
      { from: "#4a3f2c", to: "#2b2418", label: "1994", src: "/demo/gran-2.webp", alt: "Старое семейное фото у деревьев" },
      { from: "#5c4c30", to: "#332a1a", label: "2008", src: "/demo/gran-3.webp", alt: "Семейный портрет у дома, архивный снимок" },
      { from: "#6b5a38", to: "#3d321f", label: "Сегодня", src: "/demo/gran-4.webp", alt: "Портрет юбиляра сегодня" },
    ],
    music: { tempo: 84, notes: [196.0, 246.94, 293.66, 392.0, 293.66, 246.94] },
    rsvp: {
      deadline: "до 1 ноября",
      question: "Подтвердите, пожалуйста, ваше участие",
    },
  },
  {
    slug: "elka",
    effect: "snow",
    effectColors: ["#ffffff"],
    designSlug: "girlyanda",
    pageTitle: "Новогодний вечер Aurora Team",
    theme: {
      bg: "#0d1f17",
      card: "#132a1f",
      ink: "#eaf2e6",
      muted: "#8fa896",
      accent: "#f0b64e",
      accentInk: "#0d1f17",
      font: "sans",
    },
    hero: {
      eyebrow: "корпоративный вечер",
      title: "Aurora — Новый год",
      subtitle: "Закрываем год так, чтобы было что вспомнить в январе",
      dateLabel: "26 декабря 2026, пятница",
    },
    dateISO: "2026-12-26T19:00:00+03:00",
    message: [
      "Команда! Год был непростым и отличным одновременно — самое время отпраздновать.",
      "Ждём всех 26 декабря: ужин, награждения, тайный Санта и танцы до последнего трамвая.",
    ],
    timing: [
      { time: "19:00", label: "Welcome и игристое" },
      { time: "20:00", label: "Ужин и итоги года" },
      { time: "21:30", label: "Тайный Санта" },
      { time: "22:00", label: "Танцы" },
    ],
    address: {
      title: "Лофт «Депо 9»",
      line: "Москва, ул. Складочная, 9, стр. 2",
      mapQuery: "Москва, улица Складочная 9",
    },
    dresscode: {
      label: "Дресс-код: праздничный, приветствуется бархат",
      colors: ["#0d1f17", "#1f4030", "#f0b64e", "#b23a48"],
    },
    gallery: [
      { from: "#1f4030", to: "#132a1f", label: "Корпоратив-2025", src: "/demo/elka-1.webp", alt: "Коллеги поднимают бокалы на празднике" },
      { from: "#2b503c", to: "#183024", label: "Летний выезд", src: "/demo/elka-2.webp", alt: "Команда на летнем выезде на природе" },
      { from: "#365e46", to: "#1d3628", label: "Команда", src: "/demo/elka-3.webp", alt: "Команда работает за ноутбуками" },
      { from: "#41684e", to: "#223c2b", label: "Офис в декабре", src: "/demo/elka-4.webp", alt: "Огни новогодней ёлки" },
    ],
    music: { tempo: 108, notes: [329.63, 415.3, 493.88, 659.25, 493.88, 415.3] },
    rsvp: {
      deadline: "до 19 декабря",
      question: "Идёте? HR очень ждёт ответа",
    },
  },
  {
    slug: "sad",
    effect: "petals",
    effectColors: ["#9db98a", "#c3d4ae"],
    designSlug: "sad",
    pageTitle: "Алина и Игорь — свадьба в саду",
    theme: {
      bg: "#eef0e6",
      card: "#f8f9f2",
      ink: "#33402e",
      muted: "#5f6b52",
      accent: "#4a6a3d",
      accentInk: "#f8f9f2",
      font: "serif",
    },
    hero: {
      eyebrow: "приглашение на свадьбу",
      title: "Алина и Игорь",
      subtitle: "Женимся среди зелени — и зовём самых близких",
      dateLabel: "6 июня 2027, воскресенье",
    },
    dateISO: "2027-06-06T15:00:00+03:00",
    message: [
      "Дорогие! Мы познакомились в ботаническом саду — и решили, что свадьба должна быть там же: среди листьев, света и запаха травы.",
      "Будем счастливы видеть вас в этот день. Приходите — обещаем много зелени и ни одной скучной минуты.",
    ],
    timing: [
      { time: "14:30", label: "Сбор гостей, лимонады в саду" },
      { time: "15:00", label: "Церемония под старой липой" },
      { time: "16:00", label: "Ужин на веранде" },
      { time: "20:00", label: "Танцы под гирляндами" },
    ],
    address: {
      title: "Усадьба «Липки»",
      line: "Калужское шоссе, 41-й км",
      mapQuery: "Усадьба Липки Калужское шоссе",
    },
    dresscode: {
      label: "Дресс-код: природные оттенки",
      colors: ["#f0ede2", "#c9cdb2", "#8a9678", "#4a6a3d", "#33402e"],
    },
    gallery: [
      { from: "#e6ead9", to: "#c6d1b4", label: "Осень, когда всё началось", src: "/demo/sad-1.webp", alt: "Пара на свадебной прогулке в лесу" },
      { from: "#dfe4d0", to: "#b9c6a4", label: "Наш день", src: "/demo/sad-2.webp", alt: "Молодожёны в солнечный день" },
      { from: "#e8ecdc", to: "#c2cfab", label: "Детали", src: "/demo/sad-3.webp", alt: "Свадебный букет на деревянной стене" },
      { from: "#e2e7d4", to: "#bcc9a6", label: "Репетиция церемонии", src: "/demo/sad-4.webp", alt: "Гости на выездной церемонии в саду" },
    ],
    music: { tempo: 76, notes: [246.94, 311.13, 369.99, 493.88, 369.99, 311.13] },
    rsvp: { deadline: "до 20 мая", question: "Разделите с нами этот день?" },
  },
  {
    slug: "liniya",
    effect: "bokeh",
    effectColors: ["#b39869"],
    designSlug: "liniya",
    pageTitle: "Елена и Сергей — приглашение на свадьбу",
    theme: {
      bg: "#f5f1ea",
      card: "#fcf9f3",
      ink: "#3e372e",
      muted: "#6e6557",
      accent: "#8a6a3c",
      accentInk: "#fcf9f3",
      font: "serif",
    },
    hero: {
      eyebrow: "приглашение на свадьбу",
      title: "Елена и Сергей",
      subtitle: "Классика — потому что настоящее не выходит из моды",
      dateLabel: "14 февраля 2027, воскресенье",
    },
    dateISO: "2027-02-14T16:00:00+03:00",
    message: [
      "Дорогие родные и друзья! В самый романтичный день года мы станем мужем и женой.",
      "Приглашаем вас на торжественный вечер — с белыми скатертями, живой музыкой и вальсом, который мы репетируем уже месяц.",
    ],
    timing: [
      { time: "15:30", label: "Сбор гостей, аперитив" },
      { time: "16:00", label: "Церемония" },
      { time: "17:00", label: "Торжественный ужин" },
      { time: "21:30", label: "Первый танец и торт" },
    ],
    address: {
      title: "Ресторан «Астория»",
      line: "Москва, Тверская, 12",
      mapQuery: "Москва Тверская 12 ресторан",
    },
    dresscode: {
      label: "Дресс-код: вечерний, чёрный и кремовый",
      colors: ["#f5f1ea", "#d8cdb8", "#8a6a3c", "#3e372e"],
    },
    gallery: [
      { from: "#f3efe8", to: "#e2dbcd", label: "Сервировка", src: "/demo/liniya-1.webp", alt: "Праздничная сервировка стола" },
      { from: "#ece5d8", to: "#d5c9b4", label: "Детали вечера", src: "/demo/liniya-2.webp", alt: "Бокалы на праздничном столе" },
      { from: "#efe9dd", to: "#d9cfba", label: "Мы", src: "/demo/liniya-3.webp", alt: "Пара целуется у белых цветов" },
      { from: "#f0ebe0", to: "#dcd2bd", label: "Приглашение к столу", src: "/demo/liniya-4.webp", alt: "Карточка рассадки и цветы на столе" },
    ],
    music: { tempo: 90, notes: [220.0, 277.18, 329.63, 440.0, 329.63, 277.18] },
    rsvp: { deadline: "до 1 февраля", question: "Будете ли вы с нами?" },
  },
  {
    slug: "kosmos",
    effect: "bokeh",
    effectColors: ["#cfd8ff", "#8fa3ff"],
    designSlug: "kosmos",
    pageTitle: "Тимуру 8 лет — космическая вечеринка",
    theme: {
      bg: "#10142b",
      card: "#1a1f3d",
      ink: "#e4e9ff",
      muted: "#8d96c4",
      accent: "#7f9bff",
      accentInk: "#0d1126",
      font: "sans",
    },
    hero: {
      eyebrow: "запуск через",
      title: "Тимуру — 8!",
      subtitle: "Экипаж собирается на космическую вечеринку",
      dateLabel: "30 мая 2027, воскресенье",
    },
    dateISO: "2027-05-30T12:00:00+03:00",
    message: [
      "Внимание, экипаж! Капитану Тимуру исполняется восемь — и он набирает команду для межгалактической миссии.",
      "В программе: постройка ракеты, поиск метеорита и торт в форме Сатурна. Скафандр не обязателен, хорошее настроение — да!",
    ],
    timing: [
      { time: "12:00", label: "Сбор экипажа" },
      { time: "12:30", label: "Космический квест" },
      { time: "14:00", label: "Торт «Сатурн»" },
      { time: "15:00", label: "Возвращение на Землю" },
    ],
    address: {
      title: "Детский центр «Орбита»",
      line: "Москва, пр-т Мира, 111",
      mapQuery: "Москва проспект Мира 111",
    },
    gallery: [
      { from: "#1d2440", to: "#0f1226", label: "Млечный путь", src: "/demo/kosmos-1.webp", alt: "Млечный путь в ночном небе" },
      { from: "#171c36", to: "#0d1024", label: "Наша галактика", src: "/demo/kosmos-2.webp", alt: "Звёзды в ночном небе" },
      { from: "#1a2040", to: "#101430", label: "База в горах", src: "/demo/kosmos-3.webp", alt: "Звёздное небо над заснеженной вершиной" },
      { from: "#151a33", to: "#0c0f22", label: "Ночной лес", src: "/demo/kosmos-4.webp", alt: "Силуэты деревьев под звёздным небом" },
    ],
    music: { tempo: 120, notes: [329.63, 392.0, 493.88, 659.25, 493.88, 392.0] },
    rsvp: { deadline: "до 23 мая", question: "Летишь с нами?" },
  },
  {
    slug: "polnoch",
    effect: "bokeh",
    effectColors: ["#c8a45e"],
    designSlug: "polnoch",
    pageTitle: "Андрею — 35. Вечер в баре",
    theme: {
      bg: "#17151d",
      card: "#211e29",
      ink: "#ece8f4",
      muted: "#9b93ad",
      accent: "#c8a45e",
      accentInk: "#17151d",
      font: "sans",
    },
    hero: {
      eyebrow: "день рождения",
      title: "Андрею — 35",
      subtitle: "Без шариков и конкурсов. Только бар, друзья и хорошая музыка",
      dateLabel: "20 ноября 2026, пятница",
    },
    dateISO: "2026-11-20T19:00:00+03:00",
    message: [
      "Друзья! Мне 35, и я знаю вас достаточно долго, чтобы не обещать «посидим часок и разойдёмся».",
      "Забронировал наш любимый бар. Приходите к семи — дальше как пойдёт.",
    ],
    timing: [
      { time: "19:00", label: "Сбор, первый тост" },
      { time: "20:00", label: "Ужин" },
      { time: "22:00", label: "Диджей и танцы" },
    ],
    address: {
      title: "Бар «Полночь»",
      line: "Москва, Б. Никитская, 9",
      mapQuery: "Москва Большая Никитская 9 бар",
    },
    dresscode: {
      label: "Дресс-код: smart casual, тёмное",
      colors: ["#17151d", "#3a3547", "#6e6584", "#c8a45e"],
    },
    gallery: [
      { from: "#23212b", to: "#141319", label: "То самое место", src: "/demo/polnoch-1.webp", alt: "Бокалы на столе в баре" },
      { from: "#282433", to: "#17141f", label: "Прошлый год", src: "/demo/polnoch-2.webp", alt: "Мартини на деревянном столе" },
      { from: "#2b2735", to: "#191521", label: "Фирменный", src: "/demo/polnoch-3.webp", alt: "Коктейль с цедрой на барной стойке" },
      { from: "#262230", to: "#16131e", label: "За встречу", src: "/demo/polnoch-4.webp", alt: "Коктейль с апельсином и корицей" },
    ],
    music: { tempo: 84, notes: [196.0, 246.94, 293.66, 392.0, 293.66, 246.94] },
    rsvp: { deadline: "до 15 ноября", question: "Ты в деле?" },
  },
  {
    slug: "pion",
    effect: "petals",
    effectColors: ["#e8a6bc", "#dd8aa4"],
    designSlug: "pion",
    pageTitle: "Мария и Павел — помолвка",
    theme: {
      bg: "#f8eef0",
      card: "#fdf6f7",
      ink: "#54333d",
      muted: "#8a6570",
      accent: "#a34d63",
      accentInk: "#fdf6f7",
      font: "serif",
    },
    hero: {
      eyebrow: "мы помолвлены",
      title: "Мария и Павел",
      subtitle: "Он спросил — она сказала «да». Теперь празднуем!",
      dateLabel: "8 мая 2027, суббота",
    },
    dateISO: "2027-05-08T17:00:00+03:00",
    message: [
      "Дорогие наши! На прошлой неделе на берегу моря случилось самое важное «да» в нашей жизни.",
      "Хотим отпраздновать это с вами — тихо, тепло и с пионами, конечно.",
    ],
    timing: [
      { time: "17:00", label: "Сбор гостей на веранде" },
      { time: "18:00", label: "Ужин и наша история" },
      { time: "20:00", label: "Закат и игристое" },
    ],
    address: {
      title: "Веранда «Сад»",
      line: "Москва, Пятницкая, 3",
      mapQuery: "Москва Пятницкая 3 веранда",
    },
    gallery: [
      { from: "#f6e3e6", to: "#e8c2ca", label: "Кольцо", src: "/demo/pion-1.webp", alt: "Кольцо с камнем в коробочке" },
      { from: "#f2dce0", to: "#e2b8c1", label: "Руки", src: "/demo/pion-2.webp", alt: "Влюблённые держатся за руки" },
      { from: "#f7e6e9", to: "#eac6ce", label: "Пионы", src: "/demo/pion-3.webp", alt: "Букет розовых пионов крупным планом" },
      { from: "#f4e0e3", to: "#e5bcc4", label: "Тот самый момент", src: "/demo/pion-4.webp", alt: "Предложение руки на берегу моря" },
    ],
    music: { tempo: 72, notes: [261.63, 329.63, 392.0, 523.25, 392.0, 329.63] },
    rsvp: { deadline: "до 1 мая", question: "Придёте поздравить нас?" },
  },
  {
    slug: "disko",
    effect: "confetti",
    effectColors: ["#e05c9c", "#8a5cd6", "#4cc9f0"],
    designSlug: "disko",
    pageTitle: "Девичник Кати — диско-вечер",
    theme: {
      bg: "#1c1430",
      card: "#271c40",
      ink: "#f2e9ff",
      muted: "#a293c4",
      accent: "#e05c9c",
      accentInk: "#1c1430",
      font: "sans",
    },
    hero: {
      eyebrow: "девичник",
      title: "Катя выходит замуж!",
      subtitle: "Но сначала — диско. Последний танец в статусе невесты",
      dateLabel: "12 сентября 2026, суббота",
    },
    dateISO: "2026-09-12T18:00:00+03:00",
    message: [
      "Девочки! Через месяц я стану чьей-то женой, а пока — я ваша, и мы идём танцевать.",
      "Дресс-код: блёстки обязательны. Каблуки — на ваш страх и риск.",
    ],
    timing: [
      { time: "18:00", label: "Сбор и игристое" },
      { time: "19:00", label: "Караоке-баттл" },
      { time: "21:00", label: "Диско до упора" },
    ],
    address: {
      title: "Караоке «Неон»",
      line: "Москва, Цветной бульвар, 15",
      mapQuery: "Москва Цветной бульвар 15 караоке",
    },
    dresscode: {
      label: "Дресс-код: блёстки и неон",
      colors: ["#e05c9c", "#8a5cd6", "#4cc9f0", "#f2e9ff"],
    },
    gallery: [
      { from: "#2a1e3f", to: "#161028", label: "Настроение вечера", src: "/demo/disko-1.webp", alt: "Зеркальные диско-шары" },
      { from: "#301f4a", to: "#191030", label: "Больше блеска", src: "/demo/disko-2.webp", alt: "Сияющий диско-шар в темноте" },
      { from: "#251a38", to: "#140e24", label: "Танцпол ждёт", src: "/demo/disko-3.webp", alt: "Люди на концерте ночью" },
      { from: "#2c2044", to: "#17112c", label: "Декор", src: "/demo/disko-4.webp", alt: "Диско-шары рядом с цветами" },
    ],
    music: { tempo: 126, notes: [349.23, 440.0, 523.25, 698.46, 523.25, 440.0] },
    rsvp: { deadline: "до 5 сентября", question: "Идёшь танцевать?" },
  },
  {
    slug: "aist",
    effect: "bokeh",
    effectColors: ["#9cc4b4"],
    designSlug: "aist",
    pageTitle: "Baby shower — ждём Соню",
    theme: {
      bg: "#edf3f0",
      card: "#f7faf8",
      ink: "#33473f",
      muted: "#68806f",
      accent: "#3d7d6a",
      accentInk: "#f7faf8",
      font: "serif",
    },
    hero: {
      eyebrow: "baby shower",
      title: "Ждём Соню",
      subtitle: "Самый главный гость появится в декабре — а праздник уже сейчас",
      dateLabel: "25 октября 2026, воскресенье",
    },
    dateISO: "2026-10-25T14:00:00+03:00",
    message: [
      "Дорогие! Совсем скоро нас станет трое, и мы хотим отметить это тихим уютным днём с самыми близкими.",
      "Никаких шумных игр — чай, пледы, добрые пожелания малышке. Wish-list пришлём отдельно, но главное — приходите сами.",
    ],
    timing: [
      { time: "14:00", label: "Сбор гостей, чай" },
      { time: "15:00", label: "Тёплые игры и пожелания" },
      { time: "17:00", label: "Торт и общее фото" },
    ],
    address: {
      title: "Дома у Ани и Миши",
      line: "Москва, Ленинский пр-т, 52, кв. 14",
      mapQuery: "Москва Ленинский проспект 52",
    },
    gallery: [
      { from: "#e3efe9", to: "#c8e0d4", label: "Скоро", src: "/demo/aist-1.webp", alt: "Ножки новорождённого в пледе" },
      { from: "#dceae3", to: "#bcd8c9", label: "Маленькие ножки", src: "/demo/aist-2.webp", alt: "Ступни малыша в ладонях" },
      { from: "#e6f1eb", to: "#cde3d8", label: "За руку", src: "/demo/aist-3.webp", alt: "Ладонь взрослого держит руку малыша" },
      { from: "#e0ede6", to: "#c2dccf", label: "Нежность", src: "/demo/aist-4.webp", alt: "Ножки малыша на белом пледе" },
    ],
    music: { tempo: 76, notes: [293.66, 369.99, 440.0, 587.33, 440.0, 369.99] },
    rsvp: { deadline: "до 18 октября", question: "Придёте на чай?" },
  },
  {
    slug: "sekret",
    effect: "confetti",
    effectColors: ["#a8c8ec", "#f2b8cc"],
    designSlug: "sekret",
    pageTitle: "Гендер-пати — мальчик или девочка?",
    theme: {
      bg: "#f2eef6",
      card: "#faf7fc",
      ink: "#443a52",
      muted: "#77688c",
      accent: "#6f51a1",
      accentInk: "#faf7fc",
      font: "sans",
    },
    hero: {
      eyebrow: "гендер-пати",
      title: "Мальчик или девочка?",
      subtitle: "Мы и сами не знаем. Узнаем вместе — когда лопнет шар",
      dateLabel: "18 октября 2026, воскресенье",
    },
    dateISO: "2026-10-18T15:00:00+03:00",
    message: [
      "Друзья! Конверт с результатом УЗИ запечатан и передан кондитеру. Даже мы не знаем, что внутри торта.",
      "Приходите делать ставки: команда голубых против команды розовых. Проигравшие моют посуду!",
    ],
    timing: [
      { time: "15:00", label: "Сбор и ставки" },
      { time: "16:00", label: "Игры двух команд" },
      { time: "17:00", label: "Главный момент: торт!" },
    ],
    address: {
      title: "Лофт «Небо»",
      line: "Москва, Артплей, стр. 7",
      mapQuery: "Москва Артплей",
    },
    gallery: [
      { from: "#bcd7f2", to: "#f2c3d4", label: "Интрига", src: "/demo/sekret-1.webp", alt: "Разноцветные шары в воздухе" },
      { from: "#f2c3d4", to: "#bcd7f2", label: "Команда розовых?", src: "/demo/sekret-2.webp", alt: "Розовые шары в небе" },
      { from: "#c3d4f2", to: "#f2d0dd", label: "Или команда голубых?", src: "/demo/sekret-3.webp", alt: "Оранжевый и розовый шар" },
      { from: "#d0ddf2", to: "#f2c8d8", label: "Скоро узнаем", src: "/demo/sekret-4.webp", alt: "Цветные шары на фоне неба" },
    ],
    music: { tempo: 112, notes: [329.63, 415.3, 493.88, 659.25, 493.88, 415.3] },
    rsvp: { deadline: "до 11 октября", question: "За кого болеешь? Приходи!" },
  },
  {
    slug: "protokol",
    designSlug: "protokol",
    pageTitle: "Vektor Forum 2027 — приглашение",
    theme: {
      bg: "#eef1f4",
      card: "#f8fafc",
      ink: "#2c3947",
      muted: "#5c6b7c",
      accent: "#35688a",
      accentInk: "#f8fafc",
      font: "sans",
    },
    hero: {
      eyebrow: "деловое приглашение",
      title: "Vektor Forum 2027",
      subtitle: "Ежегодная конференция о продукте и людях. 12 спикеров, 300 гостей",
      dateLabel: "15 апреля 2027, четверг",
    },
    dateISO: "2027-04-15T10:00:00+03:00",
    message: [
      "Коллеги! Приглашаем вас на четвёртый Vektor Forum — день практики, честных кейсов и полезных знакомств.",
      "Участие по регистрации. Количество мест ограничено вместимостью зала — подтвердите участие заранее.",
    ],
    timingTitle: "программа форума",
    timing: [
      { time: "10:00", label: "Регистрация, кофе" },
      { time: "11:00", label: "Ключевой доклад" },
      { time: "13:00", label: "Обед и нетворкинг" },
      { time: "14:30", label: "Секции и воркшопы" },
      { time: "18:00", label: "Афтепати" },
    ],
    address: {
      title: "КЦ «Меридиан»",
      line: "Москва, Профсоюзная, 61",
      mapQuery: "Москва Профсоюзная 61",
    },
    gallery: [
      { from: "#e8ebef", to: "#cfd6de", label: "Главная сцена", src: "/demo/protokol-1.webp", alt: "Спикер на сцене перед аудиторией" },
      { from: "#e2e7ec", to: "#c6cfd9", label: "Зал", src: "/demo/protokol-2.webp", alt: "Аудитория на конференции" },
      { from: "#eaedf1", to: "#d2d9e0", label: "Вопросы из зала", src: "/demo/protokol-3.webp", alt: "Люди поднимают руки в зале" },
      { from: "#e5e9ee", to: "#cbd3dc", label: "Нетворкинг", src: "/demo/protokol-4.webp", alt: "Участники общаются на площадке" },
    ],
    music: { tempo: 100, notes: [261.63, 311.13, 392.0, 466.16, 392.0, 311.13] },
    rsvp: { deadline: "до 8 апреля", question: "Зарегистрироваться на форум" },
  },
  {
    slug: "priznanie",
    effect: "bokeh",
    effectColors: ["#d09aa4"],
    designSlug: "priznanie",
    pageTitle: "Кате. Пролистай до конца",
    theme: {
      bg: "#f4ece9",
      card: "#faf4f1",
      ink: "#4a332e",
      muted: "#83675f",
      accent: "#963345",
      accentInk: "#faf4f1",
      font: "serif",
    },
    hero: {
      eyebrow: "тебе",
      title: "Катя, это тебе",
      subtitle: "Я долго собирался с духом. Пролистай до конца — пожалуйста",
      dateLabel: "твой Миша",
    },
    dateISO: "2027-02-14T19:00:00+03:00",
    message: [
      "Помнишь, ты сказала, что красивые слова у меня получаются только в переписке? Ладно. Вот тебе целая страница.",
      "Пять лет назад я одолжил у тебя зарядку в аэропорту и до сих пор не вернул. Ниже — что было дальше.",
    ],
    timingTitle: "наша история",
    timing: [
      { time: "2022", label: "Аэропорт, зарядка, задержанный рейс" },
      { time: "2023", label: "Переехали в квартиру с ужасным ремонтом" },
      { time: "2025", label: "Обошли пол-Грузии пешком" },
      { time: "2027", label: "И вот мы здесь…" },
    ],
    address: {
      title: "Наша набережная",
      line: "Там, где скамейка с видом на мост. 14 февраля, 19:00",
      mapQuery: "Москва Крымская набережная",
    },
    gallery: [
      { from: "#f0e0dc", to: "#dcc0ba", label: "Первое лето", src: "/demo/priznanie-1.webp", alt: "Пара идёт по берегу моря" },
      { from: "#ecd9d4", to: "#d6b8b1", label: "Договорились", src: "/demo/priznanie-2.webp", alt: "Мизинцы, сцепленные в обещании" },
      { from: "#f2e2de", to: "#dfc2bb", label: "Наш закат", src: "/demo/priznanie-3.webp", alt: "Силуэт пары на фоне заката" },
      { from: "#eeddd8", to: "#dabdb5", label: "Всегда за руку", src: "/demo/priznanie-4.webp", alt: "Пара держится за руки на закате" },
    ],
    music: { tempo: 66, notes: [246.94, 311.13, 369.99, 493.88, 369.99, 311.13] },
    rsvp: { deadline: "сегодня", question: "Придёшь на нашу скамейку в 19:00?" },
  },
  {
    slug: "zvonok",
    effect: "confetti",
    effectColors: ["#5f8ecc", "#e8b45a"],
    designSlug: "zvonok",
    pageTitle: "Выпускной 11 «А» — приглашение",
    theme: {
      bg: "#eaf0f5",
      card: "#f6f9fc",
      ink: "#243c50",
      muted: "#5b7186",
      accent: "#35688a",
      accentInk: "#f6f9fc",
      font: "sans",
    },
    hero: {
      eyebrow: "выпускной вечер",
      title: "11 «А», мы сделали это!",
      subtitle: "Одиннадцать лет — и один самый важный вечер напоследок",
      dateLabel: "20 июня 2027, воскресенье",
    },
    dateISO: "2027-06-20T17:00:00+03:00",
    message: [
      "Дорогие родители и учителя! Приглашаем вас на выпускной вечер 11 «А» — попрощаемся со школой красиво.",
      "Пожалуйста, подтвердите присутствие до 1 июня — бронируем зал по количеству гостей.",
    ],
    timingTitle: "программа вечера",
    timing: [
      { time: "17:00", label: "Торжественная часть в школе" },
      { time: "18:30", label: "Вручение аттестатов" },
      { time: "20:00", label: "Банкет и концерт от класса" },
      { time: "23:00", label: "Рассвет встречаем вместе" },
    ],
    address: {
      title: "Школа № 12 → ресторан «Панорама»",
      line: "Начало в актовом зале, продолжение — наб. Реки, 8",
      mapQuery: "ресторан Панорама набережная",
    },
    gallery: [
      { from: "#dfe9f2", to: "#bcd2e4", label: "Мы", src: "/demo/zvonok-1.webp", alt: "Выпускники в мантиях" },
      { from: "#d8e4ee", to: "#b2cade", label: "Почти взрослые", src: "/demo/zvonok-2.webp", alt: "Выпускница в академической шапочке" },
      { from: "#e2ecf4", to: "#c2d6e6", label: "Улыбаемся", src: "/demo/zvonok-3.webp", alt: "Улыбающаяся выпускница" },
      { from: "#dce7f0", to: "#b8cee0", label: "Сладкий финал", src: "/demo/zvonok-4.webp", alt: "Торт к выпускному с шапочкой" },
    ],
    music: { tempo: 104, notes: [293.66, 369.99, 440.0, 587.33, 440.0, 369.99] },
    rsvp: { deadline: "до 1 июня", question: "Подтвердите присутствие" },
  },
  {
    slug: "shariki",
    effect: "confetti",
    effectColors: ["#e28ab0", "#8ac2e2", "#f2d488"],
    designSlug: "shariki",
    pageTitle: "Соне 3 года — приглашение",
    theme: {
      bg: "#fbf0f4",
      card: "#fef8fa",
      ink: "#5c3346",
      muted: "#96637c",
      accent: "#c2497e",
      accentInk: "#fef8fa",
      font: "sans",
    },
    hero: {
      eyebrow: "день рождения",
      title: "Соне — 3!",
      subtitle: "Целых три года — и первый настоящий праздник с друзьями",
      dateLabel: "14 марта 2027, воскресенье",
    },
    dateISO: "2027-03-14T11:00:00+03:00",
    message: [
      "Нашей Соне исполняется три! Она уже выбрала платье, торт и всех гостей — вы в списке.",
      "Ждём малышей с родителями: будут мыльные пузыри, мягкая зона для самых маленьких и кофе для взрослых.",
    ],
    timing: [
      { time: "11:00", label: "Встречаемся" },
      { time: "11:30", label: "Пузыри и игры" },
      { time: "12:30", label: "Торт со свечками" },
      { time: "13:30", label: "Обнимаемся и прощаемся" },
    ],
    address: {
      title: "Детский центр «Кубик»",
      line: "Москва, ул. Садовая, 20",
      mapQuery: "Москва Садовая 20 детский центр",
    },
    gallery: [
      { from: "#f6e4ea", to: "#e8c2cf", label: "Наша непоседа", src: "/demo/shariki-1.webp", alt: "Девочка бежит и смеётся" },
      { from: "#f2dde5", to: "#e2b8c8", label: "Пузыри!", src: "/demo/shariki-2.webp", alt: "Малыш играет с мыльными пузырями" },
      { from: "#f8e7ed", to: "#ebc8d4", label: "Лето", src: "/demo/shariki-3.webp", alt: "Девочка на зелёной лужайке" },
      { from: "#f4e0e8", to: "#e5bccb", label: "Люблю воду", src: "/demo/shariki-4.webp", alt: "Малыш играет с водой" },
    ],
    music: { tempo: 128, notes: [392.0, 493.88, 587.33, 783.99, 587.33, 493.88] },
    rsvp: { deadline: "до 7 марта", question: "Придёте к нам?" },
  },
  {
    slug: "svet",
    effect: "bokeh",
    effectColors: ["#cfd8c4"],
    designSlug: "svet",
    pageTitle: "Крестины Алексея — приглашение",
    theme: {
      bg: "#f1f1ec",
      card: "#f9f9f5",
      ink: "#45493e",
      muted: "#767b6c",
      accent: "#5c7a52",
      accentInk: "#f9f9f5",
      font: "serif",
    },
    hero: {
      eyebrow: "приглашение на крестины",
      title: "Крестины Алексея",
      subtitle: "Самый светлый день нашей семьи — и мы хотим разделить его с вами",
      dateLabel: "11 октября 2026, воскресенье",
    },
    dateISO: "2026-10-11T10:00:00+03:00",
    message: [
      "Дорогие близкие! Приглашаем вас на таинство крещения нашего сына Алексея.",
      "После службы будем рады видеть всех на семейном обеде — тихом и тёплом, как сам этот день.",
    ],
    timing: [
      { time: "10:00", label: "Таинство крещения" },
      { time: "11:30", label: "Общая фотография у храма" },
      { time: "13:00", label: "Семейный обед" },
    ],
    address: {
      title: "Храм Покрова → ресторан «Усадьба»",
      line: "с. Покровское, далее обед: ул. Парковая, 2",
      mapQuery: "Храм Покрова Покровское",
    },
    gallery: [
      { from: "#eff0ea", to: "#d8dbd0", label: "Тихий свет", src: "/demo/svet-1.webp", alt: "Белые свечи" },
      { from: "#eaece4", to: "#d0d4c6", label: "Свеча", src: "/demo/svet-2.webp", alt: "Зажжённая свеча тёплым вечером" },
      { from: "#f2f3ed", to: "#dcdfd3", label: "Алексей", src: "/demo/svet-3.webp", alt: "Младенец в белом пледе" },
      { from: "#edeee7", to: "#d4d8ca", label: "Маленькие ножки", src: "/demo/svet-4.webp", alt: "Ножки младенца, чёрно-белое фото" },
    ],
    music: { tempo: 66, notes: [261.63, 329.63, 392.0, 523.25, 392.0, 329.63] },
    rsvp: { deadline: "до 4 октября", question: "Будете ли вы с нами в этот день?" },
  },
];

export function getDemo(slug: string): DemoConfig | undefined {
  return DEMOS.find((d) => d.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Демо-открытки: одностраничный формат для тарифов «Фотокарточка»
   и «Открытка с анимацией» (рендерится компонентом DemoCard).        */

export interface CardDemoConfig {
  slug: string;
  designSlug: string;
  pageTitle: string;
  photo: { src: string; alt: string };
  eyebrow: string;
  title: string;
  /** Строки поздравления — появляются по очереди */
  lines: string[];
  signature: string;
  /** Есть только у «Открытки с анимацией» */
  music?: { tempo: number; notes: number[] };
  theme: { overlay: string; ink: string; accent: string; accentInk: string };
  /** Анимация фона (см. ParticleLayer) */
  effect?: "petals" | "snow" | "confetti" | "sparks" | "bokeh";
  effectColors?: string[];
}

export const CARD_DEMOS: CardDemoConfig[] = [
  {
    slug: "otkrytka",
    effect: "bokeh",
    effectColors: ["#e0a94e"],
    designSlug: "svecha",
    pageTitle: "Ирине — с днём рождения (демо открытки)",
    photo: { src: "/templates/svecha.webp", alt: "Именинный торт с горящими свечами" },
    eyebrow: "с днём рождения",
    title: "Ирина, с праздником!",
    lines: [
      "Пусть в этом году сбудется то, о чём ты боялась даже загадывать.",
      "Спасибо, что ты есть — рядом с тобой любой день становится лучше.",
      "Обнимаем крепко и ждём на торт!",
    ],
    signature: "— твои Соколовы",
    theme: {
      overlay: "#1a1208",
      ink: "#f6efe2",
      accent: "#e0a94e",
      accentInk: "#241708",
    },
  },
  {
    slug: "ogonki",
    effect: "sparks",
    effectColors: ["#e8b45a", "#f4d488"],
    designSlug: "ogonki",
    pageTitle: "Мама, с юбилеем! (демо открытки с анимацией)",
    photo: { src: "/templates/ogonki.webp", alt: "Бенгальский огонь в руке в сумерках" },
    eyebrow: "с юбилеем",
    title: "Мама, это тебе",
    lines: [
      "Ты научила нас главному — радоваться простым вещам.",
      "Пусть эти огоньки горят так же долго, как твоё терпение к нам.",
      "Любим бесконечно. Сегодня празднуем тебя!",
    ],
    signature: "— Аня, Дима и внуки",
    music: { tempo: 76, notes: [293.66, 369.99, 440.0, 587.33, 440.0, 369.99] },
    theme: {
      overlay: "#121022",
      ink: "#f0ecfa",
      accent: "#e8b45a",
      accentInk: "#241a08",
    },
  },
  {
    slug: "mimoza",
    effect: "petals",
    effectColors: ["#e8a6bc", "#f2c3d4"],
    designSlug: "mimoza",
    pageTitle: "С 8 марта, наши дорогие! (демо открытки)",
    photo: { src: "/templates/mimoza.webp", alt: "Букет розовых тюльпанов" },
    eyebrow: "с 8 марта",
    title: "Наши дорогие, с праздником!",
    lines: [
      "Вы делаете этот офис местом, куда хочется приходить.",
      "Пусть весна начнётся сегодня — с цветов, комплиментов и короткого рабочего дня.",
      "Цветы уже едут. Торт — в переговорке!",
    ],
    signature: "— мужчины отдела",
    theme: { overlay: "#241018", ink: "#faeef2", accent: "#e08aa6", accentInk: "#2c0f1a" },
  },
  {
    slug: "hvoya",
    effect: "snow",
    effectColors: ["#ffffff"],
    designSlug: "hvoya",
    pageTitle: "С Новым годом, родные! (демо открытки)",
    photo: { src: "/templates/hvoya.webp", alt: "Заснеженная еловая ветка" },
    eyebrow: "с новым годом",
    title: "Родные, с Новым годом!",
    lines: [
      "Пусть этот год будет добрее прошлого — а прошлый был хорош, потому что в нём были вы.",
      "Желаем здоровья, снега под ёлку и поводов собираться чаще.",
      "Обнимаем через километры. Ваши.",
    ],
    signature: "— Ивановы, из заснеженной Москвы",
    theme: { overlay: "#0e1a14", ink: "#eaf4ee", accent: "#7cc09a", accentInk: "#0c1811" },
  },
  {
    slug: "dvoe",
    effect: "bokeh",
    effectColors: ["#d0a468"],
    designSlug: "dvoe",
    pageTitle: "10 лет вместе (демо открытки)",
    photo: { src: "/templates/dvoe.webp", alt: "Пара идёт по улице, держась за руки" },
    eyebrow: "годовщина",
    title: "10 лет. Подумать только",
    lines: [
      "Десять лет назад я обещал тебе горы. Получились в основном командировки и ремонт.",
      "Но каждое утро рядом с тобой — лучшее, что я выбирал в жизни.",
      "Сегодня в 19:00 — там, где было первое свидание. Не гугли, ты помнишь.",
    ],
    signature: "— твой Лёша",
    theme: { overlay: "#1c1712", ink: "#f4ede4", accent: "#d0a468", accentInk: "#221808" },
  },
  {
    slug: "spasibo",
    effect: "bokeh",
    effectColors: ["#a99ad4"],
    designSlug: "spasibo",
    pageTitle: "Спасибо, Мария Ивановна (демо открытки)",
    photo: { src: "/templates/spasibo.webp", alt: "Рука протягивает букет цветов" },
    eyebrow: "с благодарностью",
    title: "Мария Ивановна, спасибо",
    lines: [
      "Вы верили в наш класс, даже когда мы срывали контрольные и теряли дневники.",
      "Половина из нас поступила туда, куда мечтала, — и это во многом ваша заслуга.",
      "Мы выросли. А ваши уроки — остались.",
    ],
    signature: "— выпуск 2026, ваш 11 «Б»",
    theme: { overlay: "#171420", ink: "#f0edf6", accent: "#a99ad4", accentInk: "#171226" },
  },
  {
    slug: "kollege",
    effect: "confetti",
    effectColors: ["#66c2c6", "#e0879e", "#e8b45a", "#8fd07c"],
    designSlug: "kollege",
    pageTitle: "Никита, поздравляем! (демо открытки)",
    photo: { src: "/templates/kollege.webp", alt: "Разноцветное конфетти на бирюзовом фоне" },
    eyebrow: "от всей команды",
    title: "Никита, с повышением!",
    lines: [
      "Теперь официально: ты руководишь теми, кто ещё вчера прятал твою кружку.",
      "Мы рады, горды и уже придумали, что просить на ревью.",
      "С нас торт. С тебя — не меняться.",
    ],
    signature: "— вся команда, даже Олег",
    theme: { overlay: "#0f1e1f", ink: "#eaf6f6", accent: "#66c2c6", accentInk: "#0c1a1b" },
  },
  {
    slug: "polaroid",
    effect: "bokeh",
    effectColors: ["#c9b98a"],
    designSlug: "polaroid",
    pageTitle: "Держи флешбек (демо открытки)",
    photo: { src: "/templates/polaroid.webp", alt: "Стена с коллажем полароидных фотографий" },
    eyebrow: "просто так",
    title: "Держи флешбек",
    lines: [
      "Нашла нашу стену с фотками — и полчаса улыбалась как дура.",
      "Мы с тобой дружим уже столько, что половину историй нельзя рассказывать вслух.",
      "Скучаю. Давай увидимся на выходных?",
    ],
    signature: "— твоя Настя",
    theme: { overlay: "#1a1814", ink: "#f4f1ea", accent: "#c9b98a", accentInk: "#201c10" },
  },
  {
    slug: "lepestki",
    effect: "petals",
    effectColors: ["#e0879e", "#d06a86"],
    designSlug: "lepestki",
    pageTitle: "Для самой любимой (демо открытки с музыкой)",
    photo: { src: "/templates/lepestki.webp", alt: "Нежные розово-красные цветы крупным планом" },
    eyebrow: "14 февраля",
    title: "Для самой любимой",
    lines: [
      "Я не умею говорить красиво — ты знаешь. Поэтому пусть говорит музыка.",
      "Каждый день с тобой — как это фото: тёплый, мягкий и немного нереальный.",
      "Загляни вечером в карман пальто. Там кое-что есть.",
    ],
    signature: "— угадай кто",
    music: { tempo: 66, notes: [246.94, 311.13, 369.99, 493.88, 369.99, 311.13] },
    theme: { overlay: "#22101a", ink: "#f8ecf1", accent: "#e0879e", accentInk: "#2a0f19" },
  },
];

export function getCardDemo(slug: string): CardDemoConfig | undefined {
  return CARD_DEMOS.find((d) => d.slug === slug);
}
