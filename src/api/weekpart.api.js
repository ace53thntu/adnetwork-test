import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class WeekpartAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllWeekpart = ({params, options}) => {
    return this.get(endpoints.weekpart.weekpart, params, options);
  };

  getWeekpart = ({id, params = null, options}) => {
    return this.get(`${endpoints.weekpart.weekpart}/${id}`, params, options);
  };

  createWeekpart = ({data, options}) => {
    return this.post(endpoints.weekpart.weekpart, data, options);
  };

  editWeekpart = ({id, data, options}) => {
    return this.put(`${endpoints.weekpart.weekpart}/${id}`, data, options);
  };

  deleteWeekpart = ({id, params}) => {
    return this.delete(`${endpoints.weekpart.weekpart}/${id}`, params);
  };
}

export const WeekpartAPIRequest = new WeekpartAPI(apiURL);
