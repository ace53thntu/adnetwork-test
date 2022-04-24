//---> Build-in Modules
import React from 'react';

//---> Build-in Modules
import {R2ChartBar} from '../charts';
import {useChartOptions} from 'pages/entity-report/hooks/useChartOptions';
import {FORMAT_BY_UNIT_LABEL, TimeUnits} from 'constants/report';

const CustomBarChart = ({
  data,
  colors = [],
  showXLabel = true,
  unit = TimeUnits.DAY
}) => {
  const dataDestructured = React.useMemo(() => {
    if (data) {
      return data?.datasets?.map(item => {
        if (unit === TimeUnits.GLOBAL) {
          return {...item, backgroundColor: colors};
        }
        return item;
      });
    }
    return [];
  }, [colors, data, unit]);

  const optionsCompare = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const formatDateStr = FORMAT_BY_UNIT_LABEL[unit];

  const options = useChartOptions({format: formatDateStr, unit});

  return (
    <R2ChartBar
      data={{...data, datasets: dataDestructured}}
      options={unit === TimeUnits.GLOBAL ? optionsCompare : options}
    />
  );
};

export default CustomBarChart;
