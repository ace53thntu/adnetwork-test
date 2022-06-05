import {HistoricalAPIRequest} from 'api/historical.api';
import { IS_RESPONSE_ALL } from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_HISTORICAL} from './constants';

/**
 * Hook for get Audience from API by query
 */
export function useGetAllHistorical({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_HISTORICAL, params],
    () =>
      HistoricalAPIRequest.getAllHistorical({
        params,
        options: {
          cancelToken,
          isResponseAll: IS_RESPONSE_ALL
        }
      }).then(res => res),
    {
      suspense: false,
      enabled
    }
  );
}
