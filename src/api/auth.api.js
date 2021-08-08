import {XHRRequest} from 'utils/helpers/xhr.helpers';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.AUTH_GATEWAY;

const endpoints = {
  login: 'login',
  logout: 'logout',
  authorize: 'authorize',
  refreshToken: 'access_token'
};

class AuthAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  login = ({email, password}) => {
    return this.post(endpoints.login, {
      usernameOrEmail: email,
      password
    });
  };

  getProfile = () => {
    return this.get(endpoints.authorize);
  };
}

export const AuthAPIRequest = new AuthAPI(`${apiURL}/v1`);
