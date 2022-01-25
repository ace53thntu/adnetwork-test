import {DomainGroupAPIRequest} from 'api/domain-group.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_DOMAIN_GROUPS} from './constants';

/**
 * Hook for get all domains
 * @returns Promise
 */
export function useGetDomainGroups({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_DOMAIN_GROUPS, params],
    () =>
      DomainGroupAPIRequest.getAllDomainGroup({
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
