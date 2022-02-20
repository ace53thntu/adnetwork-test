//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';

//---> Internal Modules
import {useGetPublisher} from 'queries/publisher';
import {PublisherForm} from './components';
import {LoadingIndicator} from 'components/common';

const propTypes = {
  publisherId: PropTypes.string.isRequired
};

const PublisherEdit = ({publisherId, ...rest}) => {
  const {data: publisher, isFetched, status, isLoading} = useGetPublisher(
    publisherId
  );

  return (
    <div>
      {isLoading && <LoadingIndicator />}
      {isFetched && status === 'success' && (
        <PublisherForm {...rest} publisher={publisher} />
      )}
    </div>
  );
};

PublisherEdit.propTypes = propTypes;

export default React.memo(PublisherEdit);
