import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.AUTH_GATEWAY;

class UserAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllUser = ({params, options}) => {
    return this.get(endpoints.user.user, params, options);
  };

  getUser = ({id, params, options}) => {
    return this.get(`${endpoints.user.user}/${id}`, params, options);
  };

  getMe = () => {
    return this.get(endpoints.user.me);
  };

  createUser = ({data, options}) => {
    return this.post(endpoints.user.user, data, options);
  };

  editUser = ({id, data, options}) => {
    return this.put(`${endpoints.user.user}/${id}`, data, options);
  };

  deleteUser = ({id, params}) => {
    return this.delete(`${endpoints.user.user}/${id}`, params);
  };
}

export const UserAPIRequest = new UserAPI(apiURL);
