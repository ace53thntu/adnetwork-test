import {ProtocolOptions, Statuses} from 'constants/misc';
import {TrackerReferenceTypes} from 'pages/setting/tracker/constant';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';
import {capitalize} from 'utils/helpers/string.helpers';

export const getMetaExtra = metadata => {
  let tmpMetadata = {...metadata} || {};
  [
    'background_color',
    'duration',
    'extension',
    'width',
    'height',
    'loop',
    'max_bitrate',
    'min_bitrate',
    'max_duration',
    'min_duration',
    'protocols'
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
    ...metadata,
    duration: parseInt(metadata?.duration, 10) || 0,
    width: parseInt(metadata?.width, 10) || 0,
    height: parseInt(metadata?.height, 10) || 0
  };

  // Metadata video format
  if (formatData === 'video') {
    formatMetadata.min_bitrate = parseInt(metadata?.min_bitrate, 10) || 0;
    formatMetadata.max_bitrate = parseInt(metadata?.max_bitrate, 10) || 0;
    formatMetadata.min_duration = parseInt(metadata?.min_duration, 10) || 0;
    formatMetadata.max_duration = parseInt(metadata?.max_duration, 10) || 0;
    formatMetadata.protocols =
      metadata?.protocols?.length > 0
        ? Array.from(metadata?.protocols, item => item.value)
        : [];
    formatMetadata.loop = metadata?.loop === 'active' ? true : false;
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
    metadata: formatMetadata,
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
    tracker = []
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
  metadata.protocols = protocols;
  metadata.loop = metadata?.loop ? 'active' : 'inactive';
  const extra = getMetaExtra(metadata);

  if (typeof extra === 'object' && Object.keys(extra)) {
    metadata.extra = JSON.stringify(extra);
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
    metadata,
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
    }
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
