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

const panelClassName =
  "w-full rounded-[1.4rem] border border-white/80 bg-[linear-gradient(145deg,#ffffff,#f4f0fa)] p-5 shadow-[0_24px_36px_-30px_rgba(52,33,82,0.7),0_1px_0_rgba(255,255,255,0.95)_inset]";

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
      <section className={panelClassName}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Network
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
          Host Domains
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
          Loading domains...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-[1.4rem] border border-[#ffd6ce] bg-[linear-gradient(145deg,#fffaf8,#fff0eb)] p-5 shadow-[0_20px_30px_-30px_rgba(165,64,42,0.85),0_1px_0_rgba(255,255,255,0.95)_inset]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a5402a]/80">
          Network
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[#a5402a]">Host Domains</h2>
        <p className="mt-3 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  return (
    <section className={panelClassName}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Network
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[color:var(--foreground)]">
            Host Domains
          </h2>
          <p className="mt-1 text-xs text-[color:var(--muted)]">
            Domain-level endpoints available in the network.
          </p>
        </div>
        <span className="rounded-full border border-white/85 bg-[#f5f0fb] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--foreground)] shadow-[0_12px_16px_-15px_rgba(43,29,68,0.85),0_1px_0_rgba(255,255,255,0.95)_inset]">
          {domains.length} domains
        </span>
      </div>

      <DataTable
        data={domainRows}
        columns={columns}
        emptyText="No domains found."
        page={currentPage}
        pageSize={PAGE_SIZE}
      />

      {domains.length > 0 ? (
        <>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
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
