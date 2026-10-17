import Link from "next/link";
import { FaThumbtack } from "react-icons/fa";
import type { IconType } from "react-icons";

type StickyNoteProps = {
  href: string;
  label: string;
  icon: IconType;
  bgClass?: string;
  textClass?: string;
  iconClass?: string;
  rotation?: string;
};

export function StickyNote({
  href,
  label,
  icon: Icon,
  bgClass = "bg-secondary",
  textClass = "text-ink",
  iconClass = "text-primary",
  rotation = "",
}: StickyNoteProps) {
  return (
    <div className="group relative h-40 w-40 lg:h-50 lg:w-50">
      <Link
        href={href}
        className={`flex h-full w-full origin-[81%_0%] flex-col items-center justify-center gap-3 rounded-sm lg:origin-[84%_0%] ${bgClass} ${textClass} shadow-[0_18px_36px_-18px_rgba(31,46,54,0.35)] transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover:scale-105 ${rotation}`}
      >
        <Icon aria-hidden className={`size-7.5 lg:size-9.5 ${iconClass}`} />
        <span className="font-heading text-2xl font-semibold">{label}</span>
      </Link>
      <FaThumbtack
        size={30}
        aria-hidden
        className="absolute -top-4 right-4 z-10 rotate-45 text-accent"
      />
    </div>
  );
}
