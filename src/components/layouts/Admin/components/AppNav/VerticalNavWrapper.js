import React from 'react';
import {useTranslation} from 'react-i18next';
import MetisMenu from 'react-metismenu';
import {
  AudiencesNav,
  CampaignNav,
  ContainerNav,
  CreativeNav,
  InventoryMarketNav,
  OrganizationNav,
  ReportNav,
  UserManagementNav
} from 'routers/navigators';

import DefaultLink from './DefaultLink';

const Nav = ({role}) => {
  const {t} = useTranslation();

  return (
    <>
      <>
        <MetisMenu
          content={ReportNav(t)}
          // activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
          LinkComponent={DefaultLink}
        />
        <div className="divider" />
      </>
      <>
        <MetisMenu
          content={AudiencesNav(t)}
          // activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
          // onSelected={onSelected}
          LinkComponent={DefaultLink}
        />
        <div className="divider" />
      </>
      <>
        <MetisMenu
          content={CreativeNav(t)}
          // activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
          LinkComponent={DefaultLink}
        />
        <div className="divider" />
      </>
      <>
        <MetisMenu
          content={CampaignNav(t)}
          // activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
          LinkComponent={DefaultLink}
        />
        <div className="divider" />
      </>
      <>
        <MetisMenu
          content={InventoryMarketNav(t)}
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
          LinkComponent={DefaultLink}
        />
        <div className="divider" />
      </>
      <>
        <MetisMenu
          content={ContainerNav(t)}
          // activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
          LinkComponent={DefaultLink}
        />
        <div className="divider" />
      </>
      <>
        <MetisMenu
          content={OrganizationNav(t)}
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
          LinkComponent={DefaultLink}
        />
        <div className="divider" />
      </>
      <MetisMenu
        content={UserManagementNav(t)}
        // activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
        LinkComponent={DefaultLink}
      />
    </>
  );
};

export default Nav;
