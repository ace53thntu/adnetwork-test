import cx from 'classnames';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

import {ReactComponent as IconSideBar} from '../../../../../assets/utils/images/sidebar/icon-side-bar.svg';
import HeaderLogo from '../AppLogo';
import HeaderDots from './components/HeaderDots';
// import SearchBox from './components/SearchBox';
import UserBox from './components/UserBox';

class Header extends React.Component {
  toggleSideBar = () => {
    const {enableClosedSidebar, setToggleSidebar} = this.props;
    setToggleSidebar(!enableClosedSidebar);
  };

  render() {
    let {
      headerBackgroundColor,
      enableMobileMenuSmall,
      enableHeaderShadow,
      enableClosedSidebar
    } = this.props;
    return (
      <Fragment>
        <CSSTransition timeout={1500} classNames="HeaderAnimation">
          <div
            className={cx('app-header', headerBackgroundColor, {
              'header-shadow': enableHeaderShadow
            })}
          >
            <HeaderLogo />

            <div className="sidebar-toggle">
              {React.createElement(IconSideBar, {
                className: 'trigger',
                onClick: this.toggleSideBar,
                title: enableClosedSidebar ? 'Collapsed' : 'Expanded'
              })}
            </div>

            <div
              className={cx('app-header__content', {
                'header-mobile-open': enableMobileMenuSmall
              })}
            >
              {/* <div className="app-header-left">
                <SearchBox />
              </div> */}
              <div className="app-header-right">
                <HeaderDots />
                <UserBox />
              </div>
            </div>
          </div>
        </CSSTransition>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar
});

const mapDispatchToProps = dispatch => ({
  setToggleSidebar: status => dispatch(setEnableClosedSidebar(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
