"use client";

import {
  PAGINATION_DOTS,
  PAGINATION_PREV_ARIA,
  PAGINATION_NEXT_ARIA,
  PAGINATION_PAGE_ARIA_PREFIX,
  PaginationPreArrow,
  PaginationNexArrow,
} from "./import";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function getPaginationRange(
  current: number,
  total: number,
): (number | string)[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const visible = new Set<number>();
  visible.add(1);
  visible.add(2);
  visible.add(total - 1);
  visible.add(total);
  if (current > 1) visible.add(current - 1);
  visible.add(current);
  if (current < total) visible.add(current + 1);

  const sorted = Array.from(visible).sort((a, b) => a - b);
  const result: (number | string)[] = [];
  for (let i = 0; i < sorted.length; i++) {
    result.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
      result.push(PAGINATION_DOTS);
    }
  }
  return result;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 flex-wrap"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={PAGINATION_PREV_ARIA}
        className="w-10 h-10 flex items-center justify-center rounded-md border border-[#DBDBDB] bg-[#F3F1EF] text-[#101010] hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-sans font-semibold"
      >
        <PaginationPreArrow />
      </button>

      {pages.map((page, i) =>
        page === PAGINATION_DOTS ? (
          <span
            key={`dots-${i}`}
            className="w-10 h-10 flex items-center justify-center font-sans text-[#101010]"
          >
            {PAGINATION_DOTS}
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            aria-label={`${PAGINATION_PAGE_ARIA_PREFIX}${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`w-10.5 h-10.5 flex items-center justify-center rounded-md border font-sans text-base transition-colors ${
              currentPage === page
                ? "border-2 border-[#101010] bg-white text-[#101010] font-bold"
                : "border-[#DBDBDB] bg-[#F3F1EF] text-[#101010] hover:bg-white"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={PAGINATION_NEXT_ARIA}
        className="w-10 h-10 flex items-center justify-center rounded-md border border-[#DBDBDB] bg-[#F3F1EF] text-[#101010] hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-sans font-semibold"
      >
        <PaginationNexArrow />
      </button>
    </nav>
  );
}
