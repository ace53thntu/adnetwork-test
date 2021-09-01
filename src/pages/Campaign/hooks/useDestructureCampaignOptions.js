import {useMemo} from 'react';

export const useDestructureCampaignOptions = ({campaigns = []}) => {
  return useMemo(() => {
    if (!campaigns || campaigns.length === 0) {
      return [];
    }

    const result = campaigns.map(campaignItem => {
      const {name, uuid: id} = campaignItem;
      return {
        label: name,
        value: id
      };
    });

    return result;
  }, [campaigns]);
};
