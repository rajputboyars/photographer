import { DemoBanner, MobileBar, MobileNav, Sidebar } from "@/components/admin/AdminChrome";
import { usingDemoData } from "@/lib/store";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-ground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileBar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-8 md:py-10">
          {usingDemoData ? (
            <div className="pb-7">
              <DemoBanner />
            </div>
          ) : null}
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
