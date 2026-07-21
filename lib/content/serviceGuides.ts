// Extended "More Info" content for each /services/<id>/ detail page.
// This LAYERS ON TOP of serviceDetails (services.ts) — hero, price, package and
// related links still come from serviceDetails; the long-form educational
// sections below come from here. Kept in its own file so services.ts stays the
// small, stable source of truth for prices/timelines/included lists.
//
// HONESTY RULES (knowledge/decisions/004): no invented deliverables, guarantees,
// results, timelines or prices. Every `delivery` string mirrors the verified
// value in `individualServices`; every inclusion group only regroups/explains
// the verified `serviceDetails[id].included` items — it never adds new ones.
// Copy is written in natural Hinglish for non-technical Indian business owners.

import type { IconName } from "@/components/ui/Icon";

export type GuideStep = { title: string; text: string };
export type InclusionGroup = { title: string; icon: IconName; items: string[] };

export type ServiceGuide = {
  /** Verified timeline — mirrors `individualServices[].delivery`. */
  delivery: string;
  /** The real situation that makes an owner need this service (a short story). */
  problem: { title: string; paragraphs: string[] };
  /** Plain-language explanation of what the service actually is. */
  whatItDoes: { title: string; paragraphs: string[] };
  /** 4–6 "so what?" outcomes, service-specific. */
  benefits: { icon: IconName; title: string; text: string }[];
  /** Verified deliverables, grouped — never adds items beyond `included`. */
  inclusionGroups: InclusionGroup[];
  /** Honest "not included / depends on others" points. */
  notIncluded: string[];
  /** Who it fits, and when it may not be the right first step. */
  whoFor: { fits: string[]; notYet: string };
  /** Simple, non-technical steps. */
  process: GuideStep[];
  /** What the customer needs to provide. */
  requirements: string[];
  /** Timeline note + what can move the date. */
  timeline: { text: string; factors: string[] };
  /** Honest expectations: what it can improve vs what it can't guarantee. */
  results: { can: string[]; cannot: string[] };
  /** 8–12 service-specific FAQs (separate from the shared homepage `faqs`). */
  faqs: { q: string; a: string }[];
  /** When true, the page shows a link to /website-guide/. */
  linkWebsiteGuide?: boolean;
};

