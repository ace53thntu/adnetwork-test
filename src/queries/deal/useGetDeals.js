import {DealAPIRequest} from 'api/deal.api';
import {useQuery} from 'react-query';

import {GET_DEALS} from './constants';

/**
 * Hook for get all Deals
 * @returns Promise
 */
export function useGetDeals() {
  return useQuery(
    GET_DEALS,
    () => DealAPIRequest.getAllDeal({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
