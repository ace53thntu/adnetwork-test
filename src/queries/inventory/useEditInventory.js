import {InventoryAPIRequest} from 'api/inventory.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_INVENTORIES, GET_INVENTORY} from './constants';

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
          GET_INVENTORIES,
          {
            per_page: DEFAULT_PAGINATION.perPage,
            page_uuid: data?.data?.page_uuid,
            sort: 'created_at DESC'
          }
        ]);
        client.invalidateQueries([GET_INVENTORY, data?.data?.uuid]);
      }
    }
  );
}
