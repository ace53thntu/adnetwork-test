import {CAMPAIGN_KEYS} from './constants';
import moment from 'moment';

export const parseCampaignFormData = formData => {
  const {
    advertiser,
    name,
    status,
    start_time,
    end_time,
    check_visit,
    auto_realloc
  } = formData;

  return {
    [CAMPAIGN_KEYS.ADVERTISER_ID]: advertiser?.value || undefined,
    [CAMPAIGN_KEYS.NAME]: name,
    [CAMPAIGN_KEYS.STATUS]: status,
    [CAMPAIGN_KEYS.START_TIME]: moment(start_time).format(
      'DD-MM-YYYY HH:mm:ss'
    ),
    [CAMPAIGN_KEYS.END_TIME]: moment(end_time).format('DD-MM-YYYY HH:mm:ss'),
    [CAMPAIGN_KEYS.CHECK_VISIT]: check_visit === 'active' ? true : false,
    [CAMPAIGN_KEYS.AUTO_REALLOC]: auto_realloc === 'active' ? true : false
  };
};
