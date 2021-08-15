import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './endpoints.api';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.AUTH_GATEWAY;

class CampaignAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllCampaign = ({params, options}) => {
    return this.get(endpoints.campaign, params, options);
  };

  getCampaign = ({id, params = null, options}) => {
    return this.get(`${endpoints.campaign}/${id}`, params, options);
  };

  createCampaign = ({data, options}) => {
    return this.post(endpoints.campaign, data, options);
  };

  editCampaign = ({id, data, options}) => {
    return this.put(`${endpoints.campaign}/${id}`, data, options);
  };

  deleteCampaign = ({id, params}) => {
    return this.delete(`${endpoints.campaign}/${id}`, params);
  };
}

export const CampaignAPIRequest = new CampaignAPI(`${apiURL}/v1`);
