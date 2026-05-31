import { Background } from "@/components/background";
import { DemoCard } from "@/components/demo-card";
import { FloatingContact } from "@/components/floating-contact";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { prisma } from "@/lib/prisma";
import { featuredFallbackDemos } from "@/lib/site-data";

export const dynamic = "force-dynamic";

async function getDemos() {
  try {
    const demos = await prisma.demo.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return demos.length ? demos : featuredFallbackDemos;
  } catch {
    return featuredFallbackDemos;
  }
}

export default async function DemosPage() {
  const demos = await getDemos();

  return (
    <>
      <Background />
      <Nav />
      <FloatingContact />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="max-w-3xl py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Demo library</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-6xl">Uploaded product demos</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Every published demo from the admin panel appears here with screenshots, optional video, category, live links, and downloads.
          </p>
        </section>
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {demos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
