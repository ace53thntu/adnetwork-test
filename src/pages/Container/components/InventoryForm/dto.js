import {BannerTypeOptions, VideoMineOptions} from 'constants/inventory';
import {LinearityOptions, ProtocolOptions, Statuses} from 'constants/misc';
import {StartDelayOptions} from 'pages/Campaign/constants';
import {InventoryFormats} from 'pages/Container/constants';
import {TrackerReferenceTypes} from 'pages/setting/tracker/constant';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';
import {capitalize} from 'utils/helpers/string.helpers';

export const getMetaExtra = metadata => {
  let tmpMetadata = {...metadata} || {};
  [
    'background_color',
    'extension',
    'width',
    'height',
    'loop',
    'max_bitrate',
    'min_bitrate',
    'max_duration',
    'min_duration',
    'protocols',
    'skip_min',
    'skip_after',
    'start_delay',
    'linearity',
    'mimes',
    'mines',
    'skip',
    'pass_back',
    'banner_type',
    'banner_play_types',
    'duration',
    'cpm',
    'cpc',
    'cpa',
    'cpd',
    'cpl',
    'cpe',
    'cpv',
    'cpi',
    'cpvm'
  ].forEach(element => {
    delete tmpMetadata[element];
  });

  return tmpMetadata;
};

export const mappingInventoryFormToApi = ({pageId, formData}) => {
  const {
    name,
    format,
    metadata,
    floor_price = 0,
    deal_floor_price = 0,
    position_uuid = '',
    status,
    type,
    allow_deal,
    market_type,
    price_engine,
    market_dsps,
    tags: formTags,
    first_party
  } = formData;
  console.log(
    '🚀 ~ file: dto.js ~ line 56 ~ mappingInventoryFormToApi ~ metadata',
    metadata
  );

  const formatData = format?.value || '';

  const floorPrice = HandleCurrencyFields.convertGuiToApi({value: floor_price});
  const dealFloorPrice = HandleCurrencyFields.convertGuiToApi({
    value: deal_floor_price
  });
  let formatMetadata = {
    extension: metadata?.extension || '',
    background_color: metadata?.background_color || '',
    width: parseInt(metadata?.width, 10) || 0,
    height: parseInt(metadata?.height, 10) || 0,
    pass_back: metadata?.pass_back || ''
  };

  // Metadata video format
  if (formatData === InventoryFormats.VIDEO) {
    if (metadata?.min_bitrate || parseInt(metadata?.min_bitrate, 10) === 0) {
      formatMetadata.min_bitrate =
        parseInt(metadata?.min_bitrate, 10) === 0
          ? 0
          : parseInt(metadata?.min_bitrate, 10) || null;
    }
    if (metadata?.max_bitrate) {
      formatMetadata.max_bitrate = parseInt(metadata?.max_bitrate, 10) || null;
    }
    console.log(
      'metadata?.min_duration',
      metadata?.min_duration || parseInt(metadata?.min_duration, 10) === 0
    );
    if (metadata?.min_duration || parseInt(metadata?.min_duration, 10) === 0) {
      formatMetadata.min_duration =
        parseInt(metadata?.min_duration, 10) === 0
          ? 0
          : parseInt(metadata?.min_duration, 10) || null;
    }
    if (metadata?.max_duration) {
      formatMetadata.max_duration =
        parseInt(metadata?.max_duration, 10) || null;
    }
    if (metadata?.skip === 'true') {
      if (metadata?.skip_min) {
        formatMetadata.skip_min = parseInt(metadata?.skip_min, 10) || null;
      }
      if (metadata?.skip_after) {
        formatMetadata.skip_after = parseInt(metadata?.skip_after, 10) || null;
      }
    }

    if (metadata.start_delay) {
      formatMetadata.start_delay = metadata?.start_delay
        ? metadata.start_delay?.value
        : null;
    }
    if (metadata?.linearity) {
      formatMetadata.linearity = metadata?.linearity?.value || null;
    }
    if (metadata?.protocols?.length > 0) {
      formatMetadata.protocols =
        metadata?.protocols?.length > 0
          ? Array.from(metadata?.protocols, item => item.value)
          : [];
    }
    if (metadata?.mimes?.length > 0) {
      formatMetadata.mimes =
        metadata?.mimes?.length > 0
          ? Array.from(metadata?.mimes, item => item.value)
          : [];
    }

    if (
      metadata?.loop !== null &&
      metadata?.loop !== undefined &&
      metadata?.loop !== ''
    ) {
      if (metadata?.loop === 'true') {
        formatMetadata.loop = 1;
      }
      if (metadata?.loop === 'false') {
        formatMetadata.loop = 0;
      }
    } else {
      formatMetadata.loop = null;
    }

    if (
      metadata?.skip !== null &&
      metadata?.skip !== undefined &&
      metadata?.skip !== ''
    ) {
      if (metadata?.skip === 'true') {
        formatMetadata.skip = 1;
      }
      if (metadata?.skip === 'false') {
        formatMetadata.skip = 0;
      }
    } else {
      formatMetadata.skip = null;
    }

    // formatMetadata.loop = metadata?.loop === 'active' ? 1 : 0;
    // formatMetadata.skip = metadata?.skip === 'active' ? 1 : 0;
  }

  // Metadata banner format
  if (formatData === InventoryFormats.BANNER) {
    formatMetadata.banner_type = metadata?.banner_type?.value || null;
    formatMetadata.banner_play_type = metadata?.banner_play_type?.value || null;
  }

  // Metadata Price model
  formatMetadata.cpm = HandleCurrencyFields.convertGuiToApi({value: metadata?.cpm});
  formatMetadata.cpc = HandleCurrencyFields.convertGuiToApi({value: metadata?.cpc});
  formatMetadata.cpa = HandleCurrencyFields.convertGuiToApi({value: metadata?.cpa});
  formatMetadata.cpd = HandleCurrencyFields.convertGuiToApi({value: metadata?.cpd});
  formatMetadata.cpl = HandleCurrencyFields.convertGuiToApi({value: metadata?.cpl});
  formatMetadata.cpe = HandleCurrencyFields.convertGuiToApi({value: metadata?.cpe});
  formatMetadata.cpv = HandleCurrencyFields.convertGuiToApi({value: metadata?.cpv});
  formatMetadata.cpi = HandleCurrencyFields.convertGuiToApi({value: metadata?.cpi});
  formatMetadata.cpvm = HandleCurrencyFields.convertGuiToApi({value: metadata?.cpvm});

  // Metadata extra
  if (metadata?.extra) {
    try {
      const extra = JSON.parse(metadata.extra);
      formatMetadata = {...formatMetadata, ...extra};
      delete formatMetadata.extra;
    } catch (err) {
      console.log(
        '🚀 ~ file: dto.js ~ line 49 ~ mappingInventoryFormToApi ~ err',
        err
      );
    }
  }



  const tags = formTags?.map(item => item?.value);

  const marketDsps = market_dsps
    ? Array.from(market_dsps, dsp => dsp?.value)
    : [];

  return {
    page_uuid: pageId,
    name,
    format: formatData,
    status,
    floor_price: floorPrice,
    deal_floor_price: dealFloorPrice,
    type: type?.value || '',
    metadata: {...formatMetadata},
    position_uuid: position_uuid?.value,
    allow_deal: allow_deal === 'active' ? true : false,
    price_engine: price_engine?.value || null,
    market_type: market_type?.value || null,
    market_dsps: marketDsps,
    tags,
    first_party: first_party === 'active' ? true : false
  };
};

