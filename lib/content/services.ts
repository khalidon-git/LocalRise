// Services: the homepage bento, the per-service detail pages
// (/services/<id>) and the à la carte list.

import type { IconName } from "@/components/ui/Icon";

export type Service = {
  id: string;
  title: string;
  blurb: string;
  icon: string; // key mapped in Icon component
  span: "sm" | "lg" | "tall"; // bento sizing
  points?: string[];
};

export const services: Service[] = [
  {
    id: "websites",
    title: "Business Websites",
    blurb:
      "A clean, fast website that makes your business look established and helps customers find you day or night.",
    icon: "browser",
    span: "lg",
    points: ["Mobile-first", "Loads in seconds", "Easy to update"],
  },
  {
    id: "google",
    title: "Google Business Profile",
    blurb:
      "Show up on Google Maps when people nearby search for what you sell.",
    icon: "map",
    span: "tall",
    points: ["Maps listing", "Photos & hours", "Get directions"],
  },
  {
    id: "whatsapp",
    title: "WhatsApp for Business",
    blurb: "Turn website visitors into WhatsApp chats with one tap.",
    icon: "chat",
    span: "sm",
  },
  {
    id: "store",
    title: "Online Store",
    blurb: "Sell products or take bookings and payments online.",
    icon: "cart",
    span: "sm",
  },
  {
    id: "logo",
    title: "Logo & Branding",
    blurb:
      "A memorable logo and colours that make your business instantly recognisable.",
    icon: "sparkles",
    span: "sm",
  },
  {
    id: "reviews",
    title: "Reviews & Reputation",
    blurb: "Collect more 5-star reviews and show them off to build trust.",
    icon: "star",
    span: "sm",
  },
  {
    id: "automation",
    title: "Business Automation",
    blurb:
      "Auto-replies, enquiry forms and reminders that work while you sleep.",
    icon: "bolt",
    span: "lg",
    points: ["Auto-reply", "Lead capture", "Reminders"],
  },
];

// ---------------------------------------------------------------------------
// Per-service detail pages (/services/<id>). Keyed by the Service id above.
// Only genuine, plain-language content — no invented stats or client claims.
// `faqPicks` are indices into the `faqs` array; `relatedPackageId` links a
// package; `priceFrom` mirrors individualServices where one maps cleanly.
// ---------------------------------------------------------------------------
export type ServiceDetail = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  headline: string;
  sub: string;
  who: string;
  accent: string; // gradient classes for the hero visual
  benefits: { icon: IconName; title: string; text: string }[];
  included: string[];
  outcomes: string[];
  faqPicks: number[];
  relatedPackageId: string;
  relatedServiceIds: string[];
  priceFrom?: number;
};

export const serviceScopeNote =
  "Third-party fees and work outside the agreed scope are not included unless they are listed in your proposal. We explain any separate cost before you approve it.";

