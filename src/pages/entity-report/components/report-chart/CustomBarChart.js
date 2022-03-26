//---> Build-in Modules
import React from 'react';

//---> External Modules

//---> Build-in Modules
import {R2ChartBar} from '../charts';

const CustomBarChart = ({barData, colors = []}) => {
  console.log(
    '🚀 ~ file: CustomBarChart.js ~ line 10 ~ CustomBarChart ~ colors',
    colors
  );
  const dataDestructured = React.useMemo(() => {
    if (barData) {
      return barData?.datasets?.map(item => {
        return {...item, backgroundColor: colors?.[0]};
      });
    }
    return [];
  }, [colors, barData]);
  console.log(
    '🚀 ~ file: CustomBarChart.js ~ line 18 ~ CustomBarChart ~ dataDestructured',
    dataDestructured
  );

  return <R2ChartBar data={{...barData, datasets: dataDestructured}} />;
};

export default CustomBarChart;
