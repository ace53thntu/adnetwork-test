import {convertArrayToObject} from 'utils/helpers/dataStructure.helpers';

export const useDestructureCampaigns = ({advertisers = [], campaigns = []}) => {
  if (!campaigns || campaigns.length === 0) {
    return [];
  }
  const advertiserObj = convertArrayToObject(advertisers, 'id');

  const result = campaigns.map(campaignItem => {
    const {name, id, advertiser_id, active} = campaignItem;
    const advertiser = advertiserObj[advertiser_id] || null;
    return {
      advertiserId: advertiser?.id ?? '',
      advertiserName: advertiser?.name ?? '',
      name,
      id,
      status: active ? 'active' : 'inactive'
    };
  });

  return result;
};
