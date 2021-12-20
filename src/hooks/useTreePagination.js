import * as React from 'react';
import {delay} from 'utils/delay';

export function useTreePagination() {
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  const handleLoadMoreInRoot = async () => {
    if (totalPage > page) {
      setPage(page + 1);
      await delay(500);
    }
  };

  return {
    page,
    totalPage,
    setTotalPage,
    handleLoadMoreInRoot
  };
}
