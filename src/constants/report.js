/**
 * Types of chart.
 * @enum {string}
 */
export const ChartTypes = {
  /** This type is line chart. */
  LINE: 'line',
  /** This type is bar chart. */
  BAR: 'bar',
  /** This type is pie chart. */
  PIE: 'pie'
};

export const ReportTypes = {
  TRENDING: 'trending',
  DISTRIBUTION: 'distribution'
};

export const METRIC_UNITS = [
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year',
  'global'
];

export const METRIC_TIMERANGES = [
  {
    value: 'l1y',
    label: '1 year',
    units: [{value: 'month', label: 'Month'}]
  },
  {
    value: 'l9m',
    label: '9 months',
    units: [{value: 'month', label: 'Month'}]
  },
  {
    value: 'l6m',
    label: '6 months',
    units: [{value: 'month', label: 'Month'}]
  },
  {
    value: 'l3m',
    label: '3 months',
    units: [
      {value: 'month', label: 'Month'},
      {value: 'day', label: 'Day'}
    ]
  },
  {value: 'l1m', label: '1 month', units: [{value: 'day', label: 'Day'}]},
  {value: 'l2w', label: '2 weeks', units: [{value: 'day', label: 'Day'}]},
  {
    value: 'l1w',
    label: '1 week',
    units: [
      {value: 'day', label: 'Day'},
      {value: 'hour', label: 'Hour'}
    ]
  },
  {
    value: 'l1d',
    label: '1 day',
    units: [
      {value: 'hour', label: 'Hour'},
      {value: 'minute', label: 'Minute'}
    ]
  },
  {
    value: 'l6h',
    label: '6 hours',
    units: [
      {value: 'hour', label: 'Hour'},
      {value: 'minute', label: 'Minute'}
    ]
  },
  {
    value: 'l3h',
    label: '3 hours',
    units: [
      {value: 'hour', label: 'Hour'},
      {value: 'minute', label: 'Minute'}
    ]
  },
  {
    value: 'l30m',
    label: '30 minutes',
    units: [
      {value: 'minute', label: 'Minute'},
      {value: 'second', label: 'Second'}
    ]
  },
  {
    value: 'l15m',
    label: '15 minutes',
    units: [
      {value: 'minute', label: 'Minute'},
      {value: 'second', label: 'Second'}
    ]
  },
  {
    value: 'l5m',
    label: '5 minutes',
    units: [
      {value: 'minute', label: 'Minute'},
      {value: 'second', label: 'Second'}
    ]
  }
];

export const DISTRIBUTIONS = [
  'agency',
  'concept',
  'position',
  'commercial',
  'advertiser',
  'manager',
  'creative',
  'campaign',
  'device-type',
  'at',
  'strategy',
  'adx',
  'native-ad',
  'video',
  'domain',
  'deal',
  'country',
  'region',
  'department'
];

export const REPORT_SOURCES = [
  'advertiser',
  'campaign',
  'strategy',
  'concept',
  'creative',
  'native_ad',
  'video',
  'publisher',
  'container',
  'inventory'
];

export const REPORT_INPUT_NAME = {
  NAME: 'name',
  STATUS: 'status',
  REPORT_TYPE: 'report_type',
  REPORT_SOURCE: 'report_source',
  API: 'api',
  PROPERTIES: 'properties',
  COLOR: 'color',
  CHART_TYPE: 'chart_type',
  TIME_RANGE: 'time_range',
  UNIT: 'time_unit',
  START_TIME: 'start_time',
  END_TIME: 'end_time',
  REPORT_BY: 'report_by',
  REPORT_BY_UUID: 'report_by_uuid'
};

export const DEFAULT_TIME_RANGE = 'l1m';
export const DEFAULT_TIME_UNIT = 'day';

export const FORMAT_BY_UNIT = {
  month: 'YYYY-MM',
  day: 'YYYY-MM-DD',
  hour: 'YYYY-MM-DD HH[:00:00]',
  minute: 'YYYY-MM-DD HH:mm[:00]',
  second: 'HH:mm:ss'
};

