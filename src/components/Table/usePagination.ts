import { useMemo, useState } from "react";

export const usePagination = <T>(size: number = 10) => {
  const [pageSize, setPageSize] = useState<number>(size);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<T[]>([]);

  const paginatedData = useMemo(() => {
    const offset = (page - 1) * pageSize;

    return data.slice(offset, offset + pageSize);
  }, [pageSize, page, data]);

  const pagesCount = useMemo(
    () => Math.ceil(data.length / pageSize),
    [pageSize, data]
  );

  return {
    paginatedData,
    setPageSize,
    pagesCount,
    pageSize,
    setPage,
    setData,
    page,
    data,
  };
};
