import {useMemo} from 'react';
import moment from 'moment';
import {FORMAT_BY_UNIT} from 'constants/report';
import {validArray} from 'utils/helpers/dataStructure.helpers';

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
  dates.length = dates?.length - 1;

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

export const useChartData = ({
  type = 'line',
  metrics: metricData,
  unit = 'hour',
  timeRange = 'l1d',
  metricSet = [],
  entityId
}) => {
  console.log('🚀 ~ file: useChartData.js ~ line 98 ~ entityId', entityId);
  return useMemo(() => {
    if (metricData) {
      const {report: metrics = {}, start_time, end_time} = metricData;

      const startTime = moment.unix(start_time);
      const endTime = moment.unix(end_time);
      const increaseNumber = unit === 'fiveseconds' ? 5 : 1;
      const unitStr = unit === 'fiveseconds' ? 'second' : unit;
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
      console.log(
        '🚀 ~ file: useChartData.js ~ line 114 ~ returnuseMemo ~ listCheckPoints',
        listCheckPoints
      );
      console.log(
        '🚀 ~ file: useChartData.js ~ line 120 ~ returnuseMemo ~ newMetrics',
        newMetrics
      );

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
    }
    return null;
  }, [entityId, metricData, metricSet, unit]);
};
