// Build-in Modules
import React, {memo} from 'react';

// Internl Modules
import AppContent from 'layouts/Admin/components/AppContent';
import './_main.scss';
import ReportSidebar from './components/ReportSidebar';
import ReportList from './components/ReportList';
import {useParams} from 'react-router';
import {useGetReportPage} from 'core/queries/report-page/useGetReportPage';
import {PageTitleAlt} from 'components/layouts/Admin/components';

const ReportDashboard = () => {
  const {pageId} = useParams();
  const {data: pageDetails} = useGetReportPage(pageId);

  return (
    <>
      <ReportSidebar pageId={pageId} />
      <AppContent>
        <PageTitleAlt
          heading={pageDetails?.name}
          subheading=""
          icon="pe-7s-graph2 icon-gradient bg-mean-fruit"
          hideBreadcrumb
        />
        <ReportList />
      </AppContent>
    </>
  );
};

export default memo(ReportDashboard);
