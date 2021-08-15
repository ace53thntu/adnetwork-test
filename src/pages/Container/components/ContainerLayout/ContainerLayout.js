import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router-dom';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

// redux actions

import {ContainerProvider} from '../../context';

function ContainerLayout({children}) {
  const reduxDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  return (
    <ContainerProvider>
      <Outlet />
    </ContainerProvider>
  );
}

export default ContainerLayout;
