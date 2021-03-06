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
  metricSet = [],
  entityId,
  chartType = '',
  chartMode = ChartModes.BY,
  colors,
  timeZone
}) => {
  return useMemo(() => {
    if (metricData && Object.keys(metricData).length > 0) {
      const {report: metrics, start_time, end_time, info = {}} = metricData;
      if (
        [ChartTypes.BAR, ChartTypes.PIE].includes(chartType) &&
        unit === TimeUnits.GLOBAL &&
        metricSet?.length === 1
      ) {
        return getDataPieChart({metrics, metricSet, info, timeZone});
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
          colors,
          timeZone
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
    timeZone,
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
      const _metricSet = metricSet?.[0];
      const metricCode = _metricSet?.code || '';

      // Check metricSet?.code !== 'video_start' condition because make sure old report work correctly
      const isPrice =
        metricCode === 'video_start' ? false : _metricSet?.is_price;

      const metricsBySet = metricList.map(([objectUuid, metricObj]) => {
        const metricValue = metricObj?.[metricCode] || 0;
        return {
          uuid: objectUuid,
          value: isPrice ? getPriceValue(metricValue) : metricValue,
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
  colors,
  timeZone
}) => {
  const startTime = getDateFromTimestamp(start_time, timeZone); //moment.unix(start_time);
  const endTime = getDateFromTimestamp(end_time, timeZone); //moment.unix(end_time);

  const increaseNumber = 1;
  const unitStr = unit;
  //---> Get list of checkpoints
  const listCheckPoints = enumerateDaysBetweenDates({
    startDate: startTime,
    endDate: endTime,
    formatStr: FORMAT_BY_UNIT[unitStr],
    unit: `${unitStr}s`,
    increaseNumber,
    timeZone
  });

  const newMetrics = convertApiToRender({
    unit: unitStr,
    metrics,
    listCheckPoints,
    timeZone
  });

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
  increaseNumber = 1,
  timeZone
}) => {
  const now = startDate.clone();
  const dates = [];
  while (now.isSameOrBefore(endDate)) {
    const formattedDate = now.format(formatStr);

    dates.push(formattedDate);

    now.add(increaseNumber, unit);
  }
  // if (validArray({list: dates})) {
  //   dates.length = dates?.length - 1;
  // }

  return dates;
};

const getLocalDateTime = ({formatStr = 'YYYY-MM-DD', dateStr, timeZone}) => {
  const tmpDateUtc = moment.utc(moment.unix(dateStr)).add(timeZone, 'h');
  const newDateStr = tmpDateUtc.format(formatStr);

  return newDateStr;
};

const convertApiToRender = ({
  unit = '',
  metrics = {},
  listCheckPoints = [],
  timeZone
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
      dateStr: key,
      timeZone
    });
    result[newKey] = value;
  }
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
      // Check metricSet?.code !== 'video_start' condition because make sure old report work correctly
      if (metricSet?.is_price && metricSet?.code !== 'video_start') {
        valueOfObject = getPriceValue(valueOfObject);
      }
    }
    if (!valueOfObject || valueOfObject === 0) {
      //---> will use when implement cumsum feature (only apply for trending type)
      valueOfObject = 0;
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

const getPriceValue = value => {
  if (typeof value === 'number') {
    return parseInt(value / 1000) || 0;
  }

  return value;
};

const getDateFromTimestamp = (timestamp, timeZone) => {
  return moment.utc(moment.unix(timestamp)).add(timeZone, 'h');
};
