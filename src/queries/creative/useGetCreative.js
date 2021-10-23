import {CreativeAPI} from 'api/creative.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CREATIVE} from './constants';

export function useGetCreative({creativeId, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CREATIVE, creativeId],
    () =>
      CreativeAPI.getCreative({
        creativeId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled
    }
  );
}
