import {hostName} from './environments.helpers';
import {getLocalData, storeLocalData} from './localStorage.helpers';

const KEY = `__adnetwork_fe_${hostName}_uploader_config`;

export const setUploaderConfig = config => {
  if (!config) {
    return null;
  }
  return storeLocalData(KEY, config);
};

export const getUploaderConfig = () => {
  return getLocalData(KEY);
};
