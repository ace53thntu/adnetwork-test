import {XHRRequest} from 'utils/helpers/xhr.helpers';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.AUTH_GATEWAY;

const endpoints = {
  users: 'users'
};

class UserAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getUsers = () => {
    return this.get(endpoints.users);
  };
}

export const UserAPIRequest = new UserAPI(`${apiURL}/v1`);
