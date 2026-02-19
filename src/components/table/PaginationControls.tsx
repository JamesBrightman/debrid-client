"use client";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const canPrevious = page > 0;
  const canNext = page < totalPages - 1;
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
      <button
        type="button"
        aria-label="First page"
        onClick={() => onPageChange(0)}
        disabled={!canPrevious}
        className="h-8 min-w-8 rounded border border-[color:var(--border)] px-2 text-[color:var(--muted)] hover:bg-[color:var(--surface-soft)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {"<<"}
      </button>
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrevious}
        className="h-8 min-w-8 rounded border border-[color:var(--border)] px-2 text-[color:var(--muted)] hover:bg-[color:var(--surface-soft)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {"<"}
      </button>
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
        className="h-8 min-w-8 rounded border border-[color:var(--border)] px-2 text-[color:var(--muted)] hover:bg-[color:var(--surface-soft)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {">"}
      </button>
      <button
        type="button"
        aria-label="Last page"
        onClick={() => onPageChange(safeTotalPages - 1)}
        disabled={!canNext}
        className="h-8 min-w-8 rounded border border-[color:var(--border)] px-2 text-[color:var(--muted)] hover:bg-[color:var(--surface-soft)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {">>"}
      </button>

      <span className="px-2 font-medium text-[color:var(--foreground)]">
        Page {page + 1} of {safeTotalPages}
      </span>
    </div>
  );
};
