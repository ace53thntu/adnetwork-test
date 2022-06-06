import _ from 'lodash';

import {PLATFORM_OPTIONS, THIRD_PARTY_TAG_TYPES} from '../BannerForm/constants';
import {makeValueForAdSizeFormat} from '../BannerForm/dto';
import {checkValidJson} from '../BannerForm/utils';
import {VideoServeTypes, VideoTypes} from './constants';
import {VAST} from './hooks';

export function videoRepoToFormValues(raw) {
  const {
    name,
    click_url = '',
    height,
    width,
    files,
    linearity,
    type,
    video_metadata,
    third_party_tag_type,
    third_party_tag,
    platform,
    ad_size_format,
    tags
  } = raw;

  const linear = VideoTypes.find(item => item.value === linearity) || null;
  const isLinear = linear?.value === VideoTypes[0].value;

  const thirdParty = isLinear
    ? VAST[0]
    : THIRD_PARTY_TAG_TYPES.find(type => type.value === third_party_tag_type);

  const result = {
    name,
    click_url,
    width: width?.toString() ?? '1',
    height: height?.toString() ?? '1',
    linearity: linear,
    type: VideoServeTypes.find(item => item.value === type) || null,
    third_party_tag,
    third_party_tag_type: thirdParty,
    tags: tags?.length ? tags : [],
    ad_size_format:
      ad_size_format === 'dropdown'
        ? makeValueForAdSizeFormat(ad_size_format, width, height)
        : null,
    platform: PLATFORM_OPTIONS.find(pfOpt => pfOpt.value === platform),
    video_metadata: checkValidJson(JSON.stringify(video_metadata))
      ? JSON.stringify(video_metadata)
      : ''
  };

  if (files?.length) {
    result.files = files?.map(file => ({
      file: {
        ...file
      }
    }));
  }

  return result;
}

export function videoFormValuesToRepo(
  raw,
  conceptId,
  requestFiles = [],
  isUpdate = false
) {
  const {
    name,
    click_url,
    width,
    height,
    linearity,
    type,
    video_metadata,
    third_party_tag_type,
    third_party_tag,
    platform,
    ad_size_format,
    tags
  } = raw;

  let obj = {
    name,
    click_url,
    dtype: 'video',
    concept_uuid: conceptId,
    status: 'active',
    files_uuid: [],
    tags,
    third_party_tag,
    third_party_tag_type: third_party_tag_type?.value,
    platform: platform?.value
  };

  if (ad_size_format !== undefined) {
    obj = {
      ...obj,
      ad_size_format: ad_size_format ? 'dropdown' : 'custom'
    };
  }

  if (video_metadata !== undefined) {
    obj = {
      ...obj,
      video_metadata: checkValidJson(video_metadata)
        ? JSON.parse(video_metadata)
        : {}
    };
  }

  if (linearity?.value) {
    obj.linearity = linearity.value;
  }
  if (type?.value) {
    obj.type = type.value;
  }

  if (width && _.isNumber(parseInt(width, 10))) {
    obj.width = parseInt(width, 10);
  }

  if (height && _.isNumber(parseInt(height, 10))) {
    obj.height = parseInt(height, 10);
  }

  if (requestFiles?.length) {
    obj.files_uuid = requestFiles;
  }

  if (isUpdate) {
    const updateObj = _.omit(obj, ['dtype', 'concept_uuid', 'status']);
    const omitObj = {};
    Object.keys(updateObj).forEach(key => {
      if (updateObj[key] === undefined) {
        //
      } else {
        omitObj[key] = updateObj[key];
      }
    });

    return omitObj;
  }

  return obj;
}
