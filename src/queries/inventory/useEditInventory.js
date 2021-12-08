import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_INVENTORY, GET_INVENTORY_BY_PAGE} from './constants';

/**
 * Update a Inventory
 */
export function useEditInventory() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({inventoryId, data}) =>
      InventoryAPIRequest.editInventory({
        id: inventoryId,
        data,
        options: {cancelToken}
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
        client.invalidateQueries([GET_INVENTORY, data?.data?.uuid]);
      }
    }
  );
}