export const mappingInventoryApiToForm = ({
  inventory,
  inventoryTypes,
  inventoryFormats
}) => {
  const {
    uuid,
    name,
    status,
    type,
    format,
    floor_price,
    metadata,
    fill_rate,
    click_rate,
    position_uuid,
    position_name,
    deal_floor_price,
    allow_deal,
    market_type,
    price_engine,
    market_dsps = [],
    tags,
    tracker = [],
    is_auto_create = false,
    first_party
  } = inventory;
  const destructureType = inventoryTypes.find(item => item.value === type);
  const destructurePosition =
    {value: position_uuid, label: position_name} || null;

  const destructureFormat = inventoryFormats.find(
    item => item.value === format
  );
  const marketDsps = market_dsps
    ? Array.from(market_dsps, item => ({
        value: item?.uuid,
        label: item?.name
      }))
    : [];
  let tagsParsed = tags?.map(tag => ({value: tag, label: capitalize(tag)}));
  let destructedMetadata = {
    width: metadata?.width,
    height: metadata?.height,
    extension: metadata?.extension,
    background_color: metadata?.background_color,
    pass_back: metadata?.pass_back
  };
  const protocols =
    metadata?.protocols?.length > 0
      ? metadata?.protocols?.map(item => {
          const protocolFound = ProtocolOptions?.find(
            option => option.value === item
          );
          if (protocolFound) {
            return protocolFound;
          }
          return null;
        })
      : [];
  destructedMetadata.protocols = protocols;
  const mimes =
    metadata?.mimes?.length > 0
      ? metadata?.mimes?.map(item => {
          const videoMineFound = VideoMineOptions?.find(
            option => option.value === item
          );
          if (videoMineFound) {
            return videoMineFound;
          }
          return null;
        })
      : [];
  destructedMetadata.mimes = mimes;
  destructedMetadata.loop = convertBooleanToRadioValue(metadata?.loop);
  // metadata?.loop === true || metadata?.loop === 1 ? 'active' : 'inactive';
  destructedMetadata.skip = convertBooleanToRadioValue(metadata?.skip);
  // metadata?.skip === true || metadata?.skip === 1 ? 'active' : 'inactive';
  destructedMetadata.linearity =
    LinearityOptions.find(item => item.value === metadata.linearity) || null;
  destructedMetadata.min_bitrate =
    metadata?.min_bitrate === 0 ? 0 : parseInt(metadata?.min_bitrate, 10) || '';
  destructedMetadata.max_bitrate =
    metadata?.max_bitrate === 0 ? 0 : parseInt(metadata?.max_bitrate, 10) || '';
  destructedMetadata.min_duration =
    metadata?.min_duration === 0
      ? 0
      : parseInt(metadata?.min_duration, 10) || '';
  destructedMetadata.max_duration = parseInt(metadata?.max_duration, 10) || '';
  destructedMetadata.skip_min =
    metadata?.skip_min === 0 ? 0 : parseInt(metadata?.skip_min, 10) || '';
  destructedMetadata.skip_after =
    metadata?.skip_after === 0 ? 0 : parseInt(metadata?.skip_after, 10) || '';
  destructedMetadata.start_delay =
    StartDelayOptions.find(item => item.value === metadata?.start_delay) ||
    null;
  const bannerTypeSelected = BannerTypeOptions.find(
    item => item.value === metadata?.banner_type
  );
  const bannerPlayTypeSelected = BannerTypeOptions.find(
    item => item.value === metadata?.banner_play_type
  );
  destructedMetadata.banner_type = bannerTypeSelected;
  destructedMetadata.banner_play_type = bannerPlayTypeSelected;

  // Price model
  destructedMetadata.cpm = HandleCurrencyFields.convertApiToGui({value: metadata?.cpm});
  destructedMetadata.cpc = HandleCurrencyFields.convertApiToGui({value: metadata?.cpc});
  destructedMetadata.cpa = HandleCurrencyFields.convertApiToGui({value: metadata?.cpa});
  destructedMetadata.cpd = HandleCurrencyFields.convertApiToGui({value: metadata?.cpd});
  destructedMetadata.cpl = HandleCurrencyFields.convertApiToGui({value: metadata?.cpl});
  destructedMetadata.cpe = HandleCurrencyFields.convertApiToGui({value: metadata?.cpe});
  destructedMetadata.cpv = HandleCurrencyFields.convertApiToGui({value: metadata?.cpv});
  destructedMetadata.cpi = HandleCurrencyFields.convertApiToGui({value: metadata?.cpi});
  destructedMetadata.cpvm = HandleCurrencyFields.convertApiToGui({value: metadata?.cpvm});


  const extra = getMetaExtra(metadata);

  if (typeof extra === 'object' && Object.keys(extra)) {
    destructedMetadata.extra = JSON.stringify(extra);
  }

  let floorPrice = '',
    dealFloorPrice = '';
  if (floor_price > 0) {
    floorPrice = HandleCurrencyFields.convertApiToGui({value: floor_price});
  }

  if (deal_floor_price > 0) {
    dealFloorPrice = HandleCurrencyFields.convertApiToGui({
      value: deal_floor_price
    });
  }

  const trackerObj = tracker?.[0];
  let templateUuid, templateName, variables;
  if (trackerObj) {
    templateUuid = trackerObj?.template_uuid;
    templateName = trackerObj?.tracker_template?.name;
    variables = JSON.stringify(trackerObj?.variables);
  }

  return {
    uuid,
    name,
    status,
    type: destructureType,
    format: destructureFormat,
    floor_price: floorPrice,
    deal_floor_price: dealFloorPrice,
    metadata: destructedMetadata,
    fill_rate,
    click_rate,
    position_uuid: destructurePosition,
    allow_deal: allow_deal ? 'active' : 'inactive',
    market_type: market_type
      ? {value: market_type, label: capitalize(market_type)}
      : null,
    price_engine: price_engine
      ? {value: price_engine, label: capitalize(price_engine)}
      : null,
    market_dsps: marketDsps || [],
    tags: tagsParsed,
    tracker: {
      template_uuid: templateUuid
        ? {value: templateUuid, label: templateName}
        : null,
      variables
    },
    is_auto_create: is_auto_create ? 'active' : 'inactive',
    first_party: first_party ? 'active' : 'inactive'
  };
};

export const mappingTrackerFormToApi = ({tracker, inventoryId}) => {
  const {template_uuid, variables} = tracker;
  return {
    template_uuid: template_uuid ? template_uuid?.value : '',
    reference_type: TrackerReferenceTypes.INVENTORY,
    reference_uuid: inventoryId,
    variables,
    status: Statuses.ACTIVE
  };
};

const convertBooleanToRadioValue = value => {
  if (value === true || value === 1) {
    return 'true';
  }
  if (value === false || value === 0) {
    return 'false';
  }
  return '';
};
