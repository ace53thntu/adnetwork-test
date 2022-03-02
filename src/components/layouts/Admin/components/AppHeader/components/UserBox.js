import avatar1 from 'assets/utils/images/avatars/g1.png';
import city3 from 'assets/utils/images/dropdown-header/city3.jpg';
/** Hooks */
import {useAuth} from 'context/auth/hooks';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {
  Button,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink as NavLinkTrap,
  UncontrolledButtonDropdown
} from 'reactstrap';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {getRole, getUser} from 'utils/helpers/auth.helpers';
import Emitter from 'utils/helpers/emitter.helpers';
import {capitalize} from 'utils/helpers/string.helpers';

import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {RoutePaths} from 'constants/route-paths';
import {USER_ROLE} from 'pages/user-management/constants';

const UserBox = () => {
  const {t} = useTranslation();
  const reduxDispatch = useDispatch();
  const {logout} = useAuth();
  const userInfo = getUser();
  const role = getRole();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(userInfo);

  useEffect(() => {
    Emitter.on('UPDATE_PROFILE', val => {
      setCurrentUser({
        ...val,
        full_name: `${val?.first_name} ${val?.last_name}`
      });
    });

    return () => {
      Emitter.off('UPDATE_PROFILE');
    };
  }, []);

  const handleLogout = React.useCallback(() => {
    reduxDispatch(setEnableClosedSidebar(false));
    logout();
  }, [logout, reduxDispatch]);

  const onHandleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className="header-btn-lg pr-0">
      <div className="widget-content p-0">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <UncontrolledButtonDropdown
              isOpen={openDropdown}
              toggle={onHandleOpenDropdown}
            >
              <DropdownToggle
                color="link"
                className="p-0"
                onClick={onHandleOpenDropdown}
              >
                <img
                  width={42}
                  height={42}
                  className="rounded-circle"
                  src={avatar1}
                  alt=""
                />
                <FontAwesomeIcon
                  className="ml-2 opacity-8"
                  icon={faAngleDown}
                />
              </DropdownToggle>
              <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                <div className="dropdown-menu-header">
                  <div className="dropdown-menu-header-inner bg-info">
                    <div
                      className="menu-header-image opacity-2"
                      style={{
                        backgroundImage: 'url(' + city3 + ')'
                      }}
                    />
                    <div className="menu-header-content text-left">
                      <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left mr-3">
                            <img
                              width={42}
                              className="rounded-circle"
                              src={avatar1}
                              alt=""
                            />
                          </div>
                          <div className="widget-content-left">
                            <div className="widget-heading text-capitalize">
                              {currentUser?.full_name ?? currentUser?.username}
                            </div>
                            <div className="widget-subheading opacity-8">
                              {role ? capitalize(role) : ''}
                            </div>
                          </div>
                          <div className="widget-content-right mr-2">
                            <Button
                              className="btn-pill btn-shadow btn-shine"
                              color="focus"
                              onClick={handleLogout}
                            >
                              {t('logout')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="scroll-area-xs"
                  style={{
                    height: '200px'
                  }}
                >
                  <PerfectScrollbar>
                    <Nav vertical>
                      <NavItem className="nav-item-header">
                        {t('setting')}
                      </NavItem>
                      {[USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role) && (
                        <NavItem>
                          <NavLinkTrap tag="span">
                            <NavLink to={`/${RoutePaths.USER}`}>
                              {t('users')}
                            </NavLink>
                          </NavLinkTrap>
                        </NavItem>
                      )}
                      <NavItem>
                        <NavLinkTrap tag="span">
                          <NavLink
                            to={`/${RoutePaths.USER}/${RoutePaths.PROFILE}`}
                          >
                            {t('profile')}
                          </NavLink>
                        </NavLinkTrap>
                      </NavItem>
                    </Nav>
                  </PerfectScrollbar>
                </div>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
          <div className="widget-content-left  ml-3 header-user-info">
            <div className="widget-heading text-capitalize">
              {currentUser?.full_name ?? currentUser?.username}
            </div>
            <div className="widget-subheading text-capitalize">
              {currentUser?.full_name ?? currentUser?.username}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
