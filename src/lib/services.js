// The service pages. These are the pages people actually search for —
// "wedding photographer in [city]", "pre-wedding shoot" — so each gets its own
// URL, its own headline and its own set of questions.

import { photos } from "./site";

export const services = [
  {
    slug: "wedding-photography",
    name: "Wedding photography",
    kicker: "One day, or five",
    headline: "The wedding day, photographed the way it happened",
    intro:
      "From the first pinned pleat to the last song. Two of us work the day — one on stills, one on film — so nothing is caught in only one medium, and neither of us has to rush you.",
    hero: photos.wedding,
    gallery: [photos.wedding, photos.reception, photos.portraits],
    includes: [
      "Photographer and film-maker for the full day",
      "[N]+ edited photographs, delivered in [N] weeks",
      "A [N]-minute highlight film",
      "A sneak peek within [N] days, while everyone still wants to see it",
      "A hand-bound [N]-page album",
    ],
    faqs: [
      {
        q: "How many photographs do we actually get?",
        a: "[N]+ finished frames from a full day. You see the full culled gallery first and pick anything extra you want finished.",
      },
      {
        q: "Do you take the formal family portraits?",
        a: "Yes, and we keep them quick — a list agreed beforehand, thirty minutes, done. The rest of the day stays documentary.",
      },
      {
        q: "What happens if the day runs late?",
        a: "It always runs late. We stay until the events you booked are done; overtime is not charged by the hour.",
      },
    ],
    price: "[YOUR PRICE]",
    related: ["pre-wedding-shoots", "ceremony-coverage"],
  },
  {
    slug: "pre-wedding-shoots",
    name: "Pre-wedding shoots",
    kicker: "Half a day",
    headline: "A few hours, before the week takes over",
    intro:
      "Somewhere that means something to you — a beach at 5am, the street you met on, a hill station four hours away. The photographs from these sessions are usually the ones couples print largest.",
    hero: photos.preWedding,
    gallery: [photos.preWedding, photos.portraits, photos.celebration],
    includes: [
      "Up to four unhurried hours, one location",
      "[N]+ edited photographs",
      "A 60-second save-the-date reel",
      "A private online gallery to share with family",
    ],
    faqs: [
      {
        q: "When should we do it?",
        a: "[N] to [N] months before the wedding, so the save-the-date is useful and outfits can be planned around the photographs.",
      },
      {
        q: "Will you help us choose a location?",
        a: "Yes. Tell me the feeling you want and I will suggest three places within reach, with the right light at the right hour.",
      },
      {
        q: "Neither of us is comfortable in front of a camera.",
        a: "Almost nobody is, for the first twenty minutes. We walk, we talk, and I photograph what happens rather than posing you.",
      },
    ],
    price: "[YOUR PRICE]",
    related: ["wedding-photography", "portrait-sessions"],
  },
  {
    slug: "ceremony-coverage",
    name: "Haldi, mehndi & sangeet",
    kicker: "The days around the day",
    headline: "The ceremonies where everyone forgets the camera",
    intro:
      "Haldi is chaos and turmeric. Mehndi runs long and sideways. Sangeet is the one your cousins will talk about for years. These are the events with the least posing and the most to photograph.",
    hero: photos.haldi,
    gallery: [photos.haldi, photos.mehndi, photos.sangeet],
    includes: [
      "Full coverage of each ceremony you book",
      "[N]+ edited photographs per event",
      "A short film per ceremony, cut for sharing",
      "Same-day sneak peeks so the family can post that night",
    ],
    faqs: [
      {
        q: "Can we book only the sangeet?",
        a: "Yes. Single ceremonies are priced per event; booking them with the wedding day works out lower per day.",
      },
      {
        q: "The venue is small and dark. Is that a problem?",
        a: "No. Fast prime lenses and available light — we do not flood a mehndi with flash.",
      },
    ],
    price: "[YOUR PRICE]",
    related: ["wedding-photography", "birthdays-and-events"],
  },
  {
    slug: "birthdays-and-events",
    name: "Birthdays & family events",
    kicker: "One day",
    headline: "First birthdays, anniversaries, and everyone in one room",
    intro:
      "The events that seem small until you realise it was the last time all four grandparents were in one photograph. Covered the same way as a wedding, at a smaller scale.",
    hero: photos.birthday,
    gallery: [photos.birthday, photos.celebration, photos.portraits],
    includes: [
      "Coverage from setup to cake",
      "[N]+ edited photographs",
      "A short recap film",
      "Group portraits, organised quickly and without a queue",
    ],
    faqs: [
      {
        q: "Our child will not sit still.",
        a: "Good. Those are the photographs worth having — we work around them rather than asking for smiles.",
      },
      {
        q: "How long do you stay?",
        a: "Usually [N] hours, which covers arrival through cake. Longer is quoted before the day, never after.",
      },
    ],
    price: "[YOUR PRICE]",
    related: ["ceremony-coverage", "portrait-sessions"],
  },
  {
    slug: "corporate-events",
    name: "Corporate & brand",
    kicker: "Working to a deadline",
    headline: "Conferences, team portraits and product film",
    intro:
      "Annual days, launches, awards nights and headshots for a team of forty. Shot to a brief, delivered on a working deadline, and licensed so your marketing team can actually use the files.",
    hero: photos.corporate,
    gallery: [photos.corporate, photos.portraits, photos.celebration],
    includes: [
      "Coverage to an agreed run sheet",
      "Edited photographs within [N] working days",
      "A recap film cut to length for social or internal use",
      "Consistent headshots on a plain or branded background",
      "Commercial usage rights included",
    ],
    faqs: [
      {
        q: "How fast can we have the files?",
        a: "A same-week turnaround as standard, or next-morning for a selected set if the event needs it. Say so when booking.",
      },
      {
        q: "Can you work to our brand guidelines?",
        a: "Yes — send them across and the grade, crops and framing follow them.",
      },
      {
        q: "Do you invoice with GST?",
        a: "Yes. [Add your GST details here.]",
      },
    ],
    price: "[YOUR PRICE]",
    related: ["birthdays-and-events", "portrait-sessions"],
  },
  {
    slug: "portrait-sessions",
    name: "Portrait sessions",
    kicker: "Studio or outdoors",
    headline: "Portraits that look like the person, not the pose",
    intro:
      "Maternity, family, graduation, or a set of pictures because it has been ten years since the last ones. An hour or two, somewhere with good light.",
    hero: photos.portraits,
    gallery: [photos.portraits, photos.portrait, photos.preWedding],
    includes: [
      "A one to two hour session, studio or on location",
      "[N]+ edited photographs",
      "Print-ready files at full resolution",
      "Help choosing what to wear, if you want it",
    ],
    faqs: [
      {
        q: "How many outfits can we bring?",
        a: "Two comfortably in an hour, three if we have two hours. More than that and we spend the session changing.",
      },
      {
        q: "Can we do it at home?",
        a: "Often the best option, especially with small children. I will check the light beforehand.",
      },
    ],
    price: "[YOUR PRICE]",
    related: ["pre-wedding-shoots", "birthdays-and-events"],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug) ?? null;
