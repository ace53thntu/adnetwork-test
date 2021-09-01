import {TrackerTemplateAPIRequest} from 'api/tracker-template.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_TRACKER_TEMPLATES} from './constants';

/**
 * Hook to delete a Tracker Template
 * @param trackTempId - Tracker Template ID
 */
export function useDeleteTrackerTemplate() {
  const client = useQueryClient();

  return useMutation(
    ({trackTempId}) =>
      TrackerTemplateAPIRequest.deleteTrackerTemplate({
        id: trackTempId
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
