import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FloatingContact } from "@/components/floating-contact";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { ContactCards, OfficeMapSection } from "@/components/office-location";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <FloatingContact />
      <main className="bg-black text-white">
        <section className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-10">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm font-semibold text-slate-400 transition hover:text-white"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to home
              </Link>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-blue-200 lg:mt-10">
                Contact Zenith Softech
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:mt-5">
                Start your software consultation.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mt-6">
                Share your software, AI, ERP, CRM, mobile app, or automation
                requirement. Our team will review it and contact you.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/25 sm:p-6">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
          <div className="mx-auto max-w-7xl">
            <ContactCards />
          </div>
        </section>

        <OfficeMapSection />
      </main>
      <Footer />
    </>
  );
}
