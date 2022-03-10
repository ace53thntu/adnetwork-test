import moment from 'moment';

const DATE_FORMAT_STR = 'DD-MM-YYYY hh:mm:ss';

export function mappingFormToApi({
  formData,
  entityId,
  metricSet,
  metricType,
  entityType,
  ownerRole,
  ownerUuid
}) {
  const {api, properties, report_type, report_source} = formData;
  let {unit, time_range, report_by, start_time, end_time} = api;
  unit = unit?.value;
  time_range = time_range?.value;
  const reportSource = report_source?.value;

  let formatStartDate = moment(start_time).isSame(moment(), 'day')
    ? null
    : moment(start_time).toISOString();
  const formatEndDate = moment(end_time).endOf('day').toISOString();

  const data = {
    name: `${entityType} report - ${moment().format(DATE_FORMAT_STR)}`,
    source_uuid: entityId,
    report_type: report_type?.value,
    report_source: reportSource,
    status: 'active',
    properties: {...properties, metric_set: metricSet},
    api: {
      time_unit: unit,
      time_range,
      report_by: report_by?.value,
      report_by_uuid: entityId,
      start_time: formatStartDate,
      end_time: formatEndDate
    }
  };

  return data;
}
