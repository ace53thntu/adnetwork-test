import {UploaderAPI} from 'api/uploader.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_UPLOADER_CONFIG} from './constants';

export function useGetUploaderConfig({enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    GET_UPLOADER_CONFIG,
    () =>
      UploaderAPI.getConfig({
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? null),
    {
      suspense: false,
      enabled
    }
  );
}
