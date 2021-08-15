import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class StrategyAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllStrategy = ({params, options}) => {
    return this.get(endpoints.strategy.strategy, params, options);
  };

  getStrategy = ({id, params = null, options}) => {
    return this.get(`${endpoints.strategy.strategy}/${id}`, params, options);
  };

  createStrategy = ({data, options}) => {
    return this.post(endpoints.strategy.strategy, data, options);
  };

  editStrategy = ({id, data, options}) => {
    return this.put(`${endpoints.strategy.strategy}/${id}`, data, options);
  };

  deleteStrategy = ({id, params}) => {
    return this.delete(`${endpoints.strategy.strategy}/${id}`, params);
  };
}

export const StrategyAPIRequest = new StrategyAPI(apiURL);
