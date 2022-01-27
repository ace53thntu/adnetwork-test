import {PositionAPIRequest} from 'api/position.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_POSITIONS} from './constants';

/**
 * Delete a Position
 */
export function useDeletePosition() {
  const client = useQueryClient();

  return useMutation(
    ({positionId}) =>
      PositionAPIRequest.deletePosition({
        id: positionId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_POSITIONS]);
      }
    }
  );
}
