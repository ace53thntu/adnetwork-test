import {ErrorBoundary} from 'components/common';
//---> Internal Modules
import AppContent from 'components/layouts/Admin/components/AppContent';
import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
//---> Build-in Modules
import React from 'react';
//---> External Modules
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {NavLink, Outlet} from 'react-router-dom';
import {Input} from 'reactstrap';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

import {AudienceSidebar} from '../audience-sidebar';

const AudienceLayout = () => {
  const {t} = useTranslation();
  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  return (
    <ErrorBoundary>
      <ExtendSidebar
        heading={<NavLink to="/audiences">{t('audiences')}</NavLink>}
      >
        <div className="mb-2">
          <Input placeholder="Search..." disabled />
        </div>
        <div className="divider" />
        <div className="border mb-2">
          <AudienceSidebar />
        </div>
      </ExtendSidebar>

      <AppContent>
        <Outlet />
      </AppContent>
    </ErrorBoundary>
  );
};

export default React.memo(AudienceLayout);
