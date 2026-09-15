import Image from "next/image";

const BLOBS = [
  { side: "left", x: -180, y: 120, size: 620, color: "rgba(92,132,255,0.5)" },
  { side: "right", x: -140, y: 460, size: 560, color: "rgba(226,114,196,0.4)" },
  { side: "left", x: 300, y: 1200, size: 700, color: "rgba(64,196,208,0.3)" },
  { side: "right", x: -200, y: 1900, size: 640, color: "rgba(126,110,255,0.34)" },
  { side: "left", x: 200, y: 2600, size: 680, color: "rgba(64,196,208,0.26)" },
  { side: "right", x: -160, y: 3300, size: 600, color: "rgba(226,114,196,0.3)" },
];

/**
 * The colour the glass refracts: one photograph at the top of the page and a
 * column of heavily blurred colour fields behind everything else.
 */
export default function Backdrop({ image, alt = "" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[560px] md:h-[760px]">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover opacity-[0.45]" />
        {/* Scrim: photographs vary wildly, so headlines need a guaranteed floor of contrast. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ground/60 via-ground/25 to-transparent" />
      </div>

      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            [blob.side]: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            background: blob.color,
            filter: "blur(130px)",
          }}
        />
      ))}

      <div className="absolute inset-x-0 top-[420px] h-[360px] bg-gradient-to-b from-transparent to-ground md:top-[560px]" />
    </div>
  );
}
