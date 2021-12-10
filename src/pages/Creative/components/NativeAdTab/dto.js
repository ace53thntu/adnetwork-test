import {ASSET_TYPES, ASSET_TYPES_IS_FILE} from './constants';

export function nativeAdRawToFormValues(raw) {
  const {
    name,
    click_url = '',
    product_query_string = '',
    extra_trackers = '',
    // active = false,
    dco_product = '',
    assets = []
  } = raw;

  return {
    name,
    click_url,
    product_query_string,
    extra_trackers,
    // active,
    dco_product,
    assets: assets?.map(({custom_id, file, type, value, uuid}) => ({
      custom_id,
      file,
      value,
      type: ASSET_TYPES.find(item => item.value === type),
      uuid
    }))
  };
}

export function nativeAdFormValuesToRepo(raw, conceptId) {
  const {
    name,
    // active = true,
    click_url = '',
    dco_product = '',
    extra_trackers = '',
    product_query_string = ''
  } = raw;

  const results = {
    name,
    click_url,
    dco_product,
    extra_trackers,
    product_query_string,
    status: 'active'
    // catalog_id: null
  };

  if (conceptId) {
    results.dtype = 'nativead';
    results.concept_uuid = conceptId;
  }

  return results;
}

export function assetFormValuesToRepo(raw, nativeAdId) {
  const {custom_id, value, type, file} = raw;

  let obj = {
    custom_id: parseInt(custom_id, 10),
    native_ads_uuid: nativeAdId,
    type: type.id,
    status: 'active'
  };

  if (ASSET_TYPES_IS_FILE.includes(type.id)) {
    //
    obj = {
      ...obj,
      file_uuid: file.uuid
    };
  } else {
    obj = {
      ...obj,
      value
    };
  }

  return obj;
}
