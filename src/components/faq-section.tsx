"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

const faqs = [
  {
    question: "What services does Zenith Softech provide?",
    answer:
      "Zenith Softech provides custom software development, website development, mobile apps, ERP systems, CRM platforms, AI solutions, automation tools, e-commerce platforms, and blockchain-based applications.",
  },
  {
    question: "Can Zenith Softech build custom software for my business?",
    answer:
      "Yes, we develop fully customized software according to your business requirements, workflow, and future growth plans.",
  },
  {
    question: "Do you provide software demos before development?",
    answer:
      "Yes, users can request a demo through our website and our team will provide a suitable demonstration.",
  },
  {
    question: "How long does software development take?",
    answer:
      "Project timelines depend on complexity. Small projects may take a few weeks while enterprise systems may require several months.",
  },
  {
    question: "Do you develop mobile applications?",
    answer: "Yes, we develop Android, iOS, and cross-platform mobile applications.",
  },
  {
    question: "Can you develop ERP software?",
    answer:
      "Yes, we build complete ERP solutions for schools, hospitals, businesses, inventory management, HR, and finance operations.",
  },
  {
    question: "Do you build CRM systems?",
    answer:
      "Yes, we develop CRM systems for customer management, sales tracking, lead management, and automation.",
  },
  {
    question: "Do you offer AI solutions?",
    answer:
      "Yes, we build AI chatbots, AI agents, AI automation systems, and intelligent business tools.",
  },
  {
    question: "Do you provide website development services?",
    answer:
      "Yes, we create modern, responsive, SEO-friendly, and high-performance websites.",
  },
  {
    question: "Can Zenith Softech build e-commerce platforms?",
    answer:
      "Yes, we develop scalable e-commerce websites and marketplaces with payment integration and inventory management.",
  },
  {
    question: "Do you provide software maintenance?",
    answer:
      "Yes, we offer software maintenance, updates, bug fixes, and long-term technical support.",
  },
  {
    question: "Is technical support available after project delivery?",
    answer:
      "Yes, our support team provides assistance even after successful project deployment.",
  },
  {
    question: "Can I request modifications after development?",
    answer:
      "Yes, additional features and modifications can be added based on your requirements.",
  },
  {
    question: "Do you provide hosting and deployment services?",
    answer:
      "Yes, we assist with hosting setup, cloud deployment, server management, and production launch.",
  },
  {
    question: "Do you build school management software?",
    answer:
      "Yes, we provide complete school ERP solutions including admissions, attendance, exams, fees, and reporting.",
  },
  {
    question: "Do you build hospital management software?",
    answer:
      "Yes, we develop hospital and clinic management systems with patient records, billing, appointments, and reporting.",
  },
  {
    question: "Is my project information secure?",
    answer:
      "Yes, we follow industry-standard security practices and maintain strict confidentiality.",
  },
  {
    question: "Can I get a project quotation before starting?",
    answer:
      "Yes, we provide detailed consultations and quotations based on your project requirements.",
  },
  {
    question: "What technologies does Zenith Softech use?",
    answer:
      "We work with modern technologies including Next.js, React, Node.js, TypeScript, PostgreSQL, AI frameworks, cloud services, and blockchain technologies.",
  },
  {
    question: "How can I contact Zenith Softech?",
    answer:
      "You can contact us via WhatsApp at +91 8757050254 or call us at +91 80765 68969 for consultations and project discussions.",
  },
];

export function FaqSection() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return faqs;
    }

    return faqs.filter((faq) =>
      `${faq.question} ${faq.answer}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <section id="faq" className="relative px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-28">
      <div className="absolute inset-x-0 top-8 -z-10 mx-auto h-64 max-w-4xl rounded-full bg-blue-600/10 blur-3xl lg:top-10 lg:h-96" />
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:mt-5">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mt-6">
            Find answers about Zenith Softech&apos;s software development, AI
            solutions, ERP, CRM, mobile applications, and business automation
            services.
          </p>

          <label className="relative mt-5 block max-w-xl lg:mt-8">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpenIndex(0);
              }}
              placeholder="Search FAQ"
              className="w-full rounded-full border border-white/10 bg-white/[0.045] py-3.5 pl-12 pr-5 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 focus:border-blue-300/60 focus:bg-white/[0.065] sm:py-4"
            />
          </label>
        </div>

        <div className="grid gap-3 lg:gap-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.035] transition hover:border-blue-300/35 hover:bg-white/[0.055]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-base font-semibold leading-6 text-white sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-blue-200 transition duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
                    >
                      <p className="border-t border-white/10 px-5 py-4 text-sm leading-7 text-slate-300 sm:px-6 sm:py-5 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}

          {!filteredFaqs.length ? (
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-6 text-sm text-slate-400">
              No FAQ found for your search.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
