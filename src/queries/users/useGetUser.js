import {UserAPIRequest} from 'api/user.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_USER} from './constants';

/**
 * Hook for get User from API by query
 */
export function useGetUser(userId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_USER, userId],
    () =>
      UserAPIRequest.getUser({
        id: userId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!userId
    }
  );
}
