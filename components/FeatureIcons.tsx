/** Иконки возможностей приглашения (инлайн-SVG, наследуют currentColor). */

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export const FEATURE_ICONS: Record<string, React.ReactNode> = {
  animation: (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path {...stroke} d="M4 11c2.5-5 5-7 7-7s4.5 2 7 7c-2.5 5-5 7-7 7s-4.5-2-7-7Z" />
      <circle {...stroke} cx="11" cy="11" r="2.5" />
    </svg>
  ),
  music: (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path {...stroke} d="M8 17V5l9-2v12" />
      <circle {...stroke} cx="6" cy="17" r="2" />
      <circle {...stroke} cx="15" cy="15" r="2" />
    </svg>
  ),
  gallery: (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <rect {...stroke} x="3" y="4" width="16" height="14" rx="2" />
      <path {...stroke} d="m3 14 4-4 4 4 3-3 5 5" />
      <circle {...stroke} cx="8.5" cy="8.5" r="1.2" />
    </svg>
  ),
  map: (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path {...stroke} d="M11 20s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10Z" />
      <circle {...stroke} cx="11" cy="10" r="2.2" />
    </svg>
  ),
  timer: (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle {...stroke} cx="11" cy="12" r="7" />
      <path {...stroke} d="M11 9v3.5l2.5 1.5M9 2.5h4" />
    </svg>
  ),
  rsvp: (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path {...stroke} d="M3.5 6.5h15v11h-15z" />
      <path {...stroke} d="m3.5 7 7.5 6 7.5-6" />
      <path {...stroke} d="m14 3 1 2 2 .3-1.5 1.4.4 2L14 7.7" opacity="0" />
    </svg>
  ),
  dresscode: (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path {...stroke} d="M8 3.5 4 7l2 2.5 1.5-1V18h7V8.5l1.5 1L18 7l-4-3.5a3 3 0 0 1-6 0Z" />
    </svg>
  ),
  timing: (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path {...stroke} d="M5 4.5h12M5 11h12M5 17.5h7" />
      <circle {...stroke} cx="3" cy="4.5" r="0.2" />
    </svg>
  ),
  faq: (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path {...stroke} d="M4 4h14v10H9l-4 4V4Z" />
      <path {...stroke} d="M9.5 8.5a1.8 1.8 0 1 1 2.6 1.6c-.6.3-1 .6-1 1.2M11 13.4v.1" />
    </svg>
  ),
};
