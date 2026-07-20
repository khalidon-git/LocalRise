import { HeroVideo } from "@/components/illustrations/HeroVideo";
import { Reveal } from "@/components/ui/Reveal";

// Page-level intro for /contact — its semantic H1 keeps the visual rhythm used by
// the other centered page introductions.
//
// The homepage's shop-to-city video reappears here too, but this page's one
// job is the ContactMethods/ContactForm card right below — so it's the "sm"
// badge variant, not the full split hero: small, quiet, and clearly a brand
// accent rather than something competing with the form for attention.
export function ContactHero() {
  return (
    <div className="flex flex-col items-center gap-6">
      <HeroVideo size="sm" />
      <div className="mx-auto flex flex-col items-center gap-2 text-center sm:gap-3">
        <Reveal delay={0.05}>
          <h1 className="font-display text-heading-section text-ink">Let&apos;s grow your business</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-prose text-body-sm text-ink-2 sm:text-body-lg">
            Free consultation. No obligation.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export default ContactHero;
