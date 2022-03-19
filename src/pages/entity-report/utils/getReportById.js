export const getReportById = ({report, entityId}) => {
  if (report) {
    const api = report?.api;
    const reportByUuid = api?.report_by_uuid;
    const reportSource = report?.report_source;
    const reportBy = report?.api?.report_by;
    if (reportSource !== reportBy) {
      return reportByUuid;
    }
    return entityId;
  }

  return entityId;
};
