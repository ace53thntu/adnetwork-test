import {VideoAPI} from 'api/video.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useCreateVideo() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    data => VideoAPI.createVideo({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
