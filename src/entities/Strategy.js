import {LinearityOptions, ProtocolOptions} from 'constants/misc';
import _ from 'lodash';
import moment from 'moment';
import {
  BandwidthOptions,
  BrowsersOptions,
  MobileCarrierOptions,
  OperatingSystemOptions,
  PlacementTypeOptions,
  Priority,
  PriorityOptions,
  StrategyTypes
} from 'pages/Campaign/constants';
import {convertApiToGui, convertGuiToApi} from 'utils/handleCurrencyFields';
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
    click_commission = 0.3,
    sources,
    advertiser_uuid,
    concepts = [],
    inventories = [],
    inventories_bid = [],
    location = [],
    advertiser_name,
    category,
    priority,
    cpm_max,
    video_filter,
    context_filter
  } = strategyData;

  const startDate = start_time ? new Date(start_time) : new Date();
  const endDate = end_time ? new Date(end_time) : null;
  const sourceConverted =
    sources?.map(item => ({
      value: item,
      label: capitalize(item)
    })) || [];

  const conceptsConverted = concepts?.map(item => item?.uuid) || [];
  const inventoryBidsConverted = inventories_bid
    ? Object.entries(inventories_bid).map(([key, value]) => {
        return {
          uuid: key,
          ...value
        };
      })
    : [];

  let convertedLocations = [];
  if (_.isArray(location)) {
    convertedLocations = location.map(item => ({
      value: item.uuid,
      label: item.full_location_name
    }));
  }

  const selectedPriority = PriorityOptions?.find(
    item => item?.value === priority
  );

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
      : {value: 'normal', label: 'Normal'},
    click_commission,
    sources: sourceConverted,
    advertiser_uuid,
    concept_uuids: conceptsConverted,
    concepts,
    inventories,
    inventories_bid: inventoryBidsConverted,
    location_uuids: convertedLocations,
    advertiser_name,
    category,
    priority: selectedPriority || {value: Priority.NORMAL, label: 'Normal'},
    cpm_max: convertApiToGui({value: cpm_max}),
    video_filter: {
      skip_delay: video_filter?.skip_delay,
      start_delay: video_filter?.start_delay,
      ptype:
        PlacementTypeOptions?.find(
          item => item?.value === video_filter?.ptype
        ) || null,
      linearity:
        LinearityOptions?.find(
          item => item?.value === video_filter?.linearity
        ) || null,
      protocols:
        ProtocolOptions?.find(
          item => item?.value === video_filter?.protocols
        ) || null,
      only_skipable: video_filter?.only_skipable ? 'active' : 'inactive',
      only_unskipable: video_filter?.only_unskipable ? 'active' : 'inactive'
    },
    context_filter: {
      browser:
        BrowsersOptions?.find(item => item.value === context_filter?.browser) ||
        null,
      operating_system:
        OperatingSystemOptions?.find(
          item => item.value === context_filter?.operating_system
        ) || null,
      bandwidth:
        BandwidthOptions?.find(
          item => item.value === context_filter?.bandwidth
        ) || null,
      mobile_carrier:
        MobileCarrierOptions?.find(
          item => item.value === context_filter?.mobile_carrier
        ) || null,
      browser_language: context_filter?.browser_language || '',
      device_manufacturer: context_filter?.device_manufacturer || ''
    }
  };
};

