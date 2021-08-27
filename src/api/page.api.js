import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class PageAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getPagesByContainer = ({cid, params = null, options}) => {
    return this.get(
      `${endpoints.container.container}/${cid}/${endpoints.page.pages}`,
      params,
      options
    );
  };

  getPage = ({id, params = null, options}) => {
    return this.get(`${endpoints.page.page}/${id}`, params, options);
  };

  createPage = ({data, options}) => {
    return this.post(endpoints.page.page, data, options);
  };

  editPage = ({id, data, options}) => {
    return this.put(`${endpoints.page.page}/${id}`, data, options);
  };

  deletePage = ({id, params}) => {
    return this.delete(`${endpoints.page.page}/${id}`, params);
  };
}

export const PageAPIRequest = new PageAPI(apiURL);
