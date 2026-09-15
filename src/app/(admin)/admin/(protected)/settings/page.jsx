import Icon from "@/components/Icon";
import { store } from "@/lib/store";
import { saveCollection, saveSettings } from "@/app/(admin)/admin/actions";
import { Card, PageTitle, field, label, primaryBtn } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

// All text inputs on purpose. type="email"/"tel" would fail HTML5 validation
// while the values are still bracketed placeholders, silently blocking the
// save; inputMode still gives phones the right keyboard.
const FIELDS = [
  ["name", "Studio name"],
  ["tagline", "Tagline"],
  ["city", "City"],
  ["email", "Email", "email"],
  ["phone", "Phone", "tel"],
  ["replyHours", "Reply within (hours)"],
  ["datesLeft", "Dates left this season"],
];

export default async function SettingsPage() {
  const { settings, collections } = await store.getSettings();

  return (
    <>
      <PageTitle title="Settings" subtitle="The details and prices the public pages read from." />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="h-fit p-6">
          <div className="flex items-center gap-2.5 pb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.05]">
              <Icon name="settings" className="h-4 w-4 text-accent" />
            </span>
            <h2 className="text-[17px]">Studio details</h2>
          </div>
          <form action={saveSettings} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map(([name, text, mode]) => (
                <label key={name} className={`${label} ${name === "tagline" ? "sm:col-span-2" : ""}`}>
                  {text}
                  <input name={name} inputMode={mode} defaultValue={settings[name] ?? ""} className={field} />
                </label>
              ))}
            </div>
            <button type="submit" className={`${primaryBtn} self-start`}>
              Save details
            </button>
          </form>
        </Card>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.05]">
              <Icon name="list" className="h-4 w-4 text-accent" />
            </span>
            <h2 className="text-[17px]">Collections &amp; prices</h2>
          </div>

          {collections.map((c) => (
            <Card key={c.id} className="p-6">
              <form action={saveCollection} className="flex flex-col gap-4">
                <input type="hidden" name="id" value={c.id} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={label}>
                    Name
                    <input name="name" defaultValue={c.name} className={field} />
                  </label>
                  <label className={label}>
                    Price
                    <input name="price" defaultValue={c.price} className={field} />
                  </label>
                </div>
                <label className={label}>
                  Description
                  <textarea name="blurb" rows={2} defaultValue={c.blurb} className={field} />
                </label>
                <button type="submit" className={`${primaryBtn} self-start`}>
                  Save
                </button>
              </form>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-5 flex items-start gap-3 p-5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] text-ink/60">
          i
        </span>
        <p className="text-[13px] leading-relaxed text-ink/55">
          With demo data these edits are held in memory: the admin reflects them, but the public pages still read the
          values in <code className="rounded bg-black/30 px-1">src/lib/site.js</code>. Once a database is connected, the
          public pages read from it too.
        </p>
      </Card>
    </>
  );
}
