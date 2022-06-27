//---> Build-in Modules
import React from 'react';
import PropTypes from 'prop-types';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {
  Button,
  Form,
  Row,
  Col,
  Label,
  Card,
  CardBody,
  CardFooter
} from 'reactstrap';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import BlockUi from 'react-block-ui';
import {useQueryClient} from 'react-query';
import {Link, useNavigate} from 'react-router-dom';

//---> Internal Modules
import {INPUT_NAME} from '../constants';
import {mappingFormToApi} from './dto';
import {useDefaultPublisher} from 'pages/Organization/hooks/useDefaultPublisher';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreatePublisher, useEditPublisher} from 'queries/publisher';
import {schemaValidate} from './validation';
import {RoutePaths} from 'constants/route-paths';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import Credential from 'components/credential';
import {GET_PUBLISHER} from 'queries/publisher/constants';
import {ActiveToggle, FormTextInput} from 'components/forms';
import './_main.scss';
import {ApiError} from 'components/common';

const PublisherForm = ({isEdit = false, isView = false, publisher = null}) => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const role = getRole();
  const {t} = useTranslation();
  const publisherId = publisher?.uuid || '';
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
        navigate(`/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}`);
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
      }
    } else {
      // EDIT
      try {
        const {data} = await editPublisher({
          pubId: publisherId,
          data: requestBody
        });
        await client.invalidateQueries([GET_PUBLISHER, data?.uuid]);
        ShowToast.success('Updated publisher successfully');
        navigate(
          `/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}/${data?.uuid}`
        );
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
      }
    }
  };

  return (
    <Card className={`main-card ${isView ? 'no-shadow' : ''}`}>
      <FormProvider {...methods}>
        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <BlockUi tag="div" blocking={formState.isSubmitting}>
            <CardBody>
              <Row>
                <Col sm={12}>
                  <FormTextInput
                    name={INPUT_NAME.NAME}
                    label={t('name')}
                    placeholder={t('enterName')}
                    isRequired
                    disable={isView}
                  />
                </Col>
                {/* Domains */}
                <Col sm={6}>
                  <FormTextInput
                    name={INPUT_NAME.DOMAIN}
                    label={t('domain')}
                    placeholder={t('domain')}
                    disable={isView}
                  />
                </Col>

                {/* Status */}
                <Col md="6">
                  <Label className="mr-5">{t('status')}</Label>
                  <Controller
                    control={control}
                    name={INPUT_NAME.STATUS}
                    render={({onChange, onBlur, value, name}) => (
                      <ActiveToggle
                        value={value}
                        onChange={onChange}
                        disabled={isView}
                      />
                    )}
                  />
                </Col>
              </Row>
              {(isEdit || isView) &&
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
            </CardBody>
            <CardFooter className="d-flex justify-content-end">
              {isView && (
                <>
                  <Link
                    to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}`}
                  >
                    {t('backToList')}
                  </Link>
                  <span className="mr-2 ml-2">|</span>
                  <Link
                    to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}/${publisherId}/${RoutePaths.EDIT}`}
                  >
                    {t('edit')}
                  </Link>
                </>
              )}
              {isEdit && (
                <Link
                  to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}/${publisherId}`}
                >
                  {t('COMMON.VIEW')}
                </Link>
              )}
              {!isView && (
                <Button color="link" onClick={() => reset()} type="button">
                  {t('cancel')}
                </Button>
              )}
              <Button
                color="primary"
                type="submit"
                disabled={!formState.isDirty}
                className="ml-2"
              >
                {t('save')}
              </Button>
            </CardFooter>
          </BlockUi>
        </Form>
      </FormProvider>
    </Card>
  );
};

PublisherForm.propTypes = {
  publisher: PropTypes.any,
  isEdit: PropTypes.bool,
  isView: PropTypes.bool
};

export default PublisherForm;
