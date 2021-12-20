import _ from 'lodash';

export const advertisersRepoToModel = raw => {
  const {uuid: id, name, total_campaigns} = raw;

  let result = {
    id,
    name,
    children: [],
    page: 0,
    expanded: false,
    selected: false,
    isAdvertiser: true,
    numChildren: total_campaigns || 0
  };

  return result;
};

export const advertisersMapData = (data = []) => {
  if (_.isArray(data)) {
    return data.map((item, index) => advertisersRepoToModel(item));
  }
  return [];
};
