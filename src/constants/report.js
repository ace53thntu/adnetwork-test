/**
 * Mode of chart.
 * @enum {string}
 */
export const ChartModes = {
  CUMULATIVE: 'cumulative',
  BY: 'by'
};

/**
 * Types of chart.
 * @enum {string}
 */
export const ChartTypes = {
  /** This type is line chart. */
  LINE: 'line',
  /** This type is line chart. */
  MULTILINE: 'multiline',
  /** This type is bar chart. */
  BAR: 'bar',
  /** This type is pie chart. */
  PIE: 'pie'
};

/**
 * Types of report.
 * @enum {string}
 */
export const ReportTypes = {
  TRENDING: 'trending',
  DISTRIBUTION: 'distribution'
};
/**
 * Time units.
 * @enum {string}
 */
export const TimeUnits = {
  GLOBAL: 'global',
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  HOUR: 'hour',
  MINUTE: 'minute',
  SECOND: 'second'
};

export const METRIC_UNITS = [
  TimeUnits.SECOND,
  TimeUnits.MINUTE,
  TimeUnits.HOUR,
  TimeUnits.DAY,
  TimeUnits.WEEK,
  TimeUnits.MONTH,
  TimeUnits.YEAR,
  TimeUnits.GLOBAL
];

export const METRIC_TIMERANGES = [
  {
    value: 'l1y',
    label: '1 year',
    units: [{value: 'month', label: 'Month'}]
  },
  {
    value: 'l9mt',
    label: '9 months',
    units: [{value: 'month', label: 'Month'}]
  },
  {
    value: 'l6mt',
    label: '6 months',
    units: [{value: 'month', label: 'Month'}]
  },
  {
    value: 'l3mt',
    label: '3 months',
    units: [
      {value: 'month', label: 'Month'},
      {value: 'day', label: 'Day'}
    ]
  },
  {value: 'l1mt', label: '1 month', units: [{value: 'day', label: 'Day'}]},
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
  REPORT_BY_UUID: 'report_by_uuid',
  MODE: 'mode'
};

export const DEFAULT_TIME_RANGE = 'l1mt';
export const DEFAULT_TIME_UNIT = 'day';

/**
 * Format by time unit
 * @enum {string}
 */
export const FORMAT_BY_UNIT = {
  month: 'YYYY-MM',
  day: 'YYYY-MM-DD',
  hour: 'YYYY-MM-DD HH[:00:00]',
  minute: 'YYYY-MM-DD HH:mm[:00]',
  second: 'HH:mm:ss'
};

/**
 * Format by time unit for label
 * @enum {string}
 */
export const FORMAT_BY_UNIT_LABEL = {
  month: 'YYYY-MM',
  day: 'YYYY-MM-DD',
  hour: 'HH',
  minute: 'HH:mm',
  second: 'HH:mm:ss'
};

