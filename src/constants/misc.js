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
  advertiser: 'advertiser'
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
