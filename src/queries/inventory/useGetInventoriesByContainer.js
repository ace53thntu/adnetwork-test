import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_INVENTORIES} from './constants';

/**
 * Hook for get Inventory from API by query
 */
export function useGetInventoriesByContainer({containerId, pageId}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_INVENTORIES, pageId],
    () =>
      InventoryAPIRequest.getInventoriesContainer({
        cid: containerId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled: !!containerId
    }
  );
}