export const REPORT_VIEW_TYPES = [
  {
    label: 'External',
    options: [
      {
        label: 'External Impressions',
        value: 3,
        code: 'xic',
        acl: 'xic',
        is_price: false,
        code_name: 'external_impressions'
      },
      {
        label: 'ExternalClicks',
        value: 4,
        code: 'xcc',
        acl: 'xcc',
        is_price: false,
        code_name: 'external_clicks'
      }
    ]
  },
  {
    label: 'Creative',
    options: [
      {
        label: 'Creative Bids',
        value: 5,
        code: 'cbc',
        acl: 'bc',
        is_price: false,
        code_name: 'creative_bids'
      },
      {
        label: 'Creative Bid Price',
        value: 6,
        code: 'cbsp',
        acl: 'bsp',
        is_price: true,
        code_name: 'creative_bid_price'
      },
      {
        label: 'Creative Impressions',
        value: 7,
        code: 'cic',
        acl: 'ic',
        is_price: false,
        code_name: 'creative_impressions'
      },
      {
        label: 'Creative Clicks',
        value: 8,
        code: 'ccc',
        acl: 'cc',
        is_price: false,
        code_name: 'creative_clicks'
      },
      {
        label: 'Creative Post Click Visits',
        value: 9,
        code: 'ccl',
        acl: 'cl',
        is_price: false,
        code_name: 'creative_post_click_visits'
      },
      {
        label: 'Creative Post Click Conv',
        value: 10,
        code: 'cpc',
        acl: 'pc',
        is_price: false,
        code_name: 'creative_post_click_conv'
      },
      {
        label: 'Creative Post View Conv',
        value: 11,
        code: 'cpv',
        acl: 'pv',
        is_price: false,
        code_name: 'creative_post_view_conv'
      },
      {
        label: 'Creative Tracking Cost',
        value: 12,
        code: 'ctp',
        acl: 'tp',
        is_price: true,
        code_name: 'creative_tracking_cost'
      },
      {
        label: 'Creative Cost',
        value: 13,
        code: 'cirp',
        acl: 'irp',
        is_price: true,
        code_name: 'creative_cost'
      },
      {
        label: 'Creative Final Cost',
        value: 14,
        code: 'cirp_final',
        acl: 'irp_client',
        is_price: true,
        code_name: 'creative_final_cost'
      }
    ]
  },
  {
    label: 'Native',
    options: [
      {
        label: 'Native Bids',
        value: 16,
        code: 'nbc',
        acl: 'bc',
        is_price: false,
        code_name: 'native_bids'
      },
      {
        label: 'Native Bid Price',
        value: 17,
        code: 'nbsp',
        acl: 'bsp',
        is_price: true,
        code_name: 'native_bid_price'
      },
      {
        label: 'Native Impressions',
        value: 18,
        code: 'nic',
        acl: 'ic',
        is_price: false,
        code_name: 'native_impressions'
      },
      {
        label: 'Native Clicks',
        value: 19,
        code: 'ncc',
        acl: 'cc',
        is_price: false,
        code_name: 'native_clicks'
      },
      {
        label: 'Native Post Click Visits',
        value: 20,
        code: 'ncl',
        acl: 'cl',
        is_price: false,
        code_name: 'native_post_click_visits'
      },
      {
        label: 'Native Post Click Conv',
        value: 21,
        code: 'npc',
        acl: 'pc',
        is_price: false,
        code_name: 'native_post_click_conv'
      },
      {
        label: 'Native Post View Conv',
        value: 22,
        code: 'npv',
        acl: 'pv',
        is_price: false,
        code_name: 'native_post_view_conv'
      },
      {
        label: 'Native Tracking Cost',
        value: 23,
        code: 'ntp',
        acl: 'tp',
        is_price: true,
        code_name: 'native_tracking_cost'
      },
      {
        label: 'Native Cost',
        value: 24,
        code: 'nirp',
        acl: 'irp',
        is_price: true,
        code_name: 'native_cost'
      },
      {
        label: 'Native Final Cost',
        value: 25,
        code: 'nirp_final',
        acl: 'irp_client',
        is_price: true,
        code_name: 'native_final_cost'
      }
    ]
  },
  {
    label: 'Video',
    options: [
      {
        label: 'Video Bids',
        value: 27,
        code: 'vbc',
        acl: 'vbc',
        is_price: false,
        code_name: 'video_bids'
      },
      {
        label: 'Video Bid Price',
        value: 28,
        code: 'vbsp',
        acl: 'vbsp',
        is_price: true,
        code_name: 'video_bid_price'
      },
      {
        label: 'Video Impressions',
        value: 29,
        code: 'vic',
        acl: 'vic',
        is_price: false,
        code_name: 'video_impressions'
      },
      {
        label: 'Video Clicks',
        value: 30,
        code: 'vcc',
        acl: 'vcc',
        is_price: false,
        code_name: 'video_clicks'
      },
      {
        label: 'Video Post Click Visits',
        value: 31,
        code: 'vcl',
        acl: 'vcl',
        is_price: false,
        code_name: 'video_post_click_visits'
      },
      {
        label: 'Video Post Click Conv',
        value: 32,
        code: 'vpc',
        acl: 'vpc',
        is_price: false,
        code_name: 'video_post_click_conv'
      },
      {
        label: 'Video Post View Conv',
        value: 33,
        code: 'vpv',
        acl: 'vpv',
        is_price: false,
        code_name: 'video_post_view_conv'
      },
      {
        label: 'Video Tracking Cost',
        value: 34,
        code: 'vtp',
        acl: 'tp',
        is_price: true,
        code_name: 'video_tracking_cost'
      },
      {
        label: 'Video Cost',
        value: 35,
        code: 'virp',
        acl: 'irp',
        is_price: true,
        code_name: 'video_cost'
      },
      {
        label: 'Video Final Cost',
        value: 36,
        code: 'virp_org',
        acl: 'irp_client',
        is_price: true,
        code_name: 'video_final_cost'
      },
      {
        label: 'Video Start',
        value: 36,
        code: 'virp_start',
        acl: 'irp_client',
        is_price: true,
        code_name: 'video_start'
      },
      {
        label: 'Video First Quartil',
        value: 38,
        code: 'q1',
        acl: 'q1',
        is_price: false,
        code_name: 'video_first_quartil'
      },
      {
        label: 'Video Midpoint',
        value: 39,
        code: 'q2',
        acl: 'q2',
        is_price: false,
        code_name: 'video_midpoint'
      },
      {
        label: 'Video Third Quartil',
        value: 40,
        code: 'q3',
        acl: 'q3',
        is_price: false,
        code_name: 'video_third_quartil'
      },
      {
        label: 'Video Completion',
        value: 41,
        code: 'q4',
        acl: 'q4',
        is_price: false,
        code_name: 'video_completion'
      },
      {
        label: 'Video Skip',
        value: 42,
        code: 'sk',
        acl: 'sk',
        is_price: false,
        code_name: 'video_skip'
      },
      {
        label: 'Video Mute',
        value: 42,
        code: 'vmt',
        acl: 'vmt',
        is_price: false,
        code_name: 'video_mute'
      },
      {
        label: 'Video Unmute',
        value: 42,
        code: 'vumt',
        acl: 'vumt',
        is_price: false,
        code_name: 'video_unmute'
      },
      {
        label: 'Video Rewind',
        value: 42,
        code: 'vrw',
        acl: 'vrw',
        is_price: false,
        code_name: 'video_rewind'
      },
      {
        label: 'Video Pause',
        value: 42,
        code: 'vps',
        acl: 'vps',
        is_price: false,
        code_name: 'video_pause'
      },
      {
        label: 'Video Resume',
        value: 42,
        code: 'vrs',
        acl: 'vrs',
        is_price: false,
        code_name: 'video_resume'
      },
      {
        label: 'Video Full screen',
        value: 42,
        code: 'vfs',
        acl: 'vfs',
        is_price: false,
        code_name: 'video_fullscreen'
      },
      {
        label: 'Video Exit Full screen',
        value: 42,
        code: 'vefs',
        acl: 'vefs',
        is_price: false,
        code_name: 'video_exit_fullscreen'
      },
      {
        label: 'Video Close Linear',
        value: 42,
        code: 'vcln',
        acl: 'vcln',
        is_price: false,
        code_name: 'video_close_linear'
      },
      {
        label: 'Video Time',
        value: 43,
        code: 't',
        acl: 't',
        is_price: false,
        code_name: 'video_time'
      }
    ]
  },
  {
    label: 'Post' /**===== BEGIN: POST GROUP =====*/,
    options: [
      {
        label: 'Post Click Lead',
        value: 44,
        code: 'pce32',
        acl: 'pce32',
        is_price: false,
        code_name: 'post_click_lead'
      },
      {
        label: 'Post View Lead',
        value: 45,
        code: 'pve32',
        acl: 'pve32',
        is_price: false,
        code_name: 'post_view_lead'
      },
      {
        label: 'Post Click Checkout',
        value: 46,
        code: 'pce128',
        acl: 'pce128',
        is_price: false,
        code_name: 'post_click_checkout'
      },
      {
        label: 'Post View Checkout',
        value: 47,
        code: 'pve128',
        acl: 'pve128',
        is_price: false,
        code_name: 'post_view_checkout'
      },
      {
        label: 'Post Click Revenue',
        value: 48,
        code: 'pce128s',
        acl: 'pce128s',
        is_price: true,
        code_name: 'post_click_revenue'
      },
      {
        label: 'Post View Revenue',
        value: 49,
        code: 'pve128s',
        acl: 'pve128s',
        is_price: true,
        code_name: 'post_view_revenue'
      }
    ]
  } /**===== END: POST GROUP =====*/,
  {
    label: 'Event' /**===== BEGIN: EVENT GROUP =====*/,
    options: [
      {
        label: 'Event Home',
        value: 50,
        code: 'e1',
        acl: 'e1',
        is_price: false,
        code_name: 'event_home'
      },
      {
        label: 'Event View',
        value: 51,
        code: 'e2',
        acl: 'e2',
        is_price: false,
        code_name: 'event_view'
      },
      {
        label: 'Event Category',
        value: 52,
        code: 'e4',
        acl: 'e4',
        is_price: false,
        code_name: 'event_category'
      },
      {
        label: 'Event Sub Category',
        value: 53,
        code: 'e8',
        acl: 'e8',
        is_price: false,
        code_name: 'event_sub_category'
      },
      {
        label: 'Event Product',
        value: 54,
        code: 'e16',
        acl: 'e16',
        is_price: false,
        code_name: 'event_product'
      },
      {
        label: 'Event Lead',
        value: 55,
        code: 'e32',
        acl: 'e32',
        is_price: false,
        code_name: 'event_lead'
      },
      {
        label: 'Event Basket',
        value: 56,
        code: 'e64',
        acl: 'e64',
        is_price: false,
        code_name: 'event_basket'
      },
      {
        label: 'Event Checkout',
        value: 57,
        code: 'e128',
        acl: 'e128',
        is_price: false,
        code_name: 'event_checkout'
      },
      {
        label: 'Event Checkout Price',
        value: 58,
        code: 'e128s',
        acl: 'e128s',
        is_price: true,
        code_name: 'event_checkout_price'
      }
    ]
  } /**===== END: EVENT GROUP =====*/,
  {
    label: 'Unique Visitor',
    options: [
      {
        label: 'Unique Visitor Hourly',
        value: 59,
        code: 'uvh',
        acl: 'uvh',
        is_price: false,
        code_name: 'unique_visitor_hourly'
      },
      {
        label: 'Unique Visitor Daily',
        value: 60,
        code: 'uvd',
        acl: 'uvd',
        is_price: false,
        code_name: 'unique_visitor_daily'
      },
      {
        label: 'Unique Visitor Monthly',
        value: 61,
        code: 'uvm',
        acl: 'uvm',
        is_price: false,
        code_name: 'unique_visitor_monthly'
      }
    ]
  },
  {
    label: 'Visit Time',
    options: [
      {
        label: 'Visit Time',
        value: 62,
        code: 'vt',
        acl: 'vt',
        is_price: false,
        code_name: 'visit_time'
      }
    ]
  }
  // {
  //   label: 'Visibility',
  //   options: [{label: 'Visibility', value: 63, code: 'visi', acl: 'adloox', is_price: false, code_name: 'visibility'}]
  // },
  // {
  //   label: 'Fraud',
  //   options: [{label: 'Fraud', value: 64, code: 'fraud', acl: 'adloox', is_price: false, code_name: 'fraud'}]
  // },
  // {
  //   label: 'Labels',
  //   options: [
  //     {label: 'Labels', value: 65, code: 'labels', acl: 'l', is_price: false},
  //     {
  //       label: 'Labels PC',
  //       value: 66,
  //       code: 'labelsPc',
  //       acl: 'l',
  //       is_price: false
  //     },
  //     {
  //       label: 'Labels PV',
  //       value: 67,
  //       code: 'labelsPv',
  //       acl: 'l',
  //       is_price: false
  //     }
  //   ]
  // }
];

