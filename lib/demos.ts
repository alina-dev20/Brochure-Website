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
  timing: { time: string; label: string }[];
  address: { title: string; line: string; mapQuery: string };
  dresscode?: { label: string; colors: string[] };
  /** Фото галереи; без src рисуется градиентная заглушка */
  gallery: { from: string; to: string; label: string; src?: string; alt?: string }[];
  music: { tempo: number; notes: number[] };
  rsvp: { deadline: string; question: string };
}

export const DEMOS: DemoConfig[] = [
  {
    slug: "tishina",
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
];

export function getDemo(slug: string): DemoConfig | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
