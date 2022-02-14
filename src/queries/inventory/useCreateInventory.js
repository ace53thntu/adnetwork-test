import {InventoryAPIRequest} from 'api/inventory.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
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
      onSettled: data => {
        client.invalidateQueries([
          GET_INVENTORIES,
          {limit: DEFAULT_PAGINATION.perPage, page_uuid: data?.data?.page_uuid}
        ]);
      }
    }
  );
}
