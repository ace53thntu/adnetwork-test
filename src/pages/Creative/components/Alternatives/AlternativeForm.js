import {BlockOverlay, StrapConfirmModal} from 'components/common';
import {FormCheckbox, FormTextInput} from 'components/forms';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  useCreateAlternative,
  useDeleteAlternative,
  useUpdateAlternative
} from 'queries/alternative';
import {GET_CREATIVE} from 'queries/creative/constants';
import * as React from 'react';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {Button, Col, Row} from 'reactstrap';
import {useCreativeSelector} from 'store/reducers/creative';
import {difference} from 'utils/helpers/difference.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {alternativeFormValuesToRepo} from '../BannerForm/dto';
import {UploadFile} from '../UploadFile';
import {ACCEPT_FILES, LIMIT_FILE_SIZE, formAlternativeName} from './constants';

function AlternativeForm(props) {
  const {
    toggleCollapse,
    itemIndex,
    defaultValues,
    handleRemoveAlternative
  } = props;

  const client = useQueryClient();
  const {t} = useTranslation();
  const {watch, trigger: formTrigger, reset, getValues} = useFormContext();
  const {selectedCreativeId} = useCreativeSelector();
  const {mutateAsync: updateAlternativeRequest} = useUpdateAlternative();
  const {mutateAsync: deleteAlternativeRequest} = useDeleteAlternative();
  const {mutateAsync: createAlternativeRequest} = useCreateAlternative();

  const prefixName = `${formAlternativeName}[${itemIndex}]`;

  const watchAlternatives = watch(formAlternativeName);
  const watchCurrentAlt = watchAlternatives?.[itemIndex];

  const isEdit = !!watchCurrentAlt?.rawId;
  const isDirty = !_.isEmpty(difference(watchCurrentAlt, defaultValues));

  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  async function handleAgree() {
    if (!isEdit) {
      handleRemoveAlternative(itemIndex);
      handleClose();
    } else {
      setIsLoading(true);
      try {
        handleClose();
        await deleteAlternativeRequest(watchCurrentAlt.rawId);
        setIsLoading(false);
        handleRemoveAlternative(itemIndex);
        ShowToast.success('Delete Alternative successfully!');
        // client.invalidateQueries([GET_CREATIVE, selectedCreativeId]);
      } catch (error) {
        setIsLoading(false);
        ShowToast.error(error?.msg);
      }
    }
  }

  function resetAltValues() {
    const resetAltValues = watchAlternatives.map((val, idx) => {
      if (idx === itemIndex) {
        return _.omit(defaultValues, ['id']);
      }
      return val;
    });
    const formValues = getValues();
    const resetFormValues = {
      ...formValues,
      [formAlternativeName]: resetAltValues
    };
    reset(resetFormValues);
  }

  function handleCancel() {
    if (isEdit) {
      toggleCollapse();
      resetAltValues();
    } else {
      handleRemoveAlternative(itemIndex);
    }
  }

  async function handleSave() {
    const resValid = await formTrigger(formAlternativeName);
    if (!selectedCreativeId) {
      if (resValid) {
        toggleCollapse();
      }
    } else {
      if (resValid) {
        const requestData = alternativeFormValuesToRepo(
          watchCurrentAlt,
          selectedCreativeId
        );

        setIsLoading(true);
        if (isEdit) {
          // update
          try {
            await updateAlternativeRequest({
              alternativeId: watchCurrentAlt.rawId,
              data: requestData
            });
            setIsLoading(false);
            ShowToast.success('Update Alternative successfully!');
            client.invalidateQueries([GET_CREATIVE, selectedCreativeId]);
          } catch (error) {
            setIsLoading(false);
            ShowToast.error(error?.msg);
          }
        } else {
          // add new
          try {
            await createAlternativeRequest(requestData);
            setIsLoading(false);
            ShowToast.success('Add Alternative successfully!');
            client.invalidateQueries([GET_CREATIVE, selectedCreativeId]);
          } catch (error) {
            setIsLoading(false);
            ShowToast.error(error?.msg);
          }
        }
      }
    }
  }

  const handleRemove = () => {
    if (!isEdit && !watchCurrentAlt?.file) {
      handleRemoveAlternative(itemIndex);
    } else {
      setIsOpen(true);
    }
  };

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
                applyFieldArray
              />
              <FormTextInput
                isRequired
                placeholder=""
                name={`${prefixName}.name`}
                label="Name"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.name}
                applyFieldArray
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
                    applyFieldArray
                  />
                </Col>
                {/* <Col>
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
                    applyFieldArray
                  />
                </Col> */}
              </Row>
            </Col>
          </Row>

          {/* <Row>
            <Col>
              <FormTextInput
                placeholder=""
                type="number"
                name={`${prefixName}.min_products`}
                label="Min Products"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.min_products}
                applyFieldArray
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
                applyFieldArray
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
                applyFieldArray
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
                applyFieldArray
              />
            </Col>
          </Row> */}

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
                applyFieldArray
              />
            </Col>

            {/* <Col md={3}>
              <FormTextInput
                placeholder=""
                name={`${prefixName}.catalog_id`}
                label="Catalog ID"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.catalog_id}
                applyFieldArray
              />
            </Col>
            <Col md={4}>
              <FormCheckbox
                defaultValue={defaultValues?.only_catalog_products ?? false}
                name={`${prefixName}.only_catalog_products`}
                label="Only catalog products"
                disabled={isLoading}
                applyFieldArray
              />
            </Col>
            */}
            <Col md={3}>
              <FormCheckbox
                defaultValue={
                  defaultValues?.sound ? defaultValues.sound : false
                }
                name={`${prefixName}.sound`}
                label="Sound"
                disabled={isLoading}
                applyFieldArray
              />
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <FormTextInput
                placeholder=""
                name={`${prefixName}.product_query_string`}
                label="Product query string"
                disable={isLoading}
                bsSize="sm"
                defaultValue={defaultValues?.product_query_string}
                applyFieldArray
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
                applyFieldArray
              />
            </Col>
          </Row> */}
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
            {isEdit ? (
              <Button
                color="danger"
                onClick={handleRemove}
                disabled={isLoading}
                type="button"
              >
                Remove
              </Button>
            ) : null}

            <Button
              color="secondary"
              onClick={handleCancel}
              disabled={isLoading}
              type="button"
              className="ml-2"
            >
              {isEdit ? 'Close ' : t('cancel')}
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
  defaultValues: PropTypes.object,
  fieldId: PropTypes.any
};
AlternativeForm.defaultProps = {};

export default React.memo(AlternativeForm);
