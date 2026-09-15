import { NextResponse } from "next/server";
import { readUpload } from "@/lib/storage";

/** Serves an uploaded photograph, from disk or memory. */
export async function GET(_request, { params }) {
  const { name } = await params;
  const file = await readUpload(name);

  if (!file) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return new NextResponse(file.body, {
    headers: {
      "Content-Type": file.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
