import {DealAPIRequest} from 'api/deal.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_DEAL} from './constants';

/**
 * Hook for get Deal from API by query
 * @param dealId - Deal ID
 */
export function useGetDeal(dealId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_DEAL, dealId],
    () =>
      DealAPIRequest.getDeal({
        id: dealId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!dealId
    }
  );
}
