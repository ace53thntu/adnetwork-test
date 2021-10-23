import {AlternativeAPI} from 'api/alternative.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useUpdateAlternative() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    ({alternativeId, data}) =>
      AlternativeAPI.updateAlternative({
        alternativeId,
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
