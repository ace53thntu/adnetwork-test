import './_main.scss';

import {PageTitleAlt} from 'components/layouts/Admin/components';
// Internl Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
// import {useGetReportPage} from 'queries/report-page';
// Build-in Modules
import React from 'react';
import {useDispatch} from 'react-redux';
// External Modules
import {useParams} from 'react-router';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

import ReportSidebar from './components/ReportSidebar';

const ReportLayout = ({children}) => {
  const reduxDispatch = useDispatch();
  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);
  const {pageId} = useParams();

  // const {data: pageDetails} = useGetReportPage(pageId);

  return (
    <>
      <ExtendSidebar heading="Report Page" isLink path={'/dashboard'}>
        <div className="mb-2">
          <ReportSidebar pageId={pageId} />
        </div>
      </ExtendSidebar>

      <AppContent>
        <PageTitleAlt
          // heading={pageDetails?.name || 'Dashboard'}
          heading="Ahehehe"
          subheading=""
          icon="pe-7s-graph2 icon-gradient bg-mean-fruit"
          hideBreadcrumb
        />
        {children}
      </AppContent>
    </>
  );
};

export default React.memo(ReportLayout);
