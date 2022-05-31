//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useParams} from 'react-router';
import {useDispatch} from 'react-redux';

//---> Internal Modules
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {useGetReportPage} from 'queries/report-page';
import {PageTitleAlt} from 'components/layouts/Admin/components';
import './_main.scss';

const ReportLayout = ({children}) => {
  const reduxDispatch = useDispatch();
  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);
  const {pageId} = useParams();

  const {data: pageDetails} = useGetReportPage(pageId);

  return (
    <>
      {/*<ExtendSidebar heading="Report Page" isLink path={'/dashboard'}>
        <div className="mb-2">
          <ReportSidebar pageId={pageId} />
        </div>
      </ExtendSidebar>*/}

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
