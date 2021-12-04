//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Pie} from 'react-chartjs-2';
import {usePieChart} from 'pages/EntityReport/hooks';

//---> Internal Modules

const propTypes = {
  series: PropTypes.array,
  color: PropTypes.array
};

const R2ChartPie = ({series = [], color = []}) => {
  const data = usePieChart({series, color});
  return <Pie data={data} />;
};

R2ChartPie.propTypes = propTypes;

export default React.memo(R2ChartPie);
