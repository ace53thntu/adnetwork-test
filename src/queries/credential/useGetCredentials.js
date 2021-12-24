import {CredentialAPIRequest} from 'api/credential.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';
import {CREDENTIALS} from './constants';

export function useGetCredentials({params = {}, enabled = false}) {
  const {cancelToken} = useCancelRequest();
  return useQuery(
    [CREDENTIALS, {params}],
    () =>
      CredentialAPIRequest.getCredentials({
        params,
        options: {
          cancelToken
        }
      }).then(res => {
        return res?.data ?? [];
      }),
    {
      suspense: false,
      refetchOnWindowFocus: false,
      enabled
    }
  );
}
