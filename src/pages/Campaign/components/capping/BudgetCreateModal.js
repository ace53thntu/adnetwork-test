// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Button,
  Col,
  Form,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

// Internal Modules
import {schemaValidate} from './validation';
import {ButtonLoading} from 'components/common';
import {ActiveToggle, FormTextInput} from 'components/forms';
import {CappingTypes} from 'constants/misc';
import {CAMPAIGN_KEYS} from 'pages/Campaign/constants';
const propTypes = {
  openForm: PropTypes.bool,
  toggleModal: PropTypes.func
};

const BudgetCreateModal = ({openForm = false, toggleModal = () => null}) => {
  const {t} = useTranslation();
  const methods = useForm({
    defaultValues: {
      target: '',
      status: 'active'
    },
    resolver: schemaValidate(t, CappingTypes.BUDGET.value)
  });

  const {handleSubmit, formState, control} = methods;

  function onSubmit(formData) {}

  return (
    <Modal isOpen={openForm} size="lg">
      <ModalHeader>Edit capping</ModalHeader>
      <BlockUi tag="div" blocking={formState.isSubmitting}>
        <ModalBody>
          <FormProvider {...methods}>
            <Form
              id="budgetForm"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <Row>
                <Col md="6">
                  <FormTextInput
                    type="number"
                    placeholder={t('global')}
                    name="budget.global"
                    label={t('global')}
                    isRequired
                  />
                </Col>
                <Col md="6">
                  <FormTextInput
                    type="number"
                    placeholder={t('daily')}
                    name="budget.daily"
                    label={t('daily')}
                    isRequired
                  />
                </Col>
                <Col md="3">
                  <Label className="mr-5">Status</Label>
                  <Controller
                    control={control}
                    name={CAMPAIGN_KEYS.STATUS}
                    render={({onChange, onBlur, value, name}) => (
                      <ActiveToggle value={value} onChange={onChange} />
                    )}
                  />
                </Col>
              </Row>
            </Form>
          </FormProvider>
        </ModalBody>
        <ModalFooter>
          <Button color="link" className="mr-2" onClick={toggleModal}>
            Close
          </Button>
          <ButtonLoading
            type="submit"
            className="mr-2 btn-primary"
            form="budgetForm"
            loading={formState.isSubmitting}
          >
            {t('save')}
          </ButtonLoading>
        </ModalFooter>
      </BlockUi>
    </Modal>
  );
};

BudgetCreateModal.propTypes = propTypes;

export default BudgetCreateModal;
