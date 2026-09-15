// Demo-grade sign-in for the admin area.
//
// One shared password, checked against ADMIN_PASSWORD (default "demo"), and an
// HMAC-signed cookie holding the expiry. Good enough to keep the demo behind a
// door; NOT good enough for production — before this handles real enquiries,
// replace it with per-user accounts and hashed passwords. Call sites only use
// checkPassword/createSession/verifySession/SESSION_COOKIE, so the swap is
// contained.
//
// Uses Web Crypto rather than node:crypto so the same code runs in middleware
// (Edge runtime) and in server actions (Node).

export const SESSION_COOKIE = "isha_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8;

const encoder = new TextEncoder();
const secret = () => process.env.ADMIN_SESSION_SECRET || "demo-session-secret-change-me";
const password = () => process.env.ADMIN_PASSWORD || "demo";

const base64url = (bytes) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function sign(value) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

/** Constant-time compare, so a wrong password cannot be found byte by byte. */
function equal(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function checkPassword(candidate) {
  return equal(String(candidate ?? ""), password());
}

export async function createSession() {
  const expires = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return { value: `${expires}.${await sign(expires)}`, maxAge: MAX_AGE_SECONDS };
}

export async function verifySession(token) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!equal(signature, await sign(payload))) return false;
  return Number(payload) > Date.now();
}
