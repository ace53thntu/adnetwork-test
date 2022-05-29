import {ApiError, StrapConfirmModal} from 'components/common';
import {FormReactSelect, FormTextInput} from 'components/forms';
import PropTypes from 'prop-types';
import {useDeleteAsset} from 'queries/native-ad';
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
    assetId,
    remove,
    assetIndex
  } = props;

  const {mutateAsync: deleteAssetRequest} = useDeleteAsset();
  const isEdit = data?.uuid;

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const watchTypeValue = formWatch(`${assetName}.type`);

  const isShowTextValue = !ASSET_TYPES_IS_FILE.includes(watchTypeValue?.id);

  const handleRemoveAsset = () => {
    setIsOpenDialog(true);
  };

  const handleClose = () => setIsOpenDialog(false);

  const handleAgree = async () => {
    if (isEdit) {
      try {
        await deleteAssetRequest(assetId);
        handleClose();
        ShowToast.success('Remove Asset successfully!');
        remove(assetIndex);
      } catch (error) {
        ShowToast.error(<ApiError apiError={error}/>);
      }
    } else {
      remove(assetIndex);
    }
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={3}>
              <FormTextInput
                type="hidden"
                name={`${assetName}.uuid`}
                defaultValue={data?.uuid}
                applyFieldArray
              />

              <FormTextInput
                isRequired
                label="Custom ID"
                name={`${assetName}.custom_id`}
                defaultValue={data?.custom_id}
                readOnly={isEdit}
                applyFieldArray
              />
            </Col>
            <Col md={3}>
              <FormReactSelect
                label="Type"
                menuPlacement="top"
                bsSize="sm"
                name={`${assetName}.type`}
                disabled={isEdit}
                options={ASSET_TYPES}
                defaultValue={data?.type}
              />
            </Col>

            {isShowTextValue && (
              <Col md={6}>
                <FormTextInput
                  isRequired
                  label="Value"
                  name={`${assetName}.value`}
                  readOnly={isEdit}
                  defaultValue={data?.value}
                  applyFieldArray
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
                  context="asset"
                />
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex justify-content-end">
            <Button color="danger" onClick={handleRemoveAsset}>
              Remove
            </Button>

            <Button
              color="secondary"
              onClick={toggleCollapse}
              className="ml-2"
              type="button"
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
  assetIndex: PropTypes.any
};
AssetForm.defaultProps = {};

export default AssetForm;
