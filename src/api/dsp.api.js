import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class DspAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllDsp = ({params, options}) => {
    return this.get(endpoints.dsp.dsp, params, options);
  };

  getDsp = ({id, params = null, options}) => {
    return this.get(`${endpoints.dsp.dsp}/${id}`, params, options);
  };

  createDsp = ({data, options}) => {
    return this.post(endpoints.dsp.dsp, data, options);
  };

  editDsp = ({id, data, options}) => {
    return this.put(`${endpoints.dsp.dsp}/${id}`, data, options);
  };

  deleteDsp = ({id, params}) => {
    return this.delete(`${endpoints.dsp.dsp}/${id}`, params);
  };
}

export const DspAPIRequest = new DspAPI(apiURL);
