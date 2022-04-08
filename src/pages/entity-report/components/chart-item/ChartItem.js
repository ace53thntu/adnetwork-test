import React from 'react';
import {ChartTypes, TimeUnits} from 'constants/report';
import {CustomBarChart, CustomLineChart, CustomPieChart} from '../report-chart';
import {parseColors} from 'pages/entity-report/utils';

const ChartItem = ({
  chartType = ChartTypes.LINE,
  unit = TimeUnits.DAY,
  chartData = {},
  colors = ''
}) => {
  console.log('🚀 ~ file: ChartItem.js ~ line 12 ~ chartData', chartData);
  const convertPieColors = parseColors(colors);

  return (
    <div>
      {(() => {
        if (chartType === ChartTypes.PIE) {
          return (
            <CustomPieChart
              pieData={chartData}
              colors={convertPieColors}
              showLegend={false}
            />
          );
        }
        if (chartType === ChartTypes.BAR && unit === TimeUnits.GLOBAL) {
          return (
            <CustomBarChart
              barData={chartData}
              colors={convertPieColors}
              showXLabel={false}
            />
          );
        }
        if ([ChartTypes.LINE, ChartTypes.MULTILINE].includes(chartType)) {
          return <CustomLineChart data={chartData} unit={unit} />;

          // return <R2ChartLine data={chartData} options={options} />;
        }
        if (chartType === ChartTypes.BAR) {
          return (
            <CustomBarChart
              data={chartData}
              showXLabel={false}
              colors={convertPieColors}
              unit={unit}
            />
          );
        }
        return <div>Up coming</div>;
      })()}
    </div>
  );
};

export default React.memo(ChartItem);
