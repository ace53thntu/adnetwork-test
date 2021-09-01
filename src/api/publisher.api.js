import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class PublisherAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllPublisher = ({params = null, options}) => {
    return this.get(`${endpoints.publisher.publisher}`, params, options);
  };

  getPublisher = ({id, params = null, options}) => {
    return this.get(`${endpoints.publisher.publisher}/${id}`, params, options);
  };

  createPublisher = ({data, options}) => {
    return this.post(endpoints.publisher.publisher, data, options);
  };

  editPublisher = ({id, data, options}) => {
    return this.put(`${endpoints.publisher.publisher}/${id}`, data, options);
  };

  deletePublisher = ({id, params}) => {
    return this.delete(`${endpoints.publisher.publisher}/${id}`, params);
  };
}

export const PublisherAPIRequest = new PublisherAPI(apiURL);
