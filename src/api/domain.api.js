import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class DomainAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllDomain = ({params, options}) => {
    return this.get(endpoints.domain.domain, params, options);
  };

  getDomain = ({id, params = null, options}) => {
    return this.get(`${endpoints.domain.domain}/${id}`, params, options);
  };

  createDomain = ({data, options}) => {
    return this.post(endpoints.domain.domain, data, options);
  };

  editDomain = ({id, data, options}) => {
    return this.put(`${endpoints.domain.domain}/${id}`, data, options);
  };

  deleteDomain = ({id, params}) => {
    return this.delete(`${endpoints.domain.domain}/${id}`, params);
  };
}

export const DomainAPIRequest = new DomainAPI(apiURL);
