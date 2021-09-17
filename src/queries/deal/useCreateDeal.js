import {DealAPIRequest} from 'api/deal.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DEALS} from './constants';

/**
 * Create a Deal
 */
export function useCreateDeal() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => DealAPIRequest.createDeal({data, options: {cancelToken}}),
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
