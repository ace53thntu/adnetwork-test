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
import {ApiError, ButtonLoading} from 'components/common';
import {BudgetTimeFrames, CappingTypes, Statuses} from 'constants/misc';
import {useCreateCapping} from 'queries/capping';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {convertApiToGui, convertGuiToApi} from 'utils/handleCurrencyFields';

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
  console.log("🚀 ~ file: BudgetCreateModal.js ~ line 47 ~ cappings", cappings)
  const {t} = useTranslation();
  const budgetGLobal = cappings?.find(
    item =>
      item.type === cappingType.type &&
      item.time_frame === BudgetTimeFrames.GLOBAL
  );
  const budgetDaily = cappings?.find(
    item =>
      item.type === cappingType.type &&
      item.time_frame === BudgetTimeFrames.DAILY
  );
  console.log("🚀 ~ file: BudgetCreateModal.js ~ line 59 ~ budgetDaily", budgetDaily)

  const defaultValues = {
    global: [CappingTypes.BUDGET.value].includes(cappingType.type)
      ? convertApiToGui({value: budgetGLobal?.target})
      : budgetGLobal?.target,
    daily: [CappingTypes.BUDGET.value].includes(cappingType.type)
      ? convertApiToGui({value: budgetDaily?.target})
      : budgetDaily?.target
  };

  const {mutateAsync: createCapping} = useCreateCapping();
  const methods = useForm({
    defaultValues,
    resolver: schemaValidateCreateBudget(t,cappingType.type)
  });

  const {handleSubmit, formState, reset, errors} = methods;
  console.log("🚀 ~ file: BudgetCreateModal.js ~ line 75 ~ errors", errors)

  async function onSubmit(formData) {
    console.log(
      '🚀 ~ file: BudgetCreateModal.js ~ line 79 ~ onSubmit ~ formData',
      formData
    );
    let bodyRequest = {
      reference_type: referenceType,
      reference_uuid: referenceUuid,
      type: cappingType?.type,
      status: Statuses.ACTIVE
    };

    let budget = {
      global: null,
      daily: null
    };

    if (formData?.global && !budgetGLobal) {
      budget.global =
        cappingType?.type === CappingTypes.BUDGET.value
          ? convertGuiToApi({value: formData?.global})
          : parseInt(formData?.global);
      bodyRequest.time_frame = BudgetTimeFrames.GLOBAL;
    }

    if (formData?.daily && !budgetDaily) {
      budget.daily =
        cappingType?.type === CappingTypes.BUDGET.value
          ? convertGuiToApi({value: formData?.daily})
          : parseInt(formData?.daily);
      bodyRequest.time_frame = BudgetTimeFrames.DAILY;
    }
    if (!budget.global) {
      delete budget.global;
    }
    if (!budget.daily) {
      delete budget.daily;
    }
    bodyRequest[cappingType.api_key] = budget;

    try {
      await createCapping(bodyRequest);
      ShowToast.success('Created Capping Successfully');
      toggleModal();
    } catch (err) {
      ShowToast.error(<ApiError apiError={err || 'Fail to Created Capping'}/>);
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
                CappingTypes.BUDGET.value
              ].includes(cappingType.type) && (
                <Row>
                  <Col md="6">
                    {/* <FormTextInput
                      type="number"
                      placeholder={t('global')}
                      name="global"
                      label={t('global')}
                      isRequired
                      readOnly={!!budgetGLobal}
                    /> */}
                    <CurrencyInputField
                      required
                      name="global"
                      placeholder="0.0"
                      label={t('global')}
                      decimalSeparator="."
                      groupSeparator=","
                      disableGroupSeparators={false}
                      decimalsLimit={3}
                      prefix="$"
                      readOnly={!!budgetGLobal}
                    />
                  </Col>
                  <Col md="6">
                    {/* <FormTextInput
                      type="number"
                      placeholder={t('daily')}
                      name="daily"
                      label={t('daily')}
                      isRequired
                      readOnly={!!budgetDaily}
                    /> */}
                    <CurrencyInputField
                      required
                      name="daily"
                      placeholder="0.0"
                      label={t('daily')}
                      decimalSeparator="."
                      groupSeparator=","
                      disableGroupSeparators={false}
                      decimalsLimit={3}
                      prefix="$"
                      readOnly={!!budgetDaily}
                    />
                  </Col>
                </Row>
              )}
              {[
                CappingTypes.IMPRESSION.value,
                CappingTypes.USER.value
              ].includes(cappingType.type) && (
                <Row>
                  <Col md="6">
                    <CurrencyInputField
                      required
                      name="global"
                      placeholder={t('global')}
                      label={t('global')}
                      readOnly={!!budgetGLobal}
                      disableGroupSeparators
                      allowDecimals={false}
                    />
                  </Col>
                  <Col md="6">
                    <CurrencyInputField
                      required
                      name="daily"
                      placeholder={t('daily')}
                      label={t('daily')}
                      disableGroupSeparators
                      allowDecimals={false}
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
