//---> Build-in Modules
import React, {useCallback, useEffect, useState} from 'react';

//---> External Modules
import BlockUi from 'react-block-ui';
import {useForm, FormProvider} from 'react-hook-form';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Badge
} from 'reactstrap';

//---> Internal Modules
import {getInventoryFormats, getInventoryTypes} from '../../constants';
import {validationEvent} from './validations';
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useEditInventory, useGetInventory} from 'queries/inventory';
import InventoryProperty from './InventoryProperty';
import {useDefaultInventory} from 'pages/Container/hooks/useDefaultInventory';
import {destructureFormData} from './utils';
import {useTrackerTemplateOptions} from 'pages/Container/hooks/useTrackerTemplateOptions';
import {usePositionOptions} from 'pages/Campaign/hooks';
import {useTranslation} from 'react-i18next';

const formName = {
  properties: 'properties',
  status: 'status',
  type: 'type',
  name: 'name',
  enable_deal: 'enable_deal'
};

export default function UpdateInventory({
  toggle = () => {},
  inventoryId = null,
  pageId
}) {
  const {data: inventory, isFetching} = useGetInventory(inventoryId);
  console.log('🚀 ~ file: UpdateInventory.js ~ line 45 ~ inventory', inventory);
  if (isFetching) {
    return (
      <>
        <ModalHeader>Inventory Information</ModalHeader>
        <ModalBody>
          <div>Loading...</div>
        </ModalBody>
      </>
    );
  }

  return <FormUpdate toggle={toggle} inventory={inventory} pageId={pageId} />;
}

function FormUpdate({toggle, inventory, pageId}) {
  const {t} = useTranslation();
  const trackerTemplates = useTrackerTemplateOptions();
  const inventoryTypes = getInventoryTypes();
  const inventoryFormats = getInventoryFormats();
  const positions = usePositionOptions();
  const defaultValues = useDefaultInventory({
    inventory,
    trackerTemplates,
    positions
  });
  const methods = useForm({
    defaultValues,
    resolver: validationEvent([], true)
  });
  const {handleSubmit, formState, reset} = methods;

  const {mutateAsync: editInventory} = useEditInventory();

  // local states
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onHandleSubmit = useCallback(
    async values => {
      const formData = destructureFormData(pageId, values);
      setIsLoading(true);
      try {
        await editInventory({inventoryId: defaultValues?.uuid, data: formData});
        ShowToast.success('Update Inventory successfully!', {
          closeOnClick: true
        });
        toggle();
      } catch (err) {
        ShowToast.error(err, {
          closeOnClick: true
        });
      } finally {
        setIsLoading(false);
      }
    },
    [defaultValues?.uuid, editInventory, pageId, toggle]
  );

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          name="create-inventory"
          key="create-inventory"
          autoComplete="off"
        >
          <BlockUi tag="div" blocking={isLoading}>
            <ModalHeader>Inventory Information</ModalHeader>
            <ModalBody>
              <FormGroup className="d-flex justify-content-end mb-0">
                <label className="mr-3">
                  <span className="mr-2">Click rate</span>
                  <Badge color="primary" pill>
                    {defaultValues?.click_rate}
                  </Badge>
                </label>
                <label className="mr-3">
                  <span className="mr-2">Fill rate</span>
                  <Badge color="success" pill>
                    {defaultValues?.fill_rate}
                  </Badge>
                </label>
                <FormToggle
                  name={formName.status}
                  defaultCheckedValue="active"
                  label={t('status')}
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                />
                <FormToggle
                  className="ml-2"
                  name={formName.enable_deal}
                  defaultCheckedValue="active"
                  label={t('enableDeal')}
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
                    name="floor_price"
                    placeholder="0.0"
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
                    name="tracker_template_uuid"
                    label={t('trackerTemplate')}
                    placeholder="Select tracker template"
                    optionLabelField="name"
                    options={trackerTemplates}
                    disabled={formState.isSubmitting}
                    multiple={false}
                  />
                </Col>
              </FormGroup>
              <InventoryProperty currentInventory={defaultValues} />
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
    </>
  );
}
