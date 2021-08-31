import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_ADVERTISER} from './constants';

/**
 * Hook for get Advertiser from API by query
 * @param advId - Advertiser ID
 */
export function useGetAdvertiser(advId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_ADVERTISER, advId],
    () =>
      AdvertiserAPIRequest.getAdvertiser({
        id: advId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!advId
    }
  );
}
