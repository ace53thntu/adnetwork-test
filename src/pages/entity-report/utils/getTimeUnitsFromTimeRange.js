import {METRIC_TIMERANGES} from 'constants/report';

export const getTimeUnitsFromTimeRange = ({timeRange}) => {
  if (timeRange) {
    const foundTimeRange = METRIC_TIMERANGES.find(
      timeRangeItem => timeRangeItem?.value === timeRange
    );
    return foundTimeRange?.units || [];
  }

  return [];
};
