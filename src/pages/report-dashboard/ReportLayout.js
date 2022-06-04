import './_main.scss';

import {PageTitleAlt} from 'components/layouts/Admin/components';
//---> Internal Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
import {useGetReportPage} from 'queries/report-page';
//---> Build-in Modules
import React from 'react';
//---> External Modules
import {useParams} from 'react-router';

const ReportLayout = ({children}) => {
  const {pageId} = useParams();

  const {data: pageDetails} = useGetReportPage(pageId);

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={pageDetails?.name || 'Dashboard'}
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
