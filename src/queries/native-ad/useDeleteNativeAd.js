import {NativeAdAPI} from 'api/native-ad.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useDeleteNativeAd() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    nativeAdId =>
      NativeAdAPI.deleteNativeAd({nativeAdId, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
