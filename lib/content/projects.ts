// Demo/concept portfolio projects.

export type Project = {
  title: string;
  category: string;
  summary: string;
  tags: string[];
  accent: string; // gradient class (used by the code-rendered fallback mockup)
  // Optional real screenshot of a demo/concept site, e.g. "/portfolio/aarohi.webp"
  // (put the file in public/portfolio/, ~1600px wide, pre-compressed). When set,
  // it replaces the code-rendered BrowserMock. Still honestly badged "Demo Project".
  image?: string;
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

