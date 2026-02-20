"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridHostsStatus } from "@/hooks/useDebridHostsStatus";
import { DataTable } from "@/components/table/DataTable";
import { PaginationControls } from "@/components/table/PaginationControls";
import { HostStatusSummaryCards } from "@/components/debrid-response/HostStatusSummaryCards";

const PAGE_SIZE = 20;

type HostStatusRowData = {
  domain: string;
  name: string;
  status: string;
  supported: number;
};

const panelClassName =
  "w-full rounded-[1.4rem] border border-[#e9f0ff] bg-[linear-gradient(145deg,#ffffff,#ebf3ff)] p-5 shadow-[0_22px_34px_-30px_rgba(72,105,203,0.42),0_1px_0_rgba(255,255,255,0.95)_inset]";

const getStatusClass = (status: string): string => {
  if (status === "up") {
    return "bg-[#dcf4d5] text-[#2f6f36] ring-1 ring-[#a8d39f]";
  }

  if (status === "down") {
    return "bg-[#ffe0da] text-[#b1462f] ring-1 ring-[#f1b6a8]";
  }

  return "bg-[#ffeab8] text-[#9b6a00] ring-1 ring-[#f0cf79]";
};

const getSupportedClass = (supported: number): string => {
  if (supported === 1) {
    return "bg-[#dcebff] text-[#1f4f9b] ring-1 ring-[#a8c3f5]";
  }

  return "bg-[#eceff3] text-[#4e5766] ring-1 ring-[#cbd2dd]";
};

export const DebridHostsStatus: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridHostsStatus();
  const [page, setPage] = useState(0);
  const hosts = useMemo<Array<HostStatusRowData>>(
    () =>
      Object.entries(data ?? {})
        .map(([domain, item]) => ({
          domain,
          name: item.name,
          status: item.status,
          supported: item.supported,
        }))
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
      <section className="w-full rounded-[1.4rem] border border-[#f5c5b3] bg-[linear-gradient(145deg,#fff9f5,#ffece2)] p-5 shadow-[0_20px_30px_-30px_rgba(186,88,54,0.55),0_1px_0_rgba(255,255,255,0.95)_inset]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b25533]/85">
          Runtime
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[#b25533]">
          Host Status
        </h2>
        <p className="mt-3 text-sm text-[#b25533]">{error.message}</p>
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
        <span className="rounded-full border border-[#b9ceff] bg-[#dce8ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#264a93]">
          {hosts.length} hosts
        </span>
      </div>

      <HostStatusSummaryCards
        upCount={upCount}
        downCount={downCount}
        unsupportedCount={unsupportedCount}
        className="mt-4"
      />

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
