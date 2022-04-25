import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class CappingAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllCapping = ({params, options}) => {
    return this.get(endpoints.capping.capping, params, options);
  };

  getCapping = ({id, params = null, options}) => {
    return this.get(`${endpoints.capping.capping}/${id}`, params, options);
  };

  createCapping = ({data, options}) => {
    return this.post(endpoints.capping.capping, data, options);
  };

  editCapping = ({id, data, options}) => {
    return this.put(`${endpoints.capping.capping}/${id}`, data, options);
  };

  deleteCapping = ({id, params}) => {
    return this.delete(`${endpoints.capping.capping}/${id}`, params);
  };
}

export const CappingAPIRequest = new CappingAPI(apiURL);
