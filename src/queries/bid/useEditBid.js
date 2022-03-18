import {BidAPIRequest} from 'api/bid.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_BIDS} from './constants';

/**
 * Update a Bid
 */
export function useEditBid() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({bidId, data}) =>
      BidAPIRequest.editBid({
        id: bidId,
        data,
        options: {cancelToken}
      }),
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
