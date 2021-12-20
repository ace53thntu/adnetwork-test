import {RoutePaths} from 'constants/route-paths';
import {Containers, ContainerDetail, ContainerLayout} from 'pages/Container';
import {ContainerSource} from 'pages/Container/components/ContainerSource';
import {ContainerSourcePage} from 'pages/Container/components/ContainerSourcePage';
// import {ROLES} from 'core/constants';

// const {MANAGER, TRADER} = ROLES;

export const containerPages = {
  path: RoutePaths.CONTAINER,
  element: <ContainerLayout />,
  children: [
    {
      path: '',
      element: <Containers />
      // canAccess: [MANAGER, TRADER]
    },
    {
      path: ':cid',
      element: <ContainerDetail />
      // canAccess: [MANAGER, TRADER]
    },
    {
      path: ':cid/:source',
      element: <ContainerSource />
      // canAccess: [MANAGER, TRADER]
    },
    {
      path: ':cid/:source/:pageId',
      element: <ContainerSourcePage />
      // canAccess: [MANAGER, TRADER]
    }
  ]
};
