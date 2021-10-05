import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Input} from 'reactstrap';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

import ContainerTree from '../Tree';
import './style.scss';

export default function ContainerSidebar() {
  console.log('xxxx');
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

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
        <ContainerTree />
      </div>
    </ExtendSidebar>
  );
}
