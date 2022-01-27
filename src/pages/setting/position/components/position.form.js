//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm, Controller} from 'react-hook-form';
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
import {ActiveToggle, FormTextInput} from 'components/forms';
import {InputNames} from '../constant';
import {useTranslation} from 'react-i18next';
import {useDefaultValues} from '../hook';
import {schemaValidate} from './validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {formToApi} from 'entities/Position';
import {useCreatePosition, useEditPosition} from 'queries/position';

const propTypes = {
  title: PropTypes.string,
  toggle: PropTypes.func,
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  position: PropTypes.any
};

const PositionForm = ({
  title = 'Create position',
  isEdit = false,
  toggle = () => null,
  isLoading = false,
  position = null
}) => {
  const {t} = useTranslation();
  // React Query - hooks
  const {mutateAsync: createPosition} = useCreatePosition();
  const {mutateAsync: editPosition} = useEditPosition(position?.uuid);

  const defaultValues = useDefaultValues({position});
  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control} = methods;

  async function onSubmit(formData) {
    const data = formToApi({formData});
    if (!isEdit) {
      try {
        await createPosition(data);
        ShowToast.success('Created position successfully');
        toggle();
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to create position');
      }
    } else {
      try {
        await editPosition({positionId: position?.uuid, data});
        ShowToast.success('Updated position successfully');
        toggle();
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to update position');
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
              {/* Username */}
              <Col sm={6}>
                <FormTextInput
                  name={InputNames.NAME}
                  label={t('name')}
                  placeholder={t('enterName')}
                  isRequired
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

PositionForm.propTypes = propTypes;

export default PositionForm;
