import {METRIC_TIMERANGES} from 'constants/report';
import React, {memo} from 'react';
import {Badge} from 'reactstrap';
import {getListTimeZone} from 'utils/helpers/getListTimezone';

const MetricInfo = ({
  timeRange,
  unit,
  reportSource,
  reportBy,
  reportType,
  timeZone
}) => {
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
          Report source:
        </span>
        <Badge color="light" style={{backgroundColor: '#e0f2ff'}}>
          {reportSource}
        </Badge>
      </div>
      <div className="mr-3">
        <span className="mr-1" style={{fontSize: 12}}>
          Report type:
        </span>
        <Badge color="light" style={{backgroundColor: '#e0f2ff'}}>
          {reportType}
        </Badge>
      </div>
      <div className="mr-3">
        <span className="mr-1" style={{fontSize: 12}}>
          Report by:
        </span>
        <Badge color="light" style={{backgroundColor: '#e0f2ff'}}>
          {reportBy}
        </Badge>
      </div>
      <div className="mr-3">
        <span className="mr-1" style={{fontSize: 12}}>
          Time zone:
        </span>
        <Badge color="light" style={{backgroundColor: '#e0f2ff'}}>
          {getListTimeZone().find(item => parseInt(item.value) === timeZone)
            ?.label || 'UTC+7'}
        </Badge>
      </div>
    </div>
  );
};

export default memo(MetricInfo);
