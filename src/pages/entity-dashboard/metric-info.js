import {METRIC_TIMERANGES} from 'constants/report';
import React, {memo} from 'react';
import {Badge} from 'reactstrap';

const MetricInfo = ({timeRange, unit, distributionBy, metricType}) => {
  const timeRanges = METRIC_TIMERANGES.reduce((acc, item) => {
    const {value} = item;
    acc = {...acc, [value]: item};
    return acc;
  }, {});
  return (
    <div className="d-flex justify-content-center flex-wrap">
      <div className="mr-3">
        <span className="mr-1" style={{fontSize: 12}}>
          Time range:
        </span>
        <Badge color="light" style={{backgroundColor: '#e0f2ff'}}>
          {timeRanges[timeRange]?.label}
        </Badge>
      </div>
      <div className="mr-3">
        <span className="mr-1" style={{fontSize: 12}}>
          Unit:
        </span>
        <Badge color="light" style={{backgroundColor: '#e0f2ff'}}>
          {unit}
        </Badge>
      </div>
      <div className="mr-3">
        <span className="mr-1" style={{fontSize: 12}}>
          Distribution by:
        </span>
        <Badge color="light" style={{backgroundColor: '#e0f2ff'}}>
          {distributionBy}
        </Badge>
      </div>
      <div className="mr-3">
        <span className="mr-1" style={{fontSize: 12}}>
          Metric type:
        </span>
        <Badge color="light" style={{backgroundColor: '#e0f2ff'}}>
          {metricType}
        </Badge>
      </div>
    </div>
  );
};

export default memo(MetricInfo);