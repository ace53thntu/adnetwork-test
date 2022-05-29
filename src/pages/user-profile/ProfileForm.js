//---> Build-in Modules
import React from 'react';

//---> External Modules
import {FormProvider, useForm} from 'react-hook-form';
import {Card, CardBody, CardFooter, Col, Form, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import {useUpdateProfile} from 'queries/users';
import {mappingProfileFormToApi} from 'entities/User';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {FormReactSelect, FormTextInput} from 'components/forms';
import Credential from 'components/credential';
import {ApiError, ButtonLoading} from 'components/common';
import {LANG_OPTIONS} from 'constants/misc';

const propTypes = {
  userData: PropTypes.object,
  rawData: PropTypes.any
};

const ProfileForm = ({userData = {}, rawData = null}) => {
  console.log(
    '🚀 ~ file: ProfileForm.js ~ line 26 ~ ProfileForm ~ userData',
    userData
  );
  const {t} = useTranslation();
  const {mutateAsync: updateUser} = useUpdateProfile();
  const methods = useForm({
    defaultValues: userData
  });

  const {handleSubmit, formState} = methods;

  async function updateUserProfile(data) {
    let errorMsg = '';
    try {
      await updateUser({id: userData?.uuid, data});
    } catch (err) {
      errorMsg = err?.msg || 'Fail to update user profile';
    }
    return errorMsg;
  }

  async function onSubmit(formData) {
    const dataUpdate = mappingProfileFormToApi({formData, userData: rawData});
    const errorMsg = await updateUserProfile(dataUpdate);
    if (errorMsg) {
      ShowToast.error(<ApiError apiError={errorMsg} />);
    } else {
      ShowToast.success('Updated user profile successfully');
    }
  }

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        id="profileForm"
        autoComplete="off"
      >
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <Card>
            <CardBody>
              <Row>
                <Col md={6}>
                  <FormTextInput
                    isRequired
                    name="first_name"
                    placeholder={t('firstName')}
                    label={t('firstName')}
                  />
                </Col>

                <Col md={6}>
                  <FormTextInput
                    isRequired
                    name="last_name"
                    placeholder={t('lastName')}
                    label={t('lastName')}
                  />
                </Col>

                <Col md={6}>
                  <FormTextInput
                    isRequired
                    name="email"
                    placeholder={t('email')}
                    label={t('email')}
                    disable
                  />
                </Col>

                <Col md={6}>
                  <FormReactSelect
                    required
                    name={'language'}
                    label={t('language')}
                    placeholder={t('selectLanguage')}
                    options={LANG_OPTIONS}
                    defaultValue={LANG_OPTIONS[0]}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Credential isUser />
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <div>
                <Link to="/">
                  <ButtonLoading type="button" className="btn-link">
                    {t('cancel')}
                  </ButtonLoading>
                </Link>
                <ButtonLoading
                  type="submit"
                  isLoading={formState.isSubmitting}
                  disabled={!formState.isDirty}
                  className="ml-2 btn-primary"
                >
                  {t('save')}
                </ButtonLoading>
              </div>
            </CardFooter>
          </Card>
        </BlockUi>
      </Form>
    </FormProvider>
  );
};

ProfileForm.propTypes = propTypes;

export default ProfileForm;
