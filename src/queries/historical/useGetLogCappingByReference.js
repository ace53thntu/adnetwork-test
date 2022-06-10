import {HistoricalAPIRequest} from 'api/historical.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_HISTORICAL_DIFFERENCE} from './constants';

/**
 * Hook for get log capping by reference from API by query
 * @param referenceId - Reference ID
 * @param entityType - Entity type
 */
export function useGetLogCappingByReference({
  referenceId,
  params,
  enabled = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_HISTORICAL_DIFFERENCE, referenceId, params],
    () =>
      HistoricalAPIRequest.getHistoricalCapping({
        referenceId,
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
