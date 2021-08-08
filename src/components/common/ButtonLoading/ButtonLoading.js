import PropTypes from 'prop-types';
import * as React from 'react';

import LaddaButton, {ZOOM_IN} from '@zumper/react-ladda';

export function ButtonLoading(props) {
  const {children, loading, className, disabled, ...rest} = props;

  return (
    <LaddaButton
      {...rest}
      className={`btn ${className}`}
      loading={loading}
      data-style={ZOOM_IN}
      disabled={disabled}
    >
      {children}
    </LaddaButton>
  );
}

ButtonLoading.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool
};
ButtonLoading.defaultProps = {
  children: 'Button loading',
  loading: false,
  className: 'btn-primary btn-lg',
  disabled: false
};
