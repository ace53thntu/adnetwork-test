import {LoadingIndicator} from 'components/common';
import {useGetAdvertiser} from 'queries/advertiser';
import {useGetIABs} from 'queries/iabs';
import React from 'react';
import {useParams} from 'react-router-dom';
import {useIABsOptions} from '../hooks';
import AdvertiserLayout from './advertiser-layout';
import {AdvertiserForm} from './components';

const AdvertiserEdit = () => {
  const {advertiserId} = useParams();
  const {data: IABs} = useGetIABs();
  const IABsOptions = useIABsOptions({IABs});
  const {data: advertiser, isFetched, status, isFetching} = useGetAdvertiser(
    advertiserId,
    !!advertiserId
  );

  return (
    <AdvertiserLayout pageTitle="Advertiser Edit">
      <div>
        {isFetching && <LoadingIndicator />}
        {isFetched && status === 'success' && (
          <AdvertiserForm
            advertiser={advertiser}
            IABsOptions={IABsOptions}
            isEdit
          />
        )}
      </div>
    </AdvertiserLayout>
  );
};

export default AdvertiserEdit;
