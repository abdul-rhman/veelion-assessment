import { FaExclamationTriangle } from "react-icons/fa";

type ErrorBannerProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <section className="card flex flex-wrap items-center justify-between gap-3 border-danger/30 bg-danger/5 p-4">
      <p className="m-0 flex items-center gap-2 text-sm font-medium text-danger">
        <FaExclamationTriangle aria-hidden />
        {message}
      </p>
      <button type="button" className="button" onClick={onRetry}>
        Retry
      </button>
    </section>
  );
}
