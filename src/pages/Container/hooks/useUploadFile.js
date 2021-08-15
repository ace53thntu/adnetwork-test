import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

export function useUploadFile({
  onChange,
  accept = 'image/jpeg, image/png',
  maxSize = 50000
}) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      // Do something with the files
      if (acceptedFiles.length) {
        try {
          setFiles(
            acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          );
          onChange(acceptedFiles[0]);
        } catch (error) {
          //
        }
      } else {
        //
      }
    },
    [onChange]
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
    disabled: files.length === 1 || files.length > 1
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const removeFiles = useCallback(() => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
    onChange(null);
  }, [files, onChange]);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    removeFiles,
    files,
    inputRef
  };
}
