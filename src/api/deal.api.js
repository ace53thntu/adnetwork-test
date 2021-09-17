import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class DealAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllDeal = ({params, options}) => {
    return this.get(endpoints.deal.deal, params, options);
  };

  getDeal = ({id, params = null, options}) => {
    return this.get(`${endpoints.deal.deal}/${id}`, params, options);
  };

  createDeal = ({data, options}) => {
    return this.post(endpoints.deal.deal, data, options);
  };

  editDeal = ({id, data, options}) => {
    return this.put(`${endpoints.deal.deal}/${id}`, data, options);
  };

  deleteDeal = ({id, params}) => {
    return this.delete(`${endpoints.deal.deal}/${id}`, params);
  };
}

export const DealAPIRequest = new DealAPI(apiURL);
