import Link from "next/link";
import { FaThumbtack } from "react-icons/fa";
import type { IconType } from "react-icons";

type StickyNoteProps = {
  href: string;
  label: string;
  icon: IconType;
  bgClass?: string;
  textClass?: string;
  rotation?: string;
};

export function StickyNote({
  href,
  label,
  icon: Icon,
  bgClass = "bg-rose",
  textClass = "text-ivory",
  rotation = "",
}: StickyNoteProps) {
  return (
    <Link
      href={href}
      className={`relative flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-sm ${bgClass} ${textClass} shadow-[6px_10px_16px_rgba(128,0,32,0.25)] transition-transform hover:scale-105 lg:h-50 lg:w-50 ${rotation}`}
    >
      <FaThumbtack
        size={30}
        aria-hidden
        className="absolute -top-4 right-4 rotate-45 text-wine"
      />
      <Icon aria-hidden className="size-7.5 lg:size-9.5" />
      <span className="font-hand text-3xl leading-none lg:text-4xl">
        {label}
      </span>
    </Link>
  );
}
