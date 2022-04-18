import React from 'react';
import _ from 'lodash';
import {ReportGroupTypes} from '../constants.js';
import {PUBLISHER_REPORT_VIEW_TYPES, REPORT_VIEW_TYPES} from 'constants/report';

const destructuredAdvertiserMetricTypes = (advertiserMetricTypes = []) => {
  return advertiserMetricTypes.reduce((acc, item) => {
    acc = [...acc, ...item.options];
    return acc;
  }, []);
};

export const useMappingMetricSet = ({metricSet, reportGroup}) => {
  return React.useMemo(() => {
    let result = [];
    if (_.isArray(metricSet)) {
      const metricSetList =
        reportGroup === ReportGroupTypes.ADVERTISER
          ? destructuredAdvertiserMetricTypes(REPORT_VIEW_TYPES)
          : PUBLISHER_REPORT_VIEW_TYPES;

      result = metricSet.map(item => {
        const foundMappingMetricSet = metricSetList.find(
          metricSetItem => metricSetItem.code === item.code
        );
        if (foundMappingMetricSet) {
          return {
            ...foundMappingMetricSet,
            code: foundMappingMetricSet?.code_name
          };
        }
        return null;
      });
    }
    return result;
  }, [metricSet, reportGroup]);
};
