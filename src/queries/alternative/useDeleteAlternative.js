import {AlternativeAPI} from 'api/alternative.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useDeleteAlternative() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    alternativeId =>
      AlternativeAPI.deleteAlternative({
        alternativeId,
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
