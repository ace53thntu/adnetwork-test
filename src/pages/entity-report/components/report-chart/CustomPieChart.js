//---> Build-in Modules
import React from 'react';

//---> Build-in Modules
import {R2ChartPie} from '../charts';

const CustomPieChart = ({
  pieData,
  colors = [],
  showLegend = true,
  position = 'top'
}) => {
  const dataDestructured = React.useMemo(() => {
    if (pieData) {
      return pieData?.datasets?.map(item => {
        return {...item, backgroundColor: colors};
      });
    }
    return [];
  }, [colors, pieData]);

  const options = React.useMemo(
    () => ({
      legend: {
        display: showLegend,
        position: position
      },
      title: {
        display: true,
        text: pieData?.datasets?.[0]?.label || '',
        font: {
          weight: 'normal'
        }
      }
    }),
    [pieData?.datasets, position, showLegend]
  );

  return (
    <R2ChartPie
      pieData={{...pieData, datasets: dataDestructured}}
      options={options}
    />
  );
};

export default CustomPieChart;
