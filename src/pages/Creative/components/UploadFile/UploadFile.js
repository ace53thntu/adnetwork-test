import _ from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {FormGroup, Label} from 'reactstrap';

import Uploader from './Uploader';

function UploadFile(props) {
  const {
    label,
    name,
    maxSize,
    accept,
    defaultValue,
    disabled,
    removeFile,
    fileIndex,
    fileType,
    filePath,
    isInArray,
    onlyPreview,
    context
  } = props;

  const {errors, control, setError, clearErrors} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({onChange, onBlur, value}) => {
        return (
          <FormGroup>
            {label && <Label for="">{label}</Label>}
            <Uploader
              onChange={onChange}
              name={name}
              value={value}
              errors={_.get(errors, name)}
              accept={accept}
              maxSize={maxSize}
              setError={setError}
              clearErrors={clearErrors}
              disabled={disabled}
              removeFile={removeFile}
              fileIndex={fileIndex}
              fileType={fileType}
              filePath={filePath}
              isInArray={isInArray}
              onlyPreview={onlyPreview}
              context={context}
            />
          </FormGroup>
        );
      }}
    />
  );
}

UploadFile.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  name: PropTypes.string.isRequired,
  maxSize: PropTypes.number,
  accept: PropTypes.string,
  defaultValue: PropTypes.any,
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
  onlyPreview: PropTypes.bool,
  context: PropTypes.oneOf(['alternative', 'video', 'asset'])
};
UploadFile.defaultProps = {
  isInArray: false,
  onlyPreview: false
};

export default UploadFile;
