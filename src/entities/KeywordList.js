import {Statuses} from 'constants/misc';

export const KEYWORD_LIST_ENTITY = {
  id: '',
  uuid: '',
  name: '',
  keywords: [],
  description: '',
  shared: false,
  status: Statuses.ACTIVE
};

export const apiToForm = ({keywordList = null}) => {
  if (keywordList) {
    const {uuid: id, name, description, keywords, shared, status} = keywordList;

    const keywordConverted = keywords?.map(keyword => ({
      value: keyword,
      label: keyword
    }));
    return {
      uuid: id,
      id,
      name,
      description,
      keywords: keywordConverted,
      shared: shared ? 'active' : 'inactive',
      status
    };
  }

  return KEYWORD_LIST_ENTITY;
};

export const formToApi = ({formData = {}}) => {
  if (formData) {
    const {name, description, keywords, shared, status = 'active'} = formData;
    const keywordConverted =
      Array.from(keywords, keyword => keyword?.value) || [];

    return {
      name,
      description,
      keywords: keywordConverted,
      shared: shared === 'active' ? true : false,
      status
    };
  }

  return KEYWORD_LIST_ENTITY;
};
