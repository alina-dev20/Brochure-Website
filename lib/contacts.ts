/**
 * ЕДИНСТВЕННОЕ место, где заданы контакты студии.
 * Правка здесь обновляет шапку, футер, страницу контактов, плавающую кнопку,
 * форму заявки и микроразметку.
 *
 * Email у студии нет намеренно — связь только Telegram и WhatsApp.
 */

export interface ManagerContact {
  /** Подпись рядом с контактом (уточняется владельцем) */
  label: string;
  telegram: { handle: string; url: string };
  whatsapp: { phoneDisplay: string; phoneTel: string; url: string };
}

export const MANAGERS: ManagerContact[] = [
  {
    label: "Менеджер 1",
    telegram: { handle: "@alino4kaa_14", url: "https://t.me/alino4kaa_14" },
    whatsapp: {
      phoneDisplay: "+7 988 997-48-15",
      phoneTel: "+79889974815",
      url: "https://wa.me/79889974815",
    },
  },
  {
    label: "Менеджер 2",
    telegram: { handle: "@konkretniysihs", url: "https://t.me/konkretniysihs" },
    whatsapp: {
      phoneDisplay: "+7 928 967-55-44",
      phoneTel: "+79289675544",
      url: "https://wa.me/79289675544",
    },
  },
];

/** Основные ссылки (первый менеджер) — для мест, где нужна одна кнопка */
export const PRIMARY = MANAGERS[0];

/** Все ссылки для микроразметки sameAs */
export const CONTACT_URLS = MANAGERS.flatMap((m) => [m.telegram.url, m.whatsapp.url]);
