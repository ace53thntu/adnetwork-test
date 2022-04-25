import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class DomainGroupAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllDomainGroup = ({params, options}) => {
    return this.get(endpoints.domainGroup.domainGroup, params, options);
  };

  getDomainGroup = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.domainGroup.domainGroup}/${id}`,
      params,
      options
    );
  };

  createDomainGroup = ({data, options}) => {
    return this.post(endpoints.domainGroup.domainGroup, data, options);
  };

  editDomainGroup = ({id, data, options}) => {
    return this.put(
      `${endpoints.domainGroup.domainGroup}/${id}`,
      data,
      options
    );
  };

  deleteDomainGroup = ({id, params}) => {
    return this.delete(`${endpoints.domainGroup.domainGroup}/${id}`, params);
  };
}

export const DomainGroupAPIRequest = new DomainGroupAPI(apiURL);
