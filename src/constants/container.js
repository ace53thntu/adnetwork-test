import {HOST} from './auth';

export const CONTAINER_STATUS = {
  active: 'active',
  draft: 'draft',
  delete: 'delete'
};

export const CONTAINER_OVERVIEW = `__${HOST}_dmp_fe_container_overview__`;

export const SDK_NAME = window?.DMP_META_DATA?.SDK_NAME ?? 'AicactusSDK';
export const SDK_NAME_1 = window?.DMP_META_DATA?.SDK_NAME_1 ?? 'aicactusSDK';
export const SDK_CDN =
  window?.DMP_META_DATA?.SDK_CDN ??
  'https://cdn.aicactus.io/aicactus-sdk.min.js';
export const DOMAIN_NAME = window?.DMP_META_DATA?.DOMAIN_NAME ?? 'aicactus';
