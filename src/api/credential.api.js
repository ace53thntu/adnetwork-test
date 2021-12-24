import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class CredentialAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getCredentials = ({params, options}) =>
    this.get(`${endpoints.credential.credential}`, params, options);

  getCredential = ({id, params, options}) =>
    this.get(`${endpoints.credential.credential}/${id}`, params, options);

  regenerateCredential = ({id, data, options}) =>
    this.put(
      `${endpoints.credential.credential}/${id}/${endpoints.credential.rerollKey}`,
      data,
      options
    );
}

export const CredentialAPIRequest = new CredentialAPI(apiURL);
