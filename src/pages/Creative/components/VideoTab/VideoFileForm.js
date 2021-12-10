import PropTypes from 'prop-types';
import * as React from 'react';
import {Button, Col, Row} from 'reactstrap';
import {getUploaderConfig} from 'utils/helpers/storeUploaderConfig.helpers';

import {
  ASSET_TYPES,
  getAssetAcceptFile,
  getAssetLimitFileSize
} from '../NativeAdTab/constants';
import {UploadFile} from '..';

const uploaderConfig = getUploaderConfig();
const fileTypePaths = uploaderConfig?.file_type_paths;

function VideoFileForm(props) {
  const {fileIndex, fileName, toggleCollapse, removeFile, defaultValue} = props;

  function handleClose() {
    if (defaultValue) {
      toggleCollapse();
    } else {
      removeFile(fileIndex);
    }
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-center">
            <UploadFile
              isInArray
              name={`${fileName}.file`}
              maxSize={getAssetLimitFileSize(ASSET_TYPES[1].id)}
              accept={getAssetAcceptFile(ASSET_TYPES[1].id)}
              defaultValue={defaultValue}
              removeFile={removeFile}
              fileIndex={fileIndex}
              fileType={'VIDEO'}
              filePath={fileTypePaths?.['VIDEO']}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex justify-content-end">
            <Button color="secondary" onClick={handleClose} className="ml-2">
              Close
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

VideoFileForm.propTypes = {
  fileIndex: PropTypes.any,
  fileName: PropTypes.string,
  toggleCollapse: PropTypes.func,
  removeFile: PropTypes.func,
  defaultValue: PropTypes.any
};
VideoFileForm.defaultProps = {};

export default VideoFileForm;
