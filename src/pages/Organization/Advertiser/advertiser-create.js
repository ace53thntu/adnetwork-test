import {useGetIABs} from 'queries/iabs';
import React from 'react';
import {useIABsOptions} from '../hooks';
import AdvertiserLayout from './advertiser-layout';
import {AdvertiserForm} from './components';

const AdvertiserCreate = ({children}) => {
  const {data: IABs} = useGetIABs();
  const IABsOptions = useIABsOptions({IABs});

  return (
    <AdvertiserLayout pageTitle="Advertiser Create">
      <div>
        <AdvertiserForm IABsOptions={IABsOptions} isCreate />
        )}
      </div>
    </AdvertiserLayout>
  );
};

export default AdvertiserCreate;
