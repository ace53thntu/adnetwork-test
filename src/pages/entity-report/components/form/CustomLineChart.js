//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useFormContext, useWatch} from 'react-hook-form';

//---> Internal Modules
import {FORMAT_BY_UNIT, REPORT_INPUT_NAME, ChartTypes} from 'constants/report';
import {R2ChartLine, R2ChartBar} from '../charts';
import {parseColors} from 'pages/entity-report/utils';
import {useConfigChart} from 'pages/entity-report/hooks';

export default function CustomLineChart({
  series = [],
  categories = [],
  nameOfSeries = '',
  unit = 'day',
  metricSet = []
}) {
  const {watch, control} = useFormContext();
  const color = useWatch({
    control,
    name: `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`
  });
  const chartType =
    watch(`${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`) ||
    ChartTypes.LINE;
  const convertUnit = unit; //unit === 'fiveseconds' ? 'second' : unit;
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
