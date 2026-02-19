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

const panelClassName =
  "w-full rounded-[1.4rem] border border-white/80 bg-[linear-gradient(145deg,#ffffff,#f4f0fa)] p-5 shadow-[0_24px_36px_-30px_rgba(52,33,82,0.7),0_1px_0_rgba(255,255,255,0.95)_inset]";

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
      <section className={panelClassName}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Catalog
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
          Supported Hosts
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
          Loading hosts...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-[1.4rem] border border-[#ffd6ce] bg-[linear-gradient(145deg,#fffaf8,#fff0eb)] p-5 shadow-[0_20px_30px_-30px_rgba(165,64,42,0.85),0_1px_0_rgba(255,255,255,0.95)_inset]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a5402a]/80">
          Catalog
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[#a5402a]">
          Supported Hosts
        </h2>
        <p className="mt-3 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  return (
    <section className={panelClassName}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Catalog
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[color:var(--foreground)]">
            Supported Hosts
          </h2>
          <p className="mt-1 text-xs text-[color:var(--muted)]">
            Provider names, domains, and internal IDs.
          </p>
        </div>
        <span className="rounded-full border border-white/85 bg-[#f5f0fb] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--foreground)] shadow-[0_12px_16px_-15px_rgba(43,29,68,0.85),0_1px_0_rgba(255,255,255,0.95)_inset]">
          {hosts.length} hosts
        </span>
      </div>

      <DataTable
        data={hosts}
        columns={columns}
        emptyText="No hosts found."
        page={currentPage}
        pageSize={PAGE_SIZE}
      />

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
