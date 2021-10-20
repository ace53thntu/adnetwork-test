import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.UPLOADER_GATEWAY;

class UploaderAPIService extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getConfig = ({options = {}}) => {
    return this.get(endpoints.uploader.config, {}, options);
  };

  uploadFile = ({formData, options = {}}) => {
    return this.postFormData(endpoints.uploader.upload, formData, options);
  };
}

export const UploaderAPI = new UploaderAPIService(apiURL);
