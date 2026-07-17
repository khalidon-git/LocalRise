// Small, reusable illustrated spot scenes (inline SVG, brand palette).
// Used to warm up otherwise text-heavy sections (Contact, FAQ, footer CTA).
// Each scene namespaces its gradient ids (they all render on one page).

function Defs({ p }: { p: string }) {
  return (
    <defs>
      <linearGradient id={`${p}-blue`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2F5BFF" />
        <stop offset="1" stopColor="#5B84FF" />
      </linearGradient>
      <linearGradient id={`${p}-green`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#12B981" />
        <stop offset="1" stopColor="#4ADE9E" />
      </linearGradient>
      <linearGradient id={`${p}-gold`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFC93C" />
        <stop offset="1" stopColor="#FFA91E" />
      </linearGradient>
      <linearGradient id={`${p}-purple`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#9B5BFF" />
        <stop offset="1" stopColor="#C79BFF" />
      </linearGradient>
      <linearGradient id={`${p}-orange`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FF8A4C" />
        <stop offset="1" stopColor="#FFB26B" />
      </linearGradient>
    </defs>
  );
}

// Two chat bubbles + a happy reply — for the Contact section.
export function ConsultScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 180" className={className} role="img" aria-label="Illustration of a friendly chat conversation" xmlns="http://www.w3.org/2000/svg">
      <Defs p="cs" />
      <circle cx="150" cy="90" r="78" fill="url(#cs-blue)" opacity="0.08" />
      <g className="animate-float-soft">
        <rect x="40" y="42" width="150" height="66" rx="20" fill="url(#cs-blue)" />
        <path d="M64 108 l0 20 20 -14 Z" fill="url(#cs-blue)" />
        <circle cx="78" cy="75" r="7" fill="#FFFFFF" opacity="0.95" />
        <circle cx="102" cy="75" r="7" fill="#FFFFFF" opacity="0.75" />
        <circle cx="126" cy="75" r="7" fill="#FFFFFF" opacity="0.55" />
      </g>
      <g className="animate-float-slow">
        <rect x="150" y="96" width="118" height="56" rx="18" fill="#FFFFFF" stroke="#EAEDF6" strokeWidth="2" />
        <path d="M244 152 l0 16 -18 -12 Z" fill="#FFFFFF" />
        <circle cx="176" cy="124" r="13" fill="url(#cs-green)" />
        <path d="M170 124 l4 4 8 -8" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="198" y="118" width="54" height="7" rx="3.5" fill="#0A0A0C" opacity="0.7" />
        <rect x="198" y="130" width="36" height="6" rx="3" fill="#0A0A0C" opacity="0.35" />
      </g>
      <path d="M250 44 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="url(#cs-gold)" />
      <path d="M28 120 l2.4 6 6 2.4 -6 2.4 -2.4 6 -2.4 -6 -6 -2.4 6 -2.4 Z" fill="url(#cs-orange)" />
    </svg>
  );
}

// A big question mark + lightbulb — for the FAQ intro.
export function HelpScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} role="img" aria-label="Illustration representing helpful answers" xmlns="http://www.w3.org/2000/svg">
      <Defs p="hs2" />
      <circle cx="120" cy="100" r="82" fill="url(#hs2-purple)" opacity="0.08" />
      <g className="animate-float-soft">
        <circle cx="104" cy="96" r="52" fill="url(#hs2-blue)" />
        <path d="M92 82 a13 13 0 1 1 20 11 c -6 4 -8 7 -8 13" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        <circle cx="104" cy="124" r="5.5" fill="#FFFFFF" />
      </g>
      <g className="animate-float-slow">
        <circle cx="182" cy="60" r="26" fill="#FFFFFF" stroke="#EAEDF6" strokeWidth="2" />
        <path d="M182 46 a12 12 0 0 1 7 21 l0 5 -14 0 0 -5 a12 12 0 0 1 7 -21 Z" fill="url(#hs2-gold)" />
        <rect x="176" y="74" width="12" height="4" rx="2" fill="#0A0A0C" opacity="0.4" />
      </g>
      <circle cx="60" cy="150" r="16" fill="url(#hs2-green)" />
      <circle cx="60" cy="150" r="3" fill="#fff" />
      <circle cx="52" cy="150" r="3" fill="#fff" opacity="0.7" />
      <circle cx="68" cy="150" r="3" fill="#fff" opacity="0.7" />
    </svg>
  );
}

// A rising bar chart + arrow + rocket — designed to sit on the dark footer.
export function GrowScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 180" className={className} role="img" aria-label="Illustration of business growth" xmlns="http://www.w3.org/2000/svg">
      <Defs p="gs" />
      <g>
        <rect x="30" y="110" width="26" height="44" rx="6" fill="#FFFFFF" opacity="0.25" />
        <rect x="66" y="88" width="26" height="66" rx="6" fill="url(#gs-blue)" />
        <rect x="102" y="66" width="26" height="88" rx="6" fill="url(#gs-green)" />
        <rect x="138" y="40" width="26" height="114" rx="6" fill="url(#gs-gold)" />
      </g>
      <g className="animate-float-slow">
        <path d="M40 118 L84 96 L118 74 L176 40" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M160 40 h18 v18" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="animate-float-soft">
        <circle cx="220" cy="70" r="34" fill="#FFFFFF" />
        <path d="M220 46 c 9 4 15 15 15 27 l -7 7 -16 0 -7 -7 c 0 -12 6 -23 15 -27 Z" fill="url(#gs-orange)" />
        <circle cx="220" cy="66" r="4.5" fill="#FFFFFF" />
        <path d="M214 82 l-3 9 M226 82 l3 9" stroke="url(#gs-gold)" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="M250 130 l2.4 6 6 2.4 -6 2.4 -2.4 6 -2.4 -6 -6 -2.4 6 -2.4 Z" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}
