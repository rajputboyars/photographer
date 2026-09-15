"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";

const ACCEPT = "image/jpeg,image/png,image/webp,image/avif,image/tiff";

export default function PhotoUploader({ uploads = [], persistent = true, targetInputId }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState([]);
  const [picked, setPicked] = useState(null);
  // Newly uploaded files are held here rather than refreshing the route: a
  // refresh re-renders the gallery form alongside and discards anything
  // half-typed into it.
  const [fresh, setFresh] = useState([]);
  const all = [...fresh, ...uploads];

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
      else if (!response.ok) setErrors([{ name: "Upload", error: data.error || `Failed (${response.status})` }]);

      if (data.uploads?.length) setFresh((current) => [...data.uploads, ...current]);
    } catch {
      setErrors([{ name: "Upload", error: "The upload did not reach the server." }]);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  /** Put the path straight into the cover field, and copy it as a fallback. */
  async function use(url) {
    const target = targetInputId ? document.getElementById(targetInputId) : null;
    if (target) {
      target.value = url;
      target.dispatchEvent(new Event("input", { bubbles: true }));
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard is not available in every browser context */
    }
    setPicked(url);
    setTimeout(() => setPicked(null), 1800);
  }

  return (
    <div className="flex flex-col gap-4">
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
        className={`flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-10 text-center transition ${
          dragging ? "border-accent/70 bg-accent/[0.07]" : "border-white/20 bg-white/[0.02]"
        }`}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05]">
          <Icon name="images" className="h-5 w-5 text-accent" />
        </span>

        <div className="flex flex-col gap-1">
          <p className="text-[15px]">{busy ? "Uploading…" : "Drop photographs here"}</p>
          <p className="text-[13px] text-ink/50">
            JPEG, PNG, WebP, AVIF or TIFF · up to 25MB each · resized to 2000px on the long edge
          </p>
        </div>

        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="rounded-xl border border-white/20 px-4 py-2 text-[14px] text-ink/85 transition hover:border-white/40 disabled:opacity-50"
        >
          Choose files
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          onChange={(e) => send(e.target.files)}
        />
      </div>

      {!persistent ? (
        <p className="rounded-xl border border-amber-300/25 bg-amber-300/[0.08] px-4 py-3 text-[13px] leading-relaxed text-amber-100/85">
          This host has a read-only filesystem, so uploads are held in memory and disappear when the server restarts.
          Add object storage (Vercel Blob, S3, Cloudinary) in <code className="rounded bg-black/30 px-1">src/lib/storage.js</code> to keep them.
        </p>
      ) : null}

      {errors.length ? (
        <ul className="flex flex-col gap-1.5 rounded-xl border border-rose-400/30 bg-rose-400/[0.08] px-4 py-3">
          {errors.map((e, i) => (
            <li key={i} className="text-[13px] leading-relaxed text-rose-200">
              <span className="text-rose-200/70">{e.name}:</span> {e.error}
            </li>
          ))}
        </ul>
      ) : null}

      {all.length ? (
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] text-ink/50">
            {all.length} uploaded — click one to {targetInputId ? "use it as the cover" : "copy its path"}
          </span>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
            {all.map((upload) => (
              <button
                key={upload.name}
                type="button"
                onClick={() => use(upload.url)}
                title={`${upload.originalName} · ${upload.width}×${upload.height} · ${Math.round(upload.bytes / 1024)}KB`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/12"
              >
                <Image src={upload.url} alt={upload.originalName} fill sizes="160px" className="object-cover" unoptimized />
                <span
                  className={`absolute inset-0 flex items-center justify-center bg-ground/75 px-2 text-center text-[12px] leading-tight transition ${
                    picked === upload.url ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {picked === upload.url ? "Set" : targetInputId ? "Use as cover" : "Copy path"}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
