"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDebridHostsDomains } from "@/hooks/useDebridHostsDomains";
import { DataTable } from "@/components/table/DataTable";
import { PaginationControls } from "@/components/table/PaginationControls";

const PAGE_SIZE = 20;

type HostDomainRow = {
  domain: string;
};

export const DebridHostsDomains: React.FC = () => {
  const { data, isLoading, error } = useDebridHostsDomains();
  const [page, setPage] = useState(0);
  const domains = useMemo(
    () => [...(data ?? [])].sort((a, b) => a.localeCompare(b)),
    [data],
  );
  const totalPages = Math.max(1, Math.ceil(domains.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const domainRows = useMemo<Array<HostDomainRow>>(
    () => domains.map((domain) => ({ domain })),
    [domains],
  );
  const columns = useMemo<Array<ColumnDef<HostDomainRow>>>(
    () => [
      {
        header: "Domain",
        accessorKey: "domain",
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Host Domains
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading domains...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">Host Domains</h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Host Domains
      </h2>
      <DataTable
        data={domainRows}
        columns={columns}
        emptyText="No domains found."
        page={currentPage}
        pageSize={PAGE_SIZE}
      />
      {domains.length > 0 ? (
        <>
          <p className="mt-3 text-xs text-[color:var(--muted)]">
            Total rows: {domains.length}
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
