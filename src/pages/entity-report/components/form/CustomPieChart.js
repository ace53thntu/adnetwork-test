//---> Build-in Modules
import React from 'react';

//---> External Modules

//---> Build-in Modules
import {R2ChartPie} from '../charts';

const CustomPieChart = ({pieData, colors = []}) => {
  const dataDestructured = React.useMemo(() => {
    if (pieData) {
      return pieData?.datasets?.map(item => {
        return {...item, backgroundColor: colors};
      });
    }
    return [];
  }, [colors, pieData]);

  return (
    <R2ChartPie
      pieData={{...pieData, datasets: dataDestructured}}
      colors={colors}
    />
  );
};

export default CustomPieChart;
