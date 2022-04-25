import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class MetricAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getMetric = ({data = null, options}) =>
    this.post(endpoints.metric.metric, data, options);
}

export const MetricAPIRequest = new MetricAPI(apiURL);
