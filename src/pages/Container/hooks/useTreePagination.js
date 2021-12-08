import * as React from 'react';

import {DEFAULT_PAGINATION} from 'constants/misc';
import {delay} from 'utils/delay';

export function useTreePagination() {
  const [page, setPage] = React.useState(DEFAULT_PAGINATION.page);
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
