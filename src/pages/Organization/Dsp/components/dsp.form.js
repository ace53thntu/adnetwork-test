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
  Col
} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import LoadingIndicator from 'components/common/LoadingIndicator';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateDsp, useEditDsp, useGetDsp} from 'queries/dsp';
import {mappingFormToApi} from './dto';
import {useDefaultDsp} from 'pages/Organization/hooks';
import {schemaValidate} from './validation';
import {Link} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import Credential from 'components/credential';
import {FormContent} from './form-content';

const DspForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new DSP',
  isEdit = false,
  dspId = ''
}) => {
  const {t} = useTranslation();
  const role = getRole();
  const {data: dspData, isFetched, isLoading} = useGetDsp(dspId);
  const {mutateAsync: createDsp} = useCreateDsp();
  const {mutateAsync: editDsp} = useEditDsp();
  const defaultValues = useDefaultDsp({
    dspData
  });

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, reset} = methods;

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
      '🚀 ~ file: DSP.form.js ~ line 18 ~ onSubmit ~ formData',
      formData
    );
    const requestBody = mappingFormToApi({formData});
    if (!isEdit) {
      // CREATE
      try {
        await createDsp(requestBody);
        ShowToast.success('Created DSP successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: DSP.form.js ~ line 61 ~ err', err);
        ShowToast.error(err?.msg || 'Fail to create DSP');
      }
    } else {
      // EDIT
      try {
        await editDsp({dspId, data: requestBody});
        ShowToast.success('Updated DSP successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: DSP.form.js ~ line 61 ~ err', err);
        ShowToast.error(err?.msg || 'Fail to update DSP');
      }
    }
  };

  return (
    <Modal unmountOnClose isOpen={modal} className={className} size="lg">
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <FormProvider {...methods}>
          <Form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            id="dspForm"
          >
            <BlockUi tag="div" blocking={formState.isSubmitting}>
              {isLoading && <LoadingIndicator />}
              <FormContent defaultValues={defaultValues} />
              {isEdit && (role === USER_ROLE.DSP || role === USER_ROLE.ADMIN) && (
                <Row>
                  <Col md={12}>
                    <Credential type={USER_ROLE.DSP} referenceId={dspId} />
                  </Col>
                </Row>
              )}
            </BlockUi>
          </Form>
        </FormProvider>
      </ModalBody>
      <ModalFooter>
        <Button
          color="link"
          onClick={() => {
            reset();
            toggle();
          }}
          type="button"
        >
          {t('cancel')}
        </Button>
        <Button
          color="primary"
          type="submit"
          disabled={!formState.isDirty}
          form="dspForm"
        >
          {t('save')}
        </Button>
        {isEdit && (
          <Link
            to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.DSP}/${dspId}/${RoutePaths.REPORT}`}
          >
            <Button color="success" type="button">
              {t('viewReport')}
            </Button>
          </Link>
        )}
      </ModalFooter>
    </Modal>
  );
};

DspForm.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  dspId: PropTypes.string,
  isEdit: PropTypes.bool,
  IABsOptions: PropTypes.array
};

export default DspForm;
