import {DealAPIRequest} from 'api/deal.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DEALS} from './constants';

/**
 * Delete a Deal
 */
export function useDeleteDeal() {
  const client = useQueryClient();

  return useMutation(
    ({dealId}) =>
      DealAPIRequest.deleteDeal({
        id: dealId
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
