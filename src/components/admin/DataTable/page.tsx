"use client";

import { useState, useEffect, Pagination, Button } from "./import";

interface AdminDataTableColumn<T> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
}

interface PaginatedResult<T> {
  rows: T[];
  totalCount: number;
}

interface AdminDataTableProps<T> {
  heading: string;
  emptyText: string;
  itemsPerPage: number;
  columns: AdminDataTableColumn<T>[];
  fetchPage: (page: number, search: string) => Promise<PaginatedResult<T>>;
  rowKey: (row: T) => string;
  refreshKey?: number;
  searchPlaceholder?: string;
  onAddNew?: () => void;
  addNewLabel?: string;
}

export default function AdminDataTable<T>({
  heading,
  emptyText,
  itemsPerPage,
  columns,
  fetchPage,
  rowKey,
  refreshKey = 0,
  searchPlaceholder,
  onAddNew,
  addNewLabel = "Add New",
}: AdminDataTableProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    setLoading(true);
    fetchPage(currentPage, debouncedSearch).then(({ rows, totalCount }) => {
      setRows(rows);
      setTotalCount(totalCount);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearch, refreshKey]);

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  return (
    <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-normal text-[#101010]">{heading}</h2>
        {!loading && totalCount > 0 && (
          <span className="font-sans text-xs text-[#10101099]">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {(searchPlaceholder || onAddNew) && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {searchPlaceholder ? (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg border border-[#DBDBDB] px-4 py-2 font-sans text-sm text-[#101010]
              outline-none transition-colors focus:border-[#D89593] sm:max-w-70"
            />
          ) : (
            <span />
          )}
          {onAddNew && (
            <Button variant="primary" onClick={onAddNew} className="shrink-0">
              {addNewLabel}
            </Button>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16" aria-label="Loading">
          <svg className="animate-spin w-8 h-8 text-[#D89593]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      ) : rows.length === 0 ? (
        <p className="mt-4 font-sans text-sm text-[#10101099]">{emptyText}</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-140 text-left">
            <thead>
              <tr className="border-b border-[#DBDBDB]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="py-3 pr-4 font-sans text-xs font-semibold uppercase text-[#10101099]"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DBDBDB]">
              {rows.map((row) => (
                <tr key={rowKey(row)}>
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 pr-4 font-sans text-sm text-[#101010]">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalCount > itemsPerPage && (
        <div className="mt-6">
          <Pagination
            totalItems={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
