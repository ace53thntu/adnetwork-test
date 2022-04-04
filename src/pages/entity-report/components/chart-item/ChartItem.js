import React from 'react';
// import CustomPieChart from './CustomPieChart';
import {useConfigChart} from '../../hooks/useConfigChart';
import {R2ChartBar, R2ChartLine} from '..';
import {ChartTypes, FORMAT_BY_UNIT, TimeUnits} from 'constants/report';
import {CustomBarChart, CustomPieChart} from '../report-chart';

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
        if (chartType === ChartTypes.PIE) {
          return (
            <CustomPieChart
              pieData={pieData}
              colors={convertPieColors}
              showLegend={false}
            />
          );
        }
        if (chartType === ChartTypes.BAR && unit === TimeUnits.GLOBAL) {
          return (
            <CustomBarChart
              barData={pieData}
              colors={convertPieColors}
              showXLabel={false}
            />
          );
        }
        if ([ChartTypes.LINE, ChartTypes.MULTILINE].includes(chartType)) {
          return <R2ChartLine data={chartData} options={options} />;
        }
        if (chartType === ChartTypes.BAR) {
          return <R2ChartBar data={chartData} options={options} />;
        }
        return <div>Up coming</div>;
      })()}
    </div>
  );
};

export default React.memo(ChartItem);
