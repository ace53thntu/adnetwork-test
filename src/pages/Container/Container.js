import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Input} from 'reactstrap';
import {Outlet} from 'react-router-dom';

// redux actions

// layouts

// components
import {ContainerTree} from './components';
import {ContainerProvider} from './context';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import AppContent from 'components/layouts/Admin/components/AppContent';
import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';

function Container() {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  const onHandleChangeSearch = () => {
    console.log('onHandleChangeSearch');
  };

  return (
    <ContainerProvider>
      <ExtendSidebar heading="Containers">
        <div className="mb-2">
          <Input placeholder="Search..." onChange={onHandleChangeSearch} />
        </div>
        <div className="border mb-2">
          <ContainerTree />
        </div>
      </ExtendSidebar>
      <AppContent>
        <Outlet />
      </AppContent>
    </ContainerProvider>
  );
}

export default Container;
