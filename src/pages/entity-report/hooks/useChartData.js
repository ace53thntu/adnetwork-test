import {useMemo} from 'react';
import moment from 'moment';
import {
  ChartModes,
  ChartTypes,
  FORMAT_BY_UNIT,
  TimeUnits
} from 'constants/report';
import {validArray} from 'utils/helpers/dataStructure.helpers';
import _ from 'lodash';
import {hexToRgbA} from '../utils';

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
  chartMode = ChartModes.BY,
  colors
}) => {
  return useMemo(() => {
    if (metricData && Object.keys(metricData).length > 0) {
      const {report: metrics, start_time, end_time, info = {}} = metricData;
      if (
        [ChartTypes.BAR, ChartTypes.PIE].includes(chartType) &&
        unit === TimeUnits.GLOBAL &&
        metricSet?.length === 1
      ) {
        return getDataPieChart({metrics, metricSet, info});
      }

      if (unit !== TimeUnits.GLOBAL) {
        return getDataLineChart({
          start_time,
          end_time,
          metricSet,
          unit,
          metrics,
          entityId,
          chartMode,
          type,
          colors
        });
      }
      return null;
    }
    return null;
  }, [
    chartMode,
    chartType,
    colors,
    entityId,
    metricData,
    metricSet,
    type,
    unit
  ]);
};

const getDataPieChart = ({metrics, metricSet, info}) => {
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
            {data: [], backgroundColor: [], label: metricSet?.[0]?.label}
          ],
          labels: []
        }
      );
      return data;
    }

    return {
      datasets: [{data: [], backgroundColor: [], label: metricSet?.[0]?.label}],
      labels: []
    };
  }
  return {
    datasets: [{data: [], backgroundColor: [], label: metricSet?.[0]?.label}],
    labels: []
  };
};

const getDataLineChart = ({
  start_time,
  end_time,
  metricSet,
  unit,
  metrics,
  entityId,
  chartMode,
  type,
  colors
}) => {
  const startTime = moment.unix(start_time);
  const endTime = moment.unix(end_time);
  const increaseNumber = 1;
  const unitStr = unit;
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
  console.log('🚀 ~ file: useChartData.js ~ line 144 ~ newMetrics', newMetrics);

  if (validArray({list: metricSet})) {
    const data = [];
    metricSet.forEach((item, idx) => {
      const dataItem = getDataDrawChart({
        listCheckPoints,
        metrics: newMetrics,
        entityId,
        metricSet: item,
        chartMode
      });
      data.push({
        data: dataItem,
        label: item?.label,
        ...getChartConfig({type, color: colors?.[idx] || ''})
      });
    });
    console.log('🚀 ~ file: useChartData.js ~ line 156 ~ data', data);

    return {datasets: data, labels: listCheckPoints};
  } else {
    const data = getDataDrawChart({
      listCheckPoints,
      metrics: newMetrics,
      entityId,
      metricSet
    });
    return {
      categories: listCheckPoints,
      series: [{data, label: metricSet?.label}]
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
  console.log('result ===', result);
  return result;
};

const getDataDrawChart = ({
  listCheckPoints = [],
  metrics = {},
  entityId,
  metricSet,
  chartMode
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
  if (chartMode === ChartModes.CUMULATIVE) {
    let sum = 0;
    const cumData = data?.map((item, idx) => {
      sum += item?.y;
      return {
        ...item,
        y: sum
      };
    });

    return cumData;
  }
  return data;
};

const getChartConfig = ({type, color}) => {
  return {
    fill: false,
    lineTension: 0.1,
    backgroundColor: hexToRgbA(color),
    borderColor: color,
    borderWidth: type === 'line' ? 2 : 1,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: color,
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10
  };
};
