export function videoRepoToFormValues(raw) {
  const {name, click_url = '', height, width, file} = raw;

  const result = {
    name,
    click_url,
    width: width?.toString() ?? '1',
    height: height?.toString() ?? '1'
  };

  if (file?.length) {
    result.files = file?.map(file => ({
      file: {
        ...file
      }
    }));
  }

  return result;
}

export function videoFormValuesToRepo(raw, conceptId, requestFiles = []) {
  const {name, click_url, width, height} = raw;

  let obj = {
    name,
    click_url,
    width: parseInt(width, 10),
    height: parseInt(height, 10),
    dtype: 'video',
    concept_uuid: conceptId,
    status: 'active',
    file_uuids: []
  };

  if (requestFiles?.length) {
    obj.file_uuids = [...obj.file_uuids, ...requestFiles];
  }

  return obj;
}
