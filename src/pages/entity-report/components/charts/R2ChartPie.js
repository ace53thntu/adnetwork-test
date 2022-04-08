//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Pie} from 'react-chartjs-2';

//---> Internal Modules

const propTypes = {
  pieData: PropTypes.object,
  options: PropTypes.object
};

const R2ChartPie = ({pieData, options}) => {
  return <Pie data={pieData} options={options} width="100%" height="250px" />;
};

R2ChartPie.propTypes = propTypes;

export default React.memo(R2ChartPie);
