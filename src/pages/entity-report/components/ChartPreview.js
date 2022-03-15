//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext, useWatch} from 'react-hook-form';
import {Card, CardBody, Col, Row} from 'reactstrap';

//---> Internal Modules
import {DEFAULT_TIME_UNIT, INPUT_NAME, METRIC_SETS} from 'constants/report';
import CustomLineChart from './form/CustomLineChart';
import CustomPieChart from './form/CustomPieChart';
import {useMetricsBodySelector} from 'store/reducers/entity-report';
import _ from 'lodash';
import {useGetMetrics} from 'queries/metric/useGetMetrics';
import {useChartData} from '../hooks';
import {QueryStatuses} from 'constants/react-query';
import NoDataAvailable from 'components/list/no-data';

const propTypes = {
  chartData: PropTypes.object,
  metricSet: PropTypes.any,
  unit: PropTypes.string
};

const ChartPreview = ({reportId, metricSet, unit, timeRange, entityId}) => {
  const metricRequestRedux = useMetricsBodySelector();
  const [currentMetricRequest, setCurrentMetricRequest] = React.useState({});
  const {data: metrics, status} = useGetMetrics({
    data: currentMetricRequest,
    reportId,
    enabled: !!reportId && Object.keys(currentMetricRequest).length > 0
  });

  React.useEffect(() => {
    if (!_.isEqual(metricRequestRedux, currentMetricRequest)) {
      setCurrentMetricRequest(metricRequestRedux);
    }
  }, [currentMetricRequest, metricRequestRedux]);

  if (status === QueryStatuses.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === QueryStatuses.ERROR || QueryStatuses.IDLE) {
    return <NoDataAvailable />;
  }

  return (
    <ChartPreviewContent
      metrics={metrics}
      unit={unit}
      timeRange={timeRange}
      metricSet={metricSet}
      entityId={entityId}
    />
  );
};

ChartPreview.propTypes = propTypes;

const ChartPreviewContent = React.memo(
  ({metrics, unit, timeRange, metricSet, entityId}) => {
    const chartData = useChartData({
      metrics,
      unit,
      timeRange,
      metricSet,
      entityId
    });

    const {control} = useFormContext();
    const selectedType = useWatch({name: INPUT_NAME.CHART_TYPE, control});

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
                  series={chartData?.series}
                  categories={chartData?.categories}
                  nameOfSeries={
                    METRIC_SETS?.[metricSet?.code]?.label || 'No label'
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