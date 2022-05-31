import {ErrorBoundary} from 'components/common';
import AppContent from 'components/layouts/Admin/components/AppContent';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

function CampaignPageLayout(props) {
  const reduxDispatch = useDispatch();
  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  return (
    <ErrorBoundary>
      <AppContent>
        <Outlet />
      </AppContent>
    </ErrorBoundary>
  );
}

CampaignPageLayout.propTypes = {};
CampaignPageLayout.defaultProps = {};

export default CampaignPageLayout;
