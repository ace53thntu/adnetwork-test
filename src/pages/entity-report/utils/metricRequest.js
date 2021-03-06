import {DEFAULT_TIMEZONE} from 'constants/misc';
import {convertLocalDateToTimezone} from 'utils/helpers/dateTime.helpers';
import {TimezoneMapping} from 'utils/helpers/getListTimezone';

export const getMetricRequestBody = ({report}) => {
  if (!report) {
    return null;
  }
  const {source_uuid, report_source, report_type, api} = report;

  const {time_range, time_unit, report_by, start_time, end_time} = api || {};
  let time_zone = api?.time_zone;
  let report_by_uuid = api?.report_by_uuid || null;
  if (report_source === report_by) {
    report_by_uuid = source_uuid;
  }

  if (time_zone === null || time_zone === undefined || time_zone === '') {
    time_zone = DEFAULT_TIMEZONE;
  }

  const timeZoneValue = TimezoneMapping[time_zone];

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
    requestBody.start_time = convertLocalDateToTimezone({
      localDate: start_time,
      timeZoneOffset: time_zone
    });
    requestBody.end_time = end_time;
  }

  return requestBody;
};
