import __isNumber from 'lodash/isNumber';

import {
  ALTERNATIVE_FILE_TYPES,
  ALTERNATIVE_PLAY_TYPES
} from '../Alternatives/constants';
import {
  AD_SIZE_FORMAT_OPTIONS,
  ALTERNATIVE_PLAY_OPTIONS,
  CREATIVE_FILE_TYPES,
  CREATIVE_TYPES,
  PLATFORM_OPTIONS,
  THIRD_PARTY_TAG_TYPES
} from './constants';
import {checkValidJson} from './utils';

export function creativeModelToRepo(raw, conceptId) {
  const {
    third_party_tag = '',
    third_party_tag_type = THIRD_PARTY_TAG_TYPES[0],
    // extra_trackers = '',
    type = CREATIVE_TYPES[0],
    tags = [],
    click_url = '',
    https = false,
    sound = false,
    multiproduct = false,
    name = '',
    width = '0',
    height = '0',
    file_type = CREATIVE_FILE_TYPES[0],
    ad_size_format,
    alternative_play,
    platform,
    creative_metadata
  } = raw;

  return {
    name,
    concept_uuid: conceptId,
    height: __isNumber(parseInt(height, 10)) ? parseInt(height, 10) : 0,
    width: __isNumber(parseInt(width, 10)) ? parseInt(width, 10) : 0,
    tags,
    sound,
    multi_product: multiproduct,
    // extra_trackers,
    type: type?.value,
    click_url,
    third_party_tag,
    third_party_tag_type: third_party_tag_type?.value,
    file_type: file_type?.value,
    https,
    status: 'active',
    ad_size_format: ad_size_format ? 'dropdown' : 'custom',
    alternative_play: alternative_play?.value,
    platform: platform?.value,
    creative_metadata: checkValidJson(creative_metadata)
      ? JSON.parse(creative_metadata)
      : {}
  };
}

export function creativeRepoToModel(raw) {
  const {
    third_party_tag,
    third_party_tag_type,
    // extra_trackers,
    type,
    tags = [],
    click_url = '',
    https,
    sound,
    multi_product,
    name,
    file_type,
    width = '0',
    height = '0',
    alternatives = [],
    ad_size_format,
    alternative_play,
    platform,
    creative_metadata
  } = raw;

  return {
    name,
    third_party_tag,
    third_party_tag_type: THIRD_PARTY_TAG_TYPES.find(
      type => type.value === third_party_tag_type
    ),
    // extra_trackers,
    type: CREATIVE_TYPES.find(cType => cType.value === type),
    tags: tags?.length ? tags : [],
    click_url,
    https,
    sound,
    multiproduct: multi_product,
    file_type: file_type
      ? CREATIVE_FILE_TYPES.find(type => type.value === file_type)
      : CREATIVE_FILE_TYPES[0],
    width: width?.toString() ?? '0',
    height: height?.toString() ?? '0',
    alternatives: alternatives?.map(item => {
      return {
        ...alternativeRepoToModel(item),
        rawId: item?.uuid ?? null
      };
    }),
    ad_size_format:
      ad_size_format === 'dropdown'
        ? makeValueForAdSizeFormat(ad_size_format, width, height)
        : null,
    platform: PLATFORM_OPTIONS.find(pfOpt => pfOpt.value === platform),
    alternative_play: ALTERNATIVE_PLAY_OPTIONS.find(
      altPlayOpt => altPlayOpt.value === alternative_play
    ),
    creative_metadata: checkValidJson(creative_metadata)
      ? JSON.stringify(creative_metadata)
      : ''
  };
}

export function makeValueForAdSizeFormat(adSize, width, height) {
  const widthStr = width?.toString() ?? '0';
  const heightStr = height?.toString() ?? '0';
  const value = `${widthStr}x${heightStr}`;

  const options = AD_SIZE_FORMAT_OPTIONS.reduce((prev, current) => {
    return [...prev, ...current.options];
  }, []);
  const found = options.find(opt => opt.value === value);
  return found || null;
}

function getTypeOfAlt(file) {
  const fileType = file?.mime_type;
  const htmlType = ['application/xhtml+xml', 'text/html'];
  const imgType = ['image/png', 'image/jpeg', 'image/gif'];

  const isHtml = htmlType.includes(fileType);
  const isImg = imgType.includes(fileType);

  return isHtml ? 'html' : isImg ? 'image' : 'common';
}

export function alternativeFormValuesToRepo(raw, creativeId) {
  const {
    priority,
    // min_products,
    // max_products,
    // product_width,
    // product_height,
    // catalog_id,
    name,
    sound,
    file,
    description,
    // only_catalog_products,
    // product_query_string,
    // products,
    // extra_config,
    file_type,
    play_type
  } = raw;

  return {
    name,
    sound,
    description,
    status: 'active',
    creative_uuid: creativeId,
    file_uuid: file?.uuid,
    priority: parseInt(priority),
    type: getTypeOfAlt(file),
    file_type: file_type.value,
    play_type: play_type.value
    // catalog_id: parseInt(catalog_id),
    // only_catalog_products,
    // min_products: parseInt(min_products),
    // max_products: parseInt(max_products),
    // product_query_string,
    // product_width: parseInt(product_width),
    // product_height: parseInt(product_height),
    // products,
    // extra_config,
  };
}

export function alternativeRepoToModel(raw) {
  const {
    name,
    sound = false,
    description = '',
    // catalog_id = '0',
    // extra_config = '',
    // max_products = '0',
    // min_products = '0',
    // only_catalog_products = false,
    priority = '0',
    // product_height = '0',
    // product_query_string = '',
    // product_width = '0',
    // products = '',
    file,
    file_type,
    play_type
    // file_uuid
  } = raw;

  return {
    name,
    sound,
    description,
    // catalog_id: catalog_id.toString(),
    // extra_config,
    // max_products: max_products?.toString(),
    // min_products: min_products?.toString(),
    // only_catalog_products,
    priority: priority.toString(),
    // product_height: product_height.toString(),
    // product_query_string,
    // product_width: product_width.toString(),
    // products,
    file,
    file_type:
      ALTERNATIVE_FILE_TYPES.find(type => type.value === file_type) ?? null,
    play_type:
      ALTERNATIVE_PLAY_TYPES.find(playType => playType.value === play_type) ??
      null
  };
}