export const serviceDetails: Record<string, ServiceDetail> = {
  websites: {
    seoTitle: "Website Design for Small Businesses in India | LocalRise",
    metaDescription: "Get a fast, professional and mobile-friendly business website designed to generate calls, WhatsApp messages and customer enquiries across India.",
    h1: "Website design for small businesses in India",
    headline: "A website that works as hard as you do",
    sub: "A fast, professional website that makes your business look established — and turns visitors into calls, messages and walk-ins.",
    who: "Perfect for any local business that wants to look credible online and be effortless to contact.",
    accent: "from-[#2f5bff] to-[#5b84ff]",
    benefits: [
      { icon: "browser", title: "Looks professional", text: "A clean, modern design that earns trust before a customer has even called." },
      { icon: "phone", title: "Built for mobile", text: "Most local customers are on their phone — your site looks and works perfectly there." },
      { icon: "bolt", title: "Loads in seconds", text: "Fast pages so visitors never leave waiting — better for customers and for Google." },
      { icon: "chat", title: "One-tap contact", text: "Call and WhatsApp buttons everywhere, so getting in touch is effortless." },
    ],
    included: ["Custom mobile-first design", "WhatsApp & call buttons", "Enquiry / contact form", "Google Maps location", "Free SSL & hosting setup"],
    outcomes: ["More enquiries and calls", "A credible first impression", "Easy for customers to reach you"],
    faqPicks: [0, 1, 4],
    relatedPackageId: "growth",
    relatedServiceIds: ["google", "whatsapp"],
    priceFrom: 7999,
  },
  google: {
    seoTitle: "Google Business Profile Setup in India | LocalRise",
    metaDescription: "Set up and optimize your Google Business Profile so nearby customers can find your business on Google Search and Google Maps.",
    h1: "Google Business Profile setup for local businesses",
    headline: "Show up when nearby customers search",
    sub: "Get on Google Maps and local search so people nearby find you first — with photos, hours and one-tap directions.",
    who: "For any business that wants walk-ins and calls from people searching nearby.",
    accent: "from-[#12b981] to-[#5be3b0]",
    benefits: [
      { icon: "map", title: "On the map", text: "Appear in Google Maps and local results when customers search for what you offer." },
      { icon: "star", title: "Build trust fast", text: "Show your ratings, photos and hours so people choose you with confidence." },
      { icon: "pin", title: "Easy to find", text: "Customers get directions to your door in a single tap." },
      { icon: "phone", title: "More calls", text: "A prominent call button right inside your Google listing." },
    ],
    included: ["Profile setup guidance", "Photos & business hours", "Category & keyword tuning", "Google Posts setup", "Review link to collect ratings"],
    outcomes: ["More walk-ins and calls", "Higher trust from reviews", "Found by nearby customers"],
    faqPicks: [2, 0, 5],
    relatedPackageId: "growth",
    relatedServiceIds: ["websites", "reviews"],
    priceFrom: 2999,
  },
  whatsapp: {
    seoTitle: "WhatsApp Business Setup for Small Businesses | LocalRise",
    metaDescription: "Set up WhatsApp Business, click-to-chat links and website integration so customers can contact your business more easily.",
    h1: "WhatsApp Business setup for local businesses",
    headline: "Turn visitors into WhatsApp chats",
    sub: "Let customers message you with one tap, and reply faster with a proper WhatsApp Business setup.",
    who: "For businesses that win customers through conversations, not forms.",
    accent: "from-[#25D366] to-[#5be3b0]",
    benefits: [
      { icon: "whatsapp", title: "One-tap chat", text: "A WhatsApp button on your site and Google listing — customers reach you instantly." },
      { icon: "chat", title: "Look professional", text: "A proper business profile with catalogue, hours and a greeting message." },
      { icon: "bolt", title: "Never miss a lead", text: "Quick replies and auto-greetings answer common questions even after hours." },
    ],
    included: ["WhatsApp Business profile", "Quick replies & greeting", "Product / service catalogue", "Click-to-chat buttons"],
    outcomes: ["Faster replies", "More conversations", "Fewer missed enquiries"],
    faqPicks: [3, 1, 7],
    relatedPackageId: "starter",
    relatedServiceIds: ["websites", "automation"],
    priceFrom: 1999,
  },
  store: {
    seoTitle: "Ecommerce Website Development in India | LocalRise",
    metaDescription: "Launch a fast, mobile-friendly ecommerce website designed for Indian small businesses to showcase products and accept customer orders.",
    h1: "Ecommerce websites for small businesses in India",
    headline: "Sell online, take orders around the clock",
    sub: "A simple online store or booking system so customers can buy, book and pay 24/7 — even while you sleep.",
    who: "For shops, boutiques and services ready to sell or take bookings online.",
    accent: "from-[#9b5bff] to-[#c79bff]",
    benefits: [
      { icon: "cart", title: "Sell anytime", text: "Customers browse and order at midnight or midday — you wake up to sales." },
      { icon: "tag", title: "Easy payments", text: "Accept payments securely, with order alerts straight to you." },
      { icon: "whatsapp", title: "WhatsApp checkout", text: "Let customers confirm and pay over WhatsApp if that's easier for them." },
      { icon: "list", title: "Simple to manage", text: "Update products, prices and stock without any technical know-how." },
    ],
    included: ["Product catalogue", "Online payments", "Order notifications", "WhatsApp checkout option"],
    outcomes: ["Sales beyond opening hours", "Fewer manual orders", "A shop that scales"],
    faqPicks: [0, 4, 5],
    relatedPackageId: "automation",
    relatedServiceIds: ["websites", "whatsapp"],
    priceFrom: 19999,
  },
  logo: {
    seoTitle: "Logo and Branding Design for Small Businesses | LocalRise",
    metaDescription: "Build a clear and memorable business identity with professional logo and branding design created for growing small businesses.",
    h1: "Logo and branding design for small businesses",
    headline: "A look customers remember",
    sub: "A memorable logo and a consistent set of colours and fonts that make your business instantly recognisable.",
    who: "For new businesses, or established ones ready to look the part.",
    accent: "from-[#ff7a3d] to-[#ffb26b]",
    benefits: [
      { icon: "sparkles", title: "Stand out", text: "A distinctive logo that sets you apart from the shop next door." },
      { icon: "palette", title: "Consistent everywhere", text: "Colours and fonts that look right on your site, signage and social." },
      { icon: "layers", title: "Ready for anything", text: "Every file you'll need — print, web, dark and light versions." },
    ],
    included: ["3 logo concepts to choose from", "Colour & font system", "All file formats", "Business card design", "Social media templates"],
    outcomes: ["Instant recognition", "A premium first impression", "One consistent look"],
    faqPicks: [0, 4, 7],
    relatedPackageId: "starter",
    relatedServiceIds: ["websites", "google"],
    priceFrom: 3499,
  },
  reviews: {
    seoTitle: "Review and Reputation Setup for Local Businesses | LocalRise",
    metaDescription: "Make it easier to request and display genuine customer reviews with practical reputation tools for local businesses in India.",
    h1: "Review and reputation tools for local businesses",
    headline: "Let happy customers do the selling",
    sub: "Collect more 5-star reviews and show them off, so new customers trust you before they ever call.",
    who: "For businesses with happy customers who just aren't leaving reviews yet.",
    accent: "from-[#FFB020] to-[#ffd37a]",
    benefits: [
      { icon: "star", title: "More 5-star reviews", text: "A simple system that nudges happy customers to leave a review." },
      { icon: "shield", title: "Build trust", text: "Show your best reviews on your website and Google listing." },
      { icon: "heart", title: "Win word of mouth", text: "Turn satisfied customers into your best marketing." },
    ],
    included: ["Review collection link & QR", "Review request templates", "Reviews shown on your site", "Google rating display"],
    outcomes: ["A stronger reputation", "Higher trust from new customers", "More reviews on autopilot"],
    faqPicks: [2, 5, 7],
    relatedPackageId: "growth",
    relatedServiceIds: ["google", "websites"],
    priceFrom: 2499,
  },
  automation: {
    seoTitle: "Small Business Automation Services in India | LocalRise",
    metaDescription: "Save time with practical enquiry capture, auto-replies, reminders and simple business automation designed for growing local businesses.",
    h1: "Practical automation for local businesses",
    headline: "Let your business run on autopilot",
    sub: "Auto-replies, enquiry capture and reminders that work while you sleep — so no lead is ever missed.",
    who: "For busy owners who can't reply to everything by hand.",
    accent: "from-[#2f5bff] to-[#9b5bff]",
    benefits: [
      { icon: "bolt", title: "Instant replies", text: "Auto-answers to common questions, day or night." },
      { icon: "list", title: "Capture every lead", text: "Enquiries saved neatly to a simple sheet — never lose a customer." },
      { icon: "clock", title: "Helpful reminders", text: "Automatic follow-ups and reminders that keep customers coming back." },
      { icon: "target", title: "See what's working", text: "A simple dashboard showing visits and enquiries in plain numbers." },
    ],
    included: ["WhatsApp auto-replies", "Lead capture into a sheet", "Automated reminders", "Simple analytics dashboard"],
    outcomes: ["No missed enquiries", "Hours saved every week", "A business that runs itself"],
    faqPicks: [3, 4, 5],
    relatedPackageId: "automation",
    relatedServiceIds: ["whatsapp", "websites"],
    priceFrom: 29999,
  },
};


