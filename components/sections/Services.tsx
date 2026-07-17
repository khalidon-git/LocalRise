import Link from "next/link";
import { services } from "@/lib/data";
import { Icon, type IconName } from "@/components/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

const spanClass: Record<string, string> = {
  websites: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  google: "sm:col-span-2 lg:col-span-2",
  automation: "sm:col-span-2 lg:col-span-2",
};

function IconChip({ name, large }: { name: IconName; large?: boolean }) {
  return (
    <span
      className={cx(
        "grid place-items-center rounded-2xl border border-line bg-white text-accent shadow-xs transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:shadow-glow",
        large ? "h-14 w-14" : "h-12 w-12",
      )}
    >
      <Icon name={name} size={large ? 26 : 22} strokeWidth={1.7} />
    </span>
  );
}

export function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title="Everything your business needs to grow online"
          description="One team for your website, Google presence, WhatsApp, branding and more — explained simply, priced transparently."
        />

        <Stagger className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-flow-dense lg:auto-rows-[minmax(200px,1fr)]">
          {services.map((s) => {
            const isFeature = s.id === "websites";
            return (
              <StaggerItem
                key={s.id}
                className={cx("h-full", spanClass[s.id])}
              >
                <Link
                  href={`/services/${s.id}`}
                  aria-label={`${s.title} — learn more`}
                  className={cx(
                    "card card-hover group relative flex h-full flex-col overflow-hidden p-6 lg:p-7",
                    isFeature && "bg-gradient-to-br from-white to-bg-subtle",
                  )}
                >
                  <IconChip name={s.icon as IconName} large={isFeature} />

                  <div className="mt-5 flex flex-1 flex-col">
                    <h3 className={cx("font-display font-semibold tracking-tight text-ink", isFeature ? "text-2xl" : "text-lg")}>
                      {s.title}
                    </h3>
                    <p className={cx("mt-2 text-ink-2", isFeature ? "text-body max-w-md" : "text-body-sm")}>
                      {s.blurb}
                    </p>

                    {s.points && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {s.points.map((p) => (
                          <li key={p} className="chip !py-1 text-[12px] !text-ink-2">
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto pt-5">
                      <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-accent transition-all duration-300">
                        Learn more
                        <Icon name="arrow-right" size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>

                  {isFeature && (
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
                  )}
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-8 flex justify-center">
          <a
            href="#packages"
            className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-white px-5 py-3 text-body-sm font-medium text-ink shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
          >
            See what&apos;s included in each package
            <Icon name="arrow-right" size={16} strokeWidth={2} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default Services;
