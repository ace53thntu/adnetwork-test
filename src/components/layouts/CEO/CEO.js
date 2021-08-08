import PropTypes from 'prop-types';
import * as React from 'react';
import {Helmet} from 'react-helmet-async';

function CEO(props) {
  const {title, children, ...rest} = props;

  return (
    <div {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
}

CEO.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};
CEO.defaultProps = {
  children: null,
  title: 'AdNetwork Portal'
};

export {CEO};
