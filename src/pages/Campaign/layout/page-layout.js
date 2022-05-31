import { ErrorBoundary } from 'components/common';
import AppContent from 'components/layouts/Admin/components/AppContent';
import * as React from 'react';
import { Outlet } from 'react-router';

function CampaignPageLayout(props) {
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
