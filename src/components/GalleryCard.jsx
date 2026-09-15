import Image from "next/image";
import Link from "next/link";
import { Panel } from "./Glass";

/**
 * A photograph inside glass: 12px of panel around it, a rounded inner frame,
 * and the caption as a pill sitting on the image rather than a bar beneath it.
 */
export default function GalleryCard({ src, alt, caption, href, height = "h-[300px]", className, sizes = "(max-width: 768px) 100vw, 33vw" }) {
  const inner = (
    <div className={`relative overflow-hidden rounded-[20px] ${height}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized={src.startsWith("/api/")}
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
      />
      {caption ? (
        <span className="glass-pill absolute bottom-4 left-4 right-4 truncate px-5 py-2.5 text-sm">{caption}</span>
      ) : null}
    </div>
  );

  return (
    <Panel className={`group p-3 ${className ?? ""}`}>
      {href ? (
        <Link href={href} className="block rounded-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </Panel>
  );
}
