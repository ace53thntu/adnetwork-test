import * as React from 'react';
// import PropTypes from 'prop-types';

function BlockOverlay(props) {
  return (
    <div className="block-ui-container" tabIndex="0">
      <div className="block-ui-overlay"></div>
      <div className="block-ui-message-container">
        <div className="block-ui-message">
          <div className="loading-indicator">
            <span className="loading-bullet">•</span>
            <span className="loading-bullet">•</span>
            <span className="loading-bullet">•</span>
          </div>
        </div>
      </div>
    </div>
  );
}

BlockOverlay.propTypes = {};
BlockOverlay.defaultProps = {};

export {BlockOverlay};
