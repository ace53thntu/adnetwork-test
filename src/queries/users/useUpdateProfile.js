import {UserAPIRequest} from 'api/user.api';

import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useUpdateProfile() {
  const {cancelToken} = useCancelRequest();
  return useMutation(({id, data}) =>
    UserAPIRequest.updateProfile({id, data, options: cancelToken})
  );
}
