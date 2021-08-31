import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {useQuery} from 'react-query';

import {GET_ADVERTISERS} from './constants';

export function useGetAdvertisers() {
  return useQuery(
    GET_ADVERTISERS,
    () =>
      AdvertiserAPIRequest.getAllAdvertiser({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
