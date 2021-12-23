import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {NAVIGATION_NAME_MAP} from 'routers/navigators';

export default function PageTitle({icon, heading, subheading}) {
  const {t} = useTranslation();
  const location = useLocation();
  const pathNames = React.useMemo(
    () => location.pathname.split('/').filter(x => x),
    [location.pathname]
  );

  return (
    <div className="app-page-title">
      <Helmet>
        <title>{heading} | Aicactus DMP</title>
      </Helmet>
      <div className="page-title-wrapper">
        <div className="page-title-heading">
          <div className={cx('page-title-icon')}>
            <i className={icon} />
          </div>
          <div>
            {heading}
            <div className={cx('page-title-subheading')}>{subheading}</div>
          </div>
        </div>
        <div className="page-title-actions">
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/">
                <FontAwesomeIcon icon={faHome} />
              </a>
            </BreadcrumbItem>
            {pathNames.map((value, idx) => {
              const last = idx === pathNames.length - 1;
              const to = `/${pathNames.slice(0, idx + 1).join('/')}`;
              return last ? (
                NAVIGATION_NAME_MAP[to] ? (
                  <BreadcrumbItem key={to}>
                    {t(NAVIGATION_NAME_MAP[to])}
                  </BreadcrumbItem>
                ) : null
              ) : (
                <BreadcrumbItem key={to}>
                  <a href={to}>{t(NAVIGATION_NAME_MAP[to])}</a>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}

PageTitle.propTypes = {
  icon: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string
};
PageTitle.defaultProps = {
  heading: 'Page heading',
  subheading: 'Page subheading.',
  icon: 'pe-7s-notebook icon-gradient bg-mixed-hopes'
};
