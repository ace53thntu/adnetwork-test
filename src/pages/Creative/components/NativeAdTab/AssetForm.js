import {StrapConfirmModal} from 'components/common';
import {FormReactSelect, FormTextInput} from 'components/forms';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Button, Col, Row} from 'reactstrap';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {
  ASSET_TYPES,
  ASSET_TYPES_IS_FILE,
  getAssetAcceptFile,
  getAssetLimitFileSize
} from './constants';
import {UploadFile} from '..';

function AssetForm(props) {
  const {
    assetName,
    formWatch,
    data,
    toggleCollapse,
    // assetId,
    remove,
    assetIndex,
    isLoading
  } = props;

  const isEdit = data?.id;

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const watchTypeValue = formWatch(`${assetName}.type`);

  const isShowTextValue = !ASSET_TYPES_IS_FILE.includes(watchTypeValue?.id);

  const handleRemoveAsset = () => {
    setIsOpenDialog(true);
  };

  const handleClose = () => setIsOpenDialog(false);

  const handleAgree = async () => {
    try {
      // await deleteAssetRequest({assetId, mode: 'soft'});
      handleClose();
      // ShowToast.success('Remove Asset successfully!');
      remove(assetIndex);
    } catch (error) {
      ShowToast.error(error?.message);
    }
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={3}>
              <FormTextInput
                name={`${assetName}.id`}
                defaultValue={data?.id}
                type="hidden"
              />

              <FormTextInput
                isRequired
                name={`${assetName}.custom_id`}
                label="Custom ID"
                disable={isEdit || isLoading}
                defaultValue={data?.custom_id}
              />
            </Col>
            <Col md={3}>
              <FormReactSelect
                name={`${assetName}.type`}
                label="Type"
                disabled={isEdit || isLoading}
                bsSize="sm"
                options={ASSET_TYPES}
                defaultValue={data?.type}
                menuPlacement="top"
              />
            </Col>

            {isShowTextValue && (
              <Col md={6}>
                <FormTextInput
                  isRequired
                  name={`${assetName}.value`}
                  label="Value"
                  disable={isEdit || isLoading}
                  defaultValue={data?.value}
                />
              </Col>
            )}

            {!isShowTextValue && (
              <Col md={6}>
                <UploadFile
                  isInArray
                  name={`${assetName}.file`}
                  maxSize={getAssetLimitFileSize(watchTypeValue.id)}
                  accept={getAssetAcceptFile(watchTypeValue.id)}
                  defaultValue={data?.file}
                  onlyPreview={data?.file ? true : false}
                />
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex justify-content-end">
            {isEdit && (
              <Button color="danger" onClick={handleRemoveAsset}>
                Remove
              </Button>
            )}

            <Button
              color="secondary"
              onClick={toggleCollapse}
              className="ml-2"
              type="button"
              disabled={isLoading}
            >
              Close
            </Button>
          </div>
        </Col>
      </Row>

      <StrapConfirmModal
        isOpen={isOpenDialog}
        toggle={handleClose}
        title="Are you sure to delete this Asset?"
        onOk={handleAgree}
      />
    </>
  );
}

AssetForm.propTypes = {
  assetName: PropTypes.string,
  formWatch: PropTypes.func,
  data: PropTypes.any,
  toggleCollapse: PropTypes.func,
  assetId: PropTypes.any,
  remove: PropTypes.func,
  assetIndex: PropTypes.any,
  isLoading: PropTypes.bool
};
AssetForm.defaultProps = {
  isLoading: false
};

export default AssetForm;
