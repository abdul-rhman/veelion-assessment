"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaThumbtack } from "react-icons/fa";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/tasks", label: "Tasks" },
  { href: "/activity", label: "Activity" },
  { href: "/reports", label: "Reports" },
];

export function AppNav() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur">
      <nav
        aria-label="Sections"
        className="mx-auto flex h-16 w-full max-w-[var(--page-max)] items-center justify-between gap-4 px-[var(--page-gutter)]"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-hand text-3xl leading-none text-primary transition-colors hover:text-accent"
        >
          <FaThumbtack aria-hidden className="size-5 rotate-45" />
          Tackboard
        </Link>

        <ul className="flex items-end gap-1 self-stretch sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-11 items-center rounded-t-lg border border-b-0 px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    active
                      ? "-mb-px border-line bg-background text-primary"
                      : "border-transparent text-muted-ink hover:bg-background/70 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
