//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';
import {Card, CardBody, Col, Row} from 'reactstrap';
import _ from 'lodash';

//---> Internal Modules
import {
  DEFAULT_TIME_UNIT,
  REPORT_INPUT_NAME,
  METRIC_SETS,
  ChartTypes
} from 'constants/report';
import {
  setChartColorSelectedRedux,
  useChartModeSelector,
  useChartTypeSelectedSelector,
  useIsChartCompareSelector,
  useMetricsBodySelector
} from 'store/reducers/entity-report';
import {useGetMetrics} from 'queries/metric/useGetMetrics';
import {useChartData} from '../hooks';
import {QueryStatuses} from 'constants/react-query';
import NoDataAvailable from 'components/list/no-data';
import {initializingColors} from '../utils/parseColors';
import {useTranslation} from 'react-i18next';
import {CustomBarChart, CustomLineChart, CustomPieChart} from './report-chart';
import {useDispatch} from 'react-redux';

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
  color
}) => {
  const metricRequestRedux = useMetricsBodySelector();
  const [currentMetricRequest, setCurrentMetricRequest] = React.useState({});
  const {data: metrics, status, isFetching} = useGetMetrics({
    data: currentMetricRequest,
    reportId,
    enabled: !!reportId && Object.keys(currentMetricRequest).length > 0
  });

  React.useEffect(() => {
    if (!_.isEqual(metricRequestRedux, currentMetricRequest)) {
      setCurrentMetricRequest(metricRequestRedux);
    }
  }, [currentMetricRequest, metricRequestRedux]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (status === QueryStatuses.ERROR) {
    return <NoDataAvailable />;
  }

  return (
    <ChartPreviewContent
      metrics={metrics}
      unit={currentMetricRequest?.time_unit}
      timeRange={currentMetricRequest?.time_range}
      metricSet={metricSet}
      entityId={currentMetricRequest?.report_by_uuid}
      color={color}
    />
  );
};

ChartPreview.propTypes = propTypes;

const ChartPreviewContent = React.memo(
  ({metrics, unit, timeRange, metricSet, entityId, color}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const chartTypeRedux = useChartTypeSelectedSelector();
    console.log(
      '🚀 ~ file: ChartPreview.js ~ line 88 ~ chartTypeRedux',
      chartTypeRedux
    );
    const isChartCompare = useIsChartCompareSelector();
    const chartMode = useChartModeSelector();
    const chartData = useChartData({
      metrics,
      unit,
      timeRange,
      metricSet,
      entityId,
      chartType: chartTypeRedux,
      chartMode
    });

    const colors = initializingColors({
      sizeOfData: chartData?.labels?.length,
      existedColors: color,
      charType: chartTypeRedux
    });

    const {watch} = useFormContext();
    const selectedType = watch(
      `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`
    );

    React.useEffect(
      function setColorValue() {
        dispatch(setChartColorSelectedRedux(colors));
      },
      [colors, dispatch]
    );

    return (
      <Row className="chart-preview">
        <Col sm="12">
          <Card>
            <CardBody
              style={{
                padding: 10,
                width: selectedType === ChartTypes.PIE ? '80%' : '100%',
                margin: '0 auto'
              }}
            >
              {selectedType === ChartTypes.BAR && isChartCompare && (
                <CustomBarChart barData={chartData} colors={colors} />
              )}
              {selectedType === ChartTypes.PIE && (
                <CustomPieChart pieData={chartData} colors={colors} />
              )}
              {[ChartTypes.LINE, ChartTypes.MULTILINE, ChartTypes.BAR].includes(
                selectedType
              ) &&
                !isChartCompare && (
                  <CustomLineChart
                    series={chartData?.series}
                    categories={chartData?.categories}
                    nameOfSeries={
                      METRIC_SETS?.[metricSet?.code]?.label || t('noLabel')
                    }
                    unit={unit || DEFAULT_TIME_UNIT}
                    metricSet={metricSet}
                  />
                )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
);

export default ChartPreview;
