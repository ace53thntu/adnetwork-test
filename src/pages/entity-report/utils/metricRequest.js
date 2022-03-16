export const getMetricRequestBody = ({report}) => {
  if (!report) {
    return null;
  }
  const {source_uuid, report_source, report_type, api} = report;

  const {
    time_range,
    time_unit,
    report_by,
    start_time,
    end_time,
    report_by_uuid = null
  } = api;
  const requestBody = {
    source_uuid,
    report_by_uuid,
    report_type,
    time_unit,
    time_range,
    report_source,
    report_by
  };
  if (report_type === 'distribution') {
    requestBody.start_time = start_time;
    requestBody.end_time = end_time;
  }

  return requestBody;
};
