import { ErrorBoundary } from 'components/common';
import AppContent from 'components/layouts/Admin/components/AppContent';
// import PropTypes from 'prop-types';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';


function CreativeLayout(props) {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      {/*<ExtendSidebar
        heading={<NavLink to="/creative">{t('creativeManagement')}</NavLink>}
      >
        <div className="mb-2">
          <Input
            placeholder="Search..."
            // onChange={onHandleChangeSearch}
            disabled
          />
        </div>
        <div className="divider" />
        <div className="border mb-2">
          <ErrorBoundary>
            <AdvertisersTree />
          </ErrorBoundary>
        </div>
      </ExtendSidebar>*/}

      <AppContent>
        <Outlet />
      </AppContent>
    </ErrorBoundary>
  );
}

CreativeLayout.propTypes = {};
CreativeLayout.defaultProps = {};

export default CreativeLayout;
