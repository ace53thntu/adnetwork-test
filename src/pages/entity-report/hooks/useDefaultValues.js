//---> Build-in Modules
import React from 'react';

//---> Internal Modules
import {EntityTypes, METRIC_TIMERANGES} from 'constants/report';
import {getReportSources} from 'utils/metrics';
import {PublisherReportBys, ReportBys, ReportTypes} from '../constants.js';

const isPublisherGroup = reportSource => {
  return [
    EntityTypes.PUBLISHER,
    EntityTypes.CONTAINER,
    EntityTypes.INVENTORY
  ].includes(reportSource);
};

export const useDefaultValues = ({report}) => {
  return React.useMemo(() => {
    if (!report) {
      return null;
    }

    const {api = {}, properties = {}} = report;
    let {report_source, report_type} = report;

    const isPublisher = isPublisherGroup(report_source);

    let {
      time_unit,
      time_range,
      report_by,
      start_time,
      end_time,
      report_by_name,
      report_by_uuid
    } = api;
    time_range = METRIC_TIMERANGES.find(item => item.value === time_range);
    time_unit = time_range?.units?.find(item => item?.value === time_unit);
    report_source = getReportSources().find(
      item => item?.value === report_source
    );
    report_by = isPublisher
      ? PublisherReportBys.find(item => item?.value === report_by)
      : ReportBys.find(item => item?.value === report_by);
    report_type = ReportTypes.find(item => item?.value === report_type);
    if (report_type?.value === 'trending') {
      start_time = null;
      end_time = null;
    }

    start_time = start_time ? new Date(start_time) : new Date();
    end_time = end_time ? new Date(end_time) : null;
    const reportByUuid = report_by_uuid
      ? {value: report_by_uuid, label: report_by_name}
      : null;

    return {
      properties,
      api: {
        time_range: JSON.stringify(time_range),
        time_unit,
        report_by,
        start_time,
        end_time,
        report_by_uuid: reportByUuid
      },
      report_type,
      report_source
    };
  }, [report]);
};
