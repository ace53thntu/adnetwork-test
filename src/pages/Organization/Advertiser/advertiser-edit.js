import {LoadingIndicator} from 'components/common';
import {useGetAdvertiser} from 'queries/advertiser';
import React from 'react';
import {AdvertiserForm} from './components';

const AdvertiserEdit = ({advertiserId, ...rest}) => {
  const {data: advertiser, isFetched, status, isFetching} = useGetAdvertiser(
    advertiserId,
    !!advertiserId
  );

  return (
    <div>
      {isFetching && <LoadingIndicator />}
      {isFetched && status === 'success' && (
        <AdvertiserForm advertiser={advertiser} {...rest} />
      )}
    </div>
  );
};

export default React.memo(AdvertiserEdit);
