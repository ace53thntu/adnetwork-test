import {METRIC_TIMERANGES} from 'constants/report';
import {getReportSources} from 'utils/metrics';
import React from 'react';
import {ReportBys, ReportTypes} from '../constants.js';

export const useDefaultValues = ({reportItem}) => {
  return React.useMemo(() => {
    const {api = {}, properties = {}} = reportItem;
    let {report_source, report_type} = reportItem;
    let {time_unit, time_range, report_by, start_time, end_time} = api;
    time_range = METRIC_TIMERANGES.find(item => item.value === time_range);
    time_unit = time_range?.units?.find(item => item?.value === time_unit);

    report_source = getReportSources().find(
      item => item?.value === report_source
    );
    report_by = ReportBys.find(item => item?.value === report_by);
    report_type = ReportTypes.find(item => item?.value === report_type);
    if (start_time === '0001-01-01T00:00:00Z') {
      start_time = null;
    }
    if (end_time === '0001-01-01T00:00:00Z') {
      end_time = null;
    }
    start_time = start_time ? new Date(start_time) : new Date();
    end_time = end_time ? new Date(end_time) : null;

    return {
      properties,
      api: {time_range, time_unit, report_by, start_time, end_time},
      report_type,
      report_source
    };
  }, [reportItem]);
};
