import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class TrackerAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllTracker = ({params = null, options}) => {
    return this.get(`${endpoints.tracker.tracker}`, params, options);
  };

  getTracker = ({id, params = null, options}) => {
    return this.get(`${endpoints.tracker.tracker}/${id}`, params, options);
  };

  createTracker = ({data, options}) => {
    console.log('==== createTracker', data);
    return this.post(endpoints.tracker.tracker, data, options).then(res => {
      console.log('==== createTracker res', res);
    });
  };

  editTracker = ({id, data, options}) => {
    return this.put(`${endpoints.tracker.tracker}/${id}`, data, options);
  };

  deleteTracker = ({id, params}) => {
    return this.delete(`${endpoints.tracker.tracker}/${id}`, params);
  };
}

export const TrackerAPIRequest = new TrackerAPI(apiURL);
