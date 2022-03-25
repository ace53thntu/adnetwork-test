//---> Build-in Modules
import React from 'react';

//---> External Modules

//---> Build-in Modules
import {R2ChartBar} from '../charts';

const CustomBarChart = ({barData, colors = []}) => {
  const dataDestructured = React.useMemo(() => {
    if (barData) {
      return barData?.datasets?.map(item => {
        return {...item, backgroundColor: colors?.[0]};
      });
    }
    return [];
  }, [colors, barData]);

  return <R2ChartBar data={{...barData, datasets: dataDestructured}} />;
};

export default CustomBarChart;
