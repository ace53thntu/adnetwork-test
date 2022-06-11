import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class HistoricalAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllHistorical = ({params, options}) => {
    return this.get(endpoints.historical.log, params, options);
  };

  getHistorical = ({params = null, options}) => {
    return this.get(
      `${endpoints.historical.log}/${endpoints.historical.diff}`,
      params,
      options
    );
  };

  getHistoricalCapping = ({referenceId, params = null, options}) => {
    return this.get(
      `${endpoints.historical.logs}/${referenceId}/${endpoints.historical.capping}`,
      params,
      options
    );
  };
}

export const HistoricalAPIRequest = new HistoricalAPI(apiURL);
