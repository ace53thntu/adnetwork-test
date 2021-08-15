//---> Build-in Modules
import React, {useCallback, useEffect} from 'react';

//---> External Modules
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import {Button, Col, Form, Label, Row} from 'reactstrap';
import {yupResolver} from '@hookform/resolvers/yup';

//---> Internal Modules
// import {useGetCapping} from 'core/queries';
// import {useCreateCapping} from 'core/queries/campaigns/useCreateCapping';
// import {useUpdateCapping} from 'core/queries/capping';
import {ActiveToogle, FormReactSelect, FormTextInput} from 'components/forms';
import {CAPPING_TYPE} from '../constants';
import {useGetDefaultCapping} from './hooks';
import useHandleCapping from './hooks/useHandleCapping';
import {schemaValidate} from './validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';

const FormCapping = ({onCloseForm}) => {
  const {t} = useTranslation();
  const {id: strategyId} = useParams();
  const {currentObject} = useHandleCapping();
  // const {data: currentData} = useGetCapping(currentObject);
  const currentData = null;
  const defaultValues = useGetDefaultCapping(currentData);

  // Define Queries
  // const {mutateAsync: createCapping} = useCreateCapping();
  const createCapping = useCallback(() => {
    return new Promise(resolve => resolve('ok'));
  }, []);
  // const {mutateAsync: updateCapping} = useUpdateCapping();
  const updateCapping = useCallback(() => {
    return new Promise(resolve => resolve('ok'));
  }, []);
  // Define RHF
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaValidate(t))
  });
  const {handleSubmit, control, reset} = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = useCallback(
    async values => {
      const {ctype, climit, time_frame, smooth} = values;
      const formData = {
        strategy_id: parseInt(strategyId, 10) ?? undefined,
        ctype: ctype?.value ?? '',
        climit: parseInt(climit, 10) ?? 0,
        time_frame: parseInt(time_frame, 10) ?? 0,
        smooth: smooth === 'active' ? true : false
      };
      if (currentObject) {
        try {
          await updateCapping({id: currentData?.id, data: formData});
          ShowToast.success('Updated capping successfully');
          onCloseForm();
        } catch (error) {
          ShowToast.error(error?.msg || 'Fail to update capping');
        }
      } else {
        try {
          await createCapping(formData);
          ShowToast.success('Created capping successfully');

          onCloseForm();
        } catch (error) {
          ShowToast.error(error?.msg);
        }
      }
    },
    [
      createCapping,
      currentData,
      currentObject,
      onCloseForm,
      strategyId,
      updateCapping
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
            <Col md="6">
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
          </Row>
          <div className="d-block mr-15">
            <Button
              onClick={onCloseForm}
              className="mb-2 mr-2 btn-icon"
              color="secondary"
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
