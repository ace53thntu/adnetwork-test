import {LinearityOptions, ProtocolOptions} from 'constants/misc';
import _ from 'lodash';
import moment from 'moment';
import {
  BandwidthOptions,
  BrowsersOptions,
  DeviceTypeOptions,
  OperatingSystemOptions,
  PlacementTypeOptions,
  PlatformOptions,
  Priority,
  PriorityOptions,
  StartDelayOptions,
  StrategyTypes
} from 'pages/Campaign/constants';
import {convertApiToGui, convertGuiToApi} from 'utils/handleCurrencyFields';
import {getBrowserLanguages} from 'utils/helpers/getBrowserLanguages';
import {getListCarriers} from 'utils/helpers/getListCarriers';
import {getListMobilePhoneBrands} from 'utils/helpers/getListMobilePhoneBrands';
import {capitalize} from 'utils/helpers/string.helpers';
import {getTimeZoneOffset} from 'utils/metrics';

const formatListData = (listData = []) => {
  return listData?.length > 0 ? Array.from(listData, item => item.value) : [];
};

const convertListToGui = ({baseList = [], selectedList = []}) => {
  if (selectedList?.length > 0) {
    return selectedList?.map(item =>
      baseList?.find(baseItem => baseItem?.value === item)
    );
  }

  return [];
};

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
      skip_delay: video_filter?.skip_delay || '',
      start_delay:
        StartDelayOptions?.find(
          item => item?.value === video_filter?.start_delay
        ) || null,
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
      browser: convertListToGui({
        baseList: BrowsersOptions,
        selectedList: context_filter?.browser || []
      }),
      operating_system: convertListToGui({
        baseList: OperatingSystemOptions,
        selectedList: context_filter?.operating_system || []
      }),
      bandwidth: convertListToGui({
        baseList: BandwidthOptions,
        selectedList: context_filter?.bandwidth || []
      }),
      mobile_carrier: convertListToGui({
        baseList: getListCarriers(),
        selectedList: context_filter?.mobile_carrier || []
      }),
      browser_language: convertListToGui({
        baseList: getBrowserLanguages(),
        selectedList: context_filter?.browser_language || []
      }),
      device_manufacturer: convertListToGui({
        baseList: getListMobilePhoneBrands(),
        selectedList: context_filter?.device_manufacturer || []
      }),
      device_type: convertListToGui({
        baseList: DeviceTypeOptions,
        selectedList: context_filter?.device_type || []
      }),
      platform: convertListToGui({
        baseList: PlatformOptions,
        selectedList: context_filter?.platform || []
      })
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
    context_filter,
    domain_groups_white,
    domain_groups_black,
    keywords_list_white,
    keywords_list_black
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
    videoFilter.start_delay = video_filter?.start_delay?.value;
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
    contextFilter.browser = formatListData(context_filter.browser);
  }
  if (context_filter?.operating_system) {
    contextFilter.operating_system = formatListData(
      context_filter?.operating_system
    );
  }
  if (context_filter?.browser_language) {
    contextFilter.browser_language = formatListData(
      context_filter?.browser_language
    );
  }
  if (context_filter?.device_manufacturer) {
    contextFilter.device_manufacturer = formatListData(
      context_filter?.device_manufacturer
    );
  }
  if (context_filter?.bandwidth) {
    contextFilter.bandwidth = formatListData(context_filter?.bandwidth);
  }
  if (context_filter?.mobile_carrier) {
    contextFilter.mobile_carrier = formatListData(
      context_filter?.mobile_carrier
    );
  }
  if (context_filter?.device_type) {
    contextFilter.mobile_carrier = formatListData(context_filter?.device_type);
  }
  if (context_filter?.platform) {
    contextFilter.mobile_carrier = formatListData(context_filter?.platform);
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
          start_delay: video_filter?.start_delay?.value || null,
          ptype: video_filter?.ptype?.value || null,
          linearity: video_filter?.linearity?.value || null,
          protocols: video_filter?.protocols?.value || null
        },
    context_filter: !isEdit
      ? contextFilter
      : {
          browser: formatListData(context_filter?.browser),
          operating_system: formatListData(context_filter?.operating_system),
          browser_language: formatListData(context_filter?.browser_language),
          device_manufacturer: formatListData(
            context_filter?.device_manufacturer
          ),
          bandwidth: formatListData(context_filter?.bandwidth),
          mobile_carrier: formatListData(context_filter?.mobile_carrier),
          platform: formatListData(context_filter?.platform),
          device_type: formatListData(context_filter?.device_type)
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

    if (domain_groups_white && domain_groups_white?.length > 0) {
      strategyReturn.domain_groups_white = Array.from(
        domain_groups_white,
        domain => domain?.value
      );
    }

    if (domain_groups_black && domain_groups_black?.length > 0) {
      strategyReturn.domain_groups_black = Array.from(
        domain_groups_black,
        domain => domain?.value
      );
    }

    if (keywords_list_white && keywords_list_white?.length > 0) {
      strategyReturn.keywords_list_white = Array.from(
        keywords_list_white,
        domain => domain?.value
      );
    }

    if (keywords_list_black && keywords_list_black?.length > 0) {
      strategyReturn.keywords_list_black = Array.from(
        keywords_list_black,
        domain => domain?.value
      );
    }
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
