import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_INVENTORIES} from './constants';

/**
 * Bid an Inventory for DSP
 */
export function useBidInventory() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({inventoryId, data}) =>
      InventoryAPIRequest.bidInventory({
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
