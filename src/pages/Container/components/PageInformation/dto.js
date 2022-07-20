export const rawDataToFormDefaultValues = (raw, pageTags = [], source) => {
  if (raw) {
    const {name = '', status = '', url = '', tags = [], context = ''} = raw;

    let result = {
      name,
      status,
      tags: [],
      context
    };
    if (source === 'web') {
      result.url = url;
    }

    if (tags?.length) {
      const tagIds = tags.map(tag => tag);
      result.tags = pageTags
        ?.filter(tag => tagIds.includes(tag.value))
        .map(item => ({
          label: item.label,
          value: item.value
        }));
    }
    return result;
  }
  return {
    name: '',
    status: 'active',
    url: '',
    pageType: null,
    tags: [],
    context: ''
  };
};

export const pageInformationFormValuesToRepo = (
  formValues,
  rawData,
  containerId,
  source
) => {
  const {name, url, tags, status, context} = formValues;

  let updatedData = {
    name: name.trim(),
    tags: Array.from(tags, tag => tag?.value),
    status: status,
    container_uuid: containerId,
    source: rawData.source,
    context
  };
  if (source === 'web') {
    updatedData.url = url.trim();
  }
  return updatedData;
};
