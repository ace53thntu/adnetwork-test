import PropTypes from 'prop-types';
import * as React from 'react';

import NativeAdForm from './NativeAdForm';

function NativeAdTab(props) {
  const {isCreate} = props;

  return <NativeAdForm isCreate={isCreate} />;
}

NativeAdTab.propTypes = {
  isCreate: PropTypes.bool
};
NativeAdTab.defaultProps = {
  isCreate: true
};

export default NativeAdTab;
