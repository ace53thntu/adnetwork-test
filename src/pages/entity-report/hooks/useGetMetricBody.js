import {ReportTypes, REPORT_INPUT_NAME, TimeUnits} from 'constants/report';
import moment from 'moment';
import {useFormContext} from 'react-hook-form';
import {useIsChartCompareInForm} from './useIsChartCompare';

// Input names
const reportByName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY}`;
const reportByUuidName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY_UUID}`;
const timeRangeName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.TIME_RANGE}`;
const timeUnitName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`;
const startTimeName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.START_TIME}`;
const endTimeName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.END_TIME}`;

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
    startTimeName
  ]);
  const reportSource = watchFields?.report_source?.value || '';
  const reportType = watchFields?.report_type?.value || '';
  const reportBy = watchFields?.[reportByName]?.value || '';
  const timeRange = watchFields?.[timeRangeName] || '';
  const timeUnit = watchFields?.[timeUnitName] || '';
  let startTime = watchFields?.[startTimeName] || null;
  let endTime = watchFields?.[endTimeName] || null;
  let reportByUuid = watchFields?.[reportByUuidName]?.value || '';

  if (reportSource === reportBy) {
    reportByUuid = sourceUuid;
  }

  let metricBody = {
    source_uuid: sourceUuid,
    report_source: reportSource,
    report_type: reportType,
    report_by: reportBy,
    report_by_uuid: reportByUuid,
    time_unit: timeUnit
  };

  const firstPointEnable =
    reportSource && reportType && reportBy && timeRange && timeUnit;

  if (firstPointEnable) {
    if (isCompareChart) {
      if (timeUnit === TimeUnits.GLOBAL) {
        enableCallMetric = true;
      }
    } else {
      if (timeUnit !== TimeUnits.GLOBAL) {
        enableCallMetric = true;
      }
    }
  }

  // Distribution report
  if (reportType === ReportTypes.DISTRIBUTION) {
    const isValidTime = isValidTimePeriod({startTime, endTime});

    if (isValidTime) {
      startTime = moment(startTime).toISOString();
      endTime = moment(endTime).toISOString();
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

  return {
    metricBody,
    enableCallMetric
  };
};

const isValidTimePeriod = ({startTime, endTime}) => {
  return startTime && endTime && moment(startTime).isBefore(moment(endTime))
    ? true
    : false;
};
