/**
 * ЕДИНЫЙ конфиг цен. Меняете цифры здесь — они обновляются на странице цен,
 * в карточках каталога, на страницах шаблонов и в калькуляторе.
 */

export type TariffId =
  | "photocard"
  | "animated-card"
  | "basic"
  | "standard"
  | "premium"
  | "custom";

export interface Tariff {
  id: TariffId;
  name: string;
  /** Цена «от», в рублях */
  price: number;
  tagline: string;
  features: string[];
  excluded?: string[];
  popular?: boolean;
}

export const TARIFFS: Tariff[] = [
  {
    id: "photocard",
    name: "Открытка-фотокарточка",
    price: 350,
    tagline: "Тёплое поздравление за вечер",
    features: ["Одна страница", "Ваше фото", "Текст поздравления", "Подпись"],
    excluded: ["Анимация", "Музыка", "RSVP"],
  },
  {
    id: "animated-card",
    name: "Открытка с анимацией",
    price: 600,
    tagline: "Открытка, которая оживает",
    features: [
      "Одна страница",
      "Фото и текст",
      "Лёгкая анимация",
      "Музыка по нажатию",
    ],
    excluded: ["Галерея, карта, RSVP"],
  },
  {
    id: "basic",
    name: "Базовый шаблон",
    price: 1500,
    tagline: "Готовый дизайн с вашими данными",
    features: [
      "Готовый дизайн из каталога",
      "Замена текстов и фото",
      "Ссылка + QR-код",
    ],
    excluded: ["Правки структуры и цветов"],
  },
  {
    id: "standard",
    name: "Стандарт",
    price: 2400,
    tagline: "Полное приглашение со всеми блоками",
    features: [
      "Всё из «Базового»",
      "Анимация и музыка",
      "Фотогалерея",
      "Карта проезда",
      "Таймер обратного отсчёта",
      "Форма подтверждения (RSVP)",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Премиум",
    price: 3200,
    tagline: "Шаблон, подстроенный под вас",
    features: [
      "Всё из «Стандарта»",
      "Правки цветов и шрифтов",
      "Дополнительные блоки",
      "Две языковые версии",
    ],
  },
  {
    id: "custom",
    name: "Индивидуальная разработка",
    price: 4000,
    tagline: "Дизайн с нуля по вашей идее",
    features: [
      "Дизайн по референсу или с нуля",
      "Любая структура и стиль",
      "Под фирменный стиль компании",
      "«Под ключ» — от идеи до ссылки",
    ],
  },
];

export interface Addon {
  id: string;
  name: string;
  price: number;
  hint?: string;
}

export const ADDONS: Addon[] = [
  {
    id: "extra-block",
    name: "Дополнительный блок",
    price: 300,
    hint: "тайминг дня, дресс-код, вопросы-ответы, wish-list",
  },
  {
    id: "own-music",
    name: "Своя музыка",
    price: 300,
    hint: "поставим вашу композицию вместо стандартной",
  },
  {
    id: "second-lang",
    name: "Вторая языковая версия",
    price: 700,
    hint: "приглашение на двух языках с переключателем",
  },
  {
    id: "own-domain",
    name: "Свой домен",
    price: 990,
    hint: "адрес вида ivan-i-anna.ru на один год",
  },
];

/** Наценка за срочность: готовность за 24 часа */
export const URGENCY = {
  id: "urgency",
  name: "Срочно — за 24 часа",
  multiplierPct: 40,
} as const;

export const GIFT = "QR-код для печати — в подарок к каждому заказу";

export function getTariff(id: TariffId): Tariff {
  return TARIFFS.find((t) => t.id === id) ?? TARIFFS[1];
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

export interface Estimate {
  base: number;
  addonsSum: number;
  urgencyFee: number;
  total: number;
}

/** Расчёт стоимости: (тариф + допы) × наценка за срочность, округление до 10 ₽ */
export function calcEstimate(
  tariffId: TariffId,
  addonIds: string[],
  urgent: boolean,
): Estimate {
  const base = getTariff(tariffId).price;
  const addonsSum = ADDONS.filter((a) => addonIds.includes(a.id)).reduce(
    (sum, a) => sum + a.price,
    0,
  );
  const subtotal = base + addonsSum;
  const urgencyFee = urgent
    ? Math.round((subtotal * URGENCY.multiplierPct) / 100 / 10) * 10
    : 0;
  return { base, addonsSum, urgencyFee, total: subtotal + urgencyFee };
}
