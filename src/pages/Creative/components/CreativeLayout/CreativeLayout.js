import {ErrorBoundary} from 'components/common';
import AppContent from 'components/layouts/Admin/components/AppContent';
import * as React from 'react';
import {Outlet} from 'react-router-dom';

function CreativeLayout(props) {
  return (
    <ErrorBoundary>
      <AppContent>
        <Outlet />
      </AppContent>
    </ErrorBoundary>
  );
}

CreativeLayout.propTypes = {};
CreativeLayout.defaultProps = {};

export default CreativeLayout;
