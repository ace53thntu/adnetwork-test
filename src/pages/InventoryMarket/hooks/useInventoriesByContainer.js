import {useMemo} from 'react';

export const useInventoriesByContainer = ({data, page, positions}) => {
  return useMemo(() => {
    if (data) {
      const {pages} = data;
      const foundPage = pages?.find(pageItem => pageItem?.uuid === page?.uuid);
      if (!foundPage) {
        return [];
      }
      const inventories = foundPage?.inventories?.map(item => {
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
  }, [data, page?.name, page?.uuid, positions]);
};
