import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const ReportDashboard = lazyWithRetry(() =>
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
