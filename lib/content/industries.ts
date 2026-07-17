// Industries we build for, with per-industry accent colours.

export type Industry = {
  name: string;
  icon: string;
  line: string;
  outcomes: string[];
  accent: string; // gradient classes for the industry's colourful visual
};

export const industries: Industry[] = [
  { name: "Doctors & Clinics", icon: "stethoscope", line: "Let patients book and find you easily.", outcomes: ["Online appointments", "Google Maps listing", "Trust-building reviews"], accent: "from-[#2f5bff] to-[#5b84ff]" },
  { name: "Restaurants & Cafés", icon: "utensils", line: "Show your menu and take orders online.", outcomes: ["Digital menu", "Table & order enquiries", "Photo-first design"], accent: "from-[#ff7a3d] to-[#ffb26b]" },
  { name: "Hotels & Stays", icon: "bed", line: "Fill more rooms with direct bookings.", outcomes: ["Room showcase", "Enquiry & booking form", "Location & amenities"], accent: "from-[#12b981] to-[#5be3b0]" },
  { name: "Schools & Coaching", icon: "cap", line: "Attract parents and new admissions.", outcomes: ["Admissions enquiry", "Courses & faculty", "Gallery & results"], accent: "from-[#9b5bff] to-[#c79bff]" },
  { name: "Builders & Contractors", icon: "hammer", line: "Showcase projects and win bigger jobs.", outcomes: ["Project portfolio", "Quote requests", "Credibility & trust"], accent: "from-[#f59e0b] to-[#fbbf24]" },
  { name: "Furniture Stores", icon: "sofa", line: "Turn your catalogue into online enquiries.", outcomes: ["Product catalogue", "WhatsApp enquiries", "Showroom directions"], accent: "from-[#f43f5e] to-[#fb7185]" },
  { name: "Tiles & Sanitaryware", icon: "grid", line: "Help dealers and homeowners find your range.", outcomes: ["Range showcase", "Dealer enquiries", "Design galleries"], accent: "from-[#06b6d4] to-[#22d3ee]" },
  { name: "Real Estate", icon: "building", line: "Get more qualified property leads.", outcomes: ["Property listings", "Lead capture", "Map & walkthroughs"], accent: "from-[#4f46e5] to-[#818cf8]" },
  { name: "Salons & Spas", icon: "scissors", line: "Keep your chairs full with easy bookings.", outcomes: ["Online booking", "Services & pricing", "Before/after gallery"], accent: "from-[#ec4899] to-[#f9a8d4]" },
];

