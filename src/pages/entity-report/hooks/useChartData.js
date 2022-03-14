import {useMemo} from 'react';
import moment from 'moment';
import {FORMAT_BY_UNIT} from 'constants/report';
import {validArray} from 'utils/helpers/dataStructure.helpers';

// const mockData = {
//   1646927100: {
//     'd668df06-074a-4bc3-862f-9bfef6fe5122': {cbc: 2, cbsp: 4, ccc: 4}
//   },
//   1646925480: {'d668df06-074a-4bc3-862f-9bfef6fe5122': {vbc: 1, vbsp: 1.5}},
//   1646986852: {
//     'd668df06-074a-4bc3-862f-9bfef6fe5122': {cbc: 1, cbsp: 1, ccc: 4}
//   },
//   1646924280: {
//     'd668df06-074a-4bc3-862f-9bfef6fe5122': {cbc: 2, cbsp: 3, ccc: 4}
//   },
//   1646928480: {'d668df06-074a-4bc3-862f-9bfef6fe5122': {vbc: 1, vbsp: 1.5}},
//   1646909820: {'d668df06-074a-4bc3-862f-9bfef6fe5122': {vbc: 1, vbsp: 2}},
//   1646910480: {
//     'd668df06-074a-4bc3-862f-9bfef6fe5122': {cbc: 2, cbsp: 4, vbc: 2, vbsp: 3.5}
//   },
//   1646927160: {'d668df06-074a-4bc3-862f-9bfef6fe5122': {vbc: 1, vbsp: 1.5}}
// };

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
    dates.push(now.format('YYYY-MM-DD HH:mm:ss'));

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
    // const calculatedDate = getPreviousMinute(endTime);
    const existedMetricByDate = mappingData({
      data: metrics,
      fieldName: calculatedDate
    });

    let valueOfObject = 0;
    if (existedMetricByDate) {
      valueOfObject = existedMetricByDate?.[entityId]?.[metricSet?.code];
    }
    if (!valueOfObject || valueOfObject === 0) {
      valueOfObject = idx > 0 ? acc?.[idx - 1]?.y : valueOfObject;
    }
    acc.push({x: calculatedDate, y: valueOfObject || 0});
    return acc;
  }, []);
  return data;
};

export const useChartData = ({
  type = 'line',
  metrics: metricData = {},
  unit = 'hour',
  timeRange = 'l1d',
  metricSet = [],
  entityId
}) => {
  return useMemo(() => {
    if (metricData) {
      const {report: metrics = {}, start_time, end_time} = metricData;
      // const metrics = mockData;

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
