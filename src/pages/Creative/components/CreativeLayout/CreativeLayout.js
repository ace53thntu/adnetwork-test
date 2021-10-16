import AppContent from 'components/layouts/Admin/components/AppContent';
import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {NavLink, Outlet} from 'react-router-dom';
import {Input} from 'reactstrap';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

import {AdvertisersTree} from '../AdvertisersTree';

function CreativeLayout(props) {
  const reduxDispatch = useDispatch();
  const {t} = useTranslation();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  return (
    <>
      <ExtendSidebar
        heading={<NavLink to="/creative">{t('creativeManagement')}</NavLink>}
      >
        <div className="mb-2">
          <Input
            placeholder="Search..."
            // onChange={onHandleChangeSearch}
            disabled
          />
        </div>
        <div className="divider" />
        <div className="border mb-2">
          <AdvertisersTree />
        </div>
      </ExtendSidebar>

      <AppContent>
        <Outlet />
      </AppContent>
    </>
  );
}

CreativeLayout.propTypes = {};
CreativeLayout.defaultProps = {};

export default CreativeLayout;
