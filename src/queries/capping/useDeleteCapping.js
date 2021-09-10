import {CappingAPIRequest} from 'api/capping.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CAPPINGS} from './constants';

/**
 * Delete a Capping
 */
export function useDeleteCapping() {
  const client = useQueryClient();

  return useMutation(
    ({cappingId}) =>
      CappingAPIRequest.deleteCapping({
        id: cappingId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_CAPPINGS]);
      }
    }
  );
}
