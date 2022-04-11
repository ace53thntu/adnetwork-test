import {useQuery} from 'react-query';

import {LocationAPIRequest} from 'api/location.api';
import {useCancelRequest} from 'hooks';
import {GET_LOCATION} from './constants';

/**
 * Hook for get position from API by query
 */
export function useGetLocation({positionId, enabled}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_LOCATION, positionId],
    () =>
      LocationAPIRequest.getLocation({
        id: positionId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled
    }
  );
}
