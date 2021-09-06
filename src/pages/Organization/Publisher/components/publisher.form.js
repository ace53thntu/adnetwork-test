//---> Build-in Modules
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Label
} from 'reactstrap';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {ActiveToogle, FormReactSelect, FormTextInput} from 'components/forms';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import {INPUT_NAME} from '../constants';
import {mappingFormToApi} from './dto';
import {useDefaultPublisher} from 'pages/Organization/hooks/useDefaultPublisher';
import LoadingIndicator from 'components/common/LoadingIndicator';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {schemaValidate} from 'pages/Campaign/capping/validation';
import {
  useCreatePublisher,
  useEditPublisher,
  useGetPublisher
} from 'queries/publisher';

const PublisherForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new Publisher',
  domainOptions = [],
  isEdit = false,
  publisherId = ''
}) => {
  const {t} = useTranslation();
  const {data: publisher, isFetched, isLoading} = useGetPublisher(publisherId);
  const {mutateAsync: createPublisher} = useCreatePublisher();
  const {mutateAsync: editPublisher} = useEditPublisher();
  const defaultValues = useDefaultPublisher({
    publisher,
    domainsArr: domainOptions
  });

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control, reset} = methods;

  useEffect(() => {
    //---> Reset default value when API response
    if (isFetched && defaultValues?.name) {
      reset(defaultValues);
    }
  }, [defaultValues, reset, isFetched]);

  /**
   * Submit form
   * @param {JSON} formData
   */
  const onSubmit = async formData => {
    console.log(
      '🚀 ~ file: publisher.form.js ~ line 18 ~ onSubmit ~ formData',
      formData
    );
    const requestBody = mappingFormToApi({formData});
    if (!isEdit) {
      // CREATE
      try {
        await createPublisher(requestBody);
        ShowToast.success('Created publisher successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: publisher.form.js ~ line 61 ~ err', err);
        ShowToast.error(err || 'Fail to create publisher');
      }
    } else {
      // EDIT
      try {
        await editPublisher({advId: publisherId, data: requestBody});
        ShowToast.success('Updated publisher successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: publisher.form.js ~ line 61 ~ err', err);
        ShowToast.error(err || 'Fail to update publisher');
      }
    }
  };

  return (
    <Modal isOpen={modal} className={className} size="lg">
      <FormProvider {...methods}>
        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <BlockUi tag="div" blocking={formState.isSubmitting}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              {isLoading && <LoadingIndicator />}
              <Row>
                <Col sm={12}>
                  <FormTextInput
                    name={INPUT_NAME.NAME}
                    label={t('name')}
                    placeholder={t('enterName')}
                    isRequired
                  />
                </Col>
                {/* Domains */}
                <Col sm={12}>
                  <FormReactSelect
                    name={INPUT_NAME.DOMAINS}
                    label={t('domains')}
                    placeholder={t('selectDomains')}
                    options={[]}
                    defaultValue={null}
                    multiple
                  />
                </Col>
                {/* Status */}
                <Col md="12">
                  <Label className="mr-5">{t('status')}</Label>
                  <Controller
                    control={control}
                    name={INPUT_NAME.STATUS}
                    render={({onChange, onBlur, value, name}) => (
                      <ActiveToogle value={value} onChange={onChange} />
                    )}
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="link" onClick={toggle} type="button">
                {t('cancel')}
              </Button>
              <Button color="primary" type="submit">
                {t('save')}
              </Button>{' '}
            </ModalFooter>
          </BlockUi>
        </Form>
      </FormProvider>
    </Modal>
  );
};

PublisherForm.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  publisherId: PropTypes.string,
  isEdit: PropTypes.bool,
  IABsOptions: PropTypes.array
};

export default PublisherForm;
