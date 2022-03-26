//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Pie} from 'react-chartjs-2';

//---> Internal Modules

const propTypes = {
  pieData: PropTypes.any,
  position: PropTypes.string
};

const R2ChartPie = ({pieData, position = 'top'}) => {
  const options = React.useMemo(
    () => ({
      legend: {
        display: true,
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
    [pieData?.datasets, position]
  );

  return <Pie data={pieData} options={options} />;
};

R2ChartPie.propTypes = propTypes;

export default React.memo(R2ChartPie);
