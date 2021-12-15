import {UserAPIRequest} from 'api/user.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';

import {GET_USERS} from './constants';

export function useGetUsers() {
  return useQuery(
    GET_USERS,
    () => UserAPIRequest.getAllUser({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}

export function useGetUsersInfinity({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_USERS, params],
    ({pageParam = 1}) =>
      UserAPIRequest.getAllUser({
        params: {...params, page: pageParam},
        options: {cancelToken}
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const total = apiRes?.total;
        const nextPage = Math.ceil(total / DEFAULT_PAGINATION.perPage);

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}
