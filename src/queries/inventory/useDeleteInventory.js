import {InventoryAPIRequest} from 'api/inventory.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_INVENTORIES, GET_INVENTORY_BY_PAGE} from './constants';

/**
 * Delete a Inventory
 */
export function useDeleteInventory({pageId, queryKeyParam}) {
  const client = useQueryClient();

  return useMutation(
    ({inventoryId}) =>
      InventoryAPIRequest.deleteInventory({
        id: inventoryId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_INVENTORY_BY_PAGE, pageId]);
        client.invalidateQueries([GET_INVENTORIES, queryKeyParam]);
      }
    }
  );
}
