const API_V1 = 'v1';

export const endpoints = {
  auth: {
    login: `${API_V1}/auth/login`,
    logout: `${API_V1}/auth/logout`,
    authorize: `${API_V1}/authorize`,
    refreshToken: `${API_V1}/auth/access_token`
  },
  user: {
    user: `${API_V1}/user`,
    me: `${API_V1}/me`
  },
  container: {
    container: `${API_V1}/container`
  },
  page: {
    page: `${API_V1}/page`,
    pages: 'pages'
  },
  inventory: {
    inventory: `${API_V1}/inventory`,
    inventoryContainer: 'inventories'
  },
  advertiser: {
    advertiser: `${API_V1}/advertiser`
  },
  campaign: {
    campaign: `${API_V1}/campaign`
  },
  strategy: {
    strategy: `${API_V1}/strategy`
  },
  capping: {
    capping: `${API_V1}/capping`
  },
  weekpart: {
    weekpart: `${API_V1}/weekpart`
  },
  adsdefault: {
    adsdefault: `${API_V1}/adsdefault`,
    adsdefaultContaiter: 'ads-defaults'
  },
  trackerTemplate: {
    trackerTemplate: `${API_V1}/tracker-template`
  },
  position: {
    position: `${API_V1}/position`
  },
  publisher: {
    publisher: `${API_V1}/publisher`
  },
  dsp: {
    dsp: `${API_V1}/dsp`
  },
  iabs: {
    iabs: `${API_V1}/iabs`
  },
  domain: {
    domain: `${API_V1}/domain`
  }
};
