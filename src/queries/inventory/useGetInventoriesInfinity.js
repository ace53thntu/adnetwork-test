import {InventoryAPIRequest} from 'api/inventory.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery} from 'react-query';

import {GET_INVENTORIES} from './constants';
/**
 * Hook for get Inventory from API by query
 */
export function useGetInventoriesInfinity({params = {}, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_INVENTORIES, params],
    ({pageParam = 1}) =>
      InventoryAPIRequest.getAllInventory({
        params: {...params, page: pageParam},
        options: {
          cancelToken
        }
      }).then(res => {
        return res?.data ?? {};
      }),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const total = apiRes?.total;
        const nextPage = Math.ceil(total / DEFAULT_PAGINATION.perPage);

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}
