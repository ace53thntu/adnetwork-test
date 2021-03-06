const API_V1 = 'v1';

export const endpoints = {
  auth: {
    login: `${API_V1}/auth/login`,
    logout: `${API_V1}/auth/logout`,
    authorize: `${API_V1}/authorize`,
    refreshToken: `${API_V1}/auth/access_token`
  },
  user: {
    user: `${API_V1}/users`,
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
    inventoryContainer: 'inventories',
    deal: 'deal',
    dsp: 'dsp',
    bidInventory: `${API_V1}/inventory_bid`,
    dealInventory: `${API_V1}/inventory_deal`
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
    trackerTemplate: `${API_V1}/tracker_template`
  },
  tracker: {
    tracker: `${API_V1}/tracker`
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
  },
  domainGroup: {
    domainGroup: `${API_V1}/domain_group`
  },
  audience: {
    audience: `${API_V1}/audience`,
    transferHistory: `${API_V1}/transfer_history`
  },
  deal: {
    deal: `${API_V1}/deal`
  },
  concept: {
    concepts: `${API_V1}/concept`,
    concept: `${API_V1}/concept`
  },
  creative: {
    creative: `${API_V1}/creative`
  },
  uploader: {
    config: `${API_V1}/config`,
    upload: `${API_V1}/file/upload`
  },
  alternative: {
    alternative: `${API_V1}/alternative`
  },
  report: {
    report: `${API_V1}/report`,
    url: 'url'
  },
  reportPage: {
    reportPage: `${API_V1}/report_page`,
    follow: 'follow'
  },
  metric: {
    metric: `${API_V1}/metrics/report`
  },
  nativeAd: {
    list: `${API_V1}/native_ad`,
    asset: `${API_V1}/asset`
  },
  video: {
    list: `${API_V1}/video`
  },
  activation: {
    activation: `${API_V1}/activation`
  },
  credential: {
    credential: `${API_V1}/credential`,
    rerollKey: 'reroll_key'
  },
  keyword: {
    keyword: `${API_V1}/keyword`
  },
  keywordList: {
    keywordList: `${API_V1}/keywords_list`
  },
  location: {
    geo_location: `${API_V1}/geo_location`,
    geo_country: `${API_V1}/geo_country`,
    geo_city: `${API_V1}/geo_city`
  },
  historical: {
    log: `${API_V1}/log`,
    logs: `${API_V1}/logs`,
    diff: 'diff',
    capping: 'capping'
  }
};
