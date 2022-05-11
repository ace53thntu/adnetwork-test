import {ErrorBoundary} from 'components/common';
import React from 'react';

const ReportDashboard = React.lazy(() =>
  import('./ReportDashboard' /* webpackChunkName: "report-dashboard" */)
);

function ReportDashboardPage() {
  return (
    <ErrorBoundary>
      <ReportDashboard />
    </ErrorBoundary>
  );
}

export {ReportDashboardPage};
