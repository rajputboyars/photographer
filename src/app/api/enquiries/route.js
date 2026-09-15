import { NextResponse } from "next/server";
import { store } from "@/lib/store";

const REQUIRED = ["name", "phone", "email", "eventType"];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON." }, { status: 400 });
  }

  const missing = REQUIRED.filter((field) => !String(body?.[field] ?? "").trim());
  if (missing.length) {
    return NextResponse.json({ error: `Missing: ${missing.join(", ")}` }, { status: 422 });
  }

  const lead = await store.createLead({
    name: String(body.name).slice(0, 200),
    phone: String(body.phone).slice(0, 60),
    email: String(body.email).slice(0, 200),
    eventType: String(body.eventType).slice(0, 60),
    eventDate: String(body.eventDate ?? "").slice(0, 40),
    venue: String(body.venue ?? "").slice(0, 200),
    budget: String(body.budget ?? "").slice(0, 80),
    notes: String(body.notes ?? "").slice(0, 4000),
    whatsappOk: Boolean(body.whatsappOk),
  });

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
