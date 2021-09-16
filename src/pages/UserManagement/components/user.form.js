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
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {ActiveToogle, FormReactSelect, FormTextInput} from 'components/forms';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import {mappingFormToApi} from './dto';
import LoadingIndicator from 'components/common/LoadingIndicator';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {schemaValidate} from './validation';
import {INPUT_NAME} from '../constants';
import {useCreateUser, useEditUser, useGetUser} from 'queries/users';
import SelectAdvertiser from './select-advertiser';
import SelectDsp from './select-dsp';
import SelectPublisher from './select-publisher';
import {useDefaultUser} from '../hooks';

const UserForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new User',
  isEdit = false,
  userId = '',
  countryOptions,
  dspOptions,
  advertiserOptions,
  publisherOptions,
  userRoles
}) => {
  const {t} = useTranslation();
  const {data: userResp, isLoading, isFetched} = useGetUser(userId);
  const {mutateAsync: createUser} = useCreateUser();
  const {mutateAsync: editUser} = useEditUser();

  const defaultValues = useDefaultUser({
    apiResp: userResp,
    languagesArr: countryOptions,
    dspsArr: dspOptions,
    advertisersArr: advertiserOptions,
    publishersArr: publisherOptions,
    rolesArr: userRoles
  });

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control, reset} = methods;

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
    const requestBody = mappingFormToApi({formData});
    if (!isEdit) {
      // CREATE
      try {
        await createUser(requestBody);
        ShowToast.success('Created user successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: user.form.js ~ line 61 ~ err', err);
        ShowToast.error(err || 'Fail to create user');
      }
    } else {
      // EDIT
      try {
        await editUser({userId, data: requestBody});
        ShowToast.success('Updated user successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: user.form.js ~ line 61 ~ err', err);
        ShowToast.error(err || 'Fail to update user');
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
                  />
                </Col>
                {/* Email */}
                <Col sm={6}>
                  <FormTextInput
                    name={INPUT_NAME.EMAIL}
                    label={t('email')}
                    placeholder={t('enterEmail')}
                    isRequired
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
                    name={INPUT_NAME.AVATAR_URL}
                    label={t('avatarUrl')}
                    placeholder={t('avatarUrl')}
                  />
                </Col>
                {/* Status */}
                <Col sm="6">
                  <Label className="mr-5">{t('status')}</Label>
                  <Controller
                    control={control}
                    name={INPUT_NAME.STATUS}
                    render={({onChange, onBlur, value, name}) => (
                      <ActiveToogle value={value} onChange={onChange} />
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
                  />
                </Col>
                <Col sm={6}>
                  <SelectAdvertiser options={advertiserOptions} />
                  <SelectDsp options={dspOptions} />
                  <SelectPublisher options={publisherOptions} />
                </Col>
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
