import {PositionAPIRequest} from 'api/position.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_POSITIONS} from './constants';

/**
 * Query get all positions
 * @returns Array data positions
 */
export function useGetPositions({params, enabled, keepPreviousData}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_POSITIONS, params],
    () =>
      PositionAPIRequest.getAllPosition({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      keepPreviousData,
      suspense: false,
      enabled
    }
  );
}
