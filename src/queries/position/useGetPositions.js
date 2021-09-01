import {PositionAPIRequest} from 'api/position.api';
import {useQuery} from 'react-query';

import {GET_POSITIONS} from './constants';

/**
 * Query get all positions
 * @returns Array data positions
 */
export function useGetPositions() {
  return useQuery(
    GET_POSITIONS,
    () => PositionAPIRequest.getAllPosition({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
