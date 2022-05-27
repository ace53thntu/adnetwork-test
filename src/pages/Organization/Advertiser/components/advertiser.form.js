//---> Build-in Modules
import React from 'react';
import PropTypes from 'prop-types';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Button, Form, Row, Col, Card, CardBody, CardFooter} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import BlockUi from 'react-block-ui';
import {Link, useNavigate} from 'react-router-dom';

//---> Internal Modules
import {mappingFormToApi} from './dto';
import {useCreateAdvertiser, useEditAdvertiser} from 'queries/advertiser';
import {useDefaultAdvertiser} from 'pages/Organization/hooks/useDefaultAdvertiser';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {schemaValidate} from './validation';
import {RoutePaths} from 'constants/route-paths';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import Credential from 'components/credential';
import {FormContent} from './form-content';
import {useQueryClient} from 'react-query';
import {GET_ADVERTISER} from 'queries/advertiser/constants';

const AdvertiserForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new Advertiser',
  IABsOptions = [],
  isEdit = false,
  isView = false,
  advertiser = ''
}) => {
  const {t} = useTranslation();
  const client = useQueryClient();
  const navigate = useNavigate();
  const role = getRole();
  const advertiserId = advertiser?.uuid || '';
  const {mutateAsync: createAdvertiser} = useCreateAdvertiser();
  const {mutateAsync: editAdvertiser} = useEditAdvertiser();
  const defaultValues = useDefaultAdvertiser({
    advertiser,
    iabsArr: IABsOptions
  });

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, reset} = methods;

  /**
   * Submit form
   * @param {JSON} formData
   */
  const onSubmit = async formData => {
    console.log(
      '🚀 ~ file: advertiser.form.js ~ line 18 ~ onSubmit ~ formData',
      formData
    );
    const requestBody = mappingFormToApi({formData});
    if (!isEdit) {
      // CREATE
      try {
        await createAdvertiser(requestBody);
        ShowToast.success('Created advertiser successfully');
        navigate(`/${RoutePaths.ORGANIZATION}/${RoutePaths.ADVERTISER}`);
      } catch (err) {
        console.log('🚀 ~ file: advertiser.form.js ~ line 61 ~ err', err);
        ShowToast.error(err || 'Fail to create advertiser');
      }
    } else {
      // EDIT
      try {
        await editAdvertiser({advId: advertiserId, data: requestBody});
        await client.invalidateQueries([GET_ADVERTISER, advertiserId]);
        ShowToast.success('Updated advertiser successfully');
        navigate(
          `/${RoutePaths.ORGANIZATION}/${RoutePaths.ADVERTISER}/${advertiserId}`
        );
      } catch (err) {
        console.log('🚀 ~ file: advertiser.form.js ~ line 100 ~ err', err);
        ShowToast.error(err || 'Fail to update advertiser');
      }
    }
  };

  return (
    <Card className="main-card mb-3">
      <FormProvider {...methods}>
        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <BlockUi tag="div" blocking={formState.isSubmitting}>
            <CardBody>
              <FormContent
                defaultValues={defaultValues}
                isEdit={isEdit}
                IABsOptions={IABsOptions}
              />
              {(isEdit || isView) &&
                (role === USER_ROLE.ADVERTISER || role === USER_ROLE.ADMIN) && (
                  <Row className="mt-2">
                    <Col md={12}>
                      <Credential
                        type={USER_ROLE.ADVERTISER}
                        referenceId={advertiserId}
                      />
                    </Col>
                  </Row>
                )}
            </CardBody>

            <CardFooter className="d-flex justify-content-end">
              <Button color="link" onClick={() => reset()} type="button">
                {t('cancel')}
              </Button>
              {isEdit && (
                <Link
                  className="mr-2"
                  to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.ADVERTISER}/${advertiserId}`}
                >
                  {t('COMMON.VIEW')}
                </Link>
              )}
              <Button
                color="primary"
                type="submit"
                disabled={!formState.isDirty}
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

AdvertiserForm.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  advertiserId: PropTypes.string,
  isEdit: PropTypes.bool,
  IABsOptions: PropTypes.array
};

export default AdvertiserForm;
