import {Statuses} from 'constants/misc';
import {checkValidJson} from 'pages/Creative/components/BannerForm/utils';
import {
  InputNames,
  TrackerTemplateTypeOptions,
  TrackerTemplateTypes
} from 'pages/setting/tracker-template/constant';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

export const initializeTrackerTemplate = () => {
  return Object.values(InputNames).reduce((acc, keyValue) => {
    if (keyValue === 'status') {
      acc = {...acc, [keyValue]: Statuses.ACTIVE};
    } else if (keyValue === 'type') {
      acc = {
        ...acc,
        [keyValue]: TrackerTemplateTypeOptions.find(
          item => item.value === TrackerTemplateTypes.DEFAULT
        )
      };
    } else {
      acc = {...acc, [keyValue]: ''};
    }

    return acc;
  }, {});
};

export const apiToForm = ({trackerTemplate = null}) => {
  if (trackerTemplate) {
    const {uuid: id, type, variables, https, price} = trackerTemplate;

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
      ...trackerTemplate,
      uuid: id,
      id,
      type: typeDestructured,
      variables: variablesConverted,
      https: https ? 'active' : 'inactive',
      price: priceConverted
    };
  }

  return initializeTrackerTemplate();
};

export const formToApi = ({formData = {}}) => {
  if (formData) {
    const {type, variables, https, price} = formData;

    const priceConverted = HandleCurrencyFields.convertGuiToApi({value: price});
    let parseVariables = checkValidJson(variables) ? JSON.parse(variables) : {};

    return {
      ...formData,
      type: type?.value || TrackerTemplateTypes.DEFAULT,
      variables: parseVariables,
      https: https === 'active' ? true : false,
      price: priceConverted
    };
  }

  return initializeTrackerTemplate();
};
