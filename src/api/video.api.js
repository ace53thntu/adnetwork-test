import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class VideoAPIService extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  createVideo = ({data, options = {}}) => {
    return this.post(endpoints.video.list, data, options);
  };

  getVideos = ({params = {}, options = {}}) => {
    return this.get(endpoints.video.list, params, options);
  };

  deleteVideo = ({videoId, options = {}}) => {
    return this.delete(`${endpoints.video.list}/${videoId}`, {}, options);
  };

  getVideo = ({videoId, options = {}}) => {
    return this.get(`${endpoints.video.list}/${videoId}`, {}, options);
  };

  updateVideo = ({videoId, data, options = {}}) => {
    return this.put(`${endpoints.video.list}/${videoId}`, data, options);
  };
}

export const VideoAPI = new VideoAPIService(apiURL);
