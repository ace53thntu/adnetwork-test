import {UserAPIRequest} from 'api/user.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_USERS} from './constants';

/**
 * Create a User
 */
export function useCreateUser() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => UserAPIRequest.createUser({data, options: {cancelToken}}),
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
