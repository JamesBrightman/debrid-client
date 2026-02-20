"use client";

import { useMemo } from "react";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridHostsStatus } from "@/hooks/useDebridHostsStatus";
import { HostStatusSummaryCards } from "@/components/debrid-response/HostStatusSummaryCards";

export const DebridHostsSummary: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridHostsStatus();

  const { upCount, downCount, unsupportedCount } = useMemo(() => {
    const statusItems = Object.values(data ?? {});

    return {
      upCount: statusItems.filter((entry) => entry.status === "up").length,
      downCount: statusItems.filter((entry) => entry.status === "down").length,
      unsupportedCount: statusItems.filter(
        (entry) => entry.status === "unsupported",
      ).length,
    };
  }, [data]);

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Host health
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Add a token to load host status.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Host health
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading host status...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">Hosts</h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  if (Object.keys(data ?? {}).length === 0) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Host health
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          No host status found.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Host health
      </h2>
      <HostStatusSummaryCards
        upCount={upCount}
        downCount={downCount}
        unsupportedCount={unsupportedCount}
        className="mt-3"
      />
    </section>
  );
};
