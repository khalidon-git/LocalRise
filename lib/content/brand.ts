// Brand identity, primary navigation and top-line trust/stat strings.
// Contact details are live — changing them here updates the whole site
// (nav, contact, footer, WhatsApp button and SEO schema).

export const brand = {
  name: "LocalRise",
  tagline: "Helping local businesses grow online.",
  // Primary number: drives the nav call button and every WhatsApp link.
  phoneDisplay: "+91 91222 69958",
  phoneHref: "+919122269958",
  whatsappHref: "919122269958", // wa.me number: country code + number, no +
  // Second line, also on WhatsApp. Shown in contact + footer only — the nav
  // and the floating button stay on the primary so there's one obvious action.
  phoneAltDisplay: "+91 89693 99650",
  phoneAltHref: "+918969399650",
  email: "help@localrise.in",
  instagram: "https://www.instagram.com/localrise.in/",
  location: "Serving local businesses across India",
} as const;

// Root-relative (/#...) so these resolve from sub-pages too: from a service
// page they navigate home then scroll; on the homepage they're a same-path
// hash change (no reload).
export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Packages", href: "/#packages" },
  { label: "Work", href: "/#portfolio" },
  { label: "Industries", href: "/#industries" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const trustItems = [
  "Transparent Pricing",
  "Fast Delivery",
  "Friendly Support",
  "Made for Local Businesses",
  "No Hidden Charges",
] as const;

export const stats = [
  { value: "3–7", label: "days to launch" },
  { value: "1:1", label: "personal support" },
  { value: "0", label: "hidden charges" },
  { value: "9+", label: "industries served" },
];
