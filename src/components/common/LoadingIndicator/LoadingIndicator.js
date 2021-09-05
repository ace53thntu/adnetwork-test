import React, {memo} from 'react';
import Loader from 'react-loaders';

import './style.scss';

const LoadingIndicator = props => {
  const {type = 'line-scale', title = '', noOpacity = false} = props;
  return (
    <div className="loading-indicator-content">
      <div
        className={`loading-indicator-overlay ${noOpacity ? 'no-opacity' : ''}`}
      ></div>
      <Loader type={type} />
      <div className="loading-title">{title}</div>
    </div>
  );
};

export default memo(LoadingIndicator);
