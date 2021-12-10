import {NativeAdAPI} from 'api/native-ad.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useDeleteAsset() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    assetId => NativeAdAPI.deleteAsset({assetId, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
