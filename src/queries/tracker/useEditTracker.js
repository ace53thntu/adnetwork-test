import {TrackerAPIRequest} from 'api/tracker.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_TRACKER, GET_TRACKERS} from './constants';

/**
 * Update a Tracker
 */
export function useEditTracker(trackerId) {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({trackerId, data}) =>
      TrackerAPIRequest.editTracker({
        id: trackerId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_TRACKERS]);
        client.invalidateQueries([GET_TRACKER, trackerId]);
      }
    }
  );
}
