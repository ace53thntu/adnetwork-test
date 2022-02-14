import {InventoryAPIRequest} from 'api/inventory.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useMutation, useQueryClient} from 'react-query';

import {GET_INVENTORIES, GET_INVENTORY_BY_PAGE} from './constants';

/**
 * Delete a Inventory
 */
export function useDeleteInventory(pageId) {
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
        console.log('useGetInventoryByPage', pageId);
        client.invalidateQueries([GET_INVENTORY_BY_PAGE, pageId]);
        client.invalidateQueries([
          GET_INVENTORIES,
          {limit: DEFAULT_PAGINATION.perPage, page_uuid: pageId}
        ]);
      }
    }
  );
}
