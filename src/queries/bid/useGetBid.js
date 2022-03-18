import {BidAPIRequest} from 'api/bid.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_BID} from './constants';

/**
 * Hook for get Bid from API by query
 * @param bidId - Bid ID
 */
export function useGetBid(bidId, enabled = false) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_BID, bidId],
    () =>
      BidAPIRequest.getBid({
        id: bidId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled
    }
  );
}
