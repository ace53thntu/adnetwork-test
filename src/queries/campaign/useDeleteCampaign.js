import {CampaignAPIRequest} from 'api/campaign.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CAMAPAIGNS} from './constants';

/**
 * Delete a Campaign
 */
export function useDeleteCampaign() {
  const client = useQueryClient();

  return useMutation(
    ({cid}) =>
      CampaignAPIRequest.deleteCampaign({
        id: cid
      }),
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
