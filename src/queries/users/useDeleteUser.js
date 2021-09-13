import {UserAPIRequest} from 'api/user.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_USERS} from './constants';

/**
 * Delete a User
 */
export function useDeleteUser() {
  const client = useQueryClient();

  return useMutation(
    ({userId}) =>
      UserAPIRequest.deleteUser({
        id: userId
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
