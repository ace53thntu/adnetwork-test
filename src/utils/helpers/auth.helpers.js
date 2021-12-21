import {ROLE_KEY} from 'constants/auth';
import * as AUTH_KEY from '../constants/auth.constants';
import {
  getLocalData,
  removeLocalData,
  storeLocalData
} from './localStorage.helpers';

const {REFRESH_TOKEN_KEY, TOKEN_KEY, USER_INFO_KEY} = AUTH_KEY;

/**
 * Store access_token in local storage
 * @param {string} token - access_token
 */
export const setToken = token => {
  if (!token) {
    return null;
  }
  return storeLocalData(TOKEN_KEY, token);
};

/**
 * Get token from local storage
 */
export const getToken = () => {
  return getLocalData(TOKEN_KEY);
};

/**
 * Store refresh_token in local storage
 * @param {string} token - refresh_token
 */
export const setRefreshToken = token => {
  if (!token) {
    return null;
  }
  return storeLocalData(REFRESH_TOKEN_KEY, token);
};

/**
 * Get refresh_token from local storage
 */
export const getRefreshToken = () => {
  return getLocalData(REFRESH_TOKEN_KEY);
};

/**
 * Get token from local storage and
 * check
 */
export const isLoggedIn = () => Boolean(getToken());

/**
 * Remove access_token
 */
export const removeToken = () => {
  removeLocalData(TOKEN_KEY);
};

/**
 * Remove refresh_token
 */
export const removeRefreshToken = () => {
  removeLocalData(REFRESH_TOKEN_KEY);
};

/**
 * Store user in local storage
 * @param {string} id - partner ID
 */
export const setUser = user => storeLocalData(USER_INFO_KEY, user);

/**
 * Get user from local storage
 */
export const getUser = () => getLocalData(USER_INFO_KEY);

/**
 * Remove user
 */
export const removeUser = () => removeLocalData(USER_INFO_KEY);

export const setRole = role => storeLocalData(ROLE_KEY, role);
export const removeRole = role => removeLocalData(ROLE_KEY, role);
export const getRole = () => getLocalData(ROLE_KEY);
