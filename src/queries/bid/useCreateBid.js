import {BidAPIRequest} from 'api/bid.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_BIDS} from './constants';

/**
 * Create a Bid
 */
export function useCreateBid() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => BidAPIRequest.createBid({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_BIDS]);
      }
    }
  );
}