export const REPORT_VIEW_TYPES = [
  {
    label: 'External',
    options: [
      {label: 'External Impressions', value: 3, code: 'xic', acl: 'xic'},
      {label: 'ExternalClicks', value: 4, code: 'xcc', acl: 'xcc'}
    ]
  },
  {
    label: 'Creative',
    options: [
      {label: 'Creative Bids', value: 5, code: 'cbc', acl: 'bc'},
      {label: 'Creative Bid Price', value: 6, code: 'cbsp', acl: 'bsp'},
      {label: 'Creative Impressions', value: 7, code: 'cic', acl: 'ic'},
      {label: 'Creative Clicks', value: 8, code: 'ccc', acl: 'cc'},
      {label: 'Creative Post Click Visits', value: 9, code: 'ccl', acl: 'cl'},
      {label: 'Creative Post Click Conv', value: 10, code: 'cpc', acl: 'pc'},
      {label: 'Creative Post View Conv', value: 11, code: 'cpv', acl: 'pv'},
      {label: 'Creative Tracking Cost', value: 12, code: 'ctp', acl: 'tp'},
      {
        label: 'Creative Cost',
        value: 13,
        code: 'cirp',
        acl: 'irp'
      },
      {label: 'Creative Media Cost', value: 14, code: 'cirp_org'},
      {
        label: 'Creative Client Media Cost',
        value: 15,
        code: 'cirp_client',
        acl: 'irp_client'
      }
    ]
  },
  {
    label: 'Native',
    options: [
      {label: 'Native Bids', value: 16, code: 'nbc', acl: 'bc'},
      {label: 'Native Bid Price', value: 17, code: 'nbsp', acl: 'bsp'},
      {label: 'Native Impressions', value: 18, code: 'nic', acl: 'ic'},
      {label: 'Native Clicks', value: 19, code: 'ncc', acl: 'cc'},
      {label: 'Native Post Click Visits', value: 20, code: 'ncl', acl: 'cl'},
      {label: 'Native Post Click Conv', value: 21, code: 'npc', acl: 'pc'},
      {label: 'Native Post View Conv', value: 22, code: 'npv', acl: 'pv'},
      {label: 'Native Tracking Cost', value: 23, code: 'ntp', acl: 'tp'},
      {label: 'Native Cost', value: 24, code: 'nirp', acl: 'irp'},
      {
        label: 'Native Media Cost',
        value: 25,
        code: 'nirp_org',
        acl: 'nirp_org'
      },
      {
        label: 'Native Client Media Cost',
        value: 26,
        code: 'nirp_client',
        acl: 'nirp_client'
      }
    ]
  },
  {
    label: 'Video',
    options: [
      {label: 'Video Bids', value: 27, code: 'vbc', acl: 'vbc'},
      {label: 'Video Bid Price', value: 28, code: 'vbsp', acl: 'vbsp'},
      {label: 'Video Impressions', value: 29, code: 'vic', acl: 'vic'},
      {label: 'Video Clicks', value: 30, code: 'vcc', acl: 'vcc'},
      {label: 'Video Post Click Visits', value: 31, code: 'vcl', acl: 'vcl'},
      {label: 'Video Post Click Conv', value: 32, code: 'vpc', acl: 'vpc'},
      {label: 'Video Post View Conv', value: 33, code: 'vpv', acl: 'vpv'},
      {label: 'Video Tracking Cost', value: 34, code: 'vtp', acl: 'tp'},
      {label: 'Video Cost', value: 35, code: 'virp', acl: 'irp'},
      {label: 'Video Media Cost', value: 36, code: 'virp_org', acl: 'irp_org'},
      {
        label: 'Video Client Media Cost',
        value: 37,
        code: 'virp_client',
        acl: 'qirp_client1'
      },
      {label: 'Video First Quartil', value: 38, code: 'q1', acl: 'q1'},
      {label: 'Video Midpoint', value: 39, code: 'q2', acl: 'q2'},
      {label: 'Video Third Quartil', value: 40, code: 'q3', acl: 'q3'},
      {label: 'Video Completion', value: 41, code: 'q4', acl: 'q4'},
      {label: 'Video Skip', value: 42, code: 'sk', acl: 'sk'},
      {label: 'Video Time', value: 43, code: 't', acl: 't'}
    ]
  },
  {
    label: 'Post',
    options: [
      {label: 'Post Click Lead', value: 44, code: 'pce32', acl: 'pce32'},
      {label: 'Post View Lead', value: 45, code: 'pve32', acl: 'pve32'},
      {label: 'Post Click Checkout', value: 46, code: 'pce128', acl: 'pce128'},
      {label: 'Post View Checkout', value: 47, code: 'pve128', acl: 'pve128'},
      {label: 'Post Click Revenue', value: 48, code: 'pce128s', acl: 'pce128s'},
      {label: 'Post View Revenue', value: 49, code: 'pve128s', acl: 'pve128s'}
    ]
  },
  {
    label: 'Event',
    options: [
      {label: 'Event Home', value: 50, code: 'e1', acl: 'e1'},
      {label: 'Event View', value: 51, code: 'e2', acl: 'e2'},
      {label: 'Event Category', value: 52, code: 'e4', acl: 'e4'},
      {label: 'Event Sub Category', value: 53, code: 'e8', acl: 'e8'},
      {label: 'Event Product', value: 54, code: 'e16', acl: 'e16'},
      {label: 'Event Lead', value: 55, code: 'e32', acl: 'e32'},
      {label: 'Event Basket', value: 56, code: 'e64', acl: 'e64'},
      {label: 'Event Checkout', value: 57, code: 'e128', acl: 'e128'},
      {label: 'Event Checkout Price', value: 58, code: 'e128s', acl: 'e128s'}
    ]
  },
  {
    label: 'Unique Visitor',
    options: [
      {label: 'Unique Visitor Hourly', value: 59, code: 'uvh', acl: 'uvh'},
      {label: 'Unique Visitor Daily', value: 60, code: 'uvd', acl: 'uvd'},
      {label: 'Unique Visitor Monthly', value: 61, code: 'uvm', acl: 'uvm'}
    ]
  },
  {
    label: 'Visit Time',
    options: [{label: 'Visit Time', value: 62, code: 'vt', acl: 'vt'}]
  },
  // {
  //   label: 'Visibility',
  //   options: [{label: 'Visibility', value: 63, code: 'visi', acl: 'adloox'}]
  // },
  // {
  //   label: 'Fraud',
  //   options: [{label: 'Fraud', value: 64, code: 'fraud', acl: 'adloox'}]
  // },
  {
    label: 'Labels',
    options: [
      {label: 'Labels', value: 65, code: 'labels', acl: 'l'},
      {label: 'Labels PC', value: 66, code: 'labelsPc', acl: 'l'},
      {label: 'Labels PV', value: 67, code: 'labelsPv', acl: 'l'}
    ]
  }
];

