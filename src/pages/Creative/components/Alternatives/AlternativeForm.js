import {BlockOverlay, StrapConfirmModal} from 'components/common';
import {FormCheckbox, FormTextInput} from 'components/forms';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Button, Col, Row} from 'reactstrap';
import {difference} from 'utils/helpers/difference.helpers';

import {UploadFile} from '../UploadFile';
import {ACCEPT_FILES, LIMIT_FILE_SIZE, formAlternativeName} from './constants';

function AlternativeForm(props) {
  const {
    toggleCollapse,
    itemIndex,
    defaultValues,
    handleRemoveAlternative
  } = props;

  const {t} = useTranslation();
  const {watch} = useFormContext();

  const prefixName = `${formAlternativeName}[${itemIndex}]`;

  const watchAlternatives = watch(formAlternativeName);
  const watchCurrentAlt = watchAlternatives?.[itemIndex];

  const isDirty = !_.isEmpty(difference(watchCurrentAlt, defaultValues));

  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  async function handleAgree() {
    // if (!rawAlternative) {
    //   handleRemoveAlternative(itemIndex);
    //   handleClose();
    // } else {
    //   try {
    //     await deleteAlternativeRequest(rawAlternative.id);
    //     ShowToast.success('Delete Alternative successfully!');
    //     handleRemoveAlternative(rawAlternative.id);
    //     handleClose();
    //     client.invalidateQueries(['GET_CREATIVE_BY_ID', creativeId]);
    //   } catch (error) {
    //     ShowToast.error(error?.msg);
    //   }
    // }
  }

  function handleCancel() {
    // if (creativeId) {
    //   toggleCollapse();
    // } else {
    handleRemoveAlternative(itemIndex);
    // }
  }

  async function handleSave() {
    // if (creativeId) {
    //   const resValid = await formTrigger('alternatives');
    //   if (resValid) {
    //     setIsLoading(true);
    //     const alternatives = formGetValues()?.alternatives ?? [];
    //     const currentAlternative = alternatives[itemIndex];
    //     const requestData = alternativeFormValuesToRepo(
    //       currentAlternative,
    //       creativeId
    //     );

    //     if (rawAlternative) {
    //       try {
    //         await updateAlternativeRequest({
    //           alternativeId: rawAlternative.id,
    //           updatedData: requestData
    //         });
    //         setIsLoading(false);
    //         ShowToast.success('Update Alternative successfully!');
    //         client.invalidateQueries(['GET_CREATIVE_BY_ID', creativeId]);
    //       } catch (error) {
    //         setIsLoading(false);
    //         ShowToast.error(error?.msg);
    //       }
    //     } else {
    //       try {
    //         await createAlternativeRequest(requestData);
    //         setIsLoading(false);
    //         ShowToast.success('Add Alternative successfully!');
    //         client.invalidateQueries(['GET_CREATIVE_BY_ID', creativeId]);
    //       } catch (error) {
    //         setIsLoading(false);
    //         ShowToast.error(error?.msg);
    //       }
    //     }
    //   }
    // } else {
    //   toggleCollapse();
    // }

    toggleCollapse();
  }

  return (
    <>
      <Row>
        {isLoading && <BlockOverlay />}
        <Col md={7}>
          <Row>
            <Col md="12">
              <FormTextInput
                name={`${prefixName}.rawId`}
                label="Raw ID"
                type="hidden"
                bsSize="sm"
                defaultValue={defaultValues?.rawId}
              />
              <FormTextInput
                isRequired
                placeholder=""
                name={`${prefixName}.name`}
                label="Name"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.name}
              />
            </Col>
            <Col md="12">
              <Row>
                <Col>
                  <FormTextInput
                    placeholder=""
                    type="textarea"
                    name={`${prefixName}.description`}
                    label="Description"
                    disable={isLoading}
                    rows={2}
                    style={{
                      resize: 'none'
                    }}
                    bsSize="sm"
                    defaultValue={defaultValues?.description}
                  />
                </Col>
                <Col>
                  <FormTextInput
                    placeholder=""
                    type="textarea"
                    name={`${prefixName}.products`}
                    label="Products"
                    disable={isLoading}
                    rows={2}
                    style={{
                      resize: 'none'
                    }}
                    bsSize="sm"
                    defaultValue={defaultValues?.products}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormTextInput
                placeholder=""
                type="number"
                name={`${prefixName}.min_products`}
                label="Min Products"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.min_products}
              />
            </Col>
            <Col>
              <FormTextInput
                placeholder=""
                type="number"
                name={`${prefixName}.max_products`}
                label="Max Products"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.max_products}
              />
            </Col>
            <Col>
              <FormTextInput
                placeholder=""
                type="number"
                name={`${prefixName}.product_width`}
                label="Product width"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.product_width}
              />
            </Col>
            <Col>
              <FormTextInput
                placeholder=""
                type="number"
                name={`${prefixName}.product_height`}
                label="Product height"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.product_height}
              />
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <FormTextInput
                placeholder=""
                type="number"
                name={`${prefixName}.priority`}
                label="Priority"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.priority}
              />
            </Col>

            <Col md={3}>
              <FormTextInput
                placeholder=""
                name={`${prefixName}.catalog_id`}
                label="Catalog ID"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.catalog_id}
              />
            </Col>
            <Col md={4}>
              <FormCheckbox
                defaultValue={defaultValues?.only_catalog_products ?? false}
                name={`${prefixName}.only_catalog_products`}
                label="Only catalog products"
                disabled={isLoading}
              />
            </Col>
            <Col md={3}>
              <FormCheckbox
                defaultValue={
                  defaultValues?.sound ? defaultValues.sound : false
                }
                name={`${prefixName}.sound`}
                label="Sound"
                disabled={isLoading}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormTextInput
                placeholder=""
                name={`${prefixName}.product_query_string`}
                label="Product query string"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.product_query_string}
              />
            </Col>
            <Col>
              <FormTextInput
                placeholder=""
                name={`${prefixName}.extra_config`}
                label="Extra config"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.extra_config}
              />
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <UploadFile
            isInArray
            name={`${prefixName}.file`}
            maxSize={LIMIT_FILE_SIZE}
            accept={ACCEPT_FILES}
            defaultValue={defaultValues?.file}
            onlyPreview={defaultValues?.file ? true : false}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex justify-content-end">
            {/* {creativeId ? (
              <Button
                color="danger"
                onClick={handleRemove}
                disabled={isLoading}
                type="button"
              >
                Remove
              </Button>
            ) : null} */}

            <Button
              color="secondary"
              onClick={handleCancel}
              disabled={isLoading}
              type="button"
              className="ml-2"
            >
              {t('cancel')}
            </Button>
            <Button
              color="primary"
              disabled={isLoading || !isDirty}
              type="button"
              className="ml-2"
              onClick={handleSave}
            >
              {t('save')}
            </Button>
          </div>
        </Col>
      </Row>

      <StrapConfirmModal
        isOpen={isOpen}
        toggle={handleClose}
        title="Are you sure to delete this alternative?"
        onOk={handleAgree}
      />
    </>
  );
}

AlternativeForm.propTypes = {
  toggleCollapse: PropTypes.func,
  itemIndex: PropTypes.number,
  defaultValues: PropTypes.object
};
AlternativeForm.defaultProps = {};

export default AlternativeForm;
