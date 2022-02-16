import {StrategyAPIRequest} from 'api/strategy.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

import {GET_STRATEGIES} from './constants';

/**
 * Hook for get all strategies from API
 */
export function useGetStrategies({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_STRATEGIES, params],
    () =>
      StrategyAPIRequest.getAllStrategy({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
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
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const nextPage = getResponsePagination(apiRes, IS_RESPONSE_ALL)
          ?.nextPage;

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}
