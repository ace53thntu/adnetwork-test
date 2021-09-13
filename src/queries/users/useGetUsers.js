import {UserAPIRequest} from 'api/user.api';
import {useQuery} from 'react-query';

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
