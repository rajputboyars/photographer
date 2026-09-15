// Where uploaded photographs go.
//
// Uploads are always SERVED through /api/uploads/[name], never as a plain
// /uploads/... path: Next builds its list of public/ files at startup, so
// anything written there at runtime 404s until the server restarts. The API
// route reads from disk (or memory) per request, so an upload is visible
// immediately.
//
// Where they are STORED depends on the host:
//   - a writable filesystem (normal server, local dev) → public/uploads,
//     so they survive a restart
//   - a read-only filesystem (Vercel and most serverless) → memory, which is
//     fine for a demo and lost on restart
//
// For production on serverless, add an adapter that puts the file in object
// storage (Vercel Blob, S3, Cloudinary) and have readUpload fetch from there.
// Nothing that calls saveUpload needs to change.

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/** name -> { body: Buffer, contentType } for the in-memory fallback. */
const memory = (globalThis.__ishaUploads ??= new Map());

let writable = null;

async function canWriteToDisk() {
  if (writable !== null) return writable;
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(path.join(UPLOAD_DIR, ".writable"), "ok");
    writable = true;
  } catch {
    writable = false;
  }
  return writable;
}

const safeName = (name) => path.basename(String(name));

export async function saveUpload(name, body, contentType) {
  const file = safeName(name);

  if (await canWriteToDisk()) {
    await writeFile(path.join(UPLOAD_DIR, file), body);
    return { url: `/api/uploads/${file}`, persistent: true };
  }

  memory.set(file, { body, contentType });
  return { url: `/api/uploads/${file}`, persistent: false };
}

export async function readUpload(name) {
  const file = safeName(name);

  const held = memory.get(file);
  if (held) return held;

  try {
    const body = await readFile(path.join(UPLOAD_DIR, file));
    return { body, contentType: "image/jpeg" };
  } catch {
    return null;
  }
}

export async function storageIsPersistent() {
  return canWriteToDisk();
}
