import moment from 'moment';
import {capitalize} from 'utils/helpers/string.helpers';
import {
  ChartTypes,
  DEFAULT_TIME_RANGE,
  DEFAULT_TIME_UNIT,
  EntityTypes,
  ReportTypes
} from 'constants/report';
import {PublisherReportBys, ReportBys, ReportTypeOptions} from './constants.js';
import {getReportSources} from 'utils/metrics.js';
import {getListTimeZone} from 'utils/helpers/getListTimezone.js';

const isPublisherGroup = reportSource => {
  return [
    EntityTypes.PUBLISHER,
    EntityTypes.CONTAINER,
    EntityTypes.INVENTORY
  ].includes(reportSource);
};

export function mappingFormToApi({
  formData,
  entityId,
  metricSet,
  metricType,
  entityType,
  entityName = '',
  parentPath = '',
  metricBody,
  colorsRedux
}) {
  const {api, properties, report_type, report_source} = formData;
  let {
    time_unit,
    time_range,
    report_by,
    start_time,
    end_time,
    report_by_uuid
  } = api;

  const reportSource = report_source?.value;
  let formatStartDate = start_time ? moment(start_time).toISOString() : null;
  const formatEndDate = moment(end_time).toISOString();
  const reportBy = report_by?.value || '';
  const reportByName = report_by?.label || '';
  const reportByUuid = report_by_uuid?.value || '';
  const reportByUuidName = report_by_uuid?.label || '';

  const reportName = `${entityName} / Group by ${reportByName}${
    reportByUuidName ? ': ' + reportByUuidName : ''
  }`;

  const data = {
    name: reportName,
    source_uuid: entityId,
    report_type: report_type?.value,
    report_source: reportSource,
    status: 'active',
    properties: {...properties, metric_set: metricSet, parentPath},
    api: {
      time_unit,
      time_range,
      report_by: reportBy,
      report_by_uuid: reportByUuid,
      start_time: formatStartDate,
      end_time: formatEndDate,
      time_zone: parseInt(api?.time_zone?.value) || 7
    }
  };

  return data;
}

export function mappingApiToForm({report, defaultTimezone}) {
  const {api = {}, properties = {}} = report || {};
  let {report_source, report_type} = report;

  const isPublisher = isPublisherGroup(report_source);

  let {
    time_unit,
    time_range,
    report_by,
    start_time,
    end_time,
    report_by_name,
    report_by_uuid,
    time_zone
  } = api;

  // Handle report source
  report_source = getReportSources().find(
    item => item?.value === report_source
  );
  const reportByUuidName =
    report_by === 'source' ? capitalize(report_by_uuid) : report_by_name;

  // Handle report by
  report_by = isPublisher
    ? PublisherReportBys.find(item => item?.value === report_by)
    : ReportBys.find(item => item?.value === report_by);

  // Handle report type
  report_type = ReportTypeOptions.find(item => item?.value === report_type);
  if (report_type?.value === ReportTypes.TRENDING) {
    start_time = null;
    end_time = null;
  }

  // Handle start time, end time
  start_time = start_time ? new Date(start_time) : new Date();
  end_time = end_time ? new Date(end_time) : null;
  const reportByUuid = report_by_uuid
    ? {value: report_by_uuid, label: reportByUuidName}
    : null;

  // Handle color

  return {
    properties,
    api: {
      time_range,
      time_unit,
      report_by,
      start_time,
      end_time,
      report_by_uuid: reportByUuid,
      time_zone: time_zone
        ? getListTimeZone().find(item => parseInt(item.value, 10) === time_zone)
        : getListTimeZone().find(
            item => parseInt(item.value, 10) === defaultTimezone
          )
    },
    report_type,
    report_source
  };
}

export const initDefaultValue = ({
  initColors = [],
  metricType,
  entityType,
  sourceUuid,
  defaultTimezone
}) => {
  return {
    properties: {
      color: initColors,
      chart_type: ChartTypes.LINE
    },
    api: {
      time_unit: DEFAULT_TIME_UNIT,
      time_range: DEFAULT_TIME_RANGE,
      report_by: {label: capitalize(entityType), value: entityType},
      start_time: null,
      end_time: null,
      time_zone:
        getListTimeZone().find(
          item => parseInt(item.value) === defaultTimezone
        ) || null
    },
    report_source: {label: capitalize(entityType), value: entityType},
    report_type: {
      label: capitalize(ReportTypes.TRENDING),
      value: ReportTypes.TRENDING
    },
    source_uuid: sourceUuid
  };
};

export const getColorForPieChart = ({color}) => {
  try {
    const colors = JSON.parse(color);
    return colors;
  } catch (err) {
    return [];
  }
};
