import moment from 'moment';
import {capitalize} from 'utils/helpers/string.helpers';

export const apiToForm = ({strategyData = null, campaignDetail = null}) => {
  if (!strategyData) {
    return {};
  }
  const {
    campaign_uuid,
    campaign_name,
    name = '',
    status = 'active',
    positions = [],
    start_time = null,
    end_time = null,
    uuid,
    strategy_type,
    click_commission,
    sources,
    advertiser_uuid
  } = strategyData;

  const startDate = start_time ? new Date(start_time) : new Date();
  const endDate = end_time ? new Date(end_time) : null;
  const sourceConverted =
    sources?.map(item => ({
      value: item,
      label: capitalize(item)
    })) || [];

  return {
    campaign_uuid: campaign_uuid
      ? {value: campaign_uuid, label: campaign_name}
      : {value: campaignDetail?.uuid, label: campaignDetail?.name},
    name,
    start_time: startDate,
    end_time: endDate,
    position_uuids: positions
      ? Array.from(positions, item => ({value: item.uuid, label: item.name}))
      : [],
    status,
    uuid,
    id: uuid,
    strategy_type: strategy_type
      ? {value: strategy_type, label: capitalize(strategy_type)}
      : null,
    click_commission,
    sources: sourceConverted,
    advertiser_uuid
  };
};

export const formToApi = ({formData, isConcept = false}) => {
  if (isConcept) {
    return {
      concept_uuids: formData?.concept_uuids?.filter(item => item) || []
    };
  }
  const {
    campaign_uuid: campaign,
    name,
    start_time,
    end_time,
    position_uuids,
    status,
    strategy_type,
    click_commission,
    sources,
    budget,
    impression
  } = formData;

  const positionIds = position_uuids?.map(item => item?.value);
  const startDate = moment(start_time).isSame(moment(), 'day')
    ? null
    : moment(start_time).toISOString();
  const endDate = moment(end_time).endOf('day').toISOString();

  return {
    campaign_uuid: campaign?.value,
    name: name?.trim(),
    status,
    position_uuids: positionIds,
    start_time: startDate,
    end_time: endDate,
    strategy_type: strategy_type ? strategy_type?.value : null,
    click_commission: parseFloat(click_commission) || 0,
    sources: Array.from(sources, item => item.value),
    budget: {
      daily: parseFloat(budget?.daily) || 0,
      global: parseFloat(budget?.global) || 0
    },
    impression: {
      daily: parseFloat(impression?.daily) || 0,
      global: parseFloat(impression?.global) || 0
    }
  };
};
