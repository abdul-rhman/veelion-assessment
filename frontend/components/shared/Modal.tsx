"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-xl">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5 bg-secondary"
        />

        <div className="flex items-center justify-between gap-4 py-4 pr-4 pl-6">
          <h2 className="m-0 font-hand text-3xl leading-none text-primary">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-ink transition-colors hover:bg-background hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <FaTimes aria-hidden className="size-4" />
          </button>
        </div>

        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
