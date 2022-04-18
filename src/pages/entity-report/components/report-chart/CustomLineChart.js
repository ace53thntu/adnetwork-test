//---> Build-in Modules
import React from 'react';

//---> External Modules

//---> Internal Modules
import {TimeUnits, FORMAT_BY_UNIT_LABEL} from 'constants/report';
import {R2ChartLine} from '../charts';
import {useChartOptions} from 'pages/entity-report/hooks/useChartOptions';

const initChartData = {
  labels: [],
  datasets: []
};

export default function CustomLineChart({
  // series = [],
  // categories = [],
  // nameOfSeries = '',
  unit = TimeUnits.DAY,
  // metricSet = []
  data = initChartData
}) {
  // const {watch, control} = useFormContext();
  // const color = useWatch({
  //   control,
  //   name: `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`
  // });
  // const chartType =
  //   watch(`${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`) ||
  //   ChartTypes.LINE;
  // const convertUnit = unit;
  // const formatDateStr = FORMAT_BY_UNIT[convertUnit];
  // const colorParsed = parseColors(color);
  // const {data: chartData, options} = useConfigChart({
  //   chartData: series,
  //   unit: convertUnit,
  //   format: formatDateStr,
  //   type: chartType,
  //   color: colorParsed,
  //   metricSet
  // });
  const formatDateStr = FORMAT_BY_UNIT_LABEL[unit];
  const options = useChartOptions({format: formatDateStr, unit});

  return <R2ChartLine data={data} options={options} />;
}
