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
  return <Pie data={pieData} />;
};

R2ChartPie.propTypes = propTypes;

export default React.memo(R2ChartPie);
