import {TrackerAPIRequest} from 'api/tracker.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_TRACKER} from './constants';

/**
 * Hook for get Tracker from API by query
 * @param trackerId - Tracker ID
 */
export function useGetTracker({trackerId, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_TRACKER, trackerId],
    () =>
      TrackerAPIRequest.getTracker({
        id: trackerId,
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
