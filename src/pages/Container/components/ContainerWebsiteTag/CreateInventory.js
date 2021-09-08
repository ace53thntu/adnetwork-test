//---> Build-in Modules
import React, {useCallback, useEffect, useState} from 'react';

//---> External Modules
import {
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import BlockUi from 'react-block-ui';
import {useParams} from 'react-router-dom';

//---> Internal Modules
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {
  getInventoryFormats,
  getInventoryTypes
} from 'pages/Container/constants';
import InventoryProperty from './InventoryProperty';
import {useCreateInventory} from 'queries/inventory';
import {destructureFormData} from './utils';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useTrackerTemplateOptions} from 'pages/Container/hooks/useTrackerTemplateOptions';
import {usePositionOptions} from 'pages/Campaign/hooks';
import {useTranslation} from 'react-i18next';

const formName = {
  properties: 'properties',
  status: 'status',
  type: 'type',
  collect_type: 'collect_type',
  traits: 'traits',
  name: 'name'
};

function CreateInventory({isOpen = false, toggle = () => {}}) {
  const {t} = useTranslation();
  const {pageId} = useParams();
  const inventoryTypes = getInventoryTypes();
  const inventoryFormats = getInventoryFormats();
  const trackerTemplates = useTrackerTemplateOptions();
  const positions = usePositionOptions();
  const {mutateAsync: createInventory} = useCreateInventory();

  const methods = useForm({
    defaultValues: {
      status: 'active',
      type: null
    }
    // resolver: validationEvent()
  });
  const {handleSubmit, reset, formState} = methods;

  // local states
  const [isLoading, setIsLoading] = useState(false);

  // funcs
  const resetForm = useCallback(() => {
    reset({
      status: 'active',
      type: null
    });
  }, [reset]);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const onHandleSubmit = async values => {
    const formData = destructureFormData(pageId, values);
    setIsLoading(true);
    try {
      await createInventory(formData);
      ShowToast.success('Created Inventory successfully!', {
        closeOnClick: true
      });

      setIsLoading(false);
    } catch (err) {
      console.log(
        '🚀 ~ file: CreateInventory.js ~ line 114 ~ CreateInventory ~ err',
        err
      );
      ShowToast.error(err, {
        closeOnClick: true
      });
    } finally {
      toggle();
    }
  };

  return (
    <Modal
      unmountOnClose
      size="lg"
      className="modal-dialog shadow-none"
      isOpen={isOpen}
      toggle={toggle}
    >
      <FormProvider {...methods} key="create-event">
        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          name="create-event"
          key="create-event"
        >
          <BlockUi tag="div" blocking={isLoading}>
            <ModalHeader>Inventory Information</ModalHeader>
            <ModalBody>
              <FormGroup className="d-flex justify-content-end mb-0">
                <FormToggle
                  name={formName.status}
                  defaultCheckedValue="active"
                  label={t('status')}
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                />
              </FormGroup>
              <FormGroup>
                <FormTextInput
                  isRequired
                  name="name"
                  placeholder="Name..."
                  label={t('name')}
                  disable={formState.isSubmitting}
                />
              </FormGroup>
              <FormGroup row>
                <Col sm={4}>
                  <FormReactSelect
                    required={false}
                    name="type"
                    label={t('type')}
                    placeholder="Select type"
                    optionLabelField="name"
                    options={inventoryTypes}
                    disabled={formState.isSubmitting}
                    multiple={false}
                  />
                </Col>
                <Col sm={4}>
                  <FormReactSelect
                    required={false}
                    name="format"
                    label={t('format')}
                    placeholder="Select format"
                    optionLabelField="name"
                    options={inventoryFormats}
                    disabled={formState.isSubmitting}
                    multiple={false}
                  />
                </Col>
                <Col sm={4}>
                  <FormTextInput
                    isRequired={false}
                    name="minimum_price"
                    placeholder="0.0"
                    s
                    label={t('floorPrice')}
                    disable={formState.isSubmitting}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={4}>
                  <FormTextInput
                    isRequired={false}
                    name="merge"
                    placeholder={`${t('merge')}...`}
                    label={t('merge')}
                    disable={formState.isSubmitting}
                  />
                </Col>
                <Col sm={4}>
                  <FormReactSelect
                    required={false}
                    name="position_id"
                    label={t('position')}
                    placeholder="Select position"
                    optionLabelField="name"
                    options={positions}
                    disabled={formState.isSubmitting}
                    multiple={false}
                  />
                </Col>
                <Col sm={4}>
                  <FormReactSelect
                    required={false}
                    name="tracker_template_id"
                    label={t('trackerTemplate')}
                    placeholder="Select tracker template"
                    optionLabelField="name"
                    options={trackerTemplates}
                    disabled={formState.isSubmitting}
                    multiple={false}
                  />
                </Col>
              </FormGroup>
              <InventoryProperty />
            </ModalBody>
            <ModalFooter>
              {/* <Button color="secondary" onClick={toggle}>
                Cancel
              </Button> */}
              {formState.isDirty ? (
                <ButtonLoading
                  loading={isLoading}
                  type="submit"
                  className="ml-2 btn-primary"
                  disabled={!formState.isDirty}
                >
                  Save
                </ButtonLoading>
              ) : null}
            </ModalFooter>
          </BlockUi>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default CreateInventory;
