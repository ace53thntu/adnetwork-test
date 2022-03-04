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
  Col
} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import {mappingFormToApi} from './dto';
import {useCreateAdvertiser, useEditAdvertiser} from 'queries/advertiser';
import {useDefaultAdvertiser} from 'pages/Organization/hooks/useDefaultAdvertiser';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {schemaValidate} from './validation';
import {Link} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import Credential from 'components/credential';
import {FormContent} from './form-content';

const AdvertiserForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new Advertiser',
  IABsOptions = [],
  isEdit = false,
  advertiser = ''
}) => {
  const {t} = useTranslation();
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
  const {handleSubmit, formState} = methods;

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
              <FormContent
                defaultValues={defaultValues}
                isEdit={isEdit}
                IABsOptions={IABsOptions}
              />
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
