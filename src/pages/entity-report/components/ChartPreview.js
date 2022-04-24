//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';
import {Card, CardBody, Col, Row} from 'reactstrap';

//---> Internal Modules
import {REPORT_INPUT_NAME, ChartTypes} from 'constants/report';
import {useChartModeSelector} from 'store/reducers/entity-report';
import {useGetMetrics} from 'queries/metric/useGetMetrics';
import {
  useChartData,
  useGetMetricBody,
  useIsChartCompareInForm
} from '../hooks';
import {QueryStatuses} from 'constants/react-query';
import NoDataAvailable from 'components/list/no-data';
import {initColors} from '../utils/parseColors';
import {CustomBarChart, CustomLineChart, CustomPieChart} from './report-chart';
import {useMappingMetricSet} from '../hooks/useMappingMetricSet';
import {PublisherReportBys, ReportGroupTypes} from '../constants.js';
import {convertColors} from '../utils';
import {parseColors as parseColorsFn} from 'pages/entity-report/utils';

const propTypes = {
  chartData: PropTypes.object,
  metricSet: PropTypes.any,
  unit: PropTypes.string
};

const ChartPreview = ({
  reportId = 'create',
  metricSet,
  unit,
  timeRange,
  entityId,
  reportSource,
  defaultColors,
  sourceUuid
}) => {
  const {metricBody: metricRequestBody, enableCallMetric} = useGetMetricBody({
    sourceUuid
  });

  const {data: metrics, status, isFetching} = useGetMetrics({
    data: metricRequestBody,
    reportId,
    enabled: !!reportId && enableCallMetric
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (status === QueryStatuses.ERROR) {
    return <NoDataAvailable />;
  }
  return (
    <ChartPreviewContent
      metrics={metrics}
      unit={metricRequestBody?.time_unit}
      timeRange={metricRequestBody?.time_range}
      metricSet={metricSet}
      entityId={metricRequestBody?.report_by_uuid}
      reportSource={reportSource}
      defaultColors={defaultColors}
    />
  );
};

ChartPreview.propTypes = propTypes;

const ChartPreviewContent = ({
  metrics,
  unit,
  timeRange,
  metricSet,
  entityId,
  reportSource,
  defaultColors
}) => {
  const {watch, setValue} = useFormContext();
  const isChartCompare = useIsChartCompareInForm();
  const chartMode = useChartModeSelector();
  const chartTypeSelected = watch(
    `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`
  );
  const colorsSelected = watch(
    `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`
  );
  const parseColorsNoCompare = parseColorsFn(colorsSelected);
  const reportGroup = PublisherReportBys.map(item => item.value).includes(
    reportSource
  )
    ? ReportGroupTypes.PUBLISHER
    : ReportGroupTypes.ADVERTISER;
  const mappingMetricSets = useMappingMetricSet({metricSet, reportGroup});
  const colorsConverted = convertColors({colors: defaultColors});

  const chartData = useChartData({
    metrics,
    unit,
    metricSet: mappingMetricSets,
    entityId,
    chartType: chartTypeSelected,
    chartMode,
    colors: parseColorsNoCompare
  });
  console.log('🚀 ~ file: ChartPreview.js ~ line 118 ~ chartData', chartData);

  // const colors = React.useMemo(
  //   () =>
  //     initializingColors({
  //       sizeOfData: chartData?.labels?.length,
  //       existedColors: colorsConverted,
  //       isChartCompare
  //     }),
  //   [chartData?.labels?.length, colorsConverted, isChartCompare]
  // );
  // TODO: Check if data length > color length
  const colors = React.useMemo(() => {
    if (colorsConverted && colorsConverted?.length) {
      return colorsConverted;
    }
    return initColors({
      sizeOfData: chartData?.labels?.length
    });
  }, [chartData?.labels?.length, colorsConverted]);

  React.useEffect(() => {
    if (isChartCompare && JSON.stringify(colors) !== colorsSelected) {
      setValue(
        `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`,
        JSON.stringify(colors)
      );
    }
  }, [colors, colorsSelected, isChartCompare, setValue]);

  if (!chartData) {
    return <div>No data</div>;
  }

  return (
    <Row className="chart-preview">
      <Col sm="12">
        <Card>
          <CardBody
            style={{
              padding: 10,
              width: chartTypeSelected === ChartTypes.PIE ? '80%' : '100%',
              margin: '0 auto'
            }}
          >
            {chartTypeSelected === ChartTypes.BAR && isChartCompare && (
              <CustomBarChart data={chartData} colors={colors} unit={unit} />
            )}
            {chartTypeSelected === ChartTypes.PIE && (
              <CustomPieChart pieData={chartData} colors={colors} />
            )}
            {[ChartTypes.LINE, ChartTypes.MULTILINE].includes(
              chartTypeSelected
            ) &&
              !isChartCompare && (
                <CustomLineChart data={chartData} unit={unit} />
              )}
            {[ChartTypes.BAR].includes(chartTypeSelected) &&
              !isChartCompare && (
                <CustomBarChart
                  data={chartData}
                  showXLabel={false}
                  colors={colors}
                  unit={unit}
                />
              )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ChartPreview;
