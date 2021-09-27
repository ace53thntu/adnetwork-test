//---> Build-in Modules
import React, {useState} from 'react';

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
  name: 'name',
  enable_deal: 'enable_deal'
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
      enable_deal: 'active',
      type: null
    }
    // resolver: validationEvent()
  });
  const {handleSubmit, formState} = methods;

  // local states
  const [isLoading, setIsLoading] = useState(false);

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
          autoComplete="off"
        >
          <BlockUi tag="div" blocking={isLoading}>
            <ModalHeader>Inventory Information</ModalHeader>
            <ModalBody>
              <div className="d-flex justify-content-end">
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
                <FormGroup className="d-flex justify-content-end mb-0 ml-3">
                  <FormToggle
                    name={formName.enable_deal}
                    defaultCheckedValue="active"
                    label={t('enableDeal')}
                    values={{
                      checked: 'active',
                      unChecked: 'inactive'
                    }}
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <FormTextInput
                  isRequired
                  name="name"
                  placeholder="Name..."
                  label={t('name')}
                  disable={formState.isSubmitting}
                />
              </FormGroup>
              <Row>
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
                    name="floor_price"
                    placeholder="0.0"
                    s
                    label={t('floorPrice')}
                    disable={formState.isSubmitting}
                  />
                </Col>
              </Row>

              <Row>
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
                    name="tracker_template_uuid"
                    label={t('trackerTemplate')}
                    placeholder="Select tracker template"
                    optionLabelField="name"
                    options={trackerTemplates}
                    disabled={formState.isSubmitting}
                    multiple={false}
                  />
                </Col>
              </Row>
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
