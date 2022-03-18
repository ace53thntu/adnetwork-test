import {DealAPIRequest} from 'api/deal.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DEALS} from './constants';

/**
 * Update a Deal
 */
export function useEditDeal() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({dealId, data}) =>
      DealAPIRequest.editDeal({
        id: dealId,
        data,
        options: {cancelToken}
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
