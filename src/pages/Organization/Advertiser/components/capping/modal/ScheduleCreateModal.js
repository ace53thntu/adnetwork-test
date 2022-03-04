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
import {schemaValidateCreateSchedule} from '../validation';
import {ButtonLoading} from 'components/common';
import {FormReactSelect} from 'components/forms';
import {useCreateCapping} from 'queries/capping';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {WEEK_DAYS} from 'pages/Campaign/constants';
import TimePicker from 'pages/Campaign/strategy/form-fields/TimePicker';
import moment from 'moment';
import {getTimeZoneOffset} from 'utils/metrics';
import {initializingDefaultValues} from '../dto';
import {ErrorMessage} from '@hookform/error-message';

const propTypes = {
  openForm: PropTypes.bool,
  toggleModal: PropTypes.func,
  cappingType: PropTypes.object,
  referenceType: PropTypes.string,
  referenceUuid: PropTypes.string,
  existedTypes: PropTypes.array
};

const ScheduleCreateModal = ({
  openForm = false,
  toggleModal = () => null,
  cappingType = {},
  referenceType = '',
  referenceUuid = '',
  existedTypes = []
}) => {
  const {t} = useTranslation();

  const {mutateAsync: createCapping} = useCreateCapping();
  const methods = useForm({
    defaultValues: initializingDefaultValues({cappingType, referenceType}),
    resolver: schemaValidateCreateSchedule(t)
  });

  const {handleSubmit, formState, reset, errors} = methods;
  console.log('🚀 ~ file: ScheduleCreateModal.js ~ line 59 ~ errors', errors);

  async function onSubmit(formData) {
    console.log(
      '🚀 ~ file: ScheduleCreateModal.js ~ line 79 ~ onSubmit ~ formData',
      formData
    );
    let bodyRequest = {
      reference_type: referenceType,
      reference_uuid: referenceUuid,
      type: cappingType?.type,
      status: 'active'
    };

    let schedule = {};
    const scheduleStartHour = moment(formData?.start_time).hours();
    const scheduleStartMinute = moment(formData?.start_time).minutes();
    const scheduleEndHour = moment(formData?.end_time).hours();
    const scheduleEndMinute = moment(formData?.end_time).minutes();
    schedule = {
      week_days:
        formData?.week_days?.length > 0
          ? Array.from(formData?.week_days, item => item?.value)
          : [],
      start_hour: parseInt(scheduleStartHour, 10),
      start_minute: parseInt(scheduleStartMinute, 10),
      end_hour: parseInt(scheduleEndHour, 10),
      end_minute: parseInt(scheduleEndMinute, 10),
      time_zone: `${getTimeZoneOffset()}`
    };
    bodyRequest.schedule = schedule;
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
              id="scheduleForm"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <Row>
                <Col md="12">
                  <FormReactSelect
                    name="week_days"
                    label="Week days"
                    placeholder="Select..."
                    options={WEEK_DAYS}
                    multiple
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <TimePicker name="start_time" label="Start time" />
                  {errors?.start_time && (
                    <ErrorMessage message={errors?.start_time?.message} />
                  )}
                </Col>
                <Col md="6">
                  <TimePicker name="end_time" label="End time" />
                  {errors?.end_time && (
                    <ErrorMessage message={errors?.end_time?.message} />
                  )}
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
            form="scheduleForm"
            loading={formState.isSubmitting}
          >
            {t('save')}
          </ButtonLoading>
        </ModalFooter>
      </BlockUi>
    </Modal>
  );
};

ScheduleCreateModal.propTypes = propTypes;

export default ScheduleCreateModal;
