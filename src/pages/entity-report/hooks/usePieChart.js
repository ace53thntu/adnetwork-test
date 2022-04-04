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
  return React.useMemo(() => {
    const destructureSeries = series.map(item => {
      const {data} = item;
      return data?.[data.length - 1]?.y;
    });
    const datasets = getDataset({color, data: destructureSeries});

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
