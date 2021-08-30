// export const getValueOfProperty = (propVal, propType) => {

// }

export const destructureFormData = (pageId, formData) => {
  const {
    name,
    format,
    merge,
    metadata,
    minimum_price,
    position_id = 0,
    status,
    tracker_template_id = 0,
    type
  } = formData;
  const formatData = format?.value;
  const minimumPriceData = parseFloat(minimum_price) || '';
  const formatMetadata = {
    ...metadata,
    duration: parseInt(metadata?.duration) ?? 0,
    width: parseInt(metadata?.duration) ?? 0,
    height: parseInt(metadata?.duration) ?? 0,
    tags: metadata?.tags?.map(item => item.value)
  };

  return {
    page_uuid: pageId,
    name,
    format: formatData,
    merge,
    status,
    minimum_price: minimumPriceData,
    type: type?.value ?? '',
    metadata: formatMetadata,
    position_id,
    tracker_template_id
  };
};
