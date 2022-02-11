import {CappingTypes} from 'constants/misc';

export const formToApi = ({formData, type}) => {
  const {status} = formData;
  if (
    [
      CappingTypes.BUDGET.value,
      CappingTypes.BUDGET_MANAGER.value,
      CappingTypes.IMPRESSION.value
    ].includes(type)
  ) {
    return {
      target: parseFloat(formData?.target) || 0,
      status
    };
  }

  if (type === CappingTypes.DOMAIN.value) {
    return {
      domain_group_white_list_uuid:
        Array.from(
          formData?.domain_group_white_list_uuid,
          item => item.value
        ) || [],
      domain_group_black_list_uuid:
        Array.from(
          formData?.domain_group_black_list_uuid,
          item => item.value
        ) || [],
      status
    };
  }

  if (type === CappingTypes.KEYWORD.value) {
    return {
      keywords_list_white_uuid:
        Array.from(formData?.keywords_list_white_uuid, item => item.value) ||
        [],
      keywords_list_black_uuid:
        Array.from(formData?.keywords_list_black_uuid, item => item.value) ||
        [],
      status
    };
  }
};

export const getExistedType = cappings => {
  return cappings.reduce((acc, capping) => {
    if (!acc.includes(capping?.type)) {
      acc.push(capping.type);
    }
    return acc;
  }, []);
};
