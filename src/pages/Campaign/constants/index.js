export const StrategyViewTabs = {
  DESCRIPTION: {
    value: 0,
    name: 'description'
  },
  CAPPING: {
    value: 1,
    name: 'capping'
  },
  REPORT: {
    value: 2,
    name: 'report'
  }
};

export const StrategyEditTabs = {
  DESCRIPTION: {
    value: 0,
    name: 'description'
  },
  CONCEPT: {
    value: 1,
    name: 'concept'
  },
  // AUDIENCE: {
  //   value: 2,
  //   name: 'audience'
  // },
  SUMMARY: {
    value: 2,
    name: 'summary'
  }
};

export const STRATEGY_TYPES = [
  {
    value: 'normal',
    label: 'Normal'
  },
  {
    value: 'premium',
    label: 'Premium'
  }
];

export const CONV_EVENT_OPTIONS = [
  {label: 'home', value: 1},
  {label: 'view', value: 2},
  {label: 'category', value: 4},
  {label: 'subcategory', value: 8},
  {label: 'product', value: 16},
  {label: 'lead', value: 32},
  {label: 'basket', value: 64},
  {label: 'checkout', value: 128}
];

export const CONV_LABEL_OPTIONS = [
  {label: 1, value: 10001},
  {label: 2, value: 10002},
  {label: 3, value: 10003},
  {label: 4, value: 10004},
  {label: 5, value: 10005}
];

export const CAMPAIGN_KEYS = {
  ID: 'id',
  ADVERTISER: 'advertiser',
  ADVERTISER_ID: 'advertiser_uuid',
  NAME: 'name',
  STATUS: 'status',
  START_TIME: 'start_time',
  END_TIME: 'end_time',
  CPI: 'cpi',
  CPC: 'cpc',
  CPCC: 'cpcc',
  CPVC: 'cpvc',
  CPLPC: 'cplpc',
  CPLPV: 'cplpv',
  COMPC: 'compc',
  COMPV: 'compv',
  MEDIA_COST: 'media_cost',
  TRACKING_COST: 'tracking_cost',
  CONV_EVENTS: 'conv_events',
  BUDGET: 'budget',
  BUDGET_GLOBAL: 'global',
  BUDGET_DAILY: 'daily',
  LABELS: 'labels',
  CHECK_VISIT: 'check_visit',
  AUTO_REALLOC: 'auto_realloc',
  FAMILIES: 'families',
  SPENT: 'spent',
  CONV_EVENT_IDS: 'conv_event_ids',
  CONV_LABEL_IDS: 'conv_label_ids',
  IMPRESSION: 'impression',
  KEYWORD_LIST_WHITE: 'keywords_list_white',
  KEYWORD_LIST_BLACK: 'keywords_list_black',
  DOMAIN_GROUP_WHITE: 'domain_groups_white',
  DOMAIN_GROUP_BLACK: 'domain_groups_black',
  KEYWORD_LIST_WHITE_UUID: 'keywords_list_white_uuid',
  KEYWORD_LIST_BLACK_UUID: 'keywords_list_black_uuid',
  DOMAIN_GROUP_WHITE_UUID: 'domain_group_white_list_uuid',
  DOMAIN_GROUP_BLACK_UUID: 'domain_group_black_list_uuid'
};

export const listEngine = [
  {
    value: 'CPM_REACH',
    label: 'CPM REACH'
  },
  {
    value: 'CPM_SPEND',
    label: 'CPM SPEND'
  },
  {
    value: 'GBO',
    label: 'GBO'
  },
  {
    value: 'CPC',
    label: 'CPC'
  }
];

export const listEngineFirstPrice = [
  {
    value: 'CPM_REACH',
    label: 'CPM REACH'
  },
  {
    value: 'CPM_SPEND',
    label: 'CPM SPEND'
  },
  {
    value: 'GBO',
    label: 'GBO'
  },
  {
    value: 'CPC',
    label: 'CPC'
  }
];

export const CAMPAIGN_VIEWS = {
  advertiser: 'advertiser',
  advertiserDetail: 'advertiserDetail',
  campaignDetail: 'campaignDetail',
  strategyDetail: 'strategyDetail'
};

export const WEEK_DAYS = [
  {
    value: 0,
    label: 'Monday'
  },
  {
    value: 1,
    label: 'Tuesday'
  },
  {
    value: 2,
    label: 'Wednesday'
  },
  {
    value: 3,
    label: 'Thursday'
  },
  {
    value: 4,
    label: 'Friday'
  },
  {
    value: 5,
    label: 'Saturday'
  },
  {
    value: 6,
    label: 'Sunday'
  }
];

