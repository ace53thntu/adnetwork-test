//---> Build-in Modules
import React, {useCallback, useEffect} from 'react';

//---> External Modules
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import {Button, Col, Form, Label, Row} from 'reactstrap';

//---> Internal Modules
import {ActiveToogle, FormReactSelect, FormTextInput} from 'components/forms';
import {CAPPING_TYPE} from '../constants';
import {useGetDefaultCapping} from './hooks';
import useHandleCapping from './hooks/useHandleCapping';
import {schemaValidate} from './validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateCapping, useEditCapping, useGetCapping} from 'queries/capping';
import {mappingFormToApi} from './capping.dto';

const FormCapping = ({onCloseForm}) => {
  const {t} = useTranslation();
  const {strategyId} = useParams();
  const {currentObject = null} = useHandleCapping();
  const {data: currentData} = useGetCapping(currentObject);
  const defaultValues = useGetDefaultCapping(currentData);

  //---> Define Queries
  const {mutateAsync: createCapping} = useCreateCapping();
  const {mutateAsync: editCapping} = useEditCapping();

  //---> Define RHF
  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, control, reset} = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = useCallback(
    async formData => {
      const bodyRequest = mappingFormToApi({formData, strategyId});

      if (currentObject) {
        //---> Edit capping
        try {
          await editCapping({
            cappingId: defaultValues?.uuid,
            data: bodyRequest
          });
          ShowToast.success('Updated capping successfully');
          onCloseForm();
        } catch (error) {
          ShowToast.error(error?.msg || 'Fail to update capping');
        }
      } else {
        //---> Create Capping
        try {
          await createCapping(bodyRequest);
          ShowToast.success('Created capping successfully');

          onCloseForm();
        } catch (error) {
          ShowToast.error(error?.msg);
        }
      }
    },
    [
      createCapping,
      currentObject,
      defaultValues?.uuid,
      editCapping,
      onCloseForm,
      strategyId
    ]
  );

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="6">
              <FormReactSelect
                required
                name="ctype"
                label={'Capping Type'}
                placeholder={'Select type'}
                options={CAPPING_TYPE}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="number"
                min="0"
                placeholder={'Time Frame'}
                id={'timeFrame'}
                name={'time_frame'}
                label={'Time Frame'}
                isRequired={true}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormTextInput
                type="number"
                min="0"
                placeholder={'Limit'}
                id={'climit'}
                name={'climit'}
                label={'Limit'}
                isRequired={false}
              />
            </Col>
            <Col md="3">
              <Label className="mr-5">Smooth</Label>
              <Controller
                control={control}
                name="smooth"
                defaultValue={'active'}
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToogle value={value} onChange={onChange} />
                )}
              />
            </Col>
            <Col md="3">
              <Label className="mr-5">{t('status')}</Label>
              <Controller
                control={control}
                name="status"
                defaultValue={'active'}
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToogle value={value} onChange={onChange} />
                )}
              />
            </Col>
          </Row>
          <div className="d-block mr-15">
            <Button
              onClick={onCloseForm}
              className="mb-2 mr-2 btn-icon"
              color="link"
            >
              <i className="pe-7s-refresh btn-icon-wrapper"> </i>
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="mb-2 mr-2 btn-icon"
              color="primary"
            >
              <i className="pe-7s-upload btn-icon-wrapper"> </i>
              {t('save')}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
};

export default FormCapping;
