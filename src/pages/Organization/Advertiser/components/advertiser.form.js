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
import SelectTag from './SelectTag';
import {mappingFormToApi} from './dto';
import {
  useCreateAdvertiser,
  useEditAdvertiser,
  useGetAdvertiser
} from 'queries/advertiser';
import {useDefaultAdvertiser} from 'pages/Organization/hooks/useDefaultAdvertiser';
import LoadingIndicator from 'components/common/LoadingIndicator';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {schemaValidate} from './validation';
import {useGetDomains} from 'queries/domain';
import {useDomainOptions} from 'pages/Organization/hooks';
import {Link} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import Credential from 'components/credential';

const AdvertiserForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new Advertiser',
  IABsOptions = [],
  isEdit = false,
  advertiserId = ''
}) => {
  const {t} = useTranslation();
  const role = getRole();
  const {data: domains} = useGetDomains();
  const domainOptions = useDomainOptions({domainData: domains?.items || []});
  const {data: advertiser, isFetched, isLoading} = useGetAdvertiser(
    advertiserId
  );
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
      '🚀 ~ file: advertiser.form.js ~ line 18 ~ onSubmit ~ formData',
      formData
    );
    const requestBody = mappingFormToApi({formData});
    if (!isEdit) {
      // CREATE
      try {
        await createAdvertiser(requestBody);
        ShowToast.success('Created advertiser successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: advertiser.form.js ~ line 61 ~ err', err);
        ShowToast.error(err || 'Fail to create advertiser');
      }
    } else {
      // EDIT
      try {
        await editAdvertiser({advId: advertiserId, data: requestBody});
        ShowToast.success('Updated advertiser successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: advertiser.form.js ~ line 100 ~ err', err);
        ShowToast.error(err || 'Fail to update advertiser');
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
                {/* IABs */}
                <Col sm={12}>
                  <FormReactSelect
                    name={INPUT_NAME.IABS}
                    label={t('iabs')}
                    placeholder={t('selectIABs')}
                    options={IABsOptions}
                    defaultValue={null}
                    multiple
                  />
                </Col>
                {/* Domains */}
                <Col sm={12}>
                  <FormReactSelect
                    name={INPUT_NAME.DOMAINS}
                    label={t('domains')}
                    placeholder={t('selectDomains')}
                    options={domainOptions}
                    defaultValue={null}
                    multiple
                  />
                </Col>
                {/* Tags */}
                <Col sm={12}>
                  <SelectTag defaultValue={defaultValues?.tags || []} />
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
              {isEdit &&
                (role === USER_ROLE.ADVERTISER || role === USER_ROLE.ADMIN) && (
                  <Row>
                    <Col md={12}>
                      <Credential
                        type={USER_ROLE.ADVERTISER}
                        referenceId={advertiserId}
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
                  to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.ADVERTISER}/${advertiserId}/${RoutePaths.REPORT}`}
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
