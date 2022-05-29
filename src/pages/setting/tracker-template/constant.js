export const InputNames = {
  NAME: 'name',
  CODE: 'code',
  CLICK_URL: 'click_url',
  VARIABLES: 'variables',
  HTTPS: 'https',
  PRICE: 'price',
  TYPE: 'type',
  SKIP: 'skip_url',
  FIRST_QUARTILE: 'first_quartile_url',
  MIDPOINT: 'midpoint_url',
  THIRD_QUARTILE: 'third_quartile_url',
  COMPLETE: 'complete_url',
  CLICK_IMAGE: 'click_image',
  CLICK_SCRIPT: 'click_script',
  CLICK_URL_APPEND_PARAMS: 'append_parameters',
  STATUS: 'status',
  IMPRESSION_SCRIPT: 'impression_script',
  IMPRESSION_IMAGE: 'impression_image',
  IMPRESSION_URL: 'impression_url',
  START_URL: 'start_url',
  MUTE_URL: 'mute_url',
  UNMUTE_URL: 'unmute_url',
  PAUSE_URL: 'pause_url',
  RESUME_URL: 'resume_url',
  REWIND_URL: 'rewind_url',
  FULLSCREEN_URL: 'fullscreen_url',
  EXIT_FULLSCREEN_URL: 'exit_fullscreen_url'
};

export const TrackerTemplateTypes = {
  DEFAULT: 'default',
  VAST_WRAPPER: 'vastWrapper'
};

export const TrackerTemplateTypeOptions = [
  {value: TrackerTemplateTypes.DEFAULT, label: 'Default'},
  {value: TrackerTemplateTypes.VAST_WRAPPER, label: 'Vast Wrapper'}
];
