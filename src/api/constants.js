const API_V1 = 'v1';

export const endpoints = {
  auth: {
    login: `${API_V1}/login`,
    logout: `${API_V1}/logout`,
    authorize: `${API_V1}/authorize`,
    refreshToken: `${API_V1}/access_token`
  },
  user: {
    users: `${API_V1}/users`
  },
  container: {
    container: `${API_V1}/container`
  },
  page: {
    page: `${API_V1}/page`,
    pages: 'pages'
  },
  inventory: {
    page: `${API_V1}/inventory`
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
  adsdefault: {
    adsdefault: `${API_V1}/adsdefault`,
    adsdefaultContaiter: 'ads-defaults'
  }
};
