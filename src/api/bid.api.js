import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class BidAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllBid = ({params, options}) => {
    return this.get(endpoints.inventory.bidInventory, params, options);
  };

  getBid = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.inventory.bidInventory}/${id}`,
      params,
      options
    );
  };

  createBid = ({data, options}) => {
    return this.post(endpoints.inventory.bidInventory, data, options);
  };

  editBid = ({id, data, options}) => {
    return this.put(`${endpoints.inventory.bidInventory}/${id}`, data, options);
  };

  deleteBid = ({id, params}) => {
    return this.delete(`${endpoints.inventory.bidInventory}/${id}`, params);
  };
}

export const BidAPIRequest = new BidAPI(apiURL);
