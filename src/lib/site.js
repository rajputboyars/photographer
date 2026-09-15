// Single place for everything the studio needs to edit.
// Values in [square brackets] are placeholders — replace before launch.

export const site = {
  name: "Isha Photography",
  tagline: "Wedding photography and cinema",
  city: "[YOUR CITY]",
  email: "[hello@yourdomain.com]",
  phone: "[+91 00000 00000]",
  address: ["[Studio address]", "[YOUR CITY]"],
  replyHours: "[N]",
  seasons: ["[YEAR]", "[YEAR]"],
  datesLeft: "[N]",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Collections", href: "/collections" },
  { label: "Studio", href: "/studio" },
];

export const collections = [
  {
    id: "portrait",
    kicker: "Half day",
    name: "The Portrait",
    blurb: "Pre-wedding, engagement, maternity or a studio session.",
    price: "[YOUR PRICE]",
    includes: [
      "Up to four hours, one location",
      "[N]+ edited photographs",
      "60-second save-the-date reel",
      "Private online gallery",
    ],
    featured: false,
  },
  {
    id: "ceremony",
    kicker: "Most booked · one day",
    name: "The Ceremony",
    blurb: "A single wedding day, a reception, or a birthday covered end to end.",
    price: "[YOUR PRICE]",
    includes: [
      "Photographer and film-maker, full day",
      "[N]+ edited photographs",
      "[N]-minute highlight film",
      "Sneak peek within [N] days",
      "[N]-page printed album",
    ],
    featured: true,
  },
  {
    id: "whole-wedding",
    kicker: "Three days +",
    name: "The Whole Wedding",
    blurb: "Haldi, mehndi, sangeet, wedding and reception, in one story.",
    price: "[YOUR PRICE]",
    includes: [
      "Everything in The Ceremony, per day",
      "Second photographer throughout",
      "Full-length ceremony film",
      "Travel & stay within [N] km",
      "Two albums, one per family",
    ],
    featured: false,
  },
];

export const extras = [
  { name: "Drone coverage", blurb: "Venue and baraat from above, where permitted.", price: "[YOUR PRICE]" },
  { name: "Same-day edit", blurb: "A short film cut and screened at the reception.", price: "[YOUR PRICE]" },
  { name: "Extra album", blurb: "Hand-bound, [N] pages, for parents or siblings.", price: "[YOUR PRICE]" },
  { name: "Destination travel", blurb: "Beyond [N] km — quoted at cost, no markup.", price: "At cost" },
];

export const process = [
  { step: "01", name: "Send your date", blurb: "One form, one minute. I reply with availability and the full price list." },
  { step: "02", name: "Talk it through", blurb: "A call or a coffee to go over the events, the venues and who matters." },
  { step: "03", name: "Hold the date", blurb: "[N]% advance locks it. The rest is due after the last event." },
  { step: "04", name: "Get it back", blurb: "Sneak peek in [N] days, full gallery and film in [N] weeks." },
];

export const faqs = [
  {
    q: "How far in advance should we book?",
    a: "Peak season dates usually go [N] months ahead. If your date is close, ask anyway — cancellations happen.",
  },
  {
    q: "Do you travel outside [YOUR CITY]?",
    a: "Often. Travel and stay are included within [N] km; beyond that they're billed at cost with nothing added on top.",
  },
  {
    q: "Can we choose which photographs get edited?",
    a: "Yes. You get the full culled gallery first and pick the ones you want finished.",
  },
  {
    q: "What if it rains, or the schedule slips?",
    a: "It always slips. We stay until the events you booked are done — overtime isn't charged by the hour.",
  },
];

export const testimonials = [
  {
    quote: "[Paste a real review here — the one that mentions how relaxed the day felt.]",
    name: "[Client name]",
    context: "Wedding · [Month Year]",
  },
  {
    quote: "[Paste a real review here — ideally one about the wedding film.]",
    name: "[Client name]",
    context: "Pre-wedding · [Month Year]",
  },
  {
    quote: "[Paste a real review here — one from an event or corporate client.]",
    name: "[Client name]",
    context: "Celebration · [Month Year]",
  },
];

export const principles = [
  {
    icon: "camera",
    name: "Documentary first",
    blurb:
      "Posed portraits get their thirty minutes. The rest of the day I stay out of it and photograph what actually happens.",
  },
  {
    icon: "clock",
    name: "Delivered when promised",
    blurb: "Sneak peek in [N] days, everything else in [N] weeks. If a date slips you hear it from me first.",
  },
  {
    icon: "list",
    name: "One price, written down",
    blurb: "Travel, overtime, extra events — all agreed before the advance. No invoice you didn't see coming.",
  },
];

export const eventTypes = [
  "Wedding",
  "Pre-wedding",
  "Haldi / Mehndi",
  "Sangeet",
  "Reception",
  "Birthday",
  "Corporate",
  "Something else",
];

export const venues = ["[Venue name]", "[Venue name]", "[Venue name]", "[Venue name]", "[Venue name]"];
