// Bundled packages and their feature lists.

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

