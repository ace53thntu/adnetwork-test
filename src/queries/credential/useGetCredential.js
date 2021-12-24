import {CredentialAPIRequest} from 'api/credential.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';
import {CREDENTIAL} from './constants';

export function useGetCredential({id, params = {}}) {
  const {cancelToken} = useCancelRequest();
  return useQuery(
    [CREDENTIAL, {params}],
    () =>
      CredentialAPIRequest.getCredential({
        id,
        params,
        options: {
          cancelToken
        }
      }).then(res => {
        return res?.data ?? {};
      }),
    {
      suspense: false,
      refetchOnWindowFocus: false
    }
  );
}
