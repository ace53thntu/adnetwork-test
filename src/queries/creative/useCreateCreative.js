import {CreativeAPI} from 'api/creative.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useCreateCreative() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    data =>
      CreativeAPI.createCreative({
        data,
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
