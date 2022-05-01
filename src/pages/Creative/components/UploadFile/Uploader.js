import {useUploadFile} from 'hooks/useUploadFiles';
import PropTypes from 'prop-types';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, FormFeedback, Row} from 'reactstrap';

import FileInformation from './FileInformation';
import {DropArea} from './UploadFile.styles';

function Uploader(props) {
  const {
    onChange,
    name,
    errors,
    maxSize,
    accept,
    value,
    setError,
    clearErrors,
    disabled,
    removeFile,
    fileIndex,
    fileType,
    filePath,
    isInArray,
    onlyPreview,
    context
  } = props;

  const {t} = useTranslation();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    removeFiles,
    files,
    isUploading
  } = useUploadFile({
    onChange,
    name,
    accept,
    maxSize,
    shouldUpload: true,
    setError,
    clearErrors,
    disabled,
    removeFile,
    fileIndex,
    fileType,
    filePath,
    isInArray,
    context
  });

  const file = value?.uuid ? value : files?.[0] ? files[0] : null;

  return (
    <Row>
      {!file && (
        <Col sm={12}>
          <div>
            <DropArea
              className="dropzone-wrapper"
              style={!!errors?.message ? {borderColor: 'red'} : {}}
            >
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="dropzone-content">
                  {isUploading ? (
                    'Uploading...'
                  ) : isDragActive ? (
                    <p>{t('dropTheFileHere')}</p>
                  ) : isDragReject ? (
                    <p>{t('dropFileWillBeRejected')}</p>
                  ) : (
                    <p>Drag 'n' drop file here, or click to select file.</p>
                  )}
                </div>
              </div>
            </DropArea>

            {!!errors?.message ? (
              <FormFeedback className="d-block text-center">
                {errors?.message}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
      )}

      {Boolean(file) && (
        <FileInformation
          file={file}
          removeFiles={removeFiles}
          disabled={disabled}
          onlyPreview={onlyPreview}
        />
      )}
    </Row>
  );
}

Uploader.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  errors: PropTypes.object,
  maxSize: PropTypes.number,
  accept: PropTypes.string,
  value: PropTypes.any,
  setError: PropTypes.func,
  clearErrors: PropTypes.func,
  disabled: PropTypes.bool,
  removeFile: PropTypes.func,
  fileIndex: PropTypes.number,
  fileType: PropTypes.oneOf([
    'DCO_BANNER',
    'DCO_EXTRA',
    'RAW_DATA_REPORT',
    'TRANSPARENCY_REPORT',
    'VAST',
    'BANNER',
    'LOGO',
    'CONVERSION_REPORT',
    'VIDEO',
    'HTML',
    'REPORT_ASSET',
    'CATALOG'
  ]),
  filePath: PropTypes.oneOf([
    'dco_banner',
    'dco_extra',
    'raw_data_report',
    'transparency_report',
    'vast',
    'banner',
    'logo',
    'conversion_report',
    'video',
    'html',
    'report_asset',
    'catalog'
  ]),
  isInArray: PropTypes.bool,
  onlyPreview: PropTypes.bool
};
Uploader.defaultProps = {
  onlyPreview: false
};

export default Uploader;
