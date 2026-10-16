type SummaryStatCardProps = {
  label: string;
  value: number;
  hint?: string;
};

export function SummaryStatCard({ label, value, hint }: SummaryStatCardProps) {
  return (
    <section className="card" style={{ padding: "1rem", display: "grid", gap: "0.25rem" }}>
      <small style={{ color: "var(--muted)" }}>{label}</small>
      <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 700 }}>{value}</p>
      {hint ? <small style={{ color: "var(--muted)" }}>{hint}</small> : null}
    </section>
  );
}
