import { SectionHeading } from "@/components/ui/SectionHeading";

// Page-level intro for /contact — matches how /why-us and /concepts each
// introduce themselves with a centered SectionHeading before their content.
export function ContactHero() {
  return <SectionHeading title="Let's grow your business" description="Free consultation. No obligation." />;
}

export default ContactHero;
