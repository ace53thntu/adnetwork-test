import {BidAPIRequest} from 'api/bid.api';
import {useMutation} from 'react-query';

/**
 * Delete a Bid
 */
export function useDeleteBid() {
  return useMutation(
    ({bidId}) =>
      BidAPIRequest.deleteBid({
        id: bidId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: (data, error, variables) => {}
    }
  );
}
