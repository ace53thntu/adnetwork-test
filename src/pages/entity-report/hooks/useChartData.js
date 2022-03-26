import {useMemo} from 'react';
import moment from 'moment';
import {ChartTypes, FORMAT_BY_UNIT, TimeUnits} from 'constants/report';
import {validArray} from 'utils/helpers/dataStructure.helpers';
import _ from 'lodash';

/**
 * Hook handle data to render to Chart
 *
 */
export const useChartData = ({
  type = ChartTypes.LINE,
  metrics: metricData,
  unit = 'hour',
  timeRange = 'l1d',
  metricSet = [],
  entityId,
  chartType = '',
  colors = []
}) => {
  return useMemo(() => {
    if (metricData) {
      const {report: metrics, start_time, end_time, info = {}} = metricData;
      if (
        [ChartTypes.BAR, ChartTypes.PIE].includes(chartType) &&
        unit === TimeUnits.GLOBAL
      ) {
        return getDataPieChart({metrics, metricSet, info, colors});
      }

      return getDataLineChart({
        start_time,
        end_time,
        metricSet,
        unit,
        metrics,
        entityId
      });
    }
    return null;
  }, [chartType, colors, entityId, metricData, metricSet, unit]);
};

const getDataPieChart = ({metrics, metricSet, info, colors}) => {
  if (
    metrics &&
    typeof metrics === 'object' &&
    Object.keys(metrics).length > 0
  ) {
    const metricData = metrics?.['0'];

    if (metricData && Object.keys(metricData).length > 0) {
      const metricList = Object.entries(metricData);
      const metricsBySet = metricList.map(([objectUuid, metricObj]) => {
        return {
          uuid: objectUuid,
          value: metricObj?.[metricSet?.[0]?.code] || 0,
          label: info?.[objectUuid]?.name
        };
      });
      const metricsSorted = _.orderBy(metricsBySet, ['value'], ['desc']);

      const data = metricsSorted.reduce(
        (acc, item, idx) => {
          const metricValue = item?.value;
          const metricLabel = item?.label;
          acc.datasets[0].data.push(metricValue);
          acc.labels.push(metricLabel);
          return acc;
        },
        {
          datasets: [
            {data: [], backgroundColor: colors, label: metricSet?.[0]?.label}
          ],
          labels: []
        }
      );
      return data;
    }
  }
  return {
    datasets: [],
    labels: []
  };
};

const getDataLineChart = ({
  start_time,
  end_time,
  metricSet,
  unit,
  metrics,
  entityId
}) => {
  if (
    !metrics ||
    (typeof metrics === 'object' && Object.keys(metrics).length === 0)
  ) {
    return {series: [], categories: []};
  }

  const startTime = moment.unix(start_time);
  const endTime = moment.unix(end_time);
  const increaseNumber = 1; // unit === 'fiveseconds' ? 5 : 1;
  const unitStr = unit; // unit === 'fiveseconds' ? 'second' : unit;
  //---> Get list of checkpoints
  const listCheckPoints = enumerateDaysBetweenDates({
    startDate: startTime,
    endDate: endTime,
    formatStr: FORMAT_BY_UNIT[unitStr],
    unit: `${unitStr}s`,
    increaseNumber
  });

  const newMetrics = convertApiToRender({
    unit: unitStr,
    metrics,
    listCheckPoints
  });

  if (validArray({list: metricSet})) {
    const data = [];
    metricSet.forEach(item => {
      const dataItem = getDataDrawChart({
        listCheckPoints,
        metrics: newMetrics,
        entityId,
        metricSet: item
      });
      data.push({data: dataItem, name: item?.label});
    });
    return {series: data, categories: listCheckPoints};
  } else {
    const data = getDataDrawChart({
      listCheckPoints,
      metrics: newMetrics,
      entityId,
      metricSet
    });
    return {
      categories: listCheckPoints,
      series: [{data, name: metricSet?.label}]
    };
  }
};

const mappingData = ({data, fieldName}) => {
  const existedData = data?.[fieldName];

  return existedData;
};

const enumerateDaysBetweenDates = ({
  startDate,
  endDate,
  formatStr,
  unit,
  increaseNumber = 1
}) => {
  const now = startDate.clone();
  const dates = [];
  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format(formatStr));

    now.add(increaseNumber, unit);
  }
  if (validArray({list: dates})) {
    dates.length = dates?.length - 1;
  }

  return dates;
};

const getLocalDateTime = ({formatStr = 'YYYY-MM-DD', dateStr}) => {
  const tmpDateUtc = moment.utc(moment.unix(dateStr));
  const newDateStr = tmpDateUtc.local().format(formatStr);

  return newDateStr;
};

const convertApiToRender = ({
  unit = '',
  metrics = {},
  listCheckPoints = []
}) => {
  const result = {};

  if (!metrics || Object.keys(metrics).length === 0) {
    const noData = listCheckPoints?.reduce((acc, item, idx) => {
      acc[item] = 0;
      return acc;
    }, {});

    return noData;
  }

  for (const [key, value] of Object.entries(metrics)) {
    const newKey = getLocalDateTime({
      formatStr: FORMAT_BY_UNIT[unit],
      dateStr: key
    });
    result[newKey] = value;
  }

  return result;
};

const getDataDrawChart = ({
  listCheckPoints = [],
  metrics = {},
  entityId,
  metricSet
}) => {
  const data = [...listCheckPoints].reduce((acc, calculatedDate, idx) => {
    const existedMetricByDate = mappingData({
      data: metrics,
      fieldName: calculatedDate
    });

    let valueOfObject = 0;
    if (existedMetricByDate) {
      valueOfObject = existedMetricByDate?.[entityId]?.[metricSet?.code];
    }
    if (!valueOfObject || valueOfObject === 0) {
      //---> will use when implement cumsum feature (only apply for trending type)
      // valueOfObject = idx > 0 ? acc?.[idx - 1]?.y : valueOfObject;
      valueOfObject = 0; //idx > 0 ? acc?.[idx - 1]?.y : valueOfObject;
    }
    acc.push({x: calculatedDate, y: valueOfObject || 0});
    return acc;
  }, []);
  return data;
};
