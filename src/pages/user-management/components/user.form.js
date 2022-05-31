//---> Build-in Modules
import React from 'react';
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
import {Controller, FormProvider, useForm, useWatch} from 'react-hook-form';
import {ActiveToggle, FormReactSelect, FormTextInput} from 'components/forms';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import {mappingFormToApi} from './dto';
import LoadingIndicator from 'components/common/LoadingIndicator';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {schemaValidate} from './validation';
import {INPUT_NAME, USER_ROLE} from '../constants';
import {useCreateUser, useEditUser, useGetUser} from 'queries/users';
import {useDefaultUser} from '../hooks';
import AdvertiserSelect from './form-fields/advertiser-select';
import DspSelect from './form-fields/dsp-select';
import PublisherSelect from './form-fields/publisher-select';
import { ApiError } from 'components/common';

const UserForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new User',
  isEdit = false,
  userId = '',
  countryOptions,
  userRoles
}) => {
  const {t} = useTranslation();
  const {data: userResp, isLoading, isFetched} = useGetUser(userId);
  const {mutateAsync: createUser} = useCreateUser();
  const {mutateAsync: editUser} = useEditUser();

  const defaultValues = useDefaultUser({
    apiResp: userResp,
    languagesArr: countryOptions,
    rolesArr: userRoles
  });

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t, isEdit)
  });
  const {handleSubmit, formState, control, reset} = methods;
  const watchRole = useWatch({control, name: INPUT_NAME.ROLE});

  React.useEffect(() => {
    //---> Reset default value when API response
    if (isFetched) {
      reset(defaultValues);
    }
  }, [reset, isFetched, defaultValues]);

  /**
   * Submit form
   * @param {JSON} formData
   */
  const onSubmit = async formData => {
    console.log(
      '🚀 ~ file: user.form.js ~ line 18 ~ onSubmit ~ formData',
      formData
    );
    const requestBody = mappingFormToApi({formData, isEdit});
    if (!isEdit) {
      // CREATE
      try {
        await createUser(requestBody);
        ShowToast.success('Created user successfully');
        toggle();
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
      }
    } else {
      // EDIT
      try {
        await editUser({userId, data: requestBody});
        ShowToast.success('Updated user successfully');
        toggle();
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
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
                {/* Username */}
                <Col sm={6}>
                  <FormTextInput
                    name={INPUT_NAME.USERNAME}
                    label={t('username')}
                    placeholder={t('enterUsername')}
                    isRequired
                    readOnly={isEdit}
                  />
                </Col>
                {/* Email */}
                <Col sm={6}>
                  <FormTextInput
                    name={INPUT_NAME.EMAIL}
                    label={t('email')}
                    placeholder={t('enterEmail')}
                    isRequired
                    readOnly={isEdit}
                  />
                </Col>

                {/* Password */}
                {!isEdit && (
                  <Col sm={6}>
                    <FormTextInput
                      name={INPUT_NAME.PASSWORD}
                      label={t('password')}
                      placeholder={t('enterPassword')}
                      isRequired
                      type="password"
                      autoComplete="new-password"
                    />
                  </Col>
                )}

                {/* Language */}
                <Col sm={6}>
                  <FormReactSelect
                    name={INPUT_NAME.LANGUAGE}
                    label={t('language')}
                    placeholder={t('selectLanguage')}
                    options={countryOptions}
                    defaultValue={null}
                  />
                </Col>
                {/* Avatar */}
                <Col sm={6}>
                  <FormTextInput
                    name={INPUT_NAME.COMPANY}
                    label={t('company')}
                    placeholder={t('company')}
                  />
                </Col>
                {/* Status */}
                <Col sm="6">
                  <Label className="mr-5">{t('status')}</Label>
                  <Controller
                    control={control}
                    name={INPUT_NAME.STATUS}
                    render={({onChange, onBlur, value, name}) => (
                      <ActiveToggle value={value} onChange={onChange} />
                    )}
                  />
                </Col>

                {/* Role */}
                <Col sm={6}>
                  <FormReactSelect
                    name={INPUT_NAME.ROLE}
                    label={t('role')}
                    placeholder={t('selectRole')}
                    options={userRoles}
                    defaultValue={null}
                    required
                    disabled={isEdit}
                  />
                </Col>

                {/* Advertiser list */}
                {watchRole?.value === USER_ROLE.ADVERTISER && (
                  <Col sm={6}>
                    <AdvertiserSelect
                      name={INPUT_NAME.ADVERTISER_UUID}
                      label={t('advertiser')}
                      placeholder={t('selectAdvertiser')}
                      defaultValue={defaultValues?.advertiser_uuid || null}
                      disabled={isEdit}
                    />
                  </Col>
                )}

                {/* Dsp list */}
                {watchRole?.value === USER_ROLE.DSP && (
                  <Col sm={6}>
                    <DspSelect
                      name={INPUT_NAME.DSP_UUID}
                      label={t('dsp')}
                      placeholder={t('selectDsp')}
                      defaultValue={defaultValues?.dsp_uuid || null}
                      disabled={isEdit}
                    />
                  </Col>
                )}

                {/* Publisher list */}
                {watchRole?.value === USER_ROLE.PUBLISHER && (
                  <Col sm={6}>
                    <PublisherSelect
                      name={INPUT_NAME.PUBLISHER_UUID}
                      label={t('publisher')}
                      placeholder={t('selectPublisher')}
                      defaultValue={defaultValues?.publisher_uuid || null}
                      readOnly={isEdit}
                    />
                  </Col>
                )}
              </Row>
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
              </Button>{' '}
            </ModalFooter>
          </BlockUi>
        </Form>
      </FormProvider>
    </Modal>
  );
};

UserForm.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.string,
  isEdit: PropTypes.bool
};

export default UserForm;
