import {StrapConfirmModal} from 'components/common';
import {FILE_DISPLAY_URL} from 'constants/index';
import PropTypes from 'prop-types';
import * as React from 'react';
import {readableBytes} from 'utils/helpers/files.helpers';

import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {ALLOWED_VIDEO_TYPES} from '../BannerForm/constants';
import {
  FileInformationContainer,
  PreviewImage,
  PreviewInfoContainer,
  PreviewVideo,
  RemoveImgButton
} from './UploadFile.styles';

function FileInformation(props) {
  const {file, removeFiles, onlyPreview, disabled} = props;

  const [isOpen, setIsOpen] = React.useState(false);

  function handleRemove() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleAgree() {
    removeFiles();
    handleClose();
  }

  return (
    <FileInformationContainer>
      {ALLOWED_VIDEO_TYPES.includes(file.mimeType) ? (
        <PreviewVideo controls src={`${FILE_DISPLAY_URL}/${file?.uuid}`} />
      ) : (
        <PreviewImage
          src={`${FILE_DISPLAY_URL}/${file?.uuid}`}
          alt={file?.originalName ?? 'This is an image'}
        />
      )}

      {!onlyPreview && !disabled && (
        <RemoveImgButton
          className="btn btn-transition"
          color="danger"
          onClick={handleRemove}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </RemoveImgButton>
      )}

      <PreviewInfoContainer>
        <span>{file.originalName}</span>
        <span>{readableBytes(file?.size ?? 0)}</span>
      </PreviewInfoContainer>

      <StrapConfirmModal
        isOpen={isOpen}
        toggle={handleClose}
        title="Are you sure to delete this file?"
        onOk={handleAgree}
      />
    </FileInformationContainer>
  );
}

FileInformation.propTypes = {
  file: PropTypes.any,
  removeFiles: PropTypes.func,
  onlyPreview: PropTypes.bool,
  disabled: PropTypes.bool
};
FileInformation.defaultProps = {
  onlyPreview: false,
  disabled: false
};

export default FileInformation;
