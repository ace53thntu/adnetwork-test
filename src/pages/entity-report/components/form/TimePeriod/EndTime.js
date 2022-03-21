import {REPORT_INPUT_NAME} from 'constants/report';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import {Controller, useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FormGroup, Label} from 'reactstrap';

export function EndTime() {
  const {t} = useTranslation();
  const {errors, control} = useFormContext();
  console.log('🚀 ~ file: EndTime.js ~ line 11 ~ EndTime ~ errors', errors);
  const startDate = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.START_TIME}`,
    control
  });

  return (
    <FormGroup>
      <Label for="endDate" className="font-weight-bold">
        <span className="text-danger">*</span>
        {t('endDate')}
      </Label>
      <Controller
        control={control}
        name={`${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.END_TIME}`}
        render={({onChange, onBlur, value, name}) => (
          <ReactDatePicker
            selected={value}
            onBlur={onBlur}
            onChange={date => onChange(date)}
            className="form-control"
            placeholderText="dd/MM/yyyy HH:mm"
            name={name}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={1}
            timeCaption="Time"
            dateFormat="dd/MM/yyyy HH:mm"
            timeFormat="HH:mm"
            minDate={startDate}
            showTimeInput
            selectsEnd
          />
        )}
      />
      {errors && errors['api']?.['end_time'] ? (
        <div className="invalid-feedback d-block">
          {errors['api']?.['end_time']?.message}
        </div>
      ) : null}
    </FormGroup>
  );
}
