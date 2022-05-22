//---> Build-in Modules
import React from 'react';
import PropTypes from 'prop-types';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Button, Form, Row, Col, Card, CardBody, CardFooter} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateDsp, useEditDsp} from 'queries/dsp';
import {mappingFormToApi} from './dto';
import {useDefaultDsp} from 'pages/Organization/hooks';
import {schemaValidate} from './validation';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import Credential from 'components/credential';
import {FormContent} from './form-content';
import {Link, useNavigate} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {useQueryClient} from 'react-query';
import {GET_DSP} from 'queries/dsp/constants';

const propTypes = {
  dspData: PropTypes.oneOfType([PropTypes.any, PropTypes.object]),
  isEdit: PropTypes.bool,
  isCreate: PropTypes.bool
};

const DspForm = ({dspData, isEdit, isCreate = false}) => {
  const {t} = useTranslation();
  const client = useQueryClient();
  const navigate = useNavigate();
  const role = getRole();
  const {mutateAsync: createDsp} = useCreateDsp();
  const {mutateAsync: editDsp} = useEditDsp();
  const dspId = dspData?.uuid;
  const defaultValues = useDefaultDsp({
    dspData
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
      '🚀 ~ file: DSP.form.js ~ line 18 ~ onSubmit ~ formData',
      formData
    );
    const requestBody = mappingFormToApi({formData});
    if (!isEdit) {
      // CREATE
      try {
        await createDsp(requestBody);
        ShowToast.success('Created DSP successfully');
        navigate(`/${RoutePaths.ORGANIZATION}/${RoutePaths.DSP}`);
      } catch (err) {
        console.log('🚀 ~ file: DSP.form.js ~ line 61 ~ err', err);
        ShowToast.error(err?.msg || 'Fail to create DSP');
      }
    } else {
      // EDIT
      try {
        await editDsp({dspId, data: requestBody});
        await client.invalidateQueries([GET_DSP, dspId]);
        ShowToast.success('Updated DSP successfully');
        navigate(`/${RoutePaths.ORGANIZATION}/${RoutePaths.DSP}/${dspId}`);
      } catch (err) {
        console.log('🚀 ~ file: DSP.form.js ~ line 61 ~ err', err);
        ShowToast.error(err?.msg || 'Fail to update DSP');
      }
    }
  };

  return (
    <Card className="main-card mb-3">
      <CardBody>
        <FormProvider {...methods}>
          <Form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            id="dspForm"
          >
            <BlockUi tag="div" blocking={formState.isSubmitting}>
              <FormContent defaultValues={defaultValues} isEdit={isEdit} />
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
      </CardBody>
      <CardFooter className="d-flex justify-content-end">
        <Link to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.DSP}`}>
          {t('backToList')}
        </Link>
        {isEdit && (
          <>
            <span className="mr-2 ml-2">|</span>
            <Link to={`/${RoutePaths.ORGANIZATION}/${RoutePaths.DSP}/${dspId}`}>
              {t('COMMON.VIEW')}
            </Link>
          </>
        )}
        <span className="ml-2">|</span>
        <Button
          color="link"
          onClick={() => {
            reset();
          }}
          type="button"
        >
          {t('cancel')}
        </Button>
        <Button
          color="primary"
          type="submit"
          disabled={!formState.isDirty || formState.isSubmitting}
          form="dspForm"
        >
          {t('save')}
        </Button>
      </CardFooter>
    </Card>
  );
};

DspForm.propTypes = propTypes;

export default DspForm;
