import _ from 'lodash';
import {VideoServeTypes, VideoTypes} from './constants';

export function videoRepoToFormValues(raw) {
  const {name, click_url = '', height, width, files, linearity, type} = raw;

  const result = {
    name,
    click_url,
    width: width?.toString() ?? '1',
    height: height?.toString() ?? '1',
    linearity: VideoTypes.find(item => item.value === linearity) || null,
    type: VideoServeTypes.find(item => item.value === type) || null
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
  const {name, click_url, width, height, linearity, type} = raw;

  let obj = {
    name,
    click_url,
    dtype: 'video',
    concept_uuid: conceptId,
    status: 'active',
    files_uuid: []
  };

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
