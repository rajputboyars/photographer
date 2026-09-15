// Seed data for the demo store.
//
// This is what the admin shows until a real database is connected. It is
// deliberately obvious demo content — names in [brackets], sample leads — so
// nobody mistakes it for live data.

export const seedLeads = () => [
  {
    id: "lead-1",
    name: "Priya & Arjun",
    phone: "+91 98765 43210",
    email: "priya.arjun@example.com",
    eventType: "Wedding",
    eventDate: "2026-11-21",
    venue: "[Venue name], Hyderabad",
    budget: "[YOUR PRICE] – [YOUR PRICE]",
    notes: "Three days — haldi, mehndi and the wedding. Around 400 guests. We care most about the candid family photographs.",
    status: "new",
    createdAt: "2026-09-12T09:24:00.000Z",
  },
  {
    id: "lead-2",
    name: "Sneha R.",
    phone: "+91 91234 56780",
    email: "sneha@example.com",
    eventType: "Pre-wedding",
    eventDate: "2026-10-04",
    venue: "Araku Valley",
    budget: "Not sure yet",
    notes: "Half day outdoors, ideally at sunrise. Would love a save-the-date reel.",
    status: "replied",
    createdAt: "2026-09-09T16:02:00.000Z",
  },
  {
    id: "lead-3",
    name: "Kiran Constructions",
    phone: "+91 90000 11111",
    email: "events@example.com",
    eventType: "Corporate",
    eventDate: "2026-09-30",
    venue: "[Venue name], Gachibowli",
    budget: "[YOUR PRICE] +",
    notes: "Annual day. Need stills plus a two-minute recap film by the following week.",
    status: "booked",
    createdAt: "2026-09-02T11:47:00.000Z",
  },
];

export const seedJournal = () => [
  {
    id: "post-1",
    slug: "three-days-at-the-palace",
    title: "Three days at [Venue name]",
    excerpt: "Haldi in the courtyard, mehndi under the lights, and a wedding that ran two hours late in the best way.",
    body: "Write the story of the day here. What the light was doing, who cried first, the bit nobody planned.",
    cover: "/images/photos/mehndi.jpg",
    status: "published",
    publishedAt: "2026-08-18T00:00:00.000Z",
  },
  {
    id: "post-2",
    slug: "a-morning-in-araku",
    title: "A morning in Araku",
    excerpt: "A pre-wedding shoot that started at 5am and was worth every minute of it.",
    body: "Write the story of the shoot here.",
    cover: "/images/photos/pre-wedding.jpg",
    status: "draft",
    publishedAt: null,
  },
];
