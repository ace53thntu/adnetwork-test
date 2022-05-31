import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import cx from 'classnames';
import React, { Component, Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import { setEnableMobileMenu, setEnableClosedSidebar } from 'store/reducers/ThemeOptions';
import HeaderLogo from '../AppLogo';
import Nav from '../AppNav/VerticalNavWrapper';
import AppUser from '../AppUser';

class AppSidebar extends Component {
  toggleMobileSidebar = () => {
    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  componentDidMount() {
    const { setToggleSidebar } = this.props;
    setToggleSidebar(true);
  }

  toggleSideBar = () => {
    const { enableClosedSidebar, setToggleSidebar } = this.props;
    setToggleSidebar(!enableClosedSidebar);
  }

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
              <div className='app-sidebar__toggle'>
                {React.createElement(enableClosedSidebar ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggleSideBar,
                })}
              </div>
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
  setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
  setToggleSidebar: status => dispatch(setEnableClosedSidebar(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
