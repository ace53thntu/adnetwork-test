import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_INVENTORY} from './constants';
/**
 * Hook for get Inventory from API by query
 */
export function useGetInventory(inventoryId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_INVENTORY, inventoryId],
    () =>
      InventoryAPIRequest.getInventory({
        id: inventoryId,
        options: {
          cancelToken
        }
      }).then(res => {
        return res?.data ?? {};
      }),
    {
      suspense: false,
      enabled: !!inventoryId
    }
  );
}