/** Which ServiceVisual mockup a card shows — see components/illustrations/ServiceVisual.tsx. */
export type ServiceVisualKind =
  | "website"
  | "maps"
  | "chat"
  | "shop"
  | "brand"
  | "brandkit"
  | "reviews"
  | "automation"
  | "marketplace";

export type IndividualService = {
  title: string;
  price: number;
  priceNote?: string;
  delivery: string;
  desc: string;
  includes: string[];
  icon: string;
  /** Literal Tailwind gradient classes — matches serviceDetails[id].accent where one exists. */
  accent: string;
  visual: ServiceVisualKind;
};

/** Full catalogue — every card, in the order they were introduced. */
export const individualServices: IndividualService[] = [
  {
    title: "Business Website",
    price: 7999,
    priceNote: "starting",
    delivery: "3–5 days",
    icon: "browser",
    desc: "A professional website built to bring you calls, messages and walk-ins.",
    includes: ["Mobile responsive design", "WhatsApp & call buttons", "Contact form", "Google Maps"],
    accent: "from-[#2f5bff] to-[#5b84ff]",
    visual: "website",
  },
  {
    title: "Google Business Profile",
    price: 2999,
    delivery: "2 days",
    icon: "map",
    desc: "Get your business on Google Maps and local search results.",
    includes: ["Profile setup guidance", "Photos & business hours", "Posts & category tuning"],
    accent: "from-[#12b981] to-[#5be3b0]",
    visual: "maps",
  },
  {
    title: "WhatsApp Business Setup",
    price: 1999,
    delivery: "1 day",
    icon: "chat",
    desc: "Look professional on WhatsApp with a proper business presence.",
    includes: ["Business profile", "Quick replies", "Product catalogue", "Greeting message"],
    accent: "from-[#25D366] to-[#5be3b0]",
    visual: "chat",
  },
  {
    title: "Online Store",
    price: 19999,
    priceNote: "starting",
    delivery: "7 days",
    icon: "cart",
    desc: "Sell your products online with easy payments and order alerts.",
    includes: ["Product catalogue", "Online payments", "Order notifications", "WhatsApp checkout"],
    accent: "from-[#9b5bff] to-[#c79bff]",
    visual: "shop",
  },
  {
    title: "Logo Design",
    price: 3499,
    delivery: "3 days",
    icon: "sparkles",
    desc: "A clean, memorable logo with the files you'll need everywhere.",
    includes: ["3 concepts to choose from", "All file formats", "Colour & mono versions"],
    accent: "from-[#ff7a3d] to-[#ffb26b]",
    visual: "brand",
  },
  {
    title: "Business Branding Kit",
    price: 9999,
    priceNote: "starting",
    delivery: "5 days",
    icon: "layers",
    desc: "A complete look for your business, from logo to social posts.",
    includes: ["Logo & colour system", "Business cards", "Social media templates", "Signage-ready files"],
    accent: "from-[#ec4899] to-[#f9a8d4]",
    visual: "brandkit",
  },
  {
    title: "Reviews & Reputation",
    price: 2499,
    delivery: "2 days",
    icon: "star",
    desc: "Collect more 5-star reviews and show them off to build trust fast.",
    includes: ["Review link & QR code", "Request message templates", "Reviews shown on your site"],
    accent: "from-[#FFB020] to-[#ffd37a]",
    visual: "reviews",
  },
  {
    title: "Business Automation",
    price: 29999,
    priceNote: "starting",
    delivery: "5–7 days",
    icon: "bolt",
    desc: "Auto-replies, lead capture and reminders that work while you sleep.",
    includes: ["WhatsApp auto-replies", "Lead capture into a sheet", "Automated reminders", "Simple analytics dashboard"],
    accent: "from-[#2f5bff] to-[#9b5bff]",
    visual: "automation",
  },
  {
    title: "Marketplace Registration",
    price: 4999,
    delivery: "5–7 days",
    icon: "rocket",
    desc: "Get set up to sell on Amazon, Flipkart, Myntra and more — we handle the paperwork.",
    includes: ["Amazon + Flipkart + Myntra setup", "Document & GST handling", "Initial catalog upload", "Account health setup"],
    accent: "from-[#06b6d4] to-[#22d3ee]",
    visual: "marketplace",
  },
];

/**
 * Homepage carousel only — a scoped subset, not a content removal. Excludes
 * "Online Store" (`visual: "shop"`) and "Reviews & Reputation"
 * (`visual: "reviews"`) from the homepage carousel by design; both keep
 * their full entries in `individualServices` above, and their
 * `/services/store/` and `/services/reviews/` detail pages (`services` +
 * `serviceDetails`, untouched) remain reachable exactly as before.
 * Filters on `visual` rather than `title` because it's already a unique,
 * stable key per entry — a title edit can't silently change which cards
 * this excludes.
 */
export const homepageServices: IndividualService[] = individualServices.filter(
  (s) => s.visual !== "shop" && s.visual !== "reviews",
);
