import {InventoryAPIRequest} from 'api/inventory.api';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

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
          cancelToken,
          isResponseAll: IS_RESPONSE_ALL
        }
      }).then(res => {
        return res;
      }),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const total = getResponsePagination(apiRes)?.total;
        const perPage =
          getResponsePagination(apiRes)?.perPage || DEFAULT_PAGINATION.perPage;
        const nextPage = Math.ceil(total / perPage);

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}
