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

  const formatStartDate = `${moment(start_time).format('DD-MM-YYYY')} 00:00:00`;
  const formaEndDate = `${moment(end_time).format('DD-MM-YYYY')} 23:59:59`;

  return {
    [CAMPAIGN_KEYS.ADVERTISER_ID]: advertiser?.value || undefined,
    [CAMPAIGN_KEYS.NAME]: name,
    [CAMPAIGN_KEYS.STATUS]: status,
    [CAMPAIGN_KEYS.START_TIME]: formatStartDate,
    [CAMPAIGN_KEYS.END_TIME]: formaEndDate,
    [CAMPAIGN_KEYS.CHECK_VISIT]: check_visit === 'active' ? true : false,
    [CAMPAIGN_KEYS.AUTO_REALLOC]: auto_realloc === 'active' ? true : false
  };
};
