import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class KeywordAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllKeyword = ({params, options}) => {
    return this.get(endpoints.keyword.keyword, params, options);
  };

  getKeyword = ({id, params = null, options}) => {
    return this.get(`${endpoints.keyword.keyword}/${id}`, params, options);
  };

  createKeyword = ({data, options}) => {
    return this.post(endpoints.keyword.keyword, data, options);
  };

  editKeyword = ({id, data, options}) => {
    return this.put(`${endpoints.keyword.keyword}/${id}`, data, options);
  };

  deleteKeyword = ({id, params}) => {
    return this.delete(`${endpoints.keyword.keyword}/${id}`, params);
  };
}

export const KeywordAPIRequest = new KeywordAPI(apiURL);
