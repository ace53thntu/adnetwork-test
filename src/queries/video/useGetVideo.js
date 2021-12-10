import {VideoAPI} from 'api/video.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_VIDEO} from './constants';

export function useGetVideo(videoId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_VIDEO, videoId],
    () =>
      VideoAPI.getVideo({
        videoId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled: Boolean(videoId)
    }
  );
}
