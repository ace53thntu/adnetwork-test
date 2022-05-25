import PropTypes from 'prop-types';
import * as React from 'react';

import TrackerForm from './TrackerForm';

function TrackerItem(props) {
  const {tracker, referenceId, referenceType, handleAddTracker} = props;

  return (
    <TrackerForm
      handleAddTracker={handleAddTracker}
      referenceId={referenceId}
      referenceType={referenceType}
      tracker={tracker}
    />
  );
}

TrackerItem.propTypes = {
  tracker: PropTypes.any
};
TrackerItem.defaultProps = {};

export default TrackerItem;
