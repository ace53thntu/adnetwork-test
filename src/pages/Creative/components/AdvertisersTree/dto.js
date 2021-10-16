import _ from 'lodash';

export const advertisersRepoToModel = (raw, index) => {
  const {uuid, name, total_concepts = 0} = raw;

  return {
    id: uuid,
    name,
    numChildren: total_concepts,
    children: [],
    page: 0,
    expanded: false,
    selected: index === 0,
    isAdvertiser: true
  };
};

export const advertisersMapData = (data = [], selectedAdvertiserId) => {
  if (_.isArray(data)) {
    return data.map(advertisersRepoToModel);
  }
  return [];
};
