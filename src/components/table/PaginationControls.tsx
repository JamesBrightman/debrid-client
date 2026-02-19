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
    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
      <button
        type="button"
        aria-label="First page"
        onClick={() => onPageChange(0)}
        disabled={!canPrevious}
        className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-white/80 bg-[linear-gradient(150deg,#ffffff,#f2edf9)] px-2 text-xs font-semibold text-[color:var(--muted)] shadow-[0_14px_18px_-16px_rgba(44,28,71,0.9),0_1px_0_rgba(255,255,255,0.95)_inset] transition hover:text-[color:var(--foreground)] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {"<<"}
      </button>
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrevious}
        className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-white/80 bg-[linear-gradient(150deg,#ffffff,#f2edf9)] px-2 text-xs font-semibold text-[color:var(--muted)] shadow-[0_14px_18px_-16px_rgba(44,28,71,0.9),0_1px_0_rgba(255,255,255,0.95)_inset] transition hover:text-[color:var(--foreground)] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {"<"}
      </button>
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
        className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-white/80 bg-[linear-gradient(150deg,#ffffff,#f2edf9)] px-2 text-xs font-semibold text-[color:var(--muted)] shadow-[0_14px_18px_-16px_rgba(44,28,71,0.9),0_1px_0_rgba(255,255,255,0.95)_inset] transition hover:text-[color:var(--foreground)] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {">"}
      </button>
      <button
        type="button"
        aria-label="Last page"
        onClick={() => onPageChange(safeTotalPages - 1)}
        disabled={!canNext}
        className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-white/80 bg-[linear-gradient(150deg,#ffffff,#f2edf9)] px-2 text-xs font-semibold text-[color:var(--muted)] shadow-[0_14px_18px_-16px_rgba(44,28,71,0.9),0_1px_0_rgba(255,255,255,0.95)_inset] transition hover:text-[color:var(--foreground)] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {">>"}
      </button>

      <span className="ml-1 rounded-full border border-white/80 bg-[#f5f0fb] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--foreground)] shadow-[0_10px_16px_-16px_rgba(44,28,71,0.9),0_1px_0_rgba(255,255,255,0.95)_inset]">
        Page {page + 1} of {safeTotalPages}
      </span>
    </div>
  );
};
