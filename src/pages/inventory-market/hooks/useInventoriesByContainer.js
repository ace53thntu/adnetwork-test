import {useMemo} from 'react';

export const useInventoriesByContainer = ({data, page, positions}) => {
  return useMemo(() => {
    if (data) {
      const inventories = data?.map(item => {
        const {position_id} = item;
        const position = positions?.find(poItem => poItem.id === position_id);
        return {
          ...item,
          id: item.uuid,
          page_name: page?.name,
          position: position?.text ?? ''
        };
      });
      return inventories;
    }

    return [];
  }, [data, page?.name, positions]);
};
