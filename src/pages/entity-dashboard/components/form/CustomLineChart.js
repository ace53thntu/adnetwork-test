//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useFormContext, useWatch} from 'react-hook-form';

//---> Internal Modules
import {FORMAT_BY_UNIT, INPUT_NAME} from 'constants/report';
import {R2ChartLine, R2ChartBar} from '../charts';
import {parseColors} from 'pages/entity-dashboard/utils';
import {useConfigChart} from 'pages/entity-dashboard/hooks';

export default function CustomLineChart({
  series = [],
  categories = [],
  nameOfSeries = '',
  unit = 'day',
  metricSet = []
}) {
  const {watch, control} = useFormContext();
  const color = useWatch({control, name: INPUT_NAME.COLOR});
  const chartType = watch(INPUT_NAME.CHART_TYPE) || 'line';
  const convertUnit = unit === 'fiveseconds' ? 'second' : unit;
  const formatDateStr = FORMAT_BY_UNIT[convertUnit];
  const colorParsed = parseColors(color);
  const {data: chartData, options} = useConfigChart({
    chartData: series,
    unit: convertUnit,
    format: formatDateStr,
    type: chartType,
    color: colorParsed,
    metricSet
  });

  return chartType === 'line' || chartType === 'multiline' ? (
    <R2ChartLine data={chartData} options={options} />
  ) : (
    <R2ChartBar data={chartData} options={options} />
  );
}
