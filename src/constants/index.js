const API_VERSION = 'v1';
const UPLOADER_URL = window.ADN_API_ENDPOINTS.UPLOADER_GATEWAY;

export const FILE_DISPLAY_URL = `${UPLOADER_URL}/${API_VERSION}/file/with-id`;

export const LOGO_URL =
  window?.ADN_META_DATA?.LOGO ??
  `/images/logos/${window?.ADN_META_DATA?.DOMAIN_NAME}-logo.png`;
