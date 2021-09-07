import {useMemo} from 'react';

export const useInventoriesByContainer = ({data, pageId}) => {
  return useMemo(() => {
    if (data) {
      const {pages} = data;
      const foundPage = pages?.find(pageItem => pageItem?.uuid === pageId);
      return foundPage?.inventories || [];
    }

    return [];
  }, [data, pageId]);
};
