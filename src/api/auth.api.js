import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.AUTH_GATEWAY;

class AuthAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  login = ({email, password}) => {
    return this.post(endpoints.auth.login, {
      email,
      password
    });
  };

  getProfile = () => {
    return this.get(endpoints.auth.authorize);
  };
}

export const AuthAPIRequest = new AuthAPI(apiURL);
