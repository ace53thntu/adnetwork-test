import {NativeAdAPI} from 'api/native-ad.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_NATIVE_AD} from './constants';

export function useGetNativeAd({nativeAdId}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_NATIVE_AD, nativeAdId],
    () =>
      NativeAdAPI.getNativeAd({
        nativeAdId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled: Boolean(nativeAdId)
    }
  );
}
