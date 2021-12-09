import clsx from 'clsx';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';

import {BannerForm} from '../BannerForm';
import {NativeAdTab} from '../NativeAdTab';
import {TABS} from './constants';

function CreativeCreateBody(props) {
  const {t} = useTranslation();
  // const dispatch = useDispatch();

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
    <>
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
          {activeTab === TABS.nativeBanner && <NativeAdTab isCreate />}
        </TabPane>
        <TabPane tabId={TABS.video}>
          {activeTab === TABS.video && 'Video'}
        </TabPane>
      </TabContent>
    </>
  );
}

CreativeCreateBody.propTypes = {};
CreativeCreateBody.defaultProps = {};

export default CreativeCreateBody;
