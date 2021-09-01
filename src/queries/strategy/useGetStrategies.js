import {StrategyAPIRequest} from 'api/strategy.api';
import {useQuery} from 'react-query';

import {GET_STRATEGIES} from './constants';

/**
 * Hook for get all strategies from API
 */
export function useGetStrategies() {
  return useQuery(
    GET_STRATEGIES,
    () => StrategyAPIRequest.getAllStrategy({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
