import {TrackerTemplateAPIRequest} from 'api/tracker-template';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_TRACKER_TEMPLATES} from './constants';

/**
 * Hook to create a Tracker template
 */
export function useCreateTrackerTemplate() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data =>
      TrackerTemplateAPIRequest.createTrackerTemplate({
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_TRACKER_TEMPLATES]);
      }
    }
  );
}
