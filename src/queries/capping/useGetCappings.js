import {CappingAPIRequest} from 'api/capping.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useQuery} from 'react-query';

import {GET_CAPPINGS} from './constants';

/**
 * Hook for get all Cappings
 * @returns Promise
 */
export function useGetCappings({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  return useQuery(
    [GET_CAPPINGS, params],
    () =>
      CappingAPIRequest.getAllCapping({
        params,
        options: {isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      keepPreviousData
    }
  );
}