export const serviceGuides: Record<string, ServiceGuide> = {
  // -------------------------------------------------------------------------
  websites: {
    delivery: "3–5 days",
    linkWebsiteGuide: true,
    problem: {
      title: "Aaj customer pehle online dekhta hai, phir baat karta hai",
      paragraphs: [
        "Socho ek customer ko aapke type ka business chahiye. Woh Google par search karta hai, do-teen naam dekhta hai, aur jiska information saaf aur bharosa-laayak lagta hai, usi ko call ya WhatsApp karta hai. Yeh decision aksar 30 second mein ho jaata hai — aapse baat karne se pehle.",
        "Bahut se acche businesses sirf isliye peeche reh jaate hain kyunki online unki koi professional pehchaan nahi hai. Sirf ek Instagram page ya WhatsApp number kaafi nahi lagta — customer ko lagta hai ki business chhota ya adhoora hai, chahe kaam aapka kitna bhi accha ho.",
        "Ek professional website is gap ko bharti hai. Yeh aapke business ko wahi bharosa aur seriousness deti hai jo ek customer purchase ya enquiry se pehle dhoondta hai.",
      ],
    },
    whatItDoes: {
      title: "Yeh service asal mein kya karti hai",
      paragraphs: [
        "Business Website aapke business ka online ghar hai — ek jagah jahan aapki saari zaroori information ek saaf, professional tareeke se rehti hai. Customer yahan aakar samajh jaata hai ki aap kaun hain, kya karte hain, kahan hain aur aapse kaise baat karni hai.",
        "LocalRise aapke liye yeh website design karke, mobile par sahi dikhne layak banakar, aur call aur WhatsApp buttons ke saath ready karke deta hai. Aapko koi technical cheez seekhne ki zaroorat nahi — aap sirf apne business ki jaankari aur kuch photos dete hain, baaki hum sambhalte hain.",
        "Kaam ke baad, jab bhi koi aapka business online dekhta hai, use ek bharosa-laayak, tayaar business dikhta hai — na ki ek adhoora page.",
      ],
    },
    benefits: [
      { icon: "shield", title: "Pehli nazar mein bharosa", text: "Customer aapki website dekhkar hi decide kar leta hai ki aap serious business ho — call karne se pehle hi." },
      { icon: "phone", title: "Mobile par perfect", text: "Zyadatar customer phone par dekhte hain. Aapki website mobile, tablet aur computer — teeno par sahi dikhegi." },
      { icon: "chat", title: "Ek tap mein contact", text: "Har page par call aur WhatsApp button — customer ko aap tak pahunchne mein ek second lagega." },
      { icon: "clock", title: "24 ghante available", text: "Aapki dukaan band ho tab bhi website customer ko information aur contact ka rasta deti rehti hai." },
      { icon: "pin", title: "Location aur directions", text: "Google Maps se customer seedha aapke darwaze tak pahunch sakta hai — bina poochhe." },
    ],
    inclusionGroups: [
      { title: "Design aur presentation", icon: "browser", items: ["Custom mobile-first design", "Aapke business ke hisaab se layout"] },
      { title: "Customer contact", icon: "chat", items: ["WhatsApp & call buttons", "Enquiry / contact form", "Google Maps location"] },
      { title: "Launch aur setup", icon: "shield", items: ["Free SSL & hosting setup"] },
    ],
    notIncluded: [
      "Domain naam (jaise yourbusiness.com) ki yearly fees — hum aapko saaf-saaf bata denge agar iska alag kharcha hai.",
      "Har mahine naya content ya blog likhna — jab tak alag se tay na ho.",
      "Product ya business ki professional photography — aap photos dete hain, ya hum guide karte hain.",
      "Google par top ranking ki guarantee — yeh Google decide karta hai, koi bhi agency guarantee nahi de sakti.",
      "Nayi jaankari ka content aapse aata hai — hum use sundar tareeke se present karte hain.",
    ],
    whoFor: {
      fits: [
        "Doctor, clinic ya coaching jinhe credibility chahiye",
        "Builder, showroom ya manufacturer jinke paas dikhane layak kaam hai",
        "Restaurant, salon ya local service jise aasaan contact chahiye",
        "Koi bhi business jo abhi sirf social media ya word-of-mouth par nirbhar hai",
      ],
      notYet: "Agar aapke paas abhi apni services, offer ya business ki basic jaankari clear nahi hai, to pehle unhe organise karna behtar hai — website unhi ko professional tareeke se dikhati hai.",
    },
    process: [
      { title: "Business samajhna", text: "Ek chhoti baat-cheet mein hum aapka business, customer aur zaroorat samajhte hain." },
      { title: "Jaankari lena", text: "Aap apna business naam, services, photos aur contact details share karte hain." },
      { title: "Design tayaar karna", text: "Hum aapke business ke hisaab se ek saaf, mobile-first design banate hain." },
      { title: "Saath mein review", text: "Aap design dekhte hain, aur zaroori badlaav bataate hain." },
      { title: "Launch aur handover", text: "Website live hoti hai, SSL aur hosting set hoti hai, aur hum aapko sab samjha dete hain." },
      { title: "Aage ka rasta", text: "Baad mein badlaav, nayi pages ya store — jab business badhe tab jodh sakte hain." },
    ],
    requirements: [
      "Business ka naam aur logo (agar hai)",
      "Phone number aur WhatsApp number",
      "Business ka address (agar customer aate hain)",
      "Aapki services ya products ki list",
      "Kuch acchi photos (kaam, dukaan, team)",
      "Working hours",
    ],
    timeline: {
      text: "Zyadatar business websites 3–5 din mein tayaar ho jaati hain. Exact date hum kaam shuru karne se pehle tay karte hain.",
      factors: [
        "Aap kitni jaldi jaankari aur photos dete hain",
        "Review par aapke feedback ka time",
        "Kitne pages ya kitni services dikhani hain",
      ],
    },
    results: {
      can: [
        "Aapka business online zyada professional aur bharosa-laayak dikhta hai",
        "Customer ke liye aapse contact karna aasaan ho jaata hai",
        "Enquiry aur calls ki process behtar ho sakti hai",
      ],
      cannot: [
        "Kitne customer ya kitni sales aayengi, iski guarantee nahi",
        "Google par pehle number par aana — yeh Google decide karta hai",
      ],
    },
    faqs: [
      { q: "Kya mujhe website chalane ke liye technical knowledge chahiye?", a: "Bilkul nahi. Yeh hamara kaam hai. Aap sirf apne business ki jaankari aur photos dete hain — website, hosting aur setup hum sambhalte hain." },
      { q: "Sirf Instagram ya WhatsApp kaafi nahi hai kya?", a: "Woh customer se baat karne ke liye acche hain, lekin unpar aap sirf visibility rent karte hain. Apni website par aap apni digital pehchaan build karte hain — jahan poori jaankari, aapke control mein rehti hai. Dono saath mein sabse accha kaam karte hain." },
      { q: "Website mobile par sahi dikhegi?", a: "Haan. Design mobile-first hota hai, matlab pehle phone ke liye banaya jaata hai — kyunki zyadatar local customer phone par hi dekhte hain — aur phir tablet aur computer par bhi sahi dikhta hai." },
      { q: "Kya website banne ke baad customer aana pakka hai?", a: "Website customer ke bharosa aur contact ki process ko behtar karti hai, lekin kitne customer aayenge iski guarantee nahi de sakti. Yeh aapke business, offer aur baaki marketing par bhi depend karta hai." },
      { q: "Domain aur hosting ka kharcha isme hai?", a: "Setup hum karte hain, aur SSL aur hosting ka basic setup included hai. Domain naam (jaise yourbusiness.com) ki yearly fees agar alag hoti hai to hum aapko pehle hi saaf bata denge." },
      { q: "Baad mein badlaav kar sakte hain?", a: "Haan. Chhote badlaav aasaani se hote hain, aur jab business badhe to nayi pages, store ya booking bhi jodh sakte hain." },
      { q: "Meri poori jaankari kaun likhega?", a: "Nayi jaankari aur services aapse aati hain, kyunki aap apne business ko sabse acche jaante hain. Hum use saaf, professional tareeke se present karte hain." },
      { q: "Kitne din mein taiyaar hogi?", a: "Zyadatar websites 3–5 din mein. Exact date kaam shuru karne se pehle tay hoti hai, aur woh aapke content dene ki speed par bhi depend karti hai." },
      { q: "Kya website Google par aayegi?", a: "Hum website ko is tarah banate hain ki search engines use samajh saken, lekin Google ki ranking Google decide karta hai — koi agency top position ki guarantee nahi de sakti." },
      { q: "Main dusre sheher mein hoon, kya problem hai?", a: "Bilkul nahi. Hum poore India mein local businesses ke saath call aur WhatsApp par kaam karte hain. Doori kabhi rukawat nahi." },
    ],
  },

  // -------------------------------------------------------------------------
  google: {
    delivery: "2 days",
    problem: {
      title: "Log Google par aapko dhoondte hain — kya aap milte ho?",
      paragraphs: [
        "Jab kisi ko aas-paas koi service chahiye hoti hai, woh Google par likhta hai — jaise 'clinic near me' ya 'best cake shop'. Google Maps aur search par jo businesses upar dikhte hain, wahin par sabse zyada calls aur walk-ins jaate hain.",
        "Agar aapka business Google par nahi hai, ya jaankari purani ya adhoori hai — galat timing, purana number, koi photo nahi — to customer bharosa nahi karta aur agle business par chala jaata hai.",
        "Google Business Profile woh free listing hai jo aapko Google Search aur Maps par dikhati hai. Sahi setup ke saath, aas-paas ke customer aapko aasaani se dhoondh sakte hain, directions le sakte hain aur ek tap mein call kar sakte hain.",
      ],
    },
    whatItDoes: {
      title: "Yeh service asal mein kya karti hai",
      paragraphs: [
        "Google Business Profile aapke business ka woh card hai jo Google Search aur Google Maps par dikhta hai — naam, category, timing, photos, reviews aur call/directions button ke saath.",
        "LocalRise aapki profile sahi jaankari, sahi category, acchi photos aur reviews collect karne ke link ke saath set karke deta hai, taaki customer ko sab kuch saaf mile. Profile ki verification Google khud karta hai — hum use sahi tareeke se ready karte hain.",
        "Kaam ke baad, jab koi aas-paas aapke type ka business dhoondta hai, to aapka business ek complete, bharosa-laayak listing ke roop mein dikhta hai.",
      ],
    },
    benefits: [
      { icon: "map", title: "Maps par dikhna", text: "Jab aas-paas ke log aapki service search karte hain, aap Google Maps aur local results mein dikhte hain." },
      { icon: "pin", title: "Seedha directions", text: "Customer ek tap mein aapke darwaze tak ka rasta dekh leta hai." },
      { icon: "phone", title: "Zyada calls", text: "Listing ke andar hi ek bada call button — customer bina website khole call kar sakta hai." },
      { icon: "star", title: "Reviews se bharosa", text: "Aapke ratings aur photos dekhkar log confidence ke saath aapko chunte hain." },
      { icon: "camera", title: "Sahi pehli tasveer", text: "Achhi photos aur sahi timing customer ko ek professional, khula-hua business dikhati hain." },
    ],
    inclusionGroups: [
      { title: "Profile setup", icon: "map", items: ["Profile setup guidance", "Category & keyword tuning"] },
      { title: "Business jaankari", icon: "camera", items: ["Photos & business hours"] },
      { title: "Updates aur reviews", icon: "star", items: ["Google Posts setup", "Review link to collect ratings"] },
    ],
    notIncluded: [
      "Google ki verification aur approval — yeh Google control karta hai, hum sirf sahi tareeke se ready karte hain.",
      "Local search mein top rank par aane ki guarantee — Google apne rules se decide karta hai.",
      "Fake reviews ya khareede hue ratings — hum sirf genuine reviews collect karne mein madad karte hain.",
      "Har hafte nayi photos ya posts — jab tak ongoing plan alag se tay na ho.",
      "Physical business address ya verification postcard, jo Google bhej sakta hai — woh aapke paas aata hai.",
    ],
    whoFor: {
      fits: [
        "Clinic, salon, restaurant — jinke paas customer aate hain",
        "Local service (plumber, tutor, electrician) jinhe aas-paas ke customer chahiye",
        "Showroom ya shop jise walk-ins chahiye",
        "Koi bhi business jo abhi Google par nahi dikhta ya adhoora dikhta hai",
      ],
      notYet: "Agar aapka business poori tarah online (bina physical location) chalta hai aur aas-paas ke customer aapki priority nahi, to Google Profile ka fayda kam hoga.",
    },
    process: [
      { title: "Business samajhna", text: "Hum aapki category, service area aur customer samajhte hain." },
      { title: "Jaankari lena", text: "Aap naam, address, timing, phone aur photos dete hain." },
      { title: "Profile taiyaar karna", text: "Hum sahi category, keywords aur jaankari ke saath profile set karte hain." },
      { title: "Verification ready karna", text: "Hum profile ko Google ki verification ke liye taiyaar karte hain — approval Google karta hai." },
      { title: "Reviews aur posts", text: "Review collect karne ka link aur pehle posts set karte hain." },
      { title: "Handover", text: "Hum aapko samjha dete hain ki aage photos aur posts kaise update karni hain." },
    ],
    requirements: [
      "Business ka naam aur category",
      "Poora address (agar customer aate hain)",
      "Phone number aur working hours",
      "Business ki achhi photos (aage, andar, kaam)",
      "Website link (agar hai)",
      "Google account access ya nayi Google ID banane ki sehmati",
    ],
    timeline: {
      text: "Profile ka setup aksar 2 din mein ho jaata hai. Lekin Google ki verification apna alag time leti hai, jo Google ke haath mein hai.",
      factors: [
        "Google verification postcard ya call ka time",
        "Aap kitni jaldi photos aur jaankari dete hain",
        "Kya business pehle se kisi profile par claim hai",
      ],
    },
    results: {
      can: [
        "Aas-paas ke customer aapko Google par aasaani se dhoondh sakte hain",
        "Sahi jaankari aur photos se bharosa badhta hai",
        "Directions aur calls ki process aasaan ho jaati hai",
      ],
      cannot: [
        "Local results mein pehle number par aana — yeh Google decide karta hai",
        "Kitne customer aayenge iski guarantee nahi",
        "Google verification ka time hum control nahi karte",
      ],
    },
    faqs: [
      { q: "Google Business Profile ka kya matlab hai?", a: "Yeh woh free listing hai jo aapke business ko Google Search aur Google Maps par dikhati hai — naam, timing, photos, reviews aur call/directions button ke saath." },
      { q: "Kya isse mera business Google par number 1 aa jaayega?", a: "Nahi, koi bhi agency top ranking ki guarantee nahi de sakti. Hum profile ko sahi aur complete banate hain taaki aapke dikhne aur chune jaane ke chances behtar hon — lekin final ranking Google decide karta hai." },
      { q: "Verification kitna time lega?", a: "Setup 2 din mein ho jaata hai, lekin verification Google apne tareeke se karta hai (kabhi postcard, kabhi call ya video se) aur uska time Google ke haath mein hai." },
      { q: "Mujhe reviews kaise milenge?", a: "Hum ek review collect karne ka link set karte hain jo aap khush customers ko bhej sakte hain. Reviews hamesha genuine hone chahiye — fake reviews Google ke rules ke khilaaf hain aur hum unhe kabhi nahi karte." },
      { q: "Kya mujhe apna Google account dena hoga?", a: "Profile aapke apne Google account par honi chahiye taaki control aapke paas rahe. Hum aapke saath milkar set karte hain — aap koi password kisi ke saath share kiye bina bhi access de sakte hain." },
      { q: "Agar meri profile pehle se bani hai to?", a: "Koi baat nahi. Hum us existing profile ko sahi jaankari, category aur photos ke saath improve kar dete hain." },
      { q: "Kya negative review aane par kuch kar sakte hain?", a: "Fake ya rules ke khilaaf review Google ko report kiya jaa sakta hai. Genuine feedback ka professional jawab dena behtar hota hai — isse naye customer ko lagta hai ki aap responsible ho." },
      { q: "Isme photos kaun deta hai?", a: "Achhi photos aap dete hain (dukaan, kaam, team). Agar aapke paas nahi hain, to hum guide karte hain ki kis type ki photos sabse acchi lagti hain." },
      { q: "Kya yeh website ki jagah le leta hai?", a: "Nahi. Google Profile customer ko dhoondhne mein madad karti hai; website aapki poori pehchaan aur jaankari deti hai. Dono ek doosre ke saath sabse accha kaam karte hain." },
    ],
  },

  // -------------------------------------------------------------------------
  whatsapp: {
    delivery: "1 day",
    problem: {
      title: "Customer baat karna chahta hai — form nahi bharna",
      paragraphs: [
        "India mein zyadatar log business se baat karna WhatsApp par pasand karte hain — call se aasaan, email se jaldi. Lekin jab customer aapke personal number par message karta hai, to use na aapka business naam dikhta hai, na timing, na yeh bharosa ki yeh sahi jagah hai.",
        "Aur jab aap busy hote hain, to bahut se messages ka jawab der se milta hai — ya reh jaata hai. Har missed message ek missed customer ho sakta hai.",
        "WhatsApp Business setup isi ko theek karta hai — ek professional business profile, saaf jaankari aur quick replies, taaki customer ko turant sahi jawab mile.",
      ],
    },
    whatItDoes: {
      title: "Yeh service asal mein kya karti hai",
      paragraphs: [
        "WhatsApp Business ek alag, free app hai jo khaaskar businesses ke liye banaya gaya hai. Isme aapka business naam, timing, address aur ek chhota catalogue dikhta hai — personal WhatsApp se zyada professional.",
        "LocalRise aapke liye yeh business profile set karke, greeting message aur common sawaalon ke quick replies ready karke deta hai, aur aapki website ya Google listing par 'click-to-chat' button lagata hai — taaki customer ek tap mein baat shuru kar sake.",
        "Kaam ke baad, aapki har WhatsApp baat-cheet ek professional business jaisi lagti hai, aur aap common jawab bina baar-baar type kiye de paate hain.",
      ],
    },
    benefits: [
      { icon: "whatsapp", title: "Ek tap mein baat", text: "Website aur Google listing par WhatsApp button — customer bina number save kiye seedha message karta hai." },
      { icon: "chat", title: "Professional dikhna", text: "Business naam, timing aur catalogue ke saath aapki profile bharosa-laayak lagti hai." },
      { icon: "bolt", title: "Quick replies", text: "Common sawaalon ke ready jawab — ek tap mein bhejo, baar-baar type mat karo." },
      { icon: "clock", title: "Kam missed messages", text: "Auto-greeting customer ko batati hai ki aap unka message dekhenge — off-hours mein bhi." },
      { icon: "list", title: "Sab ek jagah", text: "Enquiries ek professional inbox mein — personal chats se alag, dhoondhne mein aasaan." },
    ],
    inclusionGroups: [
      { title: "Profile setup", icon: "whatsapp", items: ["WhatsApp Business profile", "Product / service catalogue"] },
      { title: "Automatic messages", icon: "bolt", items: ["Quick replies & greeting"] },
      { title: "Website se jodna", icon: "chat", items: ["Click-to-chat buttons"] },
    ],
    notIncluded: [
      "Aapke customers ki ready-made list — messages aapke apne customers se aate hain, hum koi contact list nahi dete.",
      "Mass marketing ya bulk promotional messages — yeh WhatsApp ke rules ke khilaaf ho sakta hai aur included nahi.",
      "Naye customer aana — setup baat-cheet aasaan banata hai, lekin leads nahi laata.",
      "Catalogue tabhi banega jab aapke paas dikhane layak products ya services ki jaankari ready ho.",
      "Har roz manually chat ka jawab dena — quick replies madad karti hain, lekin insaani jawab aapka hi hoga.",
    ],
    whoFor: {
      fits: [
        "Business jo aksar WhatsApp par order ya enquiry lete hain",
        "Salon, clinic, tutor — jahan customer pehle poochta hai",
        "Shop ya boutique jo products WhatsApp par dikhati hai",
        "Koi bhi jo abhi personal number par business chala raha hai",
      ],
      notYet: "Agar aapka customer sirf phone call se aata hai aur WhatsApp use nahi karta, to iska fayda kam hoga — pehle dekhein aapke customer kaise baat karte hain.",
    },
    process: [
      { title: "Zaroorat samajhna", text: "Hum dekhte hain aapke customer kaise baat karte hain aur kya poochte hain." },
      { title: "Profile set karna", text: "Business naam, timing, address aur profile photo ke saath business profile banate hain." },
      { title: "Catalogue banana", text: "Agar aap products/services dikhana chahte hain, to ready jaankari se catalogue set karte hain." },
      { title: "Auto-messages ready karna", text: "Greeting aur common sawaalon ke quick replies likhte hain." },
      { title: "Website se jodna", text: "Aapki website aur Google listing par click-to-chat button lagate hain." },
      { title: "Handover", text: "Hum aapko samjha dete hain ki quick replies aur catalogue kaise update karne hain." },
    ],
    requirements: [
      "Ek phone number (business ke liye — chahe naya ho)",
      "Business naam, timing aur address",
      "Business ki profile photo ya logo",
      "Common sawaal aur unke jawab (jaise price, timing)",
      "Products ya services ki list (agar catalogue chahiye)",
    ],
    timeline: {
      text: "WhatsApp Business setup aksar 1 din mein ho jaata hai, agar aapki jaankari ready ho.",
      factors: [
        "Number verification ka time (WhatsApp ka OTP)",
        "Catalogue mein kitne products dikhane hain",
        "Quick replies ke liye jaankari kitni jaldi milti hai",
      ],
    },
    results: {
      can: [
        "Customer ke liye aapse baat shuru karna aasaan ho jaata hai",
        "Aap common sawaalon ka jawab tezi se de paate hain",
        "Enquiries ek jagah organise rehti hain",
      ],
      cannot: [
        "Naye customer aane ki guarantee nahi — setup baat-cheet aasaan banata hai, leads nahi laata",
        "Har message ka insaani jawab automatic nahi hota — woh aapka hi hoga",
      ],
    },
    faqs: [
      { q: "WhatsApp Business aur normal WhatsApp mein kya farak hai?", a: "WhatsApp Business ek alag free app hai jisme business naam, timing, address, catalogue aur quick replies jaise features hote hain — personal WhatsApp se zyada professional aur organised." },
      { q: "Kya mujhe naya number lena padega?", a: "Zaroori nahi. Aap koi bhi number use kar sakte hain, lekin ek alag business number rakhna behtar hota hai taaki personal aur business chats alag rahein." },
      { q: "Quick replies ka kya matlab hai?", a: "Yeh common sawaalon ke ready-made jawab hote hain. Jaise koi price poochhe, to aap ek shortcut se poora price message ek tap mein bhej dete hain — baar-baar type kiye bina." },
      { q: "Kya isse mujhe naye customer milenge?", a: "Yeh setup baat-cheet ko aasaan aur professional banata hai, lekin apne aap naye customer nahi laata. Naye customer website, Google ya marketing se aate hain — WhatsApp unse baat aasaan karta hai." },
      { q: "Catalogue mein kya dikhta hai?", a: "Aapke products ya services, unki photo, naam aur price ke saath — taaki customer chat ke andar hi dekh sake ki aap kya offer karte hain. Yeh tabhi banate hain jab aapke paas dikhane layak jaankari ready ho." },
      { q: "Kya aap mere customers ko messages bhejenge?", a: "Nahi. Hum setup karte hain; aapke customers se baat aap karte hain. Bulk ya promotional messages WhatsApp ke rules ke khilaaf ho sakte hain, isliye hum unhe nahi karte." },
      { q: "Auto-reply raat ko bhi kaam karega?", a: "Greeting message customer ko turant batata hai ki aap unka message dekhenge, chahe aap off-hours mein ho. Lekin asal jawab aap hi denge — yeh insaani baat ki jagah nahi leta." },
      { q: "Website par WhatsApp button lagana zaroori hai?", a: "Yeh sabse useful hissa hai — customer aapki website ya Google listing se ek tap mein WhatsApp par baat shuru kar sakta hai, bina number save kiye." },
      { q: "Kya purani chats delete ho jaayengi?", a: "Nahi. Business app par shift karne se aapki jaankari safe rehti hai. Hum poori process aapko samjha kar karte hain." },
    ],
  },

  // -------------------------------------------------------------------------
  store: {
    delivery: "7 days",
    problem: {
      title: "Customer raat ke 11 baje bhi khareedna chahta hai",
      paragraphs: [
        "Aapki dukaan sham ko band ho jaati hai, lekin customer ki khareedne ki ichha 24 ghante rehti hai. Bahut si sales sirf isliye chhoot jaati hain kyunki jab customer ready tha, tab aapse baat nahi ho paayi.",
        "WhatsApp par ek-ek order lena, price batana, stock check karna — yeh sab time leta hai aur galtiyan hoti hain. Jaise-jaise orders badhte hain, yeh manually sambhalna mushkil ho jaata hai.",
        "Ek Online Store customer ko khud products dekhne, chunne aur order dene deta hai — chahe aadhi raat ho ya dopahar. Aap subah utharkar orders dekhte hain, ek-ek message ka jawab dene ke bajaaye.",
      ],
    },
    whatItDoes: {
      title: "Yeh service asal mein kya karti hai",
      paragraphs: [
        "Online Store ek aisi website hai jahan aapke products photo, price aur jaankari ke saath dikhte hain, aur customer khud order de sakta hai aur payment kar sakta hai.",
        "LocalRise aapke liye yeh store set karke, products ko categories mein sajaakar, online payment aur order alerts ke saath ready karke deta hai. Aap products, price aur stock bina kisi technical jaankari ke update kar sakte hain.",
        "Kaam ke baad, aapke paas ek chalu online dukaan hoti hai jo aapke band hone par bhi orders le sakti hai — aur jo customer ke liye khareedna aasaan banati hai.",
      ],
    },
    benefits: [
      { icon: "cart", title: "24 ghante sales", text: "Customer aadhi raat ya dopahar — kabhi bhi order de sakta hai. Aap subah sales dekhte ho." },
      { icon: "tag", title: "Aasaan payment", text: "Customer securely online pay karta hai, aur order ka alert seedha aap tak aata hai." },
      { icon: "whatsapp", title: "WhatsApp checkout", text: "Jise online pay karna mushkil lage, woh WhatsApp par order confirm kar sakta hai." },
      { icon: "list", title: "Khud manage karo", text: "Products, price aur stock aap bina technical madad ke update kar sakte ho." },
      { icon: "clock", title: "Kam manual mehnat", text: "Order khud aate hain — ek-ek WhatsApp message se order lene ki zaroorat kam ho jaati hai." },
    ],
    inclusionGroups: [
      { title: "Products aur catalogue", icon: "cart", items: ["Product catalogue"] },
      { title: "Order aur payment", icon: "tag", items: ["Online payments", "Order notifications", "WhatsApp checkout option"] },
    ],
    notIncluded: [
      "Products ki professional photography — aap photos dete hain, ya hum guide karte hain.",
      "Product ki jaankari, price aur description — yeh aapse aati hai.",
      "Delivery ya courier ki service — store order leta hai; bhejne ka intezaam aapka hota hai.",
      "Payment gateway ki apni transaction fees — yeh payment company leti hai, hum pehle bata dete hain.",
      "Roz stock aur naye products update karna — yeh aapki dukaan chalane ka hissa hai.",
      "Kitni sales hongi iski guarantee nahi.",
    ],
    whoFor: {
      fits: [
        "Shop ya boutique jinke paas dikhane layak products hain",
        "Home business ya D2C jo online bechna chahte hain",
        "Bakery, grocery ya gift shop jo local delivery karte hain",
        "Service business jo bookings ya advance lena chahte hain",
      ],
      notYet: "Agar aapke products, photos ya price abhi ready nahi hain, to pehle unhe organise karna behtar hai — store unhi jaankari par khada hota hai.",
    },
    process: [
      { title: "Business samajhna", text: "Hum aapke products, pricing aur delivery ka tareeka samajhte hain." },
      { title: "Jaankari lena", text: "Aap products, photos, price aur descriptions share karte hain." },
      { title: "Store banana", text: "Hum products ko categories mein sajaate hain aur payment set karte hain." },
      { title: "Saath mein review", text: "Aap store dekhte hain, test order karte hain, aur badlaav bataate hain." },
      { title: "Launch aur handover", text: "Store live hota hai, aur hum aapko orders aur products manage karna sikhate hain." },
      { title: "Aage ka rasta", text: "Baad mein naye products, offers ya delivery options jodh sakte hain." },
    ],
    requirements: [
      "Products ki list, photos aur price",
      "Har product ka chhota description",
      "Delivery ka tareeka (khud, courier ya pickup)",
      "Payment ke liye bank ya UPI details",
      "Return / exchange ki policy (agar hai)",
      "GST jaankari (agar applicable ho)",
    ],
    timeline: {
      text: "Ek simple online store aksar 7 din mein taiyaar hota hai. Zyada products ya complex categories thoda zyada time le sakti hain.",
      factors: [
        "Kitne products aur categories hain",
        "Product photos aur jaankari kitni jaldi milti hai",
        "Payment aur delivery setup ke decisions",
      ],
    },
    results: {
      can: [
        "Customer aapke band hone par bhi order de sakta hai",
        "Order lene ki manual mehnat kam ho jaati hai",
        "Aapke paas ek professional, chalu online dukaan hoti hai",
      ],
      cannot: [
        "Kitni sales hongi iski guarantee nahi",
        "Customer khud aana — iske liye marketing aur offer bhi zaroori hain",
        "Delivery ki zimmedari store nahi uthata — woh aapki hoti hai",
      ],
    },
    faqs: [
      { q: "Online store aur simple website mein kya farak hai?", a: "Website aapke business ki jaankari dikhati hai; online store usme se aage jaakar customer ko products chunne, order dene aur payment karne deta hai — sab khud, bina aapse baat kiye." },
      { q: "Payment kaise aayega?", a: "Customer securely online pay karta hai (UPI, card ya net-banking), aur paisa aapke bank/UPI mein aata hai. Payment company ki apni transaction fees hoti hai, jo hum pehle bata dete hain." },
      { q: "Kya main khud products update kar paunga?", a: "Haan. Store is tarah banaya jaata hai ki aap products, price aur stock bina technical jaankari ke aasaani se update kar sakein." },
      { q: "Delivery kaun karega?", a: "Store order leta hai; product bhejne ka intezaam aap karte hain — chahe khud, courier se, ya customer pickup se. Hum delivery ke options set karne mein madad karte hain." },
      { q: "Agar customer ko online pay karna na aaye?", a: "WhatsApp checkout option se customer order WhatsApp par confirm karke aapke tareeke se pay kar sakta hai — taaki koi sale isliye na chhoote." },
      { q: "Kitne products daal sakte hain?", a: "Aap chaahein utne. Shuru mein hum ek saaf catalogue set karte hain, aur aage aap jitne products chaahein jodh sakte hain." },
      { q: "Kya sales pakki hain?", a: "Nahi. Store khareedna aasaan banata hai, lekin sales aapke products, price, offer aur marketing par depend karti hai. Hum honest rehte hain — koi sales guarantee nahi." },
      { q: "GST ke bina store chala sakte hain?", a: "Chhote local stores kai baar bina GST ke chal jaate hain, lekin yeh aapke business aur products par depend karta hai. Online payment ke liye kabhi GST ya kuch documents zaroori ho sakte hain — hum aapko batate hain." },
      { q: "Order aane par mujhe pata chalega?", a: "Haan. Har naye order ka notification aap tak aata hai, taaki aap turant use taiyaar karke bhej saken." },
    ],
  },

  // -------------------------------------------------------------------------
  logo: {
    delivery: "3 days",
    problem: {
      title: "Aapka business yaad rehta hai ya bhool jaata hai?",
      paragraphs: [
        "Jab customer bahut se businesses dekhta hai, to use woh yaad rehte hain jinki ek saaf, alag pehchaan hoti hai. Bina ek acche logo ke, aapka business bheed mein kho jaata hai — chahe kaam aapka kitna bhi accha ho.",
        "Bahut se choti businesses ek jaldi banaya hua ya alag-alag jagah alag dikhne wala logo use karte hain. Isse customer ko lagta hai ki business ekdum settled nahi hai, aur pehchaan nahi banti.",
        "Ek professional logo aur uske saath aane wale colours aur fonts aapke business ko ek pehchaan dete hain — jise customer dekhte hi pehchaan le, aur jo har jagah ek jaisa dikhe.",
      ],
    },
    whatItDoes: {
      title: "Yeh service asal mein kya karti hai",
      paragraphs: [
        "Logo aapke business ka chehra hai — woh nishaan jise customer aapke naam se jodta hai. Iske saath ek chhota colour aur font system aata hai taaki aap har jagah ek jaisa dikhein.",
        "LocalRise aapko chunne ke liye 3 logo concepts deta hai, phir aapke chune hue design ko poora finish karke saare zaroori files mein deta hai — print, web, colour aur black-and-white versions.",
        "Kaam ke baad aapke paas ek clear, memorable logo aur woh files hoti hain jo aap website, signboard, card aur social media — har jagah use kar sakte hain.",
      ],
    },
    benefits: [
      { icon: "sparkles", title: "Alag dikhna", text: "Ek distinctive logo jo aapko bagal ki dukaan se alag pehchaan deta hai." },
      { icon: "heart", title: "Yaad reh jaana", text: "Ek saaf nishaan jise customer dekhte hi aapke business se jodta hai." },
      { icon: "palette", title: "Har jagah ek jaisa", text: "Colours aur fonts jo website, signage aur social — sab par sahi lagte hain." },
      { icon: "layers", title: "Har file taiyaar", text: "Print, web, colour aur black-and-white — jahan zaroorat ho, wahi file ready milti hai." },
    ],
    inclusionGroups: [
      { title: "Design", icon: "sparkles", items: ["3 logo concepts to choose from", "Colour & font system"] },
      { title: "Files aur formats", icon: "layers", items: ["All file formats"] },
      { title: "Ready-to-use materials", icon: "grid", items: ["Business card design", "Social media templates"] },
    ],
    notIncluded: [
      "Ek poora branding kit (business cards ke alag design, signage files, poora identity guide) — uske liye Branding Kit hai.",
      "Logo ka trademark ya legal registration — yeh alag legal process hai.",
      "Physical printing (cards, boards) — hum print-ready files dete hain; chhapwaana aapke local printer se hota hai.",
      "Anginat revisions ya permanent free support — inka exact scope kaam shuru hone se pehle confirm kiya jaata hai.",
      "Naye logo ke saath poori website ya signage banana — woh alag services hain.",
    ],
    whoFor: {
      fits: [
        "Naya business jo pehchaan banana chahta hai",
        "Purana business jo apna look freshen karna chahta hai",
        "Koi bhi jise ek saaf logo aur basic colours chahiye",
        "Vyapari jinhe card aur social ke liye ek nishaan chahiye",
      ],
      notYet: "Agar aapko sirf logo hi nahi, balki poora coordinated identity (signage, stationery, templates) chahiye, to seedha Branding Kit lena zyada faydemand hai.",
    },
    process: [
      { title: "Business samajhna", text: "Hum aapka business, uski personality aur pasand samajhte hain." },
      { title: "Jaankari lena", text: "Aap naam, tagline (agar hai) aur pasand ke colours/style batate hain." },
      { title: "Concepts banana", text: "Hum 3 alag logo concepts taiyaar karte hain." },
      { title: "Saath mein chunna", text: "Aap ek concept chunte hain, aur zaroori badlaav bataate hain." },
      { title: "Finish karna", text: "Chune hue logo ko poora finish karke colour aur font system tay karte hain." },
      { title: "Handover", text: "Saare files aapko milte hain, aur hum batate hain kaun-si file kahan use karni hai." },
    ],
    requirements: [
      "Business ka exact naam (jaisa dikhana hai)",
      "Tagline ya slogan (agar hai)",
      "Aapki pasand ke colours ya style (agar koi soch hai)",
      "Koi logo ya design jo aapko pasand aaye (reference ke liye)",
      "Business kis type ka hai aur kaun customer hai",
    ],
    timeline: {
      text: "Logo design aksar 3 din mein taiyaar hota hai — 3 concepts, phir chune hue ko finish karna.",
      factors: [
        "Aap kitni jaldi concept chunte aur feedback dete hain",
        "Review par aapke feedback ka time",
        "Business naam ya tagline final hai ya nahi",
      ],
    },
    results: {
      can: [
        "Aapka business zyada professional aur yaad rehne layak dikhta hai",
        "Har jagah — card, website, signboard — ek jaisi pehchaan banti hai",
        "Customer ke saamne ek settled, serious image banti hai",
      ],
      cannot: [
        "Sirf logo se naye customer aane ki guarantee nahi",
        "Yeh poora brand identity nahi — uske liye Branding Kit chahiye",
      ],
    },
    faqs: [
      { q: "Logo aur branding mein kya farak hai?", a: "Logo aapke business ka nishaan hai. Branding uska poora look hai — logo, colours, fonts, cards, signage aur templates — jo har jagah ek jaisa dikhta hai. Logo branding ka ek hissa hai." },
      { q: "Mujhe kitne logo options milenge?", a: "Aapko 3 alag concepts milte hain. Aap unme se ek chunte hain, jise hum aage finish karte hain." },
      { q: "Revisions kitni hain?", a: "Revisions aur support ka exact scope kaam shuru hone se pehle clearly confirm kiya jaata hai. Hum anginat revisions ya permanent free support ka daava nahi karte — sab kuch shuru mein saaf ho jaata hai." },
      { q: "Mujhe kaun-si files milengi?", a: "Aapko saare zaroori formats milte hain — print ke liye, web ke liye, colour aur black-and-white versions — taaki har jagah sahi file use ho." },
      { q: "Kya aap logo print bhi karenge?", a: "Hum print-ready files dete hain. Cards ya boards chhapwaana aapke local printer se hota hai — hum sahi file de dete hain taaki print saaf aaye." },
      { q: "Kya logo trademark ho jaayega?", a: "Nahi. Trademark ek alag legal registration hai. Hum aapko design dete hain; registration aap ek legal advisor ke saath kar sakte hain." },
      { q: "Mujhe design ke baare mein kuch nahi pata, chalega?", a: "Bilkul. Aap sirf apna business aur pasand batate hain. Design ka kaam hamara hai — hum options dikhakar aapke saath chunte hain." },
      { q: "Agar mujhe poora coordinated look chahiye to?", a: "To Branding Kit behtar hai — usme logo ke saath colour system, business cards, social templates aur signage-ready files aati hain, sab ek jaisi." },
      { q: "Purana logo hai, kya use improve kar sakte hain?", a: "Haan, agar aap chaahein to hum aapke purane logo ko dhyaan mein rakhkar ek saaf, behtar version bana sakte hain." },
    ],
  },

  // -------------------------------------------------------------------------
  branding: {
    delivery: "5 days",
    problem: {
      title: "Har jagah alag dikhna bharosa kam karta hai",
      paragraphs: [
        "Kai businesses ke paas logo to hota hai, lekin baaki har cheez alag dikhti hai — card ka colour kuch aur, signboard ka font kuch aur, social media posts kuch aur. Customer ko ek saaf pehchaan nahi banti.",
        "Jab sab kuch ek jaisa dikhta hai — website, card, board, WhatsApp, social — to customer ko lagta hai ki yeh ek settled, professional business hai. Jab sab alag hota hai, to bharosa kam ho jaata hai.",
        "Business Branding Kit sirf logo se aage jaakar ek poora coordinated look deta hai, taaki aap har jagah ek jaise, professional dikhein.",
      ],
    },
    whatItDoes: {
      title: "Yeh service asal mein kya karti hai",
      paragraphs: [
        "Branding Kit aapke business ki poori visual pehchaan hai — logo, ek colour system, business cards, social media templates aur signage-ready files, sab ek doosre se milte-julte.",
        "LocalRise aapke liye yeh saara set ek jaise design mein taiyaar karke deta hai, taaki aapke har customer touchpoint par ek hi look aaye — website se lekar signboard tak.",
        "Kaam ke baad aapke paas ready-to-use materials hote hain jo har jagah ek professional, put-together image banate hain.",
      ],
    },
    benefits: [
      { icon: "sparkles", title: "Ek jaisa look", text: "Logo aur colour system jo har touchpoint ko ek saath baandhta hai." },
      { icon: "layers", title: "Ready materials", text: "Business cards, social templates aur signage-ready files — pehle se taiyaar." },
      { icon: "palette", title: "Har jagah consistency", text: "Wahi pehchaan website, print aur social — sab par." },
      { icon: "shield", title: "Settled image", text: "Ek coordinated look customer ko batata hai ki yeh ek serious, established business hai." },
    ],
    inclusionGroups: [
      { title: "Core identity", icon: "sparkles", items: ["Logo & colour system"] },
      { title: "Print materials", icon: "grid", items: ["Business cards", "Signage-ready files"] },
      { title: "Digital materials", icon: "chat", items: ["Social media templates"] },
    ],
    notIncluded: [
      "Physical printing ya signboard banwaana — hum print-ready files dete hain; chhapwaana aapke printer se hota hai, jab tak alag se tay na ho.",
      "Poori website — woh alag Business Website service hai (kit uske saath achhe se match karti hai).",
      "Har mahine nayi social media posts banana — templates aap khud use kar sakte hain; ongoing content alag hai.",
      "Trademark ya legal brand registration.",
      "Anginat revisions ya permanent free support — inka exact scope kaam shuru hone se pehle confirm kiya jaata hai.",
    ],
    whoFor: {
      fits: [
        "Business jise sirf logo se aage poora look chahiye",
        "Naya venture jo pehle din se professional dikhna chahta hai",
        "Purana business jo apni bikhri hui pehchaan ko ek jaisa karna chahta hai",
        "Jinhe cards, social aur signage — sab ek design mein chahiye",
      ],
      notYet: "Agar aapko sirf ek logo chahiye aur baaki materials abhi zaroorat nahi, to Logo Design zyada seedha aur economical option hai.",
    },
    process: [
      { title: "Business samajhna", text: "Hum aapka business, personality aur customer samajhte hain." },
      { title: "Jaankari lena", text: "Aap naam, pasand ke colours/style aur zaroori materials batate hain." },
      { title: "Identity banana", text: "Logo aur colour system tay karke uspar baaki materials design karte hain." },
      { title: "Saath mein review", text: "Aap poora set dekhte hain aur badlaav bataate hain." },
      { title: "Finish karna", text: "Sab files ko final karke print- aur social-ready banate hain." },
      { title: "Handover", text: "Saare files aapko milte hain, aur hum batate hain kaun-si file kahan use karni hai." },
    ],
    requirements: [
      "Business ka exact naam aur tagline (agar hai)",
      "Purana logo ya koi design (agar hai)",
      "Pasand ke colours ya style ka idea",
      "Business card par kaun-si details chahiye (naam, number, address)",
      "Kin social platforms ke liye templates chahiye",
    ],
    timeline: {
      text: "Ek complete branding kit aksar 5 din mein taiyaar hota hai, kyunki isme logo ke saath kai materials aate hain.",
      factors: [
        "Kitni jaldi jaankari aur feedback milta hai",
        "Kitne materials aur templates chahiye",
        "Review par aapke feedback ka time",
      ],
    },
    results: {
      can: [
        "Aapka business har jagah ek jaisa aur professional dikhta hai",
        "Aapke paas cards, social aur signage ke ready materials hote hain",
        "Customer ke saamne ek coordinated, settled image banti hai",
      ],
      cannot: [
        "Sirf branding se naye customer aane ki guarantee nahi",
        "Physical printing isme shaamil nahi (jab tak alag tay na ho)",
      ],
    },
    faqs: [
      { q: "Branding Kit aur sirf logo mein kya farak hai?", a: "Logo ek nishaan hai. Branding Kit usse aage jaakar poora look deta hai — logo, colour system, business cards, social templates aur signage-ready files — sab ek jaise, taaki aap har jagah consistent dikhein." },
      { q: "Ismein kya-kya milta hai?", a: "Logo aur colour system, business cards, social media templates aur signage-ready files — sab ek design language mein. Yeh saare verified deliverables hain." },
      { q: "Kya aap cards aur signboard print karke denge?", a: "Hum print-ready files dete hain. Actual printing aapke local printer se hoti hai — hum sahi files de dete hain taaki print saaf aaye. Printing alag se tay ho to hum guide kar sakte hain." },
      { q: "Signage-ready files ka kya matlab hai?", a: "Yeh aapke logo aur design ki aisi files hoti hain jo signboard banane wale ko di jaa sakti hain, taaki board saaf aur sahi colours mein bane." },
      { q: "Social media templates ka kya use hai?", a: "Yeh ready-made design hote hain jinme aap apni jaankari daalkar consistent-dikhne wali posts bana sakte hain — bina har baar naya design banaye." },
      { q: "Kya isme website bhi aati hai?", a: "Nahi, website alag service hai. Lekin branding kit website ke saath achhe se match karti hai, taaki online aur offline dono ek jaisa dikhein." },
      { q: "Mujhe pehle logo lena chahiye ya seedha kit?", a: "Agar aage jaakar aapko cards, social aur signage bhi chahiye, to seedha kit lena zyada faydemand hai. Sirf ek nishaan chahiye to Logo Design kaafi hai." },
      { q: "Revisions kitni milengi?", a: "Revisions aur support ka exact scope kaam shuru hone se pehle clearly confirm kiya jaata hai. Hum anginat revisions ya permanent free support ka daava nahi karte — sab kuch shuru mein saaf ho jaata hai." },
      { q: "Purani branding hai, kya use sudhaar sakte hain?", a: "Haan. Hum aapke maujooda logo aur colours ko dhyaan mein rakhkar ek saaf, consistent kit bana sakte hain." },
    ],
  },

  // -------------------------------------------------------------------------
  reviews: {
    delivery: "2 days",
    problem: {
      title: "Naya customer pehle doosron ki raay dekhta hai",
      paragraphs: [
        "Aaj koi bhi kuch khareedne ya kisi service ko chunne se pehle reviews dekhta hai. Do businesses mein se log aksar usi ko chunte hain jiske paas zyada aur acche reviews hote hain — chahe daam thoda zyada ho.",
        "Aapke bahut se khush customer aapse khush hote hain, lekin review chhodte nahi — kyunki koi unhe yaad nahi dilata ya rasta aasaan nahi hota. Isse aapka accha kaam naye customers ko dikhta hi nahi.",
        "Reviews aur Reputation service is process ko aasaan aur organised banati hai — taaki khush customer aasaani se genuine review chhod saken aur woh naye customers ko dikhein.",
      ],
    },
    whatItDoes: {
      title: "Yeh service asal mein kya karti hai",
      paragraphs: [
        "Yeh service aapke khush customers se genuine reviews maangne aur unhe dikhane ka ek saaf tareeka set karti hai — bina kisi customer ko pareshaan kiye, aur bina koi fake review banaye.",
        "LocalRise aapko ek review collect karne ka link aur QR code deta hai, ready-made request messages deta hai, aur aapke best reviews aapki website aur Google rating par dikhata hai.",
        "Kaam ke baad, review maangna aur dikhana ek regular, aasaan aadat ban jaati hai — jisse naye customer ka aap par bharosa badhta hai.",
      ],
    },
    benefits: [
      { icon: "star", title: "Zyada genuine reviews", text: "Ek aasaan link aur QR se khush customer bina jhanjhat review chhod sakta hai." },
      { icon: "shield", title: "Bharosa dikhana", text: "Aapke best reviews website aur Google par dikhte hain, naye customer ke saamne." },
      { icon: "heart", title: "Word of mouth", text: "Santusht customer aapki sabse achhi marketing ban jaata hai." },
      { icon: "chat", title: "Ready messages", text: "Review maangne ke liye ready templates — bas bhejo, sochna nahi padta." },
    ],
    inclusionGroups: [
      { title: "Collect karna", icon: "star", items: ["Review collection link & QR", "Review request templates"] },
      { title: "Dikhana", icon: "shield", items: ["Reviews shown on your site", "Google rating display"] },
    ],
    notIncluded: [
      "Fake ya khareede hue reviews — yeh galat aur platform-rules ke khilaaf hain; hum inhe kabhi nahi karte.",
      "Reviews ki koi tay sankhya ya 5-star rating ki guarantee — reviews customer ki marzi se aate hain.",
      "Purane genuine reviews ko delete karna — genuine feedback hataya nahi jaata.",
      "Har customer ko khud message bhejna — hum system deta hai; bhejna aapke haath mein hai (ya aap chaahein to hum tareeka batate hain).",
      "Google ya platform ke review rules par control — woh platform decide karta hai.",
    ],
    whoFor: {
      fits: [
        "Clinic, salon, restaurant — jinke khush customers hain par reviews kam",
        "Local service jise naye customer ka bharosa jeetna hai",
        "Shop ya showroom jo Google par ratings badhaana chahta hai",
        "Koi bhi jiska kaam accha hai par online proof kam hai",
      ],
      notYet: "Agar aapke paas abhi santusht customers ka base nahi hai, to pehle service experience par dhyaan dena behtar hai — reviews usi ke baad aate hain.",
    },
    process: [
      { title: "Business samajhna", text: "Hum dekhte hain aap kahan reviews chahte hain (Google, website) aur customer kaise judte hain." },
      { title: "Setup karna", text: "Review collect karne ka link aur QR code taiyaar karte hain." },
      { title: "Messages ready karna", text: "Review maangne ke liye polite, ready-made templates banate hain." },
      { title: "Website par dikhana", text: "Aapke best reviews aur Google rating aapki site par dikhate hain." },
      { title: "Handover", text: "Hum samjha dete hain ki review link kab aur kaise customer ko bhejna hai." },
      { title: "Negative feedback", text: "Hum batate hain ki negative review ka professional jawab kaise dena hai." },
    ],
    requirements: [
      "Google Business Profile (agar Google reviews chahiye)",
      "Website (agar reviews wahan dikhani hain)",
      "Aapke khush customers tak pahunchne ka tareeka (WhatsApp, message)",
      "Kis platform par reviews chahiye — Google, website ya dono",
    ],
    timeline: {
      text: "Review system ka setup aksar 2 din mein ho jaata hai. Reviews aana uske baad customer ki marzi aur samay par depend karta hai.",
      factors: [
        "Aap kitni jaldi customers ko link bhejte hain",
        "Kitne customer review chhodne ko taiyaar hote hain",
        "Google Business Profile ready hai ya nahi",
      ],
    },
    results: {
      can: [
        "Review maangna aur collect karna aasaan aur regular ho jaata hai",
        "Aapke best reviews naye customers ko dikhte hain",
        "Naye customer ka aap par bharosa badhta hai",
      ],
      cannot: [
        "Reviews ki tay sankhya ya 5-star rating ki guarantee nahi",
        "Reviews hamesha genuine customer par depend karte hain — banaye nahi jaate",
      ],
    },
    faqs: [
      { q: "Kya aap mere liye reviews likhoge?", a: "Bilkul nahi. Fake reviews likhna ya khareedna galat hai aur platform-rules ke khilaaf. Hum sirf genuine customers se asli reviews maangne aur dikhane ka rasta aasaan banate hain." },
      { q: "Review link aur QR code kaise kaam karta hai?", a: "Aap customer ko ek link ya QR code dete hain; woh use tap ya scan karke seedha review page par pahunchta hai — jisse review chhodna 2 tap ka kaam ban jaata hai." },
      { q: "Kya 5-star rating pakki hai?", a: "Nahi. Rating customer ke experience par depend karti hai. Hum process aasaan banate hain taaki khush customer aasaani se review de saken — lekin koi rating guarantee nahi." },
      { q: "Negative review aaye to kya karein?", a: "Ghabraaye bina professional jawab dena behtar hota hai — isse naye customer ko lagta hai ki aap responsible ho. Fake ya rules-ke-khilaaf review platform ko report kiya jaa sakta hai." },
      { q: "Reviews kahan dikhengi?", a: "Aapke best reviews aapki website par aur aapki Google rating listing par dikhaayi jaa sakti hain — jahan naya customer bharosa dhoondta hai." },
      { q: "Kya main sabhi customers ko bhej sakta hoon?", a: "Haan, aap apne genuine customers ko review request bhej sakte hain. Behtar hai un customers se maangein jo aapki service se santusht the." },
      { q: "Kya purani genuine reviews hata sakte hain?", a: "Genuine feedback hataya nahi jaata — woh aapke bharosa ka hissa hai. Sirf fake ya rules-ke-khilaaf reviews report kiye jaa sakte hain, jinpar decision platform ka hota hai." },
      { q: "Kitne din mein reviews aane lagenge?", a: "System 2 din mein ready ho jaata hai. Reviews uske baad us par depend karte hain ki aap kitni jaldi customers ko link bhejte hain aur kitne review chhodte hain." },
      { q: "Kya yeh Google Business Profile ke bina chalega?", a: "Website par reviews dikhana Google ke bina bhi ho sakta hai, lekin Google reviews ke liye aapki Google Business Profile ready honi chahiye. Dono saath mein sabse accha kaam karte hain." },
    ],
  },

  // -------------------------------------------------------------------------
  automation: {
    delivery: "5–7 days",
    problem: {
      title: "Ek-ek kaam haath se karna time kha jaata hai",
      paragraphs: [
        "Har roz ke chhote-chhote kaam — same sawaalon ka jawab dena, enquiry note karna, follow-up karna — akele lagte to chhote hain, lekin milkar aapka poora din kha jaate hain. Aur jab aap busy hote hain, to koi enquiry ya follow-up reh jaata hai.",
        "Jab ek lead ka jawab der se milta hai, ya follow-up bhool jaata hai, to woh customer aksar kisi aur ke paas chala jaata hai. Yeh nuksaan dikhta nahi, lekin hota rehta hai.",
        "Business Automation in repeat hone wale kaamon ko is tarah set karti hai ki woh khud hon — auto-replies, enquiry capture aur reminders — taaki koi lead na chhoote aur aapka waqt bache.",
      ],
    },
    whatItDoes: {
      title: "Yeh service asal mein kya karti hai",
      paragraphs: [
        "Automation ka matlab hai baar-baar hone wale kaamon ko is tarah set karna ki woh insaani mehnat ke bina ho jaayein — jaise common sawaal ka auto-reply, ya har enquiry ka apne aap ek jagah save ho jaana.",
        "LocalRise aapke business ke repeat kaamon ko samajhkar practical automation set karta hai: WhatsApp auto-replies, enquiries ka ek simple sheet mein capture, automatic reminders, aur ek simple dashboard jo visits aur enquiries saaf numbers mein dikhata hai.",
        "Kaam ke baad, aapki roz ki mehnat kam ho jaati hai aur koi enquiry chuptey se nahi chhootti — lekin zaroori jagah par insaani nazar bani rehti hai.",
      ],
    },
    benefits: [
      { icon: "bolt", title: "Turant jawab", text: "Common sawaalon ka auto-reply, din ho ya raat — customer intezaar nahi karta." },
      { icon: "list", title: "Har lead capture", text: "Enquiries apne aap ek simple sheet mein save — koi customer kho nahi jaata." },
      { icon: "clock", title: "Automatic reminders", text: "Follow-up aur reminders khud jaate hain, jisse customer wapas aata hai." },
      { icon: "chart", title: "Saaf numbers", text: "Ek simple dashboard batata hai kitne log aaye aur kitni enquiry aayi — plain numbers mein." },
      { icon: "clock", title: "Time bachta hai", text: "Repeat kaam khud hone se aapka waqt asli kaam ke liye bachta hai." },
    ],
    inclusionGroups: [
      { title: "Enquiry handling", icon: "bolt", items: ["WhatsApp auto-replies", "Lead capture into a sheet"] },
      { title: "Follow-ups", icon: "clock", items: ["Automated reminders"] },
      { title: "Nazar rakhna", icon: "chart", items: ["Simple analytics dashboard"] },
    ],
    notIncluded: [
      "Har kaam ka automation — kuch kaamon mein insaani samajh zaroori hai; hum sirf woh automate karte hain jo theek se ho sake.",
      "Kuch tools ki apni monthly fees ho sakti hai — hum aapko pehle saaf bata dete hain.",
      "Customer se asli baat-cheet ka insaani jawab — auto-reply pehla jawab deta hai, phir aap sambhaalte hain.",
      "Kitna time bachega ya kitni revenue badhegi — iski koi tay guarantee nahi.",
      "Aapke business ki jaankari aur process — yeh discovery aapke saath milkar hoti hai.",
      "Bina insaani nazar ke poora business chalana — automation madad karta hai, replace nahi.",
    ],
    whoFor: {
      fits: [
        "Busy owner jo har enquiry haath se sambhaal nahi paata",
        "Business jise roz same sawaalon ka jawab dena padta hai",
        "Jinke leads follow-up ke bina chhoot jaate hain",
        "Jo enquiries ko ek jagah organise karna chahte hain",
      ],
      notYet: "Agar abhi aapke paas itni enquiries ya repeat kaam nahi hain, to pehle website ya WhatsApp setup se enquiry-flow banana zyada faydemand hai — automation uske baad zyada kaam ka hota hai.",
    },
    process: [
      { title: "Process samajhna", text: "Hum aapke roz ke repeat kaam aur common sawaal samajhte hain." },
      { title: "Kya automate ho, tay karna", text: "Hum dekhte hain kaun-se kaam theek se automate ho sakte hain aur kahan insaani nazar chahiye." },
      { title: "Setup karna", text: "Auto-replies, lead capture sheet aur reminders set karte hain." },
      { title: "Dashboard jodna", text: "Ek simple dashboard set karte hain jo visits aur enquiries dikhata hai." },
      { title: "Saath mein test", text: "Hum aapke saath test karte hain ki sab sahi chal raha hai." },
      { title: "Handover", text: "Hum samjha dete hain ki system kaise chalta hai aur kahan aapko dekhna hai." },
    ],
    requirements: [
      "Aapke common sawaal aur unke jawab",
      "Enquiries abhi kahan aati hain (WhatsApp, form, call)",
      "Kaun-se follow-up ya reminders chahiye",
      "Zaroori tools ka access (jaise WhatsApp number, sheet)",
      "Kaun-se kaam abhi sabse zyada time lete hain",
    ],
    timeline: {
      text: "Practical automation setup aksar 5–7 din mein hota hai, kyunki har business ke process alag hote hain aur unhe samajhkar set karna padta hai.",
      factors: [
        "Kitne aur kitne complex kaam automate karne hain",
        "Zaroori tools ka access kitni jaldi milta hai",
        "Testing aur feedback ka time",
      ],
    },
    results: {
      can: [
        "Common sawaalon ka jawab turant milta hai",
        "Enquiries ek jagah save hoti hain — koi lead chhootti nahi",
        "Aapka roz ka repeat kaam kam ho jaata hai",
      ],
      cannot: [
        "Kitna time bachega ya kitni revenue badhegi — iski guarantee nahi",
        "Har kaam automate nahi hota — kuch mein insaani samajh zaroori hai",
        "Insaani nazar poori tarah hataayi nahi jaati",
      ],
    },
    faqs: [
      { q: "Automation ka matlab kya hai?", a: "Automation ka matlab hai baar-baar hone wale kaamon ko is tarah set karna ki woh khud ho jaayein — jaise common sawaal ka auto-reply, ya har enquiry ka apne aap ek sheet mein save ho jaana." },
      { q: "Kya isse mera poora business apne aap chalega?", a: "Nahi. Automation repeat kaam kam karta hai aur leads sambhaalne mein madad karta hai, lekin zaroori jagah par insaani nazar aur faisle aapke hi rehte hain. Yeh madadgaar hai, replacement nahi." },
      { q: "Kya sab kuch automate ho sakta hai?", a: "Nahi. Kuch kaam theek se automate ho jaate hain (auto-reply, lead capture, reminders), lekin jahan insaani samajh chahiye wahan hum automate nahi karte. Hum shuru mein hi saaf batate hain kya ho sakta hai aur kya nahi." },
      { q: "Kya isme koi monthly kharcha hai?", a: "Kuch tools ki apni monthly fees ho sakti hai. Hum aapko koi bhi aisa kharcha pehle se saaf bata dete hain, taaki koi surprise na ho." },
      { q: "Lead capture sheet kya hai?", a: "Yeh ek simple sheet hai jisme har aane wali enquiry apne aap save ho jaati hai — naam, number aur jaankari ke saath — taaki koi customer kaagaz ya chat mein kho na jaaye." },
      { q: "Kya isse pakka time ya paisa bachega?", a: "Automation repeat kaam kam karta hai, lekin kitna exact time ya paisa bachega yeh aapke business par depend karta hai — hum koi tay number guarantee nahi karte." },
      { q: "Auto-reply ke baad customer se baat kaun karega?", a: "Auto-reply sirf pehla turant jawab deta hai (jaise 'aapka message mil gaya'). Uske baad asli baat aap ya aapki team karti hai — insaani jawab automation nahi leta." },
      { q: "Mujhe pehle kya lena chahiye?", a: "Agar abhi enquiries kam hain, to pehle website ya WhatsApp setup se enquiry-flow banana behtar hai. Automation tab zyada kaam ka hota hai jab regular enquiries aati hon." },
      { q: "Dashboard mein kya dikhta hai?", a: "Ek simple dashboard jo saaf numbers mein dikhata hai kitne log aaye aur kitni enquiries aayi — bina kisi technical jaankari ke samajh aane layak." },
    ],
  },

  // -------------------------------------------------------------------------
  marketplace: {
    delivery: "5–7 days",
    problem: {
      title: "Amazon, Flipkart par bechna chahte hain — par shuruaat mushkil lagti hai",
      paragraphs: [
        "Amazon, Flipkart aur Myntra jaise marketplaces par crores customer khareedte hain. Bahut se acche products sirf isliye wahan nahi pahunchte kyunki registration, documents aur GST ka process complex aur uljhan-bhara lagta hai.",
        "Galat document, adhoori jaankari ya galat category se account atak jaata hai ya reject ho jaata hai — aur shuruaat wahin ruk jaati hai.",
        "Marketplace Registration service is process ko sambhaalti hai — documents aur GST handling se lekar pehle catalogue upload tak — taaki aapka seller account sahi tareeke se ready ho. Final approval marketplace deta hai, hum sab sahi taiyaar karke submit karte hain.",
      ],
    },
    whatItDoes: {
      title: "Yeh service asal mein kya karti hai",
      paragraphs: [
        "Yeh service aapko online marketplaces par seller ke roop mein register karti hai — documents aur GST ki jaankari sahi tareeke se lagakar, sahi category chunkar, aur aapke pehle products upload karke.",
        "LocalRise Amazon, Flipkart aur Myntra jaise platforms par aapka seller account taiyaar karta hai, paperwork sahi tareeke se submit karta hai, aur ek initial catalogue upload deta hai taaki account bechne ke liye ready ho.",
        "Kaam ke baad aapka account bechne ke liye taiyaar hota hai — lekin approval, ranking aur fees jaise cheezein marketplace decide karta hai, hum nahi.",
      ],
    },
    benefits: [
      { icon: "rocket", title: "Platforms par register", text: "Amazon, Flipkart, Myntra aur more par aapki seller presence set hoti hai." },
      { icon: "shield", title: "Paperwork sambhla", text: "Document aur GST handling sahi tareeke se taiyaar aur submit ki jaati hai." },
      { icon: "list", title: "Pehle listings", text: "Ek initial catalogue upload taaki aapka account bechne ke liye ready ho." },
      { icon: "check", title: "Account health setup", text: "Account ko sahi tareeke se set kiya jaata hai taaki shuruaat saaf ho." },
    ],
    inclusionGroups: [
      { title: "Registration", icon: "rocket", items: ["Amazon + Flipkart + Myntra setup", "Document & GST handling"] },
      { title: "Catalogue aur account", icon: "list", items: ["Initial catalog upload", "Account health setup"] },
    ],
    notIncluded: [
      "Marketplace ki approval — yeh poori tarah marketplace (Amazon, Flipkart, Myntra) ke haath mein hai; hum sahi submit karte hain.",
      "Platform ki fees aur commissions — har marketplace apni fees leta hai, jise woh decide karta hai.",
      "GST number khud banwaana — hum jaankari handle karte hain; GST registration ek alag government process hai.",
      "Products ki professional photography aur jaankari — yeh aapse aati hai.",
      "Roz ki catalogue aur order management — shuruaati upload ke baad dukaan chalana aapka hissa hai.",
      "Sales, ranking ya top listing ki koi guarantee — yeh marketplace aur market par depend karta hai.",
    ],
    whoFor: {
      fits: [
        "Manufacturer ya wholesaler jo online reach chahte hain",
        "Brand ya D2C jo Amazon/Flipkart/Myntra par bechna chahte hain",
        "Shop jinke paas products aur GST (ya banane ki taiyaari) hai",
        "Jo apni khud ki website ke saath marketplace par bhi bechna chahte hain",
      ],
      notYet: "Agar aapke paas abhi products ki jaankari, photos ya zaroori documents (jaise GST, jahan zaroori ho) ready nahi hain, to pehle unhe taiyaar karna behtar hai — registration unhi par khada hota hai.",
    },
    process: [
      { title: "Business samajhna", text: "Hum aapke products, category aur kaun-se marketplaces chahiye, yeh samajhte hain." },
      { title: "Documents lena", text: "Aap zaroori documents aur GST jaankari share karte hain." },
      { title: "Account taiyaar karna", text: "Hum seller account sahi category aur jaankari ke saath register karte hain." },
      { title: "Submit karna", text: "Hum paperwork sahi tareeke se submit karte hain — approval marketplace deta hai." },
      { title: "Catalogue upload", text: "Aapke pehle products ki listing upload karte hain aur account health set karte hain." },
      { title: "Handover", text: "Hum samjha dete hain ki aage catalogue aur orders kaise manage karne hain." },
    ],
    requirements: [
      "Business ke documents (jaise pehchaan, bank details)",
      "GST jaankari (jahan applicable ho)",
      "Products ki list, photos aur price",
      "Har product ka description aur category",
      "Bank account details (payments ke liye)",
      "Kaun-se marketplaces par bechna hai",
    ],
    timeline: {
      text: "Registration ki taiyaari aur submission aksar 5–7 din mein hoti hai. Lekin marketplace ki approval apna alag time leti hai, jo marketplace ke haath mein hai.",
      factors: [
        "Marketplace ki apni verification aur approval ka time",
        "Documents aur GST jaankari kitni jaldi aur poori milti hai",
        "Kitne products aur kitne marketplaces set karne hain",
      ],
    },
    results: {
      can: [
        "Aapka seller account bechne ke liye sahi tareeke se taiyaar hota hai",
        "Documents aur GST paperwork sahi tareeke se submit hota hai",
        "Aapke pehle products listed ho jaate hain",
      ],
      cannot: [
        "Marketplace ki approval ki guarantee nahi — woh marketplace decide karta hai",
        "Ranking, top listing ya sales ki guarantee nahi",
        "Platform ki fees aur approval ka time hum control nahi karte",
      ],
    },
    faqs: [
      { q: "Kya aap approval ki guarantee dete hain?", a: "Nahi. Marketplace approval poori tarah marketplace (Amazon, Flipkart, Myntra) ke haath mein hai. Hum sab kuch sahi tareeke se taiyaar aur submit karte hain — final approval aur uska time marketplace decide karta hai." },
      { q: "Kya mujhe GST chahiye?", a: "Zyadatar marketplaces par bechne ke liye GST zaroori hota hai. Hum GST jaankari handle karte hain, lekin GST number khud banwaana ek alag government process hai — hum aapko sahi rasta batate hain." },
      { q: "Kaun-se marketplaces par register karte ho?", a: "Amazon, Flipkart aur Myntra jaise platforms par, jahan yeh service abhi offer ki jaati hai. Hum shuru mein tay karte hain kaun-se aapke products ke liye sahi hain." },
      { q: "Platform ki fees kitni hai?", a: "Har marketplace apni fees aur commission leta hai, jo woh khud decide karta hai — hum uspar control nahi karte. Jitni jaankari humein hoti hai, hum aapko pehle bata dete hain taaki aap samajhkar decision le saken." },
      { q: "Initial catalogue upload mein kya hota hai?", a: "Hum aapke pehle products ki listing — photo, price aur jaankari ke saath — account par upload karte hain, taaki account bechne ke liye ready ho." },
      { q: "Registration ke baad orders kaun sambhaalega?", a: "Shuruaati setup ke baad roz ki catalogue aur order management aapki hoti hai. Hum handover par samjha dete hain ki yeh kaise chalta hai." },
      { q: "Kitne din mein account ready hoga?", a: "Taiyaari aur submission aksar 5–7 din mein. Lekin marketplace ki approval apna alag time leti hai, jo unke haath mein hai — hum uska bharosa nahi de sakte." },
      { q: "Mere products ki photos kaun dega?", a: "Product photos aur jaankari aap dete hain. Marketplaces ke apne photo rules hote hain — hum aapko batate hain ki kis type ki photos chahiye." },
      { q: "Kya sales pakki hain?", a: "Nahi. Registration aapko bechne ke liye taiyaar karta hai, lekin sales, ranking ya top listing ki koi guarantee nahi — woh market aur marketplace par depend karti hai." },
    ],
  },
};
