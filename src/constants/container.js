import {HOST} from './auth';

export const CONTAINER_STATUS = {
  active: 'active',
  draft: 'draft',
  delete: 'delete'
};

export const CONTAINER_OVERVIEW = `__${HOST}_dmp_fe_container_overview__`;

export const SDK_NAME = window?.ADN_META_DATA?.SDK_NAME ?? 'AicactusSDK';
export const SDK_NAME_1 = window?.ADN_META_DATA?.SDK_NAME_1 ?? 'aicactusSDK';
export const SDK_CDN =
  window?.ADN_META_DATA?.SDK_CDN ??
  'https://cdn.aicactus.io/aicactus-sdk.min.js';
export const DOMAIN_NAME = window?.ADN_META_DATA?.DOMAIN_NAME ?? 'aicactus';

export const CONTAINER_TREE_TAGS = [
  {
    id: 'web',
    name: 'Web'
  },
  {
    id: 'ios',
    name: 'iOS'
  },
  {
    id: 'android',
    name: 'Android'
  },
  {
    id: 'import-offline',
    name: 'Import offline'
  },
  {
    id: 'transfer-files',
    name: 'Transfer'
  }
];

const webKey = 'web';
const iosKey = 'ios';
const androidKey = 'android';

export const SOURCE_FROM_TAG = {
  [webKey]: 'web',
  [iosKey]: 'ios',
  [androidKey]: 'android'
};

export const TAG_FROM_SOURCE = {
  web: webKey,
  ios: iosKey,
  android: androidKey
};
