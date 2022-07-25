import {
  DISTRIBUTIONS,
  METRIC_UNITS,
  ReportTypes,
  REPORT_SOURCES
} from 'constants/report';
import {capitalize} from './helpers/string.helpers';
import timezones from 'timezones-list';
import moment from 'moment-timezone';
import {Statuses} from 'constants/misc';

export const getMetricUnits = () => {
  return METRIC_UNITS.map(item => ({value: item, label: capitalize(item)}));
};

export const getDistributions = () => {
  return DISTRIBUTIONS.map(item => ({value: item, label: capitalize(item)}));
};

export const getReportSources = () => {
  return REPORT_SOURCES.map(item => ({value: item, label: capitalize(item)}));
};

export const generateTimeZoneList = () => {
  console.log('timezones', timezones);
  return timezones?.map(item => {
    const value = item?.utc?.replace(/\b0+/g, '')?.replace(/\b:+/g, '');
    return {
      ...item,
      label: item?.name || 'No name',
      value
    };
  });
};

export const getTimeZoneOffset = () => {
  let timeZone = moment.tz.guess();

  if (timeZone === 'Asia/Saigon') {
    timeZone = 'Asia/Ho_Chi_Minh';
  }
  const timeZoneValue = timezones?.find(
    item => item.tzCode.toLowerCase() === timeZone?.toLowerCase()
  );

  const valueConverted = timeZoneValue?.utc
    ?.replace(/\b0+/g, '')
    ?.replace(/\b:+/g, '');
  return valueConverted || '+7';
};

export const getDefaultMetric1 = ({
  metricTextType = '',
  metricTypeOptions = []
}) => {
  let prefixMetric = metricTextType ? `${metricTextType}_` : '';
  const creativeMetricSets = metricTypeOptions.filter(
    item => item?.label?.toLowerCase() === metricTextType
  );
  const creativeReportMetricSets = creativeMetricSets?.map(item => {
    const {options} = item;
    return options?.filter(optItem =>
      [
        `${prefixMetric}bids`,
        `${prefixMetric}impressions`,
        `${prefixMetric}clicks`,
        `${prefixMetric}viewable`
      ].includes(optItem.value)
    );
  });
  return creativeReportMetricSets?.[0];
};

export const getDefaultMetric2 = ({metricTextType, metricTypeOptions = []}) => {
  const creativeMetricSets = metricTypeOptions.filter(
    item => item?.label?.toLowerCase() === metricTextType
  );
  const creativeReportMetricSets = creativeMetricSets?.map(item => {
    const {options} = item;
    return options?.filter(optItem =>
      [`${metricTextType}_cost`].includes(optItem.value)
    );
  });
  return creativeReportMetricSets?.[0];
};

export const getDefaultPublisherMetric1 = ({
  metricTextType = '',
  metricTypeOptions = []
}) => {
  return metricTypeOptions?.filter(optItem =>
    [`bids`, `impressions`, `clicks`, `viewable`].includes(optItem.code_name)
  );
};

export const getDefaultPublisherMetric2 = ({metricTypeOptions = []}) => {
  return metricTypeOptions?.filter(optItem =>
    [`publisher_final_revenue`].includes(optItem.code_name)
  );
};

export const getDefaultReport = ({
  sourceUuid,
  reportType = ReportTypes.TRENDING,
  reportSource,
  parentPath,
  metricSets = [],
  timeZone,
  timeUnit = 'day',
  timeRange = 'l1mt',
  campaignName
}) => {
  return {
    name: `${campaignName} / Group by ${reportSource}`,
    source_uuid: sourceUuid,
    report_type: reportType,
    report_source: reportSource,
    status: Statuses.ACTIVE,
    properties: {
      color:
        metricSets?.length === 4
          ? '#5ea151,#219ebc,#dda15e,#bc6c25'
          : '#fb8500',
      chart_type: 'line',
      mode: 'by',
      metric_set: metricSets,
      parentPath: parentPath
    },
    api: {
      time_unit: timeUnit,
      time_range: timeRange,
      report_by: reportSource,
      report_by_uuid: '',
      start_time: null,
      end_time: null,
      time_zone: timeZone
    }
  };
};
