import {CampaignAPIRequest} from 'api/campaign.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CAMAPAIGN} from './constants';

/**
 * Hook for get Campaign from API by query
 */
export function useGetCampaign(cid) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CAMAPAIGN, cid],
    () =>
      CampaignAPIRequest.getCampaign({
        id: cid,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!cid
    }
  );
}
