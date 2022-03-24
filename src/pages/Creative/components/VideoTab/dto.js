import _ from 'lodash';

import {VideoServeTypes, VideoTypes} from './constants';

export function videoRepoToFormValues(raw) {
  const {
    name,
    click_url = '',
    height,
    width,
    files,
    video_type,
    serve_type
  } = raw;

  const result = {
    name,
    click_url,
    width: width?.toString() ?? '1',
    height: height?.toString() ?? '1',
    video_type: VideoTypes.find(item => item.value === video_type) || null,
    serve_type: VideoServeTypes.find(item => item.value === serve_type) || null
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
  const {name, click_url, width, height, video_type, serve_type} = raw;

  let obj = {
    name,
    click_url,
    dtype: 'video',
    concept_uuid: conceptId,
    status: 'active',
    files_uuid: []
  };

  if (video_type?.value) {
    obj.video_type = video_type.value;
  }
  if (serve_type?.value) {
    obj.serve_type = serve_type.value;
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
