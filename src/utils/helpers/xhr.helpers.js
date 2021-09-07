import axios from 'axios';
import {SYS_ADMIN_PARTNER} from 'utils/constants/auth.constants';

import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  removeUser,
  setRefreshToken,
  setToken
} from './auth.helpers';

// eslint-disable-next-line no-undef
const authEndpoint = DMP_API_ENDPOINTS.AUTH_GATEWAY;
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export class XHRRequest {
  constructor({apiURL = ''}) {
    // console.log(
    //   '🚀 ~ file: xhr.helpers.js ~ line 33 ~ XHRRequest ~ constructor ~ apiURL',
    //   apiURL
    // );
    axios.defaults.headers.common.Accept = '*/*';
    const baseURL = apiURL || '';
    this.axios = axios.create({
      baseURL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.axios.interceptors.request.use(config => {
      const token = getToken();
      const partnerId = SYS_ADMIN_PARTNER;
      const customHeaders = {};
      if (token) {
        customHeaders['Authorization'] = `Bearer ${token}`;
      }
      if (partnerId) {
        customHeaders['X-Auth-Partner-Id'] = partnerId;
      }
      return Promise.resolve({
        ...config,
        headers: {
          ...config.headers,
          ...customHeaders
        }
      });
    });

    this.axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const originalRequest = error?.config;
        if (originalRequest?.url?.includes('login')) {
          //
        } else {
          if (error?.response?.status === 401 && !originalRequest?._retry) {
            if (isRefreshing) {
              return new Promise(function (resolve, reject) {
                failedQueue.push({resolve, reject});
              })
                .then(token => {
                  originalRequest.headers['Authorization'] = 'Bearer ' + token;
                  return axios(originalRequest);
                })
                .catch(err => {
                  return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = getRefreshToken();

            return new Promise((resolve, reject) => {
              axios
                .post(`${authEndpoint}/v1/auth/refresh`, {
                  refresh_token: refreshToken
                })
                .then(({data}) => {
                  setToken(data?.data?.access_token);
                  setRefreshToken(data?.data?.refresh_token);
                  this.axios.defaults.headers.common[
                    'Authorization'
                  ] = `Bearer ${data?.data?.access_token}`;
                  originalRequest.headers[
                    'Authorization'
                  ] = `Bearer ${data?.data?.access_token}`;
                  processQueue(null, data?.data?.access_token);
                  resolve(this.axios(originalRequest));
                })
                .catch(err => {
                  removeToken();
                  removeRefreshToken();
                  removeUser();
                  window.location.reload();
                  processQueue(err, null);
                  reject(err);
                })
                .finally(() => {
                  isRefreshing = false;
                });
            });
          }
        }

        return Promise.reject(error);
      }
    );
  }

  toQueryString(obj) {
    const parts = [];
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }
    return parts.join('&');
  }

  async rest(action, params, options) {
    try {
      const opts = {
        url: action,
        method: options.method,
        data: params
      };
      if (options?.headers && Object.keys(options.headers).length) {
        opts.headers = options.headers;
      }
      if (options?.cancelToken) {
        opts.cancelToken = options.cancelToken;
      }

      const response = await this.axios(opts);
      return response.data;
    } catch (error) {
      if (error?.response) {
        throw error.response.data;
      }
      if (error?.message) {
        throw error.message;
      }
    }
  }

  postFormData(action, data) {
    const headers = {
      'Content-Type': 'multipart/form-data'
    };
    return this.post(action, data, {
      headers
    });
  }

  putFormData(action, data) {
    const headers = {
      'Content-Type': 'multipart/form-data'
    };
    return this.put(action, data, {
      headers
    });
  }

  get(action, params, options = {}) {
    const query = this.toQueryString(params);
    const path = query ? `${action}?${query}` : action;
    const {headers = {}, cancelToken} = options;

    return this.rest(path, null, {
      method: 'GET',
      headers,
      cancelToken
    });
  }

  delete(action, params) {
    const query = this.toQueryString(params);
    const path = query ? `${action}?${query}` : action;
    return this.rest(path, null, {
      method: 'DELETE'
    });
  }

  post(action, data, options = {}) {
    const {headers = {}, cancelToken} = options;
    return this.rest(action, data, {
      method: 'POST',
      headers,
      cancelToken
    });
  }

  put(action, data, options = {}) {
    const {headers = {}} = options;
    return this.rest(action, data, {
      method: 'PUT',
      headers
    });
  }

  patch(action, data, options = {}) {
    const {headers = {}} = options;
    return this.rest(action, data, {
      method: 'PATCH',
      headers
    });
  }
}
