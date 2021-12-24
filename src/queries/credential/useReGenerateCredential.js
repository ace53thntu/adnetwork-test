import {CredentialAPIRequest} from 'api/credential.api';

import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useReGenerateCredential() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    ({id, data}) =>
      CredentialAPIRequest.regenerateCredential({
        id,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