export const PUBLISHER_REPORT_VIEW_TYPES = [
  {label: 'Bids', value: 'bc', code: 'bc'},
  {label: 'Bid Errors', value: 'bce', code: 'bce'},
  {label: 'Bid Price', value: 'bsp', code: 'bsp'},
  {label: 'Impressions', value: 'ic', code: 'ic'},
  {label: 'Clicks', value: 'cc', code: 'cc'},
  {label: 'Actual Price', value: 'ap', code: 'ap'},
  {label: 'Tracking Cost', value: 'tc', code: 'tc'},
  {label: 'Commission Price', value: 'cp', code: 'cp'},
  {label: 'Publisher Final Revenue', value: 'pfr', code: 'pfr'},
  {label: 'Total Response Time', value: 'trp', code: 'trp'},
  {label: 'Avg Response Time', value: 'art', code: 'art'},
  {label: 'Post Click Visits', value: 'cl', code: 'cl'},
  {label: 'Post Click Conv', value: 'pc', code: 'pc'},
  {label: 'Post View Conv', value: 'pv', code: 'pv'},
  {label: 'Unique Visitor Hourly', value: 'uvh', code: 'uvh'},
  {label: 'Unique Visitor Daily', value: 'uvd', code: 'uvd'},
  {label: 'Unique Visitor Monthly', value: 'uvm', code: 'uvm'},
  {label: 'Visit Time', value: 'vt', code: 'vt'},
  {label: 'Visibility', value: 'adloox', code: 'adloox'},
  {label: 'Fraud', value: 'fraud', code: 'fraud'}
];

