import {useCallback, useState} from 'react';
import {isEqual} from 'lodash';

import {defaultRanges} from 'utils/constants/common.constants';
import {ACTIVE_FILTER} from 'components/charts/ChartFilter';
import {getArrayOfDaysBetweenTwoDays} from 'utils/helpers/dateTime.helpers';

export function useChartPeriod() {
  //
  const [openDialog, setOpenDialog] = useState(false);
  const [defaultActivePeriod, setDefaultActiveFilter] = useState(
    ACTIVE_FILTER.day
  );
  const [ranges, setRanges] = useState(defaultRanges);

  const onActivePeriod = useCallback((activeFilter, rangeSelected) => {
    setDefaultActiveFilter(activeFilter);
    if (activeFilter === ACTIVE_FILTER.custom) {
      setRanges(rangeSelected);
    } else {
      setRanges(defaultRanges);
    }
  }, []);

  const onToggleDialog = useCallback(() => {
    setOpenDialog(!openDialog);
  }, [openDialog]);

  return {
    defaultActivePeriod,
    ranges,
    onActivePeriod,
    onToggleDialog,
    openDialog
  };
}

export function useChartCustomFilter(defaultFilter) {
  const [activeCustomFilter, setActiveFilter] = useState(defaultFilter);

  const onCustomFilterChange = useCallback(key => {
    setActiveFilter(key);
  }, []);

  return {
    activeCustomFilter,
    onCustomFilterChange
  };
}

export function useChartFilterSources(source) {
  const [sources, setSources] = useState([source]);

  const onChangeSource = useCallback(
    key => {
      if (sources.includes(key)) {
        setSources(sources.filter(src => src !== key));
      } else {
        setSources([...sources, key]);
      }
    },
    [sources]
  );

  return {
    onChangeSource,
    sources
  };
}

let memoizeLabels = [];
let prevData = {};

export function useChartData({
  period,
  chartOptions,
  data,
  labels,
  ranges,
  randomChartSeries
}) {
  if (period === ACTIVE_FILTER.custom) {
    const {startDate, endDate} = ranges[0];
    const customLabels = getArrayOfDaysBetweenTwoDays(startDate, endDate);

    if (!isEqual(customLabels, memoizeLabels)) {
      memoizeLabels = customLabels;
      const customData = makeDataForCustom(
        [...customLabels].reverse(),
        chartOptions,
        randomChartSeries
      );
      prevData = customData;
      return customData;
    } else {
      return prevData;
    }
  } else {
    if (period === ACTIVE_FILTER.day) {
      return makeData(chartOptions, data, labels, ACTIVE_FILTER.day);
    }
    if (period === ACTIVE_FILTER.week) {
      return makeData(chartOptions, data, labels, ACTIVE_FILTER.week);
    }
    if (period === ACTIVE_FILTER.month) {
      return makeData(chartOptions, data, labels, ACTIVE_FILTER.month);
    }
    if (period === ACTIVE_FILTER.threeMonths) {
      return makeData(chartOptions, data, labels, ACTIVE_FILTER.threeMonths);
    }
  }
}

function makeData(options, data, labels, periodKey = ACTIVE_FILTER.day) {
  let chartData = {};
  options.forEach(key => {
    chartData[key] = data[key][periodKey];
  });
  return {
    chartData,
    chartLabels: labels[periodKey]
  };
}
function makeDataForCustom(labels, options, randomChartSeries) {
  let chartData = {};
  options.forEach(key => {
    chartData[key] = randomChartSeries(labels.length)[key];
  });
  return {
    chartData,
    chartLabels: labels
  };
}
