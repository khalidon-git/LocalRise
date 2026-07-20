export type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
  links?: readonly {
    label: string;
    href: string;
  }[];
};

export const privacyPolicy = {
  title: "Privacy Policy",
  description:
    "How LocalRise handles information shared through WhatsApp, phone, email and the website enquiry form.",
  updated: "20 July 2026",
  sections: [
    {
      heading: "Information you choose to share",
      paragraphs: [
        "LocalRise receives information only when you choose to contact us. This may include your name, business name, phone number, business type and the details of your enquiry.",
        "The website enquiry form does not submit data to a LocalRise server. It prepares a WhatsApp message on your device, and you decide whether to send it.",
      ],
    },
    {
      heading: "Hosting and device data",
      paragraphs: [
        "When you visit the site, Hostinger may process standard request information such as your IP address, browser, requested page and request time to deliver and secure the website. Hostinger controls its own operational log retention under its applicable terms and policies.",
        "The site stores your guided-experience and cookie-consent choices in local storage, and audio state in session storage, so those preferences work across navigation or a reload. You can clear this data through your browser settings.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use enquiry details to understand your requirements, respond to you, prepare a proposal and provide services you request. We do not sell enquiry details or use them for unrelated purposes.",
      ],
    },
    {
      heading: "Communication services",
      paragraphs: [
        "Messages, calls and emails are handled by the communication service you choose, such as WhatsApp, your phone network or your email provider. Those providers process information under their own privacy terms.",
      ],
    },
    {
      heading: "Advertising and Analytics Cookies",
      paragraphs: [
        "With your permission, LocalRise uses the Google Ads global site tag to measure advertising performance and support conversion tracking. The Google tag is not downloaded or configured until you choose Accept in the cookie notice.",
        "Provider: Google. Purpose: advertising measurement and conversion tracking. Google Ads tag ID: AW-18332132948. Google may set or read cookies and process device, browser, IP-address, page-view and advertising interaction information under its own policies.",
        "You can accept or reject optional cookies, and you can change your choice at any time using Cookie preferences in the site footer. Rejecting optional cookies does not prevent you from using the website. Withdrawing consent stops future Google tag loading and measurement on this site and removes recognised first-party Google advertising cookies where the browser permits it; it cannot automatically delete information already transmitted to Google.",
        "WhatsApp, phone and email links open the third-party service you choose. The LocalRise Google Ads tag does not read or store the contents of your WhatsApp messages, phone calls or emails.",
      ],
      links: [
        { label: "Google Privacy Policy", href: "https://policies.google.com/privacy" },
        { label: "How Google uses cookies", href: "https://policies.google.com/technologies/cookies" },
      ],
    },
    {
      heading: "Concept preview images",
      paragraphs: [
        "Some fictional live concept previews load demonstration images from Unsplash. Opening those previews may send standard request information, including your IP address, to Unsplash so it can deliver the image. These images are presentation assets and do not represent LocalRise clients.",
      ],
    },
    {
      heading: "Retention and your choices",
      paragraphs: [
        "We keep enquiry information only as long as reasonably needed to respond, provide agreed services and maintain necessary business records. You can ask us to correct or delete information by emailing help@localrise.in, subject to any record-keeping obligations that apply.",
      ],
    },
  ] satisfies readonly LegalSection[],
} as const;

export const termsOfService = {
  title: "Terms of Service",
  description:
    "General terms for LocalRise consultations, proposals and digital services for businesses in India.",
  updated: "20 July 2026",
  sections: [
    {
      heading: "Scope and proposals",
      paragraphs: [
        "Website information and published starting prices are general guidance. The exact scope, deliverables, timeline, fees and responsibilities for a project are confirmed in a written proposal or message before work begins.",
      ],
    },
    {
      heading: "Client materials and approvals",
      paragraphs: [
        "You are responsible for providing accurate business details and materials you have permission to use. Project timing may depend on receiving content, access and approvals from you.",
      ],
    },
    {
      heading: "Third-party platforms",
      paragraphs: [
        "Services may involve third-party platforms such as domain registrars, hosting providers, WhatsApp, Google or payment providers. Their availability, verification decisions, policies and fees are outside LocalRise's control. We do not guarantee search rankings, platform approval or uninterrupted third-party service.",
      ],
    },
    {
      heading: "Payments and changes",
      paragraphs: [
        "Payment stages, cancellation terms and work outside the agreed scope are set out in the project proposal. We will explain any additional cost and obtain approval before carrying out extra work.",
      ],
    },
    {
      heading: "Concept websites",
      paragraphs: [
        "Businesses shown in the Concepts section are fictional design demonstrations, not completed client projects or evidence of client results.",
      ],
    },
    {
      heading: "Questions",
      paragraphs: [
        "For questions about these terms or a specific proposal, contact help@localrise.in before starting the project.",
      ],
    },
  ] satisfies readonly LegalSection[],
} as const;

export const notFoundPage = {
  eyebrow: "404 — Page not found",
  title: "This page could not be found",
  description:
    "The link may be outdated or the address may be incorrect. You can return home or explore our primary services.",
} as const;
