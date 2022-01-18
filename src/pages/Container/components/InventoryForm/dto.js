export const mappingInventoryFormToApi = ({pageId, formData}) => {
  const {
    name,
    format,
    metadata,
    floor_price = 0,
    deal_floor_price = 0,
    position_id = 0,
    status,
    tracker_uuid = 0,
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
  const formatMetadata = {
    ...metadata,
    duration: parseInt(metadata?.duration, 10) || 0,
    width: parseInt(metadata?.width, 10) || 0,
    height: parseInt(metadata?.height, 10) || 0
    // tags: Object.assign({}, metadata?.tags)
  };
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
    position_uuid: position_id?.value,
    tracker_uuid: tracker_uuid?.value,
    allow_deal: allow_deal === 'active' ? true : false,
    price_engine: price_engine?.value || null,
    market_type: market_type?.value || null,
    market_dsps: marketDsps,
    tags,
    first_party: first_party === 'active' ? true : false
  };
};
