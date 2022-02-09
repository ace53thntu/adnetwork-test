import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class InventoryAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllInventory = ({params = null, options}) => {
    return this.get(`${endpoints.inventory.inventory}`, params, options);
  };

  getInventory = ({id, params = null, options}) => {
    return this.get(`${endpoints.inventory.inventory}/${id}`, params, options);
  };

  getInventoriesContainer = ({cid, params = null, options}) => {
    return this.get(
      `${endpoints.container.container}/${cid}/${endpoints.inventory.inventoryContainer}`,
      params,
      options
    );
  };

  createInventory = ({data, options}) => {
    return this.post(endpoints.inventory.inventory, data, options);
  };

  editInventory = ({id, data, options}) => {
    return this.put(`${endpoints.inventory.inventory}/${id}`, data, options);
  };

  deleteInventory = ({id, params}) => {
    return this.delete(`${endpoints.inventory.inventory}/${id}`, params);
  };

  bidInventory = ({data, options}) => {
    return this.post(`${endpoints.inventory.bidInventory}`, data, options);
  };

  dealInventory = ({data, options}) => {
    return this.post(`${endpoints.inventory.dealInventory}`, data, options);
  };

  getInventoryDeal = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.inventory.inventory}/${id}/${endpoints.inventory.deal}`,
      params,
      options
    );
  };

  getInventoryBid = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.inventory.inventory}/${id}/${endpoints.inventory.dsp}`,
      params,
      options
    );
  };
}

export const InventoryAPIRequest = new InventoryAPI(apiURL);
