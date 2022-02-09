import {useMemo} from 'react';

export const useInventoriesByContainer = ({data, page}) => {
  return useMemo(() => {
    if (data) {
      const inventories = data?.map(item => {
        return {
          ...item,
          id: item.uuid,
          page_name: page?.name
        };
      });
      return inventories;
    }

    return [];
  }, [data, page?.name]);
};
