import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class AdvertiserAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllAdvertiser = ({params = {}, options = {}}) => {
    return this.get(endpoints.advertiser.advertiser, params, options);
  };

  getAdvertiser = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.advertiser.advertiser}/${id}`,
      params,
      options
    );
  };

  createAdvertiser = ({data, options}) => {
    return this.post(endpoints.advertiser.advertiser, data, options);
  };

  editAdvertiser = ({id, data, options}) => {
    return this.put(`${endpoints.advertiser.advertiser}/${id}`, data, options);
  };

  deleteAdvertiser = ({id, params}) => {
    return this.delete(`${endpoints.advertiser.advertiser}/${id}`, params);
  };
}

export const AdvertiserAPIRequest = new AdvertiserAPI(apiURL);
