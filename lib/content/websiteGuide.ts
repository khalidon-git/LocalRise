// Content for the educational guide at /website-guide/ — "Why Your Business
// Needs a Professional Website". Purely educational (not a sales/landing page);
// it explains the broader idea of a professional online identity and links to
// the /services/websites/ page for the actual service. Natural Hinglish, no
// invented stats, guarantees or claims (knowledge/decisions/004).

import type { IconName } from "@/components/ui/Icon";

export type JourneyStage = { label: string; text: string; icon: IconName };
export type GuideExample = { icon: IconName; business: string; text: string };
export type GuideMyth = { myth: string; reality: string };
export type GuideIconCard = { icon: IconName; title: string; text: string };

export const websiteGuide = {
  seoTitle: "Why Your Business Needs a Professional Website | LocalRise",
  metaDescription:
    "A simple, honest guide for local business owners in India — how a professional website builds trust, how customers really decide online, and how a website compares with Google, Instagram and directories.",
  h1: "Why your business needs a professional website",

  hero: {
    eyebrow: "A simple guide for business owners",
    headline: "Aaj customer pehle aapko online dekhta hai — phir aapse baat karta hai",
    paragraphs: [
      "Ek website sirf internet par ek page nahi hai. Yeh aapke business ki professional online pehchaan hai — woh jagah jahan customer aapko pehli baar 'milta' hai, aksar aapse baat karne se bahut pehle.",
      "Yeh guide bina kisi technical bhaasha ke samjhaati hai ki professional online pehchaan kyun zaroori hai, customer asal mein kaise decide karta hai, aur ek website Google, Instagram aur directories ke saath kaise kaam karti hai. Koi bikwaali nahi — sirf saaf jaankari.",
    ],
  },

  // 2. Customer story
  story: {
    title: "Ek chhoti si kahani — jaisi roz hoti hai",
    paragraphs: [
      "Sochiye Meena ji ko apne bete ke liye ek accha coaching institute chahiye. Woh Google par search karti hain aur teen naam saamne aate hain.",
      "Pehle ka koi proper page nahi milta — sirf ek phone number. Doosre ka Instagram hai, par courses, fees ya timing ki clear jaankari nahi. Teesre ki ek saaf website hai: courses, teachers, timing, location aur ek WhatsApp button.",
      "Meena ji kise choose karti hain? Aksar teesre ko — isliye nahi ki woh sabse accha coaching hai, balki isliye ki woh sabse clear aur bharosa-laayak laga. Baaki do ne shayad accha padhaya hoga, par unhe mauka hi nahi mila.",
      "Yahi roz hota hai. Customer poori jaankari ke saath aane wale business ko chunta hai — kyunki clarity bharosa banati hai.",
    ],
  },

  // 3. Modern customer journey
  journey: {
    title: "Aaj customer kaise decide karta hai",
    description:
      "Customer seedha aake khareedta nahi. Woh kuch step se guzarta hai — aur har step par aapki online pehchaan maayne rakhti hai.",
    stages: [
      { label: "Search", text: "Google par aapke type ka business dhoondta hai.", icon: "map" },
      { label: "Google Profile", text: "Aapki listing, timing aur location dekhta hai.", icon: "pin" },
      { label: "Reviews", text: "Doosron ki raay padhkar bharosa banata hai.", icon: "star" },
      { label: "Website", text: "Poori jaankari aur professional look check karta hai.", icon: "browser" },
      { label: "Trust", text: "Yahin par decide karta hai ki aap sahi choice ho.", icon: "shield" },
      { label: "Contact", text: "WhatsApp ya call se aapse baat shuru karta hai.", icon: "chat" },
      { label: "Customer", text: "Visit ya order — aur ek naya customer ban jaata hai.", icon: "heart" },
    ] as JourneyStage[],
  },

  // 4. What a professional website does
  does: {
    title: "Ek professional website aapke liye kya karti hai",
    items: [
      { icon: "shield", title: "Pehli nazar mein bharosa", text: "Ek saaf, professional look customer ko batata hai ki aap serious business ho." },
      { icon: "list", title: "Poori jaankari ek jagah", text: "Services, timing, location, contact — sab ek jagah, customer ke sawaalon ke jawab ke saath." },
      { icon: "heart", title: "Customer ka confidence", text: "Jab jaankari clear hoti hai, customer bina jhijhak aapko chunta hai." },
      { icon: "chat", title: "Aasaan contact", text: "Call aur WhatsApp button se aap tak pahunchna ek tap ka kaam ban jaata hai." },
      { icon: "sparkles", title: "Majboot pehchaan", text: "Ek jagah jo poori tarah aapke control mein hai — aapka apna digital ghar." },
      { icon: "clock", title: "Business hours ke baad bhi", text: "Aapki dukaan band ho tab bhi website customer ko jaankari aur contact deti rehti hai." },
    ] as GuideIconCard[],
  },

  // 5. Industry examples
  examples: {
    title: "Alag-alag businesses ke liye iska matlab",
    description: "Har business ke liye website ka fayda thoda alag dikhta hai — par asar ek hi hai: zyada bharosa aur aasaan contact.",
    items: [
      { icon: "stethoscope", business: "Doctor ya clinic", text: "Timing, services aur location clear — mareez bina call kiye aa sakta hai, aur appointment lena aasaan ho jaata hai." },
      { icon: "cap", business: "School ya coaching", text: "Courses, faculty aur admission ki jaankari — parents bharosa ke saath enquiry karte hain." },
      { icon: "utensils", business: "Restaurant ya hotel", text: "Menu, photos aur booking — customer bhookh lagne se pehle hi decide kar leta hai." },
      { icon: "hammer", business: "Builder ya construction", text: "Poore projects aur kaam dikhaane se badi value ke customers ka bharosa banta hai." },
      { icon: "building", business: "Manufacturer ya showroom", text: "Products aur capacity clear — dealer aur bulk buyers seriously baat karte hain." },
      { icon: "scissors", business: "Salon ya local service", text: "Services, rates aur ek WhatsApp button — customer turant booking ke liye message karta hai." },
    ] as GuideExample[],
  },

  // 6. Website vs third-party platforms
  platforms: {
    title: "Website aur baaki platforms — dono ka apna kaam",
    intro:
      "Google Business Profile, Instagram, Facebook, WhatsApp aur Justdial jaise directories bahut useful hain — yeh log tak pahunchne aur baat karne mein madad karte hain. Lekin yeh aapki poori professional pehchaan ki jagah nahi le sakte.",
    keyLine:
      "Directory par aap visibility rent karte hain. Apni website par aap apni digital pehchaan build karte hain.",
    points: [
      { icon: "map", title: "Google Business Profile", text: "Aas-paas ke customer aapko dhoondhne mein behtareen — par jaankari ki gehraai aur look seemit rehta hai." },
      { icon: "sparkles", title: "Instagram aur Facebook", text: "Naye customers tak pahunchne aur kaam dikhaane mein achhe — par purani posts dhoondhna aur poori jaankari dena mushkil hota hai." },
      { icon: "chat", title: "WhatsApp", text: "Baat-cheet ke liye zabardast — par yeh dikhaane ki jagah nahi ki aap kaun ho aur kya offer karte ho." },
      { icon: "grid", title: "Justdial aur directories", text: "Visibility dete hain, par aap doosre businesses ke beech, unke rules ke andar dikhte ho — pehchaan aapki apni nahi hoti." },
    ] as GuideIconCard[],
    closing:
      "Sabse accha tareeka: inhe apni website ke saath istemal karein. Platforms log ko aap tak laate hain; website unka bharosa jeetti hai aur baat aasaan banati hai.",
  },

  // 7. Common myths
  myths: {
    title: "Kuch aam galatfehmiyan aur sachchai",
    items: [
      { myth: "Website bana li, ab customer apne aap aayenge.", reality: "Website bharosa aur contact aasaan banati hai, par customer laane ke liye Google, marketing aur achhi service bhi zaroori hai. Website akela magnet nahi hai." },
      { myth: "Mere paas Instagram hai, website ki zaroorat nahi.", reality: "Instagram achha hai, par wahan aap rules aur algorithm ke andar hote ho. Website aapki apni jagah hai jahan poori jaankari aapke control mein rehti hai." },
      { myth: "Website bahut mehngi aur complex hoti hai.", reality: "Ek saaf, kaam ki business website affordable ho sakti hai. Aur chalane ke liye aapko koi technical jaankari nahi chahiye." },
      { myth: "Mera business chhota hai, website ki kya zaroorat.", reality: "Chhote business ko sabse zyada bharosa ki zaroorat hoti hai. Ek professional website chhote business ko bhi settled aur serious dikhati hai." },
      { myth: "Website banao aur bhool jao.", reality: "Website ek chalu cheez hai. Samay-samay par jaankari, photos aur offers update karne se woh aur useful rehti hai." },
      { myth: "Website matlab Google par number 1 aana.", reality: "Website ranking mein madad kar sakti hai, par top position Google decide karta hai — koi bhi uski guarantee nahi de sakta." },
    ] as GuideMyth[],
  },

  // 8. FAQs
  faqs: [
    { q: "Kya mere chhote business ko sach mein website chahiye?", a: "Agar customer aapko online dhoondh sakte hain, to haan. Chhote business ko bharosa ki sabse zyada zaroorat hoti hai, aur ek saaf website woh bharosa banati hai — chahe aapka business kitna bhi chhota ho." },
    { q: "Kya sirf Google Business Profile kaafi nahi hai?", a: "Google Profile customer ko dhoondhne mein madad karti hai, lekin jaankari aur look seemit rehta hai. Website aapki poori pehchaan aur control deti hai. Dono saath mein sabse accha kaam karte hain." },
    { q: "Website chalane ke liye kya mujhe technical knowledge chahiye?", a: "Nahi. Yeh banane wale ka kaam hai. Aap sirf apne business ki jaankari aur photos dete hain — baaki sab sambhaala jaata hai." },
    { q: "Kya website hone se customer pakka aayenge?", a: "Website bharosa aur contact ki process behtar karti hai, lekin akele customer ki guarantee nahi deti. Yeh Google, marketing aur aapki service ke saath milkar kaam karti hai." },
    { q: "Website aur social media mein kya farak hai?", a: "Social media par aap kisi aur ke platform aur rules ke andar hote ho. Website aapki apni jagah hai — poori jaankari, aapke control mein, ek professional look ke saath." },
    { q: "Kitne din mein website ban jaati hai?", a: "Zyadatar local business websites kuch din mein taiyaar ho jaati hain. Exact time kaam se pehle tay hota hai, aur woh aapke content dene ki speed par bhi depend karta hai." },
    { q: "Kya website mobile par sahi dikhegi?", a: "Ek acchi website pehle mobile ke liye banaayi jaati hai, kyunki zyadatar customer phone par dekhte hain — aur phir tablet aur computer par bhi sahi dikhti hai." },
    { q: "Website banne ke baad kya main use badal sakta hoon?", a: "Haan. Jaankari, photos aur offers update kiye jaa sakte hain, aur business badhne par nayi pages, store ya booking bhi jodhi jaa sakti hain." },
    { q: "Kya website se main Google par top aa jaunga?", a: "Website search engines ko aapko samajhne mein madad karti hai, lekin ranking Google decide karta hai. Koi bhi top position ki guarantee nahi de sakta." },
    { q: "Website banane ke liye mujhe kya dena hoga?", a: "Aapka business naam, services, contact details aur kuch achhi photos. Ek chhoti baat-cheet se shuruaat hoti hai — baaki hum guide karte hain." },
    { q: "Kya website hosting ka kharcha alag hota hai?", a: "Basic hosting aur SSL setup service ka hissa ho sakta hai; domain naam (jaise yourbusiness.com) ki yearly fees kabhi alag hoti hai. Koi bhi aisa kharcha pehle se saaf bata diya jaata hai." },
  ],

  cta: {
    title: "Aage kya karein?",
    text: "Aapko website chahiye ya nahi — pehle hum aapke business ki current situation samajh sakte hain, bina kisi pressure ke. Aap chaahein to Business Website service ki poori jaankari bhi dekh sakte hain.",
  },
};
