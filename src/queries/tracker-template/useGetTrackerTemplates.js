import {TrackerTemplateAPIRequest} from 'api/tracker-template';
import {useQuery} from 'react-query';

import {GET_TRACKER_TEMPLATES} from './constants';

/**
 * Query get all tracker template
 * @returns Array data tracker template
 */
export function useGetTrackerTemplates() {
  return useQuery(
    GET_TRACKER_TEMPLATES,
    () =>
      TrackerTemplateAPIRequest.getAllTrackerTemplate({}).then(
        res => res?.data ?? []
      ),
    {
      suspense: false
    }
  );
}
