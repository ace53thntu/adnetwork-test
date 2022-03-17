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
    position_uuid = 0,
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

  const minimumPriceData = parseFloat(floor_price) || 0;
  const dealFloorPriceData = parseFloat(deal_floor_price) || 0;
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
    floor_price: minimumPriceData,
    deal_floor_price: dealFloorPriceData,
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
