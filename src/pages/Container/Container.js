import React from 'react';
import { Outlet } from 'react-router-dom';
import { ContainerProvider } from './context';
import AppContent from 'components/layouts/Admin/components/AppContent';
import ContainerSidebar from './components/Sidebar';

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
