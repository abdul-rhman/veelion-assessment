import Link from "next/link";
import { FaArrowRight, FaClipboardList, FaHistory } from "react-icons/fa";
import { StickyNote } from "@/components/home/StickyNote";

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-14 px-6 py-16 md:grid md:grid-cols-[7fr_5fr] md:items-center md:gap-16 md:px-12 md:py-12 lg:px-16">
      <section className="flex w-full max-w-xl flex-col items-start gap-6 md:max-w-none">
        <h1 className="m-0 font-hand text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl xl:text-8xl">
          Welcome to <span className="text-primary">Tackboard</span>
        </h1>

        <p className="m-0 max-w-md text-lg text-muted-ink sm:text-xl">
          A calm little board to pin up your tasks, follow the activity, and
          read the reports.
        </p>

        <Link
          href="/reports"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Open the reports
          <FaArrowRight aria-hidden />
        </Link>
      </section>

      <section className="flex flex-wrap items-center justify-center gap-10 md:gap-8">
        <StickyNote
          href="/tasks"
          label="Tasks"
          icon={FaClipboardList}
          bgClass="bg-secondary"
          textClass="text-ink"
          iconClass="text-accent-strong"
          rotation="-rotate-2 group-hover:rotate-[10deg]"
        />
        <StickyNote
          href="/activity"
          label="Activity"
          icon={FaHistory}
          bgClass="bg-info"
          textClass="text-ink"
          iconClass="text-primary"
          rotation="rotate-[5deg] group-hover:rotate-[10deg]"
        />
      </section>
    </main>
  );
}
