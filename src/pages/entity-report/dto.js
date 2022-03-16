import moment from 'moment';
import {capitalize} from 'utils/helpers/string.helpers';
import {
  DEFAULT_TIME_RANGE,
  DEFAULT_TIME_UNIT,
  METRIC_TIMERANGES
} from 'constants/report';

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
  let {
    time_unit,
    time_range,
    report_by,
    start_time,
    end_time,
    report_by_uuid
  } = api;
  time_unit = time_unit?.value;
  try {
    const timeRangeParsed = JSON.parse(time_range);
    time_range = timeRangeParsed?.value;
  } catch (err) {
    time_range = '';
  }
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
      time_unit,
      time_range,
      report_by: report_by?.value,
      report_by_uuid: report_by_uuid?.value || '',
      start_time: formatStartDate,
      end_time: formatEndDate
    }
  };

  return data;
}

export const initDefaultValue = ({
  initColors = [],
  metricType,
  distributionBy,
  entityType
}) => {
  const timeRange = METRIC_TIMERANGES.find(
    item => item.value === DEFAULT_TIME_RANGE
  );
  return {
    properties: {
      color: JSON.stringify(initColors),
      chart_type: 'line'
    },
    api: {
      time_unit: timeRange?.units.find(
        item => item.value === DEFAULT_TIME_UNIT
      ),
      time_range: JSON.stringify(timeRange),
      report_by: {label: capitalize(entityType), value: entityType}
    },
    report_source: {label: capitalize(entityType), value: entityType},
    report_type: {label: capitalize('trending'), value: 'trending'}
  };
};
