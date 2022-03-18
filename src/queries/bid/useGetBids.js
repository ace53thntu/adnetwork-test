import {BidAPIRequest} from 'api/bid.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useQuery} from 'react-query';

import {GET_BIDS} from './constants';

/**
 * Hook for get all Bids
 * @returns Promise
 */
export function useGetBids(params) {
  return useQuery(
    GET_BIDS,
    () =>
      BidAPIRequest.getAllBid({
        params,
        options: {isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false
    }
  );
}
