import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import {useCreativeSelector} from 'store/reducers/creative';

import {BannerForm} from '../BannerForm';
import {CreativeDialog} from '../CreativeDialog';
import {TABS} from './constants';

function CreativeCreate(props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {toggleCreateCreativeDialog} = useCreativeSelector();

  const [activeTab, setActiveTab] = React.useState(TABS.banner);

  const toggle = tab => {
    if (activeTab !== tab) {
      // if (isDirty) {
      //   if (window.confirm('Your data will lost when switch other tab.')) {
      //     dispatch(dirtyForm(false));
      //     setActiveTab(tab);
      //   } else {
      //     //
      //   }
      //   return;
      // }
      setActiveTab(tab);
    }
  };

  return (
    <CreativeDialog>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={clsx({active: activeTab === TABS.banner})}
            onClick={() => {
              toggle(TABS.banner);
            }}
          >
            {t('creativeTabBanner')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={clsx({active: activeTab === TABS.nativeBanner})}
            onClick={() => {
              toggle(TABS.nativeBanner);
            }}
          >
            {t('creativeTabNativeBanner')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={clsx({active: activeTab === TABS.video})}
            onClick={() => {
              toggle(TABS.video);
            }}
          >
            {t('creativeTabVideo')}
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={TABS.banner}>
          {activeTab === TABS.banner && <BannerForm isCreate />}
        </TabPane>
        <TabPane tabId={TABS.nativeBanner}>
          {activeTab === TABS.nativeBanner && 'Native Ad'}
        </TabPane>
        <TabPane tabId={TABS.video}>
          {activeTab === TABS.video && 'Video'}
        </TabPane>
      </TabContent>
    </CreativeDialog>
  );
}

CreativeCreate.propTypes = {};
CreativeCreate.defaultProps = {};

export default CreativeCreate;
