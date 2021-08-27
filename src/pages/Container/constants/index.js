export const IMPORT_FILE_TYPES = [
  {label: 'CRM', value: 'crm'},
  {label: 'Product', value: 'product'},
  {label: 'Log', value: 'log'},
  {label: 'Segment', value: 'segment'}
];
export const IMPORT_FILE_LOCATIONS = [
  {label: 'Local file', value: 'local'}
  // {label: 'Shared file link', value: 'link'}
];
export const WEB_TAG_STEPS = [
  {
    label: 'Pages and Inventories',
    title: 'Pages and Inventories to container'
  },
  {
    label: 'Overview',
    title: 'Review container settings and activate it'
  }
];
export const IOS_TAG_STEPS = [
  {
    label: 'Screens and Inventories',
    title: 'Screens and Inventories to container'
  },
  {
    label: 'Overview',
    title: 'Review container settings and activate it'
  }
];

export const CONTAINER_SOURCES = [
  'online-tracking',
  'ios-tracking',
  'manual-import',
  'schedule-transfer'
];

export const CONTAINER_TREE_TAGS = [
  {id: 'website_tag', name: 'Website tag', param: CONTAINER_SOURCES[0]},
  {id: 'ios_tag', name: 'iOS tag', param: CONTAINER_SOURCES[1]},
  {id: 'import_offline', name: 'Import offline', param: CONTAINER_SOURCES[2]},
  {id: 'transfer_files', name: 'Transfer', param: CONTAINER_SOURCES[3]}
];

export const EVENTS_TYPE = [
  {id: 'identify', name: 'Identify', title: 'Identify Event'},
  {id: 'page', name: 'Page', title: 'Page Event', isDisabled: false},
  {id: 'track', name: 'Track', title: 'Track Event'},
  {
    id: 'trackClick',
    name: 'Track Click',
    title: 'Track Link Event'
  },
  {id: 'trackForm', name: 'Track Form', title: 'Track From Event'}
];

export const EVENT_TYPES_VALUE = {
  alias: 'alias',
  group: 'group',
  identify: 'identify',
  page: 'page',
  track: 'track',
  trackLink: 'trackLink',
  trackForm: 'trackForm',
  trackClick: 'trackClick',
  trackSubmit: 'trackSubmit'
};

export const ALL_TRACK_EVENTS = [
  'track',
  'trackLink',
  'trackForm',
  'trackClick',
  'trackSubmit'
];

export const DEFAULT_EVENT_PROPERTIES = [
  'name',
  'path',
  'referer',
  'search',
  'title',
  'url',
  'keywords'
];

export const CONTAINER_STATUS = {
  active: 'active',
  draft: 'draft',
  delete: 'delete'
};

export const getContainerTags = () => {
  return [
    'press',
    'media',
    'e-commerce',
    'game',
    'social',
    'network',
    'education',
    'entertainment',
    'enterprise'
  ].map(item => {
    return {
      label: item,
      value: item
    };
  });
};