export const METRIC_SETS = {
  // External
  xic: {label: 'External Impressions', value: 3, code: 'xic'},
  xcc: {label: 'ExternalClicks', value: 4, code: 'xcc'},
  // Creative
  cbc: {label: 'Creative Bids', value: 5, code: 'cbc', acl: 'bc'},
  cbsp: {label: 'Creative Bid Price', value: 6, code: 'cbsp', acl: 'bsp'},
  cic: {label: 'Creative Impressions', value: 7, code: 'cic', acl: 'ic'},
  ccc: {label: 'Creative Clicks', value: 8, code: 'ccc', acl: 'cc'},
  ccl: {label: 'Creative Post Click Visits', value: 9, code: 'ccl', acl: 'cl'},
  cpc: {label: 'Creative Post Click Conv', value: 10, code: 'cpc', acl: 'pc'},
  cpv: {label: 'Creative Post View Conv', value: 11, code: 'cpv', acl: 'pv'},
  ctp: {label: 'Creative Tracking Cost', value: 12, code: 'ctp', acl: 'tp'},
  cirp: {
    label: 'Creative Cost',
    value: 13,
    code: 'cirp',
    acl: 'irp'
  },
  cirp_org: {label: 'Creative Media Cost', value: 14, code: 'cirp_org'},
  cirp_client: {
    label: 'Creative Client Media Cost',
    value: 15,
    code: 'cirp_client',
    acl: 'irp_client'
  },
  // Native
  nbc: {label: 'Native Bids', value: 16, code: 'nbc', acl: 'bc'},
  nbsp: {label: 'Native Bid Price', value: 17, code: 'nbsp', acl: 'bsp'},
  nic: {label: 'Native Impressions', value: 18, code: 'nic', acl: 'ic'},
  ncc: {label: 'Native Clicks', value: 19, code: 'ncc', acl: 'cc'},
  ncl: {label: 'Native Post Click Visits', value: 20, code: 'ncl', acl: 'cl'},
  npc: {label: 'Native Post Click Conv', value: 21, code: 'npc', acl: 'pc'},
  npv: {label: 'Native Post View Conv', value: 22, code: 'npv', acl: 'pv'},
  ntp: {label: 'Native Tracking Cost', value: 23, code: 'ntp', acl: 'tp'},
  nirp: {label: 'Native Cost', value: 24, code: 'nirp', acl: 'irp'},
  nirp_org: {
    label: 'Native Media Cost',
    value: 25,
    code: 'nirp_org',
    acl: 'nirp_org'
  },
  nirp_client: {
    label: 'Native Client Media Cost',
    value: 26,
    code: 'nirp_client',
    acl: 'nirp_client'
  },
  // Video Ads
  vbc: {label: 'Video Bids', value: 27, code: 'vbc', acl: 'vbc'},
  vbsp: {label: 'Video Bid Price', value: 28, code: 'vbsp', acl: 'vbsp'},
  vic: {label: 'Video Impressions', value: 29, code: 'vic', acl: 'vic'},
  vcc: {label: 'Video Clicks', value: 30, code: 'vcc', acl: 'vcc'},
  vcl: {label: 'Video Post Click Visits', value: 31, code: 'vcl', acl: 'vcl'},
  vpc: {label: 'Video Post Click Conv', value: 32, code: 'vpc', acl: 'vpc'},
  vpv: {label: 'Video Post View Conv', value: 33, code: 'vpv', acl: 'vpv'},
  vtp: {label: 'Video Tracking Cost', value: 34, code: 'vtp', acl: 'tp'},
  virp: {label: 'Video Cost', value: 35, code: 'virp', acl: 'irp'},
  virp_org: {
    label: 'Video Media Cost',
    value: 36,
    code: 'virp_org',
    acl: 'irp_org'
  },
  virp_client: {
    label: 'Video Client Media Cost',
    value: 37,
    code: 'virp_client',
    acl: 'qirp_client1'
  },
  q1: {label: 'Video First Quartil', value: 38, code: 'q1', acl: 'q1'},
  q2: {label: 'Video Midpoint', value: 39, code: 'q2', acl: 'q2'},
  q3: {label: 'Video Third Quartil', value: 40, code: 'q3', acl: 'q3'},
  q4: {label: 'Video Completion', value: 41, code: 'q4', acl: 'q4'},
  sk: {label: 'Video Skip', value: 42, code: 'sk', acl: 'sk'},
  t: {label: 'Video Time', value: 43, code: 't', acl: 't'},
  // Post
  pce32: {label: 'Post Click Lead', value: 44, code: 'pce32', acl: 'pce32'},
  pve32: {label: 'Post View Lead', value: 45, code: 'pve32', acl: 'pve32'},
  pce128: {
    label: 'Post Click Checkout',
    value: 46,
    code: 'pce128',
    acl: 'pce128'
  },
  pve128: {
    label: 'Post View Checkout',
    value: 47,
    code: 'pve128',
    acl: 'pve128'
  },
  pce128s: {
    label: 'Post Click Revenue',
    value: 48,
    code: 'pce128s',
    acl: 'pce128s'
  },
  pve128s: {
    label: 'Post View Revenue',
    value: 49,
    code: 'pve128s',
    acl: 'pve128s'
  },
  // Event
  e1: {label: 'Event Home', value: 50, code: 'e1', acl: 'e1'},
  e2: {label: 'Event View', value: 51, code: 'e2', acl: 'e2'},
  e4: {label: 'Event Category', value: 52, code: 'e4', acl: 'e4'},
  e8: {label: 'Event Sub Category', value: 53, code: 'e8', acl: 'e8'},
  e16: {label: 'Event Product', value: 54, code: 'e16', acl: 'e16'},
  e32: {label: 'Event Lead', value: 55, code: 'e32', acl: 'e32'},
  e64: {label: 'Event Basket', value: 56, code: 'e64', acl: 'e64'},
  e128: {label: 'Event Checkout', value: 57, code: 'e128', acl: 'e128'},
  e128s: {
    label: 'Event Checkout Price',
    value: 58,
    code: 'e128s',
    acl: 'e128s'
  },
  // Unique Visitor
  uvh: {label: 'Unique Visitor Hourly', value: 59, code: 'uvh', acl: 'uvh'},
  uvd: {label: 'Unique Visitor Daily', value: 60, code: 'uvd', acl: 'uvd'},
  uvm: {label: 'Unique Visitor Monthly', value: 61, code: 'uvm', acl: 'uvm'},
  // Visitime
  vt: {label: 'Visit Time', value: 62, code: 'vt', acl: 'vt'},
  labels: {label: 'Labels', value: 65, code: 'labels', acl: 'l'},
  labelsPc: {label: 'Labels PC', value: 66, code: 'labelsPc', acl: 'l'},
  labelsPv: {label: 'Labels PV', value: 67, code: 'labelsPv', acl: 'l'}
};

