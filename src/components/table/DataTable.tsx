"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

type DataTableProps<TData extends object> = {
  data: TData[];
  columns: Array<ColumnDef<TData>>;
  emptyText: string;
  page?: number;
  pageSize?: number;
};

export function DataTable<TData extends object>({
  data,
  columns,
  emptyText,
  page = 0,
  pageSize,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // TanStack Table manages row-model helpers internally and is intended for this usage.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: true,
    state: {
      sorting,
    },
  });

  if (data.length === 0) {
    return <p className="mt-3 text-sm text-[color:var(--muted)]">{emptyText}</p>;
  }

  const allRows = table.getRowModel().rows;
  const effectivePageSize = pageSize && pageSize > 0 ? pageSize : allRows.length;
  const totalPages = Math.max(1, Math.ceil(allRows.length / effectivePageSize));
  const currentPage = Math.min(Math.max(0, Math.trunc(page)), totalPages - 1);
  const startIndex = currentPage * effectivePageSize;
  const endIndex = startIndex + effectivePageSize;
  const visibleRows = allRows.slice(startIndex, endIndex);

  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-[color:var(--border)] px-2 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--muted)]"
                >
                  {header.isPlaceholder ? null : (() => {
                    const canSort = header.column.getCanSort();
                    const sortState = header.column.getIsSorted();
                    const sortLabel =
                      sortState === "asc"
                        ? " ▲"
                        : sortState === "desc"
                          ? " ▼"
                          : "";
                    const headerContent = (
                      <>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortLabel}
                      </>
                    );

                    if (!canSort) {
                      return headerContent;
                    }

                    return (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none text-left hover:text-[color:var(--foreground)]"
                      >
                        {headerContent}
                      </button>
                    );
                  })()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {visibleRows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`border-b border-[color:var(--border)] ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-zinc-50"
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2 py-2 align-top">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
