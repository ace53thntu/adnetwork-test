import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useNavigate} from 'react-router-dom';
import {ContainerProvider} from './context';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import AppContent from 'components/layouts/Admin/components/AppContent';
import ContainerSidebar from './components/Sidebar';
import {CONTAINER_VIEWS} from 'store/reducers/container';

function Container() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const {
    selectedContainer,
    selectedPage,
    selectedInventory,
    view
  } = useSelector(state => state.containerReducer);
  console.log(
    '🚀 ~ file: Container.js ~ line 16 ~ Container ~ selectedContainer',
    selectedContainer
  );
  console.log(
    '🚀 ~ file: Container.js ~ line 14 ~ Container ~ selectedPage',
    selectedPage
  );
  console.log(
    '🚀 ~ file: Container.js ~ line 14 ~ Container ~ selectedInventory',
    selectedInventory
  );

  useEffect(() => {
    if (view === CONTAINER_VIEWS.contaienrDetail) {
      navigate(`/container/${selectedContainer}`);
    } else if (view === CONTAINER_VIEWS.pageDetail) {
      // navigate(`/container/${selectedContainer}//${selectedPage}`);
    } else if (view === CONTAINER_VIEWS.inventoryDetail) {
      // navigate(`/campaigns/${selectedCampaign}/strategy/${selectedInventory}`);
    }
  }, [navigate, selectedContainer, selectedInventory, selectedPage, view]);

  useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

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
