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
  "w-full rounded-[1.4rem] border border-ocean-100 bg-gradient-to-br from-white to-ocean-50 p-5 shadow-card";

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
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Catalog
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          Supported Hosts
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-sky-300 px-4 py-4 text-sm text-slate-600">
          Loading hosts...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-[1.4rem] border border-coral-200 bg-gradient-to-br from-coral-50 to-coral-100 p-5 shadow-card-coral">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-coral-700/85">
          Catalog
        </p>
        <h2 className="mt-2 text-lg font-semibold text-coral-700">
          Supported Hosts
        </h2>
        <p className="mt-3 text-sm text-coral-700">{error.message}</p>
      </section>
    );
  }

  return (
    <section className={panelClassName}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Catalog
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Supported Hosts
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Provider names, domains, and internal IDs.
          </p>
        </div>
        <span className="rounded-full border border-ocean-200 bg-ocean-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-800">
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
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-600">
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



