//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm} from 'react-hook-form';
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
import {Controller} from 'swiper';

//---> Internal Modules
import {LoadingIndicator} from 'components/common';
import {ActiveToggle, FormTextInput} from 'components/forms';
import {InputNames} from '../constant';
import {useTranslation} from 'react-i18next';

const propTypes = {
  title: PropTypes.string,
  toggle: PropTypes.func,
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool
};

const DomainForm = ({
  title = 'Create domain',
  isEdit = false,
  toggle = () => null,
  isLoading = false
}) => {
  const {t} = useTranslation();
  const methods = useForm();
  const {handleSubmit, formState, control} = methods;

  function onSubmit(formData) {
    console.log(
      '🚀 ~ file: domain.form.js ~ line 19 ~ onSubmit ~ formData',
      formData
    );
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
                  label={t('username')}
                  placeholder={t('enterUsername')}
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

DomainForm.propTypes = propTypes;

export default DomainForm;
