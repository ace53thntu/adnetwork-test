//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useFormContext, useWatch} from 'react-hook-form';

//---> Build-in Modules
import {R2ChartPie} from '../charts';
import {REPORT_INPUT_NAME} from 'constants/report';
import {parseColors} from 'pages/entity-report/utils';

const CustomPieChart = ({series}) => {
  const {control} = useFormContext();
  const color = useWatch({
    control,
    name: `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`
  });

  const colorParsed = parseColors(color);
  return <R2ChartPie series={series} color={colorParsed} />;
};

export default CustomPieChart;
