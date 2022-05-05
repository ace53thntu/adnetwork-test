//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';

//---> Internal Modules
import ReportItem from './components/report-item/ReportItem';
import {useGetMetrics} from 'queries/metric/useGetMetrics';
import {QueryStatuses} from 'constants/react-query';
import {getMetricRequestBody} from './utils/metricRequest';

const propTypes = {
  report: PropTypes.object,
  noEdit: PropTypes.bool
};

const ReportItemContainer = ({
  report,
  handleSelectedReport = () => null,
  noEdit = false
}) => {
  return (
    <ReportItemContent
      report={report}
      handleSelectedReport={handleSelectedReport}
      noEdit={noEdit}
    />
  );
};

ReportItemContainer.propTypes = propTypes;

const ReportItemContent = ({
  report,
  handleSelectedReport = () => null,
  noEdit = false
}) => {
  const {source_uuid, report_source, uuid} = report;

  const requestBody = getMetricRequestBody({report});
  const {data: metricData, status, isFetching} = useGetMetrics({
    data: requestBody,
    reportId: uuid,
    enabled: !!uuid
  });

  if (status === QueryStatuses.LOADING) {
    return <div>Loading...</div>;
  }

  return (
    <ReportItem
      entityId={source_uuid}
      entityType={report_source}
      reportItem={report}
      metrics={metricData}
      isFetching={isFetching}
      handleSelectedReport={handleSelectedReport}
      noEdit={noEdit}
    />
  );
};

export default ReportItemContainer;
