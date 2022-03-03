import {useMemo} from 'react';

export const useInventoriesByContainer = ({data}) => {
  return useMemo(() => {
    if (data) {
      const inventories = data?.map(item => {
        return {
          ...item,
          id: item.uuid,
          actions: item.allow_deal
            ? ['View', 'Create bid', 'Create deal']
            : ['View', 'Create bid']
        };
      });
      return inventories;
    }

    return [];
  }, [data]);
};
