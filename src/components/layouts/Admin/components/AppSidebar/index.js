import cx from 'classnames';
import React, {Component, Fragment} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {connect} from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import {setEnableMobileMenu} from 'store/reducers/ThemeOptions';

import HeaderLogo from '../AppLogo';
import Nav from '../AppNav/VerticalNavWrapper';
import AppUser from '../AppUser';

class AppSidebar extends Component {
  state = {};

  toggleMobileSidebar = () => {
    let {enableMobileMenu, setEnableMobileMenu} = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  render() {
    let {
      backgroundColor,
      enableBackgroundImage,
      enableSidebarShadow,
      backgroundImage,
      backgroundImageOpacity,
      enableClosedSidebar
    } = this.props;

    return (
      <Fragment>
        <div
          className="sidebar-mobile-overlay"
          onClick={this.toggleMobileSidebar}
        />
        <CSSTransition timeout={1500} classNames="SidebarAnimation">
          <div
            className={cx('app-sidebar', backgroundColor, {
              'sidebar-shadow': enableSidebarShadow,
              'has-extend-sidebar': enableClosedSidebar
            })}
          >
            <HeaderLogo />

            <PerfectScrollbar>
              <AppUser />
              <div className="app-sidebar__inner">
                <Nav role={'admin'} />
              </div>
            </PerfectScrollbar>

            <div
              className={cx('app-sidebar-bg', backgroundImageOpacity)}
              style={{
                backgroundImage: enableBackgroundImage
                  ? 'url(' + backgroundImage + ')'
                  : null
              }}
            ></div>
          </div>
        </CSSTransition>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
  enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  backgroundColor: state.ThemeOptions.backgroundColor,
  backgroundImage: state.ThemeOptions.backgroundImage,
  backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar
});

const mapDispatchToProps = dispatch => ({
  setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
