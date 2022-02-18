import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class ContainerAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllContainer = ({params, options}) => {
    return this.get(endpoints.container.container, params, options);
  };

  getContainer = ({id, params = null, options}) => {
    return this.get(`${endpoints.container.container}/${id}`, params, options);
  };

  createContainer = ({data, options}) => {
    return this.post(endpoints.container.container, data, options);
  };

  editContainer = ({id, data, options}) => {
    return this.put(`${endpoints.container.container}/${id}`, data, options);
  };

  deleteContainer = ({id, params}) => {
    return this.delete(`${endpoints.container.container}/${id}`, params);
  };

  getContainerPages = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.container.container}/${id}/${endpoints.page.pages}`,
      params,
      options
    );
  };
}

export const ContainerAPIRequest = new ContainerAPI(apiURL);
