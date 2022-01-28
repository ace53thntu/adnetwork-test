import {Statuses} from 'constants/misc';
import {
  TrackerTemplateTypeOptions,
  TrackerTemplateTypes
} from 'pages/setting/tracker-template/constant';

export const TRACKER_TEMPLATE_ENTITY = {
  id: '',
  uuid: '',
  name: '',
  status: Statuses.ACTIVE,
  type: TrackerTemplateTypeOptions.find(
    item => item.value === TrackerTemplateTypes.DEFAULT
  ),
  code: '',
  click_url: '',
  click_image: '',
  click_script: '',
  variables: '',
  https: false,
  skip: '',
  first_quartile: '',
  midpoint: '',
  third_quartile: '',
  complete: '',
  click_url_append_params: '',
  price: ''
};

export const apiToForm = ({trackerTemplate = null}) => {
  if (trackerTemplate) {
    const {
      uuid: id,
      name,
      status = Statuses.ACTIVE,
      type,
      code,
      click_url,
      click_image,
      click_script,
      variables,
      https,
      skip,
      first_quartile,
      midpoint,
      third_quartile,
      complete,
      click_url_append_params,
      price
    } = trackerTemplate;

    const variablesConverted = variables ? JSON.stringify(variables) : '';
    const typeDestructured = type
      ? TrackerTemplateTypeOptions.find(typeItem => typeItem?.value === type)
      : null;

    return {
      uuid: id,
      id,
      name,
      status,
      type: typeDestructured,
      code,
      click_url,
      click_image,
      click_script,
      variables: variablesConverted,
      https: https ? 'active' : 'inactive',
      skip,
      first_quartile,
      midpoint,
      third_quartile,
      complete,
      click_url_append_params,
      price
    };
  }

  return TRACKER_TEMPLATE_ENTITY;
};

export const formToApi = ({formData = {}}) => {
  if (formData) {
    const {
      name,
      status = Statuses.ACTIVE,
      type,
      code,
      click_url,
      click_image,
      click_script,
      variables,
      https,
      skip,
      first_quartile,
      midpoint,
      third_quartile,
      complete,
      click_url_append_params,
      price
    } = formData;

    return {
      name,
      status,
      type: type?.value || TrackerTemplateTypes.DEFAULT,
      code,
      click_url,
      click_image,
      click_script,
      variables,
      https: https === 'active' ? true : false,
      skip,
      first_quartile,
      midpoint,
      third_quartile,
      complete,
      click_url_append_params,
      price: parseFloat(price) || 0
    };
  }

  return TRACKER_TEMPLATE_ENTITY;
};
