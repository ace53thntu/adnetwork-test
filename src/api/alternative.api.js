import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class AlternativeAPIService extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  createAlternative = ({data, options = {}}) => {
    return this.post(endpoints.alternative.alternative, data, options);
  };

  updateAlternative = ({alternativeId, data, options = {}}) => {
    return this.put(
      `${endpoints.alternative.alternative}/${alternativeId}`,
      data,
      options
    );
  };

  deleteAlternative = ({alternativeId, options = {}}) => {
    return this.delete(
      `${endpoints.alternative.alternative}/${alternativeId}`,
      {},
      options
    );
  };
}

export const AlternativeAPI = new AlternativeAPIService(apiURL);
