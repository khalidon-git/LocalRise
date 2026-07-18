import { brand } from "@/lib/content";

// Channel config lives here rather than a separate file: it's two constants,
// and this codebase avoids ceremony a ~50-file site doesn't need (see
// knowledge/decisions/001-right-sized-architecture.md).
const NUMBERS = [brand.whatsappHref, brand.whatsappAltHref] as const;
const STORAGE_KEY = "wa_last_number";

// --- Number alternation ------------------------------------------------------
//
// This is a static, backend-less site (output: "export" — no server, no API
// routes, no database; see CLAUDE.md). That makes strict cross-visitor
// alternation ("visitor 1 gets number A, visitor 2 gets number B") physically
// impossible to guarantee from the client alone: sessionStorage is scoped to
// one browser tab and carries no memory of what any other visitor's browser
// picked, and there is nowhere server-side to keep a shared counter without
// adding a backend this site deliberately doesn't have.
//
// What IS achievable, and what this does: pick a number at random the first
// time a session needs one (so across many independent visitors the split
// averages out to roughly even), then remember that choice in sessionStorage
// so the REST of that same session consistently reuses it — repeat clicks
// from one visitor never bounce between numbers mid-conversation. This also
// satisfies the "no timestamp/second-parity" requirement directly: the only
// randomness source is Math.random(), never Date.now().
function pickNumber(): string {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "0" || stored === "1") return NUMBERS[Number(stored)];

    const index = Math.random() < 0.5 ? 0 : 1;
    sessionStorage.setItem(STORAGE_KEY, String(index));
    return NUMBERS[index];
  } catch {
    // Private browsing / storage disabled: no persistence possible, so every
    // call in this session gets its own random pick rather than erroring out.
    return NUMBERS[Math.random() < 0.5 ? 0 : 1];
  }
}

export function openWhatsApp(message: string): void {
  const number = pickNumber();
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
