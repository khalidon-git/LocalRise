import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroVideo } from "@/components/illustrations/HeroVideo";

// Page-level intro for /contact — matches how /why-us and /concepts each
// introduce themselves with a centered SectionHeading before their content.
//
// The homepage's shop-to-city video reappears here too, but this page's one
// job is the ContactMethods/ContactForm card right below — so it's the "sm"
// badge variant, not the full split hero: small, quiet, and clearly a brand
// accent rather than something competing with the form for attention.
export function ContactHero() {
  return (
    <div className="flex flex-col items-center gap-6">
      <HeroVideo size="sm" />
      <SectionHeading title="Let's grow your business" description="Free consultation. No obligation." />
    </div>
  );
}

export default ContactHero;
