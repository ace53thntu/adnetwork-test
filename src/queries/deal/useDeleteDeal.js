import {DealAPIRequest} from 'api/deal.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DEALS} from './constants';

/**
 * Delete a Deal
 */
export function useDeleteDeal() {
  const client = useQueryClient();

  return useMutation(
    ({cappingId}) =>
      DealAPIRequest.deleteDeal({
        id: cappingId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_DEALS]);
      }
    }
  );
}
