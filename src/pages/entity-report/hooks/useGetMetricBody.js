import {DEFAULT_TIMEZONE} from 'constants/misc';
import {ReportTypes, REPORT_INPUT_NAME, TimeUnits} from 'constants/report';
import {useFormContext} from 'react-hook-form';
import {convertLocalDateToTimezone} from 'utils/helpers/dateTime.helpers';
import {TimezoneMapping} from 'utils/helpers/getListTimezone';
import {isValidTimePeriod} from '../utils';
import {useIsChartCompareInForm} from './useIsChartCompare';

// Input names
const reportByName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY}`;
const reportByUuidName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY_UUID}`;
const timeRangeName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.TIME_RANGE}`;
const timeUnitName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`;
const startTimeName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.START_TIME}`;
const endTimeName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.END_TIME}`;
const timeZoneName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.TIMEZONE}`;

export const useGetMetricBody = ({sourceUuid = ''}) => {
  const {watch} = useFormContext();
  const isCompareChart = useIsChartCompareInForm();
  let enableCallMetric = false;
  const watchFields = watch([
    REPORT_INPUT_NAME.REPORT_SOURCE,
    REPORT_INPUT_NAME.REPORT_TYPE,
    reportByName,
    reportByUuidName,
    timeRangeName,
    timeUnitName,
    endTimeName,
    startTimeName,
    timeZoneName
  ]);
  const reportSource = watchFields?.report_source?.value || '';
  const reportType = watchFields?.report_type?.value || '';
  const reportBy = watchFields?.[reportByName]?.value || '';
  const timeRange = watchFields?.[timeRangeName] || '';
  const timeUnit = watchFields?.[timeUnitName] || '';
  let startTime = watchFields?.[startTimeName] || null;
  let endTime = watchFields?.[endTimeName] || null;
  let reportByUuid = watchFields?.[reportByUuidName]?.value || '';
  let timeZone = parseInt(watchFields?.[timeZoneName]?.value);
  console.log("🚀 ~ file: useGetMetricBody.js ~ line 42 ~ useGetMetricBody ~ timeZone", timeZone)
  if (!isValidTimeZone(timeZone)) {
    timeZone = DEFAULT_TIMEZONE;
  }
  const timeZoneValue = TimezoneMapping[timeZone];

  if (reportSource === reportBy) {
    reportByUuid = sourceUuid;
  }

  let metricBody = {
    source_uuid: sourceUuid,
    report_source: reportSource,
    report_type: reportType,
    report_by: reportBy,
    report_by_uuid: reportByUuid,
    time_unit: timeUnit,
    time_zone: timeZoneValue
  };

  const firstPointEnable =
    reportSource && reportType && reportBy && timeRange && timeUnit && isValidTimeZone(timeZone)
      ? true
      : false;
  console.log('===== Global', firstPointEnable, isCompareChart, timeUnit);
  if (firstPointEnable) {
    if (isCompareChart) {
      if (timeUnit === TimeUnits.GLOBAL) {
        console.log('===== ');
        enableCallMetric = true;
      }
    } else {
      if (timeUnit !== TimeUnits.GLOBAL) {
        enableCallMetric = true;
      }
      if (reportBy === 'source' && reportByUuid) {
        enableCallMetric = true;
      }
    }
  }

  // Distribution report
  if (reportType === ReportTypes.DISTRIBUTION) {
    console.log('==== distribution');
    const isValidTime = isValidTimePeriod({startTime, endTime});

    if (isValidTime) {
      startTime = convertLocalDateToTimezone({
        localDate: startTime,
        timeZoneOffset: timeZone,
        isEndDate: false
      });
      endTime = convertLocalDateToTimezone({
        localDate: endTime,
        timeZoneOffset: timeZone,
        isEndDate: true
      });
      metricBody = {
        ...metricBody,
        start_time: startTime,
        end_time: endTime
      };
      enableCallMetric = true;
    } else {
      enableCallMetric = false;
    }
  } else {
    // Trending report
    metricBody = {
      ...metricBody,
      time_range: timeRange
    };
  }
  console.log('enableCallMetric === 2', enableCallMetric);
  return {
    metricBody,
    enableCallMetric
  };
};


const isValidTimeZone = (timeZone) => {
  if (timeZone === null || timeZone === undefined || timeZone === '') {
    return false
  }

  return true;
}
