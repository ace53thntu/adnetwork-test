import {InventoryAPIRequest} from 'api/inventory.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_INVENTORY_BID} from './constants';

/**
 * Hook for get Inventory Bids from API by query
 */
export function useGetInventoryBids({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_INVENTORY_BID, params],
    () =>
      InventoryAPIRequest.getInventoryBid({
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
