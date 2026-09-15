import { store } from "@/lib/store";
import { saveCollection, saveSettings } from "@/app/(admin)/admin/actions";
import { Card, PageTitle, field, label, primaryBtn } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

const FIELDS = [
  ["name", "Studio name"],
  ["tagline", "Tagline"],
  ["city", "City"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["replyHours", "Reply within (hours)"],
  ["datesLeft", "Dates left this season"],
];

export default async function SettingsPage() {
  const { settings, collections } = await store.getSettings();

  return (
    <>
      <PageTitle title="Settings" subtitle="The details and prices the public pages read from." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="pb-4 text-lg font-normal">Studio details</h2>
          <form action={saveSettings} className="flex flex-col gap-4">
            {FIELDS.map(([name, text]) => (
              <label key={name} className={label}>
                {text}
                <input name={name} defaultValue={settings[name] ?? ""} className={field} />
              </label>
            ))}
            <button type="submit" className={primaryBtn}>
              Save details
            </button>
          </form>
        </Card>

        <div className="flex flex-col gap-4">
          {collections.map((c) => (
            <Card key={c.id} className="p-6">
              <h2 className="pb-4 text-lg font-normal">{c.name}</h2>
              <form action={saveCollection} className="flex flex-col gap-4">
                <input type="hidden" name="id" value={c.id} />
                <label className={label}>
                  Name
                  <input name="name" defaultValue={c.name} className={field} />
                </label>
                <label className={label}>
                  Price
                  <input name="price" defaultValue={c.price} className={field} />
                </label>
                <label className={label}>
                  Description
                  <textarea name="blurb" rows={2} defaultValue={c.blurb} className={field} />
                </label>
                <button type="submit" className={primaryBtn}>
                  Save
                </button>
              </form>
            </Card>
          ))}
        </div>
      </div>

      <p className="pt-6 text-[13px] leading-relaxed text-ink/45">
        With demo data these edits are held in memory: the admin reflects them, but the public pages still read the
        values in <code className="rounded bg-black/30 px-1">src/lib/site.js</code>. Once a database is connected, the
        public pages read from it too.
      </p>
    </>
  );
}
