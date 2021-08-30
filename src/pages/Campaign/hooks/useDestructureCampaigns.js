export const useDestructureCampaigns = ({campaigns = []}) => {
  if (!campaigns || campaigns.length === 0) {
    return [];
  }

  const result = campaigns.map(campaignItem => {
    const {name, uuid, advertiser_uuid, advertiser_name, status} = campaignItem;
    return {
      advertiserId: advertiser_uuid ?? '',
      advertiserName: advertiser_name ?? '',
      name,
      uuid,
      status
    };
  });

  return result;
};
