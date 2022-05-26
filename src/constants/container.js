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

// SDK Mobile
export const SDK_IOS_CONFIG = window?.ADN_META_DATA?.SDK_IOS_CONFIG ?? 'Aicactus Adnetwork SDK Config';
export const SDK_IOS_NAME = window?.ADN_META_DATA?.SDK_IOS_NAME ?? 'AicactusAdsNetwork';
export const SDK_ANDROID_NAME = window?.ADN_META_DATA?.SDK_ANDROID_NAME ?? 'AicactusAdsNetwork';
export const SDK_ANDROID_NAME_SPACE = window?.ADN_META_DATA?.SDK_ANDROID_NAME_SPACE ?? 'io.aicactus.adsnetwork';
export const SDK_ANDROID_DEPENDENCY = window?.ADN_META_DATA?.SDK_ANDROID_DEPENDENCY ?? 'io.aicactus:adsnetwork';

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
const webTvKey = 'webtv';
const appletvKey = 'appletv';
const androidtvKey = 'androidtv';

export const SOURCE_FROM_TAG = {
  [webKey]: 'web',
  [iosKey]: 'ios',
  [androidKey]: 'android',
  [webTvKey]: 'webtv',
  [appletvKey]: 'appletv',
  [androidtvKey]: 'androidtv'
};

export const TAG_FROM_SOURCE = {
  web: webKey,
  ios: iosKey,
  android: androidKey,
  webtv: webTvKey,
  appletv: appletvKey,
  androidtv: androidtvKey
};
