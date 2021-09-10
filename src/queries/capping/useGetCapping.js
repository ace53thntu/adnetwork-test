import {CappingAPIRequest} from 'api/capping.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CAPPING} from './constants';

/**
 * Hook for get Capping from API by query
 * @param cappingId - Capping ID
 */
export function useGetCapping(cappingId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CAPPING, cappingId],
    () =>
      CappingAPIRequest.getCapping({
        id: cappingId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!cappingId
    }
  );
}
