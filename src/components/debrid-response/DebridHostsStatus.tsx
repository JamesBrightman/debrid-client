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

const getStatusClass = (status: string): string => {
  if (status === "up") {
    return "text-green-700 bg-green-100";
  }

  if (status === "down") {
    return "text-red-700 bg-red-100";
  }

  return "text-zinc-700 bg-zinc-100";
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
            className={`block w-[80%] rounded px-2 py-0.5 text-center text-xs font-medium ${getStatusClass(row.original.status)}`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        header: "Supported",
        accessorKey: "supported",
        cell: ({ row }) =>
          row.original.supported === 1 ? "Supported" : "Unsupported",
      },
    ],
    [],
  );

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Host Status
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
          Host Status
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
        <h2 className="text-base font-semibold text-[#a5402a]">Host Status</h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  const upCount = hosts.filter((entry) => entry.status === "up").length;
  const downCount = hosts.filter((entry) => entry.status === "down").length;
  const unsupportedCount = hosts.filter(
    (entry) => entry.status === "unsupported",
  ).length;

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Host Status
      </h2>
      <p className="mt-2 py-4">
        🟢 {upCount} up | 🔴 {downCount} down | 🟡 {unsupportedCount}{" "}
        unsupported
      </p>
      {hosts.length === 0 ? (
        <p className="mt-3 text-sm text-[color:var(--muted)]">
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
          <p className="mt-3 text-xs text-[color:var(--muted)]">
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
