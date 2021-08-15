import {useMemo} from 'react';

const CAMPAIGN_ENTITY = {
  id: '',
  advertiser: null,
  name: '',
  active: true,
  start_time: null,
  end_time: null,
  cpi: '',
  cpc: '',
  cpcc: '',
  cpvc: '',
  cplpc: '',
  cplpv: '',
  compc: '',
  compv: '',
  media_cost: '',
  tracking_cost: '',
  conv_events: '',
  budget: '',
  labels: '',
  check_visit: '',
  auto_realloc: '',
  families: '',
  spent: ''
};

export const useInitCampaignDefaultValue = ({
  campaign = null,
  advertisers = [],
  convEvents = [],
  convLabel = []
}) => {
  return useMemo(() => {
    if (campaign) {
      const {
        id,
        advertiser_id: advId,
        name,
        active,
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
        budget,
        check_visit,
        auto_realloc,
        families,
        spent
      } = campaign;

      let {start_time, end_time, labels = [], conv_events} = campaign;
      start_time = new Date(start_time);
      end_time = new Date(end_time);

      // Destructure labels
      labels = labels.map(item => {
        return {value: item?.id, label: item?.label_key, ...item};
      });

      //  Destructure conv events
      conv_events = conv_events.reduce((acc, item) => {
        convEvents.forEach(eventItem => {
          if (eventItem.value === parseInt(item)) {
            acc.push(eventItem);
          }
        });
        return acc;
      }, []);

      // Get advertiser selected
      const advertiser = advertisers.find(advItem => advItem.id === advId);
      return {
        id,
        advertiser,
        name,
        active: active ? 'active' : 'inactive',
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
        conv_event_ids: conv_events,
        budget,
        check_visit: check_visit ? 'active' : 'inactive',
        auto_realloc: auto_realloc ? 'active' : 'inactive',
        families,
        spent,
        conv_label_ids: labels
      };
    }

    return CAMPAIGN_ENTITY;
  }, [advertisers, campaign, convEvents]);
};
