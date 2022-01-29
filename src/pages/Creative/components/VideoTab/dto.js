import _ from 'lodash';

export function videoRepoToFormValues(raw) {
  const {name, click_url = '', height, width, files} = raw;

  const result = {
    name,
    click_url,
    width: width?.toString() ?? '1',
    height: height?.toString() ?? '1'
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
  const {name, click_url, width, height} = raw;

  let obj = {
    name,
    click_url,
    dtype: 'video',
    concept_uuid: conceptId,
    status: 'active',
    file_uuids: []
  };

  if (width && _.isNumber(parseInt(width, 10))) {
    obj.width = parseInt(width, 10);
  }

  if (height && _.isNumber(parseInt(height, 10))) {
    obj.height = parseInt(height, 10);
  }

  if (requestFiles?.length) {
    obj.file_uuids = [...obj.file_uuids, ...requestFiles];
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
