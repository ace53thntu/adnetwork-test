import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './endpoints.api';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.AUTH_GATEWAY;

class AdvertiserAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllAdvertiser = ({params, options}) => {
    return this.get(endpoints.advertiser, params, options);
  };

  getAdvertiser = ({id, params = null, options}) => {
    return this.get(`${endpoints.advertiser}/${id}`, params, options);
  };

  createAdvertiser = ({data, options}) => {
    return this.post(endpoints.advertiser, data, options);
  };

  editAdvertiser = ({id, data, options}) => {
    return this.put(`${endpoints.advertiser}/${id}`, data, options);
  };

  deleteAdvertiser = ({id, params}) => {
    return this.delete(`${endpoints.advertiser}/${id}`, params);
  };
}

export const AdvertiserAPIRequest = new AdvertiserAPI(`${apiURL}/v1`);
