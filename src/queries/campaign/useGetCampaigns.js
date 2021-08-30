import {CampaignAPIRequest} from 'api/campaign.api';
import {useQuery} from 'react-query';

import {GET_CAMAPAIGNS} from './constants';

export function useGetCampaigns() {
  return useQuery(
    GET_CAMAPAIGNS,
    () => CampaignAPIRequest.getAllCampaign({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
