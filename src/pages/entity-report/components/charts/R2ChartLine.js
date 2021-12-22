import React from 'react';
import {Line} from 'react-chartjs-2';

const R2ChartLine = ({data, options}) => (
  <>
    <Line data={data} options={options} />
  </>
);

export default React.memo(R2ChartLine);
