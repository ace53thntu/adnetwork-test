import {DomainGroupAPIRequest} from 'api/domain-group.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_DOMAIN_GROUP} from './constants';

/**
 * Hook for get Domain Group from API by query
 * @param domainGroupId - Domain ID
 */
export function useGetDomainGroup({domainGroupId, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_DOMAIN_GROUP, domainGroupId],
    () =>
      DomainGroupAPIRequest.getDomainGroup({
        id: domainGroupId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled
    }
  );
}
