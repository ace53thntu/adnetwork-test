import React from 'react';
// import CustomPieChart from './CustomPieChart';
import {useConfigChart} from '../../hooks/useConfigChart';
import {R2ChartBar, R2ChartLine} from '..';
import {FORMAT_BY_UNIT} from 'constants/report';
import CustomPieChart from '../form/CustomPieChart';

const ChartItem = ({
  chartType = 'line',
  color,
  unit = 'day',
  series,
  metricSet = [],
  pieData = {},
  pieColor = ''
}) => {
  const convertUnit = unit;
  const formatDateStr = FORMAT_BY_UNIT[convertUnit];

  const {data: chartData, options} = useConfigChart({
    chartData: series,
    unit: convertUnit,
    format: formatDateStr,
    type: chartType,
    color,
    metricSet
  });

  const convertPieColors = JSON.parse(pieColor) || [];

  return (
    <div>
      {(() => {
        if (chartType === 'line' || chartType === 'multiline') {
          return <R2ChartLine data={chartData} options={options} />;
        } else if (chartType === 'bar') {
          return <R2ChartBar data={chartData} options={options} />;
        } else if (chartType === 'pie') {
          return <CustomPieChart pieData={pieData} colors={convertPieColors} />;
        } else {
          return <div>Up coming</div>;
        }
      })()}
    </div>
  );
};

export default React.memo(ChartItem);
