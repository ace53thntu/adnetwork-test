import {UploaderAPI} from 'api/uploader.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useUploadFileRequest() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    formData =>
      UploaderAPI.uploadFile({
        formData,
        options: {
          cancelToken
        }
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {}
    }
  );
}
