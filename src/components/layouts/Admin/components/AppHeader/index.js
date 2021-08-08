import React, {Fragment} from 'react';
import cx from 'classnames';

import {connect} from 'react-redux';

import CSSTransition from 'react-transition-group/CSSTransition';

import HeaderLogo from '../AppLogo';

// import SearchBox from './components/SearchBox';
import UserBox from './components/UserBox';

import HeaderDots from './components/HeaderDots';

class Header extends React.Component {
  render() {
    let {
      headerBackgroundColor,
      enableMobileMenuSmall,
      enableHeaderShadow
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
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
