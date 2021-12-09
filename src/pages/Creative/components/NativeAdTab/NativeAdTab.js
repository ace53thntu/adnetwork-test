import PropTypes from 'prop-types';
import {useGetNativeAd} from 'queries/native-ad';
import * as React from 'react';

import NativeAdForm from './NativeAdForm';

function NativeAdTab(props) {
  const {nativeAdId, isCreate} = props;

  const {data, isFetching} = useGetNativeAd({nativeAdId});

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return <NativeAdForm nativeAd={data} isCreate={isCreate} />;
}

NativeAdTab.propTypes = {
  nativeAdId: PropTypes.any,
  isCreate: PropTypes.bool
};
NativeAdTab.defaultProps = {
  isCreate: false
};

export default NativeAdTab;
