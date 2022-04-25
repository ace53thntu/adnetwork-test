import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class PositionAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllPosition = ({params = null, options}) => {
    return this.get(`${endpoints.position.position}`, params, options);
  };

  getPosition = ({id, params = null, options}) => {
    return this.get(`${endpoints.position.position}/${id}`, params, options);
  };

  createPosition = ({data, options}) => {
    return this.post(endpoints.position.position, data, options);
  };

  editPosition = ({id, data, options}) => {
    return this.put(`${endpoints.position.position}/${id}`, data, options);
  };

  deletePosition = ({id, params}) => {
    return this.delete(`${endpoints.position.position}/${id}`, params);
  };
}

export const PositionAPIRequest = new PositionAPI(apiURL);
