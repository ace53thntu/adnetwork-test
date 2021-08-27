import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_INVENTORIES} from './constants';

/**
 * Create a Inventory
 */
export function useCreateInventory() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => InventoryAPIRequest.createInventory({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_INVENTORIES]);
      }
    }
  );
}
