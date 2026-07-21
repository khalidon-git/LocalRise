// Reusable long-form "More Info" sections for /services/<id>/ detail pages.
// Presentational only — content comes from serviceGuides.ts. Each renders a full
// <section> so the page just lists them; a `muted` prop toggles the subtle
// background so pages can alternate rhythm without every section looking alike.
// Server components (they only import the client Reveal/Stagger helpers).

import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";
import type { ServiceGuide } from "@/lib/content";

function sectionClass(muted?: boolean) {
  return cx("section-pad", muted && "bg-bg-subtle");
}

// 1. The business problem — a short story that sets up the need.
export function ServiceProblem({
  problem,
  muted,
}: {
  problem: ServiceGuide["problem"];
  muted?: boolean;
}) {
  return (
    <section className={sectionClass(muted)}>
      <div className="container-x max-w-3xl">
        <Reveal>
          <p className="text-label font-semibold uppercase tracking-[0.16em] text-accent">
            The real situation
          </p>
          <h2 className="mt-3 font-display text-heading-2 font-semibold text-ink">
            {problem.title}
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-4">
          {problem.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 + i * 0.05}>
              <p className="max-w-reading text-body-lg text-ink-2">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 2. What this service actually does — plain-language explanation.
export function ServiceWhatItDoes({
  whatItDoes,
  muted,
}: {
  whatItDoes: ServiceGuide["whatItDoes"];
  muted?: boolean;
}) {
  return (
    <section className={sectionClass(muted)}>
      <div className="container-x max-w-3xl">
        <SectionHeading title={whatItDoes.title} align="left" />
        <div className="mt-6 flex flex-col gap-4">
          {whatItDoes.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 + i * 0.05}>
              <p className="max-w-reading text-body-lg text-ink-2">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3. Business benefits — "so what?" outcome cards.
export function ServiceBenefits({
  benefits,
  serviceTitle,
  muted,
}: {
  benefits: ServiceGuide["benefits"];
  serviceTitle: string;
  muted?: boolean;
}) {
  return (
    <section className={sectionClass(muted)}>
      <div className="container-x">
        <SectionHeading
          title={`What ${serviceTitle} does for your business`}
          description="Har point ka ek hi jawab — isse aapke business ko kya fayda hoga."
        />
        <Stagger className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <div className="card card-hover h-full p-5 sm:p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white text-accent shadow-xs">
                  <Icon name={b.icon} size={22} strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-body-sm text-ink-2">{b.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// 4. What's included — grouped, plus the scope note (+ optional service note).
export function ServiceInclusions({
  groups,
  scopeNote,
  note,
  muted,
}: {
  groups: ServiceGuide["inclusionGroups"];
  scopeNote: string;
  note?: string;
  muted?: boolean;
}) {
  return (
    <section className={sectionClass(muted)}>
      <div className="container-x">
        <SectionHeading
          title="What's included"
          description="Aapke plan mein ye cheezein aati hain, groups mein — taaki ek badi list na lage."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:mt-12 sm:grid-cols-2">
          {groups.map((g) => (
            <Reveal key={g.title}>
              <div className="card h-full p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent">
                    <Icon name={g.icon} size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {g.title}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-body-sm text-ink">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                        <Icon name="check" size={12} strokeWidth={2.6} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-4xl text-body-sm text-ink-3">{scopeNote}</p>
        {note && (
          <p className="mx-auto mt-4 flex max-w-4xl items-start gap-2.5 rounded-xl border border-line-2 bg-white p-4 text-body-sm text-ink-2">
            <Icon name="shield" size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-accent" />
            <span>{note}</span>
          </p>
        )}
      </div>
    </section>
  );
}

// 5. What's not included / depends on others — honest, trust-building.
export function ServiceExpectations({
  notIncluded,
  muted,
}: {
  notIncluded: ServiceGuide["notIncluded"];
  muted?: boolean;
}) {
  return (
    <section className={sectionClass(muted)}>
      <div className="container-x max-w-3xl">
        <SectionHeading
          title="What's not included, or depends on others"
          description="Hum shuruaat se saaf rehte hain — taaki koi surprise na ho."
          align="left"
        />
        <ul className="mt-8 flex flex-col gap-3">
          {notIncluded.map((it) => (
            <Reveal key={it} as="li">
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-xs">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg-muted text-ink-3">
                  <Icon name="minus" size={14} strokeWidth={2.4} />
                </span>
                <span className="text-body-sm text-ink-2">{it}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

// 6. Who this service is for — fits, plus an honest "maybe not yet".
export function ServiceWhoFor({
  whoFor,
  muted,
}: {
  whoFor: ServiceGuide["whoFor"];
  muted?: boolean;
}) {
  return (
    <section className={sectionClass(muted)}>
      <div className="container-x grid gap-8 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <h2 className="font-display text-heading-2 font-semibold text-ink">
            Who this is for
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {whoFor.fits.map((f) => (
              <li key={f} className="flex items-start gap-3 text-body text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                  <Icon name="check" size={12} strokeWidth={2.6} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-line-2 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-bg-muted text-ink-2">
                <Icon name="clock" size={20} strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                Shayad abhi nahi, agar…
              </h3>
            </div>
            <p className="mt-4 text-body text-ink-2">{whoFor.notYet}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// 7. How the process works — simple numbered steps.
export function ServiceProcess({
  steps,
  muted,
}: {
  steps: ServiceGuide["process"];
  muted?: boolean;
}) {
  return (
    <section className={sectionClass(muted)}>
      <div className="container-x">
        <SectionHeading
          title="How it works, step by step"
          description="Koi technical jhanjhat nahi — bas ek saaf, aasaan process."
        />
        <ol className="mx-auto mt-10 grid max-w-4xl gap-4 sm:mt-12 sm:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 0.04}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-xs">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-body-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-body-sm text-ink-2">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// 8. What the customer needs to provide + timeline expectations.
export function ServiceRequirementsTimeline({
  requirements,
  timeline,
  delivery,
  muted,
}: {
  requirements: ServiceGuide["requirements"];
  timeline: ServiceGuide["timeline"];
  delivery: string;
  muted?: boolean;
}) {
  return (
    <section className={sectionClass(muted)}>
      <div className="container-x grid gap-8 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <h2 className="font-display text-heading-2 font-semibold text-ink">
            What you&apos;ll need to share
          </h2>
          <p className="mt-3 max-w-prose text-body-sm text-ink-2">
            Sirf itni jaankari — koi sensitive password ya document yahan nahi
            maanga jaata; woh hum aapse surakshit tareeke se lete hain.
          </p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-body-sm text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                  <Icon name="check" size={12} strokeWidth={2.6} />
                </span>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-line-2 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent">
                <Icon name="calendar" size={22} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-body-sm text-ink-3">Typical timeline</p>
                <p className="font-display text-heading-3 font-semibold text-ink">{delivery}</p>
              </div>
            </div>
            <p className="mt-5 text-body-sm text-ink-2">{timeline.text}</p>
            <p className="mt-5 text-label font-semibold uppercase tracking-[0.14em] text-ink-3">
              Yeh timing ko affect kar sakta hai
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {timeline.factors.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-body-sm text-ink-2">
                  <Icon name="clock" size={15} strokeWidth={1.8} className="mt-0.5 shrink-0 text-ink-3" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// 9. Realistic results — honest "can improve" vs "can't guarantee".
export function ServiceResults({
  results,
  muted,
}: {
  results: ServiceGuide["results"];
  muted?: boolean;
}) {
  return (
    <section className={sectionClass(muted)}>
      <div className="container-x">
        <SectionHeading
          title="What to realistically expect"
          description="Hum wahi bataate hain jo sach mein hota hai — na zyada, na kam."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:mt-12 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-tint text-accent">
                  <Icon name="check" size={16} strokeWidth={2.4} />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  Yeh behtar ho sakta hai
                </h3>
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {results.can.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-body-sm text-ink-2">
                    <Icon name="spark" size={15} className="mt-0.5 shrink-0 text-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-line-2 bg-bg-subtle p-6">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg-muted text-ink-3">
                  <Icon name="shield" size={16} strokeWidth={1.9} />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  Iski guarantee nahi
                </h3>
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {results.cannot.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-body-sm text-ink-2">
                    <Icon name="minus" size={15} strokeWidth={2.2} className="mt-0.5 shrink-0 text-ink-3" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
