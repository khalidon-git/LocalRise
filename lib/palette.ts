// Rotating brand-accent gradients for colourful icon tiles across sections.
// Literal strings so Tailwind's JIT generates the arbitrary colours.
export const gradients = [
  "from-[#2f5bff] to-[#5b84ff]",
  "from-[#ff7a3d] to-[#ffb26b]",
  "from-[#12b981] to-[#5be3b0]",
  "from-[#9b5bff] to-[#c79bff]",
  "from-[#ec4899] to-[#f9a8d4]",
  "from-[#06b6d4] to-[#22d3ee]",
  "from-[#f59e0b] to-[#fbbf24]",
];

export const gradient = (i: number) => gradients[i % gradients.length];
