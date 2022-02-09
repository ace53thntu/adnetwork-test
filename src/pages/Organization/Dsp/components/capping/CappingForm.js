// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {Col, Form, Label, Row} from 'reactstrap';

// Internal Modules
import {ActiveToggle, FormTextInput} from 'components/forms';
import {useTranslation} from 'react-i18next';
import {schemaValidate} from './validation';

const propTypes = {
  capping: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

const CappingForm = ({capping = {}, onSubmit = () => null}) => {
  const {t} = useTranslation();
  const methods = useForm({
    defaultValues: {
      target: capping?.target,
      status: capping?.status
    },
    resolver: schemaValidate(t)
  });
  const {handleSubmit, control} = methods;

  return (
    <div>
      <FormProvider {...methods}>
        <Form
          id="cappingForm"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Row>
            <Col sm={4}>
              <FormTextInput
                name="target"
                label="Target"
                placeholder="0.0"
                isRequired
              />
            </Col>
            <Col sm={4}>
              {/* Status */}
              <Col md="4">
                <Label className="mr-5">{t('status')}</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({onChange, onBlur, value, name}) => (
                    <ActiveToggle value={value} onChange={onChange} />
                  )}
                />
              </Col>
            </Col>
          </Row>
        </Form>
      </FormProvider>
    </div>
  );
};

CappingForm.propTypes = propTypes;

export default CappingForm;
