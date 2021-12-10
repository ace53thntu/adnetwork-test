import {VideoAPI} from 'api/video.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useUpdateVideo() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    ({videoId, data}) =>
      VideoAPI.updateVideo({videoId, data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
