import {Collapse} from 'components/common';
import PropTypes from 'prop-types';
import * as React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {Button, Col, Row} from 'reactstrap';

import VideoFileForm from './VideoFileForm';

function VideoFiles(props) {
  const {videoId} = props;
  const {control} = useFormContext();

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'files'
  });

  return (
    <Row>
      <Col>
        <div>
          {fields?.map((item, idx) => {
            const fileIndex = idx;
            const fileName = `files[${idx}].file`;
            const defaultValue = item.file;

            return (
              <Collapse
                initialOpen={defaultValue !== null ? false : true}
                title={`File Upload ${idx + 1}`}
                key={item.id}
                unMount={false}
              >
                <VideoFileForm
                  videoId={videoId}
                  fileName={fileName}
                  fileIndex={fileIndex}
                  removeFile={remove}
                  defaultValue={item.file}
                />
              </Collapse>
            );
          })}

          <div className="pb-5 ml-auto">
            <Button
              color="primary"
              type="button"
              className="mt-2"
              onClick={() =>
                append({
                  file: null
                })
              }
            >
              Add File
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

VideoFiles.propTypes = {
  videoId: PropTypes.any
};
VideoFiles.defaultProps = {};

export default VideoFiles;
