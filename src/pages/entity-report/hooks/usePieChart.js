import React from 'react';
import {hexToRgbA} from '../utils';

const getDataset = ({color, data}) => {
  const backgroundColor = color?.map(item => hexToRgbA(item));
  return {
    label: '',
    data,
    backgroundColor,
    borderColor: color,
    borderWidth: 1
  };
};

export const usePieChart = ({series, color}) => {
  console.log(
    '🚀 ~ file: usePieChart.js ~ line 16 ~ usePieChart ~ series',
    series
  );
  return React.useMemo(() => {
    const destructureSeries = series.map(item => {
      const {data} = item;
      return data?.[data.length - 1]?.y;
    });
    const datasets = getDataset({color, data: destructureSeries});
    console.log(
      '🚀 ~ file: usePieChart.js ~ line 26 ~ returnReact.useMemo ~ datasets',
      datasets
    );
    const destructureLabels = series.map(item => {
      const {name} = item;
      return name;
    });

    return {
      datasets: [datasets],
      labels: destructureLabels
    };
  }, [color, series]);
};
