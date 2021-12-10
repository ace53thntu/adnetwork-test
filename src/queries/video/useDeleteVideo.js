import {VideoAPI} from 'api/video.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useDeleteVideo() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    videoId => VideoAPI.deleteVideo({videoId, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
