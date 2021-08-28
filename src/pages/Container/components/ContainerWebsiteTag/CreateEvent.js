//---> Build-in Modules
import React, {useCallback, useEffect, useState} from 'react';

//---> External Modules
import {
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
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

const formName = {
  properties: 'properties',
  status: 'status',
  type: 'type',
  collect_type: 'collect_type',
  traits: 'traits',
  name: 'name'
};

function CreateEvent({isOpen = false, toggle = () => {}}) {
  const {pageId} = useParams();
  const inventoryTypes = getInventoryTypes();
  const inventoryFormats = getInventoryFormats();
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

  const destructureFormData = formData => {
    const {
      name,
      format,
      merge,
      metadata,
      minimum_price,
      position_id = 0,
      status,
      tracker_template_id = 0,
      type
    } = formData;
    const formatData = format?.value;
    const minimumPriceData = parseFloat(minimum_price) || '';
    const formatMetadata = {
      ...metadata,
      duration: parseInt(metadata?.duration) ?? 0,
      width: parseInt(metadata?.duration) ?? 0,
      height: parseInt(metadata?.duration) ?? 0,
      tags: metadata?.tags?.map(item => item.value)
    };

    return {
      page_uuid: pageId,
      name,
      format: formatData,
      merge,
      status,
      minimum_price: minimumPriceData,
      type: type?.value ?? '',
      metadata: formatMetadata,
      position_id,
      tracker_template_id
    };
  };

  const onHandleSubmit = async values => {
    console.log(
      '🚀 ~ file: CreateEvent.js ~ line 68 ~ CreateEvent ~ values',
      values
    );
    const formData = destructureFormData(values);
    setIsLoading(true);
    try {
      await createInventory(formData);
    } catch (err) {
      console.log(
        '🚀 ~ file: CreateEvent.js ~ line 114 ~ CreateEvent ~ err',
        err
      );
    }
    setIsLoading(false);
    toggle();
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
                  label="Status"
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
                  label="Name"
                  disable={formState.isSubmitting}
                />
              </FormGroup>
              <FormGroup row>
                <Col sm={4}>
                  <FormReactSelect
                    required={false}
                    name="type"
                    label="Type"
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
                    label="Format"
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
                    label="Minimum Price"
                    disable={formState.isSubmitting}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={4}>
                  <FormTextInput
                    isRequired={false}
                    name="merge"
                    placeholder="Merge..."
                    label="Merge"
                    disable={formState.isSubmitting}
                  />
                </Col>
                <Col sm={4}>
                  <FormReactSelect
                    required={false}
                    name="position_id"
                    label="Position"
                    placeholder="Select position"
                    optionLabelField="name"
                    options={[]}
                    disabled={formState.isSubmitting}
                    multiple={false}
                  />
                </Col>
                <Col sm={4}>
                  <FormReactSelect
                    required={false}
                    name="tracker_template_id"
                    label="Tracker template"
                    placeholder="Select tracker template"
                    optionLabelField="name"
                    options={[]}
                    disabled={formState.isSubmitting}
                    multiple={false}
                  />
                </Col>
              </FormGroup>
              <InventoryProperty />
            </ModalBody>
            <ModalFooter>
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

              {/* <Button color="secondary" onClick={toggle}>
                Cancel
              </Button> */}
            </ModalFooter>
          </BlockUi>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default CreateEvent;
