import {DEFAULT_TIMEZONE} from 'constants/misc';
import {TimezoneMapping} from 'utils/helpers/getListTimezone';

export const getMetricRequestBody = ({report}) => {
  if (!report) {
    return null;
  }
  const {source_uuid, report_source, report_type, api} = report;

  const {time_range, time_unit, report_by, start_time, end_time, time_zone} =
    api || {};
  const timeZoneValue =
    TimezoneMapping[`${time_zone}` || `${DEFAULT_TIMEZONE}`];
  let report_by_uuid = api?.report_by_uuid || null;
  if (report_source === report_by) {
    report_by_uuid = source_uuid;
  }

  const requestBody = {
    source_uuid,
    report_by_uuid,
    report_type,
    time_unit,
    time_range,
    report_source,
    report_by,
    time_zone: timeZoneValue
  };

  if (report_type === 'distribution') {
    requestBody.start_time = start_time;
    requestBody.end_time = end_time;
  }

  return requestBody;
};
