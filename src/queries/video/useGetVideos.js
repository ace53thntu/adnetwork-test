import {VideoAPI} from 'api/video.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_VIDEOS} from './constants';

export function useVideos({params = {}}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_VIDEOS, params],
    () =>
      VideoAPI.getVideos({
        params,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
