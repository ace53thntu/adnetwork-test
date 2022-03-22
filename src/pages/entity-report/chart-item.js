import React from 'react';
// import CustomPieChart from './CustomPieChart';
import {useConfigChart} from './hooks/useConfigChart';
import {R2ChartBar, R2ChartLine} from './components';
import R2ChartPie from './components/charts/R2ChartPie';
import {FORMAT_BY_UNIT} from 'constants/report';

const ChartItem = ({
  nameOfSeries = '',
  chartType = 'line',
  color,
  reportId,
  unit = 'day',
  height = '250',
  series,
  categories,
  isDetails = false,
  metricSet = []
}) => {
  const convertUnit = unit; //unit === 'fiveseconds' ? 'second' : unit;
  const formatDateStr = FORMAT_BY_UNIT[convertUnit];

  const {data: chartData, options} = useConfigChart({
    chartData: series,
    unit: convertUnit,
    format: formatDateStr,
    type: chartType,
    color,
    metricSet
  });

  return (
    <div>
      {(() => {
        if (chartType === 'line' || chartType === 'multiline') {
          return <R2ChartLine data={chartData} options={options} />;
        } else if (chartType === 'bar') {
          return <R2ChartBar data={chartData} options={options} />;
        } else if (chartType === 'pie') {
          return <R2ChartPie series={series} color={color} />;
        } else {
          return <div>Up coming</div>;
        }
      })()}
    </div>
  );
};

export default React.memo(ChartItem);
