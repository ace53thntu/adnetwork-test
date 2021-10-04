import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router-dom';

// redux actions

// layouts

// components
// import {ContainerTree} from './components';
import {ContainerProvider} from './context';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import AppContent from 'components/layouts/Admin/components/AppContent';
// import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
import ContainerSidebar from './components/Sidebar';
function Container() {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  // const onHandleChangeSearch = () => {
  //   console.log('onHandleChangeSearch');
  // };

  return (
    <ContainerProvider>
      <ContainerSidebar />
      <AppContent>
        <Outlet />
      </AppContent>
    </ContainerProvider>
  );
}

export default Container;
