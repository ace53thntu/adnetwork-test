import {INPUT_NAME} from 'constants/report';
import {parseColors} from 'pages/entity-report/utils';
import React from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {R2ChartPie} from '../charts';

const CustomPieChart = ({series}) => {
  const {control} = useFormContext();
  const color = useWatch({control, name: INPUT_NAME.COLOR});

  const colorParsed = parseColors(color);
  return <R2ChartPie series={series} color={colorParsed} />;
};

export default CustomPieChart;
