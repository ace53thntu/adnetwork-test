import moment from 'moment';
import {capitalize} from 'utils/helpers/string.helpers';
import {getTimeZoneOffset} from 'utils/metrics';

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
    advertiser_uuid,
    concepts = [],
    inventories = [],
    inventories_bid = []
  } = strategyData;

  const startDate = start_time ? new Date(start_time) : new Date();
  const endDate = end_time ? new Date(end_time) : null;
  const sourceConverted =
    sources?.map(item => ({
      value: item,
      label: capitalize(item)
    })) || [];

  const conceptsConverted = concepts?.map(item => item?.uuid) || [];

  return {
    campaign_uuid: campaign_uuid
      ? {value: campaign_uuid, label: campaign_name}
      : {value: campaignDetail?.uuid, label: campaignDetail?.name},
    name,
    start_time: startDate,
    end_time: endDate,
    position_uuids:
      positions?.length > 0
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
    advertiser_uuid,
    concept_uuids: conceptsConverted,
    concepts,
    inventories,
    inventories_bid
  };
};

export const formToApi = ({formData, isConcept = false, isSummary = false}) => {
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
    impression,
    schedule
  } = formData;

  const positionIds = position_uuids?.map(item => item?.value);
  let startDate = moment(start_time).isSame(moment(), 'day')
    ? null
    : moment(start_time).toISOString();
  const endDate = moment(end_time).endOf('day').toISOString();

  const scheduleStartHour = moment(schedule?.start_time).hours();
  const scheduleStartMinute = moment(schedule?.start_time).minutes();
  const scheduleEndHour = moment(schedule?.end_time).hours();
  const scheduleEndMinute = moment(schedule?.end_time).minutes();

  // Set start time is null if start time < now
  if (moment(start_time).isBefore(moment(), 'day')) {
    startDate = null;
  }

  const strategyReturn = {
    campaign_uuid: campaign?.value,
    name: name?.trim(),
    status,
    position_uuids: positionIds,
    start_time: startDate,
    end_time: endDate,
    strategy_type: strategy_type ? strategy_type?.value : null,
    click_commission: parseFloat(click_commission) || 0,
    sources: sources?.length > 0 ? Array.from(sources, item => item.value) : [],
    budget: {
      daily: parseInt(budget?.daily) || 0,
      global: parseInt(budget?.global) || 0
    },
    impression: {
      daily: parseInt(impression?.daily) || 0,
      global: parseInt(impression?.global) || 0
    },
    schedule: {
      week_days:
        schedule?.week_days?.length > 0
          ? Array.from(schedule?.week_days, item => item?.value)
          : [],
      start_hour: parseInt(scheduleStartHour, 10),
      start_minute: parseInt(scheduleStartMinute, 10),
      end_hour: parseInt(scheduleEndHour, 10),
      end_minute: parseInt(scheduleEndMinute, 10),
      time_zone: `${getTimeZoneOffset()}`
    }
  };

  if (strategy_type?.value === 'premium') {
    const inventoriesBid = formData?.inventories_bid || [];
    strategyReturn.inventories_bid = inventoriesBid;
  }

  if (isSummary) {
    strategyReturn.concept_uuids =
      formData?.concept_uuids?.filter(item => item) || [];
  }

  return strategyReturn;
};
