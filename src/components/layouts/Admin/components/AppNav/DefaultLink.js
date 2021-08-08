import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {useLocation} from 'react-router-dom';

const DefaultLink = ({
  className,
  classNameActive,
  classNameHasActiveChild,
  active,
  hasActiveChild,
  to,
  externalLink,
  hasSubMenu,
  toggleSubMenu,
  activateMe,
  children,
  ...rest
}) => {
  const {pathname} = useLocation();
  const currentTo = to.substring(1, to.length);

  if (!hasSubMenu) {
    if (to.includes(pathname) || pathname.includes(currentTo)) {
      return (
        <a
          className={classnames(className, classNameActive)}
          href={to}
          target={externalLink ? '_blank' : undefined}
          onClick={activateMe}
          rel="noreferrer"
        >
          {children}
        </a>
      );
    }
  }

  return (
    <a
      className={classnames(
        className
        // active && classNameActive,
        // hasActiveChild && classNameHasActiveChild,
      )}
      href={to}
      onClick={hasSubMenu ? toggleSubMenu : activateMe}
      target={externalLink ? '_blank' : undefined}
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

DefaultLink.defaultProps = {
  externalLink: false,
  toggleSubMenu: null
};

DefaultLink.propTypes = {
  className: PropTypes.string.isRequired,
  classNameActive: PropTypes.string.isRequired,
  classNameHasActiveChild: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  hasActiveChild: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  externalLink: PropTypes.bool,
  hasSubMenu: PropTypes.bool.isRequired,
  toggleSubMenu: PropTypes.func,
  activateMe: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

export default DefaultLink;
