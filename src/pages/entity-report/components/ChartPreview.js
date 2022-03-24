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
import CustomLineChart from './form/CustomLineChart';
import CustomPieChart from './form/CustomPieChart';
import {
  useChartTypeSelectedSelector,
  useMetricsBodySelector
} from 'store/reducers/entity-report';
import {useGetMetrics} from 'queries/metric/useGetMetrics';
import {useChartData} from '../hooks';
import {QueryStatuses} from 'constants/react-query';
import NoDataAvailable from 'components/list/no-data';
import {initializingColors} from '../utils/parseColors';

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
  entityId
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

  // if (true) {
  //   return <></>;
  // }

  return (
    <ChartPreviewContent
      metrics={metrics}
      unit={currentMetricRequest?.time_unit}
      timeRange={currentMetricRequest?.time_range}
      metricSet={metricSet}
      entityId={currentMetricRequest?.report_by_uuid}
    />
  );
};

ChartPreview.propTypes = propTypes;

const ChartPreviewContent = React.memo(
  ({metrics, unit, timeRange, metricSet, entityId}) => {
    const chartTypeRedux = useChartTypeSelectedSelector();
    console.log(
      '🚀 ~ file: ChartPreview.js ~ line 84 ~ chartTypeRedux',
      chartTypeRedux
    );
    const chartData = useChartData({
      metrics,
      unit,
      timeRange,
      metricSet,
      entityId,
      chartType: chartTypeRedux
    });
    console.log(
      '🚀 ~ file: ChartPreview.js ~ line 96 ~ chartTypeRedux',
      chartTypeRedux
    );
    console.log('🚀 ~ file: ChartPreview.js ~ line 88 ~ chartData', chartData);

    const colors = initializingColors({sizeOfData: chartData?.labels?.length});

    const {watch, setValue} = useFormContext();

    const selectedType = watch(
      `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`
    );

    React.useEffect(
      function setColorValue() {
        if (chartTypeRedux === ChartTypes.PIE) {
          setValue(
            `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`,
            JSON.stringify(colors)
          );
        }
      },
      [chartTypeRedux, colors, setValue]
    );

    return (
      <Row className="chart-preview">
        <Col sm="12">
          <Card>
            <CardBody
              style={{
                padding: 10,
                width: selectedType === 'pie' ? '450px' : '100%',
                margin: '0 auto'
              }}
            >
              {(selectedType === 'line' ||
                selectedType === 'multiline' ||
                selectedType === 'bar') && (
                <CustomLineChart
                  series={chartData?.series}
                  categories={chartData?.categories}
                  nameOfSeries={
                    METRIC_SETS?.[metricSet?.code]?.label || 'No label'
                  }
                  unit={unit || DEFAULT_TIME_UNIT}
                  metricSet={metricSet}
                />
              )}
              {selectedType === 'pie' && (
                <CustomPieChart
                  pieData={chartData}
                  nameOfSeries={
                    METRIC_SETS?.[metricSet?.code]?.label || 'No label'
                  }
                  unit={unit || DEFAULT_TIME_UNIT}
                  metricSet={metricSet}
                  colors={colors}
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
