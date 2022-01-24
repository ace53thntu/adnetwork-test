import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class DomainGroupAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllDomainGroup = ({params, options}) => {
    return this.get(endpoints.domain.domain, params, options);
  };

  getDomainGroup = ({id, params = null, options}) => {
    return this.get(`${endpoints.domain.domain}/${id}`, params, options);
  };

  createDomainGroup = ({data, options}) => {
    return this.post(endpoints.domain.domain, data, options);
  };

  editDomainGroup = ({id, data, options}) => {
    return this.put(`${endpoints.domain.domain}/${id}`, data, options);
  };

  deleteDomainGroup = ({id, params}) => {
    return this.delete(`${endpoints.domain.domain}/${id}`, params);
  };
}

export const DomainGroupAPIRequest = new DomainGroupAPI(apiURL);
