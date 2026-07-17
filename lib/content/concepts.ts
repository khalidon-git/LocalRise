// ---------------------------------------------------------------------------
// Concept Websites — premium fictional sites that demonstrate design range.
//
// These are DESIGN CONCEPTS, not client work. Nothing here claims a real
// customer, a real result, or a real brand. Every surface that renders them
// badges them as concepts. See docs/content.md — do not turn these into implied
// case studies.
//
// Adding a concept = append one object here. The listing page, detail page,
// sitemap and homepage teaser all derive from this array; no other file needs
// touching.
//
// ⚠️ Every colour/typography value is a LITERAL Tailwind class string. Tailwind's
// JIT scans source text, so `bg-[${hex}]` would silently produce no CSS.
// Keep them literal.
// ---------------------------------------------------------------------------

/** The visual identity that makes each concept feel like a different studio. */
export type ConceptIdentity = {
  canvas: string; // page background inside the mock
  surface: string; // card background
  brand: string; // primary colour as background
  brandText: string; // primary colour as text
  gradient: string; // from-…/to-… pair for the hero
  ink: string; // heading text colour
  muted: string; // placeholder/·bar colour
  onBrand: string; // text colour on top of `brand`
  font: string; // font-sans | font-serif | font-mono | font-display
  radius: string; // corner personality: rounded-none → rounded-3xl
};

/** Fake-but-plausible content for the code-rendered site preview. */
export type ConceptPreview = {
  layout: "centered" | "bold" | "editorial" | "grid" | "dark" | "split";
  domain: string;
  nav: string[];
  heroKicker: string;
  heroTitle: string;
  heroSub: string;
  cta: string;
  cards: string[];
};

export type Concept = {
  slug: string;
  name: string;
  industry: string;
  tagline: string;
  /** One-liner for cards. */
  summary: string;
  /** Two or three sentences for the detail page. */
  description: string;
  /** What we'd actually build — shown as a checklist. */
  features: string[];
  /** The design thinking, in plain language. */
  designStyle: string;
  designNotes: string[];
  identity: ConceptIdentity;
  preview: ConceptPreview;
};

