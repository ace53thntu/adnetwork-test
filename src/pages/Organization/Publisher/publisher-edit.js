//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useParams} from 'react-router-dom';

//---> Internal Modules
import {useGetPublisher} from 'queries/publisher';
import {PublisherForm} from './components';
import {LoadingIndicator} from 'components/common';
import PublisherLayout from './publisher-layout';

const propTypes = {};

const PublisherEdit = () => {
  const {publisherId} = useParams();
  const {data: publisher, isFetched, status, isLoading} = useGetPublisher(
    publisherId,
    !!publisherId
  );

  return (
    <PublisherLayout pageTitle='Publisher edit'>
      <div>
        {isLoading && <LoadingIndicator />}
        {isFetched && status === 'success' && (
          <PublisherForm isEdit publisher={publisher} />
        )}
      </div>
    </PublisherLayout>
  );
};

PublisherEdit.propTypes = propTypes;

export default PublisherEdit;
