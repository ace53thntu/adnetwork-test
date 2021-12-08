import {COLLECT_TYPES, EVENT_TYPES_VALUE} from '../PageEvent/constants';

export const createPageFormValuesToRepo = (raw, containerId, source) => {
  const {name, url, pageType: pageTypeId, tags: pageTags, status} = raw;

  let pageRequestData = {
    name: name.trim(),
    pageType: pageTypeId.id,
    tags: Array.from(pageTags, tag => ({
      id: tag.id
    })),
    status,
    containerId,
    source
  };

  if (source === 'web') {
    pageRequestData.url = url;
  }

  const eventPageData = {
    status: 'active',
    type: EVENT_TYPES_VALUE.page,
    collectType: COLLECT_TYPES.auto,
    params: {
      category: null,
      name: pageRequestData.name
    },
    name: pageRequestData.name
  };

  return {
    pageRequestData,
    eventPageData
  };
};
