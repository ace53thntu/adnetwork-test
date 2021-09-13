import {UserAPIRequest} from 'api/user.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_USERS} from './constants';

/**
 * Update a User
 */
export function useEditUser() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({userId, data}) =>
      UserAPIRequest.editUser({
        id: userId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_USERS]);
      }
    }
  );
}
