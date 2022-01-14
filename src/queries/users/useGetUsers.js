import {UserAPIRequest} from 'api/user.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

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
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const nextPage = getResponsePagination(apiRes, IS_RESPONSE_ALL)
          ?.nextPage;

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}
