// How we work, and why businesses stay.

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

