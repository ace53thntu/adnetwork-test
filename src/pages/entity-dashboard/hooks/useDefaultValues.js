import {METRIC_TIMERANGES, METRIC_TYPE_OPTIONS} from 'constants/report';
import {getDistributions} from 'utils/metrics';
import React from 'react';

export const useDefaultValues = ({reportItem}) => {
  return React.useMemo(() => {
    const {api = {}, properties = {}} = reportItem;
    let {unit, time_range, distribution_by, metric_type} = api;
    time_range = METRIC_TIMERANGES.find(item => item.value === time_range);
    unit = time_range?.units?.find(item => item?.value === unit);
    distribution_by = getDistributions().find(
      item => item?.value === distribution_by
    );
    metric_type = METRIC_TYPE_OPTIONS.find(item => item?.value === metric_type);
    return {
      properties,
      api: {time_range, unit, distribution_by, metric_type}
    };
  }, [reportItem]);
};
