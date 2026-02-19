"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridHostsStatus } from "@/hooks/useDebridHostsStatus";
import { DataTable } from "@/components/table/DataTable";
import { PaginationControls } from "@/components/table/PaginationControls";

const PAGE_SIZE = 20;

type HostStatusRowData = {
  domain: string;
  name: string;
  status: string;
  supported: number;
};

const panelClassName =
  "w-full rounded-[1.4rem] border border-white/80 bg-[linear-gradient(145deg,#ffffff,#f4f0fa)] p-5 shadow-[0_24px_36px_-30px_rgba(52,33,82,0.7),0_1px_0_rgba(255,255,255,0.95)_inset]";

const getStatusClass = (status: string): string => {
  if (status === "up") {
    return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
  }

  if (status === "down") {
    return "bg-rose-100 text-rose-700 ring-1 ring-rose-200";
  }

  return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
};

const getSupportedClass = (supported: number): string => {
  if (supported === 1) {
    return "bg-sky-100 text-sky-700 ring-1 ring-sky-200";
  }

  return "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200";
};

export const DebridHostsStatus: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridHostsStatus();
  const [page, setPage] = useState(0);
  const hosts = useMemo<Array<HostStatusRowData>>(
    () =>
      Object.entries(data ?? {})
        .map(([domain, item]) => {
          return {
            domain,
            name: item.name,
            status: item.status,
            supported: item.supported,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name)),
    [data],
  );
  const totalPages = Math.max(1, Math.ceil(hosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const columns = useMemo<Array<ColumnDef<HostStatusRowData>>>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Domain",
        accessorKey: "domain",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <span
            className={`inline-flex min-w-20 justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getStatusClass(row.original.status)}`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        header: "Supported",
        accessorKey: "supported",
        cell: ({ row }) => (
          <span
            className={`inline-flex min-w-24 justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getSupportedClass(row.original.supported)}`}
          >
            {row.original.supported === 1 ? "supported" : "unsupported"}
          </span>
        ),
      },
    ],
    [],
  );

  if (!hasKey) {
    return (
      <section className={panelClassName}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Runtime
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
          Host Status
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
          Add a token to load host status.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={panelClassName}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Runtime
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
          Host Status
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
          Loading host status...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-[1.4rem] border border-[#ffd6ce] bg-[linear-gradient(145deg,#fffaf8,#fff0eb)] p-5 shadow-[0_20px_30px_-30px_rgba(165,64,42,0.85),0_1px_0_rgba(255,255,255,0.95)_inset]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a5402a]/80">
          Runtime
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[#a5402a]">Host Status</h2>
        <p className="mt-3 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  const upCount = hosts.filter((entry) => entry.status === "up").length;
  const downCount = hosts.filter((entry) => entry.status === "down").length;
  const unsupportedCount = hosts.filter(
    (entry) => entry.status === "unsupported",
  ).length;

  return (
    <section className={panelClassName}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Runtime
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[color:var(--foreground)]">
            Host Status
          </h2>
          <p className="mt-1 text-xs text-[color:var(--muted)]">
            Real-time operational and support availability by host.
          </p>
        </div>
        <span className="rounded-full border border-white/85 bg-[#f5f0fb] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--foreground)] shadow-[0_12px_16px_-15px_rgba(43,29,68,0.85),0_1px_0_rgba(255,255,255,0.95)_inset]">
          {hosts.length} hosts
        </span>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-white/85 bg-[#ecfdf3] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700/80">
            Up
          </p>
          <p className="mt-1 text-lg font-semibold text-emerald-700">{upCount}</p>
        </div>
        <div className="rounded-xl border border-white/85 bg-[#fff1f1] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-700/80">
            Down
          </p>
          <p className="mt-1 text-lg font-semibold text-rose-700">{downCount}</p>
        </div>
        <div className="rounded-xl border border-white/85 bg-[#fff9e9] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700/80">
            Unsupported
          </p>
          <p className="mt-1 text-lg font-semibold text-amber-700">
            {unsupportedCount}
          </p>
        </div>
      </div>

      {hosts.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-[color:var(--border)] px-4 py-5 text-sm text-[color:var(--muted)]">
          No host status found.
        </p>
      ) : (
        <DataTable
          data={hosts}
          columns={columns}
          emptyText="No host status found."
          page={currentPage}
          pageSize={PAGE_SIZE}
        />
      )}

      {hosts.length > 0 ? (
        <>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
            Total rows: {hosts.length}
          </p>
          <PaginationControls
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(nextPage) =>
              setPage(Math.min(Math.max(0, nextPage), totalPages - 1))
            }
          />
        </>
      ) : null}
    </section>
  );
};
