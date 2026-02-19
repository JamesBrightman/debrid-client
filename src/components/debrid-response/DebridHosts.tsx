"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDebridHosts } from "@/hooks/useDebridHosts";
import { DataTable } from "@/components/table/DataTable";
import { PaginationControls } from "@/components/table/PaginationControls";

const PAGE_SIZE = 20;

type HostRow = {
  name: string;
  domain: string;
  id: string;
};

export const DebridHosts: React.FC = () => {
  const { data, isLoading, error } = useDebridHosts();
  const [page, setPage] = useState(0);
  const hosts = useMemo(
    () =>
      Object.entries(data ?? {})
        .map(([domain, item]) => ({
          name: item.name,
          domain,
          id: item.id,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [data],
  );
  const totalPages = Math.max(1, Math.ceil(hosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const columns = useMemo<Array<ColumnDef<HostRow>>>(
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
        header: "ID",
        accessorKey: "id",
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Supported Hosts
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading hosts...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">
          Supported Hosts
        </h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Supported Hosts
      </h2>
      <DataTable
        data={hosts}
        columns={columns}
        emptyText="No hosts found."
        page={currentPage}
        pageSize={PAGE_SIZE}
      />
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