export const METRIC_TYPES = {
  trend_strategy: 'trend-strategy',
  trend_campaign: 'trend-campaign',
  trend_organization: 'trend-organisation',
  trend_advertiser: 'trend-advertiser',
  trend_publisher: 'trend-publisher',
  trend_dsp: 'trend-dsp',
  trend_inventory: 'trend-inventory',
  strategy: 'distribution-strategy',
  campaign: 'distribution-campaign',
  organization: 'distribution-organisation',
  advertiser: 'distribution-advertiser',
  creative: 'distribution-advertiser',
  navtive_ad: 'distribution-advertiser',
  video: 'distribution-advertiser',
  publisher: 'distribution-publisher',
  dsp: 'distribution-dsp',
  inventory: 'distribution-inventory'
};

export const METRIC_TYPE_OPTIONS = [
  //---> Strategy
  {value: 'distribution-strategy', label: 'Distribution strategy'},
  {value: 'trend-strategy', label: 'Trend strategy'},

  //--->  Campaign
  {value: 'distribution-campaign', label: 'Distribution campaign'},
  {value: 'trend-campaign', label: 'Trend campaign'},

  //---> Advertiser
  {value: 'distribution-advertiser', label: 'Distribution advertiser'},
  {value: 'trend-advertiser', label: 'Trend advertiser'},

  //---> DSP
  {value: 'distribution-dsp', label: 'Distribution dsp'},
  {value: 'trend-dsp', label: 'Trend dsp'},

  //---> Publisher
  {value: 'distribution-publisher', label: 'Distribution publisher'},
  {value: 'trend-publisher', label: 'Trend publisher'},

  //---> Inventory
  {value: 'distribution-inventory', label: 'Distribution inventory'},
  {value: 'trend-inventory', label: 'Trend inventory'}
];

