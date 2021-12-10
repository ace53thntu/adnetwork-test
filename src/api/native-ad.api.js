import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class NativeAdAPIService extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getNativeAds = ({params = {}, options = {}}) => {
    return this.get(endpoints.nativeAd.list, params, options);
  };

  getNativeAd = ({nativeAdId, options = {}}) => {
    return this.get(`${endpoints.nativeAd.list}/${nativeAdId}`, {}, options);
  };

  createNativeAd = ({data, options = {}}) => {
    return this.post(endpoints.nativeAd.list, data, options);
  };

  createAsset = ({data, options = {}}) => {
    return this.post(endpoints.nativeAd.asset, data, options);
  };

  deleteNativeAd = ({nativeAdId, options = {}}) => {
    return this.delete(`${endpoints.nativeAd.list}/${nativeAdId}`, {}, options);
  };

  updateNativeAd = ({nativeAdId, data, options = {}}) => {
    return this.put(`${endpoints.nativeAd.list}/${nativeAdId}`, data, options);
  };

  deleteAsset = ({assetId, options = {}}) => {
    return this.delete(`${endpoints.nativeAd.asset}/${assetId}`, {}, options);
  };
}

export const NativeAdAPI = new NativeAdAPIService(apiURL);
