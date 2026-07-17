// Custom illustrated hero scene for LocalRise — a local shop coming online:
// a storefront + phone showing its site, with floating badges (reviews, map
// pin, growth, chat). Pure inline SVG in the brand palette, no external assets.
// A few groups gently float via the existing float-soft / float-slow keyframes.
export function HeroScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 560 520"
        role="img"
        aria-label="Illustration of a local shop growing online — a storefront and a phone showing its website, with review, location and growth badges"
        className="h-auto w-full max-w-[560px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hs-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EEF3FF" />
            <stop offset="1" stopColor="#FDF6FF" />
          </linearGradient>
          <linearGradient id="hs-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2F5BFF" />
            <stop offset="1" stopColor="#5B84FF" />
          </linearGradient>
          <linearGradient id="hs-orange" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF8A4C" />
            <stop offset="1" stopColor="#FFB26B" />
          </linearGradient>
          <linearGradient id="hs-green" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#12B981" />
            <stop offset="1" stopColor="#4ADe9E" />
          </linearGradient>
          <linearGradient id="hs-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFC93C" />
            <stop offset="1" stopColor="#FFA91E" />
          </linearGradient>
          <linearGradient id="hs-purple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9B5BFF" />
            <stop offset="1" stopColor="#C79BFF" />
          </linearGradient>
          <linearGradient id="hs-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F4F7FF" />
          </linearGradient>
        </defs>

        {/* backdrop panel */}
        <rect x="16" y="20" width="528" height="470" rx="44" fill="url(#hs-sky)" />
        {/* colour blobs */}
        <circle cx="450" cy="120" r="110" fill="url(#hs-blue)" opacity="0.16" />
        <circle cx="120" cy="410" r="90" fill="url(#hs-orange)" opacity="0.16" />
        <circle cx="470" cy="400" r="70" fill="url(#hs-green)" opacity="0.14" />
        {/* dotted arc — growth path */}
        <path d="M70 360 C 180 250, 300 260, 470 130" fill="none" stroke="#2F5BFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 14" opacity="0.5" />

        {/* ground shadow */}
        <ellipse cx="270" cy="430" rx="180" ry="20" fill="#2F5BFF" opacity="0.07" />

        {/* ---- Storefront ---- */}
        <g>
          {/* building body */}
          <rect x="96" y="196" width="220" height="212" rx="14" fill="#FFFFFF" stroke="#E6E9F2" strokeWidth="2" />
          {/* awning */}
          <path d="M84 196 L328 196 L316 168 L96 168 Z" fill="url(#hs-blue)" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M${100 + i * 38} 196 l 10 -28 l 19 0 l -10 28 Z`} fill="#FFFFFF" opacity="0.28" />
          ))}
          {/* sign board */}
          <rect x="128" y="210" width="156" height="34" rx="8" fill="#0A0A0C" />
          <circle cx="146" cy="227" r="7" fill="url(#hs-gold)" />
          <rect x="160" y="221" width="90" height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
          <rect x="160" y="231" width="60" height="5" rx="2.5" fill="#FFFFFF" opacity="0.5" />
          {/* window */}
          <rect x="120" y="262" width="80" height="76" rx="10" fill="url(#hs-sky)" stroke="#E6E9F2" strokeWidth="2" />
          <rect x="132" y="276" width="40" height="7" rx="3.5" fill="#5B84FF" opacity="0.7" />
          <rect x="132" y="292" width="56" height="6" rx="3" fill="#C7D2F0" />
          <rect x="132" y="305" width="46" height="6" rx="3" fill="#C7D2F0" />
          {/* door */}
          <rect x="222" y="278" width="72" height="130" rx="10" fill="url(#hs-blue)" opacity="0.12" />
          <rect x="230" y="288" width="56" height="120" rx="8" fill="#FFFFFF" stroke="#E6E9F2" strokeWidth="2" />
          <circle cx="276" cy="348" r="4" fill="#2F5BFF" />
          {/* OPEN pill */}
          <rect x="236" y="300" width="44" height="16" rx="8" fill="url(#hs-green)" />
          <rect x="244" y="306" width="28" height="4" rx="2" fill="#FFFFFF" />
          {/* little plant */}
          <rect x="112" y="356" width="16" height="52" rx="4" fill="url(#hs-orange)" />
          <path d="M120 356 c -14 -6 -18 -22 -6 -30 c 6 12 8 20 6 30 Z" fill="url(#hs-green)" />
          <path d="M120 356 c 14 -4 20 -18 8 -28 c -6 12 -8 18 -8 28 Z" fill="url(#hs-green)" opacity="0.8" />
        </g>

        {/* ---- Phone showing the site ---- */}
        <g className="animate-float-soft">
          <rect x="330" y="196" width="150" height="252" rx="26" fill="#0A0A0C" />
          <rect x="340" y="206" width="130" height="232" rx="18" fill="url(#hs-screen)" />
          {/* notch */}
          <rect x="386" y="214" width="38" height="7" rx="3.5" fill="#0A0A0C" opacity="0.85" />
          {/* screen hero */}
          <rect x="350" y="230" width="110" height="60" rx="12" fill="url(#hs-blue)" />
          <rect x="360" y="244" width="46" height="7" rx="3.5" fill="#FFFFFF" opacity="0.9" />
          <rect x="360" y="256" width="70" height="6" rx="3" fill="#FFFFFF" opacity="0.55" />
          <rect x="360" y="270" width="40" height="12" rx="6" fill="#FFFFFF" />
          {/* cards */}
          <rect x="350" y="300" width="52" height="46" rx="10" fill="#FFFFFF" stroke="#EAEDF6" strokeWidth="2" />
          <rect x="408" y="300" width="52" height="46" rx="10" fill="#FFFFFF" stroke="#EAEDF6" strokeWidth="2" />
          <rect x="358" y="310" width="26" height="26" rx="6" fill="url(#hs-orange)" opacity="0.85" />
          <rect x="416" y="310" width="26" height="26" rx="6" fill="url(#hs-purple)" opacity="0.85" />
          {/* whatsapp button */}
          <rect x="350" y="356" width="110" height="26" rx="13" fill="url(#hs-green)" />
          <circle cx="366" cy="369" r="6" fill="#FFFFFF" />
          <rect x="378" y="365" width="60" height="7" rx="3.5" fill="#FFFFFF" opacity="0.95" />
          {/* nav dots */}
          <rect x="392" y="416" width="26" height="5" rx="2.5" fill="#0A0A0C" opacity="0.15" />
        </g>

        {/* ---- Floating badges ---- */}
        {/* review stars */}
        <g className="animate-float-slow">
          <rect x="60" y="120" width="132" height="52" rx="16" fill="#FFFFFF" stroke="#EAEDF6" strokeWidth="2" />
          <circle cx="86" cy="146" r="16" fill="url(#hs-gold)" />
          <path d="M86 138 l2.6 5.3 5.8 .8 -4.2 4.1 1 5.8 -5.2 -2.7 -5.2 2.7 1 -5.8 -4.2 -4.1 5.8 -.8 Z" fill="#FFFFFF" />
          <rect x="112" y="136" width="66" height="8" rx="4" fill="#0A0A0C" opacity="0.8" />
          <g fill="url(#hs-gold)">
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={116 + i * 13} cy={156} r="4" />
            ))}
          </g>
        </g>

        {/* map pin */}
        <g className="animate-float-soft">
          <path d="M470 190 c 0 26 -26 44 -26 44 c 0 0 -26 -18 -26 -44 a 26 26 0 0 1 52 0 Z" fill="url(#hs-blue)" />
          <circle cx="444" cy="188" r="11" fill="#FFFFFF" />
          <circle cx="444" cy="188" r="5" fill="#2F5BFF" />
        </g>

        {/* growth chart card */}
        <g className="animate-float-slow">
          <rect x="72" y="300" width="120" height="86" rx="16" fill="#FFFFFF" stroke="#EAEDF6" strokeWidth="2" />
          <rect x="86" y="314" width="52" height="7" rx="3.5" fill="#0A0A0C" opacity="0.65" />
          <path d="M88 366 L112 348 L132 356 L172 322" fill="none" stroke="#12B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="172" cy="322" r="5" fill="#12B981" />
          <path d="M162 320 h12 v-12" fill="none" stroke="#12B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* chat bubble */}
        <g className="animate-float-soft">
          <rect x="426" y="330" width="96" height="60" rx="18" fill="url(#hs-green)" />
          <path d="M446 388 l0 16 16 -12 Z" fill="url(#hs-green)" />
          <rect x="442" y="350" width="64" height="7" rx="3.5" fill="#FFFFFF" opacity="0.95" />
          <rect x="442" y="365" width="44" height="7" rx="3.5" fill="#FFFFFF" opacity="0.7" />
        </g>

        {/* sparkles */}
        <g fill="#2F5BFF">
          <path d="M300 96 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" opacity="0.7" />
          <path d="M520 250 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z" fill="#9B5BFF" opacity="0.7" />
          <path d="M40 250 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#FF8A4C" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

export default HeroScene;
