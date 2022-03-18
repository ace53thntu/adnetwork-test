import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class DealAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllDeal = ({params, options}) => {
    return this.get(endpoints.inventory.dealInventory, params, options);
  };

  getDeal = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.inventory.dealInventory}/${id}`,
      params,
      options
    );
  };

  createDeal = ({data, options}) => {
    return this.post(endpoints.inventory.dealInventory, data, options);
  };

  editDeal = ({id, data, options}) => {
    return this.put(
      `${endpoints.inventory.dealInventory}/${id}`,
      data,
      options
    );
  };

  deleteDeal = ({id, params}) => {
    return this.delete(`${endpoints.inventory.dealInventory}/${id}`, params);
  };
}

export const DealAPIRequest = new DealAPI(apiURL);
