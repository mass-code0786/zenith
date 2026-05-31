import Image from "next/image";
import { RequestDemoModal } from "@/components/request-demo-modal";

type DemoCardProps = {
  demo: {
    title: string;
    description: string;
    category: string;
    imageUrl?: string | null;
    videoUrl?: string | null;
    liveLink?: string | null;
    downloadUrl?: string | null;
  };
};

export function DemoCard({ demo }: DemoCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-blue-300/40">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-950">
        {demo.videoUrl ? (
          <video src={demo.videoUrl} controls className="h-full w-full object-cover" />
        ) : demo.imageUrl ? (
          <Image src={demo.imageUrl} alt={demo.title} fill className="object-cover" />
        ) : (
          <div className="relative h-full w-full p-5">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.3),rgba(15,23,42,0.96)_58%,rgba(124,58,237,0.18))]" />
            <div className="relative grid h-full grid-cols-3 gap-3">
              <span className="col-span-2 rounded-md border border-white/10 bg-white/10" />
              <span className="rounded-md border border-blue-300/25 bg-blue-300/15" />
              <span className="rounded-md border border-white/10 bg-white/8" />
              <span className="col-span-2 rounded-md border border-white/10 bg-white/10" />
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <span className="rounded-full border border-blue-300/25 bg-blue-300/10 px-3 py-1 text-xs font-medium text-blue-100">
            {demo.category}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-white">{demo.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{demo.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {demo.liveLink ? (
            <a
              href={demo.liveLink}
              className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400"
              target={demo.liveLink.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              View Demo
            </a>
          ) : null}
          <RequestDemoModal software={demo.title} />
          {demo.downloadUrl ? (
            <a
              href={demo.downloadUrl}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-blue-300/50"
            >
              Download
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
