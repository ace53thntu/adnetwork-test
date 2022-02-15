import {CampaignAPIRequest} from 'api/campaign.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CAMPAIGN, GET_CAMPAIGNS} from './constants';

/**
 * Edit a Campaign
 */
export function useEditCampaign(campaignId) {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({campId, data}) =>
      CampaignAPIRequest.editCampaign({
        id: campId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_CAMPAIGNS]);
        client.invalidateQueries([GET_CAMPAIGN, campaignId]);
      }
    }
  );
}
