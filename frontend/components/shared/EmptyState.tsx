import type { IconType } from "react-icons";

type EmptyStateVariant = "card" | "plain";

type EmptyStateProps = {
  icon: IconType;
  title: string;
  hint?: string;
  variant?: EmptyStateVariant;
};

export function EmptyState({
  icon: Icon,
  title,
  hint,
  variant = "card",
}: EmptyStateProps) {
  const containerClass =
    variant === "plain"
      ? "flex flex-col items-center gap-3 px-6 py-12 text-center"
      : "card flex flex-col items-center gap-3 px-6 py-10 text-center";

  return (
    <section className={containerClass}>
      <span className="flex size-12 items-center justify-center rounded-full bg-background text-primary">
        <Icon aria-hidden className="size-5" />
      </span>
      <p className="m-0 font-heading text-lg font-semibold text-ink">{title}</p>
      {hint ? <p className="m-0 text-sm text-muted-ink">{hint}</p> : null}
    </section>
  );
}
