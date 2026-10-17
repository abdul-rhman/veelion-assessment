type SummaryStatCardProps = {
  label: string;
  value: number;
  hint?: string;
};

export function SummaryStatCard({ label, value, hint }: SummaryStatCardProps) {
  return (
    <section className="card flex flex-col gap-2 p-6">
      <small className="micro-label">{label}</small>
      <p className="m-0 font-heading text-4xl font-semibold tracking-tight text-primary">
        {value}
      </p>
      {hint ? <small className="text-xs text-muted-ink">{hint}</small> : null}
    </section>
  );
}
