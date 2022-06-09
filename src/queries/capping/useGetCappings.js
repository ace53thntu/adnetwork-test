import {CappingAPIRequest} from 'api/capping.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
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
  const {cancelToken} = useCancelRequest();
  return useQuery(
    [GET_CAPPINGS, params],
    () =>
      CappingAPIRequest.getAllCapping({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      keepPreviousData
    }
  );
}
