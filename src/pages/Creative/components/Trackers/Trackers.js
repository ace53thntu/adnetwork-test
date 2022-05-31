import PropTypes from 'prop-types';
import * as React from 'react';
import {Button} from 'reactstrap';

import TrackerForm from './TrackerForm';
import TrackerList from './TrackerList';

function Trackers(props) {
  const {referenceId, referenceType} = props;

  const [isOpenTrackerForm, setIsOpenTrackerForm] = React.useState(false);

  const handleAddTracker = isOpen => {
    setIsOpenTrackerForm(isOpen);
  };

  return (
    <div>
      <TrackerList
        referenceId={referenceId}
        referenceType={referenceType}
        handleAddTracker={handleAddTracker}
      />

      {isOpenTrackerForm ? (
        <TrackerForm
          handleAddTracker={handleAddTracker}
          referenceId={referenceId}
          referenceType={referenceType}
        />
      ) : (
        <div className="pb-5 ml-auto">
          <Button
            color="primary"
            type="button"
            className="mt-2"
            onClick={() => handleAddTracker(true)}
          >
            Add tracker
          </Button>
        </div>
      )}
    </div>
  );
}

Trackers.propTypes = {
  referenceId: PropTypes.string,
  referenceType: PropTypes.string
};
Trackers.defaultProps = {};

export default Trackers;
