import {HistoricalAPIRequest} from 'api/historical.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_HISTORICAL_DIFFERENCE} from './constants';

/**
 * Hook for get log difference from API by query
 * @param sourceId - Source ID
 * @param compareId - Compare ID
 */
export function useGetLogDifference({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_HISTORICAL_DIFFERENCE, params],
    () =>
      HistoricalAPIRequest.getHistorical({
        params,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled
    }
  );
}
