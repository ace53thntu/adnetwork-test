import {TrackerTemplateAPIRequest} from 'api/tracker-template.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_TRACKER_TEMPLATES} from './constants';

/**
 * Query get all tracker template
 * @returns Array data tracker template
 */
export function useGetTrackerTemplates({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_TRACKER_TEMPLATES, params],
    () =>
      TrackerTemplateAPIRequest.getAllTrackerTemplate({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      keepPreviousData,
      enabled
    }
  );
}
