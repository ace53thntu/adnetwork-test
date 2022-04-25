import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class AdsDefaultAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAdsDefaultByContainer = ({cid, params = null, options}) => {
    return this.get(
      `${endpoints.container.container}/${cid}/${endpoints.adsdefault.adsdefaultContaiter}`,
      params,
      options
    );
  };

  getAdsDefault = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.adsdefault.adsdefault}/${id}`,
      params,
      options
    );
  };

  createAdsDefault = ({data, options}) => {
    return this.post(endpoints.adsdefault.adsdefault, data, options);
  };

  editAdsDefault = ({id, data, options}) => {
    return this.put(`${endpoints.adsdefault.adsdefault}/${id}`, data, options);
  };

  deleteAdsDefault = ({id, params}) => {
    return this.delete(`${endpoints.adsdefault.adsdefault}/${id}`, params);
  };
}

export const AdsDefaultAPIRequest = new AdsDefaultAPI(apiURL);
