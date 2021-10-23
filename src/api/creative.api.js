import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class CreativeAPIService extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  createCreative = ({data, options = {}}) => {
    return this.post(endpoints.creative.creative, data, options);
  };

  getConfig = ({options = {}}) => {
    return this.get(endpoints.creative.config, {}, options);
  };

  getCreatives = ({params = {}, options = {}}) => {
    return this.get(endpoints.creative.creative, params, options);
  };

  deleteCreative = ({creativeId, options = {}}) => {
    return this.delete(
      `${endpoints.creative.creative}/${creativeId}`,
      {},
      options
    );
  };

  getCreative = ({creativeId, options = {}}) => {
    return this.get(
      `${endpoints.creative.creative}/${creativeId}`,
      {},
      options
    );
  };
}

export const CreativeAPI = new CreativeAPIService(apiURL);
