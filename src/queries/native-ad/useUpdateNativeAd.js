import {NativeAdAPI} from 'api/native-ad.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useUpdateNativeAd() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    ({nativeAdId, data}) =>
      NativeAdAPI.updateNativeAd({nativeAdId, data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
