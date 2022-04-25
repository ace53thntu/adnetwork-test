import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class KeywordListAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllKeywordList = ({params, options}) => {
    return this.get(endpoints.keywordList.keywordList, params, options);
  };

  getKeywordList = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.keywordList.keywordList}/${id}`,
      params,
      options
    );
  };

  createKeywordList = ({data, options}) => {
    return this.post(endpoints.keywordList.keywordList, data, options);
  };

  editKeywordList = ({id, data, options}) => {
    return this.put(
      `${endpoints.keywordList.keywordList}/${id}`,
      data,
      options
    );
  };

  deleteKeywordList = ({id, params}) => {
    return this.delete(`${endpoints.keywordList.keywordList}/${id}`, params);
  };
}

export const KeywordListAPIRequest = new KeywordListAPI(apiURL);
