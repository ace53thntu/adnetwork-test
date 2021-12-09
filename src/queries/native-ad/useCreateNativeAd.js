import {NativeAdAPI} from 'api/native-ad.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useCreateNativeAd() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    data => NativeAdAPI.createNativeAd({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
