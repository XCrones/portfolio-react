import { useState } from "react";

const usePaginator = <T>(initialSumPage: number, arr: T[]) => {
  const defaultSumPage = 1;
  const [sumItemsOnPage, setSumItemsOnPage] = useState(Math.max(defaultSumPage, initialSumPage));
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(arr.length / sumItemsOnPage);

  const isCurrentPage = (page: number): boolean => page + 1 === currentPage;
  const nextPage = () => setCurrentPage((page) => Math.min(currentPage + 1, maxPage));
  const prevPage = () => setCurrentPage((page) => Math.max(currentPage - 1, 1));

  const editSumItems = (sum: number) => setSumItemsOnPage(Math.max(1, sum));

  const jumpPage = (page: number) => {
    const pageNumber = Math.max(1, page + 1);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  };

  const currentData = (): T[] => {
    try {
      const begin = (currentPage - 1) * sumItemsOnPage;
      const end = begin + sumItemsOnPage;
      return arr.slice(begin, end);
    } catch (e) {
      return [];
    }
  };

  const pages = (): string[] => {
    try {
      return Array(Math.ceil(arr.length / sumItemsOnPage)).fill("");
    } catch (e) {
      return [];
    }
  };

  return {
    editSumItems,
    isCurrentPage,
    currentData,
    pages,
    nextPage,
    prevPage,
    jumpPage,
  };
};

export default usePaginator;
