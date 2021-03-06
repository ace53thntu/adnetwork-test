export const DEFAULT_TIMEZONE = 7;

/**
 * @enum
 */
export const LogTypes = {
  CAMPAIGN: 'campaign',
  STRATEGY: 'strategy',
  INVENTORY: 'inventory',
  CREATIVE: 'creative'
};

/**
 * @enum
 */
export const Linearity = {
  LINEAR: 1,
  NONLINEAR: 2
};

export const LinearityOptions = [
  {value: Linearity.LINEAR, label: 'Linear / In-Stream'},
  {value: Linearity.NONLINEAR, label: 'Non-Linear / Overlay'}
];

export const InputStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

export const STATUS_OPTIONS = [
  {
    value: 'active',
    label: 'Active'
  },
  {
    value: 'inactive',
    label: 'Inactive'
  }
];

export const LANG_OPTIONS = [
  {
    id: 'en',
    value: 'en',
    label: 'English'
  },
  {
    id: 'vi',
    value: 'vi',
    label: 'Vietnamese'
  }
];

export const CHART_SOURCES = 'web,ios,android';

export const ROLE_OPTIONS = [
  {
    id: 'administrator',
    value: 'administrator',
    label: 'Administrator'
  },
  {
    id: 'organisation',
    value: 'organisation',
    label: 'Organization'
  },
  {
    id: 'agency',
    value: 'agency',
    label: 'Agency'
  },
  {
    id: 'advertiser',
    value: 'advertiser',
    label: 'Advertiser'
  }
];

export const ROLES = {
  administrator: 'administrator',
  organisation: 'organisation',
  agency: 'agency',
  advertiser: 'advertiser',
  publisher: 'publisher'
};

export const DEFAULT_PAGINATION = {
  page: 1,
  perPage: 10
};

export const ORGANIZATION_TYPES = {
  manage: 'MANAGE',
  self: 'SELF'
};

export const ORGANIZATION_TYPE_OPTIONS = [
  {
    value: 'MANAGE',
    label: 'MANAGE'
  },
  {
    value: 'SELF',
    label: 'SELF'
  }
];

export const ORGANIZATION_BUDGET_ALERT_METHOD = {
  percent: 'percent',
  value: 'value'
};

export const ORGANIZATION_BUDGET_ALERT_METHOD_OPTIONS = [
  {
    value: 'percent',
    label: 'Percent'
  },
  {
    value: 'value',
    label: 'Value'
  }
];

export const PAGINATION_HEADERS = {
  lastPage: 'x-last-page',
  page: 'x-page',
  nextPage: 'x-next-page',
  perPage: 'x-per-page',
  total: 'x-total-items'
};

export const IS_RESPONSE_ALL = true;

export const Statuses = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete'
};

export const BudgetTimeFrames = {
  DAILY: 86400,
  GLOBAL: 0
};

export const CappingTypes = {
  BUDGET_MANAGER: {value: 'BDG_MNG', label: 'Budget Manager'}, // capping by budget of manager ( admin )
  BUDGET: {value: 'BDG', label: 'Budget', api_key: 'budget', type: 'BDG'}, // capping by budget of client
  IMPRESSION: {
    value: 'IMP',
    label: 'Impression',
    api_key: 'impression',
    type: 'IMP'
  }, // capping by impression
  USER: {value: 'USR', label: 'User', api_key: 'user'}, // capping by user
  USER_CLICK: {value: 'USR_CLICK', label: 'User Click', api_key: 'user_click'}, // capping by user click
  USER_VIEWABLE: {
    value: 'USR_VIEWABLE',
    label: 'User Viewable',
    api_key: 'user_viewable'
  }, // capping by user viewable
  CLICK: {value: 'CLICK', label: 'Click', api_key: 'click'}, // capping by user
  VIEWABLE: {value: 'VIEWABLE', label: 'Viewable', api_key: 'viewable'}, // capping by viewable
  DOMAIN: {value: 'DM', label: 'Domain'}, // capping by domain
  SCHEDULE: {value: 'SCHL', label: 'Schedule'}, //capping by schedule
  KEYWORD: {value: 'KW', label: 'Keyword'}, // capping by keywords
  GENERAL: {value: 'GENERAL', label: 'General'}, // capping by General
  VIDEO: {value: 'VIDEO', label: 'Video'}, // capping by Video
  CONTEXT: {value: 'CONTEXT', label: 'Context'},
  AUDIENCE: {value: 'AUDIENCE', label: 'Audience'}
};

export const CappingTypeButtons = [
  {type: 'GENERAL', sub_type: '', label: 'General'},
  {type: 'VIDEO', sub_type: '', label: 'Video'},
  {type: 'CONTEXT', sub_type: '', label: 'Context'},
  {type: 'AUDIENCE', sub_type: '', label: 'Audience'},
  {type: 'BDG_MNG', sub_type: '', label: 'Budget manager'},
  {type: 'USR', sub_type: '', label: 'User', api_key: 'user'},
  {type: 'USR_CLICK', sub_type: '', label: 'User click', api_key: 'user_click'},
  {type: 'VIEWABLE', sub_type: '', label: 'Viewable', api_key: 'viewable'},
  {
    type: 'USR_VIEWABLE',
    sub_type: '',
    label: 'User viewable',
    api_key: 'user_viewable'
  },
  {type: 'CLICK', sub_type: '', label: 'Click', api_key: 'click'},
  {type: 'DM', sub_type: '', label: 'Domain'},
  {type: 'KW', sub_type: '', label: 'Keyword'},
  {type: 'SCHL', sub_type: '', label: 'Schedule'}
];

export const CappingReferenceTypes = {
  CAMPAIGN: 'campaign',
  STRATEGY: 'strategy',
  DSP: 'dsp',
  INVENTORY: 'inventory',
  ADVERTISER: 'advertiser'
};

// OpenRTB 2.5 protocols
export const ProtocolOptions = [
  // {value: 'indifferent', label: 'Indifferent'},
  {value: 1, label: 'VAST 1.0'},
  {value: 2, label: 'VAST 2.0'},
  {value: 3, label: 'VAST 3.0'},
  {value: 4, label: 'VAST 1.0 Wrapper'},
  {value: 5, label: 'VAST 2.0 Wrapper'},
  {value: 6, label: 'VAST 3.0 Wrapper'},
  {value: 7, label: 'VAST 4.0'},
  {value: 8, label: 'VAST 4.0 Wrapper'},
  {value: 9, label: 'DAAST 1.0'},
  {value: 10, label: 'DAAST 1.0 Wrapper'}
];
