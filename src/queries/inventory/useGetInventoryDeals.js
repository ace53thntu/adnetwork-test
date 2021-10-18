import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_INVENTORY_DEAL} from './constants';

/**
 * Hook for get Inventory Dealed from API by query
 */
export function useGetInventoryDeals({inventoryId, isDeal = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_INVENTORY_DEAL, inventoryId],
    () =>
      InventoryAPIRequest.getInventoryDeal({
        id: inventoryId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled: !!inventoryId && isDeal
    }
  );
}
