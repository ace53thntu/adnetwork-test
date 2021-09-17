import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_INVENTORIES} from './constants';

/**
 * Register a Inventory for DSP
 */
export function useRegisterInventory() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({inventoryId, data}) =>
      InventoryAPIRequest.registerInventory({
        id: inventoryId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: data => {
        client.invalidateQueries([GET_INVENTORIES, data?.data?.page_uuid]);
      }
    }
  );
}
