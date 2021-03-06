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
  MODE: 'mode',
  TIMEZONE: 'time_zone'
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
        value: 'external_impressions',
        code: 'xic',
        acl: 'xic',
        is_price: false,
        code_name: 'external_impressions'
      },
      {
        label: 'ExternalClicks',
        value: 'external_clicks',
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
        value: 'creative_bids',
        code: 'cbc',
        acl: 'bc',
        is_price: false,
        code_name: 'creative_bids'
      },
      {
        label: 'Creative Bid Price',
        value: 'creative_bid_price',
        code: 'cbsp',
        acl: 'bsp',
        is_price: true,
        code_name: 'creative_bid_price'
      },
      {
        label: 'Creative Impressions',
        value: 'creative_impressions',
        code: 'cic',
        acl: 'ic',
        is_price: false,
        code_name: 'creative_impressions'
      },
      {
        label: 'Creative Clicks',
        value: 'creative_clicks',
        code: 'ccc',
        acl: 'cc',
        is_price: false,
        code_name: 'creative_clicks'
      },
      {
        label: 'Creative Post Click Visits',
        value: 'creative_post_click_visits',
        code: 'ccl',
        acl: 'cl',
        is_price: false,
        code_name: 'creative_post_click_visits'
      },
      {
        label: 'Creative Post Click Conv',
        value: 'creative_post_click_conv',
        code: 'cpc',
        acl: 'pc',
        is_price: false,
        code_name: 'creative_post_click_conv'
      },
      {
        label: 'Creative Post View Conv',
        value: 'creative_post_view_conv',
        code: 'cpv',
        acl: 'pv',
        is_price: false,
        code_name: 'creative_post_view_conv'
      },
      {
        label: 'Creative Tracking Cost',
        value: 'creative_tracking_cost',
        code: 'ctp',
        acl: 'tp',
        is_price: true,
        code_name: 'creative_tracking_cost'
      },
      {
        label: 'Creative Cost',
        value: 'creative_cost',
        code: 'cirp',
        acl: 'irp',
        is_price: true,
        code_name: 'creative_cost'
      },
      {
        label: 'Creative Advertiser Cost',
        value: 'creative_advertiser_cost',
        code: 'cirp_final',
        acl: 'irp_client',
        is_price: true,
        code_name: 'creative_advertiser_cost'
      },
      {
        label: 'Creative Viewable',
        value: 'creative_viewable',
        code: 'creative_viewable',
        acl: 'creative_viewable',
        is_price: false,
        code_name: 'creative_viewable'
      },
      {
        label: 'Creative Not Viewable',
        value: 'creative_not_viewable',
        code: 'creative_not_viewable',
        acl: 'creative_not_viewable',
        is_price: false,
        code_name: 'creative_not_viewable'
      },
      {
        label: 'Creative View Undertermined',
        value: 'creative_view_undertermined',
        code: 'creative_view_undertermined',
        acl: 'creative_view_undertermined',
        is_price: false,
        code_name: 'creative_view_undertermined'
      },
      {
        label: 'Creative Unique Viewable',
        value: 'creative_unique_viewable',
        code: 'creative_unique_viewable',
        acl: 'creative_unique_viewable',
        is_price: false,
        code_name: 'creative_unique_viewable'
      },
      {
        label: 'Creative Unique Impression',
        value: 'creative_unique_impressions',
        code: 'creative_unique_impressions',
        acl: 'creative_unique_impressions',
        is_price: false,
        code_name: 'creative_unique_impressions'
      },
      {
        label: 'Creative Unique Not Viewable',
        value: 'creative_unique_not_viewable',
        code: 'creative_unique_not_viewable',
        acl: 'creative_unique_not_viewable',
        is_price: false,
        code_name: 'creative_unique_not_viewable'
      },
      {
        label: 'Creative Unique View Undertermined',
        value: 'creative_unique_view_undertermined',
        code: 'creative_unique_view_undertermined',
        acl: 'creative_unique_view_undertermined',
        is_price: false,
        code_name: 'creative_unique_view_undertermined'
      },
      {
        label: 'Creative Unique Click',
        value: 'creative_unique_click',
        code: 'creative_unique_click',
        acl: 'creative_unique_click',
        is_price: false,
        code_name: 'creative_unique_click'
      }
    ]
  },
  {
    label: 'Native',
    options: [
      {
        label: 'Native Bids',
        value: 'native_bids',
        code: 'nbc',
        acl: 'bc',
        is_price: false,
        code_name: 'native_bids'
      },
      {
        label: 'Native Bid Price',
        value: 'native_bid_price',
        code: 'nbsp',
        acl: 'bsp',
        is_price: true,
        code_name: 'native_bid_price'
      },
      {
        label: 'Native Impressions',
        value: 'native_impressions',
        code: 'nic',
        acl: 'ic',
        is_price: false,
        code_name: 'native_impressions'
      },
      {
        label: 'Native Clicks',
        value: 'native_clicks',
        code: 'ncc',
        acl: 'cc',
        is_price: false,
        code_name: 'native_clicks'
      },
      {
        label: 'Native Post Click Visits',
        value: 'native_post_click_visits',
        code: 'ncl',
        acl: 'cl',
        is_price: false,
        code_name: 'native_post_click_visits'
      },
      {
        label: 'Native Post Click Conv',
        value: 'native_post_click_conv',
        code: 'npc',
        acl: 'pc',
        is_price: false,
        code_name: 'native_post_click_conv'
      },
      {
        label: 'Native Post View Conv',
        value: 'native_post_view_conv',
        code: 'npv',
        acl: 'pv',
        is_price: false,
        code_name: 'native_post_view_conv'
      },
      {
        label: 'Native Tracking Cost',
        value: 'native_tracking_cost',
        code: 'ntp',
        acl: 'tp',
        is_price: true,
        code_name: 'native_tracking_cost'
      },
      {
        label: 'Native Cost',
        value: 'native_cost',
        code: 'nirp',
        acl: 'irp',
        is_price: true,
        code_name: 'native_cost'
      },
      {
        label: 'Native Advertiser Cost',
        value: 'native_advertiser_cost',
        code: 'nirp_final',
        acl: 'irp_client',
        is_price: true,
        code_name: 'native_advertiser_cost'
      },
      {
        label: 'Native Viewable',
        value: 'native_viewable',
        code: 'native_viewable',
        acl: 'native_viewable',
        is_price: false,
        code_name: 'native_viewable'
      },
      {
        label: 'Native Not Viewable',
        value: 'native_not_viewable',
        code: 'native_not_viewable',
        acl: 'native_not_viewable',
        is_price: false,
        code_name: 'native_not_viewable'
      },
      {
        label: 'Native View Undertermined',
        value: 'native_view_undertermined',
        code: 'native_view_undertermined',
        acl: 'native_view_undertermined',
        is_price: false,
        code_name: 'native_view_undertermined'
      },
      {
        label: 'Native Unique Viewable',
        value: 'native_unique_viewable',
        code: 'native_unique_viewable',
        acl: 'native_unique_viewable',
        is_price: false,
        code_name: 'native_unique_viewable'
      },
      {
        label: 'Native Unique Impression',
        value: 'native_unique_impressions',
        code: 'native_unique_impressions',
        acl: 'native_unique_impressions',
        is_price: false,
        code_name: 'native_unique_impressions'
      },
      {
        label: 'Native Unique Not Viewable',
        value: 'native_unique_not_viewable',
        code: 'native_unique_not_viewable',
        acl: 'native_unique_not_viewable',
        is_price: false,
        code_name: 'native_unique_not_viewable'
      },
      {
        label: 'Native Unique View Undertermined',
        value: 'native_unique_view_undertermined',
        code: 'native_unique_view_undertermined',
        acl: 'native_unique_view_undertermined',
        is_price: false,
        code_name: 'native_unique_view_undertermined'
      },
      {
        label: 'Native Unique Click',
        value: 'native_unique_click',
        code: 'native_unique_click',
        acl: 'native_unique_click',
        is_price: false,
        code_name: 'native_unique_click'
      }
    ]
  },
  {
    label: 'Video',
    options: [
      {
        label: 'Video Bids',
        value: 'video_bids',
        code: 'vbc',
        acl: 'vbc',
        is_price: false,
        code_name: 'video_bids'
      },
      {
        label: 'Video Bid Price',
        value: 'video_bid_price',
        code: 'vbsp',
        acl: 'vbsp',
        is_price: true,
        code_name: 'video_bid_price'
      },
      {
        label: 'Video Impressions',
        value: 'video_impressions',
        code: 'vic',
        acl: 'vic',
        is_price: false,
        code_name: 'video_impressions'
      },
      {
        label: 'Video Clicks',
        value: 'video_clicks',
        code: 'vcc',
        acl: 'vcc',
        is_price: false,
        code_name: 'video_clicks'
      },
      {
        label: 'Video Post Click Visits',
        value: 'video_post_click_visits',
        code: 'vcl',
        acl: 'vcl',
        is_price: false,
        code_name: 'video_post_click_visits'
      },
      {
        label: 'Video Post Click Conv',
        value: 'video_post_click_conv',
        code: 'vpc',
        acl: 'vpc',
        is_price: false,
        code_name: 'video_post_click_conv'
      },
      {
        label: 'Video Post View Conv',
        value: 'video_post_view_conv',
        code: 'vpv',
        acl: 'vpv',
        is_price: false,
        code_name: 'video_post_view_conv'
      },
      {
        label: 'Video Tracking Cost',
        value: 'video_tracking_cost',
        code: 'vtp',
        acl: 'tp',
        is_price: true,
        code_name: 'video_tracking_cost'
      },
      {
        label: 'Video Cost',
        value: 'video_cost',
        code: 'virp',
        acl: 'irp',
        is_price: true,
        code_name: 'video_cost'
      },
      {
        label: 'Video Advertiser Cost',
        value: 'video_advertiser_cost',
        code: 'virp_org',
        acl: 'irp_client',
        is_price: true,
        code_name: 'video_advertiser_cost'
      },
      {
        label: 'Video Start',
        value: 'video_start',
        code: 'virp_start',
        acl: 'irp_client',
        is_price: false,
        code_name: 'video_start'
      },
      {
        label: 'Video First Quartil',
        value: 'video_first_quartil',
        code: 'q1',
        acl: 'q1',
        is_price: false,
        code_name: 'video_first_quartil'
      },
      {
        label: 'Video Midpoint',
        value: 'video_midpoint',
        code: 'q2',
        acl: 'q2',
        is_price: false,
        code_name: 'video_midpoint'
      },
      {
        label: 'Video Third Quartil',
        value: 'video_third_quartil',
        code: 'q3',
        acl: 'q3',
        is_price: false,
        code_name: 'video_third_quartil'
      },
      {
        label: 'Video Completion',
        value: 'video_completion',
        code: 'q4',
        acl: 'q4',
        is_price: false,
        code_name: 'video_completion'
      },
      {
        label: 'Video Skip',
        value: 'video_skip',
        code: 'sk',
        acl: 'sk',
        is_price: false,
        code_name: 'video_skip'
      },
      {
        label: 'Video Mute',
        value: 'video_mute',
        code: 'vmt',
        acl: 'vmt',
        is_price: false,
        code_name: 'video_mute'
      },
      {
        label: 'Video Unmute',
        value: 'video_unmute',
        code: 'vumt',
        acl: 'vumt',
        is_price: false,
        code_name: 'video_unmute'
      },
      {
        label: 'Video Rewind',
        value: 'video_rewind',
        code: 'vrw',
        acl: 'vrw',
        is_price: false,
        code_name: 'video_rewind'
      },
      {
        label: 'Video Pause',
        value: 'video_pause',
        code: 'vps',
        acl: 'vps',
        is_price: false,
        code_name: 'video_pause'
      },
      {
        label: 'Video Resume',
        value: 'video_resume',
        code: 'vrs',
        acl: 'vrs',
        is_price: false,
        code_name: 'video_resume'
      },
      {
        label: 'Video Full screen',
        value: 'video_fullscreen',
        code: 'vfs',
        acl: 'vfs',
        is_price: false,
        code_name: 'video_fullscreen'
      },
      {
        label: 'Video Exit Full screen',
        value: 'video_exit_fullscreen',
        code: 'vefs',
        acl: 'vefs',
        is_price: false,
        code_name: 'video_exit_fullscreen'
      },
      {
        label: 'Video Close Linear',
        value: 'video_close_linear',
        code: 'vcln',
        acl: 'vcln',
        is_price: false,
        code_name: 'video_close_linear'
      },
      {
        label: 'Video Time',
        value: 'video_time',
        code: 't',
        acl: 't',
        is_price: false,
        code_name: 'video_time'
      },
      {
        label: 'Video Viewable',
        value: 'video_viewable',
        code: 'video_viewable',
        acl: 'video_viewable',
        is_price: false,
        code_name: 'video_viewable'
      },
      {
        label: 'Video Not Viewable',
        value: 'video_not_viewable',
        code: 'video_not_viewable',
        acl: 'video_not_viewable',
        is_price: false,
        code_name: 'video_not_viewable'
      },
      {
        label: 'Video View Undertermined',
        value: 'video_view_undertermined',
        code: 'video_view_undertermined',
        acl: 'video_view_undertermined',
        is_price: false,
        code_name: 'video_view_undertermined'
      },
      {
        label: 'Video Unique Viewable',
        value: 'video_unique_viewable',
        code: 'video_unique_viewable',
        acl: 'video_unique_viewable',
        is_price: false,
        code_name: 'video_unique_viewable'
      },
      {
        label: 'Video Unique Impression',
        value: 'video_unique_impressions',
        code: 'video_unique_impressions',
        acl: 'video_unique_impressions',
        is_price: false,
        code_name: 'video_unique_impressions'
      },
      {
        label: 'Video Unique Not Viewable',
        value: 'video_unique_not_viewable',
        code: 'video_unique_not_viewable',
        acl: 'video_unique_not_viewable',
        is_price: false,
        code_name: 'video_unique_not_viewable'
      },
      {
        label: 'Video Unique View Undertermined',
        value: 'video_unique_view_undertermined',
        code: 'video_unique_view_undertermined',
        acl: 'video_unique_view_undertermined',
        is_price: false,
        code_name: 'video_unique_view_undertermined'
      },
      {
        label: 'Video Unique Click',
        value: 'video_unique_click',
        code: 'video_unique_click',
        acl: 'video_unique_click',
        is_price: false,
        code_name: 'video_unique_click'
      }
    ]
  },
  {
    label: 'Post' /**===== BEGIN: POST GROUP =====*/,
    options: [
      {
        label: 'Post Click Lead',
        value: 'post_click_lead',
        code: 'pce32',
        acl: 'pce32',
        is_price: false,
        code_name: 'post_click_lead'
      },
      {
        label: 'Post View Lead',
        value: 'post_view_lead',
        code: 'pve32',
        acl: 'pve32',
        is_price: false,
        code_name: 'post_view_lead'
      },
      {
        label: 'Post Click Checkout',
        value: 'post_click_checkout',
        code: 'pce128',
        acl: 'pce128',
        is_price: false,
        code_name: 'post_click_checkout'
      },
      {
        label: 'Post View Checkout',
        value: 'post_view_checkout',
        code: 'pve128',
        acl: 'pve128',
        is_price: false,
        code_name: 'post_view_checkout'
      },
      {
        label: 'Post Click Revenue',
        value: 'post_click_revenue',
        code: 'pce128s',
        acl: 'pce128s',
        is_price: true,
        code_name: 'post_click_revenue'
      },
      {
        label: 'Post View Revenue',
        value: 'post_view_revenue',
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
        value: 'event_home',
        code: 'e1',
        acl: 'e1',
        is_price: false,
        code_name: 'event_home'
      },
      {
        label: 'Event View',
        value: 'event_view',
        code: 'e2',
        acl: 'e2',
        is_price: false,
        code_name: 'event_view'
      },
      {
        label: 'Event Category',
        value: 'event_category',
        code: 'e4',
        acl: 'e4',
        is_price: false,
        code_name: 'event_category'
      },
      {
        label: 'Event Sub Category',
        value: 'event_sub_category',
        code: 'e8',
        acl: 'e8',
        is_price: false,
        code_name: 'event_sub_category'
      },
      {
        label: 'Event Product',
        value: 'event_product',
        code: 'e16',
        acl: 'e16',
        is_price: false,
        code_name: 'event_product'
      },
      {
        label: 'Event Lead',
        value: 'event_lead',
        code: 'e32',
        acl: 'e32',
        is_price: false,
        code_name: 'event_lead'
      },
      {
        label: 'Event Basket',
        value: 'event_basket',
        code: 'e64',
        acl: 'e64',
        is_price: false,
        code_name: 'event_basket'
      },
      {
        label: 'Event Checkout',
        value: 'event_checkout',
        code: 'e128',
        acl: 'e128',
        is_price: false,
        code_name: 'event_checkout'
      },
      {
        label: 'Event Checkout Price',
        value: 'event_checkout_price',
        code: 'e128s',
        acl: 'e128s',
        is_price: true,
        code_name: 'event_checkout_price'
      }
    ]
  } /**===== END: EVENT GROUP =====*/,
  {
    label: 'Report unique',
    options: [
      {
        label: 'Report Unique Impression',
        value: 'report_unique_impressions',
        code: 'report_unique_impressions',
        acl: 'unique',
        is_price: false,
        code_name: 'report_unique_impressions'
      },
      {
        label: 'Report Unique Viewable',
        value: 'report_unique_viewable',
        code: 'report_unique_viewable',
        acl: 'unique',
        is_price: false,
        code_name: 'report_unique_viewable'
      },
      {
        label: 'Report Unique Not Viewable',
        value: 'report_unique_not_viewable',
        code: 'report_unique_not_viewable',
        acl: 'unique',
        is_price: false,
        code_name: 'report_unique_not_viewable'
      },
      {
        label: 'Report Unique View Undertermined',
        value: 'report_unique_view_undertermined',
        code: 'report_unique_view_undertermined',
        acl: 'unique',
        is_price: false,
        code_name: 'report_unique_view_undertermined'
      },
      {
        label: 'Report Unique Click',
        value: 'report_unique_click',
        code: 'report_unique_click',
        acl: 'unique',
        is_price: false,
        code_name: 'report_unique_click'
      }
    ]
  },
  {
    label: 'Unique Visitor',
    options: [
      {
        label: 'Unique Visitor Hourly',
        value: 'unique_visitor_hourly',
        code: 'uvh',
        acl: 'uvh',
        is_price: false,
        code_name: 'unique_visitor_hourly'
      },
      {
        label: 'Unique Visitor Daily',
        value: 'unique_visitor_daily',
        code: 'uvd',
        acl: 'uvd',
        is_price: false,
        code_name: 'unique_visitor_daily'
      },
      {
        label: 'Unique Visitor Monthly',
        value: 'unique_visitor_monthly',
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
        value: 'visit_time',
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
    label: 'Publisher Price',
    value: 'publisher_price',
    code: 'publisher_price',
    is_price: true,
    code_name: 'publisher_price'
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
  },
  {
    label: 'Viewable',
    value: 'viewable',
    code: 'viewable',
    acl: 'viewable',
    is_price: false,
    code_name: 'viewable'
  },
  {
    label: 'Not Viewable',
    value: 'not_viewable',
    code: 'not_viewable',
    acl: 'not_viewable',
    is_price: false,
    code_name: 'not_viewable'
  },
  {
    label: 'View Undertermined',
    value: 'view_undertermined',
    code: 'view_undertermined',
    acl: 'view_undertermined',
    is_price: false,
    code_name: 'view_undertermined'
  },
  {
    label: 'Unique Viewable',
    value: 'unique_viewable',
    code: 'unique_viewable',
    acl: 'unique_viewable',
    is_price: false,
    code_name: 'unique_viewable'
  },
  {
    label: 'Unique Impression',
    value: 'unique_impressions',
    code: 'unique_impressions',
    acl: 'unique_impressions',
    is_price: false,
    code_name: 'unique_impressions'
  },
  {
    label: 'Unique Not Viewable',
    value: 'unique_not_viewable',
    code: 'unique_not_viewable',
    acl: 'unique_not_viewable',
    is_price: false,
    code_name: 'unique_not_viewable'
  },
  {
    label: 'Unique View Undertermined',
    value: 'unique_view_undertermined',
    code: 'unique_view_undertermined',
    acl: 'unique_view_undertermined',
    is_price: false,
    code_name: 'unique_view_undertermined'
  },
  {
    label: 'Unique Click',
    value: 'unique_click',
    code: 'unique_click',
    acl: 'unique_click',
    is_price: false,
    code_name: 'unique_click'
  },
  {
    label: 'Report Unique Impression',
    value: 'report_unique_impressions',
    code: 'report_unique_impressions',
    acl: 'unique',
    is_price: false,
    code_name: 'report_unique_impressions'
  },
  {
    label: 'Report Unique Viewable',
    value: 'report_unique_viewable',
    code: 'report_unique_viewable',
    acl: 'unique',
    is_price: false,
    code_name: 'report_unique_viewable'
  },
  {
    label: 'Report Unique Not Viewable',
    value: 'report_unique_not_viewable',
    code: 'report_unique_not_viewable',
    acl: 'unique',
    is_price: false,
    code_name: 'report_unique_not_viewable'
  },
  {
    label: 'Report Unique View Undertermined',
    value: 'report_unique_view_undertermined',
    code: 'report_unique_view_undertermined',
    acl: 'unique',
    is_price: false,
    code_name: 'report_unique_view_undertermined'
  },
  {
    label: 'Report Unique Click',
    value: 'report_unique_click',
    code: 'report_unique_click',
    acl: 'unique',
    is_price: false,
    code_name: 'report_unique_click'
  }
];

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
