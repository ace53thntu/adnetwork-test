import {StrategyAPIRequest} from 'api/strategy.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_STRATEGY} from './constants';

/**
 * Hook for get Strategy from API by query
 */
export function useGetStrategy(straId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_STRATEGY, straId],
    () =>
      StrategyAPIRequest.getStrategy({
        id: straId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!straId
    }
  );
}
