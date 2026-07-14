// ---------------------------------------------------------------------------
// LocalRise — single source of truth for site content.
// Written in plain language for local business owners: customers, calls,
// WhatsApp, Google, reviews, growth — never jargon.
// Prices in INR (₹). Replace placeholder contact details before launch.
// ---------------------------------------------------------------------------

export const brand = {
  name: "LocalRise",
  tagline: "Helping local businesses grow online.",
  phoneDisplay: "+91 90000 00000",
  phoneHref: "+919000000000",
  whatsappHref: "919000000000", // wa.me number, no +
  email: "hello@localrise.in",
  location: "Serving local businesses across India",
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Work", href: "#portfolio" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;

export const trustItems = [
  "Transparent Pricing",
  "Fast Delivery",
  "Friendly Support",
  "Made for Local Businesses",
  "No Hidden Charges",
] as const;

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

export type Feature = { text: string; hint?: string };

export type Package = {
  id: string;
  name: string;
  best?: boolean;
  tagline: string;
  price: number;
  priceNote: string;
  delivery: string;
  features: Feature[];
  cta: string;
};

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Get online and look professional.",
    price: 7999,
    priceNote: "one-time",
    delivery: "Ready in 3 days",
    cta: "Start with Starter",
    features: [
      { text: "1-page professional website", hint: "A single, beautiful page that covers everything customers need to know." },
      { text: "Works perfectly on mobile", hint: "Most local customers browse on their phone — your site will look great there." },
      { text: "WhatsApp chat button", hint: "One tap and a customer is chatting with you." },
      { text: "Google Maps location", hint: "Customers can find and get directions to your shop." },
      { text: "Enquiry / contact form", hint: "Get messages and phone numbers straight to your inbox." },
      { text: "Free SSL & hosting setup", hint: "The technical safety padlock and the space your site lives on — handled for you." },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    best: true,
    tagline: "Get found on Google and win more customers.",
    price: 14999,
    priceNote: "one-time",
    delivery: "Ready in 7 days",
    cta: "Grow with Growth",
    features: [
      { text: "Everything in Starter" },
      { text: "Up to 6 pages", hint: "Home, About, Services, Gallery, Reviews, Contact — room to tell your full story." },
      { text: "Google Business Profile setup", hint: "We set up and optimise your Maps listing so you appear in local searches." },
      { text: "Basic SEO so people find you", hint: "We help Google understand your business so the right customers land on your site." },
      { text: "Photo gallery & reviews section", hint: "Show your work and let happy customers do the selling." },
      { text: "WhatsApp Business setup", hint: "Catalogue, quick replies and a proper business presence." },
      { text: "1 month free support", hint: "Small changes and questions covered after launch." },
    ],
  },
  {
    id: "automation",
    name: "Automation",
    tagline: "Let your business run and sell on autopilot.",
    price: 29999,
    priceNote: "one-time",
    delivery: "Ready in 10–14 days",
    cta: "Automate my business",
    features: [
      { text: "Everything in Growth" },
      { text: "Online store or booking system", hint: "Take orders, appointments or payments 24/7." },
      { text: "WhatsApp auto-replies", hint: "Instant answers to common questions, even after hours." },
      { text: "Lead capture into a simple sheet", hint: "Every enquiry saved neatly so you never lose a customer." },
      { text: "Analytics dashboard", hint: "See how many people visit and contact you, in plain numbers." },
      { text: "3 months priority support", hint: "You're first in line whenever you need us." },
    ],
  },
];

export type IndividualService = {
  title: string;
  price: number;
  priceNote?: string;
  delivery: string;
  desc: string;
  includes: string[];
  icon: string;
};

