import {CampaignAPIRequest} from 'api/campaign.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CAMAPAIGNS} from './constants';

/**
 * Create a Campaign
 */
export function useCreateCampaign() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => CampaignAPIRequest.createCampaign({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_CAMAPAIGNS]);
      }
    }
  );
}
