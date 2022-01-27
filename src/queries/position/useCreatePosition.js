import {PositionAPIRequest} from 'api/position.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_POSITIONS} from './constants';

/**
 * Create a Position
 */
export function useCreatePosition() {
  const client = useQueryClient();

  return useMutation(data => PositionAPIRequest.createPosition({data}), {
    onError: (err, variables, rollback) => {
      return typeof rollback === 'function' ? rollback() : null;
    },
    onSettled: () => {
      client.invalidateQueries([GET_POSITIONS]);
    }
  });
}
