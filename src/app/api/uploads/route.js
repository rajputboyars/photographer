import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/admin-auth";
import { processUpload } from "@/lib/uploads";
import { store } from "@/lib/store";

export async function POST(request) {
  // Uploading is admin-only. Middleware guards /admin pages, not API routes,
  // so this checks the session itself.
  if (!(await verifySession((await cookies()).get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const files = form?.getAll("files").filter((f) => typeof f === "object" && f.size > 0) ?? [];

  if (!files.length) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const uploads = [];
  const errors = [];

  for (const file of files) {
    const { upload, error } = await processUpload(file);
    if (error) errors.push({ name: file.name, error });
    else {
      await store.addUpload(upload);
      uploads.push(upload);
    }
  }

  return NextResponse.json({ uploads, errors }, { status: uploads.length ? 201 : 422 });
}
