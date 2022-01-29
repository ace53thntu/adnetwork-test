import {TrackerAPIRequest} from 'api/tracker.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_TRACKERS} from './constants';

/**
 * Create a TRACKER
 */
export function useCreateTracker() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => TrackerAPIRequest.createTracker({data, options: {cancelToken}}),
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
