import {DomainAPIRequest} from 'api/domain.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_DOMAINS} from './constants';

/**
 * Hook for get all domains
 * @returns Promise
 */
export function useGetDomains({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_DOMAINS, params],
    () =>
      DomainAPIRequest.getAllDomain({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      keepPreviousData
    }
  );
}
