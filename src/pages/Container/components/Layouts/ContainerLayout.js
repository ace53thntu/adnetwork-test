import {ErrorBoundary} from 'components/common';
import AppContent from 'components/layouts/Admin/components/AppContent';
import * as React from 'react';
import {Outlet} from 'react-router';

import {ContainerCreateModal} from '../ContainerCreate';

function ContainerLayout(props) {
  return (
    <ErrorBoundary>
      <ContainerCreateModal />

      <AppContent>
        <Outlet />
      </AppContent>
    </ErrorBoundary>
  );
}

ContainerLayout.propTypes = {};
ContainerLayout.defaultProps = {};

export default ContainerLayout;
