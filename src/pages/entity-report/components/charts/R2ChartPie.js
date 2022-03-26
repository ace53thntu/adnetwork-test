//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Pie} from 'react-chartjs-2';

//---> Internal Modules

const propTypes = {
  series: PropTypes.array,
  color: PropTypes.array
};

const R2ChartPie = ({pieData}) => {
  const options = React.useMemo(
    () => ({
      legend: {
        display: true
      },
      title: {
        display: true,
        text: pieData?.datasets?.[0]?.label || '',
        font: {
          weight: 'normal'
        }
      }
    }),
    [pieData?.datasets]
  );

  return <Pie data={pieData} options={options} />;
};

R2ChartPie.propTypes = propTypes;

export default React.memo(R2ChartPie);
