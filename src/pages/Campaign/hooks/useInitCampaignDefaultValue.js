import {useMemo} from 'react';

const CAMPAIGN_ENTITY = {
  id: '',
  advertiser: null,
  name: '',
  status: 'active',
  start_time: null,
  end_time: null,
  check_visit: '',
  auto_realloc: ''
};

export const useInitCampaignDefaultValue = ({
  campaign = null,
  advertisers = [],
  convEvents = [],
  convLabel = []
}) => {
  console.log(
    '🚀 ~ file: useInitCampaignDefaultValue.js ~ line 20 ~ advertisers',
    advertisers
  );
  return useMemo(() => {
    if (campaign) {
      const {
        uuid: id,
        advertiser_uuid: advId,
        name,
        status,
        check_visit,
        auto_realloc
      } = campaign;

      let {start_time, end_time} = campaign;
      start_time = new Date(start_time);
      end_time = new Date(end_time);

      // Get advertiser selected
      const advertiser = advertisers.find(advItem => advItem.uuid === advId);
      return {
        id,
        advertiser,
        name,
        status,
        start_time,
        end_time,
        check_visit: check_visit ? 'active' : 'inactive',
        auto_realloc: auto_realloc ? 'active' : 'inactive'
      };
    }

    return CAMPAIGN_ENTITY;
  }, [advertisers, campaign]);
};
