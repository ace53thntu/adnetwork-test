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

  const onHandleSubmit = useCallback(async values => {}, []);

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
