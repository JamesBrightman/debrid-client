"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTorrentsActiveCount } from "@/hooks/useDebridTorrentsActiveCount";

export const DebridTorrentsActiveCount: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridTorrentsActiveCount();

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-sky-300 bg-sky-50 p-4 shadow-card">
        <h2 className="text-base font-semibold text-slate-900">
          Active Torrents
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add a token to load active torrent count.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-sky-300 bg-sky-50 p-4 shadow-card">
        <h2 className="text-base font-semibold text-slate-900">
          Active Torrents
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Loading active torrent count...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-coral-200 bg-coral-50 p-4 shadow-card-coral">
        <h2 className="text-base font-semibold text-coral-800">
          Active Torrents
        </h2>
        <p className="mt-2 text-sm text-coral-800">{error.message}</p>
      </section>
    );
  }

  const active = data?.nb ?? 0;
  const limit = data?.limit ?? 0;
  const percentage = limit > 0 ? Math.min(100, (active / limit) * 100) : 0;

  return (
    <section className="w-full rounded-xl border border-sky-300 bg-sky-50 p-4 shadow-card">
      <h2 className="text-base font-semibold text-slate-900">
        Active Torrents
      </h2>
      <p className="mt-3 text-2xl font-semibold text-slate-900">
        {active} / {limit}
      </p>
      <div className="mt-3 h-2 rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-coral-800"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
};



