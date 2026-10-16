import Link from "next/link";
import { FaArrowRight, FaClipboardList, FaHistory } from "react-icons/fa";
import { StickyNote } from "@/components/home/StickyNote";

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-14 bg-cream px-6 py-16 md:flex-row md:justify-between md:gap-10 md:px-12 md:py-0 lg:px-24">
      <section className="flex w-full max-w-xl flex-col items-start gap-6 text-wine md:min-w-0 md:flex-1">
        <h1 className="font-hand text-5xl leading-tight sm:text-6xl md:text-7xl">
          Welcome to VeeLion
        </h1>

        <p className="font-hand text-2xl leading-snug sm:text-3xl">
          A calm little board to plan your tasks, follow the activity, and read
          the reports.
        </p>

        <Link
          href="/reports"
          className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 font-semibold text-ivory transition hover:bg-rose"
        >
          View Reports
          <FaArrowRight aria-hidden />
        </Link>
      </section>

      <section className="flex shrink-0 flex-wrap items-center justify-center gap-10 md:gap-8">
        <StickyNote
          href="/tasks"
          label="Tasks"
          icon={FaClipboardList}
          rotation="-rotate-2 hover:rotate-[10deg]"
        />
        <StickyNote
          href="/activity"
          label="Activity"
          icon={FaHistory}
          bgClass="bg-ivory"
          textClass="text-rose"
          rotation="rotate-[5deg] hover:rotate-[10deg]"
        />
      </section>
    </main>
  );
}
