import {AlternativeAPI} from 'api/alternative.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useCreateAlternative() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    data =>
      AlternativeAPI.createAlternative({
        data,
        options: {
          cancelToken
        }
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
