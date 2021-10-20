import {UserAPIRequest} from 'api/user.api';
import {useQuery} from 'react-query';

import {GET_ME} from './constants';

export function useGetMe({enable = false}) {
  return useQuery(
    GET_ME,
    () => UserAPIRequest.getMe().then(res => res?.data ?? {}),
    {
      suspense: true,
      enable
    }
  );
}