export const PUBLISHER_REPORT_VIEW_TYPES = [
  {label: 'Bids', value: 'bc', code: 'bc', is_price: false, code_name: 'bids'},
  {
    label: 'Bid Errors',
    value: 'bce',
    code: 'bce',
    is_price: false,
    code_name: 'bid_errors'
  },
  {
    label: 'Bid Price',
    value: 'bsp',
    code: 'bsp',
    is_price: true,
    code_name: 'bid_price'
  },
  {
    label: 'Impressions',
    value: 'ic',
    code: 'ic',
    is_price: false,
    code_name: 'impressions'
  },
  {
    label: 'Clicks',
    value: 'cc',
    code: 'cc',
    is_price: false,
    code_name: 'clicks'
  },
  {
    label: 'Actual Price',
    value: 'ap',
    code: 'ap',
    is_price: true,
    code_name: 'actual_price'
  },
  {
    label: 'Tracking Cost',
    value: 'tc',
    code: 'tc',
    is_price: true,
    code_name: 'tracking_cost'
  },
  {
    label: 'Commission Price',
    value: 'cp',
    code: 'cp',
    is_price: true,
    code_name: 'commission_price'
  },
  {
    label: 'Publisher Final Revenue',
    value: 'pfr',
    code: 'pfr',
    is_price: true,
    code_name: 'publisher_final_revenue'
  },
  {
    label: 'Total Response Time',
    value: 'trp',
    code: 'trp',
    is_price: false,
    code_name: 'total_response_time'
  },
  {
    label: 'Avg Response Time',
    value: 'art',
    code: 'art',
    is_price: false,
    code_name: 'avg_response_time'
  },
  {
    label: 'Post Click Visits',
    value: 'cl',
    code: 'cl',
    is_price: false,
    code_name: 'post_click_visits'
  },
  {
    label: 'Post Click Conv',
    value: 'pc',
    code: 'pc',
    is_price: false,
    code_name: 'post_click_conv'
  },
  {
    label: 'Post View Conv',
    value: 'pv',
    code: 'pv',
    is_price: false,
    code_name: 'post_view_conv'
  },
  {
    label: 'Unique Visitor Hourly',
    value: 'uvh',
    code: 'uvh',
    is_price: false,
    code_name: 'unique_visitor_hourly'
  },
  {
    label: 'Unique Visitor Daily',
    value: 'uvd',
    code: 'uvd',
    is_price: false,
    code_name: 'unique_visitor_daily'
  },
  {
    label: 'Unique Visitor Monthly',
    value: 'uvm',
    code: 'uvm',
    is_price: false,
    code_name: 'unique_visitor_monthly'
  },
  {
    label: 'Visit Time',
    value: 'vt',
    code: 'vt',
    is_price: false,
    code_name: 'visit_time'
  },
  {
    label: 'Visibility',
    value: 'adloox',
    code: 'adloox',
    is_price: false,
    code_name: 'visibility'
  },
  {
    label: 'Fraud',
    value: 'fraud',
    code: 'fraud',
    is_price: false,
    code_name: 'fraud'
  }
];

