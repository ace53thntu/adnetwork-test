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

const propTypes = {
  chartData: PropTypes.object,
  metricSet: PropTypes.any,
  unit: PropTypes.string
};

const ChartPreview = ({chartData, metricSet, unit}) => {
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
};

ChartPreview.propTypes = propTypes;

export default React.memo(ChartPreview);
