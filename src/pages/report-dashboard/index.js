import React from 'react';
import Loading from 'components/common/loading';

const ReportDashboard = React.lazy(() => import('./ReportDashboard'));

function ReportDashboardPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <ReportDashboard />
    </React.Suspense>
  );
}

export {ReportDashboardPage};
