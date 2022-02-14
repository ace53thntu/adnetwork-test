import {InventoryAPIRequest} from 'api/inventory.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_INVENTORY_DEAL} from './constants';

/**
 * Hook for get Inventory Deal from API by query
 */
export function useGetInventoryDeals({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_INVENTORY_DEAL, params],
    () =>
      InventoryAPIRequest.getInventoryDeal({
        params,
        options: {
          cancelToken,
          isResponseAll: IS_RESPONSE_ALL
        }
      }).then(res => res),
    {
      suspense: false,
      enabled
    }
  );
}
