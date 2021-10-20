import __isNumber from 'lodash/isNumber';

import {
  CREATIVE_FILE_TYPES,
  CREATIVE_TYPES,
  INVOCATION_TAG_TYPES
} from './constants';

export function creativeModelToRepo(raw, conceptId) {
  const {
    invocation_tag = '',
    invocation_tag_type = INVOCATION_TAG_TYPES[0],
    extra_trackers = '',
    creative_type = CREATIVE_TYPES[0],
    tags = [],
    click_url = '',
    https = false,
    sound = false,
    multiproduct = false,
    name = '',
    width = '0',
    height = '0',
    file_type = CREATIVE_FILE_TYPES[0]
  } = raw;

  return {
    concept_uuid: conceptId,
    creative_type: creative_type?.value,
    invocation_tag_type: invocation_tag_type?.value,
    invocation_tag,
    extra_trackers,
    tags,
    click_url,
    https,
    sound,
    multiproduct,
    name,
    width: __isNumber(parseInt(width, 10)) ? parseInt(width, 10) : 0,
    height: __isNumber(parseInt(height, 10)) ? parseInt(height, 10) : 0,
    file_type: file_type?.value
  };
}
