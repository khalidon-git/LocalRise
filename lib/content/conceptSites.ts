// ---------------------------------------------------------------------------
// Concept "live" sites — full, independent, chrome-free websites for the ten
// Concept Websites brands, rendered at /concepts/<slug>/live/.
//
// This is DESIGN CONCEPT content: ten fictional businesses. Nothing here
// claims a real customer, employee, review or result. Every live site carries
// a "Design Concept by LocalRise" disclosure (rendered by LiveFooter) and a
// "Build something similar" CTA back to LocalRise — see
// knowledge/decisions/007-concept-live-sites.md and docs/content.md.
//
// Each `slug` must match a `Concept.slug` in lib/content/concepts.ts — that's
// the join between the card/detail pages (code-rendered ConceptMock preview)
// and the full live site built from this file.
//
// ⚠️ theme.font / theme.headFont / theme.radius / theme.tracking are LITERAL
// Tailwind class names (e.g. "font-serif", "rounded-2xl"), exactly like
// ConceptMock's `identity`. Tailwind's JIT scans this file's source text
// (lib/**/*.ts is in tailwind.config.ts's content globs), so literal strings
// get their CSS generated — a computed class name would silently produce none.
// Colours are different: raw hex/rgba applied as CSS custom properties via
// inline `style` on the live-site root, consumed through literal
// bg-[var(--lv-bg)]-style classes in components/live/*. See globals.css.
//
// Add concept #11 → append one object here (plus one in concepts.ts). Nothing
// else needs touching.
// ---------------------------------------------------------------------------

import type { IconName } from "@/components/ui/Icon";

function img(id: string, w: number): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;
}

export type LiveTheme = {
  bg: string;
  bgAlt: string;
  surface: string;
  ink: string;
  inkMuted: string;
  line: string;
  brand: string;
  brandInk: string;
  brandSoft: string;
  /** Literal Tailwind class, e.g. "font-sans". */
  font: string;
  /** Literal Tailwind class for headings, e.g. "font-serif". */
  headFont: string;
  /** Literal Tailwind tracking class, e.g. "tracking-tight". */
  tracking: string;
  /** Literal Tailwind radius class, e.g. "rounded-2xl". */
  radius: string;
  navStyle: "overlay" | "solid";
  heroStyle: "full-bleed" | "split" | "editorial-grid" | "centered-stat" | "product";
  dark: boolean;
};

export type LiveImage = { src: string; alt: string };
export type LiveStat = { value: string; label: string };
export type LiveServiceItem = { icon: IconName; title: string; description: string };
export type ShowcaseItem = { title: string; meta: string; price?: string; image: LiveImage };

export type LiveShowcase = {
  kind: "menu" | "treatments" | "rooms" | "listings" | "programs" | "lookbook" | "projects" | "packages";
  heading: string;
  subheading: string;
  items: ShowcaseItem[];
};

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type LiveDashboard = {
  heading: string;
  subheading: string;
  metrics: { label: string; value: string; delta: string; up: boolean }[];
  chartLabel: string;
  chartValues: number[];
  panelTitle: string;
  panelRows: { name: string; status: string; value: string }[];
};

export type LiveTestimonial = { quote: string; name: string; role: string };
export type LiveFaq = { q: string; a: string };

export type ConceptSite = {
  slug: string;
  brandName: string;
  domain: string;
  industryLabel: string;
  location: string;
  theme: LiveTheme;
  /** In-page anchors — real navigation on a single scrolling page, e.g. { label: "Menu", href: "#work" }. */
  nav: { label: string; href: string }[];
  hero: { kicker: string; title: string; sub: string; cta: string; secondaryCta: string; image?: LiveImage };
  about: { eyebrow: string; title: string; body: string[]; image?: LiveImage; stats: LiveStat[] };
  services: { heading: string; subheading: string; items: LiveServiceItem[] };
  showcase?: LiveShowcase;
  pricing?: { heading: string; subheading: string; tiers: PricingTier[] };
  dashboard?: LiveDashboard;
  gallery: { heading: string; subheading: string; variant: "photo" | "device"; images: LiveImage[]; deviceLabels?: string[] };
  testimonials: { heading: string; items: LiveTestimonial[] };
  faq: { heading: string; items: LiveFaq[] };
  contact: { heading: string; body: string; email: string; phone: string; hours: string; location: string };
};

