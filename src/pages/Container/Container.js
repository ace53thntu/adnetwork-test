import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router-dom';
import {ContainerProvider} from './context';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import AppContent from 'components/layouts/Admin/components/AppContent';
import ContainerSidebar from './components/Sidebar';

function Container() {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

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
