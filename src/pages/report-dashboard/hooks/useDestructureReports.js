import React from 'react';

export const useDestructureReports = ({reports}) => {
  return React.useMemo(() => {
    let reportData = reports;

    if (reportData && reportData.length) {
      return reportData.map(item => {
        const chartType = item?.properties?.config?.chart_type;
        return {...item, chartType};
      });
    }
    return [];
  }, [reports]);
};
