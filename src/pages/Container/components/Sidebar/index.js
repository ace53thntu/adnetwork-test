import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
import React from 'react';
import { Input } from 'reactstrap';
import { ContainersTree } from '../Tree';

import './style.scss';

export default function ContainerSidebar() {

  const onHandleChangeSearch = () => {
    console.log('onHandleChangeSearch');
  };

  return (
    <ExtendSidebar
      heading="Container"
      classes="aic-sidebar"
      isLink
      path="/container"
    >
      <div className="mb-2">
        <Input
          placeholder="Search..."
          onChange={onHandleChangeSearch}
          disabled
        />
      </div>
      <div className="border mb-2">
        <ContainersTree />
      </div>
    </ExtendSidebar>
  );
}