export const conceptSites: ConceptSite[] = [
  // -------------------------------------------------------------------------
  // 1. Luxury Restaurant — Noir & Vine
  // -------------------------------------------------------------------------
  {
    slug: "noir-and-vine",
    brandName: "Noir & Vine",
    domain: "noirandvine.in",
    industryLabel: "Modern Indian Fine Dining",
    location: "Bandra West, Mumbai",
    theme: {
      bg: "#0B0A08",
      bgAlt: "#141210",
      surface: "#18150F",
      ink: "#F3EFE6",
      inkMuted: "#B7AE9C",
      line: "rgba(255,255,255,0.09)",
      brand: "#C9A24B",
      brandInk: "#0B0A08",
      brandSoft: "rgba(201,162,75,0.14)",
      font: "font-sans",
      headFont: "font-serif",
      tracking: "tracking-tight",
      radius: "rounded-sm",
      navStyle: "overlay",
      heroStyle: "full-bleed",
      dark: true,
    },
    nav: [
      { label: "Menu", href: "#work" },
      { label: "Chef", href: "#story" },
      { label: "Events", href: "#services" },
      { label: "Reservations", href: "#contact" },
    ],
    hero: {
      kicker: "Modern Indian Fine Dining · Mumbai",
      title: "A table, held for you.",
      sub: "Sixteen seats a night. A tasting menu built around whatever the market handed us that morning.",
      cta: "Reserve a table",
      secondaryCta: "View tonight's menu",
      image: { src: img("1414235077428-338989a2e8c0", 1600), alt: "Candlelit table setting at Noir & Vine" },
    },
    about: {
      eyebrow: "Since 2019",
      title: "Cooking is just editing",
      body: [
        "Noir & Vine seats sixteen a night, once a night. No second turn, no rushing the table that arrived at 7 to make room for the one booked at 9.",
        "The menu changes with the market — chef Vikram Rao writes it most mornings after seeing what actually looks good, not what a laminated card promised three months ago.",
      ],
      image: { src: img("1517248135467-4c7edcad34c4", 1200), alt: "Chef plating a tasting course at Noir & Vine" },
      stats: [
        { value: "16", label: "seats a night" },
        { value: "7", label: "course tasting menu" },
        { value: "1", label: "seating — no rushing" },
      ],
    },
    services: {
      heading: "What a night here looks like",
      subheading: "Four ways to eat with us.",
      items: [
        { icon: "utensils", title: "Tasting Menu", description: "Seven courses, rewritten weekly with the market." },
        { icon: "users", title: "Private Dining", description: "A curtained table for six to fourteen, same kitchen." },
        { icon: "gem", title: "Wine Pairing", description: "A cellar built one region at a time, poured by the glass." },
        { icon: "calendar", title: "Events & Takeovers", description: "Chef's-table dinners and one-night collaborations." },
      ],
    },
    showcase: {
      kind: "menu",
      heading: "Tonight's tasting menu",
      subheading: "₹4,200 per person · seven courses, no repeats this month.",
      items: [
        { title: "Heirloom Tomato, Smoked Curd", meta: "First course", image: { src: img("1517248135467-4c7edcad34c4", 900), alt: "Heirloom tomato and smoked curd starter" } },
        { title: "Malabar Prawn, Coconut Broth", meta: "Second course", image: { src: img("1555396273-367ea4eb4db5", 900), alt: "Malabar prawn in coconut broth" } },
        { title: "Char-Grilled Kombu Aubergine", meta: "Third course", image: { src: img("1600891964092-4316c288032e", 900), alt: "Char-grilled aubergine with kombu" } },
        { title: "Slow Lamb, Black Cardamom Jus", meta: "Main course", image: { src: img("1424847651672-bf20a4b0982b", 900), alt: "Slow-cooked lamb with black cardamom jus" } },
        { title: "Jaggery, Brown Butter, Cardamom Ice", meta: "Dessert", image: { src: img("1414235077428-338989a2e8c0", 900), alt: "Jaggery and brown butter dessert plate" } },
      ],
    },
    gallery: {
      heading: "Inside the dining room",
      subheading: "Sixteen seats, one long table by the pass.",
      variant: "photo",
      images: [
        { src: img("1555396273-367ea4eb4db5", 1000), alt: "Plated course at Noir & Vine" },
        { src: img("1600891964092-4316c288032e", 1000), alt: "Charred vegetable course" },
        { src: img("1424847651672-bf20a4b0982b", 1000), alt: "Lamb course with jus" },
        { src: img("1414235077428-338989a2e8c0", 1000), alt: "Dining room table setting" },
      ],
    },
    testimonials: {
      heading: "What the room says",
      items: [
        { quote: "Every course understood restraint. Nothing extra, nothing missing.", name: "Aisha K.", role: "Regular guest" },
        { quote: "Best tasting menu I've had in this city, full stop.", name: "Rohan M.", role: "Food writer" },
        { quote: "They remembered our anniversary from a booking two years ago.", name: "Neha & Arjun", role: "Guests" },
      ],
    },
    faq: {
      heading: "Before you book",
      items: [
        { q: "How far ahead should we book?", a: "2–3 weeks for weekends, a few days for weeknights. Cancellations do open up — worth asking." },
        { q: "Can you handle dietary restrictions?", a: "Yes — tell us when booking and the kitchen builds a parallel menu, not a sad substitution plate." },
        { q: "Is there a dress code?", a: "Smart casual. No trainers, no shorts — otherwise wear what you're comfortable in." },
        { q: "Do you host private events?", a: "The private room seats up to fourteen. Get in touch for a custom menu and date." },
      ],
    },
    contact: {
      heading: "Reservations",
      body: "Tables are released 30 days out. For groups of six or more, write to us directly.",
      email: "reservations@noirandvine.in",
      phone: "+91 98200 00016",
      hours: "Tue–Sun · 7pm – 11:30pm",
      location: "Bandra West, Mumbai",
    },
  },

  // -------------------------------------------------------------------------
  // 2. Premium Dental Clinic — Meridian Dental Studio
  // -------------------------------------------------------------------------
  {
    slug: "meridian-dental",
    brandName: "Meridian Dental Studio",
    domain: "meridiandental.in",
    industryLabel: "Boutique Dentistry",
    location: "Indiranagar, Bengaluru",
    theme: {
      bg: "#FAFAF6",
      bgAlt: "#F1F3EC",
      surface: "#FFFFFF",
      ink: "#1B231D",
      inkMuted: "#5C6B60",
      line: "#E3E7DE",
      brand: "#4C6B58",
      brandInk: "#FFFFFF",
      brandSoft: "rgba(76,107,88,0.10)",
      font: "font-sans",
      headFont: "font-sans",
      tracking: "tracking-tight",
      radius: "rounded-2xl",
      navStyle: "solid",
      heroStyle: "centered-stat",
      dark: false,
    },
    nav: [
      { label: "Treatments", href: "#work" },
      { label: "Doctors", href: "#story" },
      { label: "Technology", href: "#services" },
      { label: "Smiles", href: "#gallery" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      kicker: "Boutique Dentistry · Indiranagar",
      title: "Dentistry, reimagined for calm.",
      sub: "Digital scans, same-day plans, and a team that explains every step before it happens.",
      cta: "Book a consultation",
      secondaryCta: "Explore treatments",
      image: { src: img("1588776814546-1ffcf47267a5", 1600), alt: "Bright, minimal treatment room at Meridian Dental Studio" },
    },
    about: {
      eyebrow: "Our approach",
      title: "No drills you can't see coming",
      body: [
        "Most dental anxiety isn't about pain — it's about not knowing what's about to happen. We show you the scan on-screen, walk through the plan, and price it before anything starts.",
        "Every room was designed to feel less like a clinic and more like somewhere you'd actually want to sit for an hour.",
      ],
      image: { src: img("1629909613654-28e377c37b09", 1200), alt: "Dental team consulting with a patient over a digital scan" },
      stats: [
        { value: "98%", label: "painless-visit rating" },
        { value: "12 min", label: "average wait" },
        { value: "3D", label: "digital scanning, every visit" },
      ],
    },
    services: {
      heading: "Treatments we're known for",
      subheading: "Four areas we've built real depth in.",
      items: [
        { icon: "target", title: "Invisalign & Aligners", description: "Straightening without the metal-mouth years." },
        { icon: "shield", title: "Dental Implants", description: "Digitally planned, placed by the same doctor throughout." },
        { icon: "sparkles", title: "Cosmetic Smile Design", description: "Veneers and contouring, mocked up before you commit." },
        { icon: "stethoscope", title: "Preventive Care", description: "Cleanings and check-ups that actually catch things early." },
      ],
    },
    showcase: {
      kind: "treatments",
      heading: "Treatments & pricing",
      subheading: "Clear numbers, no surprises at checkout.",
      items: [
        { title: "Invisalign Clear Aligners", meta: "6–14 months", price: "From ₹85,000", image: { src: img("1606811841689-23dfddce3e95", 900), alt: "Clear aligner treatment consultation" } },
        { title: "Dental Implants", meta: "Single tooth", price: "From ₹42,000", image: { src: img("1612349317150-e413f6a5b16d", 900), alt: "Dental implant procedure planning" } },
        { title: "Smile Design Veneers", meta: "Per tooth", price: "From ₹18,000", image: { src: img("1598256989800-fe5f95da9787", 900), alt: "Veneer smile design consultation" } },
        { title: "Professional Whitening", meta: "In-studio, 60 minutes", price: "₹9,500", image: { src: img("1629909613654-28e377c37b09", 900), alt: "Professional teeth whitening session" } },
      ],
    },
    gallery: {
      heading: "Inside the studio",
      subheading: "Designed to lower your heart rate, not raise it.",
      variant: "photo",
      images: [
        { src: img("1588776814546-1ffcf47267a5", 1000), alt: "Meridian Dental Studio reception" },
        { src: img("1606811841689-23dfddce3e95", 1000), alt: "Treatment room detail" },
        { src: img("1612349317150-e413f6a5b16d", 1000), alt: "Digital scanning equipment" },
        { src: img("1598256989800-fe5f95da9787", 1000), alt: "Consultation room" },
      ],
    },
    testimonials: {
      heading: "From our patients",
      items: [
        { quote: "First dentist visit in years I didn't dread. They talked me through everything.", name: "Priyanka S.", role: "Invisalign patient" },
        { quote: "The implant process was explained in a way I actually understood.", name: "Karthik N.", role: "Patient since 2022" },
        { quote: "My kids don't cry here. That alone is worth the drive across town.", name: "Meera D.", role: "Parent of two patients" },
      ],
    },
    faq: {
      heading: "Common questions",
      items: [
        { q: "Do you accept dental insurance?", a: "Most major providers — bring your policy details and we'll confirm coverage before treatment." },
        { q: "How do you manage pain and anxiety?", a: "Digital anaesthesia delivery, sedation options for bigger procedures, and a team that stops the moment you ask." },
        { q: "What happens at a first visit?", a: "A full digital scan, a walkthrough of what we find, and a written plan with pricing — no treatment same day unless you want it." },
        { q: "Do you handle dental emergencies?", a: "Yes — call ahead and we hold a same-day slot for genuine emergencies." },
      ],
    },
    contact: {
      heading: "Book a consultation",
      body: "First consultations include a full digital scan, at no charge.",
      email: "hello@meridiandental.in",
      phone: "+91 80 4022 5588",
      hours: "Mon–Sat · 9am – 7pm",
      location: "Indiranagar, Bengaluru",
    },
  },

  // -------------------------------------------------------------------------
  // 3. Boutique Hotel — Casa Alma
  // -------------------------------------------------------------------------
  {
    slug: "casa-alma",
    brandName: "Casa Alma",
    domain: "casaalma.in",
    industryLabel: "Boutique Hotel",
    location: "Assagao, North Goa",
    theme: {
      bg: "#FBF6EF",
      bgAlt: "#F3E9DA",
      surface: "#FFFFFF",
      ink: "#2B1D14",
      inkMuted: "#7C6A57",
      line: "#E7D9C4",
      brand: "#A8492A",
      brandInk: "#FFFFFF",
      brandSoft: "rgba(168,73,42,0.12)",
      font: "font-serif",
      headFont: "font-serif",
      tracking: "tracking-tight",
      radius: "rounded-md",
      navStyle: "overlay",
      heroStyle: "full-bleed",
      dark: false,
    },
    nav: [
      { label: "Rooms", href: "#work" },
      { label: "The Grounds", href: "#story" },
      { label: "Dining", href: "#services" },
      { label: "Journal", href: "#gallery" },
      { label: "Book", href: "#contact" },
    ],
    hero: {
      kicker: "Assagao, Goa",
      title: "Eleven rooms. One long lunch.",
      sub: "A restored Portuguese-era house, a kitchen garden, and mornings with nowhere to be.",
      cta: "Check availability",
      secondaryCta: "Take the tour",
      image: { src: img("1566073771259-6a8506099945", 1600), alt: "Casa Alma courtyard at golden hour" },
    },
    about: {
      eyebrow: "The house",
      title: "Built in 1938, barely touched since",
      body: [
        "We bought a falling-down Portuguese-era house in 2017 and spent two years undoing decades of bad additions rather than making new ones. What's left is the original laterite stone, the original floor tiles, and eleven rooms with nothing matching on purpose.",
        "Breakfast comes from the kitchen garden out back. Dinner is whatever's ready — we tell you at check-in, not before.",
      ],
      image: { src: img("1611892440504-42a792e24d32", 1200), alt: "Restored guest room at Casa Alma" },
      stats: [
        { value: "11", label: "rooms, no two alike" },
        { value: "1938", label: "the house was built" },
        { value: "2 acres", label: "of garden" },
      ],
    },
    services: {
      heading: "Staying with us",
      subheading: "The details that matter more than a star rating.",
      items: [
        { icon: "tag", title: "Direct Booking Rate", description: "Always cheaper than any portal — we skip the commission." },
        { icon: "leaf", title: "Kitchen Garden Dining", description: "Breakfast and dinner from what's actually growing." },
        { icon: "compass", title: "Airport Transfers", description: "Arranged for every stay, no separate booking needed." },
        { icon: "map", title: "Guided Local Trips", description: "Spice farms, quiet beaches, the market only locals use." },
      ],
    },
    showcase: {
      kind: "rooms",
      heading: "Rooms",
      subheading: "Book direct — always our best rate.",
      items: [
        { title: "Garden Room", meta: "1 king · garden view", price: "₹9,500/night", image: { src: img("1445019980597-93fa8acb246c", 900), alt: "Garden Room at Casa Alma" } },
        { title: "Courtyard Suite", meta: "1 king + daybed", price: "₹14,000/night", image: { src: img("1582719478250-c89cae4dc85b", 900), alt: "Courtyard Suite interior" } },
        { title: "The Verandah Room", meta: "1 king · private balcony", price: "₹16,500/night", image: { src: img("1520250497591-112f2f40a3f4", 900), alt: "Verandah Room with balcony" } },
        { title: "Rooftop Loft", meta: "1 king · rooftop access", price: "₹19,000/night", image: { src: img("1611892440504-42a792e24d32", 900), alt: "Rooftop Loft room" } },
      ],
    },
    gallery: {
      heading: "Around the house",
      subheading: "",
      variant: "photo",
      images: [
        { src: img("1566073771259-6a8506099945", 1000), alt: "Casa Alma exterior courtyard" },
        { src: img("1445019980597-93fa8acb246c", 1000), alt: "Guest room detail" },
        { src: img("1582719478250-c89cae4dc85b", 1000), alt: "Suite interior" },
        { src: img("1520250497591-112f2f40a3f4", 1000), alt: "Balcony view" },
      ],
    },
    testimonials: {
      heading: "From our guests",
      items: [
        { quote: "Felt like staying at a friend's very beautiful house, not a hotel.", name: "Farah I.", role: "Guest, March 2026" },
        { quote: "The breakfast alone is worth the trip back.", name: "Daniel & Priya", role: "Repeat guests" },
        { quote: "Booked direct after finding it on an aggregator — glad we did, cheaper and they upgraded us.", name: "Wren T.", role: "Guest, January 2026" },
      ],
    },
    faq: {
      heading: "Before you book",
      items: [
        { q: "What time is check-in?", a: "2pm check-in, 11am check-out — early arrivals can usually drop bags and head to the pool." },
        { q: "What's your cancellation policy?", a: "Free cancellation up to 7 days before arrival; 50% refund up to 48 hours before." },
        { q: "Are kids and pets welcome?", a: "Kids, yes. Well-behaved dogs, yes, with advance notice — we've got a garden they'll love." },
        { q: "Is there a restaurant on-site?", a: "No à la carte menu — dinner is one seasonal set menu, garden-grown where possible." },
      ],
    },
    contact: {
      heading: "Book direct",
      body: "Always our best rate — no commission, no portal markup.",
      email: "stay@casaalma.in",
      phone: "+91 98221 40077",
      hours: "Front desk · 24 hours",
      location: "Assagao, North Goa",
    },
  },

  // -------------------------------------------------------------------------
  // 4. Luxury Real Estate — Ashford & Vale
  // -------------------------------------------------------------------------
  {
    slug: "ashford-vale",
    brandName: "Ashford & Vale",
    domain: "ashfordvale.in",
    industryLabel: "Private Real Estate",
    location: "Worli, Mumbai",
    theme: {
      bg: "#0E1420",
      bgAlt: "#141B2B",
      surface: "#1A2233",
      ink: "#F1F3F8",
      inkMuted: "#93A0B8",
      line: "rgba(255,255,255,0.09)",
      brand: "#B08D57",
      brandInk: "#0E1420",
      brandSoft: "rgba(176,141,87,0.14)",
      font: "font-sans",
      headFont: "font-serif",
      tracking: "tracking-tight",
      radius: "rounded-none",
      navStyle: "solid",
      heroStyle: "split",
      dark: true,
    },
    nav: [
      { label: "Listings", href: "#work" },
      { label: "Sell", href: "#services" },
      { label: "Advisory", href: "#story" },
      { label: "Journal", href: "#gallery" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      kicker: "Private Sales · South Mumbai & Goa",
      title: "Homes that rarely reach the market.",
      sub: "Off-market listings, quiet sales, and buyers who value discretion over listings portals.",
      cta: "View current listings",
      secondaryCta: "Request a private viewing",
      image: { src: img("1600596542815-ffad4c1539a9", 1400), alt: "Luxury residence exterior represented by Ashford & Vale" },
    },
    about: {
      eyebrow: "Since 2016",
      title: "We sell twelve homes a year. On purpose.",
      body: [
        "Ashford & Vale doesn't run a listings portal. We work a short list of homes at a time, most of which never appear publicly — sellers who want a quiet process, buyers who want first access.",
        "Every advisor here closed their own deals before joining. We know what a bad survey costs you, and what a good negotiation is actually worth.",
      ],
      image: { src: img("1512917774080-9991f1c4c750", 1200), alt: "Interior of a luxury home sold through Ashford & Vale" },
      stats: [
        { value: "₹840Cr+", label: "in closed sales" },
        { value: "12", label: "homes sold a year" },
        { value: "31 days", label: "average, list to close" },
      ],
    },
    services: {
      heading: "How we work",
      subheading: "Four ways we're different from a portal listing.",
      items: [
        { icon: "home", title: "Off-Market Access", description: "First look at homes before they're publicly listed." },
        { icon: "compass", title: "Buying Advisory", description: "Independent guidance — we're not paid by the seller alone." },
        { icon: "sparkles", title: "Sale & Staging", description: "Full staging and photography included in every listing." },
        { icon: "chart", title: "Investment Portfolio", description: "Advisory for buyers building a multi-property portfolio." },
      ],
    },
    showcase: {
      kind: "listings",
      heading: "Current listings",
      subheading: "A short list, updated quietly.",
      items: [
        { title: "Malabar Hill Residence", meta: "5 bed · sea view", price: "₹58 Cr", image: { src: img("1600585154340-be6161a56a0c", 900), alt: "Malabar Hill residence listing" } },
        { title: "Alibaug Weekend House", meta: "4 bed · private beach access", price: "₹24 Cr", image: { src: img("1600607687939-ce8a6c25118c", 900), alt: "Alibaug weekend house listing" } },
        { title: "Worli Sky Residence", meta: "3 bed · 40th floor", price: "₹19.5 Cr", image: { src: img("1600566753086-00f18fb6b3ea", 900), alt: "Worli high-rise residence" } },
        { title: "Assagao Garden Villa", meta: "6 bed · 2 acres", price: "₹32 Cr", image: { src: img("1512917774080-9991f1c4c750", 900), alt: "Assagao garden villa listing" } },
      ],
    },
    gallery: {
      heading: "Recently closed",
      subheading: "",
      variant: "photo",
      images: [
        { src: img("1600596542815-ffad4c1539a9", 1000), alt: "Recently closed residence exterior" },
        { src: img("1600585154340-be6161a56a0c", 1000), alt: "Recently closed residence detail" },
        { src: img("1600607687939-ce8a6c25118c", 1000), alt: "Recently closed property view" },
        { src: img("1600566753086-00f18fb6b3ea", 1000), alt: "Recently closed high-rise" },
      ],
    },
    testimonials: {
      heading: "From our clients",
      items: [
        { quote: "We saw the Worli listing four days before it went public anywhere else.", name: "The Kapoor Family", role: "Buyers, 2025" },
        { quote: "Sold quietly, at asking, with no open houses. Exactly what we wanted.", name: "S. Mehta", role: "Seller, Malabar Hill" },
        { quote: "Their advisory saved us from a structurally compromised property mid-negotiation.", name: "R. & A. Desai", role: "Buyers, 2024" },
      ],
    },
    faq: {
      heading: "How it works",
      items: [
        { q: "How does off-market access work?", a: "We maintain relationships with a small number of sellers who prefer a quiet, invitation-only process." },
        { q: "What are your fees?", a: "Standard commission on closed sales — no retainer, no fee for advisory-only buyers until a deal closes." },
        { q: "How long does a typical sale take?", a: "31 days average from listing to close, for properties we bring to market ourselves." },
        { q: "Do you help with financing?", a: "We work with a small panel of private banks experienced in high-value transactions." },
      ],
    },
    contact: {
      heading: "Enquire privately",
      body: "Most conversations start with a confidential call, not a listing link.",
      email: "advisory@ashfordvale.in",
      phone: "+91 22 6199 4400",
      hours: "By appointment",
      location: "Worli, Mumbai",
    },
  },

  // -------------------------------------------------------------------------
  // 5. Modern Fitness Gym — Forge Performance Studio
  // -------------------------------------------------------------------------
  {
    slug: "forge-performance",
    brandName: "Forge Performance Studio",
    domain: "forgeperformance.fit",
    industryLabel: "Strength & Conditioning",
    location: "Lower Parel, Mumbai",
    theme: {
      bg: "#0A0A0A",
      bgAlt: "#131313",
      surface: "#1B1B1B",
      ink: "#F5F5F0",
      inkMuted: "#9A9A93",
      line: "rgba(255,255,255,0.10)",
      brand: "#FF4B1F",
      brandInk: "#0A0A0A",
      brandSoft: "rgba(255,75,31,0.16)",
      font: "font-sans",
      headFont: "font-display",
      tracking: "tracking-tighter",
      radius: "rounded-sm",
      navStyle: "overlay",
      heroStyle: "full-bleed",
      dark: true,
    },
    nav: [
      { label: "Programs", href: "#work" },
      { label: "Coaches", href: "#story" },
      { label: "Membership", href: "#services" },
      { label: "Results", href: "#gallery" },
      { label: "Trial", href: "#contact" },
    ],
    hero: {
      kicker: "Lower Parel, Mumbai",
      title: "Train like the season depends on it.",
      sub: "Strength, conditioning and a coach watching every rep — not a mirror full of strangers.",
      cta: "Book a free trial",
      secondaryCta: "See programs",
      image: { src: img("1571019613454-1cb2f99b2d8b", 1600), alt: "Athlete training on the floor at Forge Performance Studio" },
    },
    about: {
      eyebrow: "The floor",
      title: "228 sqm. No fluff.",
      body: [
        "No smoothie bar, no towel service you'll never use, no forty machines nobody explains. Forge runs coached group sessions capped at six people, so every rep gets watched and every session gets adjusted.",
        "Programming rotates on a coached cycle — strength blocks, conditioning blocks, and a deload week that isn't a guilt trip.",
      ],
      image: { src: img("1534438327276-14e5300c3a48", 1200), alt: "Coach adjusting an athlete's form at Forge" },
      stats: [
        { value: "4.8/5", label: "member rating" },
        { value: "14", label: "coached sessions a week" },
        { value: "6", label: "members per class, max" },
      ],
    },
    services: {
      heading: "How training works here",
      subheading: "",
      items: [
        { icon: "dumbbell", title: "Strength & Conditioning", description: "Barbell strength paired with real conditioning work." },
        { icon: "users", title: "1:1 Coaching", description: "Programmed and adjusted by one coach, every session." },
        { icon: "leaf", title: "Nutrition Coaching", description: "No meal plans — just a system that fits your week." },
        { icon: "heart", title: "Recovery & Mobility", description: "A dedicated session every week, not an afterthought." },
      ],
    },
    showcase: {
      kind: "programs",
      heading: "Programs",
      subheading: "Pick a lane, or run all three across the year.",
      items: [
        { title: "Foundations", meta: "4 weeks · beginners", price: "₹6,500", image: { src: img("1541534741688-6078c6bfb5c5", 900), alt: "Beginner strength foundations class" } },
        { title: "Strength Block", meta: "8 weeks · barbell focus", price: "₹11,000", image: { src: img("1526506118085-60ce8714f8c5", 900), alt: "Barbell strength training block" } },
        { title: "Competitor Prep", meta: "12 weeks · invite only", price: "₹18,500", image: { src: img("1583454110551-21f2fa2afe61", 900), alt: "Competitor preparation training session" } },
      ],
    },
    gallery: {
      heading: "On the floor",
      subheading: "",
      variant: "photo",
      images: [
        { src: img("1571019613454-1cb2f99b2d8b", 1000), alt: "Training floor at Forge Performance Studio" },
        { src: img("1541534741688-6078c6bfb5c5", 1000), alt: "Group coaching session" },
        { src: img("1526506118085-60ce8714f8c5", 1000), alt: "Barbell training detail" },
        { src: img("1534438327276-14e5300c3a48", 1000), alt: "Coach and athlete during a session" },
      ],
    },
    testimonials: {
      heading: "Member results",
      items: [
        { quote: "First gym where a coach has actually corrected my deadlift in real time.", name: "Arjun V.", role: "Member, 8 months" },
        { quote: "Six people a class means you can't hide. In a good way.", name: "Simran K.", role: "Member, 1 year" },
        { quote: "Competitor Prep got me to my first meet in better shape than I trained solo for two years.", name: "Farhan Z.", role: "Powerlifting member" },
      ],
    },
    faq: {
      heading: "Before your trial",
      items: [
        { q: "What happens in a free trial?", a: "One full coached session, plus a 15-minute movement assessment beforehand." },
        { q: "What should I bring?", a: "Trainers, water, and whatever you'd normally train in. We have the rest." },
        { q: "I have an old injury — is that a problem?", a: "Tell your coach beforehand; programming gets adjusted around it, not ignored." },
        { q: "Can I freeze my membership?", a: "Yes — up to 60 days a year, no questions asked, via the member app." },
      ],
    },
    contact: {
      heading: "Book your trial",
      body: "One coached session, on us — see how it feels before you commit.",
      email: "train@forgeperformance.fit",
      phone: "+91 98330 21190",
      hours: "Mon–Sat · 6am – 9pm",
      location: "Lower Parel, Mumbai",
    },
  },

  // -------------------------------------------------------------------------
  // 6. Fashion Brand — Maison Rilé
  // -------------------------------------------------------------------------
  {
    slug: "maison-rile",
    brandName: "Maison Rilé",
    domain: "maisonrile.com",
    industryLabel: "Ready-to-Wear Studio",
    location: "Byculla, Mumbai",
    theme: {
      bg: "#F7F5F1",
      bgAlt: "#EDE9E1",
      surface: "#FFFFFF",
      ink: "#161513",
      inkMuted: "#726C61",
      line: "#E2DCCF",
      brand: "#161513",
      brandInk: "#F7F5F1",
      brandSoft: "rgba(22,21,19,0.06)",
      font: "font-sans",
      headFont: "font-display",
      tracking: "tracking-tighter",
      radius: "rounded-none",
      navStyle: "solid",
      heroStyle: "editorial-grid",
      dark: false,
    },
    nav: [
      { label: "Collection", href: "#work" },
      { label: "Atelier", href: "#story" },
      { label: "Lookbook", href: "#gallery" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      kicker: "Autumn / Winter Collection",
      title: "Cut for how you actually move.",
      sub: "Twelve pieces, made in small runs, in a studio in Byculla.",
      cta: "Shop the collection",
      secondaryCta: "View lookbook",
      image: { src: img("1490481651871-ab68de25d43d", 1400), alt: "Model wearing the Maison Rilé autumn/winter collection" },
    },
    about: {
      eyebrow: "The studio",
      title: "Slow, on purpose",
      body: [
        "We cut and sew everything in-house, in runs of forty. When a piece sells out, it's gone — no reorder from a factory three time zones away.",
        "The pattern room is two floors above the studio where we sell. If a sleeve sits wrong, the person who cut it is upstairs.",
      ],
      image: { src: img("1483985988355-763728e1935b", 1200), alt: "Maison Rilé atelier workspace" },
      stats: [
        { value: "12", label: "pieces a season" },
        { value: "40", label: "units per run" },
        { value: "100%", label: "cut & sewn in-house" },
      ],
    },
    services: {
      heading: "Beyond the rack",
      subheading: "",
      items: [
        { icon: "shirt", title: "Made to Order", description: "Any piece, cut to your measurements, for a small premium." },
        { icon: "leaf", title: "Sustainable Fabrics", description: "Deadstock and mill-certified fabric only — no virgin polyester." },
        { icon: "sparkles", title: "Personal Styling", description: "A one-hour fitting session with the studio, by appointment." },
        { icon: "award", title: "Alterations", description: "Free, unlimited, for the life of the garment." },
      ],
    },
    showcase: {
      kind: "lookbook",
      heading: "Lookbook",
      subheading: "Autumn/Winter, shot in the studio.",
      items: [
        { title: "The Structured Coat", meta: "Wool blend", price: "₹18,900", image: { src: img("1441984904996-e0b6ba687e04", 900), alt: "Structured wool coat from the collection" } },
        { title: "Asymmetric Wrap Dress", meta: "Silk crepe", price: "₹12,400", image: { src: img("1509631179647-0177331693ae", 900), alt: "Asymmetric silk wrap dress" } },
        { title: "The Tailored Trouser", meta: "Cotton twill", price: "₹7,600", image: { src: img("1487412720507-e7ab37603c6f", 900), alt: "Tailored cotton twill trouser" } },
      ],
    },
    gallery: {
      heading: "Behind the seams",
      subheading: "",
      variant: "photo",
      images: [
        { src: img("1490481651871-ab68de25d43d", 1000), alt: "Editorial shot from the collection" },
        { src: img("1483985988355-763728e1935b", 1000), alt: "Atelier detail shot" },
        { src: img("1441984904996-e0b6ba687e04", 1000), alt: "Coat detail" },
        { src: img("1487412720507-e7ab37603c6f", 1000), alt: "Trouser detail" },
      ],
    },
    testimonials: {
      heading: "Worn by",
      items: [
        { quote: "The coat still looks new after two winters of actual wear, not just hanging.", name: "Devika R.", role: "Customer since 2023" },
        { quote: "Made-to-order fit better than anything off a rack ever has.", name: "Zoya H.", role: "Made-to-order client" },
        { quote: "You can feel the difference in a garment someone actually cut by hand.", name: "Imran S.", role: "Customer" },
      ],
    },
    faq: {
      heading: "Sizing & care",
      items: [
        { q: "How does made-to-order sizing work?", a: "Book a fitting at the studio, or send five measurements by email — most pieces ship in three weeks." },
        { q: "Do you ship outside India?", a: "Yes, worldwide — duties calculated at checkout, no surprise charges on arrival." },
        { q: "What's your returns policy?", a: "14 days on unworn ready-to-wear. Made-to-order pieces are final sale, alterations included." },
        { q: "How should I care for these fabrics?", a: "Every piece ships with a care card — mostly cold hand-wash or dry clean, no tumble drying, ever." },
      ],
    },
    contact: {
      heading: "Visit the studio",
      body: "Studio visits by appointment — come see the pattern room.",
      email: "studio@maisonrile.com",
      phone: "+91 98200 55214",
      hours: "By appointment, Tue–Sat",
      location: "Byculla, Mumbai",
    },
  },

  // -------------------------------------------------------------------------
  // 7. Interior Design Studio — Atelier Norlind
  // -------------------------------------------------------------------------
  {
    slug: "atelier-norlind",
    brandName: "Atelier Norlind",
    domain: "ateliernorlind.in",
    industryLabel: "Residential Interior Design",
    location: "Prabhadevi, Mumbai",
    theme: {
      bg: "#F6F1EA",
      bgAlt: "#EFE6D9",
      surface: "#FFFFFF",
      ink: "#2B2419",
      inkMuted: "#7A705D",
      line: "#E3D8C4",
      brand: "#8A6A4A",
      brandInk: "#FFFFFF",
      brandSoft: "rgba(138,106,74,0.12)",
      font: "font-serif",
      headFont: "font-serif",
      tracking: "tracking-normal",
      radius: "rounded-xl",
      navStyle: "overlay",
      heroStyle: "split",
      dark: false,
    },
    nav: [
      { label: "Projects", href: "#work" },
      { label: "Studio", href: "#story" },
      { label: "Process", href: "#services" },
      { label: "Journal", href: "#gallery" },
      { label: "Enquire", href: "#contact" },
    ],
    hero: {
      kicker: "Residential & Boutique Commercial",
      title: "Rooms that feel like they were always finished.",
      sub: "Full-service interior design — concept to the last cushion.",
      cta: "Start a project",
      secondaryCta: "View projects",
      image: { src: img("1618221195710-dd6b41faaea6", 1400), alt: "Living room interior designed by Atelier Norlind" },
    },
    about: {
      eyebrow: "The studio",
      title: "Eight projects a year, never more",
      body: [
        "We take on eight projects a year so that every one gets the same partner-level attention from concept through to the last piece of art hung. No junior handoff halfway through.",
        "Furniture is sourced, not catalogued — from a network of over sixty makers, restorers and artisans we've worked with for a decade.",
      ],
      image: { src: img("1616486338812-3dadae4b4ace", 1200), alt: "Interior design studio workspace with material samples" },
      stats: [
        { value: "8", label: "projects a year" },
        { value: "14 wks", label: "average concept-to-install" },
        { value: "60+", label: "artisans & makers in our network" },
      ],
    },
    services: {
      heading: "What we do, start to finish",
      subheading: "",
      items: [
        { icon: "compass", title: "Concept & Space Planning", description: "Full spatial layout before a single fabric swatch." },
        { icon: "sofa", title: "Furniture & Sourcing", description: "Custom pieces and vintage finds, sourced directly." },
        { icon: "palette", title: "Styling & Art Curation", description: "The last 10% that makes a room feel finished." },
        { icon: "list", title: "Project Management", description: "One point of contact through every contractor and delivery." },
      ],
    },
    showcase: {
      kind: "projects",
      heading: "Recent projects",
      subheading: "",
      items: [
        { title: "Altamount Road Residence", meta: "4BHK · full renovation", image: { src: img("1586023492125-27b2c045efd7", 900), alt: "Altamount Road residence interior" } },
        { title: "Koregaon Park Bungalow", meta: "Ground-up interior", image: { src: img("1567016432779-094069958ea5", 900), alt: "Koregaon Park bungalow interior" } },
        { title: "Bandra Studio Apartment", meta: "38 sqm, reimagined", image: { src: img("1615529182904-14819c35db37", 900), alt: "Bandra studio apartment interior" } },
      ],
    },
    gallery: {
      heading: "Details",
      subheading: "",
      variant: "photo",
      images: [
        { src: img("1618221195710-dd6b41faaea6", 1000), alt: "Interior design detail, living space" },
        { src: img("1616486338812-3dadae4b4ace", 1000), alt: "Material palette detail" },
        { src: img("1586023492125-27b2c045efd7", 1000), alt: "Project interior detail" },
        { src: img("1567016432779-094069958ea5", 1000), alt: "Project interior corner" },
      ],
    },
    testimonials: {
      heading: "From our clients",
      items: [
        { quote: "They understood how we actually live before proposing a single layout.", name: "The Bhatia Family", role: "Altamount Road project" },
        { quote: "Fourteen weeks, exactly as promised, not a single surprise invoice.", name: "N. Kulkarni", role: "Koregaon Park project" },
        { quote: "Turned 38 square metres into a flat that doesn't feel small at all.", name: "Ritika P.", role: "Bandra project" },
      ],
    },
    faq: {
      heading: "Working with us",
      items: [
        { q: "What's a typical project budget?", a: "Full residential projects generally start around ₹45 lakh for design and execution — we scope precisely after a site visit." },
        { q: "How long does a project take?", a: "14 weeks average from signed concept to final install, depending on scope and site access." },
        { q: "Do you work with clients outside Mumbai?", a: "Yes — we currently manage projects in Pune, Goa and Bengaluru with a resident site manager." },
        { q: "Can you work with an existing architect?", a: "Regularly — we're used to joining a project alongside an architect already engaged." },
      ],
    },
    contact: {
      heading: "Start a conversation",
      body: "Most projects begin with a site visit, not a quote over email.",
      email: "studio@ateliernorlind.in",
      phone: "+91 98200 71144",
      hours: "By appointment",
      location: "Prabhadevi, Mumbai",
    },
  },

  // -------------------------------------------------------------------------
  // 8. Architecture Firm — Kessler Bright Architecture
  // -------------------------------------------------------------------------
  {
    slug: "kessler-bright",
    brandName: "Kessler Bright Architecture",
    domain: "kesslerbright.in",
    industryLabel: "Architecture & Urban Design",
    location: "Fort, Mumbai",
    theme: {
      bg: "#F4F4F2",
      bgAlt: "#E9E9E5",
      surface: "#FFFFFF",
      ink: "#141414",
      inkMuted: "#6B6B66",
      line: "#DDDDD7",
      brand: "#C4441E",
      brandInk: "#FFFFFF",
      brandSoft: "rgba(196,68,30,0.10)",
      font: "font-sans",
      headFont: "font-sans",
      tracking: "tracking-tight",
      radius: "rounded-none",
      navStyle: "solid",
      heroStyle: "editorial-grid",
      dark: false,
    },
    nav: [
      { label: "Projects", href: "#work" },
      { label: "Practice", href: "#story" },
      { label: "Approach", href: "#services" },
      { label: "Awards", href: "#gallery" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      kicker: "Architecture & Urban Design",
      title: "Buildings that answer the site first.",
      sub: "A fourteen-person practice working across residential, cultural and adaptive reuse projects.",
      cta: "View projects",
      secondaryCta: "About the practice",
      image: { src: img("1487958449943-2429e8be8625", 1400), alt: "Concrete residential architecture by Kessler Bright" },
    },
    about: {
      eyebrow: "The practice",
      title: "Founded 2011, still fourteen people",
      body: [
        "We've turned down growth twice to keep every project running through the same two founding partners. A building designed by committee reads like one — ours don't.",
        "Every project starts with a site study before a single elevation gets drawn: light, wind, water table, the neighbours' windows.",
      ],
      image: { src: img("1449157291145-7efd050a4d0e", 1200), alt: "Architectural detail of a building facade" },
      stats: [
        { value: "46", label: "buildings completed" },
        { value: "3", label: "design awards" },
        { value: "14", label: "architects & designers" },
      ],
    },
    services: {
      heading: "What we practice",
      subheading: "",
      items: [
        { icon: "home", title: "Residential Architecture", description: "Ground-up houses, ours from first sketch to handover." },
        { icon: "building", title: "Adaptive Reuse", description: "Old structures, reworked without erasing what made them worth keeping." },
        { icon: "compass", title: "Urban & Masterplanning", description: "Site-scale work for developers and institutions." },
        { icon: "pen", title: "Interiors & Detailing", description: "We draw the joinery too — not handed off after the shell." },
      ],
    },
    showcase: {
      kind: "projects",
      heading: "Selected work",
      subheading: "",
      items: [
        { title: "Alibaug Concrete House", meta: "Residential · 2023", image: { src: img("1481253127861-534498168948", 900), alt: "Alibaug concrete house project" } },
        { title: "Fort Warehouse Conversion", meta: "Adaptive reuse · 2022", image: { src: img("1503387762-592deb58ef4e", 900), alt: "Fort warehouse conversion project" } },
        { title: "Lonavala Hillside Retreat", meta: "Residential · 2021", image: { src: img("1470723710355-95304d8aece4", 900), alt: "Lonavala hillside retreat project" } },
      ],
    },
    gallery: {
      heading: "Details & materials",
      subheading: "",
      variant: "photo",
      images: [
        { src: img("1487958449943-2429e8be8625", 1000), alt: "Architectural facade detail" },
        { src: img("1449157291145-7efd050a4d0e", 1000), alt: "Building material detail" },
        { src: img("1481253127861-534498168948", 1000), alt: "Concrete house detail" },
        { src: img("1503387762-592deb58ef4e", 1000), alt: "Warehouse conversion detail" },
      ],
    },
    testimonials: {
      heading: "From our clients",
      items: [
        { quote: "They spent six weeks studying the site before drawing a single wall. It shows.", name: "V. Rao", role: "Alibaug project client" },
        { quote: "Turned a derelict warehouse into the best office we've ever worked in.", name: "Fort Studio Collective", role: "Commercial client" },
        { quote: "Still the same two partners on our project from pitch to handover, two years later.", name: "The Shenoy Family", role: "Lonavala project client" },
      ],
    },
    faq: {
      heading: "Working with us",
      items: [
        { q: "How does a project start?", a: "A site visit and brief conversation, followed by a written proposal — no cost for the first meeting." },
        { q: "What's your fee structure?", a: "Percentage of construction cost, staged across design and construction phases — detailed in the proposal." },
        { q: "How long does a typical project take?", a: "Residential projects run 18–30 months from brief to handover, depending on scale and approvals." },
        { q: "Do you handle approvals and permits?", a: "Yes, end to end — including liaison work with municipal authorities." },
      ],
    },
    contact: {
      heading: "Start a project",
      body: "First site conversations are unpaid — we want to know if it's a fit before either of us commits.",
      email: "studio@kesslerbright.in",
      phone: "+91 22 4022 8810",
      hours: "Mon–Fri · 9am – 6pm",
      location: "Fort, Mumbai",
    },
  },

  // -------------------------------------------------------------------------
  // 9. SaaS Startup — Flowstack (code-rendered visuals, no photography)
  // -------------------------------------------------------------------------
  {
    slug: "flowstack",
    brandName: "Flowstack",
    domain: "flowstack.io",
    industryLabel: "Workflow Analytics",
    location: "Remote-first · HQ in Bengaluru",
    theme: {
      bg: "#0B0B14",
      bgAlt: "#12121E",
      surface: "#181828",
      ink: "#F4F4FA",
      inkMuted: "#9797B5",
      line: "rgba(255,255,255,0.09)",
      brand: "#6C5CE7",
      brandInk: "#FFFFFF",
      brandSoft: "rgba(108,92,231,0.18)",
      font: "font-sans",
      headFont: "font-sans",
      tracking: "tracking-tight",
      radius: "rounded-2xl",
      navStyle: "overlay",
      heroStyle: "product",
      dark: true,
    },
    nav: [
      { label: "Product", href: "#services" },
      { label: "Pricing", href: "#pricing" },
      { label: "Customers", href: "#testimonials" },
      { label: "Docs", href: "#faq" },
      { label: "Login", href: "#contact" },
    ],
    hero: {
      kicker: "Workflow analytics, without the spreadsheet",
      title: "See where work actually gets stuck.",
      sub: "Flowstack turns your team's tools into one live map of where time goes — and where it doesn't need to.",
      cta: "Start free trial",
      secondaryCta: "Book a demo",
    },
    about: {
      eyebrow: "Why we built this",
      title: "We got tired of guessing",
      body: [
        "Three former engineering leads started Flowstack after one too many retros that were just vibes and Slack screenshots. We wanted the actual data: where a ticket sat, who it waited on, and why.",
        "Flowstack reads from the tools you already use — no new process, no forms to fill in — and turns them into one live picture of where work is stuck.",
      ],
      stats: [
        { value: "2,400+", label: "teams onboarded" },
        { value: "38%", label: "average cycle-time drop" },
        { value: "11", label: "integrations, growing" },
      ],
    },
    services: {
      heading: "What Flowstack does",
      subheading: "",
      items: [
        { icon: "chart", title: "Live Process Mining", description: "Every ticket's real path, not the one the board implies." },
        { icon: "layers", title: "Slack, Jira & Linear Sync", description: "Reads your existing tools — nothing new for the team to learn." },
        { icon: "bolt", title: "Bottleneck Alerts", description: "Flags what's stuck before it shows up in your next retro." },
        { icon: "shield", title: "SOC2-Ready Security", description: "Read-only access, audited quarterly, data never leaves your region." },
      ],
    },
    dashboard: {
      heading: "See your pipeline, live",
      subheading: "Every stage, every team, one screen.",
      metrics: [
        { label: "Avg. cycle time", value: "3.2 days", delta: "-38%", up: false },
        { label: "Active workflows", value: "186", delta: "+12%", up: true },
        { label: "Blocked > 24h", value: "4", delta: "-9", up: false },
      ],
      chartLabel: "Cycle time, last 8 weeks",
      chartValues: [7, 6.5, 6, 5.6, 5, 4.4, 3.8, 3.2],
      panelTitle: "Workflows at risk",
      panelRows: [
        { name: "Checkout redesign", status: "Blocked", value: "6d" },
        { name: "API v3 migration", status: "At risk", value: "3d" },
        { name: "Q3 onboarding flow", status: "On track", value: "—" },
      ],
    },
    pricing: {
      heading: "Simple, usage-based pricing",
      subheading: "No seat tax. Pay for workflows you actually run.",
      tiers: [
        { name: "Starter", price: "$0", period: "/mo", description: "For small teams finding their footing.", features: ["Up to 3 workflows", "Slack + email alerts", "7-day history"] },
        { name: "Growth", price: "$79", period: "/mo", description: "For teams shipping every week.", features: ["Unlimited workflows", "All integrations", "1-year history", "Bottleneck alerts"], highlighted: true },
        { name: "Enterprise", price: "Custom", period: "", description: "For orgs with real compliance needs.", features: ["SSO & SOC2", "Dedicated support", "Custom retention", "On-prem option"] },
      ],
    },
    gallery: {
      heading: "Built into your workflow",
      subheading: "Product mockups — no stock dashboard photos here.",
      variant: "device",
      images: [],
      deviceLabels: ["Analytics", "Integrations", "Team activity"],
    },
    testimonials: {
      heading: "Teams using Flowstack",
      items: [
        { quote: "We found a three-day approval bottleneck we'd been blaming on 'the process' for a year.", name: "Leah T.", role: "Head of Engineering, mid-size fintech" },
        { quote: "Set up in an afternoon. No new tool for the team to resent.", name: "Marcus O.", role: "VP Product, B2B SaaS" },
        { quote: "The bottleneck alerts alone paid for the Growth plan in the first month.", name: "Priya R.", role: "Eng Manager, logistics startup" },
      ],
    },
    faq: {
      heading: "Common questions",
      items: [
        { q: "What tools does Flowstack integrate with?", a: "Jira, Linear, Slack, GitHub, GitLab and eight more — read-only, no write access needed." },
        { q: "Is our data secure?", a: "SOC2-ready, encrypted at rest and in transit, and we never store code or message content — only metadata." },
        { q: "Do you offer a free trial?", a: "Starter is free forever; Growth includes a 14-day trial, no card required." },
        { q: "Can we cancel anytime?", a: "Yes — monthly billing, cancel from account settings, no retention calls." },
      ],
    },
    contact: {
      heading: "Talk to us",
      body: "Book a 20-minute walkthrough with the team, no sales deck required.",
      email: "hello@flowstack.io",
      phone: "+1 (415) 555-0139",
      hours: "Support · Mon–Fri, 9am–7pm IST",
      location: "Remote-first · HQ in Bengaluru",
    },
  },

  // -------------------------------------------------------------------------
  // 10. Wedding Photography Studio — Golden Hour Studio
  // -------------------------------------------------------------------------
  {
    slug: "golden-hour",
    brandName: "Golden Hour Studio",
    domain: "goldenhourstudio.co",
    industryLabel: "Destination Wedding Photography",
    location: "Based in Goa · travels worldwide",
    theme: {
      bg: "#FBF4EF",
      bgAlt: "#F5E8DF",
      surface: "#FFFFFF",
      ink: "#332420",
      inkMuted: "#8C766D",
      line: "#EEDDD1",
      brand: "#C08A4E",
      brandInk: "#FFFFFF",
      brandSoft: "rgba(192,138,78,0.13)",
      font: "font-serif",
      headFont: "font-serif",
      tracking: "tracking-normal",
      radius: "rounded-3xl",
      navStyle: "overlay",
      heroStyle: "full-bleed",
      dark: false,
    },
    nav: [
      { label: "Portfolio", href: "#gallery" },
      { label: "Packages", href: "#work" },
      { label: "Our Story", href: "#story" },
      { label: "Enquire", href: "#contact" },
    ],
    hero: {
      kicker: "Destination & Intimate Weddings",
      title: "The 4pm light, and everything after.",
      sub: "Documentary-style wedding photography and film, shot by a two-person team, worldwide.",
      cta: "Check our date",
      secondaryCta: "View portfolio",
      image: { src: img("1519741497674-611481863552", 1600), alt: "Wedding couple photographed by Golden Hour Studio" },
    },
    about: {
      eyebrow: "Who we are",
      title: "Married ourselves, for what it's worth",
      body: [
        "We're a two-person team — one photographer, one filmmaker — and we shoot every wedding together, every time. No associate crew, no second team you've never met showing up on the day.",
        "We shoot documentary-style: real moments as they happen, a handful of portraits at the light we ask for, and nothing staged that doesn't need to be.",
      ],
      image: { src: img("1465495976277-4387d4b0b4c6", 1200), alt: "Golden Hour Studio photographing a couple" },
      stats: [
        { value: "140+", label: "weddings shot" },
        { value: "9", label: "countries, and counting" },
        { value: "2", label: "of us, always" },
      ],
    },
    services: {
      heading: "What's included",
      subheading: "",
      items: [
        { icon: "camera", title: "Full-Day Coverage", description: "Getting-ready through the last dance, both of us shooting." },
        { icon: "users", title: "Second Shooter & Film", description: "A cinematic film crew, included — not an add-on." },
        { icon: "gem", title: "Heirloom Albums", description: "Hand-bound, printed and proofed with you personally." },
        { icon: "calendar", title: "Engagement Sessions", description: "Included with every full-day package, anywhere you like." },
      ],
    },
    showcase: {
      kind: "packages",
      heading: "Packages",
      subheading: "Every package includes both of us.",
      items: [
        { title: "The Elopement", meta: "Up to 4 hours", price: "₹85,000", image: { src: img("1522673607200-164d1b6ce486", 900), alt: "Elopement package coverage" } },
        { title: "The Full Day", meta: "10 hours + film", price: "₹1,85,000", image: { src: img("1523438885200-e635ba2c371e", 900), alt: "Full day wedding coverage" } },
        { title: "The Destination", meta: "3 days, travel included", price: "From ₹3,40,000", image: { src: img("1519225421980-715cb0215aed", 900), alt: "Destination wedding coverage" } },
      ],
    },
    gallery: {
      heading: "Recent weddings",
      subheading: "",
      variant: "photo",
      images: [
        { src: img("1519741497674-611481863552", 1000), alt: "Wedding couple portrait" },
        { src: img("1465495976277-4387d4b0b4c6", 1000), alt: "Candid wedding moment" },
        { src: img("1522673607200-164d1b6ce486", 1000), alt: "Wedding celebration moment" },
        { src: img("1523438885200-e635ba2c371e", 1000), alt: "Wedding reception moment" },
      ],
    },
    testimonials: {
      heading: "From our couples",
      items: [
        { quote: "They disappeared into the background all day and still caught every moment that mattered.", name: "Ananya & Vikram", role: "Married in Goa, 2025" },
        { quote: "The film made us cry more than the actual ceremony did.", name: "Leo & Priya", role: "Married in Tuscany, 2024" },
        { quote: "Booked them eighteen months out and it was worth every week of waiting.", name: "Simone & Aditya", role: "Married in Udaipur, 2025" },
      ],
    },
    faq: {
      heading: "Before you enquire",
      items: [
        { q: "How far in advance should we book?", a: "12–18 months for popular dates, especially October–February in India." },
        { q: "Do you travel for destination weddings?", a: "Yes — travel and stay are quoted separately and built into The Destination package." },
        { q: "When do we receive our photos?", a: "A 20-image sneak peek within 72 hours, full gallery within 8 weeks." },
        { q: "Do you bring a second shooter?", a: "Always — one photographer, one filmmaker, on every wedding, no exceptions." },
      ],
    },
    contact: {
      heading: "Check our date",
      body: "Enquiries answered within 48 hours, with real availability — not a form that goes nowhere.",
      email: "hello@goldenhourstudio.co",
      phone: "+91 98221 90045",
      hours: "Enquiries answered within 48 hours",
      location: "Based in Goa · travels worldwide",
    },
  },
];

export function getConceptSite(slug: string) {
  return conceptSites.find((s) => s.slug === slug);
}
