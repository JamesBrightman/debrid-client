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
      <section className="w-full rounded-xl border border-dashed border-sky-300 bg-sky-50 p-4 shadow-card">
        <h2 className="text-base font-semibold text-slate-900">
          Host health
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add a token to load host status.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-sky-300 bg-sky-50 p-4 shadow-card">
        <h2 className="text-base font-semibold text-slate-900">
          Host health
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Loading host status...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-coral-200 bg-coral-50 p-4 shadow-card-coral">
        <h2 className="text-base font-semibold text-coral-800">Hosts</h2>
        <p className="mt-2 text-sm text-coral-800">{error.message}</p>
      </section>
    );
  }

  if (Object.keys(data ?? {}).length === 0) {
    return (
      <section className="w-full rounded-xl border border-sky-300 bg-sky-50 p-4 shadow-card">
        <h2 className="text-base font-semibold text-slate-900">
          Host health
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          No host status found.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-xl border border-sky-300 bg-sky-50 p-4 shadow-card">
      <h2 className="text-base font-semibold text-slate-900">
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

