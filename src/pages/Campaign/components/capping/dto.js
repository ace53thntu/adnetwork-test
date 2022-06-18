import {
  BudgetTimeFrames,
  CappingReferenceTypes,
  CappingTypes,
  Statuses
} from 'constants/misc';
import {isArray} from 'lodash';
import moment from 'moment';
import {convertGuiToApi} from 'utils/handleCurrencyFields';
import {getTimeZoneOffset} from 'utils/metrics';

export const formToApi = ({formData, type}) => {
  const status = formData?.status || Statuses.ACTIVE;

  if (
    [CappingTypes.BUDGET.value, CappingTypes.BUDGET_MANAGER.value].includes(
      type
    )
  ) {
    return {
      target:
        formData?.target === 0 ? 0 : convertGuiToApi({value: formData?.target}), //parseFloat(formData?.target) || 0,
      status
    };
  }

  if (
    [
      CappingTypes.IMPRESSION.value,
      CappingTypes.USER.value,
      CappingTypes.USER_CLICK.value,
      CappingTypes.USER_VIEWABLE.value,
      CappingTypes.VIEWABLE.value,
      CappingTypes.CLICK.value
    ].includes(type)
  ) {
    return {
      target: formData?.target === 0 ? 0 : parseInt(formData?.target), //parseFloat(formData?.target) || 0,
      status
    };
  }

  if (type === CappingTypes.DOMAIN.value) {
    return {
      domain_group_white_list_uuid: isArray(
        formData?.domain_group_white_list_uuid
      )
        ? Array.from(formData?.domain_group_white_list_uuid, item => item.value)
        : [],
      domain_group_black_list_uuid: isArray(
        formData?.domain_group_black_list_uuid
      )
        ? Array.from(formData?.domain_group_black_list_uuid, item => item.value)
        : [],
      status
    };
  }

  if (type === CappingTypes.KEYWORD.value) {
    return {
      keywords_list_white_uuid: isArray(formData?.keywords_list_white_uuid)
        ? Array.from(formData?.keywords_list_white_uuid, item => item.value)
        : [],
      keywords_list_black_uuid: isArray(formData?.keywords_list_black_uuid)
        ? Array.from(formData?.keywords_list_black_uuid, item => item.value)
        : [],
      status
    };
  }

  if (type === CappingTypes.SCHEDULE.value) {
    const scheduleStartHour = moment(formData?.start_time).hours();
    const scheduleStartMinute = moment(formData?.start_time).minutes();
    const scheduleEndHour = moment(formData?.end_time).hours();
    const scheduleEndMinute = moment(formData?.end_time).minutes();
    return {
      schedule: {
        week_days: isArray(formData?.week_days)
          ? Array.from(formData?.week_days, item => item.value)
          : [],
        start_hour: parseInt(scheduleStartHour, 10),
        start_minute: parseInt(scheduleStartMinute, 10),
        end_hour: parseInt(scheduleEndHour, 10),
        end_minute: parseInt(scheduleEndMinute, 10),
        time_zone: `${getTimeZoneOffset()}`
      },
      status
    };
  }
};

export const getExistedType = cappings => {
  return cappings.reduce((acc, capping) => {
    if (!acc.includes(capping?.type)) {
      acc.push({
        type: capping.type,
        sub_type:
          capping.time_frame === BudgetTimeFrames.DAILY ? 'daily' : 'global'
      });
    }
    return acc;
  }, []);
};

export const initializingDefaultValues = ({
  cappingType,
  referenceType = ''
}) => {
  if (
    [CappingTypes.BUDGET.value, CappingTypes.IMPRESSION.value].includes(
      cappingType?.type
    )
  ) {
    return {
      target: '',
      status: 'active'
    };
  }

  if (CappingTypes.DOMAIN.value === cappingType.type) {
    return {
      domain_group_white_list_uuid: [],
      domain_group_black_list_uuid: [],
      status: 'active'
    };
  }

  if (CappingTypes.KEYWORD.value === cappingType.type) {
    return {
      keywords_list_white_uuid: [],
      keywords_list_black_uuid: [],
      status: 'active'
    };
  }

  if (
    CappingTypes.SCHEDULE.value === cappingType.type &&
    referenceType === CappingReferenceTypes.STRATEGY
  ) {
    return {
      schedule: {
        week_days: [],
        start_time: null,
        end_time: null,
        time_zone: '+7'
      },
      status: 'active'
    };
  }
};

export const renderCappingTypeColor = type => {
  switch (type) {
    case CappingTypes.BUDGET?.value:
      return 'primary';
    case CappingTypes.IMPRESSION?.value:
      return 'success';
    case CappingTypes.DOMAIN?.value:
      return 'warning';
    case CappingTypes.KEYWORD?.value:
      return 'info';
    case CappingTypes.SCHEDULE?.value:
      return 'light';
    case CappingTypes.USER?.value:
      return 'danger';
    default:
      return 'secondary';
  }
};

export const getListByType = ({cappings, type}) => {
  return cappings?.filter(item => item.type === type);
};

export const disabledExistedType = ({existedTypes, currentType}) => {
  const type = currentType?.type;
  const typeFound = existedTypes.filter(
    existedType => existedType.type === type
  );

  switch (type) {
    case CappingTypes.CLICK.value:
    case CappingTypes.VIEWABLE.value:
    case CappingTypes.USER.value:
    case CappingTypes.USER_CLICK.value:
    case CappingTypes.USER_VIEWABLE.value: {
      return typeFound?.length === 2;
    }

    case CappingTypes.GENERAL.value:
    case CappingTypes.VIDEO.value:
    case CappingTypes.CONTEXT.value:
    case CappingTypes.KEYWORD.value:
    case CappingTypes.DOMAIN.value:
    case CappingTypes.SCHEDULE.value: {
      return typeFound?.length > 0;
    }

    default: {
      return false;
    }
  }
};
