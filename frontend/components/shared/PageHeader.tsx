type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="m-0 font-hand text-5xl leading-tight text-primary sm:text-6xl">
          {title}
        </h1>
        <svg
          aria-hidden="true"
          viewBox="0 0 160 8"
          fill="none"
          className="w-44 text-accent"
        >
          <path
            d="M2 6 C 28 2, 52 7, 78 4 S 132 2, 158 5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {subtitle ? (
        <p className="m-0 max-w-2xl text-base text-muted-ink">{subtitle}</p>
      ) : null}
    </header>
  );
}
