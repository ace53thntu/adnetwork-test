import {CappingAPIRequest} from 'api/capping.api';
import {useQuery} from 'react-query';

import {GET_CAPPINGS} from './constants';

/**
 * Hook for get all Cappings
 * @returns Promise
 */
export function useGetCappings({strategyId}) {
  return useQuery(
    GET_CAPPINGS,
    () =>
      CappingAPIRequest.getAllCapping({
        params: {strategy_uuid: strategyId}
      }).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
