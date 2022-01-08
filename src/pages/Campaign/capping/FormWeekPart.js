//---> Build-in Modules
import React, {useEffect} from 'react';

//---> External Modules
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Col, Row, Button, Label} from 'reactstrap';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {FormTextInput, ActiveToogle, FormReactSelect} from 'components/forms';
import {WEEK_DAYS} from '../constants';
import {useGetDefaultWeekPart} from './hooks';
import useHandleCapping from './hooks/useHandleCapping';
import {schemaValidateWeekPart} from './validation';
import {
  useCreateWeekpart,
  useEditWeekpart,
  useGetWeekpart
} from 'queries/weekpart';
import {mappingFormToApi} from 'entities/Weekpart';

const FormWeekPark = ({onCloseForm = () => {}}) => {
  // Init translate
  const {t} = useTranslation();

  const {currentObject: weekPartId} = useHandleCapping();

  // Define queries
  const {data} = useGetWeekpart(weekPartId);
  const defaultValues = useGetDefaultWeekPart(data);
  const {mutateAsync: createWeekPart} = useCreateWeekpart();
  const {mutateAsync: updateWeekPart} = useEditWeekpart();

  // Get query param
  const {strategyId} = useParams();

  const methods = useForm({
    defaultValues,
    resolver: schemaValidateWeekPart(t)
  });
  const {handleSubmit, reset, control} = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async formData => {
    const data = mappingFormToApi({formData, strategyId});
    if (weekPartId) {
      try {
        await updateWeekPart({weekPartId, data});
        ShowToast.success('Updated week part successfully');

        onCloseForm();
      } catch (error) {
        ShowToast.error(error?.msg || 'Fail to update week part');
      }
    } else {
      try {
        await createWeekPart(data);
        ShowToast.success('Created week part successfully');

        onCloseForm();
      } catch (error) {
        ShowToast.error(error?.msg || 'Fail to create week part');
      }
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Row>
            <Col md="6">
              <FormReactSelect
                required
                name="week_day"
                label={'Week days'}
                placeholder={'Select'}
                options={WEEK_DAYS}
                multiple
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
            <Col md="3">
              <Label className="mr-5">Is GMT</Label>
              <Controller
                control={control}
                name="is_gmt"
                defaultValue={'active'}
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToogle value={value} onChange={onChange} />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormTextInput
                type="number"
                min="0"
                placeholder={'Start hour'}
                id={'startHour'}
                name={'start_hour'}
                label={'Start hour'}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="number"
                min="0"
                placeholder={'Start minute'}
                id={'startMinute'}
                name={'start_minute'}
                label={'Start minute'}
                isRequired={true}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormTextInput
                type="number"
                min="0"
                placeholder={'End hour'}
                id={'endHour'}
                name={'end_hour'}
                label={'End hour'}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="number"
                min="0"
                placeholder={'End minute'}
                id={'endMinute'}
                name={'end_minute'}
                label={'End minute'}
                isRequired={true}
              />
            </Col>
          </Row>
          <hr />
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
        </form>
      </FormProvider>
    </>
  );
};

export default FormWeekPark;
