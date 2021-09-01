import {TrackerTemplateAPIRequest} from 'api/tracker-template.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_TRACKER_TEMPLATE} from './constants';

/**
 * Hook for get Tracker Template from API by query
 * @param trackTempId -  tracker template ID
 */
export function useGetTrackerTemplate(trackTempId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_TRACKER_TEMPLATE, trackTempId],
    () =>
      TrackerTemplateAPIRequest.getTrackerTemplate({
        id: trackTempId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!trackTempId
    }
  );
}
