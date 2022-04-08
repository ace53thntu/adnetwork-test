//---> Build-in Modules
import {FORMAT_BY_UNIT_LABEL, TimeUnits} from 'constants/report';
import {useChartOptions} from 'pages/entity-report/hooks/useChartOptions';
import React from 'react';

//---> External Modules

//---> Build-in Modules
import {R2ChartBar} from '../charts';

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
          return {...item, backgroundColor: colors?.[0]};
        }
        return item;
      });
    }
    return [];
  }, [colors, data, unit]);

  // const options = React.useMemo(
  //   () => ({
  //     scales: {
  //       x: {
  //         ticks: {
  //           display: showXLabel //this will remove only the label
  //         }
  //       }
  //     }
  //   }),
  //   [showXLabel]
  // );
  const formatDateStr = FORMAT_BY_UNIT_LABEL[unit];
  const options = useChartOptions({format: formatDateStr});

  return (
    <R2ChartBar
      data={{...data, datasets: dataDestructured}}
      options={options}
    />
  );
};

export default CustomBarChart;
