import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class InventoryAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

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
}

export const InventoryAPIRequest = new InventoryAPI(apiURL);
