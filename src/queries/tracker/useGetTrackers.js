import {TrackerAPIRequest} from 'api/tracker.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_TRACKERS} from './constants';

/**
 * Hook for get all trackers
 * @returns Promise
 */
export function useGetTrackers({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_TRACKERS, params],
    () =>
      TrackerAPIRequest.getAllTracker({
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
