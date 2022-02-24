// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

// Internal Modules
import {schemaValidateCreateBudget} from '../validation';
import {ButtonLoading} from 'components/common';
import {FormTextInput} from 'components/forms';
import {BudgetTimeFrames, CappingTypes} from 'constants/misc';
import {useCreateCapping} from 'queries/capping';
import {ShowToast} from 'utils/helpers/showToast.helpers';

const propTypes = {
  openForm: PropTypes.bool,
  toggleModal: PropTypes.func,
  cappingType: PropTypes.object,
  referenceType: PropTypes.string,
  referenceUuid: PropTypes.string,
  existedTypes: PropTypes.array
};

const BudgetCreateModal = ({
  openForm = false,
  toggleModal = () => null,
  cappingType = {},
  referenceType = '',
  referenceUuid = '',
  existedTypes = [],
  cappings = []
}) => {
  const {t} = useTranslation();
  const budgetGLobal = cappings?.find(
    item =>
      item.type === cappingType.type &&
      item.time_frame === BudgetTimeFrames.GLOBAL
  );
  const budgetDaily = cappings?.find(
    item =>
      item.type === cappingType.value &&
      item.time_frame === BudgetTimeFrames.DAILY
  );

  const defaultValues = {
    global: budgetGLobal ? budgetGLobal.target : '',
    daily: budgetDaily ? budgetDaily.target : ''
  };

  const {mutateAsync: createCapping} = useCreateCapping();
  const methods = useForm({
    defaultValues,
    resolver: schemaValidateCreateBudget(t)
  });

  const {handleSubmit, formState, reset} = methods;

  async function onSubmit(formData) {
    console.log(
      '🚀 ~ file: BudgetCreateModal.js ~ line 79 ~ onSubmit ~ formData',
      formData
    );
    let bodyRequest = {
      reference_type: referenceType,
      reference_uuid: referenceUuid,
      type: cappingType?.type,
      status: 'active'
    };

    if (formData?.global && !budgetGLobal) {
      bodyRequest[cappingType.api_key] = {
        global: parseInt(formData?.global)
      };
      bodyRequest.time_frame = BudgetTimeFrames.GLOBAL;
    }

    if (formData?.daily && !budgetDaily) {
      bodyRequest[cappingType.api_key] = {
        daily: parseInt(formData?.daily)
      };
      bodyRequest.time_frame = BudgetTimeFrames.DAILY;
    }

    try {
      await createCapping(bodyRequest);
      ShowToast.success('Created Capping Successfully');
      toggleModal();
    } catch (err) {
      ShowToast.error(err?.msg || 'Fail to Created Capping');
    }
  }

  React.useEffect(() => {
    return () => reset({global: '', daily: ''});
  }, [reset]);

  return (
    <Modal isOpen={openForm} size="lg">
      <ModalHeader>Create new Capping</ModalHeader>
      <BlockUi tag="div" blocking={formState.isSubmitting}>
        <ModalBody>
          <FormProvider {...methods}>
            <Form
              id="budgetForm"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              {[
                CappingTypes.BUDGET_MANAGER.value,
                CappingTypes.BUDGET.value,
                CappingTypes.IMPRESSION.value
              ].includes(cappingType.type) && (
                <Row>
                  <Col md="6">
                    <FormTextInput
                      type="number"
                      placeholder={t('global')}
                      name="global"
                      label={t('global')}
                      isRequired
                      readOnly={!!budgetGLobal}
                    />
                  </Col>
                  <Col md="6">
                    <FormTextInput
                      type="number"
                      placeholder={t('daily')}
                      name="daily"
                      label={t('daily')}
                      isRequired
                      readOnly={!!budgetDaily}
                    />
                  </Col>
                </Row>
              )}
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
