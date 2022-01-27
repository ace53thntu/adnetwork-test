import {PositionAPIRequest} from 'api/position.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_POSITIONS, GET_POSITION} from './constants';

/**
 * Update a Position
 */
export function useEditPosition(positionId) {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({positionId, data}) =>
      PositionAPIRequest.editPosition({
        id: positionId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_POSITIONS]);
        client.invalidateQueries([GET_POSITION, positionId]);
      }
    }
  );
}
