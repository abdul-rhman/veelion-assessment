const SKELETON_ROWS = 4;

export function LedgerSkeleton() {
  return (
    <div role="status" className="flex flex-col">
      <span className="sr-only">Loading tasks...</span>

      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 border-b border-primary/15 px-4 py-4 last:border-b-0"
        >
          <span
            aria-hidden="true"
            className="size-7 shrink-0 animate-pulse rounded-md border-2 border-line bg-background/70"
          />
          <span
            aria-hidden="true"
            className="ml-4 h-3.5 w-7 shrink-0 animate-pulse rounded-full bg-background"
          />
          <span
            aria-hidden="true"
            className="h-3.5 flex-1 animate-pulse rounded-full bg-background"
          />
          <span
            aria-hidden="true"
            className="hidden h-3 w-28 animate-pulse rounded-full bg-background sm:block"
          />
        </div>
      ))}
    </div>
  );
}
