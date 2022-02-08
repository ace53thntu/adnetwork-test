//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm, Controller, useWatch} from 'react-hook-form';
import {
  Button,
  Col,
  Form,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

//---> Internal Modules
import {LoadingIndicator} from 'components/common';
import {ActiveToggle, FormReactSelect} from 'components/forms';
import {
  InputNames,
  TrackerReferenceTypeOptions,
  TrackerReferenceTypes
} from '../constant';
import {useTranslation} from 'react-i18next';
import {useDefaultValues} from '../hook';
import {schemaValidate} from './validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {formToApi} from 'entities/Tracker';
import {useCreateTracker, useEditTracker} from 'queries/tracker';
import TemplateSelect from './TemplateSelect';
import CreativeSelect from './CreativeSelect';
import VideoSelect from './VideoSelect';
import NativeAdsSelect from './NativeAdsSelect';
import InventorySelect from './InventorySelect';
import FormCodeMirror from 'components/forms/FormCodeMirror';

const propTypes = {
  title: PropTypes.string,
  toggle: PropTypes.func,
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  tracker: PropTypes.any
};

const TrackerForm = ({
  title = 'Create tracker',
  isEdit = false,
  toggle = () => null,
  isLoading = false,
  tracker = null
}) => {
  const {t} = useTranslation();
  // React Query - hooks
  const {mutateAsync: createTracker} = useCreateTracker();
  const {mutateAsync: editTracker} = useEditTracker(tracker?.uuid);

  const defaultValues = useDefaultValues({tracker});
  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control, setValue} = methods;
  const referenceTypeSelected = useWatch({
    name: InputNames.REFERENCE_TYPE,
    control
  });

  React.useEffect(() => {
    if (referenceTypeSelected?.value !== defaultValues?.reference_type?.value) {
      setValue(InputNames.REFERENCE_UUID, null);
    }
  }, [defaultValues?.reference_type?.value, referenceTypeSelected, setValue]);

  async function onSubmit(formData) {
    const data = formToApi({formData});
    if (!isEdit) {
      try {
        await createTracker(data);
        ShowToast.success('Created tracker successfully');
        toggle();
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to create tracker');
      }
    } else {
      try {
        await editTracker({trackerId: tracker?.uuid, data});
        ShowToast.success('Updated tracker successfully');
        toggle();
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to update tracker');
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {isLoading && <LoadingIndicator />}
            <Row>
              {/* Tracker Template */}
              <Col sm="6">
                <TemplateSelect
                  name={InputNames.TEMPLATE_UUID}
                  label={t('template')}
                  placeholder={t('selectTemplate')}
                  defaultValue={null}
                />
              </Col>

              {/* Status */}
              <Col sm="6">
                <Label className="mr-5">{t('status')}</Label>
                <Controller
                  control={control}
                  name={InputNames.STATUS}
                  render={({onChange, onBlur, value, name}) => (
                    <ActiveToggle value={value} onChange={onChange} />
                  )}
                />
              </Col>

              {/* Reference Type */}
              <Col sm={6}>
                <FormReactSelect
                  name={InputNames.REFERENCE_TYPE}
                  label={t('referenceType')}
                  placeholder={t('selectReferenceType')}
                  options={TrackerReferenceTypeOptions}
                  defaultValue={null}
                />
              </Col>

              <Col sm={6}>
                {referenceTypeSelected?.value ===
                  TrackerReferenceTypes.CREATIVE && (
                  <CreativeSelect
                    name={InputNames.REFERENCE_UUID}
                    label={t('creative')}
                    placeholder={t('selectCreative')}
                    defaultValue={null}
                  />
                )}
                {referenceTypeSelected?.value ===
                  TrackerReferenceTypes.NATIVE_AD && (
                  <NativeAdsSelect
                    name={InputNames.REFERENCE_UUID}
                    label={t('nativeAds')}
                    placeholder={t('selectNativeAds')}
                    defaultValue={null}
                  />
                )}
                {referenceTypeSelected?.value ===
                  TrackerReferenceTypes.VIDEO && (
                  <VideoSelect
                    name={InputNames.REFERENCE_UUID}
                    label={t('video')}
                    placeholder={t('selectVideo')}
                    defaultValue={null}
                  />
                )}
                {referenceTypeSelected?.value ===
                  TrackerReferenceTypes.INVENTORY && (
                  <InventorySelect
                    name={InputNames.REFERENCE_UUID}
                    label={t('inventory')}
                    placeholder={t('selectInventory')}
                    defaultValue={null}
                  />
                )}
              </Col>

              {/* Variables */}
              <Col sm={12}>
                <FormCodeMirror
                  name={InputNames.VARIABLES}
                  label={t('variables')}
                  placeholder={`{"key": "value"}`}
                  extension="JSON"
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={toggle} type="button">
              {t('cancel')}
            </Button>
            <Button color="primary" type="submit" disabled={!formState.isDirty}>
              {t('save')}
            </Button>
          </ModalFooter>
        </BlockUi>
      </Form>
    </FormProvider>
  );
};

TrackerForm.propTypes = propTypes;

export default TrackerForm;
