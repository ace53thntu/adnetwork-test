import {StrategyAPIRequest} from 'api/strategy.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';

import {GET_STRATEGIES} from './constants';

/**
 * Hook for get all strategies from API
 */
export function useGetStrategies({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_STRATEGIES, params],
    () =>
      StrategyAPIRequest.getAllStrategy({params, options: {cancelToken}}).then(
        res => res?.data ?? []
      ),
    {
      suspense: false,
      enabled
    }
  );
}

export function useGetStrategiesInfinity({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_STRATEGIES, params],
    ({pageParam = 1}) =>
      StrategyAPIRequest.getAllStrategy({
        params: {...params, page: pageParam},
        options: {cancelToken}
      }).then(res => res?.data ?? []),
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
