import { getTariff, type TariffId } from "./pricing";

/**
 * Каталог шаблонов. Добавить новый дизайн = добавить один объект в массив
 * DESIGNS — карточка, страница шаблона, фильтры и sitemap подхватят его сами.
 */

export type StyleId =
  | "minimal"
  | "classic"
  | "bright"
  | "kids"
  | "floral"
  | "retro";

export const STYLES: Record<StyleId, string> = {
  minimal: "Минимализм",
  classic: "Классика",
  bright: "Яркий",
  kids: "Детский",
  floral: "Флористика",
  retro: "Ретро",
};

export type FeatureId =
  | "animation"
  | "music"
  | "gallery"
  | "map"
  | "timer"
  | "rsvp"
  | "dresscode"
  | "timing"
  | "faq";

export const FEATURES: Record<FeatureId, string> = {
  animation: "Анимация",
  music: "Музыка",
  gallery: "Фотогалерея",
  map: "Карта проезда",
  timer: "Таймер обратного отсчёта",
  rsvp: "Подтверждение гостей (RSVP)",
  dresscode: "Дресс-код",
  timing: "Тайминг дня",
  faq: "Вопросы и ответы",
};

/** Вариант генеративного превью (рисуется кодом, см. DesignPreview) */
export type PreviewVariant =
  | "arch"
  | "lines"
  | "confetti"
  | "star"
  | "wave"
  | "frame";

export interface Design {
  slug: string;
  title: string;
  occasion: string;
  tariff: TariffId;
  style: StyleId;
  features: FeatureId[];
  description: string;
  /** Что заказчик может поменять в этом шаблоне */
  editable: string[];
  /** Что в шаблоне зафиксировано */
  fixed: string[];
  /** 0–100, для сортировки «популярное» */
  popularity: number;
  isNew?: boolean;
  /** Слаг живого демо на /demo/[slug] */
  demoSlug?: string;
  /** Фото-превью (свободная лицензия, Unsplash), файл в /public/templates */
  photo?: { src: string; alt: string };
  preview: {
    from: string;
    to: string;
    ink: string;
    variant: PreviewVariant;
    caption: string;
    sub: string;
  };
}

const STANDARD_FEATURES: FeatureId[] = [
  "animation",
  "music",
  "gallery",
  "map",
  "timer",
  "rsvp",
];