export const METRIC_SETS = {
  // External
  xic: {label: 'External Impressions', value: 3, code: 'xic', is_price: false},
  xcc: {label: 'ExternalClicks', value: 4, code: 'xcc', is_price: false},
  // Creative
  cbc: {
    label: 'Creative Bids',
    value: 5,
    code: 'cbc',
    acl: 'bc',
    is_price: false
  },
  cbsp: {
    label: 'Creative Bid Price',
    value: 6,
    code: 'cbsp',
    acl: 'bsp',
    is_price: true
  },
  cic: {
    label: 'Creative Impressions',
    value: 7,
    code: 'cic',
    acl: 'ic',
    is_price: false
  },
  ccc: {
    label: 'Creative Clicks',
    value: 8,
    code: 'ccc',
    acl: 'cc',
    is_price: false
  },
  ccl: {
    label: 'Creative Post Click Visits',
    value: 9,
    code: 'ccl',
    acl: 'cl',
    is_price: false
  },
  cpc: {
    label: 'Creative Post Click Conv',
    value: 10,
    code: 'cpc',
    acl: 'pc',
    is_price: false
  },
  cpv: {
    label: 'Creative Post View Conv',
    value: 11,
    code: 'cpv',
    acl: 'pv',
    is_price: false
  },
  ctp: {
    label: 'Creative Tracking Cost',
    value: 12,
    code: 'ctp',
    acl: 'tp',
    is_price: true
  },
  cirp: {
    label: 'Creative Cost',
    value: 13,
    code: 'cirp',
    acl: 'irp',
    is_price: true
  },
  cirp_org: {
    label: 'Creative Media Cost',
    value: 14,
    code: 'cirp_org',
    is_price: true
  },
  cirp_client: {
    label: 'Creative Client Media Cost',
    value: 15,
    code: 'cirp_client',
    acl: 'irp_client',
    is_price: true
  },
  // Native
  nbc: {
    label: 'Native Bids',
    value: 16,
    code: 'nbc',
    acl: 'bc',
    is_price: false
  },
  nbsp: {
    label: 'Native Bid Price',
    value: 17,
    code: 'nbsp',
    acl: 'bsp',
    is_price: true
  },
  nic: {
    label: 'Native Impressions',
    value: 18,
    code: 'nic',
    acl: 'ic',
    is_price: false
  },
  ncc: {
    label: 'Native Clicks',
    value: 19,
    code: 'ncc',
    acl: 'cc',
    is_price: false
  },
  ncl: {
    label: 'Native Post Click Visits',
    value: 20,
    code: 'ncl',
    acl: 'cl',
    is_price: false
  },
  npc: {
    label: 'Native Post Click Conv',
    value: 21,
    code: 'npc',
    acl: 'pc',
    is_price: false
  },
  npv: {
    label: 'Native Post View Conv',
    value: 22,
    code: 'npv',
    acl: 'pv',
    is_price: false
  },
  ntp: {
    label: 'Native Tracking Cost',
    value: 23,
    code: 'ntp',
    acl: 'tp',
    is_price: true
  },
  nirp: {
    label: 'Native Cost',
    value: 24,
    code: 'nirp',
    acl: 'irp',
    is_price: true
  },
  nirp_org: {
    label: 'Native Media Cost',
    value: 25,
    code: 'nirp_org',
    acl: 'nirp_org',
    is_price: true
  },
  nirp_client: {
    label: 'Native Client Media Cost',
    value: 26,
    code: 'nirp_client',
    acl: 'nirp_client',
    is_price: true
  },
  // Video Ads
  vbc: {
    label: 'Video Bids',
    value: 27,
    code: 'vbc',
    acl: 'vbc',
    is_price: false
  },
  vbsp: {
    label: 'Video Bid Price',
    value: 28,
    code: 'vbsp',
    acl: 'vbsp',
    is_price: true
  },
  vic: {
    label: 'Video Impressions',
    value: 29,
    code: 'vic',
    acl: 'vic',
    is_price: false
  },
  vcc: {
    label: 'Video Clicks',
    value: 30,
    code: 'vcc',
    acl: 'vcc',
    is_price: false
  },
  vcl: {
    label: 'Video Post Click Visits',
    value: 31,
    code: 'vcl',
    acl: 'vcl',
    is_price: false
  },
  vpc: {
    label: 'Video Post Click Conv',
    value: 32,
    code: 'vpc',
    acl: 'vpc',
    is_price: false
  },
  vpv: {
    label: 'Video Post View Conv',
    value: 33,
    code: 'vpv',
    acl: 'vpv',
    is_price: false
  },
  vtp: {
    label: 'Video Tracking Cost',
    value: 34,
    code: 'vtp',
    acl: 'tp',
    is_price: true
  },
  virp: {
    label: 'Video Cost',
    value: 35,
    code: 'virp',
    acl: 'irp',
    is_price: true
  },
  virp_org: {
    label: 'Video Media Cost',
    value: 36,
    code: 'virp_org',
    acl: 'irp_org',
    is_price: true
  },
  virp_client: {
    label: 'Video Client Media Cost',
    value: 37,
    code: 'virp_client',
    acl: 'qirp_client1',
    is_price: true
  },
  q1: {
    label: 'Video First Quartil',
    value: 38,
    code: 'q1',
    acl: 'q1',
    is_price: false
  },
  q2: {
    label: 'Video Midpoint',
    value: 39,
    code: 'q2',
    acl: 'q2',
    is_price: false
  },
  q3: {
    label: 'Video Third Quartil',
    value: 40,
    code: 'q3',
    acl: 'q3',
    is_price: false
  },
  q4: {
    label: 'Video Completion',
    value: 41,
    code: 'q4',
    acl: 'q4',
    is_price: false
  },
  sk: {label: 'Video Skip', value: 42, code: 'sk', acl: 'sk', is_price: false},
  t: {label: 'Video Time', value: 43, code: 't', acl: 't', is_price: false},
  // Post
  pce32: {
    label: 'Post Click Lead',
    value: 44,
    code: 'pce32',
    acl: 'pce32',
    is_price: false
  },
  pve32: {
    label: 'Post View Lead',
    value: 45,
    code: 'pve32',
    acl: 'pve32',
    is_price: false
  },
  pce128: {
    label: 'Post Click Checkout',
    value: 46,
    code: 'pce128',
    acl: 'pce128',
    is_price: false
  },
  pve128: {
    label: 'Post View Checkout',
    value: 47,
    code: 'pve128',
    acl: 'pve128',
    is_price: false
  },
  pce128s: {
    label: 'Post Click Revenue',
    value: 48,
    code: 'pce128s',
    acl: 'pce128s',
    is_price: true
  },
  pve128s: {
    label: 'Post View Revenue',
    value: 49,
    code: 'pve128s',
    acl: 'pve128s',
    is_price: true
  },
  // Event
  e1: {label: 'Event Home', value: 50, code: 'e1', acl: 'e1', is_price: false},
  e2: {label: 'Event View', value: 51, code: 'e2', acl: 'e2', is_price: false},
  e4: {
    label: 'Event Category',
    value: 52,
    code: 'e4',
    acl: 'e4',
    is_price: false
  },
  e8: {
    label: 'Event Sub Category',
    value: 53,
    code: 'e8',
    acl: 'e8',
    is_price: false
  },
  e16: {
    label: 'Event Product',
    value: 54,
    code: 'e16',
    acl: 'e16',
    is_price: false
  },
  e32: {
    label: 'Event Lead',
    value: 55,
    code: 'e32',
    acl: 'e32',
    is_price: false
  },
  e64: {
    label: 'Event Basket',
    value: 56,
    code: 'e64',
    acl: 'e64',
    is_price: false
  },
  e128: {
    label: 'Event Checkout',
    value: 57,
    code: 'e128',
    acl: 'e128',
    is_price: false
  },
  e128s: {
    label: 'Event Checkout Price',
    value: 58,
    code: 'e128s',
    acl: 'e128s',
    is_price: true
  },
  // Unique Visitor
  uvh: {
    label: 'Unique Visitor Hourly',
    value: 59,
    code: 'uvh',
    acl: 'uvh',
    is_price: false
  },
  uvd: {
    label: 'Unique Visitor Daily',
    value: 60,
    code: 'uvd',
    acl: 'uvd',
    is_price: false
  },
  uvm: {
    label: 'Unique Visitor Monthly',
    value: 61,
    code: 'uvm',
    acl: 'uvm',
    is_price: false
  },
  // Visit time
  vt: {label: 'Visit Time', value: 62, code: 'vt', acl: 'vt', is_price: false},
  labels: {
    label: 'Labels',
    value: 65,
    code: 'labels',
    acl: 'l',
    is_price: false
  },
  labelsPc: {
    label: 'Labels PC',
    value: 66,
    code: 'labelsPc',
    acl: 'l',
    is_price: false
  },
  labelsPv: {
    label: 'Labels PV',
    value: 67,
    code: 'labelsPv',
    acl: 'l',
    is_price: false
  }
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
