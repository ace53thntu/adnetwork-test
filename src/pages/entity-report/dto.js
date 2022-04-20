import moment from 'moment';
import {capitalize} from 'utils/helpers/string.helpers';
import {
  ChartTypes,
  DEFAULT_TIME_RANGE,
  DEFAULT_TIME_UNIT,
  EntityTypes,
  METRIC_TIMERANGES,
  ReportTypes
} from 'constants/report';
import {PublisherReportBys, ReportBys, ReportTypeOptions} from './constants.js';
import {getReportSources} from 'utils/metrics.js';
import {getDistributionUnits} from './utils/getDistributionUnit.js';

// const DATE_FORMAT_STR = 'DD-MM-YYYY hh:mm:ss';

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
  metricBody,
  colorsRedux
}) {
  console.log('🚀 ~ file: dto.js ~ line 35 ~ colorsRedux', colorsRedux);
  console.log('🚀 ~ file: dto.js ~ line 34 ~ metricBody', metricBody);
  const {api, properties, report_type, report_source} = formData;
  let {
    time_unit,
    time_range,
    report_by,
    start_time,
    end_time,
    report_by_uuid
  } = api;
  time_unit = metricBody?.time_unit || time_unit?.value;
  try {
    const timeRangeParsed = JSON.parse(time_range);
    time_range = timeRangeParsed?.value;
  } catch (err) {
    time_range = '';
  }
  const reportSource = report_source?.value;
  let formatStartDate = start_time ? moment(start_time).toISOString() : null;
  const formatEndDate = moment(end_time).toISOString();
  const reportBy = report_by?.value || '';
  const reportByName = report_by?.label || '';
  const reportByUuid = report_by_uuid?.value || '';
  const reportByUuidName = report_by_uuid?.label || '';

  const metricSetList = metricSet?.map(item => {
    return item?.label;
  });

  const reportName = `[${capitalize(
    reportSource
  )}] ${entityName} / Group by ${reportByName}${
    reportByUuidName ? ': ' + reportByUuidName : ' All'
  } / ${metricSetList.join(', ')}`;
  const color = colorsRedux ? JSON.stringify(colorsRedux) : '';

  const data = {
    name: reportName,
    source_uuid: entityId,
    report_type: report_type?.value,
    report_source: reportSource,
    status: 'active',
    properties: {...properties, metric_set: metricSet, color},
    api: {
      time_unit,
      time_range,
      report_by: reportBy,
      report_by_uuid: reportByUuid,
      start_time: formatStartDate,
      end_time: formatEndDate
    }
  };

  return data;
}

export function mappingApiToForm({report}) {
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
  // Handle time range
  time_range = METRIC_TIMERANGES.find(item => item.value === time_range);

  // Handle report source
  report_source = getReportSources().find(
    item => item?.value === report_source
  );

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

  if (report_type?.value === ReportTypes.DISTRIBUTION) {
    const distributionUnits = getDistributionUnits({
      startTime: start_time,
      endTime: end_time
    });
    time_unit = distributionUnits.find(item => item.value === time_unit);
  } else {
    time_unit = time_range?.units?.find(item => item?.value === time_unit);
  }

  // Handle start time, end time
  start_time = start_time ? new Date(start_time) : new Date();
  end_time = end_time ? new Date(end_time) : null;
  const reportByUuid = report_by_uuid
    ? {value: report_by_uuid, label: report_by_name}
    : null;

  // Handle color
  const colorConverted =
    properties?.chart_type === ChartTypes.PIE
      ? getColorForPieChart({color: properties?.color})
      : properties.color;

  return {
    properties: {...properties, color: colorConverted},
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
}

export const initDefaultValue = ({
  initColors = [],
  metricType,
  entityType,
  sourceUuid
}) => {
  const timeRange = METRIC_TIMERANGES.find(
    item => item.value === DEFAULT_TIME_RANGE
  );
  return {
    properties: {
      color: JSON.stringify(initColors),
      chart_type: ChartTypes.LINE
    },
    api: {
      time_unit: timeRange?.units.find(
        item => item.value === DEFAULT_TIME_UNIT
      ),
      time_range: JSON.stringify(timeRange),
      report_by: {label: capitalize(entityType), value: entityType},
      start_time: null,
      end_time: null
    },
    report_source: {label: capitalize(entityType), value: entityType},
    report_type: {label: capitalize('trending'), value: ReportTypes.TRENDING},
    source_uuid: sourceUuid
  };
};

export const getColorForPieChart = ({color}) => {
  try {
    const colors = JSON.parse(color);
    return colors;
  } catch (errr) {
    return [];
  }
};
