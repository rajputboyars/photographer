import Backdrop from "./Backdrop";

/**
 * Every page is a dark ground, a backdrop of photograph plus colour, and a
 * stack of glass panels floating over it.
 */
export default function PageShell({ image, imageAlt = "", children }) {
  return (
    <div className="relative overflow-hidden">
      <Backdrop image={image} alt={imageAlt} />
      <div className="relative mx-auto max-w-site px-4 py-10 md:px-11 md:py-12">{children}</div>
    </div>
  );
}