export const concepts: Concept[] = [
  {
    slug: "aarohi-dental",
    name: "Aarohi Dental Studio",
    industry: "Dental Clinic",
    tagline: "Calm, clinical, reassuring",
    summary: "A calm clinic site that makes booking an appointment feel effortless.",
    description:
      "Dental sites often feel cold or cluttered — exactly the wrong tone when someone is already nervous. This concept leans on generous white space, soft blues and plain language so the page feels like a calm waiting room rather than a sales pitch.",
    features: [
      "Online appointment booking",
      "Treatments explained simply",
      "Doctor profiles & credentials",
      "Google Maps & directions",
      "Patient reviews section",
      "WhatsApp for quick questions",
    ],
    designStyle: "Calm clinical minimalism",
    designNotes: [
      "Cool blues and lots of white space to lower anxiety",
      "Rounded, soft shapes — nothing sharp or clinical-cold",
      "Booking is the only primary action on every screen",
    ],
    identity: {
      canvas: "bg-[#F3F7FF]",
      surface: "bg-white",
      brand: "bg-[#2F5BFF]",
      brandText: "text-[#2F5BFF]",
      gradient: "from-[#2f5bff] to-[#6f9bff]",
      ink: "text-[#0B1B3A]",
      muted: "bg-[#DCE7FF]",
      onBrand: "text-white",
      font: "font-sans",
      radius: "rounded-2xl",
    },
    preview: {
      layout: "centered",
      domain: "aarohidental.in",
      nav: ["Treatments", "Our Doctors", "Reviews", "Contact"],
      heroKicker: "Gentle dentistry",
      heroTitle: "Dental care without the nerves",
      heroSub: "Same-day appointments, honest pricing, and a team that explains everything first.",
      cta: "Book appointment",
      cards: ["Cleaning", "Braces", "Implants"],
    },
  },
  {
    slug: "spice-route-kitchen",
    name: "Spice Route Kitchen",
    industry: "Restaurant",
    tagline: "Loud, warm, appetite-first",
    summary: "A menu-led restaurant site built to make people hungry and order on WhatsApp.",
    description:
      "Restaurants sell with appetite, not paragraphs. This concept goes bold — saffron and chilli tones, oversized type and a menu that dominates the page — with WhatsApp ordering never more than one tap away.",
    features: [
      "Photo-first digital menu",
      "WhatsApp ordering in one tap",
      "Table reservation enquiry",
      "Today's specials banner",
      "Zomato / Swiggy links",
      "Directions & opening hours",
    ],
    designStyle: "Warm, appetite-first maximalism",
    designNotes: [
      "Saffron and chilli tones chosen to trigger appetite",
      "Oversized display type — the menu is the hero, not the copy",
      "Every screen keeps ordering within thumb reach",
    ],
    identity: {
      canvas: "bg-[#FFF6EC]",
      surface: "bg-white",
      brand: "bg-[#E0452C]",
      brandText: "text-[#E0452C]",
      gradient: "from-[#e0452c] to-[#ff9d3d]",
      ink: "text-[#3A1408]",
      muted: "bg-[#FFE2C7]",
      onBrand: "text-white",
      font: "font-display",
      radius: "rounded-xl",
    },
    preview: {
      layout: "bold",
      domain: "spiceroutekitchen.in",
      nav: ["Menu", "Specials", "Order", "Visit"],
      heroKicker: "Fresh every morning",
      heroTitle: "Slow-cooked. Properly spiced.",
      heroSub: "Order on WhatsApp — we'll have it ready in 20 minutes.",
      cta: "Order on WhatsApp",
      cards: ["Biryani", "Curries", "Breads"],
    },
  },
  {
    slug: "veranda-stays",
    name: "Veranda Stays",
    industry: "Boutique Hotel",
    tagline: "Editorial, serene, unhurried",
    summary: "A boutique stay presented like a travel magazine, built around direct bookings.",
    description:
      "Boutique hotels compete with aggregators that take a cut of every booking. This concept borrows from travel editorial — a serif voice, restrained palette and room stories with space to breathe — to make booking direct feel like the premium choice.",
    features: [
      "Room showcase with detail pages",
      "Direct booking enquiry form",
      "Local guide / things to do",
      "Amenities at a glance",
      "Gallery-led storytelling",
      "Map & getting here",
    ],
    designStyle: "Editorial serif calm",
    designNotes: [
      "Serif headings and a deep, restrained green — quiet, not shouty",
      "Sharper corners and wide margins borrowed from print layout",
      "Direct booking outranks every aggregator link on the page",
    ],
    identity: {
      canvas: "bg-[#F6F4EE]",
      surface: "bg-white",
      brand: "bg-[#1F4739]",
      brandText: "text-[#1F4739]",
      gradient: "from-[#1f4739] to-[#4b8a6f]",
      ink: "text-[#1B2A24]",
      muted: "bg-[#E2E6DD]",
      onBrand: "text-white",
      font: "font-serif",
      radius: "rounded-md",
    },
    preview: {
      layout: "editorial",
      domain: "verandastays.in",
      nav: ["Rooms", "The Estate", "Journal", "Book"],
      heroKicker: "Coorg, Karnataka",
      heroTitle: "A quiet estate, six rooms, no rush.",
      heroSub: "Book direct and skip the middleman — always our best rate.",
      cta: "Check availability",
      cards: ["Garden Suite", "Hill View", "The Loft"],
    },
  },
  {
    slug: "urban-nest-furniture",
    name: "Urban Nest Furniture",
    industry: "Furniture Store",
    tagline: "Warm, tactile, catalogue-led",
    summary: "A showroom catalogue that turns browsers into WhatsApp enquiries.",
    description:
      "Furniture buyers browse for weeks before they walk in. This concept treats the catalogue as the whole product — warm neutrals, big product tiles and an enquiry button on every piece, so a Saturday scroll becomes a Monday showroom visit.",
    features: [
      "Product catalogue by room",
      "Enquire on WhatsApp per item",
      "Material & dimension details",
      "Showroom directions",
      "Custom order request",
      "Delivery & warranty info",
    ],
    designStyle: "Warm catalogue",
    designNotes: [
      "Oat and terracotta — showroom warmth, not furniture-flatpack blue",
      "Big tactile product tiles; the grid is the navigation",
      "Every item carries its own enquiry action",
    ],
    identity: {
      canvas: "bg-[#FAF6F1]",
      surface: "bg-white",
      brand: "bg-[#B4562F]",
      brandText: "text-[#B4562F]",
      gradient: "from-[#b4562f] to-[#e0a06a]",
      ink: "text-[#33231A]",
      muted: "bg-[#EFE3D7]",
      onBrand: "text-white",
      font: "font-sans",
      radius: "rounded-lg",
    },
    preview: {
      layout: "grid",
      domain: "urbannest.in",
      nav: ["Living", "Bedroom", "Office", "Visit"],
      heroKicker: "Made in Jodhpur",
      heroTitle: "Furniture that outlives the trend",
      heroSub: "Solid wood, honest joinery, delivered across India.",
      cta: "Enquire on WhatsApp",
      cards: ["Sofas", "Beds", "Storage"],
    },
  },
  {
    slug: "iron-oak-fitness",
    name: "Iron & Oak Fitness",
    industry: "Gym & Fitness",
    tagline: "High contrast, energetic, direct",
    summary: "A gym site with the intensity of the room it's selling.",
    description:
      "Most gym sites look like every other gym site. This concept goes near-black with an electric accent and a monospaced voice — it reads like equipment, not a spa — and pushes one action: book a free trial class.",
    features: [
      "Class timetable",
      "Trainer profiles",
      "Free trial booking",
      "Membership plans compared",
      "Before / after gallery",
      "WhatsApp for quick questions",
    ],
    designStyle: "High-contrast performance",
    designNotes: [
      "Near-black canvas with one electric accent — maximum contrast",
      "Monospaced type for a technical, equipment-like voice",
      "Sharp corners; nothing soft or spa-like",
    ],
    identity: {
      canvas: "bg-[#0C0F0D]",
      surface: "bg-[#171B18]",
      brand: "bg-[#C6F24E]",
      brandText: "text-[#C6F24E]",
      gradient: "from-[#c6f24e] to-[#7bd63f]",
      ink: "text-white",
      muted: "bg-[#2A302C]",
      onBrand: "text-[#0C0F0D]",
      font: "font-mono",
      radius: "rounded-none",
    },
    preview: {
      layout: "dark",
      domain: "ironandoak.fit",
      nav: ["Classes", "Trainers", "Pricing", "Trial"],
      heroKicker: "Indiranagar, Bengaluru",
      heroTitle: "Show up. We'll handle the rest.",
      heroSub: "Strength, conditioning and coaching that actually watches your form.",
      cta: "Book free trial",
      cards: ["Strength", "HIIT", "Mobility"],
    },
  },
  {
    slug: "bloom-beauty-studio",
    name: "Bloom Beauty Studio",
    industry: "Salon & Spa",
    tagline: "Soft, luxe, booking-led",
    summary: "A salon site where booking a slot takes two taps.",
    description:
      "Salons live and die by the calendar. This concept keeps a soft, luxe surface — blush tones, a serif voice, generous curves — over a ruthlessly practical booking flow, because a pretty site that doesn't fill chairs is decoration.",
    features: [
      "Online slot booking",
      "Service menu with pricing",
      "Stylist profiles",
      "Before / after gallery",
      "Offers & packages",
      "WhatsApp reminders",
    ],
    designStyle: "Soft luxe",
    designNotes: [
      "Blush and plum with heavy curves — calm, premium, unhurried",
      "Serif headings for a salon-brochure feel",
      "Pricing shown upfront; booking never more than two taps away",
    ],
    identity: {
      canvas: "bg-[#FDF4F7]",
      surface: "bg-white",
      brand: "bg-[#9B3B6A]",
      brandText: "text-[#9B3B6A]",
      gradient: "from-[#9b3b6a] to-[#e79cbd]",
      ink: "text-[#3A1226]",
      muted: "bg-[#F6DFE8]",
      onBrand: "text-white",
      font: "font-serif",
      radius: "rounded-3xl",
    },
    preview: {
      layout: "split",
      domain: "bloomstudio.in",
      nav: ["Services", "Stylists", "Offers", "Book"],
      heroKicker: "Bandra West, Mumbai",
      heroTitle: "An hour that's entirely yours",
      heroSub: "Hair, skin and nails — book a slot in under a minute.",
      cta: "Book a slot",
      cards: ["Hair", "Skin", "Nails"],
    },
  },
];

export function getConcept(slug: string) {
  return concepts.find((c) => c.slug === slug);
}
