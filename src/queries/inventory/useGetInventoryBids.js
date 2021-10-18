import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_INVENTORY_BID} from './constants';

/**
 * Hook for get Inventory Dealed from API by query
 */
export function useGetInventoryBids({inventoryId, isBid = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_INVENTORY_BID, inventoryId],
    () =>
      InventoryAPIRequest.getInventoryBid({
        id: inventoryId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled: !!inventoryId && isBid
    }
  );
}
