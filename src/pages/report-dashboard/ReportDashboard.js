// Build-in Modules
import React from 'react';

// Internl Modules
import './_main.scss';
import ReportList from './components/ReportList';
import {useParams} from 'react-router';
import ReportLayout from './ReportLayout';
import {useGetReportPage} from 'queries/report-page';

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
