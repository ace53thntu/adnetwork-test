export const mappingInventoryFormToApi = ({pageId, formData}) => {
  const {
    name,
    format,
    merge,
    metadata,
    floor_price,
    deal_floor_price,
    position_id = 0,
    status,
    tracker_template_uuid = 0,
    type,
    enable_deal,
    market_type,
    price_engine,
    market_dsps
  } = formData;

  const formatData = format?.value;
  const minimumPriceData = parseFloat(floor_price) || '';
  const dealFloorPriceData = parseFloat(deal_floor_price) || '';
  const formatMetadata = {
    ...metadata,
    duration: parseInt(metadata?.duration) ?? 0,
    width: parseInt(metadata?.duration) ?? 0,
    height: parseInt(metadata?.duration) ?? 0,
    tags: metadata?.tags?.map(item => item?.value)
  };

  const marketDsps = market_dsps
    ? Array.from(market_dsps, dsp => dsp?.value)
    : [];

  return {
    page_uuid: pageId,
    name,
    format: formatData,
    merge,
    status,
    floor_price: minimumPriceData,
    deal_floor_price: dealFloorPriceData,
    type: type?.value ?? '',
    metadata: formatMetadata,
    position_id: position_id?.value,
    tracker_template_uuid: tracker_template_uuid?.value,
    enable_deal: enable_deal === 'active' ? true : false,
    price_engine: price_engine?.value || null,
    market_type: market_type?.value || null,
    market_dsps: marketDsps
  };
};
