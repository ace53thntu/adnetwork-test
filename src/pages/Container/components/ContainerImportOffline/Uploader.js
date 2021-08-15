//---> Build-in Modules
import React, {useEffect} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Button, Col, FormFeedback, Row} from 'reactstrap';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import {isImage, readableBytes} from 'utils/helpers/files.helpers';
import {useUploadFile} from 'pages/Container/hooks/useUploadFile';

const limitFileSize = 52428800; // 50MB

const Uploader = ({
  onChange,
  name,
  value,
  setIsSubmitted,
  isSubmitted,
  errors
}) => {
  const {t} = useTranslation();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    removeFiles,
    files
  } = useUploadFile({
    onChange,
    name,
    accept: 'text/csv, application/json, .csv, .json',
    maxSize: limitFileSize
  });

  useEffect(() => {
    if (isSubmitted) {
      setIsSubmitted(false);
      setTimeout(() => {
        removeFiles();
      }, 500);
    }
  }, [isSubmitted, removeFiles, setIsSubmitted]);

  const file = files[0] ?? null;

  return (
    <Row>
      <Col sm={6}>
        <div
          className="dropzone-wrapper dropzone-wrapper-sm"
          style={!!errors?.message ? {borderColor: 'red'} : {}}
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="dropzone-content">
              {isDragActive ? (
                <p>{t('dropTheFileHere')}</p>
              ) : isDragReject ? (
                <p>{t('dropFileWillBeRejected')}</p>
              ) : (
                <p>Drag 'n' drop file here, or click to select file.</p>
              )}
            </div>
          </div>
        </div>

        {!!errors?.message ? (
          <FormFeedback className="d-block">{errors?.message}</FormFeedback>
        ) : null}
      </Col>

      {file ? (
        <Col sm={6}>
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left mr-3">
                <div className="widget-content-left">
                  <div className="avatar-icon-wrapper avatar-icon-lg mr-2">
                    {isImage(file.type) ? (
                      <div
                        className="avatar-icon rounded btn-hover-shine"
                        style={{background: '#fff'}}
                      >
                        <img src={file?.preview} alt="Avatar 5" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="widget-content-left flex2">
                <div className="widget-heading">{file?.name}</div>
                <div className="widget-subheading opacity-10">
                  <span className="pr-2">{readableBytes(file?.size)}</span>
                </div>
              </div>
              <div className="widget-content-right">
                <Button
                  className="border-0 btn-transition"
                  outline
                  color="danger"
                  onClick={removeFiles}
                  // disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </div>
            </div>
          </div>
        </Col>
      ) : null}
    </Row>
  );
};

export default Uploader;
