import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.AUTH_GATEWAY;

class UserAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getUsers = () => {
    return this.get(endpoints.user.users);
  };
}

export const UserAPIRequest = new UserAPI(apiURL);
