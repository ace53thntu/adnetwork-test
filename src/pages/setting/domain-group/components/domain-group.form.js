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
import {useCreateDomain, useEditDomain} from 'queries/domain';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {formToApi} from 'entities/Domain';

const propTypes = {
  title: PropTypes.string,
  toggle: PropTypes.func,
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  domain: PropTypes.any
};

const DomainGroupForm = ({
  title = 'Create domain',
  isEdit = false,
  toggle = () => null,
  isLoading = false,
  domain = null
}) => {
  const {t} = useTranslation();
  // React Query - hooks
  const {mutateAsync: createDomain} = useCreateDomain();
  const {mutateAsync: editDomain} = useEditDomain();

  const defaultValues = useDefaultValues({domain});
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
        await createDomain(data);
        ShowToast.success('Created domain successfully');
        toggle();
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to create domain');
      }
    } else {
      try {
        await editDomain({domainId: domain?.uuid, data});
        ShowToast.success('Updated domain successfully');
        toggle();
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to update domain');
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
                  name={InputNames.DOMAIN}
                  label={t('domain')}
                  placeholder={t('enterDomain')}
                  isRequired
                  disabled={isEdit}
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

DomainGroupForm.propTypes = propTypes;

export default DomainGroupForm;
