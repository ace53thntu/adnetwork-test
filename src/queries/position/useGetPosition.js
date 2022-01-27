import {useQuery} from 'react-query';

import {PositionAPIRequest} from 'api/position.api';
import {useCancelRequest} from 'hooks';
import {GET_POSITION} from './constants';

/**
 * Hook for get position from API by query
 */
export function useGetPosition({positionId, enabled}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_POSITION, positionId],
    () =>
      PositionAPIRequest.getPosition({
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
