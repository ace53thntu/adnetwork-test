import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class ActivationAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getActivation = ({params = null, options}) => {
    return this.get(`${endpoints.activation.activation}/url`, params, options);
  };
}

export const ActivationRequestAPI = new ActivationAPI(apiURL);
