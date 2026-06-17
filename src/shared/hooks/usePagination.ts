import { useEffect, useMemo, useState } from "react";
import {
  HABITS_PER_PAGE,
  PAGINATION_ELLIPSIS,
} from "../constants/appConstants";

export function usePagination<T>(
  items: T[],
  searchQuery: string,
  filterFn: (item: T, query: string) => boolean,
  itemsPerPage: number = HABITS_PER_PAGE,
) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }
    return items.filter((item) => filterFn(item, searchQuery));
  }, [searchQuery, items, filterFn]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / itemsPerPage),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [items, searchQuery]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredItems, itemsPerPage]);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(PAGINATION_ELLIPSIS);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(PAGINATION_ELLIPSIS);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(PAGINATION_ELLIPSIS);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(PAGINATION_ELLIPSIS);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    filteredItems,
    getPageNumbers,
    handlePageChange,
  };
}
