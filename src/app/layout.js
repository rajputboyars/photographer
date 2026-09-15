import { Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: `${site.tagline} in ${site.city}. Weddings, pre-weddings, receptions and celebrations, photographed and filmed by a small studio.`,
};

export const viewport = {
  themeColor: "#0A0F1C",
};

/** Root layout holds the document only — the public site and the admin each
 *  bring their own chrome. */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-ground font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
