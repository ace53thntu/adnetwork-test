import {convertDateTimezone} from 'utils/helpers/dateTime.helpers';
import {CAMPAIGN_KEYS} from './constants';

export const parseCampaignFormData = formData => {
  console.log(
    '🚀 ~ file: utils.js ~ line 2 ~ parseCampaignFormData ~ formData',
    formData
  );
  const {
    advertiser,
    name,
    active,
    start_time,
    end_time,
    cpi,
    cpc,
    cpcc,
    cpvc,
    cplpc,
    cplpv,
    compc,
    compv,
    media_cost,
    tracking_cost,
    conv_events,
    budget,
    check_visit,
    auto_realloc
  } = formData;

  let convEventIds = [];
  let convEventLabelIds = [];
  convEventIds = formData?.conv_event_ids?.map(item => {
    return parseInt(item?.value || 0);
  });
  convEventLabelIds = formData?.conv_label_ids?.map(item => {
    return parseInt(item?.value || 0);
  });

  return {
    [CAMPAIGN_KEYS.ADVERTISER_ID]: advertiser?.value || undefined,
    [CAMPAIGN_KEYS.NAME]: name,
    [CAMPAIGN_KEYS.ACTIVE]: active === 'active' ? true : false,
    [CAMPAIGN_KEYS.START_TIME]: convertDateTimezone(start_time),
    [CAMPAIGN_KEYS.END_TIME]: convertDateTimezone(end_time),
    [CAMPAIGN_KEYS.CPI]: parseInt(cpi),
    [CAMPAIGN_KEYS.CPC]: parseInt(cpc),
    [CAMPAIGN_KEYS.CPCC]: parseInt(cpcc),
    [CAMPAIGN_KEYS.CPVC]: parseInt(cpvc),
    [CAMPAIGN_KEYS.CPLPC]: parseInt(cplpc),
    [CAMPAIGN_KEYS.CPLPV]: parseInt(cplpv),
    [CAMPAIGN_KEYS.COMPC]: parseInt(compc),
    [CAMPAIGN_KEYS.COMPV]: parseInt(compv),
    [CAMPAIGN_KEYS.MEDIA_COST]: parseInt(media_cost),
    [CAMPAIGN_KEYS.TRACKING_COST]: parseInt(tracking_cost),
    [CAMPAIGN_KEYS.CONV_EVENTS]: conv_events,
    [CAMPAIGN_KEYS.CHECK_VISIT]: check_visit === 'active' ? true : false,
    [CAMPAIGN_KEYS.AUTO_REALLOC]: auto_realloc === 'active' ? true : false,
    [CAMPAIGN_KEYS.BUGDET]: {
      global: parseInt(budget?.global || 0),
      daily: parseInt(budget?.daily || 0)
    },
    [CAMPAIGN_KEYS.CONV_EVENT_IDS]: convEventIds,
    [CAMPAIGN_KEYS.CONV_LABEL_IDS]: convEventLabelIds
  };
};
