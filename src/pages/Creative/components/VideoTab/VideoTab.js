import PropTypes from 'prop-types';
import * as React from 'react';

import VideoForm from './VideoForm';

function VideoTab(props) {
  const {isCreate} = props;

  return <VideoForm isCreate={isCreate} />;
}

VideoTab.propTypes = {
  isCreate: PropTypes.bool
};
VideoTab.defaultProps = {
  isCreate: true
};

export default VideoTab;
