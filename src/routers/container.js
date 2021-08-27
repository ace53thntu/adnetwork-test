import React from 'react';
import {Containers, ContainerLayout, ContainerDetail} from 'pages/Container';
import ContainerTreeTags from 'pages/Container/components/ContainerTree/ContainerTreeTags';
import ContainerTreePages from 'pages/Container/components/ContainerTree/ContainerTreePages';
// import {ROLES} from 'core/constants';

// const {MANAGER, TRADER} = ROLES;

export const containerPages = {
  path: 'container',
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
      path: ':cid/:tag',
      element: <ContainerTreeTags />
      // canAccess: [MANAGER, TRADER]
    },
    {
      path: ':cid/:tag/:pageId',
      element: <ContainerTreePages />
      // canAccess: [MANAGER, TRADER]
    }
  ]
};
