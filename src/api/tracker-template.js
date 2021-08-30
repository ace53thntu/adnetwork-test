import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class TrackerTemplateAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllTrackerTemplate = ({params = null, options}) => {
    return this.get(
      `${endpoints.trackerTemplate.trackerTemplate}`,
      params,
      options
    );
  };

  getTrackerTemplate = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.trackerTemplate.trackerTemplate}/${id}`,
      params,
      options
    );
  };

  createTrackerTemplate = ({data, options}) => {
    return this.post(endpoints.trackerTemplate.trackerTemplate, data, options);
  };

  editTrackerTemplate = ({id, data, options}) => {
    return this.put(
      `${endpoints.trackerTemplate.trackerTemplate}/${id}`,
      data,
      options
    );
  };

  deleteTrackerTemplate = ({id, params}) => {
    return this.delete(
      `${endpoints.trackerTemplate.trackerTemplate}/${id}`,
      params
    );
  };
}

export const TrackerTemplateAPIRequest = new TrackerTemplateAPI(apiURL);
