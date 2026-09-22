const WHATSAPP_NUMBER = "34600000000"; // remplace par le vrai numéro (indicatif pays, sans +)
const WHATSAPP_MESSAGE =
  "¡Hola Sky Emotions! Me gustaría información sobre un salto en tándem.";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="whatsapp-float group"
      style={{
        position: "fixed",
        left: "auto",
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        zIndex: 99999,
      }}
    >
      <span className="pointer-events-none absolute -left-2 top-1/2 hidden -translate-x-full -translate-y-1/2 whitespace-nowrap rounded-md bg-[#111] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
        WhatsApp
      </span>
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 sm:h-9 sm:w-9"
        fill="currentColor"
        aria-hidden
      >
        <path d="M16.04 3C9.39 3 4 8.37 4 14.99c0 2.1.55 4.15 1.6 5.96L4 29l8.25-2.16A12.04 12.04 0 0 0 16.04 27C22.69 27 28 21.63 28 14.99 28 8.37 22.69 3 16.04 3zm0 21.9c-1.8 0-3.56-.48-5.1-1.39l-.37-.22-4.9 1.28 1.31-4.77-.24-.39A9.86 9.86 0 0 1 6.15 15c0-5.45 4.45-9.88 9.89-9.88 5.45 0 9.9 4.43 9.9 9.88 0 5.45-4.45 9.9-9.9 9.9zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.19 5.06 4.47 1.78.77 2.48.84 3.37.71.51-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
