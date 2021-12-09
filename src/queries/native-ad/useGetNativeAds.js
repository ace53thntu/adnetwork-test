import {NativeAdAPI} from 'api/native-ad.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_NATIVE_ADS} from './constants';

export function useGetNativeAds({params = {}}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_NATIVE_ADS, params],
    () =>
      NativeAdAPI.getNativeAds({
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
