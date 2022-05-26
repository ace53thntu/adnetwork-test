import {Statuses} from 'constants/misc';
import {checkValidJson} from 'pages/Creative/components/BannerForm/utils';
import {
  TrackerTemplateTypeOptions,
  TrackerTemplateTypes
} from 'pages/setting/tracker-template/constant';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

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

    const variablesConverted =
      variables &&
      typeof variables === 'object' &&
      Object.keys(variables)?.length
        ? JSON.stringify(variables, null, 2)
        : '';
    const typeDestructured = type
      ? TrackerTemplateTypeOptions.find(typeItem => typeItem?.value === type)
      : null;

    const priceConverted = HandleCurrencyFields.convertApiToGui({value: price});

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
      price: priceConverted
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

    const priceConverted = HandleCurrencyFields.convertGuiToApi({value: price});
    let parseVariables = checkValidJson(variables) ? JSON.parse(variables) : {};

    return {
      name,
      status,
      type: type?.value || TrackerTemplateTypes.DEFAULT,
      code,
      click_url,
      click_image,
      click_script,
      variables: parseVariables,
      https: https === 'active' ? true : false,
      skip,
      first_quartile,
      midpoint,
      third_quartile,
      complete,
      click_url_append_params,
      price: priceConverted
    };
  }

  return TRACKER_TEMPLATE_ENTITY;
};
