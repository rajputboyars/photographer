import { AdminHeader, DemoBanner } from "@/components/admin/AdminChrome";
import { usingDemoData } from "@/lib/store";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-ground">
      <AdminHeader />
      {usingDemoData ? <DemoBanner /> : null}
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">{children}</main>
    </div>
  );
}
