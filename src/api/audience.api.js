import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class AudienceAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllAudience = ({params, options}) => {
    return this.get(endpoints.audience.audience, params, options);
  };

  getAudience = ({id, params = null, options}) => {
    return this.get(`${endpoints.audience.audience}/${id}`, params, options);
  };

  createAudience = ({data, options}) => {
    return this.post(endpoints.audience.audience, data, options);
  };

  editAudience = ({id, data, options}) => {
    return this.put(`${endpoints.audience.audience}/${id}`, data, options);
  };

  deleteAudience = ({id, params}) => {
    return this.delete(`${endpoints.audience.audience}/${id}`, params);
  };
}

export const AudienceAPIRequest = new AudienceAPI(apiURL);
