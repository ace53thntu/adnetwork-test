import _ from 'lodash';

export const advertisersRepoToModel = (raw, index, currentPage) => {
  const {uuid, name, total_concepts = 0} = raw;

  return {
    id: uuid,
    name,
    numChildren: total_concepts,
    children: [],
    page: 0,
    expanded: false,
    selected: currentPage === 1 ? index === 0 : false,
    isAdvertiser: true
  };
};

export const advertisersMapData = (data = [], currentPage) => {
  if (_.isArray(data)) {
    return data.map((item, index) =>
      advertisersRepoToModel(item, index, currentPage)
    );
  }
  return [];
};
