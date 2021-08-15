import React, {useCallback} from 'react';
import cx from 'classnames';
import {Button} from 'reactstrap';
import {Helmet} from 'react-helmet-async';

const PageTitleAlt = props => {
  const {
    heading,
    icon,
    subheading,
    actions,
    onClick,
    deleteButton,
    onDelete = () => {}
  } = props;
  const handleClick = () => {
    onClick();
  };

  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <div className="app-page-title">
      <Helmet>
        <title>{heading} | Aicactus DMP</title>
      </Helmet>
      <div className="page-title-wrapper">
        <div className="page-title-heading">
          <div className={cx('page-title-icon', {'d-none': !true})}>
            <i className={icon} />
          </div>
          <div>
            {heading}
            <div className={cx('page-title-subheading', {'d-none': !true})}>
              {subheading}
            </div>
          </div>
        </div>
        {actions && (
          <div className="page-title-actions">
            <Button
              onClick={handleClick}
              outline
              className="mb-2 mr-2 btn-transition"
              color="primary"
            >
              {actions}
            </Button>
          </div>
        )}
        {deleteButton && (
          <div className="">
            <Button
              type="button"
              onClick={handleDelete}
              outline
              className="mb-2 mr-3 ml-2 btn-transition"
              color="danger"
            >
              {deleteButton}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageTitleAlt;
