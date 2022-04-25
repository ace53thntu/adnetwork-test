import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class IABsAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllIABs = ({params = null, options}) => {
    return this.get(`${endpoints.iabs.iabs}`, params, options);
  };

  getIABs = ({id, params = null, options}) => {
    return this.get(`${endpoints.iabs.iabs}/${id}`, params, options);
  };

  createIABs = ({data, options}) => {
    return this.post(endpoints.iabs.iabs, data, options);
  };

  editIABs = ({id, data, options}) => {
    return this.put(`${endpoints.iabs.iabs}/${id}`, data, options);
  };

  deleteIABs = ({id, params}) => {
    return this.delete(`${endpoints.iabs.iabs}/${id}`, params);
  };
}

export const IABsAPIRequest = new IABsAPI(apiURL);
