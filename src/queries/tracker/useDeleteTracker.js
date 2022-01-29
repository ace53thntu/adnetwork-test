import {TrackerAPIRequest} from 'api/tracker.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_TRACKERS} from './constants';

/**
 * Delete a Tracker
 */
export function useDeleteTracker() {
  const client = useQueryClient();

  return useMutation(
    ({trackerId}) =>
      TrackerAPIRequest.deleteTracker({
        id: trackerId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_TRACKERS]);
      }
    }
  );
}
