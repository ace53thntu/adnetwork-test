import {CreativeAPI} from 'api/creative.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useUpdateCreative() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    ({creativeId, updatedData}) =>
      CreativeAPI.updateCreative({
        data: updatedData,
        creativeId,
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