export const individualServices: IndividualService[] = [
  {
    title: "Business Website",
    price: 7999,
    priceNote: "starting",
    delivery: "3–5 days",
    icon: "browser",
    desc: "A professional website built to bring you calls, messages and walk-ins.",
    includes: ["Mobile responsive design", "WhatsApp & call buttons", "Contact form", "Google Maps"],
  },
  {
    title: "Google Business Profile",
    price: 2999,
    delivery: "2 days",
    icon: "map",
    desc: "Get your business on Google Maps and local search results.",
    includes: ["Profile setup & verification", "Photos & business hours", "Posts & category tuning"],
  },
  {
    title: "Logo Design",
    price: 3499,
    delivery: "3 days",
    icon: "sparkles",
    desc: "A clean, memorable logo with the files you'll need everywhere.",
    includes: ["3 concepts to choose from", "All file formats", "Colour & mono versions"],
  },
  {
    title: "Online Store",
    price: 19999,
    priceNote: "starting",
    delivery: "7 days",
    icon: "cart",
    desc: "Sell your products online with easy payments and order alerts.",
    includes: ["Product catalogue", "Online payments", "Order notifications", "WhatsApp checkout"],
  },
  {
    title: "WhatsApp Business Setup",
    price: 1999,
    delivery: "1 day",
    icon: "chat",
    desc: "Look professional on WhatsApp with a proper business presence.",
    includes: ["Business profile", "Quick replies", "Product catalogue", "Greeting message"],
  },
  {
    title: "Business Branding Kit",
    price: 9999,
    priceNote: "starting",
    delivery: "5 days",
    icon: "palette",
    desc: "A complete look for your business, from logo to social posts.",
    includes: ["Logo & colour system", "Business cards", "Social media templates", "Signage-ready files"],
  },
];

export type Industry = {
  name: string;
  icon: string;
  line: string;
  outcomes: string[];
};

export const industries: Industry[] = [
  { name: "Doctors & Clinics", icon: "stethoscope", line: "Let patients book and find you easily.", outcomes: ["Online appointments", "Google Maps listing", "Trust-building reviews"] },
  { name: "Restaurants & Cafés", icon: "utensils", line: "Show your menu and take orders online.", outcomes: ["Digital menu", "Table & order enquiries", "Photo-first design"] },
  { name: "Hotels & Stays", icon: "bed", line: "Fill more rooms with direct bookings.", outcomes: ["Room showcase", "Enquiry & booking form", "Location & amenities"] },
  { name: "Schools & Coaching", icon: "cap", line: "Attract parents and new admissions.", outcomes: ["Admissions enquiry", "Courses & faculty", "Gallery & results"] },
  { name: "Builders & Contractors", icon: "hammer", line: "Showcase projects and win bigger jobs.", outcomes: ["Project portfolio", "Quote requests", "Credibility & trust"] },
  { name: "Furniture Stores", icon: "sofa", line: "Turn your catalogue into online enquiries.", outcomes: ["Product catalogue", "WhatsApp enquiries", "Showroom directions"] },
  { name: "Tiles & Sanitaryware", icon: "grid", line: "Help dealers and homeowners find your range.", outcomes: ["Range showcase", "Dealer enquiries", "Design galleries"] },
  { name: "Real Estate", icon: "building", line: "Get more qualified property leads.", outcomes: ["Property listings", "Lead capture", "Map & walkthroughs"] },
  { name: "Salons & Spas", icon: "scissors", line: "Keep your chairs full with easy bookings.", outcomes: ["Online booking", "Services & pricing", "Before/after gallery"] },
];

export type Project = {
  title: string;
  category: string;
  summary: string;
  tags: string[];
  accent: string; // gradient class
};

