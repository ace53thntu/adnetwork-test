import {useMemo} from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const useDestructureStrategies = ({strategies = [], campaigns = []}) => {
  return useMemo(() => {
    if (validArray({list: strategies}) && validArray({list: campaigns})) {
      const result = strategies?.map(straItem => {
        const {uuid, name, campaign_uuid} = straItem;
        const foundCampaign = campaigns?.find(
          campItem => campItem.uuid === campaign_uuid
        );
        let campaign_name = '',
          advertiser_name = '';
        if (foundCampaign) {
          campaign_name = foundCampaign.name;
          advertiser_name = foundCampaign.advertiser_name;
        }
        return {uuid, name, campaign_uuid, campaign_name, advertiser_name};
      });

      return result;
    }

    return [];
  }, [campaigns, strategies]);
};