export const DESIGNS: Design[] = [
  {
    slug: "tishina",
    photo: { src: "/templates/tishina.webp", alt: "Жених и невеста у свадебной арки на выездной церемонии" },
    title: "Тишина",
    occasion: "wedding",
    tariff: "standard",
    style: "minimal",
    features: [...STANDARD_FEATURES, "timing", "dresscode"],
    description:
      "Много воздуха, крупная антиква и ни одной лишней детали. Для пар, которые не любят «свадебное» — только имена, дата и самое важное.",
    editable: ["Имена и все тексты", "До 20 фото", "Дата, адрес, тайминг"],
    fixed: ["Структура блоков", "Цвета и шрифты"],
    popularity: 96,
    demoSlug: "tishina",
    preview: {
      from: "#efe9df",
      to: "#ddd2c0",
      ink: "#3d372c",
      variant: "arch",
      caption: "Д & М",
      sub: "19 декабря",
    },
  },
  {
    slug: "sad",
    photo: { src: "/templates/sad.webp", alt: "Свадебная композиция из зелени и белых цветов" },
    title: "Сад",
    occasion: "wedding",
    tariff: "premium",
    style: "floral",
    features: [...STANDARD_FEATURES, "timing", "dresscode", "faq"],
    description:
      "Живая ботаника без ванили: гравюрные листья, тёплая бумага, деликатная анимация. Цвета подстроим под вашу флористику.",
    editable: ["Тексты и фото", "Оттенки зелени и бумаги", "Доп. блоки"],
    fixed: ["Иллюстрации"],
    popularity: 88,
    demoSlug: "sad",
    preview: {
      from: "#e6ead9",
      to: "#c6d1b4",
      ink: "#3a4a33",
      variant: "frame",
      caption: "А & И",
      sub: "6 июня",
    },
  },
  {
    slug: "liniya",
    photo: { src: "/templates/liniya.webp", alt: "Праздничная сервировка стола с цветами и бокалами" },
    title: "Линия",
    occasion: "wedding",
    tariff: "basic",
    style: "classic",
    features: ["animation", "map", "timer", "rsvp"],
    description:
      "Классическая вёрстка с тонкими линиями и серифами. Быстрый и доступный вариант: меняем тексты и фото — и приглашение готово.",
    editable: ["Имена и тексты", "6 фото", "Дата и адрес"],
    fixed: ["Структура", "Цвета, шрифты", "Без музыки и галереи-слайдера"],
    popularity: 74,
    demoSlug: "liniya",
    preview: {
      from: "#f3efe8",
      to: "#e2dbcd",
      ink: "#4a4238",
      variant: "lines",
      caption: "Е & С",
      sub: "14 февраля",
    },
  },
  {
    slug: "konfetti",
    photo: { src: "/templates/konfetti.webp", alt: "Разноцветные воздушные шары в горошек на детском празднике" },
    title: "Конфетти",
    occasion: "kids-birthday",
    tariff: "standard",
    style: "kids",
    features: [...STANDARD_FEATURES, "timing"],
    description:
      "Летящие конфетти, крупные цифры возраста и таймер до дня Х. Цвет подберём под любимый цвет именинника.",
    editable: ["Имя и возраст", "Фото", "Цвет конфетти", "Программа праздника"],
    fixed: ["Структура блоков"],
    popularity: 92,
    demoSlug: "konfetti",
    preview: {
      from: "#f9e7c9",
      to: "#f4c98a",
      ink: "#6b3d12",
      variant: "confetti",
      caption: "Мише 6",
      sub: "12 апреля",
    },
  },
  {
    slug: "kosmos",
    photo: { src: "/templates/kosmos.webp", alt: "Звёздное ночное небо" },
    title: "Космос",
    occasion: "kids-birthday",
    tariff: "standard",
    style: "kids",
    features: [...STANDARD_FEATURES],
    description:
      "Тёмное небо, планеты и обратный отсчёт как перед запуском ракеты. Для юных космонавтов от 4 до 12 лет.",
    editable: ["Имя и возраст", "Фото экипажа", "Тексты"],
    fixed: ["Иллюстрации планет", "Тёмная гамма"],
    popularity: 81,
    isNew: true,
    demoSlug: "kosmos",
    preview: {
      from: "#1d2440",
      to: "#0f1226",
      ink: "#dfe6ff",
      variant: "star",
      caption: "Пуск!",
      sub: "З0 мая",
    },
  },
  {
    slug: "polnoch",
    photo: { src: "/templates/polnoch.webp", alt: "Коктейли на тёмной барной стойке" },
    title: "Полночь",
    occasion: "birthday",
    tariff: "basic",
    style: "minimal",
    features: ["animation", "timer", "rsvp", "map"],
    description:
      "Взрослый минимализм на глубоком тёмном фоне: крупная цифра, бокал шампанского из тонких линий, ничего лишнего.",
    editable: ["Имя и цифра", "Тексты", "3 фото"],
    fixed: ["Тёмная гамма", "Структура"],
    popularity: 78,
    demoSlug: "polnoch",
    preview: {
      from: "#23212b",
      to: "#141319",
      ink: "#e8e4f2",
      variant: "lines",
      caption: "35",
      sub: "ноябрь",
    },
  },
  {
    slug: "gran",
    photo: { src: "/templates/gran.webp", alt: "Торжественный зал со свечами и золотым декором" },
    title: "Грань",
    occasion: "jubilee",
    tariff: "standard",
    style: "classic",
    features: [...STANDARD_FEATURES, "timing"],
    description:
      "Торжественный тёмный дизайн с золотым акцентом и хроникой жизни юбиляра по десятилетиям. Для 50, 60 и 70 лет.",
    editable: ["Имя и дата", "Хроника по годам", "До 30 фото"],
    fixed: ["Гамма «графит и золото»"],
    popularity: 85,
    demoSlug: "gran",
    preview: {
      from: "#2b2618",
      to: "#171410",
      ink: "#e9d9a8",
      variant: "frame",
      caption: "50",
      sub: "юбилей",
    },
  },
  {
    slug: "pion",
    photo: { src: "/templates/pion.webp", alt: "Букет розовых пионов" },
    title: "Пион",
    occasion: "engagement",
    tariff: "standard",
    style: "floral",
    features: [...STANDARD_FEATURES],
    description:
      "Акварельные пионы и рукописные акценты — без открыточной приторности. Для помолвки или камерной росписи.",
    editable: ["Имена и тексты", "Фото", "Оттенок цветов"],
    fixed: ["Иллюстрации", "Структура"],
    popularity: 70,
    demoSlug: "pion",
    preview: {
      from: "#f6e3e6",
      to: "#e8c2ca",
      ink: "#6d3644",
      variant: "arch",
      caption: "Скоро",
      sub: "помолвка",
    },
  },
  {
    slug: "disko",
    photo: { src: "/templates/disko.webp", alt: "Светящиеся диско-шары в темноте" },
    title: "Диско",
    occasion: "hen-party",
    tariff: "basic",
    style: "retro",
    features: ["animation", "timer", "map", "rsvp"],
    description:
      "Зеркальный шар, неон и типографика из 90-х. Для девичника или мальчишника, который начнётся с правильного настроения.",
    editable: ["Тексты", "Программа вечера", "Цвет неона"],
    fixed: ["Структура", "Ретро-гамма"],
    popularity: 66,
    demoSlug: "disko",
    preview: {
      from: "#2a1e3f",
      to: "#161028",
      ink: "#f2c6ff",
      variant: "star",
      caption: "Go!",
      sub: "девичник",
    },
  },
  {
    slug: "aist",
    photo: { src: "/templates/aist.webp", alt: "Ножки новорождённого в мягком пледе" },
    title: "Аист",
    occasion: "baby-shower",
    tariff: "standard",
    style: "minimal",
    features: [...STANDARD_FEATURES, "faq"],
    description:
      "Пастель, мягкие формы и wish-list для гостей. Для baby shower и встречи малыша из роддома.",
    editable: ["Тексты", "Пол/нейтральная гамма", "Wish-list"],
    fixed: ["Иллюстрации"],
    popularity: 62,
    demoSlug: "aist",
    preview: {
      from: "#e3efe9",
      to: "#c8e0d4",
      ink: "#3c5c4e",
      variant: "wave",
      caption: "Ждём",
      sub: "малыша",
    },
  },
  {
    slug: "sekret",
    photo: { src: "/templates/sekret.webp", alt: "Бирюзовые и розовые воздушные шары" },
    title: "Секрет",
    occasion: "gender-party",
    tariff: "standard",
    style: "bright",
    features: [...STANDARD_FEATURES],
    description:
      "Половина страницы голубая, половина розовая, посередине — интрига и голосование гостей «мальчик или девочка».",
    editable: ["Тексты", "Дата и адрес", "Вопрос голосования"],
    fixed: ["Двухцветная механика"],
    popularity: 71,
    isNew: true,
    demoSlug: "sekret",
    preview: {
      from: "#bcd7f2",
      to: "#f2c3d4",
      ink: "#4a3b52",
      variant: "wave",
      caption: "Кто?",
      sub: "гендер-пати",
    },
  },
  {
    slug: "girlyanda",
    photo: { src: "/templates/girlyanda.webp", alt: "Тёплые огни новогодней гирлянды" },
    title: "Гирлянда",
    occasion: "new-year",
    tariff: "standard",
    style: "bright",
    features: [...STANDARD_FEATURES, "timing", "dresscode"],
    description:
      "Тёмная ель, тёплые огни гирлянды и программа вечера. Для корпоратива или домашней новогодней вечеринки.",
    editable: ["Тексты и программа", "Логотип компании", "Дресс-код"],
    fixed: ["Гамма «ель и огни»"],
    popularity: 83,
    demoSlug: "elka",
    preview: {
      from: "#173428",
      to: "#0c1f17",
      ink: "#ffd9a0",
      variant: "star",
      caption: "31.12",
      sub: "корпоратив",
    },
  },
  {
    slug: "protokol",
    photo: { src: "/templates/protokol.webp", alt: "Зал конференции с аудиторией" },
    title: "Протокол",
    occasion: "business",
    tariff: "premium",
    style: "minimal",
    features: ["animation", "map", "timer", "rsvp", "timing", "faq"],
    description:
      "Строгая сетка, программа по часам, спикеры и регистрация. Перекрасим в фирменные цвета вашей компании.",
    editable: ["Все тексты", "Фирменные цвета и логотип", "Программа, спикеры"],
    fixed: ["Типографика"],
    popularity: 58,
    demoSlug: "protokol",
    preview: {
      from: "#e8ebef",
      to: "#cfd6de",
      ink: "#2c3947",
      variant: "lines",
      caption: "Форум",
      sub: "10:00–18:00",
    },
  },
  {
    slug: "priznanie",
    photo: { src: "/templates/priznanie.webp", alt: "Силуэт влюблённой пары на закате" },
    title: "Признание",
    occasion: "love",
    tariff: "standard",
    style: "classic",
    features: ["animation", "music", "gallery", "timer"],
    description:
      "Ваша история по датам — от знакомства до сегодняшнего дня, с фотографиями и главным вопросом в финале.",
    editable: ["История по датам", "Фото", "Финальный вопрос"],
    fixed: ["Структура таймлайна"],
    popularity: 77,
    demoSlug: "priznanie",
    preview: {
      from: "#f0e0dc",
      to: "#dcc0ba",
      ink: "#5c3630",
      variant: "arch",
      caption: "Да?",
      sub: "наша история",
    },
  },
  {
    slug: "polaroid",
    photo: { src: "/templates/polaroid.webp", alt: "Стена с коллажем полароидных фотографий" },
    title: "Полароид",
    occasion: "postcard",
    tariff: "photocard",
    style: "retro",
    features: ["animation"],
    description:
      "Открытка-фотокарточка: одно фото в полароидной рамке, тёплый текст и подпись от руки. Самый быстрый способ порадовать.",
    editable: ["Фото", "Текст", "Подпись"],
    fixed: ["Одна страница", "Без музыки и RSVP"],
    popularity: 89,
    demoSlug: "polaroid",
    preview: {
      from: "#f4f1ea",
      to: "#e0dacc",
      ink: "#54503f",
      variant: "frame",
      caption: "С днём!",
      sub: "открытка",
    },
  },
  {
    slug: "zvonok",
    photo: { src: "/templates/zvonok.webp", alt: "Выпускники подбрасывают академические шапочки" },
    title: "Звонок",
    occasion: "graduation",
    tariff: "standard",
    style: "bright",
    features: [...STANDARD_FEATURES, "timing"],
    description:
      "Выпускной без банальностей: крупные даты «с … по …», фото класса, программа вечера и сбор подтверждений от родителей.",
    editable: ["Тексты и программа", "Фото", "Цвет акцента"],
    fixed: ["Структура"],
    popularity: 54,
    isNew: true,
    demoSlug: "zvonok",
    preview: {
      from: "#dfe9f2",
      to: "#bcd2e4",
      ink: "#2e4a63",
      variant: "wave",
      caption: "11 «А»",
      sub: "выпускной",
    },
  },

  /* ---- Открытки-фотокарточки, 350 ₽ — недорогой вход ---- */
  {
    slug: "svecha",
    photo: { src: "/templates/svecha.webp", alt: "Именинный торт с горящими свечами" },
    title: "Свеча",
    occasion: "birthday",
    tariff: "photocard",
    style: "classic",
    features: ["animation"],
    description:
      "Открытка на день рождения: одно фото, тёплые слова и подпись. Отправляется ссылкой — дешевле букета, а помнится дольше.",
    editable: ["Фото", "Текст", "Подпись"],
    fixed: ["Одна страница"],
    popularity: 87,
    isNew: true,
    demoSlug: "otkrytka",
    preview: {
      from: "#f2e3d0",
      to: "#e0c7a4",
      ink: "#5c452c",
      variant: "frame",
      caption: "С днём!",
      sub: "открытка",
    },
  },
  {
    slug: "mimoza",
    photo: { src: "/templates/mimoza.webp", alt: "Букет розовых тюльпанов" },
    title: "Мимоза",
    occasion: "holidays",
    tariff: "photocard",
    style: "floral",
    features: ["animation"],
    description:
      "Открытка к 8 марта: нежные цветы, фото и ваши слова. Один вечер — и у каждой коллеги личное поздравление, а не картинка из чата.",
    editable: ["Фото", "Текст", "Имя получателя"],
    fixed: ["Одна страница"],
    popularity: 72,
    isNew: true,
    demoSlug: "mimoza",
    preview: {
      from: "#f6e6ec",
      to: "#eac6d4",
      ink: "#6d3a4e",
      variant: "wave",
      caption: "8 марта",
      sub: "открытка",
    },
  },
  {
    slug: "hvoya",
    photo: { src: "/templates/hvoya.webp", alt: "Заснеженная еловая ветка" },
    title: "Хвоя",
    occasion: "new-year",
    tariff: "photocard",
    style: "minimal",
    features: ["animation"],
    description:
      "Новогодняя открытка-фотокарточка: снег, хвоя и ваше пожелание. Личное поздравление вместо пересланной картинки.",
    editable: ["Фото", "Текст", "Подпись"],
    fixed: ["Одна страница"],
    popularity: 68,
    isNew: true,
    demoSlug: "hvoya",
    preview: {
      from: "#e3ebe6",
      to: "#c2d4c8",
      ink: "#31473a",
      variant: "star",
      caption: "С Новым!",
      sub: "открытка",
    },
  },
  {
    slug: "dvoe",
    photo: { src: "/templates/dvoe.webp", alt: "Пара идёт по улице, держась за руки" },
    title: "Двое",
    occasion: "anniversary",
    tariff: "photocard",
    style: "classic",
    features: ["animation"],
    description:
      "Открытка на годовщину: ваше общее фото, цифра прожитых вместе лет и несколько честных слов.",
    editable: ["Фото", "Текст", "Цифра годовщины"],
    fixed: ["Одна страница"],
    popularity: 61,
    isNew: true,
    demoSlug: "dvoe",
    preview: {
      from: "#ece5da",
      to: "#d4c6b2",
      ink: "#4e4234",
      variant: "arch",
      caption: "10 лет",
      sub: "годовщина",
    },
  },
  {
    slug: "spasibo",
    photo: { src: "/templates/spasibo.webp", alt: "Рука протягивает букет цветов" },
    title: "Спасибо",
    occasion: "postcard",
    tariff: "photocard",
    style: "minimal",
    features: ["animation"],
    description:
      "Открытка-благодарность: врачу, учителю, другу — любому, кому хочется сказать спасибо не в двух словах, а красиво.",
    editable: ["Фото", "Текст", "Подпись"],
    fixed: ["Одна страница"],
    popularity: 58,
    isNew: true,
    demoSlug: "spasibo",
    preview: {
      from: "#eae7f0",
      to: "#cfc9dd",
      ink: "#4a4460",
      variant: "wave",
      caption: "Спасибо",
      sub: "открытка",
    },
  },
  {
    slug: "kollege",
    photo: { src: "/templates/kollege.webp", alt: "Разноцветное конфетти на бирюзовом фоне" },
    title: "Коллеге",
    occasion: "postcard",
    tariff: "photocard",
    style: "bright",
    features: ["animation"],
    description:
      "Поздравление коллеге от всей команды: общее фото, подписи каждого и немного конфетти. Собирается за один день.",
    editable: ["Фото", "Текст", "Подписи команды"],
    fixed: ["Одна страница"],
    popularity: 55,
    isNew: true,
    demoSlug: "kollege",
    preview: {
      from: "#d9ecec",
      to: "#aed4d6",
      ink: "#2e5254",
      variant: "confetti",
      caption: "Ура!",
      sub: "коллеге",
    },
  },

  /* ---- Открытки с анимацией и музыкой, 600 ₽ ---- */
  {
    slug: "ogonki",
    photo: { src: "/templates/ogonki.webp", alt: "Бенгальский огонь в руке в сумерках" },
    title: "Огоньки",
    occasion: "birthday",
    tariff: "animated-card",
    style: "bright",
    features: ["animation", "music"],
    description:
      "Открытка, которая оживает: искры бенгальского огня, музыка по нажатию и поздравление, появляющееся строка за строкой.",
    editable: ["Фото", "Текст", "Музыка из подборки"],
    fixed: ["Одна страница", "Механика анимации"],
    popularity: 76,
    isNew: true,
    demoSlug: "ogonki",
    preview: {
      from: "#2b2333",
      to: "#171221",
      ink: "#f2d9a8",
      variant: "star",
      caption: "С днём!",
      sub: "с музыкой",
    },
  },
  {
    slug: "lepestki",
    photo: { src: "/templates/lepestki.webp", alt: "Нежные розово-красные цветы крупным планом" },
    title: "Лепестки",
    occasion: "holidays",
    tariff: "animated-card",
    style: "floral",
    features: ["animation", "music"],
    description:
      "Валентинка по ссылке: лепестки опадают под музыку, а в конце — ваши слова. Для 14 февраля и просто признаний.",
    editable: ["Фото", "Текст", "Музыка из подборки"],
    fixed: ["Одна страница", "Механика анимации"],
    popularity: 69,
    isNew: true,
    demoSlug: "lepestki",
    preview: {
      from: "#f4dfe2",
      to: "#e4b8c0",
      ink: "#68323e",
      variant: "arch",
      caption: "14.02",
      sub: "с музыкой",
    },
  },

  /* ---- Пополнение основных тарифов ---- */
  {
    slug: "shariki",
    photo: { src: "/templates/shariki.webp", alt: "Ребёнок держит большой розовый шар в виде цифры три" },
    title: "Шарики",
    occasion: "kids-birthday",
    tariff: "basic",
    style: "kids",
    features: ["animation", "timer", "rsvp", "map"],
    description:
      "Доступное детское приглашение: шар с цифрой возраста, фото именинника и таймер до праздника. Меняем тексты и фото — готово.",
    editable: ["Имя и возраст", "Фото", "Дата и адрес"],
    fixed: ["Структура", "Цвета"],
    popularity: 73,
    isNew: true,
    demoSlug: "shariki",
    preview: {
      from: "#f6e4ea",
      to: "#e8c2cf",
      ink: "#6d3a50",
      variant: "confetti",
      caption: "Нам 3!",
      sub: "детский",
    },
  },
  {
    slug: "svet",
    photo: { src: "/templates/svet.webp", alt: "Белые свечи с мягким тёплым светом" },
    title: "Свет",
    occasion: "christening",
    tariff: "standard",
    style: "minimal",
    features: [...STANDARD_FEATURES, "faq"],
    description:
      "Спокойное приглашение на крестины: имя малыша, храм и время таинства, адрес семейного обеда и подтверждение для близких.",
    editable: ["Имя и тексты", "Фото", "Адреса и время"],
    fixed: ["Светлая гамма", "Структура"],
    popularity: 57,
    isNew: true,
    demoSlug: "svet",
    preview: {
      from: "#eff0ea",
      to: "#d8dbd0",
      ink: "#4c5044",
      variant: "arch",
      caption: "Крестины",
      sub: "таинство",
    },
  },
];

export function getDesign(slug: string): Design | undefined {
  return DESIGNS.find((d) => d.slug === slug);
}

export function designPrice(design: Design): number {
  return getTariff(design.tariff).price;
}

export function designsByOccasion(occasion: string): Design[] {
  return DESIGNS.filter((d) => d.occasion === occasion);
}

export function topDesigns(count: number): Design[] {
  return [...DESIGNS].sort((a, b) => b.popularity - a.popularity).slice(0, count);
}

export function similarDesigns(design: Design, count = 3): Design[] {
  return DESIGNS.filter((d) => d.slug !== design.slug)
    .sort((a, b) => {
      const score = (x: Design) =>
        (x.occasion === design.occasion ? 2 : 0) +
        (x.style === design.style ? 1 : 0);
      return score(b) - score(a) || b.popularity - a.popularity;
    })
    .slice(0, count);
}