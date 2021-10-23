import {CreativeAPI} from 'api/creative.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CREATIVES} from './constants';

export function useGetCreatives({params = {}}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CREATIVES, params],
    () =>
      CreativeAPI.getCreatives({
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
