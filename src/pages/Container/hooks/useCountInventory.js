import {useMemo} from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const useCountInventory = ({data, pageId}) => {
  return useMemo(() => {
    if (validArray({list: data?.pages})) {
      const foundPage = data?.pages?.find(item => item.uuid === pageId);
      const countInventories = foundPage?.inventories?.length ?? 0;
      return countInventories;
    }
    return 0;
  }, [data, pageId]);
};
