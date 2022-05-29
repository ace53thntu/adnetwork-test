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
import {ApiError, LoadingIndicator} from 'components/common';
import {ActiveToggle, FormTextInput} from 'components/forms';
import {InputNames} from '../constant';
import {useTranslation} from 'react-i18next';
import {useDefaultValues} from '../hook';
import {schemaValidate} from './validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {formToApi} from 'entities/DomainGroup';
import {useCreateDomainGroup, useEditDomainGroup} from 'queries/domain-group';
import DomainSelect from './DomainSelect';

const propTypes = {
  title: PropTypes.string,
  toggle: PropTypes.func,
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  domainGroup: PropTypes.any
};

const DomainGroupForm = ({
  title = 'Create domain group',
  isEdit = false,
  toggle = () => null,
  isLoading = false,
  domainGroup = null
}) => {
  const {t} = useTranslation();
  // React Query - hooks
  const {mutateAsync: createDomainGroup} = useCreateDomainGroup();
  const {mutateAsync: editDomainGroup} = useEditDomainGroup(domainGroup?.uuid);

  const defaultValues = useDefaultValues({domainGroup});
  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control} = methods;

  async function onSubmit(formData) {
    console.log(
      '🚀 ~ file: domain.form.js ~ line 19 ~ onSubmit ~ formData',
      formData
    );
    const data = formToApi({formData});
    if (!isEdit) {
      try {
        await createDomainGroup(data);
        ShowToast.success('Created domain successfully');
        toggle();
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
      }
    } else {
      try {
        await editDomainGroup({domainGroupId: domainGroup?.uuid, data});
        ShowToast.success('Updated domain group successfully');
        toggle();
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
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
              {/* Domain group name */}
              <Col sm={6}>
                <FormTextInput
                  name={InputNames.NAME}
                  label={t('name')}
                  placeholder={t('enterName')}
                  isRequired
                />
              </Col>

              {/* Status */}
              <Col sm="3">
                <Label className="mr-5">{t('status')}</Label>
                <Controller
                  control={control}
                  name={InputNames.STATUS}
                  render={({onChange, onBlur, value, name}) => (
                    <ActiveToggle value={value} onChange={onChange} />
                  )}
                />
              </Col>
              {/* Shared */}
              {/* <Col sm="3">
                <Label className="mr-5">{t('shared')}</Label>
                <Controller
                  control={control}
                  name={InputNames.SHARED}
                  render={({onChange, onBlur, value, name}) => (
                    <ActiveToggle value={value} onChange={onChange} />
                  )}
                />
              </Col> */}
              <Col sm={12}>
                <DomainSelect
                  defaultValue={defaultValues?.[InputNames.DOMAINS]}
                  name={InputNames.DOMAINS}
                  label={t('domains')}
                  placeholder={t('selectDomains')}
                  multiple
                />
              </Col>
              <Col sm={12}>
                <FormTextInput
                  name={InputNames.DESCRIPTION}
                  label={t('description')}
                  placeholder={t('enterDescription')}
                  type="textarea"
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

DomainGroupForm.propTypes = propTypes;

export default DomainGroupForm;
