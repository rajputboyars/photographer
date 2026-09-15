"use client";

import { useState } from "react";
import Icon from "./Icon";
import { Arrow } from "./Glass";
import { eventTypes, site } from "@/lib/site";

const BUDGETS = ["Under [YOUR PRICE]", "[YOUR PRICE] – [YOUR PRICE]", "[YOUR PRICE] +", "Not sure yet"];

const fieldClass =
  "glass-field h-[54px] w-full px-4 text-base text-ink placeholder:text-ink/45 focus:border-white/50 focus:outline-none";
const labelClass = "meta text-[11px]";

export default function EnquiryForm() {
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    venue: "",
    budget: "",
    notes: "",
  });
  const [whatsapp, setWhatsapp] = useState(true);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const [status, setStatus] = useState({ state: "idle", message: "" });

  // Posts to /api/enquiries, which stores the lead for the admin inbox.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", message: "" });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, eventType, whatsappOk: whatsapp }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      setStatus({
        state: "sent",
        message: `Thank you — your enquiry is with me. I reply within ${site.replyHours} hours.`,
      });
      setForm({ name: "", phone: "", email: "", date: "", venue: "", budget: "", notes: "" });
    } catch {
      setStatus({
        state: "error",
        message: `That did not send. Please WhatsApp ${site.phone} or email ${site.email} instead.`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <fieldset className="flex flex-col gap-3">
        <legend className={labelClass}>What are we photographing?</legend>
        <div className="flex flex-wrap gap-2.5">
          {eventTypes.map((type) => {
            const on = type === eventType;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setEventType(type)}
                aria-pressed={on}
                className={`px-5 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  on ? "bright" : "glass-pill hover:border-white/40"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2.5">
          <span className={labelClass}>Your name</span>
          <input name="name" required value={form.name} onChange={update("name")} placeholder="Priya &amp; Arjun" className={fieldClass} autoComplete="name" />
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={labelClass}>WhatsApp number</span>
          <input name="phone" required type="tel" value={form.phone} onChange={update("phone")} placeholder="+91" className={fieldClass} autoComplete="tel" />
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={labelClass}>Email</span>
          <input name="email" required type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" className={fieldClass} autoComplete="email" />
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={labelClass}>Date of the main event</span>
          <div className="relative">
            <input name="date" required type="date" value={form.date} onChange={update("date")} className={`${fieldClass} pr-12 [color-scheme:dark]`} />
            <Icon name="calendar" className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink/50" />
          </div>
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={labelClass}>City or venue</span>
          <input name="venue" value={form.venue} onChange={update("venue")} placeholder="Where is it happening?" className={fieldClass} />
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={labelClass}>Budget range</span>
          <div className="relative">
            <select name="budget" value={form.budget} onChange={update("budget")} className={`${fieldClass} appearance-none pr-12 ${form.budget ? "" : "text-ink/45"}`}>
              <option value="">Select a range</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b} className="bg-panel text-ink">
                  {b}
                </option>
              ))}
            </select>
            <Icon name="chevron" className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink/50" />
          </div>
        </label>
      </div>

      <label className="flex flex-col gap-2.5">
        <span className={labelClass}>Anything I should know?</span>
        <textarea
          rows={4}
          name="notes"
          value={form.notes}
          onChange={update("notes")}
          placeholder="How many events, roughly how many guests, and the one photograph you'd be upset not to have."
          className="glass-field w-full p-4 text-base leading-relaxed text-ink placeholder:text-ink/45 focus:border-white/50 focus:outline-none"
        />
      </label>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={whatsapp}
          onChange={(e) => setWhatsapp(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded-md border border-white/40 bg-white/90 accent-white"
        />
        <span className="text-[15px] leading-relaxed text-ink/78">
          Reply on WhatsApp is fine — it&rsquo;s usually faster than email.
        </span>
      </label>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="bright inline-flex items-center gap-2.5 px-8 py-4 text-base transition hover:bg-white disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send enquiry"}
          <Arrow />
        </button>
        <span className="text-sm text-ink/60">No advance to ask · No mailing list</span>
      </div>

      {status.message ? (
        <p
          role="status"
          className={`text-[15px] leading-relaxed ${status.state === "error" ? "text-rose-300" : "text-accent"}`}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
