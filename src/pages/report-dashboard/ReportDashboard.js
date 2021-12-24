// Internl Modules
import './_main.scss';

import {useGetReportPage} from 'queries/report-page';
// Build-in Modules
import React from 'react';
import {useParams} from 'react-router';

import ReportLayout from './ReportLayout';
import ReportList from './components/ReportList';

const ReportDashboard = () => {
  const {pageId} = useParams();
  const {data: pageDetails} = useGetReportPage(pageId);

  return (
    <ReportLayout>
      <ReportList pageDetails={pageDetails} />
    </ReportLayout>
  );
};

export default React.memo(ReportDashboard);
