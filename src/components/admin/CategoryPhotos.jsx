"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { attachPhotos } from "@/app/(admin)/admin/actions";

const ACCEPT = "image/jpeg,image/png,image/webp,image/avif,image/tiff";

/**
 * Upload photographs straight into one category of a gallery: the files go to
 * /api/uploads, then a server action attaches the returned URLs.
 */
export default function CategoryPhotos({ slug, category }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState([]);
  const [added, setAdded] = useState([]);

  async function send(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    setBusy(true);
    setErrors([]);

    const body = new FormData();
    files.forEach((file) => body.append("files", file));

    try {
      const response = await fetch("/api/uploads", { method: "POST", body });
      const data = await response.json().catch(() => ({}));

      if (data.errors?.length) setErrors(data.errors);
      if (!response.ok && !data.uploads?.length) {
        setErrors((current) => [...current, { name: "Upload", error: data.error || `Failed (${response.status})` }]);
      }

      if (data.uploads?.length) {
        const result = await attachPhotos({
          slug,
          category,
          photos: data.uploads.map((upload) => ({ url: upload.url, title: `${category} — ${upload.originalName}` })),
        });

        if (result?.error) setErrors((current) => [...current, { name: "Attach", error: result.error }]);
        else {
          // Show them immediately; the refresh brings the server copy in behind.
          setAdded((current) => [...data.uploads, ...current]);
          router.refresh();
        }
      }
    } catch {
      setErrors([{ name: "Upload", error: "The upload did not reach the server." }]);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          send(e.dataTransfer.files);
        }}
        className={`flex flex-wrap items-center justify-center gap-3 rounded-xl border border-dashed px-4 py-5 text-center transition ${
          dragging ? "border-accent/70 bg-accent/[0.07]" : "border-white/18 bg-white/[0.02]"
        }`}
      >
        <span className="text-[14px] text-ink/65">
          {busy ? "Uploading…" : `Drop photographs into ${category}`}
        </span>
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-[13px] text-ink/85 transition hover:border-white/40 disabled:opacity-50"
        >
          <Icon name="plus" className="h-3.5 w-3.5" />
          Add photographs
        </button>
        <input ref={inputRef} type="file" accept={ACCEPT} multiple className="hidden" onChange={(e) => send(e.target.files)} />
      </div>

      {errors.length ? (
        <ul className="flex flex-col gap-1.5 rounded-xl border border-rose-400/30 bg-rose-400/[0.08] px-4 py-3">
          {errors.map((e, i) => (
            <li key={i} className="text-[13px] leading-relaxed text-rose-200">
              <span className="text-rose-200/70">{e.name}:</span> {e.error}
            </li>
          ))}
        </ul>
      ) : null}

      {added.length ? (
        <div className="flex items-center gap-2 text-[13px] text-emerald-200/90">
          <Icon name="check" className="h-3.5 w-3.5" />
          {added.length} added to {category}
        </div>
      ) : null}
    </div>
  );
}
