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
    name,
    concept_uuid: conceptId,
    height: __isNumber(parseInt(height, 10)) ? parseInt(height, 10) : 0,
    width: __isNumber(parseInt(width, 10)) ? parseInt(width, 10) : 0,
    tags,
    sound,
    multi_product: multiproduct,
    extra_trackers,
    creative_type: creative_type?.value,
    click_url,
    invocation_tag,
    invocation_tag_type: invocation_tag_type?.value,
    file_type: file_type?.value,
    https,
    status: 'active'
  };
}

export function creativeRepoToModel(raw) {
  const {
    invocation_tag,
    invocation_tag_type,
    extra_trackers,
    creative_type,
    tags = [],
    click_url = '',
    https,
    sound,
    multi_product,
    name,
    file_type,
    width = '0',
    height = '0',
    alternatives = []
  } = raw;

  return {
    name,
    invocation_tag,
    invocation_tag_type: INVOCATION_TAG_TYPES.find(
      type => type.value === invocation_tag_type
    ),
    extra_trackers,
    creative_type: CREATIVE_TYPES.find(type => type.value === creative_type),
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
    })
  };
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
    description
    // only_catalog_products,
    // product_query_string,
    // products,
    // extra_config
  } = raw;

  return {
    name,
    sound,
    description,
    status: 'active',
    creative_uuid: creativeId,
    file_uuid: file?.uuid,
    priority: parseInt(priority),
    type: getTypeOfAlt(file)
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
    file
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
    file
  };
}
