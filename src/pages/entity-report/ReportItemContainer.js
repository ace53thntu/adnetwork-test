//---> Buid-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';

//---> Internal Modules
import ReportItem from './report-item';
import {useGetMetrics} from 'queries/metric/useGetMetrics';
import {QueryStatuses} from 'constants/react-query';
import {getMetricRequestBody} from './utils/metricRequest';

const propTypes = {
  report: PropTypes.object
};

const ReportItemContainer = ({report}) => {
  return <ReportItemContent report={report} />;
};

ReportItemContainer.propTypes = propTypes;

const ReportItemContent = ({report}) => {
  const {source_uuid, report_source, uuid} = report;

  const requestBody = getMetricRequestBody({report});
  const {data: metricData, status, error, isFetching} = useGetMetrics({
    data: requestBody,
    reportId: uuid,
    enabled: !!uuid
  });

  if (status === QueryStatuses.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === QueryStatuses.ERROR) {
    return <div>Error: {error?.msg || 'Something went wrong.'}</div>;
  }

  return (
    <ReportItem
      entityId={source_uuid}
      entityType={report_source}
      reportItem={report}
      metrics={metricData}
      isFetching={isFetching}
    />
  );
};

export default ReportItemContainer;