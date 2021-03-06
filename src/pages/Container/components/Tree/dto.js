import _ from 'lodash';

export const containersRepoToModel = (raw, containerId = '') => {
  const {
    uuid: id,
    name,
    importCount = 0,
    transferCount = 0,
    sources = {},
    total_pages
  } = raw;

  const sourceConverted = sources?.reduce((acc, item) => {
    acc = {...acc, [item]: 1};
    return acc;
  }, {});

  let result = {
    id,
    name,
    children: [],
    page: 0,
    expanded: false,
    selected: id === containerId ? true : false,
    isContainer: true,
    importCount,
    transferCount,
    source: sourceConverted,
    numChildren: 0
  };

  // if (importCount > 0) {
  //   result.numChildren += 1;
  // }
  // if (transferCount > 0) {
  //   result.numChildren += 1;
  // }
  if (total_pages > 0) {
    result.numChildren += 1;
  }

  return result;
};

export const containersMapData = (data = [], container = null) => {
  const containerId = container?.uuid || '';
  if (_.isArray(data)) {
    return data.map((item, index) => containersRepoToModel(item, containerId));
  }
  return [];
};
