import PropTypes from 'prop-types';
import {useGetTrackers} from 'queries/tracker';
import * as React from 'react';

import TrackerItem from './TrackerItem';

function TrackerList(props) {
  const {referenceId, referenceType, handleAddTracker} = props;

  const {data, isFetching} = useGetTrackers({
    enabled: !!referenceId,
    params: {
      reference_type: referenceType,
      reference_uuid: referenceId
    }
  });

  return (
    <div>
      {isFetching
        ? 'Loading...'
        : data?.data?.data?.map(tracker => {
            return (
              <TrackerItem
                key={tracker.uuid}
                tracker={tracker}
                referenceId={referenceId}
                referenceType={referenceType}
                handleAddTracker={handleAddTracker}
              />
            );
          })}
    </div>
  );
}

TrackerList.propTypes = {
  referenceId: PropTypes.string,
  referenceType: PropTypes.string
};
TrackerList.defaultProps = {};

export default TrackerList;
