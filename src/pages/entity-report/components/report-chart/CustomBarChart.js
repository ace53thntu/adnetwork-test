//---> Build-in Modules
import React from 'react';

//---> External Modules

//---> Build-in Modules
import {R2ChartBar} from '../charts';

const CustomBarChart = ({barData, colors = [], showXLabel = true}) => {
  const dataDestructured = React.useMemo(() => {
    if (barData) {
      return barData?.datasets?.map(item => {
        return {...item, backgroundColor: colors?.[0]};
      });
    }
    return [];
  }, [colors, barData]);

  const options = React.useMemo(
    () => ({
      scales: {
        xAxes: [
          {
            ticks: {
              display: showXLabel //this will remove only the label
            }
          }
        ]
      }
    }),
    [showXLabel]
  );

  return (
    <R2ChartBar
      data={{...barData, datasets: dataDestructured}}
      options={options}
    />
  );
};

export default CustomBarChart;
