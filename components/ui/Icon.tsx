import type { SVGProps } from "react";

export type IconName =
  | "browser" | "map" | "chat" | "cart" | "sparkles" | "star" | "bolt"
  | "palette" | "stethoscope" | "utensils" | "bed" | "cap" | "hammer"
  | "sofa" | "grid" | "building" | "scissors" | "compass" | "list" | "pen"
  | "code" | "rocket" | "shield" | "tag" | "heart" | "target" | "layers"
  | "arrow-right" | "arrow-up-right" | "check" | "plus" | "minus"
  | "whatsapp" | "phone" | "mail" | "calendar" | "clock" | "quote"
  | "menu" | "close" | "pin" | "spark"
  | "camera" | "home" | "chart" | "users" | "award" | "leaf" | "gem" | "shirt" | "dumbbell";

const paths: Record<IconName, JSX.Element> = {
  browser: (<><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18" /><path d="M7 6.5h.01M9.5 6.5h.01" /></>),
  map: (<><path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" /><path d="M9 4v14M15 6v14" /></>),
  chat: (<><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-4 3.5V6.5Z" /><path d="M8.5 9.5h7M8.5 12.5h4" /></>),
  cart: (<><path d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.5-1.2L21 8H6" /><circle cx="9.5" cy="20" r="1.3" /><circle cx="17.5" cy="20" r="1.3" /></>),
  sparkles: (<><path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" /><path d="M18.5 4v3M20 5.5h-3" /></>),
  star: (<><path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.5Z" /></>),
  bolt: (<><path d="M13 3 5 13h5l-1 8 8-11h-5l1-7Z" /></>),
  palette: (<><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2s-.6-1.4-.6-2 .6-1 1.6-1H18a3 3 0 0 0 3-3 8 8 0 0 0-9-7Z" /><circle cx="8" cy="11" r="1" /><circle cx="12" cy="8" r="1" /><circle cx="16" cy="11" r="1" /></>),
  stethoscope: (<><path d="M6 4v5a4 4 0 0 0 8 0V4" /><path d="M6 4H4.5M14 4h1.5" /><path d="M10 17a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2" /><circle cx="19" cy="14" r="2" /></>),
  utensils: (<><path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11" /><path d="M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" /></>),
  bed: (<><path d="M3 8v11M3 12h18v7M21 19v-4a3 3 0 0 0-3-3H9v3" /><path d="M6 12V9.5A1.5 1.5 0 0 1 7.5 8H9" /></>),
  cap: (<><path d="m3 9 9-4 9 4-9 4-9-4Z" /><path d="M7 11v4c0 1.1 2.2 2.5 5 2.5s5-1.4 5-2.5v-4" /><path d="M21 9v4.5" /></>),
  hammer: (<><path d="m14.5 6.5 3 3M13 8l-8.5 8.5a2 2 0 1 0 3 3L16 11" /><path d="M11.5 4.5 19 12l2.5-2.5-7.5-7.5-2.5 2.5Z" /></>),
  sofa: (<><path d="M4 11V8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5V11" /><path d="M3 12.5A1.5 1.5 0 0 1 4.5 11 1.5 1.5 0 0 1 6 12.5V15h12v-2.5a1.5 1.5 0 0 1 3 0V18H3v-5.5Z" /><path d="M6 18v2M18 18v2" /></>),
  grid: (<><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>),
  building: (<><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01M10 21v-4h4v4" /></>),
  scissors: (<><circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><path d="M7.8 7.6 20 18M7.8 16.4 20 6M12 12l2 1.6" /></>),
  compass: (<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>),
  list: (<><path d="M8 6h12M8 12h12M8 18h12" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></>),
  pen: (<><path d="M14 5.5 18.5 10 8 20.5l-4.5 1 1-4.5L14 5.5Z" /><path d="m13 6.5 4.5 4.5" /></>),
  code: (<><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></>),
  rocket: (<><path d="M12 3c3 1.5 5 5 5 9l-2.5 2.5h-5L7 12c0-4 2-7.5 5-9Z" /><circle cx="12" cy="10" r="1.4" /><path d="M9.5 16.5 8 20M14.5 16.5 16 20" /></>),
  shield: (<><path d="M12 3 5 6v5c0 4.2 2.9 7.7 7 9 4.1-1.3 7-4.8 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>),
  tag: (<><path d="M4 12.5 11.5 5H20v8.5L12.5 21 4 12.5Z" /><circle cx="15.5" cy="9.5" r="1.4" /></>),
  heart: (<><path d="M12 20s-7-4.4-7-9.5A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 3.5C19 15.6 12 20 12 20Z" /></>),
  target: (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.6" /></>),
  layers: (<><path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" /><path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" /></>),
  "arrow-right": (<><path d="M5 12h14M13 6l6 6-6 6" /></>),
  "arrow-up-right": (<><path d="M7 17 17 7M8 7h9v9" /></>),
  check: (<><path d="m5 12.5 4.5 4.5L19 7" /></>),
  plus: (<><path d="M12 5v14M5 12h14" /></>),
  minus: (<><path d="M5 12h14" /></>),
  whatsapp: (<><path d="M12 3.8a8.2 8.2 0 0 0-7 12.4L4 20.2l4.2-1a8.2 8.2 0 1 0 3.8-15.4Z" /><path d="M9 8.5c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2l-1.8-.8c-.2-.1-.5-.2-.7.1l-.6.8c-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2.2-1.6-.6-.7-.3-.6-.6-1.1-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4Z" fill="currentColor" stroke="none" /></>),
  phone: (<><path d="M6 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 6 4Z" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 5.5L20 7" /></>),
  calendar: (<><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" /></>),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  quote: (<><path d="M9 6c-2.5 1-4 3-4 6v6h6v-6H7c0-2 1-3 2.5-3.5L9 6Zm10 0c-2.5 1-4 3-4 6v6h6v-6h-4c0-2 1-3 2.5-3.5L19 6Z" fill="currentColor" stroke="none" /></>),
  menu: (<><path d="M4 7h16M4 12h16M4 17h16" /></>),
  close: (<><path d="M6 6l12 12M18 6 6 18" /></>),
  pin: (<><path d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" /><circle cx="12" cy="11" r="2.2" /></>),
  spark: (<><path d="M12 4v4M12 16v4M4 12h4M16 12h4" /><path d="m6.5 6.5 2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" /></>),
  camera: (<><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="m8 7 1.4-2.5h5.2L16 7" /><circle cx="12" cy="13.5" r="3.4" /></>),
  home: (<><path d="M4 11 12 4l8 7" /><path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" /><path d="M10 20v-5h4v5" /></>),
  chart: (<><path d="M5 20V11M10.5 20V5M16 20v-8" /><path d="M3 20h18" /></>),
  users: (<><circle cx="9" cy="8" r="3" /><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><circle cx="17" cy="9" r="2.3" /><path d="M15.3 13.2c2.4.4 4.2 2.2 4.2 5.8" /></>),
  award: (<><circle cx="12" cy="9" r="5.2" /><path d="M9 13.5 7.5 21l4.5-2.3 4.5 2.3-1.5-7.5" /></>),
  leaf: (<><path d="M20 4c0 9-6 15-15 15C5 10 11 4 20 4Z" /><path d="M9 19c2-4 6-8 10-11" /></>),
  gem: (<><path d="M4 9 8 4h8l4 5-10 11L4 9Z" /><path d="M4 9h16M9.5 4 8 9l4 11 4-11-1.5-5" /></>),
  shirt: (<><path d="M8 4 4 7l2 3 2-1.3V20h8V8.7L18 10l2-3-4-3-2 1.5h-4L8 4Z" /></>),
  dumbbell: (<><path d="M2 9v6M22 9v6" /><rect x="4.5" y="8" width="3" height="8" rx="1.2" /><rect x="16.5" y="8" width="3" height="8" rx="1.2" /><path d="M7.5 12h9" /></>),
};

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  strokeWidth?: number;
};

export function Icon({ name, size = 24, strokeWidth = 1.6, className, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

export default Icon;