export const formToApi = ({
  formData,
  currentStrategy,
  isConcept = false,
  isSummary = false,
  isEdit = false
}) => {
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
    schedule,
    location_uuids,
    category,
    priority,
    cpm_max,
    video_filter,
    context_filter
  } = formData;

  const positionIds = position_uuids?.map(item => item?.value);
  let startDate = moment(start_time).isSame(moment(), 'day')
    ? null
    : moment(start_time).toISOString();
  const endDate = moment(end_time).endOf('day').toISOString();

  // Set start time is null if start time < now
  if (
    moment(start_time).isBefore(moment(), 'day') ||
    (currentStrategy?.start_time &&
      moment(currentStrategy?.start_time).isSame(start_time, 'day'))
  ) {
    startDate = null;
  }

  //---> VIDEO FILTER
  let videoFilter = {};
  let contextFilter = {};
  if (video_filter?.skip_delay) {
    videoFilter.skip_delay = video_filter?.skip_delay
      ? parseInt(video_filter?.skip_delay)
      : null;
  }
  if (video_filter?.start_delay) {
    videoFilter.start_delay = video_filter?.start_delay
      ? parseInt(video_filter?.start_delay)
      : null;
  }
  if (video_filter?.ptype) {
    videoFilter.ptype = video_filter?.ptype?.value;
  }
  if (video_filter?.linearity) {
    videoFilter.linearity = video_filter?.linearity?.value;
  }
  if (video_filter?.protocols) {
    videoFilter.protocols = video_filter?.protocols?.value;
  }

  //---> CONTEXT FILTER
  if (context_filter?.browser) {
    contextFilter.browser = context_filter?.browser?.value;
  }
  if (context_filter?.operating_system) {
    contextFilter.operating_system = context_filter?.operating_system?.value;
  }
  if (context_filter?.browser_language) {
    contextFilter.browser_language = context_filter?.browser_language || '';
  }
  if (context_filter?.device_manufacturer) {
    contextFilter.device_manufacturer =
      context_filter?.device_manufacturer || '';
  }
  if (context_filter?.bandwidth) {
    contextFilter.bandwidth = context_filter?.bandwidth?.value || null;
  }
  if (context_filter?.mobile_carrier) {
    contextFilter.mobile_carrier =
      context_filter?.mobile_carrier?.value || null;
  }

  let strategyReturn = {
    campaign_uuid: campaign?.value,
    name: name?.trim(),
    status,
    position_uuids: positionIds,
    start_time: startDate,
    end_time: endDate,
    strategy_type: strategy_type ? strategy_type?.value : null,
    click_commission: parseFloat(click_commission) || null,
    sources: sources?.length > 0 ? Array.from(sources, item => item.value) : [],
    category,
    priority: priority?.value || '',
    video_filter: !isEdit
      ? {
          ...videoFilter,
          only_skipable:
            video_filter?.only_skipable === 'active' ? true : false,
          only_unskipable:
            video_filter?.only_unskipable === 'active' ? true : false
        }
      : {
          only_skipable:
            video_filter?.only_skipable === 'active' ? true : false,
          only_unskipable:
            video_filter?.only_unskipable === 'active' ? true : false,
          skip_delay: video_filter?.skip_delay
            ? parseInt(video_filter?.skip_delay)
            : null,
          start_delay: video_filter?.start_delay
            ? parseInt(video_filter?.start_delay)
            : null,
          ptype: video_filter?.ptype?.value || null,
          linearity: video_filter?.linearity?.value || null,
          protocols: video_filter?.protocols?.value || null
        },
    context_filter: !isEdit
      ? contextFilter
      : {
          browser: context_filter?.browser?.value || null,
          operating_system: context_filter?.operating_system?.value || null,
          browser_language: context_filter?.browser_language || '',
          device_manufacturer: context_filter?.device_manufacturer || '',
          bandwidth: context_filter?.bandwidth?.value || null,
          mobile_carrier: context_filter?.mobile_carrier?.value || null
        }
  };

  if (
    !strategyReturn?.context_filter ||
    Object.keys(strategyReturn?.context_filter).length === 0
  ) {
    delete strategyReturn?.context_filter;
  }

  if (!currentStrategy?.id) {
    strategyReturn.budget = {
      daily: convertGuiToApi({value: budget?.daily}),
      global: convertGuiToApi({value: budget?.global})
    };
    strategyReturn.impression = {
      daily: parseInt(impression?.daily) || null,
      global: parseInt(impression?.global) || null
    };
  }

  if (!currentStrategy?.id && schedule?.week_days?.length > 0) {
    const scheduleStartHour = moment(schedule?.start_time).hours();
    const scheduleStartMinute = moment(schedule?.start_time).minutes();
    const scheduleEndHour = moment(schedule?.end_time).hours();
    const scheduleEndMinute = moment(schedule?.end_time).minutes();
    strategyReturn.schedule = {
      week_days:
        schedule?.week_days?.length > 0
          ? Array.from(schedule?.week_days, item => item?.value)
          : [],
      start_hour: parseInt(scheduleStartHour, 10),
      start_minute: parseInt(scheduleStartMinute, 10),
      end_hour: parseInt(scheduleEndHour, 10),
      end_minute: parseInt(scheduleEndMinute, 10),
      time_zone: `${getTimeZoneOffset()}`
    };
  }

  // if (strategy_type?.value === 'premium') {
  const inventoriesBid = formData?.inventories_bid || [];
  strategyReturn.inventories_bid = inventoriesBid;
  // }

  if (strategy_type?.value === StrategyTypes.NORMAL) {
    strategyReturn.cpm_max = convertGuiToApi({value: cpm_max}) || 0;
  }

  if (isSummary) {
    strategyReturn.concept_uuids =
      formData?.concept_uuids?.filter(item => item) || [];
  }

  if (location_uuids?.length) {
    strategyReturn.location_uuids = location_uuids?.map(item => item.value);
  } else {
    strategyReturn.location_uuids = [];
  }

  return strategyReturn;
};

export const isConceptsChanged = ({newConcepts, oldConcepts}) => {
  if (_.isEqual(newConcepts, oldConcepts)) {
    return false;
  }

  return true;
};
