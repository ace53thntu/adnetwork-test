import {XHRRequest} from 'utils/helpers/xhr.helpers';

class MetricAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getMetric = ({url, params = null, options}) => {
    return this.get(url, params, options);
  };
}

export const MetricAPIRequest = new MetricAPI();
