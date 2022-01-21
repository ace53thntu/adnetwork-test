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
import {ActiveToogle, FormTextInput} from 'components/forms';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import {INPUT_NAME} from '../constants';
import {mappingFormToApi} from './dto';
import {useDefaultPublisher} from 'pages/Organization/hooks/useDefaultPublisher';
import LoadingIndicator from 'components/common/LoadingIndicator';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {
  useCreatePublisher,
  useEditPublisher,
  useGetPublisher
} from 'queries/publisher';
import {schemaValidate} from './validation';
import {Link} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import Credential from 'components/credential';

const PublisherForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new Publisher',
  isEdit = false,
  publisherId = ''
}) => {
  const role = getRole();

  const {t} = useTranslation();
  const {data: publisher, isFetched, isLoading} = useGetPublisher(publisherId);
  const {mutateAsync: createPublisher} = useCreatePublisher();
  const {mutateAsync: editPublisher} = useEditPublisher();
  const defaultValues = useDefaultPublisher({
    publisher
  });

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control, reset} = methods;

  useEffect(() => {
    //---> Reset default value when API response
    if (isFetched && defaultValues?.name) {
      // reset(defaultValues);
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
        ShowToast.error(err?.msg || 'Fail to create publisher');
      }
    } else {
      // EDIT
      try {
        await editPublisher({pubId: publisherId, data: requestBody});
        ShowToast.success('Updated publisher successfully');
        toggle();
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to update publisher');
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
                <Col sm={6}>
                  <FormTextInput
                    name={INPUT_NAME.DOMAIN}
                    label={t('domain')}
                    placeholder={t('domain')}
                  />
                </Col>

                {/* Status */}
                <Col md="6">
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
              {isEdit &&
                (role === USER_ROLE.PUBLISHER || role === USER_ROLE.ADMIN) && (
                  <Row>
                    <Col md={12}>
                      <Credential
                        type={USER_ROLE.PUBLISHER}
                        referenceId={publisherId}
                      />
                    </Col>
                  </Row>
                )}
            </ModalBody>
            <ModalFooter>
              <Button color="link" onClick={toggle} type="button">
                {t('cancel')}
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={!formState.isDirty}
              >
                {t('save')}
              </Button>
              {isEdit && (
                <Link
                  to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}/${publisherId}/${RoutePaths.REPORT}`}
                >
                  <Button color="success" type="button">
                    {t('viewReport')}
                  </Button>
                </Link>
              )}
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
