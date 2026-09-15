// Validating and processing an uploaded photograph.
//
// Photographers upload 8MB frames straight off the card, so everything is
// resized and re-encoded before it is stored: a long edge of 2000px is plenty
// for a full-width hero and keeps pages fast.

import sharp from "sharp";
import { saveUpload } from "./storage";

export const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/tiff"];
export const MAX_BYTES = 25 * 1024 * 1024;
const MAX_EDGE = 2000;

const slug = (value) =>
  String(value || "photo")
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "photo";

export async function processUpload(file) {
  if (!ACCEPTED.includes(file.type)) {
    return { error: `That file is a ${file.type || "unknown type"}. Use a JPEG, PNG, WebP, AVIF or TIFF.` };
  }
  if (file.size > MAX_BYTES) {
    return { error: `That file is ${(file.size / 1024 / 1024).toFixed(1)}MB. The limit is 25MB.` };
  }

  const input = Buffer.from(await file.arrayBuffer());

  let image;
  let meta;
  try {
    image = sharp(input, { failOn: "error" }).rotate();
    meta = await image.metadata();
  } catch {
    return { error: "That file could not be read as an image." };
  }

  if (!meta.width || !meta.height) {
    return { error: "That file could not be read as an image." };
  }

  const body = await image
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer();

  const name = `${slug(file.name)}-${Date.now().toString(36)}.jpg`;
  const saved = await saveUpload(name, body, "image/jpeg");
  const out = await sharp(body).metadata();

  return {
    upload: {
      name,
      url: saved.url,
      persistent: saved.persistent,
      width: out.width,
      height: out.height,
      bytes: body.length,
      originalName: file.name,
      uploadedAt: new Date().toISOString(),
    },
  };
}