export const projects: Project[] = [
  {
    title: "Aarohi Dental Studio",
    category: "Clinic Website",
    summary: "A calm, trustworthy site with online appointment booking and a Google-ready profile.",
    tags: ["Website", "Booking", "Google Profile"],
    accent: "from-[#2f5bff] to-[#5b84ff]",
  },
  {
    title: "Spice Route Kitchen",
    category: "Restaurant Website",
    summary: "A mouth-watering, photo-first menu site with WhatsApp ordering built in.",
    tags: ["Website", "Digital Menu", "WhatsApp"],
    accent: "from-[#ff7a3d] to-[#ffb26b]",
  },
  {
    title: "Veranda Stays",
    category: "Hotel Branding + Site",
    summary: "A boutique hotel identity with a booking-focused landing page and room showcase.",
    tags: ["Branding", "Website", "Booking"],
    accent: "from-[#12b981] to-[#5be3b0]",
  },
  {
    title: "Urban Nest Furniture",
    category: "Store + Catalogue",
    summary: "A warm catalogue experience that turns browsers into WhatsApp enquiries.",
    tags: ["Online Store", "Catalogue", "Branding"],
    accent: "from-[#9b5bff] to-[#c79bff]",
  },
];

export type Step = { n: string; title: string; desc: string; icon: string };

export const process: Step[] = [
  { n: "01", title: "Discover", desc: "We learn about your business, your customers and what growth means for you.", icon: "compass" },
  { n: "02", title: "Plan", desc: "A simple, clear plan — what we'll build, what it costs, and when it's ready.", icon: "list" },
  { n: "03", title: "Design", desc: "We craft a clean, modern look that fits your business and builds trust.", icon: "pen" },
  { n: "04", title: "Build", desc: "We bring it to life — fast, reliable and ready for real customers.", icon: "code" },
  { n: "05", title: "Launch", desc: "We put you live on the web, on Google and on WhatsApp.", icon: "rocket" },
  { n: "06", title: "Support", desc: "We stay with you — updates, questions and small changes, handled.", icon: "shield" },
];

export const whyChooseUs = [
  { title: "Clear Communication", desc: "No jargon, no confusion. We explain everything in simple language.", icon: "chat" },
  { title: "Fast Delivery", desc: "Your website live in days, not months. We respect your time.", icon: "bolt" },
  { title: "Transparent Pricing", desc: "You know the full price upfront. No surprises, ever.", icon: "tag" },
  { title: "Friendly Support", desc: "Real people who pick up and genuinely want to help.", icon: "heart" },
  { title: "Business-First Approach", desc: "We care about your customers and calls, not just pretty pixels.", icon: "target" },
  { title: "Modern Design", desc: "Clean, premium design that makes your business look established.", icon: "sparkles" },
  { title: "Future Ready", desc: "Built to grow with you — add a store, bookings or pages any time.", icon: "layers" },
];

export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: "How long does it take to build my website?",
    a: "Most local business websites are ready in 3 to 7 days. Bigger stores or booking systems take a little longer. We agree on the exact date before we start, so you always know what to expect.",
  },
  {
    q: "Do I need to know anything technical?",
    a: "Not at all. That's our job. You just tell us about your business and share a few photos and details — we handle the website, Google, WhatsApp and everything else.",
  },
  {
    q: "Will my business show up on Google?",
    a: "Yes. We set up your Google Business Profile and build your website in a way that helps people find you when they search for what you offer nearby.",
  },
  {
    q: "Can customers contact me on WhatsApp?",
    a: "Absolutely. We add a WhatsApp button so customers can message you with one tap, and we can set up auto-replies so no enquiry is ever missed.",
  },
  {
    q: "What if I want changes later?",
    a: "Easy. Every package includes support, and we make small changes quickly. You can also add new pages, a store or bookings whenever your business grows.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No. The price we quote is the price you pay. We'll always tell you clearly if something like a domain or premium tool has its own cost, before you spend anything.",
  },
  {
    q: "Do you work with businesses outside my city?",
    a: "Yes. We work with local businesses all across India, entirely over call and WhatsApp. Distance is never a problem.",
  },
  {
    q: "What do I need to get started?",
    a: "Just a short conversation. Book a free consultation and we'll understand your business, suggest the best option, and give you a clear price and timeline — no obligation.",
  },
];

export const stats = [
  { value: "3–7", label: "days to launch" },
  { value: "1:1", label: "personal support" },
  { value: "0", label: "hidden charges" },
  { value: "9+", label: "industries served" },
];
