import React from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers.js';
import {DefaultColor} from '../constants.js';
import {hexToRgbA} from '../utils';

const getDataSet = ({label, color, type, data}) => {
  return {
    label,
    data,
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

export const useConfigChart = ({
  chartData = [],
  unit = 'day',
  format = 'DD/MM/YYYY',
  type = 'line',
  color = [DefaultColor],
  metricSet = []
}) => {
  return React.useMemo(() => {
    let setList = [];
    if (metricSet) {
      if (!validArray({list: metricSet})) {
        setList = [metricSet];
      } else {
        setList = metricSet;
      }
    }
    const labels = chartData?.[0]?.data?.map(item => item?.x);
    const datasets = setList?.map((item, idx) => {
      const dataItem = chartData?.[idx]?.data || [];
      const datasetItem = getDataSet({
        label: item?.label,
        color: color[idx],
        type,
        data: dataItem?.map(item => item?.y) //Math.floor(Math.random() * 10)
      });
      return datasetItem;
    });

    return {
      data: {
        labels,
        datasets
      },
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              gridLines: {
                lineWidth: 2
              },
              time: {
                parser: format,
                tooltipFormat: 'DD/MM/YYYY HH:mm:ss'
              },
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                major: {
                  enabled: true
                },
                font: function (context) {
                  if (context.tick && context.tick.major) {
                    return {
                      weight: 'bold'
                    };
                  }
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  }, [chartData, color, format, metricSet, type]);
};
