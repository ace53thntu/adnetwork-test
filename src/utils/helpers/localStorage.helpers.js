/**
 * Store data in local storage
 * @param {string} key - Local store KEY
 * @param {any} data - The data want to store
 * @returns void
 */
export const storeLocalData = (key, data) => {
  return window.localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Get data from local storage by KEY
 * @param {string} key - local storage KEY
 */
export const getLocalData = key => {
  if (window.localStorage.getItem(key)) {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
      return null;
    }
  }
  return null;
};

/**
 * Remove data and local storage KEY
 * @param {string} key - local storage KEY
 */
export const removeLocalData = key => {
  return window.localStorage.removeItem(key);
};
