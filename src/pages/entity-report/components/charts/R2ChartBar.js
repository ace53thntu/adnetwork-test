import React from 'react';
import {Bar} from 'react-chartjs-2';
import 'chartjs-adapter-moment';
const R2ChartBar = ({data, options}) => <Bar data={data} options={options} />;

export default React.memo(R2ChartBar);
