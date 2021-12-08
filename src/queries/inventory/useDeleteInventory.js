import {InventoryAPIRequest} from 'api/inventory.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_INVENTORY_BY_PAGE} from './constants';

/**
 * Delete a Inventory
 */
export function useDeleteInventory() {
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
      onSettled: data => {
        client.invalidateQueries([
          GET_INVENTORY_BY_PAGE,
          data?.data?.page_uuid
        ]);
      }
    }
  );
}
