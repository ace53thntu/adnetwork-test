import {IABsAPIRequest} from 'api/iabs.api';
import {useQuery} from 'react-query';

import {GET_IABS} from './constants';

export function useGetIABs() {
  return useQuery(
    GET_IABS,
    () => IABsAPIRequest.getAllIABs({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
