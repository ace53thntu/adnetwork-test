import {WeekpartAPIRequest} from 'api/weekpart.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CAPPING, GET_WEEKPART} from './constants';

/**
 * Hook for get Weekpart from API by query
 * @param weekpartId - Weekpart ID
 */
export function useGetWeekpart(weekpartId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_WEEKPART, weekpartId],
    () =>
      WeekpartAPIRequest.getWeekpart({
        id: weekpartId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!weekpartId
    }
  );
}
