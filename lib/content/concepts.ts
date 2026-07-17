// ---------------------------------------------------------------------------
// Concept Websites — premium fictional sites that demonstrate design range.
//
// These are DESIGN CONCEPTS, not client work. Nothing here claims a real
// customer, a real result, or a real brand. Every surface that renders them
// badges them as concepts. See docs/content.md — do not turn these into implied
// case studies.
//
// Each concept also has a matching entry (same `slug`) in
// lib/content/conceptSites.ts, which powers the full, independent "live" site
// at /concepts/<slug>/live/. See docs/concepts.md and
// knowledge/decisions/007-concept-live-sites.md.
//
// Adding a concept = append one object here AND one in conceptSites.ts. The
// listing page, detail page, sitemap and homepage teaser all derive from this
// array; no other file needs touching for the card/detail surfaces.
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
    slug: "noir-and-vine",
    name: "Noir & Vine",
    industry: "Luxury Restaurant",
    tagline: "Dark, intimate, appetite as theatre",
    summary: "A fine-dining site built around scarcity — sixteen seats, one tasting menu, a real reservation flow.",
    description:
      "Fine dining sells restraint, not volume. This concept goes near-black with a single gold accent, a serif voice for the menu, and a full-bleed hero photograph — the digital equivalent of a maître d' who already knows your name.",
    features: [
      "Nightly tasting menu, updated weekly",
      "Reservation enquiry flow",
      "Chef & kitchen story",
      "Private dining & events booking",
      "Wine pairing showcase",
      "Press & guest quotes",
    ],
    designStyle: "Dark, intimate fine-dining",
    designNotes: [
      "Near-black canvas with a single gold accent — restraint reads as confidence",
      "Serif headings for the menu; nothing about this site shouts",
      "Every screen keeps the reservation CTA one tap away",
    ],
    identity: {
      canvas: "bg-[#0B0A08]",
      surface: "bg-[#18150F]",
      brand: "bg-[#C9A24B]",
      brandText: "text-[#C9A24B]",
      gradient: "from-[#c9a24b] to-[#e8c983]",
      ink: "text-[#F3EFE6]",
      muted: "bg-[#2A2620]",
      onBrand: "text-[#0B0A08]",
      font: "font-serif",
      radius: "rounded-sm",
    },
    preview: {
      layout: "dark",
      domain: "noirandvine.in",
      nav: ["Menu", "Chef", "Reservations", "Events"],
      heroKicker: "Fine dining · Mumbai",
      heroTitle: "A table, held for you.",
      heroSub: "Sixteen seats a night. A tasting menu that changes with the market.",
      cta: "Reserve a table",
      cards: ["Tasting Menu", "Wine Pairing", "Private Dining"],
    },
  },
  {
    slug: "meridian-dental",
    name: "Meridian Dental Studio",
    industry: "Premium Dental Clinic",
    tagline: "Calm, boutique, technology-forward",
    summary: "A boutique dental site that makes a first-time patient feel informed, not sold to.",
    description:
      "Premium dental care needs to feel less like a clinic and more like a studio. This concept leans on sage green, generous white space and a centred hero so booking a consultation feels like the calmest decision on the page.",
    features: [
      "Online consultation booking",
      "Treatment pricing shown upfront",
      "Doctor profiles & credentials",
      "Before/after smile gallery",
      "Digital scan technology showcase",
      "Patient reviews section",
    ],
    designStyle: "Calm boutique minimalism",
    designNotes: [
      "Sage green and cream to lower anxiety before a single word is read",
      "Centred hero and generous whitespace — nothing competes for attention",
      "Pricing shown upfront, because uncertainty is the real source of dental anxiety",
    ],
    identity: {
      canvas: "bg-[#FAFAF6]",
      surface: "bg-white",
      brand: "bg-[#4C6B58]",
      brandText: "text-[#4C6B58]",
      gradient: "from-[#4c6b58] to-[#7fa38c]",
      ink: "text-[#1B231D]",
      muted: "bg-[#E3E7DE]",
      onBrand: "text-white",
      font: "font-sans",
      radius: "rounded-2xl",
    },
    preview: {
      layout: "centered",
      domain: "meridiandental.in",
      nav: ["Treatments", "Doctors", "Technology", "Contact"],
      heroKicker: "Boutique dentistry",
      heroTitle: "Dentistry, reimagined for calm.",
      heroSub: "Digital scans, same-day plans, and a team that explains everything first.",
      cta: "Book a consultation",
      cards: ["Invisalign", "Implants", "Smile Design"],
    },
  },
  {
    slug: "casa-alma",
    name: "Casa Alma",
    industry: "Boutique Hotel",
    tagline: "Editorial, warm, unhurried",
    summary: "A boutique stay presented like a travel magazine, built to win direct bookings.",
    description:
      "Boutique hotels compete with aggregators that take a cut of every booking. This concept borrows from travel editorial — a serif voice, warm terracotta palette and room stories with space to breathe — to make booking direct feel like the premium choice.",
    features: [
      "Room showcase with pricing",
      "Direct booking enquiry form",
      "The grounds & local guide",
      "Amenities at a glance",
      "Gallery-led storytelling",
      "Reviews from past guests",
    ],
    designStyle: "Warm editorial calm",
    designNotes: [
      "Terracotta and cream — sun-warmed, not corporate-hospitality blue",
      "Serif headings and wide margins borrowed from print travel magazines",
      "Direct booking outranks every aggregator link on the page",
    ],
    identity: {
      canvas: "bg-[#FBF6EF]",
      surface: "bg-white",
      brand: "bg-[#A8492A]",
      brandText: "text-[#A8492A]",
      gradient: "from-[#a8492a] to-[#d97a54]",
      ink: "text-[#2B1D14]",
      muted: "bg-[#E7D9C4]",
      onBrand: "text-white",
      font: "font-serif",
      radius: "rounded-md",
    },
    preview: {
      layout: "editorial",
      domain: "casaalma.in",
      nav: ["Rooms", "The Grounds", "Dining", "Book"],
      heroKicker: "Assagao, Goa",
      heroTitle: "Eleven rooms. One long lunch.",
      heroSub: "A restored Portuguese-era house, and mornings with nowhere to be.",
      cta: "Check availability",
      cards: ["Garden Room", "Courtyard Suite", "Rooftop Loft"],
    },
  },
  {
    slug: "ashford-vale",
    name: "Ashford & Vale",
    industry: "Luxury Real Estate",
    tagline: "Discreet, editorial, quietly confident",
    summary: "A private real estate site that sells discretion — off-market listings, not a public portal.",
    description:
      "Luxury real estate doesn't need volume, it needs trust. This concept goes deep navy with brass accents, a serif voice for listings, and a split hero — the visual language of a private bank, not a listings aggregator.",
    features: [
      "Off-market listings showcase",
      "Private viewing request flow",
      "Sell & staging services",
      "Buyer advisory content",
      "Closed-sales portfolio",
      "Confidential enquiry form",
    ],
    designStyle: "Discreet editorial luxury",
    designNotes: [
      "Deep navy and brass — the palette of a private bank, not a portal",
      "Serif headings against a dark canvas for quiet confidence",
      "Sharp corners; nothing rounded or approachable-soft",
    ],
    identity: {
      canvas: "bg-[#0E1420]",
      surface: "bg-[#1A2233]",
      brand: "bg-[#B08D57]",
      brandText: "text-[#B08D57]",
      gradient: "from-[#b08d57] to-[#d9c090]",
      ink: "text-[#F1F3F8]",
      muted: "bg-[#232C40]",
      onBrand: "text-[#0E1420]",
      font: "font-serif",
      radius: "rounded-none",
    },
    preview: {
      layout: "split",
      domain: "ashfordvale.in",
      nav: ["Listings", "Sell", "Advisory", "Contact"],
      heroKicker: "Private sales · Mumbai & Goa",
      heroTitle: "Homes that rarely reach the market.",
      heroSub: "Off-market listings and buyers who value discretion.",
      cta: "View listings",
      cards: ["Malabar Hill", "Alibaug House", "Worli Sky Residence"],
    },
  },
  {
    slug: "forge-performance",
    name: "Forge Performance Studio",
    industry: "Modern Fitness Gym",
    tagline: "High-contrast, kinetic, no-fluff",
    summary: "A performance studio site with the intensity of the training floor it's selling.",
    description:
      "Most gym sites look like every other gym site. This concept goes near-black with an electric accent and a bold, kinetic voice — it reads like a training log, not a spa — pushing one action: book a free trial.",
    features: [
      "Program showcase with pricing",
      "Free trial booking flow",
      "Coach profiles",
      "Class timetable",
      "Member results gallery",
      "Membership plans compared",
    ],
    designStyle: "High-contrast performance",
    designNotes: [
      "Near-black canvas with electric orange — maximum contrast, zero softness",
      "Bold, oversized type — the program is the hero, not the copy",
      "Sharp corners; nothing spa-like or decorative",
    ],
    identity: {
      canvas: "bg-[#0A0A0A]",
      surface: "bg-[#1B1B1B]",
      brand: "bg-[#FF4B1F]",
      brandText: "text-[#FF4B1F]",
      gradient: "from-[#ff4b1f] to-[#ff8a5c]",
      ink: "text-white",
      muted: "bg-[#2A2A2A]",
      onBrand: "text-white",
      font: "font-mono",
      radius: "rounded-none",
    },
    preview: {
      layout: "bold",
      domain: "forgeperformance.fit",
      nav: ["Programs", "Coaches", "Membership", "Trial"],
      heroKicker: "Lower Parel, Mumbai",
      heroTitle: "Train like the season depends on it.",
      heroSub: "Strength, conditioning, and a coach watching every rep.",
      cta: "Book free trial",
      cards: ["Foundations", "Strength Block", "Competitor Prep"],
    },
  },
  {
    slug: "maison-rile",
    name: "Maison Rilé",
    industry: "Fashion Brand",
    tagline: "Stark, editorial, unmistakably slow",
    summary: "A ready-to-wear studio site built like a lookbook — small runs, made to order.",
    description:
      "Fashion brands live and die on image quality and restraint. This concept goes stark black-on-cream with oversized display type and an asymmetric editorial grid — the visual language of a studio that makes forty pieces a season, not four thousand.",
    features: [
      "Seasonal lookbook",
      "Made-to-order enquiry flow",
      "Atelier & craftsmanship story",
      "Stockist locator",
      "Sizing & care guide",
      "Editorial gallery",
    ],
    designStyle: "Stark editorial minimalism",
    designNotes: [
      "Black, white and cream only — the clothes provide the colour",
      "Oversized display type in an asymmetric editorial grid",
      "Sharp corners throughout; nothing soft distracts from the garment",
    ],
    identity: {
      canvas: "bg-[#F7F5F1]",
      surface: "bg-white",
      brand: "bg-[#161513]",
      brandText: "text-[#161513]",
      gradient: "from-[#161513] to-[#4a463d]",
      ink: "text-[#161513]",
      muted: "bg-[#EDE9E1]",
      onBrand: "text-white",
      font: "font-display",
      radius: "rounded-none",
    },
    preview: {
      layout: "grid",
      domain: "maisonrile.com",
      nav: ["Collection", "Atelier", "Lookbook", "Stockists"],
      heroKicker: "Autumn/Winter Collection",
      heroTitle: "Cut for how you actually move.",
      heroSub: "Twelve pieces, made in small runs, in a studio in Byculla.",
      cta: "Shop the collection",
      cards: ["The Coat", "Wrap Dress", "Tailored Trouser"],
    },
  },
  {
    slug: "atelier-norlind",
    name: "Atelier Norlind",
    industry: "Interior Design Studio",
    tagline: "Warm, tactile, project-led",
    summary: "A full-service interior studio site that sells process as much as finished rooms.",
    description:
      "Interior design sells trust before it sells taste. This concept uses warm linen and clay tones, a serif voice and a project-led portfolio to show the thinking behind a room, not just the finished photograph.",
    features: [
      "Project portfolio with detail",
      "Studio process explained",
      "Furniture & sourcing story",
      "Consultation booking",
      "Material palette showcase",
      "Client testimonials",
    ],
    designStyle: "Warm tactile calm",
    designNotes: [
      "Linen and clay tones — a palette that feels lived-in, not showroom-staged",
      "Serif headings and generous whitespace borrowed from print portfolios",
      "Every project shown with the thinking behind it, not just a hero shot",
    ],
    identity: {
      canvas: "bg-[#F6F1EA]",
      surface: "bg-white",
      brand: "bg-[#8A6A4A]",
      brandText: "text-[#8A6A4A]",
      gradient: "from-[#8a6a4a] to-[#bd9c78]",
      ink: "text-[#2B2419]",
      muted: "bg-[#E3D8C4]",
      onBrand: "text-white",
      font: "font-serif",
      radius: "rounded-xl",
    },
    preview: {
      layout: "editorial",
      domain: "ateliernorlind.in",
      nav: ["Projects", "Studio", "Process", "Enquire"],
      heroKicker: "Residential & boutique commercial",
      heroTitle: "Rooms that feel like they were always finished.",
      heroSub: "Full-service interior design — concept to the last cushion.",
      cta: "Start a project",
      cards: ["Altamount Road", "Koregaon Park", "Bandra Studio"],
    },
  },
  {
    slug: "kessler-bright",
    name: "Kessler Bright Architecture",
    industry: "Architecture Firm",
    tagline: "Structured, technical, site-first",
    summary: "An architecture practice site built like a well-drafted plan — precise, quiet, confident.",
    description:
      "Architecture sells judgement, not decoration. This concept goes concrete-grey with a single burnt-orange accent and a structured editorial grid — the visual equivalent of a firm that studies the site for six weeks before drawing a wall.",
    features: [
      "Project portfolio by type",
      "Practice & approach story",
      "Awards & recognition",
      "Services breakdown",
      "Site-visit request flow",
      "Press & publication features",
    ],
    designStyle: "Structured technical precision",
    designNotes: [
      "Concrete grey with one burnt-orange accent — restraint as a design statement",
      "Sharp corners and a structured grid, drafted rather than decorated",
      "Every project shown with type, year and a one-line thesis",
    ],
    identity: {
      canvas: "bg-[#F4F4F2]",
      surface: "bg-white",
      brand: "bg-[#C4441E]",
      brandText: "text-[#C4441E]",
      gradient: "from-[#c4441e] to-[#e17a4f]",
      ink: "text-[#141414]",
      muted: "bg-[#E9E9E5]",
      onBrand: "text-white",
      font: "font-sans",
      radius: "rounded-none",
    },
    preview: {
      layout: "grid",
      domain: "kesslerbright.in",
      nav: ["Projects", "Practice", "Approach", "Contact"],
      heroKicker: "Architecture & urban design",
      heroTitle: "Buildings that answer the site first.",
      heroSub: "A fourteen-person practice, residential to adaptive reuse.",
      cta: "View projects",
      cards: ["Alibaug House", "Fort Warehouse", "Lonavala Retreat"],
    },
  },
  {
    slug: "flowstack",
    name: "Flowstack",
    industry: "SaaS Startup",
    tagline: "Clean, technical, product-led",
    summary: "A workflow-analytics SaaS site built around a live product demo, not stock photography.",
    description:
      "SaaS sells clarity fast. This concept skips photography entirely for a code-rendered product dashboard, indigo-on-near-black gradients and a clean modern voice — proving the product by showing it, not describing it.",
    features: [
      "Live-style dashboard preview",
      "Usage-based pricing tiers",
      "Feature grid by use case",
      "Integration showcase",
      "Customer proof section",
      "Free trial signup flow",
    ],
    designStyle: "Clean product-led SaaS",
    designNotes: [
      "Indigo-violet on near-black — a modern, technical B2B palette",
      "A code-rendered dashboard replaces photography entirely",
      "Pricing and product are one scroll apart, never buried in a nav menu",
    ],
    identity: {
      canvas: "bg-[#0B0B14]",
      surface: "bg-[#181828]",
      brand: "bg-[#6C5CE7]",
      brandText: "text-[#6C5CE7]",
      gradient: "from-[#6c5ce7] to-[#a58bff]",
      ink: "text-white",
      muted: "bg-[#22223A]",
      onBrand: "text-white",
      font: "font-sans",
      radius: "rounded-2xl",
    },
    preview: {
      layout: "dark",
      domain: "flowstack.io",
      nav: ["Product", "Pricing", "Customers", "Docs"],
      heroKicker: "Workflow analytics",
      heroTitle: "See where work actually gets stuck.",
      heroSub: "One live map of where your team's time goes.",
      cta: "Start free trial",
      cards: ["Process Mining", "Bottleneck Alerts", "SOC2 Security"],
    },
  },
  {
    slug: "golden-hour",
    name: "Golden Hour Studio",
    industry: "Wedding Photography Studio",
    tagline: "Romantic, documentary, light-led",
    summary: "A two-person wedding studio site built around real moments and real availability.",
    description:
      "Wedding photography sells trust in a single day you can't redo. This concept uses blush and warm gold tones, a romantic serif voice and full-bleed documentary photography — proving the eye before a single enquiry is sent.",
    features: [
      "Portfolio by wedding",
      "Package comparison with pricing",
      "Our story & approach",
      "Date-availability enquiry flow",
      "Engagement session showcase",
      "Couple testimonials",
    ],
    designStyle: "Romantic documentary warmth",
    designNotes: [
      "Blush and warm gold — romantic without tipping into saccharine",
      "Serif headings and full-bleed photography let the work carry the page",
      "Soft, heavy curves throughout — the opposite of Forge's sharp edges",
    ],
    identity: {
      canvas: "bg-[#FBF4EF]",
      surface: "bg-white",
      brand: "bg-[#C08A4E]",
      brandText: "text-[#C08A4E]",
      gradient: "from-[#c08a4e] to-[#e0b17e]",
      ink: "text-[#332420]",
      muted: "bg-[#EEDDD1]",
      onBrand: "text-white",
      font: "font-serif",
      radius: "rounded-3xl",
    },
    preview: {
      layout: "split",
      domain: "goldenhourstudio.co",
      nav: ["Portfolio", "Packages", "Our Story", "Enquire"],
      heroKicker: "Destination & intimate weddings",
      heroTitle: "The 4pm light, and everything after.",
      heroSub: "Documentary-style photography and film, worldwide.",
      cta: "Check our date",
      cards: ["The Elopement", "The Full Day", "The Destination"],
    },
  },
];

export function getConcept(slug: string) {
  return concepts.find((c) => c.slug === slug);
}
