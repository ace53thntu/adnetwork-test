//---> Build-in Modules
import React, {useEffect} from 'react';

//---> External Modules
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Col, Row, Button, Label} from 'reactstrap';

// import {
//   useCreateWeekPart,
//   useGetWeekPart,
//   useUpdateWeekPart
// } from 'core/queries/week-part';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {FormTextInput, ActiveToogle, FormReactSelect} from 'components/forms';
import {WEEK_DAYS} from '../constants';
import {useGetDefaultWeekPart} from './hooks';
import useHandleCapping from './hooks/useHandleCapping';
import {schemaValidateWeekPart} from './validation';

const FormWeekPark = ({onCloseForm = () => {}}) => {
  // Init translate
  const {t} = useTranslation();

  const {currentObject: weekPartId} = useHandleCapping();

  // Define queries
  // const {data} = useGetWeekPart(weekPartId);
  const data = null;
  const defaultValues = useGetDefaultWeekPart(data);
  // const {mutateAsync: createWeekPart} = useCreateWeekPart();
  const createWeekPart = new Promise(resolve => resolve('ok'));
  // const {mutateAsync: updateWeekPart} = useUpdateWeekPart();
  const updateWeekPart = new Promise(resolve => resolve('ok'));

  // Get query param
  const {id: strategyId} = useParams();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaValidateWeekPart(t))
  });
  const {handleSubmit, reset, control} = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  /**
   * Parse data before submit
   * @param {*} formData
   * @returns
   */
  const parseFormData = ({formData}) => {
    let {
      week_days,
      start_hour,
      start_minute,
      end_hour,
      end_minute,
      week_parts_gmt,
      is_gmt
    } = formData;
    week_days = week_days.map(item => item.value);
    start_hour = parseInt(start_hour, 10);
    start_minute = parseInt(start_minute, 10);
    end_hour = parseInt(end_hour, 10);
    end_minute = parseInt(end_minute, 10);
    let strategy_id = parseInt(strategyId, 10);
    const convertGmt = is_gmt === 'active' ? true : false;
    const convertWpGmt = week_parts_gmt === 'active' ? true : false;

    return {
      week_days,
      start_time: `${start_hour}:${start_minute}`,
      end_time: `${end_hour}:${end_minute}`,
      strategy_id,
      is_gmt: convertGmt,
      week_parts_gmt: convertWpGmt
    };
  };

  const onSubmit = async formData => {
    const data = parseFormData({formData});
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
                name="week_days"
                label={'Week days'}
                placeholder={'Select'}
                options={WEEK_DAYS}
                multiple
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
            <Col md="6">
              <Label className="mr-5">Week Parts GMT</Label>
              <Controller
                control={control}
                name="week_parts_gmt"
                defaultValue={'active'}
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToogle value={value} onChange={onChange} />
                )}
              />
            </Col>
            <Col md="6">
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
          <hr />
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
        </form>
      </FormProvider>
    </>
  );
};

export default FormWeekPark;
