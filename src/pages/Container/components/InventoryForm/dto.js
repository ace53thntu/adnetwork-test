import {VideoMineOptions} from 'constants/inventory';
import {LinearityOptions, ProtocolOptions, Statuses} from 'constants/misc';
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
    'pass_back'
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
    formatMetadata.min_bitrate = parseInt(metadata?.min_bitrate, 10) || null;
    formatMetadata.max_bitrate = parseInt(metadata?.max_bitrate, 10) || null;
    formatMetadata.min_duration = parseInt(metadata?.min_duration, 10) || null;
    formatMetadata.max_duration = parseInt(metadata?.max_duration, 10) || null;
    formatMetadata.skip_min = parseInt(metadata?.skip_min, 10) || null;
    formatMetadata.skip_after = parseInt(metadata?.skip_after, 10) || null;
    formatMetadata.start_delay = parseInt(metadata?.start_delay, 10) || null;
    formatMetadata.linearity = metadata?.linearity?.value || null;
    formatMetadata.protocols =
      metadata?.protocols?.length > 0
        ? Array.from(metadata?.protocols, item => item.value)
        : [];
    formatMetadata.mimes =
      metadata?.mimes?.length > 0
        ? Array.from(metadata?.mimes, item => item.value)
        : [];
    formatMetadata.loop = metadata?.loop === 'active' ? 1 : 0;
    formatMetadata.skip = metadata?.skip === 'active' ? 1 : 0;
  }

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
    is_auto_create = false
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
  destructedMetadata.loop =
    metadata?.loop === true || metadata?.loop === 1 ? 'active' : 'inactive';
  destructedMetadata.skip =
    metadata?.skip === true || metadata?.skip === 1 ? 'active' : 'inactive';
  destructedMetadata.linearity =
    LinearityOptions.find(item => item.value === metadata.linearity) || null;
  destructedMetadata.min_bitrate = parseInt(metadata?.min_bitrate, 10) || '';
  destructedMetadata.max_bitrate = parseInt(metadata?.max_bitrate, 10) || '';
  destructedMetadata.min_duration = parseInt(metadata?.min_duration, 10) || '';
  destructedMetadata.max_duration = parseInt(metadata?.max_duration, 10) || '';
  destructedMetadata.skip_min = parseInt(metadata?.skip_min, 10) || '';
  destructedMetadata.skip_after = parseInt(metadata?.skip_after, 10) || '';
  destructedMetadata.start_delay = parseInt(metadata?.start_delay, 10) || '';

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
    is_auto_create: is_auto_create ? 'active' : 'inactive'
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
