import {InventoryAPIRequest} from 'api/inventory.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_INVENTORY_BY_PAGE} from './constants';
/**
 * Hook for get Inventory from API by query
 */
export function useGetInventoryByPage(pageId, params = {}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_INVENTORY_BY_PAGE, pageId],
    () =>
      InventoryAPIRequest.getAllInventory({
        params: {...params, page_uuid: pageId},
        options: {
          cancelToken
        }
      }).then(res => {
        return res?.data ?? {};
      }),
    {
      suspense: false,
      enabled: !!pageId
    }
  );
}
