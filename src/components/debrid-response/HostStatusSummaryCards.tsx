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
      <div className="rounded-xl border border-[#a8d39f] bg-[#e4f9de] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2f6f36]/90">
          Up
        </p>
        <p className="mt-1 text-lg font-semibold text-[#2f6f36]">{upCount}</p>
      </div>
      <div className="rounded-xl border border-[#f1b6a8] bg-[#ffe7df] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b1462f]/90">
          Down
        </p>
        <p className="mt-1 text-lg font-semibold text-[#b1462f]">{downCount}</p>
      </div>
      <div className="rounded-xl border border-[#f0cf79] bg-[#fff0c8] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9b6a00]/90">
          Unsupported
        </p>
        <p className="mt-1 text-lg font-semibold text-[#9b6a00]">
          {unsupportedCount}
        </p>
      </div>
    </div>
  );
};
