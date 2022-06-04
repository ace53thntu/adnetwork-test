import {ErrorBoundary} from 'components/common';
//---> Internal Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
//---> Build-in Modules
import React from 'react';
//---> External Modules
import {Outlet} from 'react-router-dom';

const AudienceLayout = () => {
  return (
    <ErrorBoundary>
      {/*      <ExtendSidebar
        heading={<NavLink to="/audiences">{t('audiences')}</NavLink>}
      >
        <div className="mb-2">
          <Input placeholder="Search..." disabled />
        </div>
        <div className="divider" />
        <div className="border mb-2">
          <AudienceSidebar />
        </div>
      </ExtendSidebar>*/}

      <AppContent>
        <Outlet />
      </AppContent>
    </ErrorBoundary>
  );
};

export default React.memo(AudienceLayout);
