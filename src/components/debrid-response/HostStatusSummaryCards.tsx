"use client";

type HostStatusSummaryCardsProps = {
  upCount: number;
  downCount: number;
  unsupportedCount: number;
  className?: string;
};

export const HostStatusSummaryCards: React.FC<HostStatusSummaryCardsProps> = ({
  upCount,
  downCount,
  unsupportedCount,
  className,
}) => {
  const containerClassName = [
    "grid grid-cols-1 gap-2 md:grid-cols-3",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <div className="rounded-xl border border-sage-300 bg-sage-100 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage-800/90">
          Up
        </p>
        <p className="mt-1 text-lg font-semibold text-sage-800">{upCount}</p>
      </div>
      <div className="rounded-xl border border-coral-300 bg-coral-100 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral-700/90">
          Down
        </p>
        <p className="mt-1 text-lg font-semibold text-coral-700">{downCount}</p>
      </div>
      <div className="rounded-xl border border-amber-300 bg-amber-100 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700/90">
          Unsupported
        </p>
        <p className="mt-1 text-lg font-semibold text-amber-700">
          {unsupportedCount}
        </p>
      </div>
    </div>
  );
};

