import type { FetchError } from "../types/game";

interface Props {
  error: FetchError | null;
  onRetry: () => void;
}

export function ErrorBanner({ error, onRetry }: Props) {
  if (!error) return null;

  return (
    <div
      className="mx-auto my-4 flex max-w-3xl items-center justify-between gap-3 rounded-md border-2 border-red-700
  bg-red-100 px-4 py-2 text-red-900"
    >
      <span>Couldn't load: {error.message}</span>
      <button className="btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
