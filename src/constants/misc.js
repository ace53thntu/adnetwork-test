export const InputStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

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
  BUDGET: {value: 'BDG', label: 'Budget'}, // capping by budget of client
  IMPRESSION: {value: 'IMP', label: 'Impression'}, // capping by impression
  DOMAIN: {value: 'DM', label: 'Domain'}, // capping by domain
  SCHEDULE: {value: 'SCHL', label: 'Schedule'}, //capping by schedule
  KEYWORD: {value: 'KW', label: 'Keyword'} // capping by keywords
};
