import {USER_ROLE} from 'pages/user-management/constants';
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
  SettingNav,
  UserManagementNav
} from 'routers/navigators';
import {getRole} from 'utils/helpers/auth.helpers';

import DefaultLink from './DefaultLink';

const {ADMIN, MANAGER, PUBLISHER, ADVERTISER, DSP} = USER_ROLE;

const Nav = ({role: roleProp}) => {
  const role = getRole();
  const {t} = useTranslation();

  return (
    <>
      {[ADMIN, MANAGER, PUBLISHER, ADVERTISER, DSP].includes(role) && (
        <>
          <MetisMenu
            content={ReportNav(t)}
            // activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
            LinkComponent={DefaultLink}
          />
          <div className="c-divider" />
        </>
      )}

      {[ADMIN, MANAGER, ADVERTISER, PUBLISHER, DSP].includes(role) && (
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
          <div className="c-divider" />
        </>
      )}
      {[ADMIN, MANAGER, ADVERTISER].includes(role) && (
        <>
          <MetisMenu
            content={CreativeNav(t)}
            // activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
            LinkComponent={DefaultLink}
          />
          <div className="c-divider" />
        </>
      )}
      {[ADMIN, MANAGER, ADVERTISER].includes(role) && (
        <>
          <MetisMenu
            content={CampaignNav(t)}
            // activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
            LinkComponent={DefaultLink}
          />
          <div className="c-divider" />
        </>
      )}

      {[ADMIN, MANAGER, DSP].includes(role) && (
        <>
          <MetisMenu
            content={InventoryMarketNav(t)}
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
            LinkComponent={DefaultLink}
          />
          <div className="c-divider" />
        </>
      )}
      {[ADMIN, MANAGER, PUBLISHER].includes(role) && (
        <>
          <MetisMenu
            content={ContainerNav(t)}
            // activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
            LinkComponent={DefaultLink}
          />
          <div className="c-divider" />
        </>
      )}
      {[ADMIN, MANAGER, ADVERTISER, PUBLISHER, DSP].includes(role) && (
        <>
          <MetisMenu
            content={OrganizationNav(t, role)}
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
            LinkComponent={DefaultLink}
          />
          <div className="c-divider" />
        </>
      )}
      {[ADMIN, MANAGER].includes(role) && (
        <>
          <MetisMenu
            content={SettingNav(t)}
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
            LinkComponent={DefaultLink}
          />
          <div className="c-divider" />
        </>
      )}
      {[ADMIN, MANAGER].includes(role) && (
        <MetisMenu
          content={UserManagementNav(t)}
          // activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
          LinkComponent={DefaultLink}
        />
      )}
    </>
  );
};

export default Nav;
