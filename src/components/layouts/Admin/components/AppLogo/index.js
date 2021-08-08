import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

import AppMobileMenu from '../AppMobileMenu';

const HeaderLogo = () => {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const onHandleClickLogo = React.useCallback(() => {
    reduxDispatch(setEnableClosedSidebar(false));
    navigate('/');
  }, [navigate, reduxDispatch]);
  return (
    <>
      <div className="app-header__logo">
        <div
          style={{
            width: 140
          }}
          onClick={onHandleClickLogo}
          className="cursor-pointer"
        >
          <img
            src="/images/logos/logo.png"
            alt="aicactus-logo"
            className="img-fluid"
          />
        </div>
      </div>
      <AppMobileMenu />
    </>
  );
};

export default HeaderLogo;
