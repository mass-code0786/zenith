import { MessageCircle, Phone } from "lucide-react";
import { callLink, callingDisplay, whatsappDisplay, whatsappLink } from "@/lib/contact";

export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp Zenith Softech at ${whatsappDisplay}`}
        data-ga-event="whatsapp_button_click"
        data-ga-label="Floating WhatsApp button"
        className="flex size-12 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-300 text-slate-950 shadow-[0_0_32px_rgba(16,185,129,0.4)] transition hover:bg-white"
      >
        <MessageCircle className="size-5" />
      </a>
      <a
        href={callLink}
        aria-label={`Call Zenith Softech at ${callingDisplay}`}
        data-ga-event="call_button_click"
        data-ga-label="Floating call button"
        className="flex size-12 items-center justify-center rounded-full border border-blue-300/40 bg-blue-500 text-white shadow-[0_16px_40px_rgba(37,99,235,0.32)] transition hover:bg-blue-400"
      >
        <Phone className="size-5" />
      </a>
    </div>
  );
}
