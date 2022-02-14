import {useMemo} from 'react';

export const useInventoriesByContainer = ({data}) => {
  return useMemo(() => {
    if (data) {
      const inventories = data?.map(item => {
        return {
          ...item,
          id: item.uuid
        };
      });
      return inventories;
    }

    return [];
  }, [data]);
};
