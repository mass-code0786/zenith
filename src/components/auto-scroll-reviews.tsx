import { Star } from "lucide-react";
import { MotionShell } from "@/components/motion-shell";

type Review = {
  name: string;
  category: string;
  rating: number;
  comment: string;
};

const reviews: Review[] = [
  {
    name: "Rahul Kumar",
    category: "School Management",
    rating: 5,
    comment:
      "Zenith Softech delivered a professional school ERP system that made our admission, fees, attendance, and exam work much easier.",
  },
  {
    name: "Priya Singh",
    category: "CRM Software",
    rating: 5,
    comment:
      "Their CRM helped us manage leads, follow-ups, and customer communication in a much more organized way.",
  },
  {
    name: "Aftab Alam",
    category: "E-Commerce",
    rating: 5,
    comment:
      "We needed a modern online store and Zenith Softech built a fast, secure, and premium e-commerce platform.",
  },
  {
    name: "Neha Verma",
    category: "AI Automation",
    rating: 5,
    comment:
      "The AI chatbot and automation system reduced our manual support work and improved customer response time.",
  },
  {
    name: "Amit Roy",
    category: "Hospital Management",
    rating: 5,
    comment:
      "Their hospital management software helped us manage appointments, patients, billing, and reports smoothly.",
  },
  {
    name: "Karan Patel",
    category: "Mobile App",
    rating: 5,
    comment:
      "Zenith Softech created a clean mobile app with smooth user experience and strong backend functionality.",
  },
  {
    name: "Saba Khan",
    category: "Website Development",
    rating: 5,
    comment:
      "Our company website now looks premium, fast, and professional. The design quality is excellent.",
  },
  {
    name: "Imran Ali",
    category: "POS Billing",
    rating: 5,
    comment:
      "The POS billing software is easy to use and helped us manage sales, stock, invoices, and reports.",
  },
  {
    name: "Anjali Sharma",
    category: "HR Payroll",
    rating: 5,
    comment:
      "Their HR and payroll system made employee management, salary records, and attendance tracking simple.",
  },
  {
    name: "Danish Khan",
    category: "Business Automation",
    rating: 5,
    comment:
      "Zenith Softech automated our daily workflow and saved our team a lot of time.",
  },
  {
    name: "Farhan Siddiqui",
    category: "Blockchain Dashboard",
    rating: 5,
    comment:
      "The Web3 dashboard they created looks premium, secure, and very modern.",
  },
  {
    name: "Ritesh Gupta",
    category: "Custom Software",
    rating: 5,
    comment:
      "They understood our requirements clearly and delivered a custom software solution that matched our business needs.",
  },
];

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card group flex min-h-64 w-[19rem] shrink-0 flex-col justify-between rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/25 transition duration-300 hover:border-blue-300/35 hover:bg-white/[0.065] sm:w-[23rem] sm:p-6">
      <div>
        <div className="flex items-center gap-1 text-blue-200" aria-label={`${review.rating} star rating`}>
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star key={index} className="size-4 fill-current" />
          ))}
        </div>
        <p className="mt-5 text-base leading-7 text-slate-200">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>
      <div className="mt-7 border-t border-white/10 pt-4">
        <p className="text-base font-semibold text-white">{review.name}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {review.category}
        </p>
      </div>
    </article>
  );
}

export function AutoScrollReviews() {
  return (
    <section id="reviews" className="relative py-20 lg:py-28">
      <div className="absolute inset-x-0 top-24 -z-10 mx-auto h-80 max-w-5xl rounded-full bg-blue-600/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionShell className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
            Client feedback
          </p>
          <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl">
            Trusted by Businesses
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Real feedback from clients who transformed their business with Zenith Softech.
          </p>
        </MotionShell>
      </div>

      <div className="review-marquee-mask mt-12 overflow-hidden">
        <div className="review-marquee-track flex w-max gap-4 px-4 sm:px-6 lg:px-8">
          {[...reviews, ...reviews].map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