export const EntityTypes = {
  STRATEGY: 'strategy',
  CAMPAIGN: 'campaign',
  ADVERTISER: 'advertiser',
  DSP: 'dsp',
  VIDEO: 'video',
  NATIVE_AD: 'native_ad',
  CREATIVE: 'creative',
  PUBLISHER: 'publisher',
  CONTAINER: 'container',
  PAGE: 'page',
  INVENTORY: 'inventory'
};

export const PUBLISHER_METRIC_SET = {
  bc: {label: 'Bids', value: 'bc', code: 'bc'},
  bce: {label: 'Bid Errors', value: 'bce', code: 'bce'},
  bsp: {label: 'Bid Price', value: 'bsp', code: 'bsp'},
  ic: {label: 'Impressions', value: 'ic', code: 'ic'},
  cc: {label: 'Clicks', value: 'cc', code: 'cc'},
  ap: {label: 'Actual Price', value: 'ap', code: 'ap'},
  tc: {label: 'Tracking Cost', value: 'tc', code: 'tc'},
  cp: {label: 'Commission Price', value: 'cp', code: 'cp'},
  pfr: {label: 'Publisher Final Revenue', value: 'pfr', code: 'pfr'},
  trp: {label: 'Total Response Time', value: 'trp', code: 'trp'},
  art: {label: 'Avg Response Time', value: 'art', code: 'art'},
  cl: {label: 'Post Click Visits', value: 'cl', code: 'cl'},
  pc: {label: 'Post Click Conv', value: 'pc', code: 'pc'},
  pv: {label: 'Post View Conv', value: 'pv', code: 'pv'},
  uvh: {label: 'Unique Visitor Hourly', value: 'uvh', code: 'uvh'},
  uvd: {label: 'Unique Visitor Daily', value: 'uvd', code: 'uvd'},
  uvm: {label: 'Unique Visitor Monthly', value: 'uvm', code: 'uvm'},
  vt: {label: 'Visit Time', value: 'vt', code: 'vt'},
  adloox: {label: 'Visibility', value: 'adloox', code: 'adloox'},
  fraud: {label: 'Fraud', value: 'fraud', code: 'fraud'}
};
