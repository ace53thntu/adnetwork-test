import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_INVENTORY_BY_PAGE} from './constants';

/**
 * Bid an Inventory for DSP
 */
export function useBidInventory(pageUuid) {
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
      onSettled: (data, variables) => {
        client.invalidateQueries([GET_INVENTORY_BY_PAGE, pageUuid]);
      }
    }
  );
}
