import AppContent from 'components/layouts/Admin/components/AppContent';
import React from 'react';
import {Outlet} from 'react-router-dom';

import ContainerSidebar from './components/Sidebar';
import {ContainerProvider} from './context';

function Container() {
  return (
    <ContainerProvider>
      <ContainerSidebar />
      <AppContent customClass="custom-right-content">
        <Outlet />
      </AppContent>
    </ContainerProvider>
  );
}

export default Container;
