import {BudgetTimeFrames, CappingTypes} from 'constants/misc';
import moment from 'moment';
import {getTimeZoneOffset} from 'utils/metrics';

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

  if (type === CappingTypes.SCHEDULE.value) {
    const scheduleStartHour = moment(formData?.start_time).hours();
    const scheduleStartMinute = moment(formData?.start_time).minutes();
    const scheduleEndHour = moment(formData?.end_time).hours();
    const scheduleEndMinute = moment(formData?.end_time).minutes();
    return {
      week_days: Array.from(formData?.week_days, item => item.value) || [],
      start_hour: parseInt(scheduleStartHour, 10),
      start_minute: parseInt(scheduleStartMinute, 10),
      end_hour: parseInt(scheduleEndHour, 10),
      end_minute: parseInt(scheduleEndMinute, 10),
      time_zone: `${getTimeZoneOffset()}`,
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
