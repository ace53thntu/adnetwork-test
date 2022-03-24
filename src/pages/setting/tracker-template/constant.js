export const InputNames = {
  NAME: 'name',
  CODE: 'code',
  CLICK_URL: 'click_url',
  VARIABLES: 'variables',
  HTTPS: 'https',
  PRICE: 'price',
  TYPE: 'type',
  SKIP: 'skip',
  FIRST_QUARTILE: 'first_quartile',
  MIDPOINT: 'midpoint',
  THIRD_QUARTILE: 'third_quartile',
  COMPLETE: 'complete',
  CLICK_IMAGE: 'click_image',
  CLICK_SCRIPT: 'click_script',
  CLICK_URL_APPEND_PARAMS: 'click_url_append_params',
  STATUS: 'status'
};

export const TrackerTemplateTypes = {
  DEFAULT: 'default',
  VAST_WRAPPER: 'vastWrapper'
};

export const TrackerTemplateTypeOptions = [
  {value: TrackerTemplateTypes.DEFAULT, label: 'Default'},
  {value: TrackerTemplateTypes.VAST_WRAPPER, label: 'Vast Wrapper'}
];
