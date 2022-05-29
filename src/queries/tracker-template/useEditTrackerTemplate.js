import {TrackerTemplateAPIRequest} from 'api/tracker-template.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import { GET_TRACKER_TEMPLATES} from './constants';

/**
 * Hook to Update a Tracker Template
 * @param trackTempId - Tracker template ID
 */
export function useEditTrackerTemplate() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({trackTempId, data}) =>
      TrackerTemplateAPIRequest.editTrackerTemplate({
        id: trackTempId,
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
