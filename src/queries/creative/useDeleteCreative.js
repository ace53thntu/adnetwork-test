import {CreativeAPI} from 'api/creative.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useDeleteCreative() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    creativeId =>
      CreativeAPI.deleteCreative({
        creativeId,
        options: {
          cancelToken
        }
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        // refetch creatives
        // client.invalidateQueries(['GET_CREATIVES']);
      }
    }
  );
}
