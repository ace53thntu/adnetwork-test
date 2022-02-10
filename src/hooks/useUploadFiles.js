import {useUploadFileRequest} from 'queries/uploader';
import React from 'react';
import {useDropzone} from 'react-dropzone';
import {useDispatch} from 'react-redux';
import {commonFileUploadingRedux} from 'store/reducers/common';
import {getUploaderConfig} from 'utils/helpers/storeUploaderConfig.helpers';

const uploaderConfig = getUploaderConfig();
const fileTypePaths = uploaderConfig?.file_type_paths;

export function useUploadFile({
  onChange = () => {},
  accept = 'image/jpeg, image/png',
  maxSize = 50000,
  shouldUpload = false,
  setError,
  name,
  clearErrors,
  disabled,
  fileIndex,
  removeFile,
  fileType = 'BANNER',
  filePath = fileTypePaths?.['BANNER'],
  isInArray = false
}) {
  const dispatch = useDispatch();
  const [files, setFiles] = React.useState([]);
  const [isUploading, setIsUploading] = React.useState(false);

  const {mutateAsync: uploadFileRequest} = useUploadFileRequest();

  const onDrop = React.useCallback(
    async (acceptedFiles, rejectedFiles) => {
      // Do something with the files
      if (acceptedFiles.length) {
        if (isInArray) {
          clearErrors(name.split('[')[0]);
        } else {
          clearErrors(name);
        }
        setIsUploading(true);
        dispatch(commonFileUploadingRedux(true));

        const formData = new FormData();
        formData.append('file_name', acceptedFiles[0].name);
        formData.append('path', filePath);
        formData.append('file_type', fileType);
        formData.append('file', acceptedFiles[0]);

        try {
          const res = await uploadFileRequest(formData);
          const fileUploaded = res?.data;
          const fileObj = {
            ...fileUploaded
          };

          setFiles([fileObj]);
          onChange(fileObj);
          setIsUploading(false);
          dispatch(commonFileUploadingRedux(false));
        } catch (error) {
          //
          setIsUploading(false);
          dispatch(commonFileUploadingRedux(false));
          setError(name, {
            type: 'manual',
            message: error?.message ?? 'Something went wrong'
          });
        }
      } else {
        if (rejectedFiles.length) {
          setError(name, {
            type: 'manual',
            message: rejectedFiles[0].errors[0].message
          });
        }
      }
    },
    [
      clearErrors,
      filePath,
      fileType,
      isInArray,
      name,
      onChange,
      setError,
      uploadFileRequest,
      dispatch
    ]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    inputRef
  } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    maxSize,
    disabled: files.length === 1 || files.length > 1 || isUploading || disabled
  });

  React.useEffect(() => {
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
      dispatch(commonFileUploadingRedux(false));
    };
  }, [files, dispatch]);

  const removeFiles = React.useCallback(() => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);

    if (fileIndex !== null && fileIndex !== undefined) {
      removeFile(fileIndex);
    } else {
      onChange(null);
    }
  }, [fileIndex, files, onChange, removeFile]);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    removeFiles,
    files,
    inputRef,
    isUploading
  };
}