export const ACCEPTED_LAYOUTS = [
  {
    value: 1,
    label: 'Layout ID Content Wall'
  },
  {
    value: 2,
    label: 'Layout ID App Wall'
  },
  {
    value: 3,
    label: 'Layout ID News Feed'
  },
  {
    value: 4,
    label: 'Layout ID Chat List'
  },
  {
    value: 5,
    label: 'Layout ID Carousel'
  },
  {
    value: 6,
    label: 'Layout ID Content Stream'
  },
  {
    value: 7,
    label: 'Layout ID Grid Adjoining The Content'
  }
];

export const ACCEPTED_ADUNITS = [
  {
    value: 1,
    label: 'Ad Unit Paid Search Units'
  },
  {
    value: 2,
    label: 'Ad Unit Recommendation Widgets'
  },
  {
    value: 3,
    label: 'Ad Unit Promoted Listings'
  },
  {
    value: 4,
    label: 'Ad Unit In Ads With Native Element Units'
  },
  {
    value: 5,
    label: 'Adunit Custom'
  }
];

export const ACCEPTED_CONTEXTS = [
  {
    value: 1,
    label: 'Context Type Content Centric'
  },
  {
    value: 2,
    label: 'Context Type Social Centric'
  },
  {
    value: 3,
    label: 'Context Type Product'
  }
];

export const ACCEPTED_SUB_CONTEXTS = [
  {
    value: 10,
    label: 'Sub Context Type General Or Mixed Content'
  },
  {
    value: 11,
    label: 'Sub Context Type Primarily Article Content'
  },
  {
    value: 12,
    label: 'Sub Context Type Primarily Video Content'
  },
  {
    value: 13,
    label: 'Sub Context Type Primarily Audio Content'
  },
  {
    value: 14,
    label: 'Sub Context Type Primarily Image Content'
  },
  {
    value: 15,
    label: 'Sub Context Type User Generated Content'
  },
  {
    value: 20,
    label: 'Sub Context Type General Social Content'
  },
  {
    value: 21,
    label: 'Sub Context Type Primarily Email Content'
  },
  {
    value: 22,
    label: 'Sub Context Type Primarily Chat IM Content'
  },
  {
    value: 30,
    label: 'Sub Context Type Content Sale'
  },
  {
    value: 31,
    label: 'Sub Context Type Application Store Marketplace'
  },
  {
    value: 32,
    label: 'Sub Context Type Product Review Site'
  }
];

export const ACCEPTED_PLACEMENTS = [
  {
    value: 1,
    label: 'Placement Type In Feed Of Content'
  },
  {
    value: 2,
    label: 'Placement Type In Atomic Unit Of Content'
  },
  {
    value: 3,
    label: 'Placement Type Outside Core Content'
  },
  {
    value: 4,
    label: 'Placement Type Recommendation Widget'
  }
];

export const BIDDING_METHODS = [
  {
    value: 'target',
    label: 'Target'
  },
  {
    value: 'full_discovery',
    label: 'Full discovery'
  },
  {
    value: 'flat_cpm',
    label: 'Flat cpm'
  }
];

export const KPIS = [
  {
    value: 'cpc',
    label: 'cpc'
  },
  {
    value: 'cpmv',
    label: 'cpmv'
  },
  {
    value: 'cpcti',
    label: 'cpcti'
  },
  {
    value: 'cpctl',
    label: 'cpctl'
  },
  {
    value: 'cpctv',
    label: 'cpctv'
  },
  {
    value: 'cpctpia',
    label: 'cpctpia'
  },
  {
    value: 'cpvv25',
    label: 'cpvv25'
  },
  {
    value: 'cpvv50',
    label: 'cpvv50'
  },
  {
    value: 'cpvv100',
    label: 'cpvv100'
  },
  {
    value: 'cpvtctl',
    label: 'cpvtctl'
  },
  {
    value: 'cpm',
    label: 'cpm'
  }
];

export const StrategySources = [
  {
    value: 'ios',
    label: 'IOS'
  },
  {
    value: 'android',
    label: 'Android'
  },
  {
    value: 'web',
    label: 'Web'
  },
  {
    value: 'smarttv',
    label: 'Smart TV'
  },
  {
    value: 'others',
    label: 'Others'
  }
];
